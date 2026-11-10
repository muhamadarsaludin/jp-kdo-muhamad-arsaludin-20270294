package repository

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"

	"kdo/backend/internal/database/sqlc"
)

const maksPercobaanKode = 5

// PeminjamanRepository membungkus query peminjaman.
type PeminjamanRepository struct {
	pool *pgxpool.Pool
	q    *sqlc.Queries
}

// NewPeminjamanRepository membuat repository peminjaman.
func NewPeminjamanRepository(pool *pgxpool.Pool, q *sqlc.Queries) *PeminjamanRepository {
	return &PeminjamanRepository{pool: pool, q: q}
}

// List mengambil peminjaman dengan filter dan pagination.
func (r *PeminjamanRepository) List(ctx context.Context, p PeminjamanListParams) ([]sqlc.ListPeminjamanRow, int64, error) {
	rows, err := r.q.ListPeminjaman(ctx, sqlc.ListPeminjamanParams{
		Search:      nullableText(p.Search),
		Status:      nullableText(p.Status),
		KendaraanID: nullableInt8(p.KendaraanID),
		PegawaiID:   nullableInt8(p.PegawaiID),
		Dari:        nullableTimestamptz(p.Dari),
		Sampai:      nullableTimestamptz(p.Sampai),
		SortBy:      p.SortBy,
		SortOrder:   p.SortOrder,
		Limit:       int32(p.Limit),
		Offset:      int32(p.Offset),
	})
	if err != nil {
		return nil, 0, fmt.Errorf("list peminjaman: %w", err)
	}

	total, err := r.q.CountPeminjaman(ctx, sqlc.CountPeminjamanParams{
		Search:      nullableText(p.Search),
		Status:      nullableText(p.Status),
		KendaraanID: nullableInt8(p.KendaraanID),
		PegawaiID:   nullableInt8(p.PegawaiID),
		Dari:        nullableTimestamptz(p.Dari),
		Sampai:      nullableTimestamptz(p.Sampai),
	})
	if err != nil {
		return nil, 0, fmt.Errorf("hitung peminjaman: %w", err)
	}

	return rows, total, nil
}

// Get mengambil peminjaman berdasarkan id.
func (r *PeminjamanRepository) Get(ctx context.Context, id int64) (sqlc.GetPeminjamanRow, error) {
	row, err := r.q.GetPeminjaman(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.GetPeminjamanRow{}, ErrNotFound
		}
		return sqlc.GetPeminjamanRow{}, fmt.Errorf("ambil peminjaman: %w", err)
	}
	return row, nil
}

// Create menyimpan pengajuan dengan kode otomatis dan retry bila bentrok.
func (r *PeminjamanRepository) Create(ctx context.Context, p PeminjamanCreateParams) (sqlc.Peminjaman, error) {
	prefix := "PJM-" + time.Now().Format("20060102") + "-"

	nomor, err := r.q.NextNomorPeminjaman(ctx, prefix)
	if err != nil {
		return sqlc.Peminjaman{}, fmt.Errorf("nomor peminjaman: %w", err)
	}

	for percobaan := 0; percobaan < maksPercobaanKode; percobaan++ {
		kode := fmt.Sprintf("%s%04d", prefix, nomor)

		row, err := r.q.CreatePeminjaman(ctx, sqlc.CreatePeminjamanParams{
			KodePeminjaman:    kode,
			KendaraanID:       p.KendaraanID,
			PegawaiID:         p.PegawaiID,
			PerangkatDaerahID: p.PerangkatDaerahID,
			Keperluan:         p.Keperluan,
			Tujuan:            p.Tujuan,
			TanggalMulai:      p.TanggalMulai,
			TanggalSelesai:    p.TanggalSelesai,
			Catatan:           p.Catatan,
		})
		if err == nil {
			return row, nil
		}

		if isUniqueKode(err) {
			nomor++
			continue
		}

		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23P01" {
			return sqlc.Peminjaman{}, fmt.Errorf("%w: jadwal kendaraan bentrok", ErrConflict)
		}
		return sqlc.Peminjaman{}, fmt.Errorf("simpan peminjaman: %w", err)
	}

	return sqlc.Peminjaman{}, fmt.Errorf("%w: gagal membuat kode peminjaman", ErrConflict)
}

// KendaraanRingkas mengambil data minimum kendaraan untuk validasi.
func (r *PeminjamanRepository) KendaraanRingkas(ctx context.Context, id int64) (sqlc.GetKendaraanRingkasRow, error) {
	row, err := r.q.GetKendaraanRingkas(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.GetKendaraanRingkasRow{}, ErrNotFound
		}
		return sqlc.GetKendaraanRingkasRow{}, fmt.Errorf("ambil kendaraan: %w", err)
	}
	return row, nil
}

// PegawaiRingkas mengambil data minimum pegawai untuk validasi.
func (r *PeminjamanRepository) PegawaiRingkas(ctx context.Context, id int64) (sqlc.GetPegawaiRingkasRow, error) {
	row, err := r.q.GetPegawaiRingkas(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.GetPegawaiRingkasRow{}, ErrNotFound
		}
		return sqlc.GetPegawaiRingkasRow{}, fmt.Errorf("ambil pegawai: %w", err)
	}
	return row, nil
}

// CountBentrok menghitung peminjaman aktif pada rentang waktu yang beririsan.
func (r *PeminjamanRepository) CountBentrok(ctx context.Context, kendaraanID int64, mulai, selesai time.Time) (int64, error) {
	total, err := r.q.CountPeminjamanBentrok(ctx, sqlc.CountPeminjamanBentrokParams{
		KendaraanID:    kendaraanID,
		TanggalMulai:   pgtype.Timestamptz{Time: mulai, Valid: true},
		TanggalSelesai: pgtype.Timestamptz{Time: selesai, Valid: true},
	})
	if err != nil {
		return 0, fmt.Errorf("cek bentrok jadwal: %w", err)
	}
	return total, nil
}

// Transition mengubah status peminjaman dan (opsional) status kendaraan dalam satu transaksi.
// Mengembalikan false bila status lama tidak cocok.
func (r *PeminjamanRepository) Transition(
	ctx context.Context,
	id int64,
	statusLama, statusBaru string,
	disetujuiOleh *int64,
	catatan string,
	kendaraanStatus string,
) (bool, error) {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return false, fmt.Errorf("mulai transaksi peminjaman: %w", err)
	}
	defer tx.Rollback(ctx) //nolint:errcheck

	q := r.q.WithTx(tx)

	var approver pgtype.Int8
	if disetujuiOleh != nil {
		approver = pgtype.Int8{Int64: *disetujuiOleh, Valid: true}
	}

	rows, err := q.UpdatePeminjamanStatus(ctx, sqlc.UpdatePeminjamanStatusParams{
		Status:        statusBaru,
		DisetujuiOleh: approver,
		Catatan:       nullableText(catatan),
		ID:            id,
		StatusLama:    statusLama,
	})
	if err != nil {
		return false, fmt.Errorf("ubah status peminjaman: %w", err)
	}
	if rows == 0 {
		return false, nil
	}

	if kendaraanStatus != "" {
		if err := q.SetKendaraanStatusByPeminjaman(ctx, sqlc.SetKendaraanStatusByPeminjamanParams{
			Status:       kendaraanStatus,
			PeminjamanID: id,
		}); err != nil {
			return false, fmt.Errorf("ubah status kendaraan: %w", err)
		}
	}

	if err := tx.Commit(ctx); err != nil {
		return false, fmt.Errorf("commit transisi peminjaman: %w", err)
	}
	return true, nil
}

// PeminjamanListParams adalah parameter list peminjaman.
type PeminjamanListParams struct {
	Search      string
	Status      string
	KendaraanID *int64
	PegawaiID   *int64
	Dari        *time.Time
	Sampai      *time.Time
	SortBy      string
	SortOrder   string
	Limit       int
	Offset      int
}

// PeminjamanCreateParams adalah parameter pengajuan peminjaman.
type PeminjamanCreateParams struct {
	KendaraanID       int64
	PegawaiID         int64
	PerangkatDaerahID int64
	Keperluan         string
	Tujuan            string
	TanggalMulai      pgtype.Timestamptz
	TanggalSelesai    pgtype.Timestamptz
	Catatan           any
}

func nullableTimestamptz(v *time.Time) pgtype.Timestamptz {
	if v == nil {
		return pgtype.Timestamptz{}
	}
	return pgtype.Timestamptz{Time: *v, Valid: true}
}

func isUniqueKode(err error) bool {
	var pgErr *pgconn.PgError
	return errors.As(err, &pgErr) && pgErr.Code == "23505" && pgErr.ConstraintName == "uq_peminjaman_kode"
}

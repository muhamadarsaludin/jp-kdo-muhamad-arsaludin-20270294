package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"

	"kdo/backend/internal/database/sqlc"
)

// ErrInvalidReference dikembalikan bila foreign key tidak ditemukan.
var ErrInvalidReference = errors.New("referensi tidak ditemukan")

// PegawaiRepository membungkus query pegawai.
type PegawaiRepository struct {
	pool *pgxpool.Pool
	q    *sqlc.Queries
}

// NewPegawaiRepository membuat repository pegawai.
func NewPegawaiRepository(pool *pgxpool.Pool, q *sqlc.Queries) *PegawaiRepository {
	return &PegawaiRepository{pool: pool, q: q}
}

// List mengambil pegawai dengan filter dan pagination.
func (r *PegawaiRepository) List(ctx context.Context, p PegawaiListParams) ([]sqlc.ListPegawaiRow, int64, error) {
	rows, err := r.q.ListPegawai(ctx, sqlc.ListPegawaiParams{
		Search:            nullableText(p.Search),
		PerangkatDaerahID: nullableInt8(p.PerangkatDaerahID),
		Golongan:          nullableText(p.Golongan),
		StatusPegawai:     nullableText(p.StatusPegawai),
		SortBy:            p.SortBy,
		SortOrder:         p.SortOrder,
		Limit:             int32(p.Limit),
		Offset:            int32(p.Offset),
	})
	if err != nil {
		return nil, 0, fmt.Errorf("list pegawai: %w", err)
	}

	total, err := r.q.CountPegawai(ctx, sqlc.CountPegawaiParams{
		Search:            nullableText(p.Search),
		PerangkatDaerahID: nullableInt8(p.PerangkatDaerahID),
		Golongan:          nullableText(p.Golongan),
		StatusPegawai:     nullableText(p.StatusPegawai),
	})
	if err != nil {
		return nil, 0, fmt.Errorf("hitung pegawai: %w", err)
	}

	return rows, total, nil
}

// Get mengambil pegawai berdasarkan id.
func (r *PegawaiRepository) Get(ctx context.Context, id int64) (sqlc.GetPegawaiRow, error) {
	row, err := r.q.GetPegawai(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.GetPegawaiRow{}, ErrNotFound
		}
		return sqlc.GetPegawaiRow{}, fmt.Errorf("ambil pegawai: %w", err)
	}
	return row, nil
}

// Create menyimpan pegawai baru.
func (r *PegawaiRepository) Create(ctx context.Context, p PegawaiUpsertParams) (sqlc.Pegawai, error) {
	row, err := r.q.CreatePegawai(ctx, sqlc.CreatePegawaiParams{
		Nip:               p.NIP,
		Nama:              p.Nama,
		GelarDepan:        p.GelarDepan,
		GelarBelakang:     p.GelarBelakang,
		Jabatan:           p.Jabatan,
		Golongan:          p.Golongan,
		Pangkat:           p.Pangkat,
		PerangkatDaerahID: p.PerangkatDaerahID,
		Email:             p.Email,
		Telepon:           p.Telepon,
		TanggalLahir:      p.TanggalLahir,
		StatusPegawai:     p.StatusPegawai,
	})
	if err != nil {
		return sqlc.Pegawai{}, mapPegawaiError(err)
	}
	return row, nil
}

// Update mengubah pegawai.
func (r *PegawaiRepository) Update(ctx context.Context, id int64, p PegawaiUpsertParams) (sqlc.Pegawai, error) {
	row, err := r.q.UpdatePegawai(ctx, sqlc.UpdatePegawaiParams{
		Nip:               p.NIP,
		Nama:              p.Nama,
		GelarDepan:        p.GelarDepan,
		GelarBelakang:     p.GelarBelakang,
		Jabatan:           p.Jabatan,
		Golongan:          p.Golongan,
		Pangkat:           p.Pangkat,
		PerangkatDaerahID: p.PerangkatDaerahID,
		Email:             p.Email,
		Telepon:           p.Telepon,
		TanggalLahir:      p.TanggalLahir,
		StatusPegawai:     p.StatusPegawai,
		ID:                id,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.Pegawai{}, ErrNotFound
		}
		return sqlc.Pegawai{}, mapPegawaiError(err)
	}
	return row, nil
}

// Delete melakukan soft delete pegawai dan melepas penanggung jawab kendaraan.
func (r *PegawaiRepository) Delete(ctx context.Context, id int64) error {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return fmt.Errorf("mulai transaksi hapus pegawai: %w", err)
	}
	defer tx.Rollback(ctx) //nolint:errcheck

	q := r.q.WithTx(tx)

	rows, err := q.SoftDeletePegawai(ctx, id)
	if err != nil {
		return fmt.Errorf("hapus pegawai: %w", err)
	}
	if rows == 0 {
		return ErrNotFound
	}

	if err := q.ClearPenanggungJawabKendaraan(ctx, id); err != nil {
		return fmt.Errorf("lepas penanggung jawab kendaraan: %w", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("commit hapus pegawai: %w", err)
	}
	return nil
}

// CountPeminjaman menghitung riwayat peminjaman milik pegawai.
func (r *PegawaiRepository) CountPeminjaman(ctx context.Context, pegawaiID int64) (int64, error) {
	total, err := r.q.CountPeminjamanByPegawai(ctx, pegawaiID)
	if err != nil {
		return 0, fmt.Errorf("hitung peminjaman pegawai: %w", err)
	}
	return total, nil
}

// PegawaiListParams adalah parameter list pegawai.
type PegawaiListParams struct {
	Search            string
	PerangkatDaerahID *int64
	Golongan          string
	StatusPegawai     string
	SortBy            string
	SortOrder         string
	Limit             int
	Offset            int
}

// PegawaiUpsertParams adalah parameter create/update pegawai.
type PegawaiUpsertParams struct {
	NIP               string
	Nama              string
	GelarDepan        any
	GelarBelakang     any
	Jabatan           string
	Golongan          string
	Pangkat           any
	PerangkatDaerahID int64
	Email             any
	Telepon           any
	TanggalLahir      pgtype.Date
	StatusPegawai     string
}

func nullableInt8(v *int64) pgtype.Int8 {
	if v == nil {
		return pgtype.Int8{}
	}
	return pgtype.Int8{Int64: *v, Valid: true}
}

func mapPegawaiError(err error) error {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		switch pgErr.Code {
		case "23505":
			return fmt.Errorf("%w: NIP sudah dipakai", ErrConflict)
		case "23503":
			return fmt.Errorf("%w: perangkat daerah tidak ditemukan", ErrInvalidReference)
		}
	}
	return fmt.Errorf("simpan pegawai: %w", err)
}

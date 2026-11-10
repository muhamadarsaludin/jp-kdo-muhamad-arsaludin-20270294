package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgtype"

	"kdo/backend/internal/database/sqlc"
)

// KendaraanRepository membungkus query kendaraan.
type KendaraanRepository struct {
	q *sqlc.Queries
}

// NewKendaraanRepository membuat repository kendaraan.
func NewKendaraanRepository(q *sqlc.Queries) *KendaraanRepository {
	return &KendaraanRepository{q: q}
}

// List mengambil kendaraan dengan filter dan pagination.
func (r *KendaraanRepository) List(ctx context.Context, p KendaraanListParams) ([]sqlc.ListKendaraanRow, int64, error) {
	rows, err := r.q.ListKendaraan(ctx, sqlc.ListKendaraanParams{
		Search:            nullableText(p.Search),
		PerangkatDaerahID: nullableInt8(p.PerangkatDaerahID),
		Kondisi:           nullableText(p.Kondisi),
		Status:            nullableText(p.Status),
		Jenis:             nullableText(p.Jenis),
		Tahun:             nullableInt2(p.Tahun),
		SortBy:            p.SortBy,
		SortOrder:         p.SortOrder,
		Limit:             int32(p.Limit),
		Offset:            int32(p.Offset),
	})
	if err != nil {
		return nil, 0, fmt.Errorf("list kendaraan: %w", err)
	}

	total, err := r.q.CountKendaraan(ctx, sqlc.CountKendaraanParams{
		Search:            nullableText(p.Search),
		PerangkatDaerahID: nullableInt8(p.PerangkatDaerahID),
		Kondisi:           nullableText(p.Kondisi),
		Status:            nullableText(p.Status),
		Jenis:             nullableText(p.Jenis),
		Tahun:             nullableInt2(p.Tahun),
	})
	if err != nil {
		return nil, 0, fmt.Errorf("hitung kendaraan: %w", err)
	}

	return rows, total, nil
}

// Get mengambil kendaraan berdasarkan id.
func (r *KendaraanRepository) Get(ctx context.Context, id int64) (sqlc.GetKendaraanRow, error) {
	row, err := r.q.GetKendaraan(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.GetKendaraanRow{}, ErrNotFound
		}
		return sqlc.GetKendaraanRow{}, fmt.Errorf("ambil kendaraan: %w", err)
	}
	return row, nil
}

// Create menyimpan kendaraan baru.
func (r *KendaraanRepository) Create(ctx context.Context, p KendaraanUpsertParams) (sqlc.Kendaraan, error) {
	row, err := r.q.CreateKendaraan(ctx, sqlc.CreateKendaraanParams{
		NomorPolisi:       p.NomorPolisi,
		NomorRangka:       p.NomorRangka,
		NomorMesin:        p.NomorMesin,
		Merek:             p.Merek,
		Tipe:              p.Tipe,
		TahunProduksi:     p.TahunProduksi,
		Warna:             p.Warna,
		Jenis:             p.Jenis,
		BahanBakar:        p.BahanBakar,
		KapasitasCc:       p.KapasitasCC,
		OdometerKm:        p.OdometerKm,
		Kondisi:           p.Kondisi,
		Status:            p.Status,
		TanggalPajak:      p.TanggalPajak,
		TanggalStnk:       p.TanggalSTNK,
		PerangkatDaerahID: p.PerangkatDaerahID,
		PenanggungJawabID: p.PenanggungJawabID,
		FotoUrl:           p.FotoURL,
		Keterangan:        p.Keterangan,
	})
	if err != nil {
		return sqlc.Kendaraan{}, mapKendaraanError(err)
	}
	return row, nil
}

// Update mengubah kendaraan.
func (r *KendaraanRepository) Update(ctx context.Context, id int64, p KendaraanUpsertParams) (sqlc.Kendaraan, error) {
	row, err := r.q.UpdateKendaraan(ctx, sqlc.UpdateKendaraanParams{
		NomorPolisi:       p.NomorPolisi,
		NomorRangka:       p.NomorRangka,
		NomorMesin:        p.NomorMesin,
		Merek:             p.Merek,
		Tipe:              p.Tipe,
		TahunProduksi:     p.TahunProduksi,
		Warna:             p.Warna,
		Jenis:             p.Jenis,
		BahanBakar:        p.BahanBakar,
		KapasitasCc:       p.KapasitasCC,
		OdometerKm:        p.OdometerKm,
		Kondisi:           p.Kondisi,
		Status:            p.Status,
		TanggalPajak:      p.TanggalPajak,
		TanggalStnk:       p.TanggalSTNK,
		PerangkatDaerahID: p.PerangkatDaerahID,
		PenanggungJawabID: p.PenanggungJawabID,
		FotoUrl:           p.FotoURL,
		Keterangan:        p.Keterangan,
		ID:                id,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.Kendaraan{}, ErrNotFound
		}
		return sqlc.Kendaraan{}, mapKendaraanError(err)
	}
	return row, nil
}

// SoftDelete menandai kendaraan terhapus.
func (r *KendaraanRepository) SoftDelete(ctx context.Context, id int64) (int64, error) {
	rows, err := r.q.SoftDeleteKendaraan(ctx, id)
	if err != nil {
		return 0, fmt.Errorf("hapus kendaraan: %w", err)
	}
	return rows, nil
}

// CountPeminjamanAktif menghitung peminjaman aktif kendaraan.
func (r *KendaraanRepository) CountPeminjamanAktif(ctx context.Context, id int64) (int64, error) {
	total, err := r.q.CountPeminjamanAktifByKendaraan(ctx, id)
	if err != nil {
		return 0, fmt.Errorf("hitung peminjaman aktif: %w", err)
	}
	return total, nil
}

// KendaraanListParams adalah parameter list kendaraan.
type KendaraanListParams struct {
	Search            string
	PerangkatDaerahID *int64
	Kondisi           string
	Status            string
	Jenis             string
	Tahun             *int
	SortBy            string
	SortOrder         string
	Limit             int
	Offset            int
}

// KendaraanUpsertParams adalah parameter create/update kendaraan.
type KendaraanUpsertParams struct {
	NomorPolisi       string
	NomorRangka       any
	NomorMesin        any
	Merek             string
	Tipe              string
	TahunProduksi     int16
	Warna             string
	Jenis             string
	BahanBakar        string
	KapasitasCC       pgtype.Int4
	OdometerKm        int32
	Kondisi           string
	Status            string
	TanggalPajak      pgtype.Date
	TanggalSTNK       pgtype.Date
	PerangkatDaerahID int64
	PenanggungJawabID pgtype.Int8
	FotoURL           any
	Keterangan        any
}

func nullableInt2(v *int) pgtype.Int2 {
	if v == nil {
		return pgtype.Int2{}
	}
	return pgtype.Int2{Int16: int16(*v), Valid: true}
}

func mapKendaraanError(err error) error {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		switch pgErr.Code {
		case "23505":
			switch pgErr.ConstraintName {
			case "uq_kendaraan_rangka":
				return fmt.Errorf("%w: nomor rangka sudah dipakai", ErrConflict)
			case "uq_kendaraan_mesin":
				return fmt.Errorf("%w: nomor mesin sudah dipakai", ErrConflict)
			default:
				return fmt.Errorf("%w: nomor polisi sudah dipakai", ErrConflict)
			}
		case "23503":
			return fmt.Errorf("%w: perangkat daerah atau penanggung jawab tidak ditemukan", ErrInvalidReference)
		}
	}
	return fmt.Errorf("simpan kendaraan: %w", err)
}

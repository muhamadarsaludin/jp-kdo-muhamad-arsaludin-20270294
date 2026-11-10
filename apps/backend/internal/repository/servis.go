package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"

	"kdo/backend/internal/database/sqlc"
)

// ServisRepository membungkus query servis.
type ServisRepository struct {
	q *sqlc.Queries
}

// NewServisRepository membuat repository servis.
func NewServisRepository(q *sqlc.Queries) *ServisRepository {
	return &ServisRepository{q: q}
}

// ListByKendaraan mengambil riwayat servis satu kendaraan.
func (r *ServisRepository) ListByKendaraan(ctx context.Context, kendaraanID int64, limit, offset int) ([]sqlc.ListServisByKendaraanRow, int64, error) {
	rows, err := r.q.ListServisByKendaraan(ctx, sqlc.ListServisByKendaraanParams{
		KendaraanID: kendaraanID,
		Limit:       int32(limit),
		Offset:      int32(offset),
	})
	if err != nil {
		return nil, 0, fmt.Errorf("list servis: %w", err)
	}

	total, err := r.q.CountServisByKendaraan(ctx, kendaraanID)
	if err != nil {
		return nil, 0, fmt.Errorf("hitung servis: %w", err)
	}
	return rows, total, nil
}

// Get mengambil satu servis.
func (r *ServisRepository) Get(ctx context.Context, id int64) (sqlc.GetServisRow, error) {
	row, err := r.q.GetServis(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.GetServisRow{}, ErrNotFound
		}
		return sqlc.GetServisRow{}, fmt.Errorf("ambil servis: %w", err)
	}
	return row, nil
}

// Create menyimpan servis baru.
func (r *ServisRepository) Create(ctx context.Context, p ServisUpsertParams) (sqlc.Servis, error) {
	row, err := r.q.CreateServis(ctx, sqlc.CreateServisParams{
		KendaraanID: p.KendaraanID,
		Tanggal:     p.Tanggal,
		Jenis:       p.Jenis,
		Deskripsi:   p.Deskripsi,
		Bengkel:     p.Bengkel,
		Biaya:       p.Biaya,
		OdometerKm:  p.OdometerKm,
	})
	if err != nil {
		return sqlc.Servis{}, fmt.Errorf("simpan servis: %w", err)
	}
	return row, nil
}

// Update mengubah servis.
func (r *ServisRepository) Update(ctx context.Context, id int64, p ServisUpsertParams) (sqlc.Servis, error) {
	row, err := r.q.UpdateServis(ctx, sqlc.UpdateServisParams{
		Tanggal:    p.Tanggal,
		Jenis:      p.Jenis,
		Deskripsi:  p.Deskripsi,
		Bengkel:    p.Bengkel,
		Biaya:      p.Biaya,
		OdometerKm: p.OdometerKm,
		ID:         id,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.Servis{}, ErrNotFound
		}
		return sqlc.Servis{}, fmt.Errorf("ubah servis: %w", err)
	}
	return row, nil
}

// SoftDelete menandai servis terhapus.
func (r *ServisRepository) SoftDelete(ctx context.Context, id int64) (int64, error) {
	rows, err := r.q.SoftDeleteServis(ctx, id)
	if err != nil {
		return 0, fmt.Errorf("hapus servis: %w", err)
	}
	return rows, nil
}

// TotalBiaya menghitung total biaya servis satu kendaraan.
func (r *ServisRepository) TotalBiaya(ctx context.Context, kendaraanID int64) (pgtype.Numeric, error) {
	total, err := r.q.TotalBiayaServisByKendaraan(ctx, kendaraanID)
	if err != nil {
		return pgtype.Numeric{}, fmt.Errorf("total biaya servis: %w", err)
	}
	return total, nil
}

// KendaraanAda memastikan kendaraan ada dan belum dihapus.
func (r *ServisRepository) KendaraanAda(ctx context.Context, id int64) (bool, error) {
	_, err := r.q.GetKendaraanRingkas(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return false, nil
		}
		return false, fmt.Errorf("cek kendaraan: %w", err)
	}
	return true, nil
}

// ServisUpsertParams adalah parameter create/update servis.
type ServisUpsertParams struct {
	KendaraanID int64
	Tanggal     pgtype.Date
	Jenis       string
	Deskripsi   string
	Bengkel     any
	Biaya       pgtype.Numeric
	OdometerKm  pgtype.Int4
}

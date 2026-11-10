package repository

import (
	"context"
	"fmt"

	"kdo/backend/internal/database/sqlc"
)

// DashboardRepository membungkus query statistik dashboard.
type DashboardRepository struct {
	q *sqlc.Queries
}

// NewDashboardRepository membuat repository dashboard.
func NewDashboardRepository(q *sqlc.Queries) *DashboardRepository {
	return &DashboardRepository{q: q}
}

// Ringkasan mengambil angka utama dashboard.
func (r *DashboardRepository) Ringkasan(ctx context.Context) (sqlc.DashboardRingkasanRow, error) {
	row, err := r.q.DashboardRingkasan(ctx)
	if err != nil {
		return sqlc.DashboardRingkasanRow{}, fmt.Errorf("ringkasan dashboard: %w", err)
	}
	return row, nil
}

// PerKondisi mengambil jumlah kendaraan per kondisi.
func (r *DashboardRepository) PerKondisi(ctx context.Context) ([]sqlc.DashboardKendaraanPerKondisiRow, error) {
	rows, err := r.q.DashboardKendaraanPerKondisi(ctx)
	if err != nil {
		return nil, fmt.Errorf("kendaraan per kondisi: %w", err)
	}
	return rows, nil
}

// PerOpd mengambil jumlah kendaraan per perangkat daerah.
func (r *DashboardRepository) PerOpd(ctx context.Context) ([]sqlc.DashboardKendaraanPerOpdRow, error) {
	rows, err := r.q.DashboardKendaraanPerOpd(ctx)
	if err != nil {
		return nil, fmt.Errorf("kendaraan per opd: %w", err)
	}
	return rows, nil
}

// BiayaBulanan mengambil total biaya servis beberapa bulan terakhir.
func (r *DashboardRepository) BiayaBulanan(ctx context.Context) ([]sqlc.DashboardBiayaServisBulananRow, error) {
	rows, err := r.q.DashboardBiayaServisBulanan(ctx)
	if err != nil {
		return nil, fmt.Errorf("biaya servis bulanan: %w", err)
	}
	return rows, nil
}

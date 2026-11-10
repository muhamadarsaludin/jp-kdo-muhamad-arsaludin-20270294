package service

import (
	"context"
	"time"

	"kdo/backend/internal/dto"
	"kdo/backend/internal/repository"
)

// DashboardService menyusun data statistik dashboard.
type DashboardService struct {
	repo *repository.DashboardRepository
}

// NewDashboardService membuat service dashboard.
func NewDashboardService(repo *repository.DashboardRepository) *DashboardService {
	return &DashboardService{repo: repo}
}

// Stats mengambil ringkasan utama.
func (s *DashboardService) Stats(ctx context.Context) (*dto.DashboardStats, error) {
	row, err := s.repo.Ringkasan(ctx)
	if err != nil {
		return nil, err
	}

	return &dto.DashboardStats{
		TotalKendaraan:      row.TotalKendaraan,
		Tersedia:            row.Tersedia,
		Digunakan:           row.Digunakan,
		Perbaikan:           row.Perbaikan,
		Dihapuskan:          row.Dihapuskan,
		TotalPegawai:        row.TotalPegawai,
		TotalOpd:            row.TotalOpd,
		PeminjamanDiajukan:  row.PeminjamanDiajukan,
		PeminjamanAktif:     row.PeminjamanAktif,
		BiayaServisBulanIni: numericKeFloat(row.BiayaBulanIni),
		BiayaServisTotal:    numericKeFloat(row.BiayaTotal),
	}, nil
}

// Kondisi mengambil jumlah kendaraan per kondisi.
func (s *DashboardService) Kondisi(ctx context.Context) ([]dto.DashboardKondisiItem, error) {
	rows, err := s.repo.PerKondisi(ctx)
	if err != nil {
		return nil, err
	}

	items := make([]dto.DashboardKondisiItem, 0, len(rows))
	for _, row := range rows {
		items = append(items, dto.DashboardKondisiItem{Kondisi: row.Kondisi, Total: row.Total})
	}
	return items, nil
}

// PerOpd mengambil jumlah kendaraan per perangkat daerah.
func (s *DashboardService) PerOpd(ctx context.Context) ([]dto.DashboardOpdItem, error) {
	rows, err := s.repo.PerOpd(ctx)
	if err != nil {
		return nil, err
	}

	items := make([]dto.DashboardOpdItem, 0, len(rows))
	for _, row := range rows {
		items = append(items, dto.DashboardOpdItem{Nama: row.Nama, Total: row.Total})
	}
	return items, nil
}

// BiayaBulanan mengembalikan 6 bulan terakhir, termasuk bulan tanpa data (0).
func (s *DashboardService) BiayaBulanan(ctx context.Context) ([]dto.DashboardBiayaBulananItem, error) {
	rows, err := s.repo.BiayaBulanan(ctx)
	if err != nil {
		return nil, err
	}

	perBulan := make(map[string]float64, len(rows))
	for _, row := range rows {
		perBulan[row.Bulan] = numericKeFloat(row.Total)
	}

	now := time.Now()
	mulai := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location()).AddDate(0, -5, 0)

	items := make([]dto.DashboardBiayaBulananItem, 0, 6)
	for i := 0; i < 6; i++ {
		bulan := mulai.AddDate(0, i, 0).Format("2006-01")
		items = append(items, dto.DashboardBiayaBulananItem{
			Bulan: bulan,
			Total: perBulan[bulan],
		})
	}
	return items, nil
}

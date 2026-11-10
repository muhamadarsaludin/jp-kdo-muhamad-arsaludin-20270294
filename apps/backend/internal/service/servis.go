package service

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgtype"

	"kdo/backend/internal/database/sqlc"
	"kdo/backend/internal/dto"
	"kdo/backend/internal/repository"
)

var daftarJenisServis = map[string]struct{}{
	"rutin": {}, "perbaikan": {}, "ganti_part": {},
}

// ServisService menangani aturan bisnis riwayat servis.
type ServisService struct {
	repo *repository.ServisRepository
}

// NewServisService membuat service servis.
func NewServisService(repo *repository.ServisRepository) *ServisService {
	return &ServisService{repo: repo}
}

// List mengembalikan riwayat servis satu kendaraan.
func (s *ServisService) List(ctx context.Context, kendaraanID int64, page, limit int) ([]dto.ServisResponse, int64, error) {
	ada, err := s.repo.KendaraanAda(ctx, kendaraanID)
	if err != nil {
		return nil, 0, err
	}
	if !ada {
		return nil, 0, repository.ErrNotFound
	}

	if limit <= 0 {
		limit = 10
	}
	if limit > 100 {
		limit = 100
	}
	if page <= 0 {
		page = 1
	}

	rows, total, err := s.repo.ListByKendaraan(ctx, kendaraanID, limit, (page-1)*limit)
	if err != nil {
		return nil, 0, err
	}

	items := make([]dto.ServisResponse, 0, len(rows))
	for _, row := range rows {
		items = append(items, mapListServis(row))
	}
	return items, total, nil
}

// Create menambah riwayat servis.
func (s *ServisService) Create(ctx context.Context, kendaraanID int64, req dto.ServisRequest) (*dto.ServisResponse, error) {
	ada, err := s.repo.KendaraanAda(ctx, kendaraanID)
	if err != nil {
		return nil, err
	}
	if !ada {
		return nil, repository.ErrNotFound
	}

	params, err := buildServisParams(kendaraanID, req)
	if err != nil {
		return nil, err
	}

	row, err := s.repo.Create(ctx, params)
	if err != nil {
		return nil, err
	}
	return s.Get(ctx, row.ID)
}

// Update mengubah riwayat servis.
func (s *ServisService) Update(ctx context.Context, id int64, req dto.ServisRequest) (*dto.ServisResponse, error) {
	existing, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	params, err := buildServisParams(existing.KendaraanID, req)
	if err != nil {
		return nil, err
	}

	if _, err := s.repo.Update(ctx, id, params); err != nil {
		return nil, err
	}
	return s.Get(ctx, id)
}

// Delete menghapus riwayat servis (soft delete).
func (s *ServisService) Delete(ctx context.Context, id int64) error {
	if _, err := s.repo.Get(ctx, id); err != nil {
		return err
	}

	rows, err := s.repo.SoftDelete(ctx, id)
	if err != nil {
		return err
	}
	if rows == 0 {
		return repository.ErrNotFound
	}
	return nil
}

// Get mengambil satu servis.
func (s *ServisService) Get(ctx context.Context, id int64) (*dto.ServisResponse, error) {
	row, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	res := mapGetServis(row)
	return &res, nil
}

func buildServisParams(kendaraanID int64, req dto.ServisRequest) (repository.ServisUpsertParams, error) {
	tgl, err := time.Parse("2006-01-02", strings.TrimSpace(req.Tanggal))
	if err != nil {
		return repository.ServisUpsertParams{}, fmt.Errorf("%w: tanggal harus berformat YYYY-MM-DD", ErrValidation)
	}

	if _, ok := daftarJenisServis[req.Jenis]; !ok {
		return repository.ServisUpsertParams{}, fmt.Errorf("%w: jenis servis tidak dikenal", ErrValidation)
	}

	deskripsi := strings.TrimSpace(req.Deskripsi)
	if deskripsi == "" {
		return repository.ServisUpsertParams{}, fmt.Errorf("%w: deskripsi wajib diisi", ErrValidation)
	}

	biaya, err := numericDariFloat(req.Biaya)
	if err != nil {
		return repository.ServisUpsertParams{}, fmt.Errorf("%w: biaya tidak valid", ErrValidation)
	}

	var odo pgtype.Int4
	if req.OdometerKm != nil {
		odo = pgtype.Int4{Int32: int32(*req.OdometerKm), Valid: true}
	}

	return repository.ServisUpsertParams{
		KendaraanID: kendaraanID,
		Tanggal:     pgtype.Date{Time: tgl, Valid: true},
		Jenis:       req.Jenis,
		Deskripsi:   deskripsi,
		Bengkel:     strings.TrimSpace(req.Bengkel),
		Biaya:       biaya,
		OdometerKm:  odo,
	}, nil
}

func numericDariFloat(v float64) (pgtype.Numeric, error) {
	var n pgtype.Numeric
	if err := n.Scan(strconv.FormatFloat(v, 'f', 2, 64)); err != nil {
		return pgtype.Numeric{}, err
	}
	return n, nil
}

func numericKeFloat(n pgtype.Numeric) float64 {
	if !n.Valid {
		return 0
	}
	f, err := n.Float64Value()
	if err != nil {
		return 0
	}
	return f.Float64
}

func mapListServis(s sqlc.ListServisByKendaraanRow) dto.ServisResponse {
	return mapServis(
		s.ID, s.KendaraanID, s.NomorPolisi, s.Merek, s.Tanggal, s.Jenis, s.Deskripsi,
		s.Bengkel, s.Biaya, s.OdometerKm, s.CreatedAt, s.UpdatedAt,
	)
}

func mapGetServis(s sqlc.GetServisRow) dto.ServisResponse {
	return mapServis(
		s.ID, s.KendaraanID, s.NomorPolisi, s.Merek, s.Tanggal, s.Jenis, s.Deskripsi,
		s.Bengkel, s.Biaya, s.OdometerKm, s.CreatedAt, s.UpdatedAt,
	)
}

func mapServis(
	id, kendaraanID int64, nomorPolisi, merek string,
	tanggal pgtype.Date, jenis, deskripsi string,
	bengkel pgtype.Text, biaya pgtype.Numeric, odometer pgtype.Int4,
	createdAt, updatedAt pgtype.Timestamptz,
) dto.ServisResponse {
	var odo *int32
	if odometer.Valid {
		v := odometer.Int32
		odo = &v
	}

	tgl := ""
	if tanggal.Valid {
		tgl = tanggal.Time.Format("2006-01-02")
	}

	return dto.ServisResponse{
		ID:          id,
		KendaraanID: kendaraanID,
		NomorPolisi: nomorPolisi,
		Merek:       merek,
		Tanggal:     tgl,
		Jenis:       jenis,
		Deskripsi:   deskripsi,
		Bengkel:     textOrEmpty(bengkel.String, bengkel.Valid),
		Biaya:       numericKeFloat(biaya),
		OdometerKm:  odo,
		CreatedAt:   createdAt.Time,
		UpdatedAt:   updatedAt.Time,
	}
}

package service

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"kdo/backend/internal/database/sqlc"
	"kdo/backend/internal/dto"
	"kdo/backend/internal/repository"
)

var (
	// ErrValidation dikembalikan bila data tidak lolos validasi bisnis.
	ErrValidation = errors.New("validasi gagal")
	// ErrHasRelation dikembalikan bila data masih dipakai entitas lain.
	ErrHasRelation = errors.New("data masih memiliki relasi")
)

// PerangkatDaerahService menangani aturan bisnis perangkat daerah.
type PerangkatDaerahService struct {
	repo *repository.PerangkatDaerahRepository
}

// NewPerangkatDaerahService membuat service perangkat daerah.
func NewPerangkatDaerahService(repo *repository.PerangkatDaerahRepository) *PerangkatDaerahService {
	return &PerangkatDaerahService{repo: repo}
}

// List mengembalikan data dengan filter, sorting, dan pagination.
func (s *PerangkatDaerahService) List(ctx context.Context, q dto.PerangkatDaerahListQuery) ([]dto.PerangkatDaerahResponse, int64, error) {
	sortBy, sortOrder := normalisasiSort(q.SortBy, q.SortOrder)
	limit := q.Limit
	if limit <= 0 {
		limit = 10
	}
	if limit > 100 {
		limit = 100
	}
	page := q.Page
	if page <= 0 {
		page = 1
	}

	rows, total, err := s.repo.List(ctx, repository.ListParams{
		Search:    strings.TrimSpace(q.Search),
		IsActive:  q.IsActive,
		SortBy:    sortBy,
		SortOrder: sortOrder,
		Limit:     limit,
		Offset:    (page - 1) * limit,
	})
	if err != nil {
		return nil, 0, err
	}

	items := make([]dto.PerangkatDaerahResponse, 0, len(rows))
	for _, row := range rows {
		items = append(items, mapPerangkatDaerah(row))
	}
	return items, total, nil
}

// Get mengambil satu data.
func (s *PerangkatDaerahService) Get(ctx context.Context, id int64) (*dto.PerangkatDaerahResponse, error) {
	row, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	res := mapPerangkatDaerah(row)
	return &res, nil
}

// Create menambah data baru.
func (s *PerangkatDaerahService) Create(ctx context.Context, req dto.PerangkatDaerahRequest) (*dto.PerangkatDaerahResponse, error) {
	params, err := buildUpsertParams(req, true)
	if err != nil {
		return nil, err
	}

	row, err := s.repo.Create(ctx, params)
	if err != nil {
		return nil, err
	}
	res := mapPerangkatDaerah(row)
	return &res, nil
}

// Update mengubah data.
func (s *PerangkatDaerahService) Update(ctx context.Context, id int64, req dto.PerangkatDaerahRequest) (*dto.PerangkatDaerahResponse, error) {
	existing, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	params, err := buildUpsertParams(req, existing.IsActive)
	if err != nil {
		return nil, err
	}

	row, err := s.repo.Update(ctx, id, params)
	if err != nil {
		return nil, err
	}
	res := mapPerangkatDaerah(row)
	return &res, nil
}

// Delete melakukan soft delete setelah memastikan tidak ada relasi aktif.
func (s *PerangkatDaerahService) Delete(ctx context.Context, id int64) error {
	if _, err := s.repo.Get(ctx, id); err != nil {
		return err
	}

	pegawai, kendaraan, err := s.repo.CountRelasi(ctx, id)
	if err != nil {
		return err
	}
	if pegawai > 0 || kendaraan > 0 {
		return fmt.Errorf("%w: masih ada %d pegawai dan %d kendaraan", ErrHasRelation, pegawai, kendaraan)
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

func buildUpsertParams(req dto.PerangkatDaerahRequest, isActiveDefault bool) (repository.UpsertParams, error) {
	kode := strings.ToUpper(strings.TrimSpace(req.Kode))
	nama := strings.TrimSpace(req.Nama)

	if kode == "" {
		return repository.UpsertParams{}, fmt.Errorf("%w: kode wajib diisi", ErrValidation)
	}
	if nama == "" {
		return repository.UpsertParams{}, fmt.Errorf("%w: nama wajib diisi", ErrValidation)
	}

	aktif := isActiveDefault
	if req.IsActive != nil {
		aktif = *req.IsActive
	}

	return repository.UpsertParams{
		Kode:       kode,
		Nama:       nama,
		Singkatan:  strings.TrimSpace(req.Singkatan),
		Alamat:     strings.TrimSpace(req.Alamat),
		Telepon:    strings.TrimSpace(req.Telepon),
		Email:      strings.ToLower(strings.TrimSpace(req.Email)),
		NamaKepala: strings.TrimSpace(req.NamaKepala),
		IsActive:   aktif,
	}, nil
}

func normalisasiSort(sortBy, sortOrder string) (string, string) {
	by := strings.ToLower(strings.TrimSpace(sortBy))
	switch by {
	case "nama", "kode", "created_at":
	default:
		by = "nama"
	}

	order := strings.ToLower(strings.TrimSpace(sortOrder))
	if order != "desc" {
		order = "asc"
	}
	return by, order
}

func mapPerangkatDaerah(p sqlc.PerangkatDaerah) dto.PerangkatDaerahResponse {
	return dto.PerangkatDaerahResponse{
		ID:         p.ID,
		Kode:       p.Kode,
		Nama:       p.Nama,
		Singkatan:  textOrEmpty(p.Singkatan.String, p.Singkatan.Valid),
		Alamat:     textOrEmpty(p.Alamat.String, p.Alamat.Valid),
		Telepon:    textOrEmpty(p.Telepon.String, p.Telepon.Valid),
		Email:      textOrEmpty(p.Email.String, p.Email.Valid),
		NamaKepala: textOrEmpty(p.NamaKepala.String, p.NamaKepala.Valid),
		IsActive:   p.IsActive,
		CreatedAt:  p.CreatedAt.Time,
		UpdatedAt:  p.UpdatedAt.Time,
	}
}

func textOrEmpty(v string, valid bool) string {
	if !valid {
		return ""
	}
	return v
}

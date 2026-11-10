package service

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"golang.org/x/crypto/bcrypt"

	"kdo/backend/internal/dto"
	"kdo/backend/internal/repository"
)

// ErrCannotModifySelf dikembalikan saat admin mencoba menonaktifkan/menghapus akunnya sendiri.
var ErrCannotModifySelf = errors.New("tidak dapat mengubah status akun sendiri")

// PenggunaService menangani manajemen akun.
type PenggunaService struct {
	repo *repository.PenggunaAdminRepository
}

// NewPenggunaService membuat service manajemen akun.
func NewPenggunaService(repo *repository.PenggunaAdminRepository) *PenggunaService {
	return &PenggunaService{repo: repo}
}

// List mengembalikan daftar akun.
func (s *PenggunaService) List(ctx context.Context, q dto.PenggunaListQuery) ([]dto.PenggunaAdminResponse, int64, error) {
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

	rows, total, err := s.repo.List(ctx, repository.PenggunaListParams{
		Search:   strings.TrimSpace(q.Search),
		Role:     q.Role,
		IsActive: q.IsActive,
		Limit:    limit,
		Offset:   (page - 1) * limit,
	})
	if err != nil {
		return nil, 0, err
	}

	items := make([]dto.PenggunaAdminResponse, 0, len(rows))
	for _, row := range rows {
		items = append(items, dto.PenggunaAdminResponse{
			ID:        row.ID,
			Nama:      row.Nama,
			Email:     row.Email,
			Role:      row.Role,
			IsActive:  row.IsActive,
			CreatedAt: row.CreatedAt.Time,
			UpdatedAt: row.UpdatedAt.Time,
		})
	}
	return items, total, nil
}

// Create menambah akun dengan password ter-hash.
func (s *PenggunaService) Create(ctx context.Context, req dto.PenggunaRequest) (*dto.PenggunaAdminResponse, error) {
	if len(req.Password) < 8 {
		return nil, fmt.Errorf("%w: password minimal 8 karakter", ErrValidation)
	}
	if strings.TrimSpace(req.Nama) == "" {
		return nil, fmt.Errorf("%w: nama wajib diisi", ErrValidation)
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("hash password: %w", err)
	}

	aktif := true
	if req.IsActive != nil {
		aktif = *req.IsActive
	}

	row, err := s.repo.Create(ctx, repository.PenggunaUpsertParams{
		Nama:         strings.TrimSpace(req.Nama),
		Email:        strings.ToLower(strings.TrimSpace(req.Email)),
		PasswordHash: string(hash),
		Role:         req.Role,
		IsActive:     aktif,
	})
	if err != nil {
		return nil, err
	}

	return &dto.PenggunaAdminResponse{
		ID:        row.ID,
		Nama:      row.Nama,
		Email:     row.Email,
		Role:      row.Role,
		IsActive:  row.IsActive,
		CreatedAt: row.CreatedAt.Time,
		UpdatedAt: row.UpdatedAt.Time,
	}, nil
}

// Update mengubah akun. Password hanya diubah bila diisi.
func (s *PenggunaService) Update(ctx context.Context, id, currentID int64, req dto.PenggunaRequest) (*dto.PenggunaAdminResponse, error) {
	existing, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	aktif := existing.IsActive
	if req.IsActive != nil {
		aktif = *req.IsActive
	}
	if id == currentID && !aktif {
		return nil, ErrCannotModifySelf
	}

	hash := ""
	if req.Password != "" {
		if len(req.Password) < 8 {
			return nil, fmt.Errorf("%w: password minimal 8 karakter", ErrValidation)
		}
		h, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return nil, fmt.Errorf("hash password: %w", err)
		}
		hash = string(h)
	}

	row, err := s.repo.Update(ctx, id, repository.PenggunaUpsertParams{
		Nama:         strings.TrimSpace(req.Nama),
		Email:        strings.ToLower(strings.TrimSpace(req.Email)),
		PasswordHash: hash,
		Role:         req.Role,
		IsActive:     aktif,
	})
	if err != nil {
		return nil, err
	}

	return &dto.PenggunaAdminResponse{
		ID:        row.ID,
		Nama:      row.Nama,
		Email:     row.Email,
		Role:      row.Role,
		IsActive:  row.IsActive,
		CreatedAt: row.CreatedAt.Time,
		UpdatedAt: row.UpdatedAt.Time,
	}, nil
}

// Delete menghapus akun, kecuali akun sendiri.
func (s *PenggunaService) Delete(ctx context.Context, id, currentID int64) error {
	if id == currentID {
		return ErrCannotModifySelf
	}

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

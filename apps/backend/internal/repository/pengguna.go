package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"

	"kdo/backend/internal/database/sqlc"
)

// ErrNotFound dikembalikan bila data tidak ditemukan.
var ErrNotFound = errors.New("data tidak ditemukan")

// PenggunaRepository membungkus query pengguna dari sqlc.
type PenggunaRepository struct {
	q *sqlc.Queries
}

// NewPenggunaRepository membuat repository pengguna.
func NewPenggunaRepository(q *sqlc.Queries) *PenggunaRepository {
	return &PenggunaRepository{q: q}
}

// FindByEmail mencari pengguna aktif berdasarkan email (case-insensitive).
func (r *PenggunaRepository) FindByEmail(ctx context.Context, email string) (sqlc.Pengguna, error) {
	row, err := r.q.GetPenggunaByEmail(ctx, email)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.Pengguna{}, ErrNotFound
		}
		return sqlc.Pengguna{}, fmt.Errorf("cari pengguna berdasarkan email: %w", err)
	}
	return row, nil
}

// FindByID mencari pengguna berdasarkan id.
func (r *PenggunaRepository) FindByID(ctx context.Context, id int64) (sqlc.Pengguna, error) {
	row, err := r.q.GetPenggunaByID(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.Pengguna{}, ErrNotFound
		}
		return sqlc.Pengguna{}, fmt.Errorf("cari pengguna berdasarkan id: %w", err)
	}
	return row, nil
}

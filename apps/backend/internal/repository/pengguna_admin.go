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

// PenggunaAdminRepository membungkus query manajemen akun.
type PenggunaAdminRepository struct {
	q *sqlc.Queries
}

// NewPenggunaAdminRepository membuat repository manajemen akun.
func NewPenggunaAdminRepository(q *sqlc.Queries) *PenggunaAdminRepository {
	return &PenggunaAdminRepository{q: q}
}

// List mengambil daftar akun.
func (r *PenggunaAdminRepository) List(ctx context.Context, p PenggunaListParams) ([]sqlc.ListPenggunaRow, int64, error) {
	rows, err := r.q.ListPengguna(ctx, sqlc.ListPenggunaParams{
		Search:   nullableText(p.Search),
		Role:     nullableText(p.Role),
		IsActive: nullableBool(p.IsActive),
		Limit:    int32(p.Limit),
		Offset:   int32(p.Offset),
	})
	if err != nil {
		return nil, 0, fmt.Errorf("list pengguna: %w", err)
	}

	total, err := r.q.CountPengguna(ctx, sqlc.CountPenggunaParams{
		Search:   nullableText(p.Search),
		Role:     nullableText(p.Role),
		IsActive: nullableBool(p.IsActive),
	})
	if err != nil {
		return nil, 0, fmt.Errorf("hitung pengguna: %w", err)
	}
	return rows, total, nil
}

// Get mengambil satu akun.
func (r *PenggunaAdminRepository) Get(ctx context.Context, id int64) (sqlc.Pengguna, error) {
	row, err := r.q.GetPenggunaByID(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.Pengguna{}, ErrNotFound
		}
		return sqlc.Pengguna{}, fmt.Errorf("ambil pengguna: %w", err)
	}
	return row, nil
}

// Create menyimpan akun baru.
func (r *PenggunaAdminRepository) Create(ctx context.Context, p PenggunaUpsertParams) (sqlc.CreatePenggunaRow, error) {
	row, err := r.q.CreatePengguna(ctx, sqlc.CreatePenggunaParams{
		Nama:         p.Nama,
		Email:        p.Email,
		PasswordHash: p.PasswordHash,
		Role:         p.Role,
		IsActive:     p.IsActive,
	})
	if err != nil {
		return sqlc.CreatePenggunaRow{}, mapPenggunaError(err)
	}
	return row, nil
}

// Update mengubah akun.
func (r *PenggunaAdminRepository) Update(ctx context.Context, id int64, p PenggunaUpsertParams) (sqlc.UpdatePenggunaRow, error) {
	var hash pgtype.Text
	if p.PasswordHash != "" {
		hash = pgtype.Text{String: p.PasswordHash, Valid: true}
	}

	row, err := r.q.UpdatePengguna(ctx, sqlc.UpdatePenggunaParams{
		Nama:         p.Nama,
		Email:        p.Email,
		Role:         p.Role,
		IsActive:     p.IsActive,
		PasswordHash: hash,
		ID:           id,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.UpdatePenggunaRow{}, ErrNotFound
		}
		return sqlc.UpdatePenggunaRow{}, mapPenggunaError(err)
	}
	return row, nil
}

// SoftDelete menghapus akun.
func (r *PenggunaAdminRepository) SoftDelete(ctx context.Context, id int64) (int64, error) {
	rows, err := r.q.SoftDeletePengguna(ctx, id)
	if err != nil {
		return 0, fmt.Errorf("hapus pengguna: %w", err)
	}
	return rows, nil
}

// PenggunaListParams adalah parameter list akun.
type PenggunaListParams struct {
	Search   string
	Role     string
	IsActive *bool
	Limit    int
	Offset   int
}

// PenggunaUpsertParams adalah parameter create/update akun.
type PenggunaUpsertParams struct {
	Nama         string
	Email        string
	PasswordHash string
	Role         string
	IsActive     bool
}

func mapPenggunaError(err error) error {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) && pgErr.Code == "23505" {
		return fmt.Errorf("%w: email sudah dipakai", ErrConflict)
	}
	return fmt.Errorf("simpan pengguna: %w", err)
}

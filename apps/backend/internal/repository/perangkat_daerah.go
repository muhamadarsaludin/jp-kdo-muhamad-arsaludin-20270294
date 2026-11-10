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

// ErrConflict dikembalikan bila terjadi pelanggaran constraint unik.
var ErrConflict = errors.New("data sudah ada")

// PerangkatDaerahRepository membungkus query perangkat daerah.
type PerangkatDaerahRepository struct {
	q *sqlc.Queries
}

// NewPerangkatDaerahRepository membuat repository perangkat daerah.
func NewPerangkatDaerahRepository(q *sqlc.Queries) *PerangkatDaerahRepository {
	return &PerangkatDaerahRepository{q: q}
}

// List mengambil data dengan filter dan pagination.
func (r *PerangkatDaerahRepository) List(ctx context.Context, p ListParams) ([]sqlc.PerangkatDaerah, int64, error) {
	rows, err := r.q.ListPerangkatDaerah(ctx, sqlc.ListPerangkatDaerahParams{
		Search:    nullableText(p.Search),
		IsActive:  nullableBool(p.IsActive),
		SortBy:    p.SortBy,
		SortOrder: p.SortOrder,
		Limit:     int32(p.Limit),
		Offset:    int32(p.Offset),
	})
	if err != nil {
		return nil, 0, fmt.Errorf("list perangkat daerah: %w", err)
	}

	total, err := r.q.CountPerangkatDaerah(ctx, sqlc.CountPerangkatDaerahParams{
		Search:   nullableText(p.Search),
		IsActive: nullableBool(p.IsActive),
	})
	if err != nil {
		return nil, 0, fmt.Errorf("hitung perangkat daerah: %w", err)
	}

	return rows, total, nil
}

// Get mengambil satu data berdasarkan id.
func (r *PerangkatDaerahRepository) Get(ctx context.Context, id int64) (sqlc.PerangkatDaerah, error) {
	row, err := r.q.GetPerangkatDaerah(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.PerangkatDaerah{}, ErrNotFound
		}
		return sqlc.PerangkatDaerah{}, fmt.Errorf("ambil perangkat daerah: %w", err)
	}
	return row, nil
}

// Create menyimpan data baru.
func (r *PerangkatDaerahRepository) Create(ctx context.Context, p UpsertParams) (sqlc.PerangkatDaerah, error) {
	row, err := r.q.CreatePerangkatDaerah(ctx, sqlc.CreatePerangkatDaerahParams{
		Kode:       p.Kode,
		Nama:       p.Nama,
		Singkatan:  p.Singkatan,
		Alamat:     p.Alamat,
		Telepon:    p.Telepon,
		Email:      p.Email,
		NamaKepala: p.NamaKepala,
		IsActive:   p.IsActive,
	})
	if err != nil {
		return sqlc.PerangkatDaerah{}, mapUniqueViolation(err, "perangkat daerah")
	}
	return row, nil
}

// Update mengubah data yang sudah ada.
func (r *PerangkatDaerahRepository) Update(ctx context.Context, id int64, p UpsertParams) (sqlc.PerangkatDaerah, error) {
	row, err := r.q.UpdatePerangkatDaerah(ctx, sqlc.UpdatePerangkatDaerahParams{
		Kode:       p.Kode,
		Nama:       p.Nama,
		Singkatan:  p.Singkatan,
		Alamat:     p.Alamat,
		Telepon:    p.Telepon,
		Email:      p.Email,
		NamaKepala: p.NamaKepala,
		IsActive:   p.IsActive,
		ID:         id,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return sqlc.PerangkatDaerah{}, ErrNotFound
		}
		return sqlc.PerangkatDaerah{}, mapUniqueViolation(err, "perangkat daerah")
	}
	return row, nil
}

// SoftDelete menandai data terhapus.
func (r *PerangkatDaerahRepository) SoftDelete(ctx context.Context, id int64) (int64, error) {
	rows, err := r.q.SoftDeletePerangkatDaerah(ctx, id)
	if err != nil {
		return 0, fmt.Errorf("hapus perangkat daerah: %w", err)
	}
	return rows, nil
}

// CountRelasi menghitung pegawai dan kendaraan yang masih terkait.
func (r *PerangkatDaerahRepository) CountRelasi(ctx context.Context, id int64) (pegawai, kendaraan int64, err error) {
	row, err := r.q.CountRelasiPerangkatDaerah(ctx, id)
	if err != nil {
		return 0, 0, fmt.Errorf("hitung relasi perangkat daerah: %w", err)
	}
	return row.Pegawai, row.Kendaraan, nil
}

// Params dipakai repository; didefinisikan di sini agar service tidak
// bergantung pada tipe sqlc.
type ListParams struct {
	Search    string
	IsActive  *bool
	SortBy    string
	SortOrder string
	Limit     int
	Offset    int
}

type UpsertParams struct {
	Kode       string
	Nama       string
	Singkatan  string
	Alamat     string
	Telepon    string
	Email      string
	NamaKepala string
	IsActive   bool
}

func nullableText(v string) pgtype.Text {
	return pgtype.Text{String: v, Valid: v != ""}
}

func nullableBool(v *bool) pgtype.Bool {
	if v == nil {
		return pgtype.Bool{}
	}
	return pgtype.Bool{Bool: *v, Valid: true}
}

func mapUniqueViolation(err error, entitas string) error {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) && pgErr.Code == "23505" {
		switch pgErr.ConstraintName {
		case "uq_pd_kode":
			return fmt.Errorf("%w: kode %s sudah dipakai", ErrConflict, entitas)
		case "uq_pd_nama":
			return fmt.Errorf("%w: nama %s sudah dipakai", ErrConflict, entitas)
		default:
			return fmt.Errorf("%w: %s dengan nilai tersebut sudah ada", ErrConflict, entitas)
		}
	}
	return fmt.Errorf("simpan %s: %w", entitas, err)
}

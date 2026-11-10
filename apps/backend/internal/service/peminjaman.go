package service

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgtype"

	"kdo/backend/internal/database/sqlc"
	"kdo/backend/internal/dto"
	"kdo/backend/internal/repository"
)

var (
	// ErrInvalidTransition dikembalikan bila status peminjaman tidak memungkinkan aksi tersebut.
	ErrInvalidTransition = errors.New("status peminjaman tidak memungkinkan aksi ini")
	// ErrJadwalBentrok dikembalikan bila jadwal beririsan dengan peminjaman aktif lain.
	ErrJadwalBentrok = errors.New("jadwal kendaraan bentrok")
)

var daftarStatusPeminjaman = map[string]struct{}{
	"diajukan": {}, "disetujui": {}, "ditolak": {}, "selesai": {}, "dibatalkan": {},
}

// PeminjamanService menangani aturan bisnis peminjaman.
type PeminjamanService struct {
	repo *repository.PeminjamanRepository
}

// NewPeminjamanService membuat service peminjaman.
func NewPeminjamanService(repo *repository.PeminjamanRepository) *PeminjamanService {
	return &PeminjamanService{repo: repo}
}

// List mengembalikan peminjaman dengan filter dan pagination.
func (s *PeminjamanService) List(ctx context.Context, q dto.PeminjamanListQuery) ([]dto.PeminjamanResponse, int64, error) {
	if q.Status != "" {
		if _, ok := daftarStatusPeminjaman[q.Status]; !ok {
			return nil, 0, fmt.Errorf("%w: status peminjaman tidak dikenal", ErrValidation)
		}
	}

	sortBy, sortOrder := normalisasiSortPeminjaman(q.SortBy, q.SortOrder)
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

	rows, total, err := s.repo.List(ctx, repository.PeminjamanListParams{
		Search:      strings.TrimSpace(q.Search),
		Status:      q.Status,
		KendaraanID: q.KendaraanID,
		PegawaiID:   q.PegawaiID,
		Dari:        q.Dari,
		Sampai:      q.Sampai,
		SortBy:      sortBy,
		SortOrder:   sortOrder,
		Limit:       limit,
		Offset:      (page - 1) * limit,
	})
	if err != nil {
		return nil, 0, err
	}

	items := make([]dto.PeminjamanResponse, 0, len(rows))
	for _, row := range rows {
		items = append(items, mapListPeminjaman(row))
	}
	return items, total, nil
}

// Get mengambil satu peminjaman.
func (s *PeminjamanService) Get(ctx context.Context, id int64) (*dto.PeminjamanResponse, error) {
	row, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	res := mapGetPeminjaman(row)
	return &res, nil
}

// Create mengajukan peminjaman baru.
func (s *PeminjamanService) Create(ctx context.Context, req dto.PeminjamanRequest) (*dto.PeminjamanResponse, error) {
	mulai, err := parseWaktu(req.TanggalMulai, "tanggal_mulai")
	if err != nil {
		return nil, err
	}
	selesai, err := parseWaktu(req.TanggalSelesai, "tanggal_selesai")
	if err != nil {
		return nil, err
	}
	if !selesai.After(mulai) {
		return nil, fmt.Errorf("%w: tanggal selesai harus setelah tanggal mulai", ErrValidation)
	}

	keperluan := strings.TrimSpace(req.Keperluan)
	tujuan := strings.TrimSpace(req.Tujuan)
	if keperluan == "" || tujuan == "" {
		return nil, fmt.Errorf("%w: keperluan dan tujuan wajib diisi", ErrValidation)
	}

	kendaraan, err := s.repo.KendaraanRingkas(ctx, req.KendaraanID)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			return nil, fmt.Errorf("%w: kendaraan tidak ditemukan", ErrValidation)
		}
		return nil, err
	}
	if kendaraan.Status != "tersedia" {
		return nil, fmt.Errorf("%w: kendaraan tidak tersedia (status %s)", ErrValidation, kendaraan.Status)
	}

	pegawai, err := s.repo.PegawaiRingkas(ctx, req.PegawaiID)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			return nil, fmt.Errorf("%w: pegawai tidak ditemukan", ErrValidation)
		}
		return nil, err
	}

	bentrok, err := s.repo.CountBentrok(ctx, req.KendaraanID, mulai, selesai)
	if err != nil {
		return nil, err
	}
	if bentrok > 0 {
		return nil, fmt.Errorf("%w: kendaraan sudah dipinjam pada rentang waktu tersebut", ErrJadwalBentrok)
	}

	row, err := s.repo.Create(ctx, repository.PeminjamanCreateParams{
		KendaraanID:       req.KendaraanID,
		PegawaiID:         req.PegawaiID,
		PerangkatDaerahID: pegawai.PerangkatDaerahID,
		Keperluan:         keperluan,
		Tujuan:            tujuan,
		TanggalMulai:      pgtype.Timestamptz{Time: mulai, Valid: true},
		TanggalSelesai:    pgtype.Timestamptz{Time: selesai, Valid: true},
		Catatan:           strings.TrimSpace(req.Catatan),
	})
	if err != nil {
		if errors.Is(err, repository.ErrConflict) {
			return nil, fmt.Errorf("%w: kendaraan sudah dipinjam pada rentang waktu tersebut", ErrJadwalBentrok)
		}
		return nil, err
	}

	return s.Get(ctx, row.ID)
}

// Setujui menyetujui pengajuan dan menandai kendaraan digunakan.
func (s *PeminjamanService) Setujui(ctx context.Context, id, penggunaID int64) (*dto.PeminjamanResponse, error) {
	return s.transition(ctx, id, "diajukan", "disetujui", &penggunaID, "", "digunakan")
}

// Tolak menolak pengajuan tanpa mengubah status kendaraan.
func (s *PeminjamanService) Tolak(ctx context.Context, id, penggunaID int64, catatan string) (*dto.PeminjamanResponse, error) {
	return s.transition(ctx, id, "diajukan", "ditolak", &penggunaID, catatan, "")
}

// Selesai menandai peminjaman selesai dan mengembalikan kendaraan ke tersedia.
func (s *PeminjamanService) Selesai(ctx context.Context, id int64) (*dto.PeminjamanResponse, error) {
	return s.transition(ctx, id, "disetujui", "selesai", nil, "", "tersedia")
}

// Batalkan membatalkan peminjaman yang masih diajukan atau disetujui.
func (s *PeminjamanService) Batalkan(ctx context.Context, id int64) (*dto.PeminjamanResponse, error) {
	row, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	switch row.Status {
	case "diajukan":
		return s.transition(ctx, id, "diajukan", "dibatalkan", nil, "", "")
	case "disetujui":
		return s.transition(ctx, id, "disetujui", "dibatalkan", nil, "", "tersedia")
	default:
		return nil, fmt.Errorf("%w: status saat ini %s", ErrInvalidTransition, row.Status)
	}
}

func (s *PeminjamanService) transition(
	ctx context.Context,
	id int64,
	statusLama, statusBaru string,
	penggunaID *int64,
	catatan, kendaraanStatus string,
) (*dto.PeminjamanResponse, error) {
	row, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	if row.Status != statusLama {
		return nil, fmt.Errorf("%w: status saat ini %s", ErrInvalidTransition, row.Status)
	}

	ok, err := s.repo.Transition(ctx, id, statusLama, statusBaru, penggunaID, strings.TrimSpace(catatan), kendaraanStatus)
	if err != nil {
		return nil, err
	}
	if !ok {
		return nil, fmt.Errorf("%w: data berubah, silakan muat ulang", ErrInvalidTransition)
	}

	return s.Get(ctx, id)
}

func parseWaktu(v, field string) (time.Time, error) {
	raw := strings.TrimSpace(v)
	if raw == "" {
		return time.Time{}, fmt.Errorf("%w: %s wajib diisi", ErrValidation, field)
	}

	layouts := []string{time.RFC3339, "2006-01-02T15:04", "2006-01-02 15:04"}
	for _, layout := range layouts {
		if layout == time.RFC3339 {
			if t, err := time.Parse(layout, raw); err == nil {
				return t, nil
			}
			continue
		}
		if t, err := time.ParseInLocation(layout, raw, time.Local); err == nil {
			return t, nil
		}
	}

	return time.Time{}, fmt.Errorf("%w: %s harus berformat tanggal ISO-8601", ErrValidation, field)
}

func normalisasiSortPeminjaman(sortBy, sortOrder string) (string, string) {
	by := strings.ToLower(strings.TrimSpace(sortBy))
	switch by {
	case "tanggal_mulai", "kode_peminjaman", "created_at":
	default:
		by = "tanggal_mulai"
	}

	order := strings.ToLower(strings.TrimSpace(sortOrder))
	switch order {
	case "asc", "desc":
	default:
		order = "desc"
	}
	return by, order
}

func mapListPeminjaman(p sqlc.ListPeminjamanRow) dto.PeminjamanResponse {
	return mapPeminjaman(
		p.ID, p.KodePeminjaman, p.KendaraanID, p.NomorPolisi, p.Merek, p.Tipe,
		p.PegawaiID, p.PegawaiNama, p.PerangkatDaerahID, p.PerangkatDaerahNama,
		p.Keperluan, p.Tujuan, p.TanggalMulai, p.TanggalSelesai, p.Status, p.Catatan,
		p.DisetujuiOleh, p.PenyetujuNama, p.CreatedAt, p.UpdatedAt,
	)
}

func mapGetPeminjaman(p sqlc.GetPeminjamanRow) dto.PeminjamanResponse {
	return mapPeminjaman(
		p.ID, p.KodePeminjaman, p.KendaraanID, p.NomorPolisi, p.Merek, p.Tipe,
		p.PegawaiID, p.PegawaiNama, p.PerangkatDaerahID, p.PerangkatDaerahNama,
		p.Keperluan, p.Tujuan, p.TanggalMulai, p.TanggalSelesai, p.Status, p.Catatan,
		p.DisetujuiOleh, p.PenyetujuNama, p.CreatedAt, p.UpdatedAt,
	)
}

func mapPeminjaman(
	id int64, kode string,
	kendaraanID int64, nopol, merek, tipe string,
	pegawaiID int64, pegawaiNama string,
	perangkatDaerahID int64, perangkatDaerahNama string,
	keperluan, tujuan string,
	mulai, selesai pgtype.Timestamptz,
	status string, catatan pgtype.Text,
	disetujuiOleh pgtype.Int8, penyetujuNama pgtype.Text,
	createdAt, updatedAt pgtype.Timestamptz,
) dto.PeminjamanResponse {
	var approver *int64
	if disetujuiOleh.Valid {
		v := disetujuiOleh.Int64
		approver = &v
	}

	return dto.PeminjamanResponse{
		ID:                   id,
		KodePeminjaman:       kode,
		KendaraanID:          kendaraanID,
		KendaraanNomorPolisi: nopol,
		KendaraanMerek:       merek,
		KendaraanTipe:        tipe,
		PegawaiID:            pegawaiID,
		PegawaiNama:          pegawaiNama,
		PerangkatDaerahID:    perangkatDaerahID,
		PerangkatDaerahNama:  perangkatDaerahNama,
		Keperluan:            keperluan,
		Tujuan:               tujuan,
		TanggalMulai:         mulai.Time,
		TanggalSelesai:       selesai.Time,
		Status:               status,
		Catatan:              textOrEmpty(catatan.String, catatan.Valid),
		DisetujuiOleh:        approver,
		PenyetujuNama:        textOrEmpty(penyetujuNama.String, penyetujuNama.Valid),
		CreatedAt:            createdAt.Time,
		UpdatedAt:            updatedAt.Time,
	}
}

// Export mengambil seluruh peminjaman sesuai filter tanpa pagination.
func (s *PeminjamanService) Export(ctx context.Context, q dto.PeminjamanListQuery) ([]dto.PeminjamanResponse, error) {
	sortBy, sortOrder := normalisasiSortPeminjaman(q.SortBy, q.SortOrder)

	rows, _, err := s.repo.List(ctx, repository.PeminjamanListParams{
		Search:      strings.TrimSpace(q.Search),
		Status:      q.Status,
		KendaraanID: q.KendaraanID,
		PegawaiID:   q.PegawaiID,
		Dari:        q.Dari,
		Sampai:      q.Sampai,
		SortBy:      sortBy,
		SortOrder:   sortOrder,
		Limit:       ExportLimit,
		Offset:      0,
	})
	if err != nil {
		return nil, err
	}

	items := make([]dto.PeminjamanResponse, 0, len(rows))
	for _, row := range rows {
		items = append(items, mapListPeminjaman(row))
	}
	return items, nil
}

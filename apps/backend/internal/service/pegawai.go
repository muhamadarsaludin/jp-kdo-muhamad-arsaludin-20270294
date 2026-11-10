package service

import (
	"context"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgtype"

	"kdo/backend/internal/database/sqlc"
	"kdo/backend/internal/dto"
	"kdo/backend/internal/repository"
)

var nipPattern = regexp.MustCompile(`^[0-9]{18}$`)

var daftarGolongan = map[string]struct{}{
	"I/a": {}, "I/b": {}, "I/c": {}, "I/d": {},
	"II/a": {}, "II/b": {}, "II/c": {}, "II/d": {},
	"III/a": {}, "III/b": {}, "III/c": {}, "III/d": {},
	"IV/a": {}, "IV/b": {}, "IV/c": {}, "IV/d": {}, "IV/e": {},
}

var daftarStatusPegawai = map[string]struct{}{
	"aktif": {}, "nonaktif": {}, "pensiun": {},
}

// PegawaiService menangani aturan bisnis pegawai.
type PegawaiService struct {
	repo *repository.PegawaiRepository
}

// NewPegawaiService membuat service pegawai.
func NewPegawaiService(repo *repository.PegawaiRepository) *PegawaiService {
	return &PegawaiService{repo: repo}
}

// List mengembalikan pegawai dengan filter dan pagination.
func (s *PegawaiService) List(ctx context.Context, q dto.PegawaiListQuery) ([]dto.PegawaiResponse, int64, error) {
	if q.Golongan != "" {
		if _, ok := daftarGolongan[q.Golongan]; !ok {
			return nil, 0, fmt.Errorf("%w: golongan tidak dikenal", ErrValidation)
		}
	}
	if q.StatusPegawai != "" {
		if _, ok := daftarStatusPegawai[q.StatusPegawai]; !ok {
			return nil, 0, fmt.Errorf("%w: status pegawai tidak dikenal", ErrValidation)
		}
	}

	sortBy, sortOrder := normalisasiSortPegawai(q.SortBy, q.SortOrder)
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

	rows, total, err := s.repo.List(ctx, repository.PegawaiListParams{
		Search:            strings.TrimSpace(q.Search),
		PerangkatDaerahID: q.PerangkatDaerahID,
		Golongan:          q.Golongan,
		StatusPegawai:     q.StatusPegawai,
		SortBy:            sortBy,
		SortOrder:         sortOrder,
		Limit:             limit,
		Offset:            (page - 1) * limit,
	})
	if err != nil {
		return nil, 0, err
	}

	items := make([]dto.PegawaiResponse, 0, len(rows))
	for _, row := range rows {
		items = append(items, mapListPegawai(row))
	}
	return items, total, nil
}

// Get mengambil satu pegawai.
func (s *PegawaiService) Get(ctx context.Context, id int64) (*dto.PegawaiResponse, error) {
	row, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	res := mapGetPegawai(row)
	return &res, nil
}

// Create menambah pegawai.
func (s *PegawaiService) Create(ctx context.Context, req dto.PegawaiRequest) (*dto.PegawaiResponse, error) {
	params, err := buildUpsertPegawai(req)
	if err != nil {
		return nil, err
	}

	row, err := s.repo.Create(ctx, params)
	if err != nil {
		return nil, err
	}
	return s.Get(ctx, row.ID)
}

// Update mengubah pegawai.
func (s *PegawaiService) Update(ctx context.Context, id int64, req dto.PegawaiRequest) (*dto.PegawaiResponse, error) {
	if _, err := s.repo.Get(ctx, id); err != nil {
		return nil, err
	}

	params, err := buildUpsertPegawai(req)
	if err != nil {
		return nil, err
	}

	if _, err := s.repo.Update(ctx, id, params); err != nil {
		return nil, err
	}
	return s.Get(ctx, id)
}

// Delete melakukan soft delete bila pegawai tidak punya riwayat peminjaman.
func (s *PegawaiService) Delete(ctx context.Context, id int64) error {
	if _, err := s.repo.Get(ctx, id); err != nil {
		return err
	}

	total, err := s.repo.CountPeminjaman(ctx, id)
	if err != nil {
		return err
	}
	if total > 0 {
		return fmt.Errorf("%w: pegawai masih memiliki %d riwayat peminjaman", ErrHasRelation, total)
	}

	return s.repo.Delete(ctx, id)
}

func buildUpsertPegawai(req dto.PegawaiRequest) (repository.PegawaiUpsertParams, error) {
	nip := strings.TrimSpace(req.NIP)
	if !nipPattern.MatchString(nip) {
		return repository.PegawaiUpsertParams{}, fmt.Errorf("%w: NIP harus 18 digit angka", ErrValidation)
	}

	nama := strings.TrimSpace(req.Nama)
	jabatan := strings.TrimSpace(req.Jabatan)
	if nama == "" || jabatan == "" {
		return repository.PegawaiUpsertParams{}, fmt.Errorf("%w: nama dan jabatan wajib diisi", ErrValidation)
	}

	if _, ok := daftarGolongan[req.Golongan]; !ok {
		return repository.PegawaiUpsertParams{}, fmt.Errorf("%w: golongan tidak dikenal", ErrValidation)
	}

	status := strings.TrimSpace(req.StatusPegawai)
	if status == "" {
		status = "aktif"
	}
	if _, ok := daftarStatusPegawai[status]; !ok {
		return repository.PegawaiUpsertParams{}, fmt.Errorf("%w: status pegawai tidak dikenal", ErrValidation)
	}

	var tanggalLahir pgtype.Date
	if raw := strings.TrimSpace(req.TanggalLahir); raw != "" {
		tgl, err := time.Parse("2006-01-02", raw)
		if err != nil {
			return repository.PegawaiUpsertParams{}, fmt.Errorf("%w: tanggal_lahir harus berformat YYYY-MM-DD", ErrValidation)
		}
		tanggalLahir = pgtype.Date{Time: tgl, Valid: true}
	}

	return repository.PegawaiUpsertParams{
		NIP:               nip,
		Nama:              nama,
		GelarDepan:        strings.TrimSpace(req.GelarDepan),
		GelarBelakang:     strings.TrimSpace(req.GelarBelakang),
		Jabatan:           jabatan,
		Golongan:          req.Golongan,
		Pangkat:           strings.TrimSpace(req.Pangkat),
		PerangkatDaerahID: req.PerangkatDaerahID,
		Email:             strings.ToLower(strings.TrimSpace(req.Email)),
		Telepon:           strings.TrimSpace(req.Telepon),
		TanggalLahir:      tanggalLahir,
		StatusPegawai:     status,
	}, nil
}

func normalisasiSortPegawai(sortBy, sortOrder string) (string, string) {
	by := strings.ToLower(strings.TrimSpace(sortBy))
	switch by {
	case "nama", "nip", "created_at":
	default:
		by = "nama"
	}

	order := strings.ToLower(strings.TrimSpace(sortOrder))
	if order != "desc" {
		order = "asc"
	}
	return by, order
}

func mapListPegawai(p sqlc.ListPegawaiRow) dto.PegawaiResponse {
	return mapPegawai(
		p.ID, p.Nip, p.Nama,
		textOrEmpty(p.GelarDepan.String, p.GelarDepan.Valid),
		textOrEmpty(p.GelarBelakang.String, p.GelarBelakang.Valid),
		p.Jabatan, p.Golongan,
		textOrEmpty(p.Pangkat.String, p.Pangkat.Valid),
		p.PerangkatDaerahID, p.PerangkatDaerahNama,
		textOrEmpty(p.Email.String, p.Email.Valid),
		textOrEmpty(p.Telepon.String, p.Telepon.Valid),
		p.TanggalLahir, p.StatusPegawai, p.CreatedAt, p.UpdatedAt,
	)
}

func mapGetPegawai(p sqlc.GetPegawaiRow) dto.PegawaiResponse {
	return mapPegawai(
		p.ID, p.Nip, p.Nama,
		textOrEmpty(p.GelarDepan.String, p.GelarDepan.Valid),
		textOrEmpty(p.GelarBelakang.String, p.GelarBelakang.Valid),
		p.Jabatan, p.Golongan,
		textOrEmpty(p.Pangkat.String, p.Pangkat.Valid),
		p.PerangkatDaerahID, p.PerangkatDaerahNama,
		textOrEmpty(p.Email.String, p.Email.Valid),
		textOrEmpty(p.Telepon.String, p.Telepon.Valid),
		p.TanggalLahir, p.StatusPegawai, p.CreatedAt, p.UpdatedAt,
	)
}

func mapPegawai(
	id int64,
	nip, nama, gelarDepan, gelarBelakang, jabatan, golongan, pangkat string,
	perangkatDaerahID int64,
	perangkatDaerahNama, email, telepon string,
	tanggalLahir pgtype.Date,
	statusPegawai string,
	createdAt, updatedAt pgtype.Timestamptz,
) dto.PegawaiResponse {
	tgl := ""
	if tanggalLahir.Valid {
		tgl = tanggalLahir.Time.Format("2006-01-02")
	}

	return dto.PegawaiResponse{
		ID:                  id,
		NIP:                 nip,
		Nama:                nama,
		GelarDepan:          gelarDepan,
		GelarBelakang:       gelarBelakang,
		Jabatan:             jabatan,
		Golongan:            golongan,
		Pangkat:             pangkat,
		PerangkatDaerahID:   perangkatDaerahID,
		PerangkatDaerahNama: perangkatDaerahNama,
		Email:               email,
		Telepon:             telepon,
		TanggalLahir:        tgl,
		StatusPegawai:       statusPegawai,
		CreatedAt:           createdAt.Time,
		UpdatedAt:           updatedAt.Time,
	}
}

// Export mengambil seluruh pegawai sesuai filter tanpa pagination.
func (s *PegawaiService) Export(ctx context.Context, q dto.PegawaiListQuery) ([]dto.PegawaiResponse, error) {
	sortBy, sortOrder := normalisasiSortPegawai(q.SortBy, q.SortOrder)

	rows, _, err := s.repo.List(ctx, repository.PegawaiListParams{
		Search:            strings.TrimSpace(q.Search),
		PerangkatDaerahID: q.PerangkatDaerahID,
		Golongan:          q.Golongan,
		StatusPegawai:     q.StatusPegawai,
		SortBy:            sortBy,
		SortOrder:         sortOrder,
		Limit:             ExportLimit,
		Offset:            0,
	})
	if err != nil {
		return nil, err
	}

	items := make([]dto.PegawaiResponse, 0, len(rows))
	for _, row := range rows {
		items = append(items, mapListPegawai(row))
	}
	return items, nil
}

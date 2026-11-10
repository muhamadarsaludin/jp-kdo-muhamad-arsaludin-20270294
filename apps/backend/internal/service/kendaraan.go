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

var nomorPolisiPattern = regexp.MustCompile(`^[A-Z]{1,2} [0-9]{1,4} [A-Z]{1,3}$`)

var daftarKondisi = map[string]struct{}{
	"baik": {}, "rusak_ringan": {}, "rusak_berat": {},
}

var daftarStatusKendaraan = map[string]struct{}{
	"tersedia": {}, "digunakan": {}, "perbaikan": {}, "dihapuskan": {},
}

var daftarJenisKendaraan = map[string]struct{}{
	"motor": {}, "mobil": {}, "minibus": {}, "pickup": {}, "ambulans": {},
}

var daftarBahanBakar = map[string]struct{}{
	"bensin": {}, "solar": {}, "listrik": {}, "hybrid": {},
}

// KendaraanService menangani aturan bisnis kendaraan.
type KendaraanService struct {
	repo *repository.KendaraanRepository
}

// NewKendaraanService membuat service kendaraan.
func NewKendaraanService(repo *repository.KendaraanRepository) *KendaraanService {
	return &KendaraanService{repo: repo}
}

// List mengembalikan kendaraan dengan filter dan pagination.
func (s *KendaraanService) List(ctx context.Context, q dto.KendaraanListQuery) ([]dto.KendaraanResponse, int64, error) {
	if q.Kondisi != "" {
		if _, ok := daftarKondisi[q.Kondisi]; !ok {
			return nil, 0, fmt.Errorf("%w: kondisi tidak dikenal", ErrValidation)
		}
	}
	if q.Status != "" {
		if _, ok := daftarStatusKendaraan[q.Status]; !ok {
			return nil, 0, fmt.Errorf("%w: status tidak dikenal", ErrValidation)
		}
	}
	if q.Jenis != "" {
		if _, ok := daftarJenisKendaraan[q.Jenis]; !ok {
			return nil, 0, fmt.Errorf("%w: jenis kendaraan tidak dikenal", ErrValidation)
		}
	}

	sortBy, sortOrder := normalisasiSortKendaraan(q.SortBy, q.SortOrder)
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

	rows, total, err := s.repo.List(ctx, repository.KendaraanListParams{
		Search:            strings.TrimSpace(q.Search),
		PerangkatDaerahID: q.PerangkatDaerahID,
		Kondisi:           q.Kondisi,
		Status:            q.Status,
		Jenis:             q.Jenis,
		Tahun:             q.Tahun,
		SortBy:            sortBy,
		SortOrder:         sortOrder,
		Limit:             limit,
		Offset:            (page - 1) * limit,
	})
	if err != nil {
		return nil, 0, err
	}

	items := make([]dto.KendaraanResponse, 0, len(rows))
	for _, row := range rows {
		items = append(items, mapListKendaraan(row))
	}
	return items, total, nil
}

// Get mengambil satu kendaraan.
func (s *KendaraanService) Get(ctx context.Context, id int64) (*dto.KendaraanResponse, error) {
	row, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	res := mapGetKendaraan(row)
	return &res, nil
}

// Create menambah kendaraan.
func (s *KendaraanService) Create(ctx context.Context, req dto.KendaraanRequest) (*dto.KendaraanResponse, error) {
	params, err := buildKendaraanParams(req)
	if err != nil {
		return nil, err
	}

	row, err := s.repo.Create(ctx, params)
	if err != nil {
		return nil, err
	}
	return s.Get(ctx, row.ID)
}

// Update mengubah kendaraan, dengan proteksi status saat ada peminjaman aktif.
func (s *KendaraanService) Update(ctx context.Context, id int64, req dto.KendaraanRequest) (*dto.KendaraanResponse, error) {
	existing, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	aktif, err := s.repo.CountPeminjamanAktif(ctx, id)
	if err != nil {
		return nil, err
	}

	params, err := buildKendaraanParams(req)
	if err != nil {
		return nil, err
	}

	if aktif > 0 && params.Status != existing.Status {
		return nil, fmt.Errorf("%w: status kendaraan dikunci selama ada peminjaman aktif", ErrHasRelation)
	}

	if _, err := s.repo.Update(ctx, id, params); err != nil {
		return nil, err
	}
	return s.Get(ctx, id)
}

// Delete melakukan soft delete bila tidak ada peminjaman aktif.
func (s *KendaraanService) Delete(ctx context.Context, id int64) error {
	if _, err := s.repo.Get(ctx, id); err != nil {
		return err
	}

	aktif, err := s.repo.CountPeminjamanAktif(ctx, id)
	if err != nil {
		return err
	}
	if aktif > 0 {
		return fmt.Errorf("%w: kendaraan masih memiliki %d peminjaman aktif", ErrHasRelation, aktif)
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

func buildKendaraanParams(req dto.KendaraanRequest) (repository.KendaraanUpsertParams, error) {
	nopol := normalisasiNomorPolisi(req.NomorPolisi)
	if !nomorPolisiPattern.MatchString(nopol) {
		return repository.KendaraanUpsertParams{}, fmt.Errorf("%w: nomor polisi harus berformat seperti 'B 1234 XYZ'", ErrValidation)
	}

	if _, ok := daftarJenisKendaraan[req.Jenis]; !ok {
		return repository.KendaraanUpsertParams{}, fmt.Errorf("%w: jenis kendaraan tidak dikenal", ErrValidation)
	}

	status := strings.TrimSpace(req.Status)
	if status == "" {
		status = "tersedia"
	}
	if _, ok := daftarStatusKendaraan[status]; !ok {
		return repository.KendaraanUpsertParams{}, fmt.Errorf("%w: status tidak dikenal", ErrValidation)
	}

	kondisi := strings.TrimSpace(req.Kondisi)
	if kondisi == "" {
		kondisi = "baik"
	}
	if _, ok := daftarKondisi[kondisi]; !ok {
		return repository.KendaraanUpsertParams{}, fmt.Errorf("%w: kondisi tidak dikenal", ErrValidation)
	}

	bahanBakar := strings.TrimSpace(req.BahanBakar)
	if bahanBakar == "" {
		bahanBakar = "bensin"
	}
	if _, ok := daftarBahanBakar[bahanBakar]; !ok {
		return repository.KendaraanUpsertParams{}, fmt.Errorf("%w: bahan bakar tidak dikenal", ErrValidation)
	}

	if req.TahunProduksi < 1980 || req.TahunProduksi > time.Now().Year()+1 {
		return repository.KendaraanUpsertParams{}, fmt.Errorf("%w: tahun produksi tidak valid", ErrValidation)
	}

	var kapasitas pgtype.Int4
	if req.KapasitasCC != nil {
		kapasitas = pgtype.Int4{Int32: int32(*req.KapasitasCC), Valid: true}
	}

	var pj pgtype.Int8
	if req.PenanggungJawabID != nil {
		pj = pgtype.Int8{Int64: *req.PenanggungJawabID, Valid: true}
	}

	pajak, err := parseTanggalOpsional(req.TanggalPajak, "tanggal_pajak")
	if err != nil {
		return repository.KendaraanUpsertParams{}, err
	}
	stnk, err := parseTanggalOpsional(req.TanggalSTNK, "tanggal_stnk")
	if err != nil {
		return repository.KendaraanUpsertParams{}, err
	}

	return repository.KendaraanUpsertParams{
		NomorPolisi:       nopol,
		NomorRangka:       strings.ToUpper(strings.TrimSpace(req.NomorRangka)),
		NomorMesin:        strings.ToUpper(strings.TrimSpace(req.NomorMesin)),
		Merek:             strings.TrimSpace(req.Merek),
		Tipe:              strings.TrimSpace(req.Tipe),
		TahunProduksi:     int16(req.TahunProduksi),
		Warna:             strings.TrimSpace(req.Warna),
		Jenis:             req.Jenis,
		BahanBakar:        bahanBakar,
		KapasitasCC:       kapasitas,
		OdometerKm:        int32(req.OdometerKm),
		Kondisi:           kondisi,
		Status:            status,
		TanggalPajak:      pajak,
		TanggalSTNK:       stnk,
		PerangkatDaerahID: req.PerangkatDaerahID,
		PenanggungJawabID: pj,
		FotoURL:           strings.TrimSpace(req.FotoURL),
		Keterangan:        strings.TrimSpace(req.Keterangan),
	}, nil
}

func normalisasiNomorPolisi(v string) string {
	return strings.ToUpper(strings.Join(strings.Fields(v), " "))
}

func parseTanggalOpsional(v, field string) (pgtype.Date, error) {
	raw := strings.TrimSpace(v)
	if raw == "" {
		return pgtype.Date{}, nil
	}
	tgl, err := time.Parse("2006-01-02", raw)
	if err != nil {
		return pgtype.Date{}, fmt.Errorf("%w: %s harus berformat YYYY-MM-DD", ErrValidation, field)
	}
	return pgtype.Date{Time: tgl, Valid: true}, nil
}

func normalisasiSortKendaraan(sortBy, sortOrder string) (string, string) {
	by := strings.ToLower(strings.TrimSpace(sortBy))
	switch by {
	case "nomor_polisi", "merek", "tahun_produksi", "created_at":
	default:
		by = "nomor_polisi"
	}

	order := strings.ToLower(strings.TrimSpace(sortOrder))
	if order != "desc" {
		order = "asc"
	}
	return by, order
}

func mapListKendaraan(k sqlc.ListKendaraanRow) dto.KendaraanResponse {
	return mapKendaraan(
		k.ID, k.NomorPolisi,
		textOrEmpty(k.NomorRangka.String, k.NomorRangka.Valid),
		textOrEmpty(k.NomorMesin.String, k.NomorMesin.Valid),
		k.Merek, k.Tipe, k.TahunProduksi, k.Warna, k.Jenis, k.BahanBakar,
		k.KapasitasCc, k.OdometerKm, k.Kondisi, k.Status,
		k.TanggalPajak, k.TanggalStnk,
		k.PerangkatDaerahID, k.PerangkatDaerahNama,
		k.PenanggungJawabID,
		textOrEmpty(k.PenanggungJawabNama.String, k.PenanggungJawabNama.Valid),
		textOrEmpty(k.FotoUrl.String, k.FotoUrl.Valid),
		textOrEmpty(k.Keterangan.String, k.Keterangan.Valid),
		k.CreatedAt, k.UpdatedAt,
	)
}

func mapGetKendaraan(k sqlc.GetKendaraanRow) dto.KendaraanResponse {
	return mapKendaraan(
		k.ID, k.NomorPolisi,
		textOrEmpty(k.NomorRangka.String, k.NomorRangka.Valid),
		textOrEmpty(k.NomorMesin.String, k.NomorMesin.Valid),
		k.Merek, k.Tipe, k.TahunProduksi, k.Warna, k.Jenis, k.BahanBakar,
		k.KapasitasCc, k.OdometerKm, k.Kondisi, k.Status,
		k.TanggalPajak, k.TanggalStnk,
		k.PerangkatDaerahID, k.PerangkatDaerahNama,
		k.PenanggungJawabID,
		textOrEmpty(k.PenanggungJawabNama.String, k.PenanggungJawabNama.Valid),
		textOrEmpty(k.FotoUrl.String, k.FotoUrl.Valid),
		textOrEmpty(k.Keterangan.String, k.Keterangan.Valid),
		k.CreatedAt, k.UpdatedAt,
	)
}

func mapKendaraan(
	id int64, nomorPolisi, nomorRangka, nomorMesin, merek, tipe string,
	tahunProduksi int16, warna, jenis, bahanBakar string,
	kapasitasCC pgtype.Int4, odometerKm int32, kondisi, status string,
	tanggalPajak, tanggalSTNK pgtype.Date,
	perangkatDaerahID int64, perangkatDaerahNama string,
	penanggungJawabID pgtype.Int8, penanggungJawabNama string,
	fotoURL, keterangan string,
	createdAt, updatedAt pgtype.Timestamptz,
) dto.KendaraanResponse {
	var cc *int32
	if kapasitasCC.Valid {
		v := kapasitasCC.Int32
		cc = &v
	}

	var pj *int64
	if penanggungJawabID.Valid {
		v := penanggungJawabID.Int64
		pj = &v
	}

	pajak := ""
	if tanggalPajak.Valid {
		pajak = tanggalPajak.Time.Format("2006-01-02")
	}
	stnk := ""
	if tanggalSTNK.Valid {
		stnk = tanggalSTNK.Time.Format("2006-01-02")
	}

	return dto.KendaraanResponse{
		ID:                  id,
		NomorPolisi:         nomorPolisi,
		NomorRangka:         nomorRangka,
		NomorMesin:          nomorMesin,
		Merek:               merek,
		Tipe:                tipe,
		TahunProduksi:       tahunProduksi,
		Warna:               warna,
		Jenis:               jenis,
		BahanBakar:          bahanBakar,
		KapasitasCC:         cc,
		OdometerKm:          odometerKm,
		Kondisi:             kondisi,
		Status:              status,
		TanggalPajak:        pajak,
		TanggalSTNK:         stnk,
		PerangkatDaerahID:   perangkatDaerahID,
		PerangkatDaerahNama: perangkatDaerahNama,
		PenanggungJawabID:   pj,
		PenanggungJawabNama: penanggungJawabNama,
		FotoURL:             fotoURL,
		Keterangan:          keterangan,
		CreatedAt:           createdAt.Time,
		UpdatedAt:           updatedAt.Time,
	}
}

// ExportLimit adalah batas maksimum baris untuk export CSV.
const ExportLimit = 100000

// Export mengambil seluruh kendaraan sesuai filter tanpa pagination.
func (s *KendaraanService) Export(ctx context.Context, q dto.KendaraanListQuery) ([]dto.KendaraanResponse, error) {
	sortBy, sortOrder := normalisasiSortKendaraan(q.SortBy, q.SortOrder)

	rows, _, err := s.repo.List(ctx, repository.KendaraanListParams{
		Search:            strings.TrimSpace(q.Search),
		PerangkatDaerahID: q.PerangkatDaerahID,
		Kondisi:           q.Kondisi,
		Status:            q.Status,
		Jenis:             q.Jenis,
		Tahun:             q.Tahun,
		SortBy:            sortBy,
		SortOrder:         sortOrder,
		Limit:             ExportLimit,
		Offset:            0,
	})
	if err != nil {
		return nil, err
	}

	items := make([]dto.KendaraanResponse, 0, len(rows))
	for _, row := range rows {
		items = append(items, mapListKendaraan(row))
	}
	return items, nil
}

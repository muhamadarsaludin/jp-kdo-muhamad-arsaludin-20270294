package handler

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"kdo/backend/internal/dto"
	"kdo/backend/internal/response"
	"kdo/backend/internal/service"
)

// ExportHandler menangani export CSV.
type ExportHandler struct {
	kendaraan  *service.KendaraanService
	pegawai    *service.PegawaiService
	peminjaman *service.PeminjamanService
}

// NewExportHandler membuat handler export.
func NewExportHandler(kendaraan *service.KendaraanService, pegawai *service.PegawaiService, peminjaman *service.PeminjamanService) *ExportHandler {
	return &ExportHandler{kendaraan: kendaraan, pegawai: pegawai, peminjaman: peminjaman}
}

// Kendaraan mengunduh CSV kendaraan.
//
//	@Summary		Export kendaraan CSV
//	@Tags			export
//	@Produce		text/csv
//	@Security		BearerAuth
//	@Param			search		query		string	false	"Cari nopol/merek/tipe"
//	@Param			status		query		string	false	"Filter status"
//	@Param			kondisi		query		string	false	"Filter kondisi"
//	@Param			jenis		query		string	false	"Filter jenis"
//	@Success		200			{file}		file	"berkas CSV"
//	@Failure		401			{object}	response.ErrorBody
//	@Router			/api/v1/export/kendaraan.csv [get]
func (h *ExportHandler) Kendaraan(c *gin.Context) {
	q := dto.KendaraanListQuery{
		Search:  c.Query("search"),
		Kondisi: c.Query("kondisi"),
		Status:  c.Query("status"),
		Jenis:   c.Query("jenis"),
	}

	if raw := c.Query("perangkat_daerah_id"); raw != "" {
		if id, err := strconv.ParseInt(raw, 10, 64); err == nil && id > 0 {
			q.PerangkatDaerahID = &id
		}
	}
	if raw := c.Query("tahun"); raw != "" {
		if tahun, err := strconv.Atoi(raw); err == nil {
			q.Tahun = &tahun
		}
	}

	items, err := h.kendaraan.Export(c.Request.Context(), q)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Gagal menyiapkan export", nil)
		return
	}

	rows := make([][]string, 0, len(items))
	for _, k := range items {
		cc := ""
		if k.KapasitasCC != nil {
			cc = strconv.Itoa(int(*k.KapasitasCC))
		}
		rows = append(rows, []string{
			k.NomorPolisi, k.Merek, k.Tipe, strconv.Itoa(int(k.TahunProduksi)), k.Warna,
			k.Jenis, k.BahanBakar, cc, strconv.Itoa(int(k.OdometerKm)), k.Kondisi, k.Status,
			k.PerangkatDaerahNama, k.PenanggungJawabNama, k.TanggalPajak, k.TanggalSTNK,
		})
	}

	writeCSV(c, "kendaraan.csv", []string{
		"nomor_polisi", "merek", "tipe", "tahun_produksi", "warna", "jenis", "bahan_bakar",
		"kapasitas_cc", "odometer_km", "kondisi", "status", "perangkat_daerah",
		"penanggung_jawab", "tanggal_pajak", "tanggal_stnk",
	}, rows)
}

// Pegawai mengunduh CSV pegawai.
//
//	@Summary		Export pegawai CSV
//	@Tags			export
//	@Produce		text/csv
//	@Security		BearerAuth
//	@Param			search		query		string	false	"Cari nama/NIP"
//	@Param			golongan	query		string	false	"Filter golongan"
//	@Param			status		query		string	false	"Filter status pegawai"
//	@Success		200			{file}		file	"berkas CSV"
//	@Failure		401			{object}	response.ErrorBody
//	@Router			/api/v1/export/pegawai.csv [get]
func (h *ExportHandler) Pegawai(c *gin.Context) {
	q := dto.PegawaiListQuery{
		Search:        c.Query("search"),
		Golongan:      c.Query("golongan"),
		StatusPegawai: c.Query("status"),
	}

	if raw := c.Query("perangkat_daerah_id"); raw != "" {
		if id, err := strconv.ParseInt(raw, 10, 64); err == nil && id > 0 {
			q.PerangkatDaerahID = &id
		}
	}

	items, err := h.pegawai.Export(c.Request.Context(), q)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Gagal menyiapkan export", nil)
		return
	}

	rows := make([][]string, 0, len(items))
	for _, p := range items {
		rows = append(rows, []string{
			p.NIP, p.Nama, p.GelarDepan, p.GelarBelakang, p.Jabatan, p.Golongan, p.Pangkat,
			p.PerangkatDaerahNama, p.Email, p.Telepon, p.TanggalLahir, p.StatusPegawai,
		})
	}

	writeCSV(c, "pegawai.csv", []string{
		"nip", "nama", "gelar_depan", "gelar_belakang", "jabatan", "golongan", "pangkat",
		"perangkat_daerah", "email", "telepon", "tanggal_lahir", "status_pegawai",
	}, rows)
}

// Peminjaman mengunduh CSV peminjaman.
//
//	@Summary		Export peminjaman CSV
//	@Tags			export
//	@Produce		text/csv
//	@Security		BearerAuth
//	@Param			search		query		string	false	"Cari kode/keperluan/tujuan"
//	@Param			status		query		string	false	"Filter status"
//	@Param			dari		query		string	false	"Tanggal mulai"
//	@Param			sampai		query		string	false	"Tanggal selesai"
//	@Success		200			{file}		file	"berkas CSV"
//	@Failure		401			{object}	response.ErrorBody
//	@Router			/api/v1/export/peminjaman.csv [get]
func (h *ExportHandler) Peminjaman(c *gin.Context) {
	q := dto.PeminjamanListQuery{
		Search: c.Query("search"),
		Status: c.Query("status"),
	}

	if raw := c.Query("kendaraan_id"); raw != "" {
		if id, err := strconv.ParseInt(raw, 10, 64); err == nil && id > 0 {
			q.KendaraanID = &id
		}
	}
	if raw := c.Query("pegawai_id"); raw != "" {
		if id, err := strconv.ParseInt(raw, 10, 64); err == nil && id > 0 {
			q.PegawaiID = &id
		}
	}
	if raw := c.Query("dari"); raw != "" {
		if tgl, err := parseWaktuQuery(raw, false); err == nil {
			q.Dari = &tgl
		}
	}
	if raw := c.Query("sampai"); raw != "" {
		if tgl, err := parseWaktuQuery(raw, true); err == nil {
			q.Sampai = &tgl
		}
	}

	items, err := h.peminjaman.Export(c.Request.Context(), q)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Gagal menyiapkan export", nil)
		return
	}

	const layout = "2006-01-02 15:04"
	rows := make([][]string, 0, len(items))
	for _, p := range items {
		rows = append(rows, []string{
			p.KodePeminjaman, p.KendaraanNomorPolisi, p.PegawaiNama, p.PerangkatDaerahNama,
			p.Keperluan, p.Tujuan,
			p.TanggalMulai.In(time.Local).Format(layout),
			p.TanggalSelesai.In(time.Local).Format(layout),
			p.Status, p.PenyetujuNama, p.Catatan,
		})
	}

	writeCSV(c, "peminjaman.csv", []string{
		"kode_peminjaman", "kendaraan", "pegawai", "perangkat_daerah", "keperluan", "tujuan",
		"tanggal_mulai", "tanggal_selesai", "status", "penyetuju", "catatan",
	}, rows)
}

func writeCSV(c *gin.Context, filename string, header []string, rows [][]string) {
	c.Header("Content-Type", "text/csv; charset=utf-8")
	c.Header("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, filename))

	// BOM agar Excel membaca UTF-8 dengan benar.
	_, _ = c.Writer.Write([]byte{0xEF, 0xBB, 0xBF})

	w := csv.NewWriter(c.Writer)
	_ = w.Write(header)
	_ = w.WriteAll(rows)
	w.Flush()
}

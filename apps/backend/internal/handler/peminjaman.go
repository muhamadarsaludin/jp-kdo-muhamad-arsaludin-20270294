package handler

import (
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"

	"kdo/backend/internal/dto"
	"kdo/backend/internal/middleware"
	"kdo/backend/internal/repository"
	"kdo/backend/internal/response"
	"kdo/backend/internal/service"
)

// PeminjamanHandler menangani endpoint peminjaman.
type PeminjamanHandler struct {
	svc *service.PeminjamanService
}

// NewPeminjamanHandler membuat handler peminjaman.
func NewPeminjamanHandler(svc *service.PeminjamanService) *PeminjamanHandler {
	return &PeminjamanHandler{svc: svc}
}

// List menampilkan daftar peminjaman.
//
//	@Summary		Daftar peminjaman
//	@Description	Filter status/kendaraan/pegawai/rentang tanggal, sorting, dan pagination.
//	@Tags			peminjaman
//	@Produce		json
//	@Security		BearerAuth
//	@Param			page			query		int		false	"Halaman (default 1)"
//	@Param			limit			query		int		false	"Jumlah per halaman (default 10, max 100)"
//	@Param			search			query		string	false	"Cari kode/keperluan/tujuan"
//	@Param			status			query		string	false	"diajukan|disetujui|ditolak|selesai|dibatalkan"
//	@Param			kendaraan_id	query		int		false	"Filter kendaraan"
//	@Param			pegawai_id		query		int		false	"Filter pegawai"
//	@Param			dari			query		string	false	"Tanggal mulai (YYYY-MM-DD atau ISO-8601)"
//	@Param			sampai			query		string	false	"Tanggal selesai (YYYY-MM-DD atau ISO-8601)"
//	@Param			sort			query		string	false	"tanggal_mulai|kode_peminjaman|created_at"
//	@Param			order			query		string	false	"asc|desc"
//	@Success		200				{array}		dto.PeminjamanResponse	"dibungkus data + meta"
//	@Failure		400				{object}	response.ErrorBody
//	@Failure		401				{object}	response.ErrorBody
//	@Router			/api/v1/peminjaman [get]
func (h *PeminjamanHandler) List(c *gin.Context) {
	page := clampInt(queryInt(c, "page", 1), 1, 1_000_000)
	limit := clampInt(queryInt(c, "limit", 10), 1, 100)

	q := dto.PeminjamanListQuery{
		Page:      page,
		Limit:     limit,
		Search:    c.Query("search"),
		Status:    c.Query("status"),
		SortBy:    c.Query("sort"),
		SortOrder: c.Query("order"),
	}

	if raw := c.Query("kendaraan_id"); raw != "" {
		id, err := strconv.ParseInt(raw, 10, 64)
		if err != nil || id <= 0 {
			response.ValidationError(c, gin.H{"kendaraan_id": "harus angka positif"})
			return
		}
		q.KendaraanID = &id
	}

	if raw := c.Query("pegawai_id"); raw != "" {
		id, err := strconv.ParseInt(raw, 10, 64)
		if err != nil || id <= 0 {
			response.ValidationError(c, gin.H{"pegawai_id": "harus angka positif"})
			return
		}
		q.PegawaiID = &id
	}

	if raw := c.Query("dari"); raw != "" {
		tgl, err := parseWaktuQuery(raw, false)
		if err != nil {
			response.ValidationError(c, gin.H{"dari": "format tanggal tidak valid"})
			return
		}
		q.Dari = &tgl
	}

	if raw := c.Query("sampai"); raw != "" {
		tgl, err := parseWaktuQuery(raw, true)
		if err != nil {
			response.ValidationError(c, gin.H{"sampai": "format tanggal tidak valid"})
			return
		}
		q.Sampai = &tgl
	}

	items, total, err := h.svc.List(c.Request.Context(), q)
	if err != nil {
		h.writeError(c, err)
		return
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))
	response.SuccessWithMeta(c, http.StatusOK, items, response.Meta{
		Page:       page,
		Limit:      limit,
		Total:      total,
		TotalPages: totalPages,
	})
}

// Get menampilkan detail peminjaman.
//
//	@Summary		Detail peminjaman
//	@Tags			peminjaman
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path		int	true	"ID peminjaman"
//	@Success		200	{object}	dto.PeminjamanResponse	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Router			/api/v1/peminjaman/{id} [get]
func (h *PeminjamanHandler) Get(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	item, err := h.svc.Get(c.Request.Context(), id)
	if err != nil {
		h.writeError(c, err)
		return
	}
	response.Success(c, http.StatusOK, item)
}

// Create mengajukan peminjaman.
//
//	@Summary		Ajukan peminjaman
//	@Description	Validasi kendaraan tersedia dan tidak ada jadwal yang bentrok.
//	@Tags			peminjaman
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			request	body		dto.PeminjamanRequest	true	"Data pengajuan"
//	@Success		201		{object}	dto.PeminjamanResponse	"dibungkus data"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		409		{object}	response.ErrorBody
//	@Router			/api/v1/peminjaman [post]
func (h *PeminjamanHandler) Create(c *gin.Context) {
	var req dto.PeminjamanRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ValidationError(c, gin.H{"body": err.Error()})
		return
	}

	item, err := h.svc.Create(c.Request.Context(), req)
	if err != nil {
		h.writeError(c, err)
		return
	}
	response.Success(c, http.StatusCreated, item)
}

// Setujui menyetujui peminjaman.
//
//	@Summary		Setujui peminjaman
//	@Tags			peminjaman
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path		int	true	"ID peminjaman"
//	@Success		200	{object}	dto.PeminjamanResponse	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		403	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Failure		409	{object}	response.ErrorBody
//	@Router			/api/v1/peminjaman/{id}/setujui [patch]
func (h *PeminjamanHandler) Setujui(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	item, err := h.svc.Setujui(c.Request.Context(), id, middleware.PenggunaID(c))
	if err != nil {
		h.writeError(c, err)
		return
	}
	response.Success(c, http.StatusOK, item)
}

// Tolak menolak peminjaman.
//
//	@Summary		Tolak peminjaman
//	@Tags			peminjaman
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id		path		int							true	"ID peminjaman"
//	@Param			request	body		dto.TolakPeminjamanRequest	false	"Alasan penolakan"
//	@Success		200		{object}	dto.PeminjamanResponse		"dibungkus data"
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		404		{object}	response.ErrorBody
//	@Failure		409		{object}	response.ErrorBody
//	@Router			/api/v1/peminjaman/{id}/tolak [patch]
func (h *PeminjamanHandler) Tolak(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	var req dto.TolakPeminjamanRequest
	if c.Request.ContentLength > 0 {
		if err := c.ShouldBindJSON(&req); err != nil {
			response.ValidationError(c, gin.H{"body": err.Error()})
			return
		}
	}

	item, err := h.svc.Tolak(c.Request.Context(), id, middleware.PenggunaID(c), req.Catatan)
	if err != nil {
		h.writeError(c, err)
		return
	}
	response.Success(c, http.StatusOK, item)
}

// Selesai menandai peminjaman selesai.
//
//	@Summary		Selesaikan peminjaman
//	@Tags			peminjaman
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path		int	true	"ID peminjaman"
//	@Success		200	{object}	dto.PeminjamanResponse	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		403	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Failure		409	{object}	response.ErrorBody
//	@Router			/api/v1/peminjaman/{id}/selesai [patch]
func (h *PeminjamanHandler) Selesai(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	item, err := h.svc.Selesai(c.Request.Context(), id)
	if err != nil {
		h.writeError(c, err)
		return
	}
	response.Success(c, http.StatusOK, item)
}

// Batalkan membatalkan peminjaman.
//
//	@Summary		Batalkan peminjaman
//	@Tags			peminjaman
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path		int	true	"ID peminjaman"
//	@Success		200	{object}	dto.PeminjamanResponse	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		403	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Failure		409	{object}	response.ErrorBody
//	@Router			/api/v1/peminjaman/{id}/batalkan [patch]
func (h *PeminjamanHandler) Batalkan(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	item, err := h.svc.Batalkan(c.Request.Context(), id)
	if err != nil {
		h.writeError(c, err)
		return
	}
	response.Success(c, http.StatusOK, item)
}

func (h *PeminjamanHandler) writeError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, repository.ErrNotFound):
		response.Error(c, http.StatusNotFound, "NOT_FOUND", "Peminjaman tidak ditemukan", nil)
	case errors.Is(err, service.ErrJadwalBentrok):
		response.Error(c, http.StatusConflict, "CONFLICT", err.Error(), nil)
	case errors.Is(err, service.ErrInvalidTransition):
		response.Error(c, http.StatusConflict, "CONFLICT", err.Error(), nil)
	case errors.Is(err, repository.ErrConflict):
		response.Error(c, http.StatusConflict, "CONFLICT", err.Error(), nil)
	case errors.Is(err, service.ErrValidation):
		response.Error(c, http.StatusBadRequest, "VALIDATION_ERROR", err.Error(), nil)
	default:
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
	}
}

func parseWaktuQuery(raw string, akhirHari bool) (time.Time, error) {
	raw = strings.TrimSpace(raw)

	if t, err := time.Parse(time.RFC3339, raw); err == nil {
		return t, nil
	}

	t, err := time.ParseInLocation("2006-01-02", raw, time.Local)
	if err != nil {
		return time.Time{}, err
	}
	if akhirHari {
		return t.Add(24*time.Hour - time.Second), nil
	}
	return t, nil
}

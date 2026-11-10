package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"kdo/backend/internal/dto"
	"kdo/backend/internal/repository"
	"kdo/backend/internal/response"
	"kdo/backend/internal/service"
)

// KendaraanHandler menangani endpoint kendaraan.
type KendaraanHandler struct {
	svc *service.KendaraanService
}

// NewKendaraanHandler membuat handler kendaraan.
func NewKendaraanHandler(svc *service.KendaraanService) *KendaraanHandler {
	return &KendaraanHandler{svc: svc}
}

// List menampilkan daftar kendaraan.
//
//	@Summary		Daftar kendaraan
//	@Description	Mendukung search nopol/merek/tipe, filter OPD/kondisi/status/jenis/tahun, sorting, dan pagination.
//	@Tags			kendaraan
//	@Produce		json
//	@Security		BearerAuth
//	@Param			page					query		int		false	"Halaman (default 1)"
//	@Param			limit					query		int		false	"Jumlah per halaman (default 10, max 100)"
//	@Param			search					query		string	false	"Cari nomor polisi, merek, atau tipe"
//	@Param			perangkat_daerah_id		query		int		false	"Filter perangkat daerah"
//	@Param			kondisi					query		string	false	"baik|rusak_ringan|rusak_berat"
//	@Param			status					query		string	false	"tersedia|digunakan|perbaikan|dihapuskan"
//	@Param			jenis					query		string	false	"motor|mobil|minibus|pickup|ambulans"
//	@Param			tahun					query		int		false	"Filter tahun produksi"
//	@Param			sort					query		string	false	"nomor_polisi|merek|tahun_produksi|created_at"
//	@Param			order					query		string	false	"asc|desc"
//	@Success		200						{array}		dto.KendaraanResponse	"dibungkus data + meta"
//	@Failure		400						{object}	response.ErrorBody
//	@Failure		401						{object}	response.ErrorBody
//	@Router			/api/v1/kendaraan [get]
func (h *KendaraanHandler) List(c *gin.Context) {
	page := clampInt(queryInt(c, "page", 1), 1, 1_000_000)
	limit := clampInt(queryInt(c, "limit", 10), 1, 100)

	q := dto.KendaraanListQuery{
		Page:      page,
		Limit:     limit,
		Search:    c.Query("search"),
		Kondisi:   c.Query("kondisi"),
		Status:    c.Query("status"),
		Jenis:     c.Query("jenis"),
		SortBy:    c.Query("sort"),
		SortOrder: c.Query("order"),
	}

	if raw := c.Query("perangkat_daerah_id"); raw != "" {
		id, err := strconv.ParseInt(raw, 10, 64)
		if err != nil || id <= 0 {
			response.ValidationError(c, gin.H{"perangkat_daerah_id": "harus angka positif"})
			return
		}
		q.PerangkatDaerahID = &id
	}

	if raw := c.Query("tahun"); raw != "" {
		tahun, err := strconv.Atoi(raw)
		if err != nil || tahun < 1980 {
			response.ValidationError(c, gin.H{"tahun": "tahun tidak valid"})
			return
		}
		q.Tahun = &tahun
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

// Get menampilkan detail kendaraan.
//
//	@Summary		Detail kendaraan
//	@Tags			kendaraan
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path		int	true	"ID kendaraan"
//	@Success		200	{object}	dto.KendaraanResponse	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Router			/api/v1/kendaraan/{id} [get]
func (h *KendaraanHandler) Get(c *gin.Context) {
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

// Create menambah kendaraan.
//
//	@Summary		Tambah kendaraan
//	@Tags			kendaraan
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			request	body		dto.KendaraanRequest	true	"Data kendaraan"
//	@Success		201		{object}	dto.KendaraanResponse	"dibungkus data"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		409		{object}	response.ErrorBody
//	@Router			/api/v1/kendaraan [post]
func (h *KendaraanHandler) Create(c *gin.Context) {
	var req dto.KendaraanRequest
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

// Update mengubah kendaraan.
//
//	@Summary		Ubah kendaraan
//	@Description	Status tidak dapat diubah selama masih ada peminjaman aktif.
//	@Tags			kendaraan
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id		path		int						true	"ID kendaraan"
//	@Param			request	body		dto.KendaraanRequest	true	"Data kendaraan"
//	@Success		200		{object}	dto.KendaraanResponse	"dibungkus data"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		404		{object}	response.ErrorBody
//	@Failure		409		{object}	response.ErrorBody
//	@Router			/api/v1/kendaraan/{id} [put]
func (h *KendaraanHandler) Update(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	var req dto.KendaraanRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ValidationError(c, gin.H{"body": err.Error()})
		return
	}

	item, err := h.svc.Update(c.Request.Context(), id, req)
	if err != nil {
		h.writeError(c, err)
		return
	}
	response.Success(c, http.StatusOK, item)
}

// Delete menghapus kendaraan (soft delete).
//
//	@Summary		Hapus kendaraan
//	@Description	Menolak penghapusan bila masih ada peminjaman aktif.
//	@Tags			kendaraan
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path	int	true	"ID kendaraan"
//	@Success		204	"tidak ada isi"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		403	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Failure		409	{object}	response.ErrorBody
//	@Router			/api/v1/kendaraan/{id} [delete]
func (h *KendaraanHandler) Delete(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	if err := h.svc.Delete(c.Request.Context(), id); err != nil {
		h.writeError(c, err)
		return
	}
	c.Status(http.StatusNoContent)
}

func (h *KendaraanHandler) writeError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, repository.ErrNotFound):
		response.Error(c, http.StatusNotFound, "NOT_FOUND", "Kendaraan tidak ditemukan", nil)
	case errors.Is(err, repository.ErrConflict):
		response.Error(c, http.StatusConflict, "CONFLICT", err.Error(), nil)
	case errors.Is(err, repository.ErrInvalidReference):
		response.Error(c, http.StatusBadRequest, "VALIDATION_ERROR", err.Error(), nil)
	case errors.Is(err, service.ErrHasRelation):
		response.Error(c, http.StatusConflict, "CONFLICT", err.Error(), nil)
	case errors.Is(err, service.ErrValidation):
		response.Error(c, http.StatusBadRequest, "VALIDATION_ERROR", err.Error(), nil)
	default:
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
	}
}

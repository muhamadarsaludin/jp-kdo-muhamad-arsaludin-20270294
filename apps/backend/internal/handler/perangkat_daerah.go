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

// PerangkatDaerahHandler menangani endpoint perangkat daerah.
type PerangkatDaerahHandler struct {
	svc *service.PerangkatDaerahService
}

// NewPerangkatDaerahHandler membuat handler perangkat daerah.
func NewPerangkatDaerahHandler(svc *service.PerangkatDaerahService) *PerangkatDaerahHandler {
	return &PerangkatDaerahHandler{svc: svc}
}

// List menampilkan daftar perangkat daerah.
//
//	@Summary		Daftar perangkat daerah
//	@Description	Mendukung search, filter is_active, sorting, dan pagination.
//	@Tags			perangkat-daerah
//	@Produce		json
//	@Security		BearerAuth
//	@Param			page		query		int		false	"Halaman (default 1)"
//	@Param			limit		query		int		false	"Jumlah per halaman (default 10, max 100)"
//	@Param			search		query		string	false	"Cari kode/nama/singkatan"
//	@Param			is_active	query		bool	false	"Filter status aktif"
//	@Param			sort		query		string	false	"nama|kode|created_at"
//	@Param			order		query		string	false	"asc|desc"
//	@Success		200			{array}		dto.PerangkatDaerahResponse	"dibungkus data + meta"
//	@Failure		401			{object}	response.ErrorBody
//	@Router			/api/v1/perangkat-daerah [get]
func (h *PerangkatDaerahHandler) List(c *gin.Context) {
	page := clampInt(queryInt(c, "page", 1), 1, 1_000_000)
	limit := clampInt(queryInt(c, "limit", 10), 1, 100)

	q := dto.PerangkatDaerahListQuery{
		Page:      page,
		Limit:     limit,
		Search:    c.Query("search"),
		SortBy:    c.Query("sort"),
		SortOrder: c.Query("order"),
	}

	if raw := c.Query("is_active"); raw != "" {
		aktif, err := strconv.ParseBool(raw)
		if err != nil {
			response.ValidationError(c, gin.H{"is_active": "harus true atau false"})
			return
		}
		q.IsActive = &aktif
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

// Get menampilkan detail perangkat daerah.
//
//	@Summary		Detail perangkat daerah
//	@Tags			perangkat-daerah
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path		int	true	"ID perangkat daerah"
//	@Success		200	{object}	dto.PerangkatDaerahResponse	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Router			/api/v1/perangkat-daerah/{id} [get]
func (h *PerangkatDaerahHandler) Get(c *gin.Context) {
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

// Create menambah perangkat daerah.
//
//	@Summary		Tambah perangkat daerah
//	@Tags			perangkat-daerah
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			request	body		dto.PerangkatDaerahRequest	true	"Data perangkat daerah"
//	@Success		201		{object}	dto.PerangkatDaerahResponse	"dibungkus data"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		409		{object}	response.ErrorBody
//	@Router			/api/v1/perangkat-daerah [post]
func (h *PerangkatDaerahHandler) Create(c *gin.Context) {
	var req dto.PerangkatDaerahRequest
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

// Update mengubah perangkat daerah.
//
//	@Summary		Ubah perangkat daerah
//	@Tags			perangkat-daerah
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id		path		int							true	"ID perangkat daerah"
//	@Param			request	body		dto.PerangkatDaerahRequest	true	"Data perangkat daerah"
//	@Success		200		{object}	dto.PerangkatDaerahResponse	"dibungkus data"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		404		{object}	response.ErrorBody
//	@Failure		409		{object}	response.ErrorBody
//	@Router			/api/v1/perangkat-daerah/{id} [put]
func (h *PerangkatDaerahHandler) Update(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	var req dto.PerangkatDaerahRequest
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

// Delete menghapus perangkat daerah (soft delete).
//
//	@Summary		Hapus perangkat daerah
//	@Description	Menolak penghapusan bila masih ada pegawai atau kendaraan aktif.
//	@Tags			perangkat-daerah
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path	int	true	"ID perangkat daerah"
//	@Success		204	"tidak ada isi"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		403	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Failure		409	{object}	response.ErrorBody
//	@Router			/api/v1/perangkat-daerah/{id} [delete]
func (h *PerangkatDaerahHandler) Delete(c *gin.Context) {
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

func (h *PerangkatDaerahHandler) writeError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, repository.ErrNotFound):
		response.Error(c, http.StatusNotFound, "NOT_FOUND", "Perangkat daerah tidak ditemukan", nil)
	case errors.Is(err, repository.ErrConflict):
		response.Error(c, http.StatusConflict, "CONFLICT", err.Error(), nil)
	case errors.Is(err, service.ErrHasRelation):
		response.Error(c, http.StatusConflict, "CONFLICT", err.Error(), nil)
	case errors.Is(err, service.ErrValidation):
		response.Error(c, http.StatusBadRequest, "VALIDATION_ERROR", err.Error(), nil)
	default:
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
	}
}

func queryInt(c *gin.Context, key string, fallback int) int {
	raw := c.Query(key)
	if raw == "" {
		return fallback
	}
	v, err := strconv.Atoi(raw)
	if err != nil {
		return fallback
	}
	return v
}

func clampInt(v, min, max int) int {
	if v < min {
		return min
	}
	if v > max {
		return max
	}
	return v
}

func pathID(c *gin.Context) (int64, bool) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil || id <= 0 {
		response.ValidationError(c, gin.H{"id": "ID tidak valid"})
		return 0, false
	}
	return id, true
}

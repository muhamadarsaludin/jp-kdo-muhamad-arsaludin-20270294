package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"kdo/backend/internal/dto"
	"kdo/backend/internal/middleware"
	"kdo/backend/internal/repository"
	"kdo/backend/internal/response"
	"kdo/backend/internal/service"
)

// PenggunaHandler menangani manajemen akun (khusus admin).
type PenggunaHandler struct {
	svc *service.PenggunaService
}

// NewPenggunaHandler membuat handler manajemen akun.
func NewPenggunaHandler(svc *service.PenggunaService) *PenggunaHandler {
	return &PenggunaHandler{svc: svc}
}

// List menampilkan daftar akun.
//
//	@Summary		Daftar pengguna
//	@Tags			pengguna
//	@Produce		json
//	@Security		BearerAuth
//	@Param			page		query		int		false	"Halaman"
//	@Param			limit		query		int		false	"Jumlah per halaman"
//	@Param			search		query		string	false	"Cari nama/email"
//	@Param			role		query		string	false	"admin|operator|pimpinan"
//	@Param			is_active	query		bool	false	"Filter status"
//	@Success		200			{array}		dto.PenggunaAdminResponse	"dibungkus data + meta"
//	@Failure		401			{object}	response.ErrorBody
//	@Failure		403			{object}	response.ErrorBody
//	@Router			/api/v1/pengguna [get]
func (h *PenggunaHandler) List(c *gin.Context) {
	page := clampInt(queryInt(c, "page", 1), 1, 1_000_000)
	limit := clampInt(queryInt(c, "limit", 10), 1, 100)

	q := dto.PenggunaListQuery{
		Page:   page,
		Limit:  limit,
		Search: c.Query("search"),
		Role:   c.Query("role"),
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

// Create menambah akun.
//
//	@Summary		Tambah pengguna
//	@Tags			pengguna
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			request	body		dto.PenggunaRequest	true	"Data akun"
//	@Success		201		{object}	dto.PenggunaAdminResponse	"dibungkus data"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		409		{object}	response.ErrorBody
//	@Router			/api/v1/pengguna [post]
func (h *PenggunaHandler) Create(c *gin.Context) {
	var req dto.PenggunaRequest
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

// Update mengubah akun.
//
//	@Summary		Ubah pengguna
//	@Tags			pengguna
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id		path		int					true	"ID pengguna"
//	@Param			request	body		dto.PenggunaRequest	true	"Data akun"
//	@Success		200		{object}	dto.PenggunaAdminResponse	"dibungkus data"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		404		{object}	response.ErrorBody
//	@Failure		409		{object}	response.ErrorBody
//	@Router			/api/v1/pengguna/{id} [put]
func (h *PenggunaHandler) Update(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	var req dto.PenggunaRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ValidationError(c, gin.H{"body": err.Error()})
		return
	}

	item, err := h.svc.Update(c.Request.Context(), id, middleware.PenggunaID(c), req)
	if err != nil {
		h.writeError(c, err)
		return
	}
	response.Success(c, http.StatusOK, item)
}

// Delete menghapus akun.
//
//	@Summary		Hapus pengguna
//	@Description	Admin tidak dapat menghapus akunnya sendiri.
//	@Tags			pengguna
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path	int	true	"ID pengguna"
//	@Success		204	"tidak ada isi"
//	@Failure		400	{object}	response.ErrorBody
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		403	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Router			/api/v1/pengguna/{id} [delete]
func (h *PenggunaHandler) Delete(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	if err := h.svc.Delete(c.Request.Context(), id, middleware.PenggunaID(c)); err != nil {
		h.writeError(c, err)
		return
	}
	c.Status(http.StatusNoContent)
}

func (h *PenggunaHandler) writeError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, repository.ErrNotFound):
		response.Error(c, http.StatusNotFound, "NOT_FOUND", "Pengguna tidak ditemukan", nil)
	case errors.Is(err, repository.ErrConflict):
		response.Error(c, http.StatusConflict, "CONFLICT", err.Error(), nil)
	case errors.Is(err, service.ErrCannotModifySelf):
		response.Error(c, http.StatusBadRequest, "VALIDATION_ERROR", err.Error(), nil)
	case errors.Is(err, service.ErrValidation):
		response.Error(c, http.StatusBadRequest, "VALIDATION_ERROR", err.Error(), nil)
	default:
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
	}
}

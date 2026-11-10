package handler

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"

	"kdo/backend/internal/dto"
	"kdo/backend/internal/repository"
	"kdo/backend/internal/response"
	"kdo/backend/internal/service"
)

// ServisHandler menangani endpoint riwayat servis.
type ServisHandler struct {
	svc *service.ServisService
}

// NewServisHandler membuat handler servis.
func NewServisHandler(svc *service.ServisService) *ServisHandler {
	return &ServisHandler{svc: svc}
}

// ListByKendaraan menampilkan riwayat servis satu kendaraan.
//
//	@Summary		Riwayat servis kendaraan
//	@Tags			servis
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id		path		int	true	"ID kendaraan"
//	@Param			page	query		int	false	"Halaman (default 1)"
//	@Param			limit	query		int	false	"Jumlah per halaman (default 10, max 100)"
//	@Success		200		{array}		dto.ServisResponse	"dibungkus data + meta"
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		404		{object}	response.ErrorBody
//	@Router			/api/v1/kendaraan/{id}/servis [get]
func (h *ServisHandler) ListByKendaraan(c *gin.Context) {
	kendaraanID, ok := pathID(c)
	if !ok {
		return
	}

	page := clampInt(queryInt(c, "page", 1), 1, 1_000_000)
	limit := clampInt(queryInt(c, "limit", 10), 1, 100)

	items, total, err := h.svc.List(c.Request.Context(), kendaraanID, page, limit)
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

// Create menambah riwayat servis.
//
//	@Summary		Tambah servis
//	@Tags			servis
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id		path		int					true	"ID kendaraan"
//	@Param			request	body		dto.ServisRequest	true	"Data servis"
//	@Success		201		{object}	dto.ServisResponse	"dibungkus data"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		404		{object}	response.ErrorBody
//	@Router			/api/v1/kendaraan/{id}/servis [post]
func (h *ServisHandler) Create(c *gin.Context) {
	kendaraanID, ok := pathID(c)
	if !ok {
		return
	}

	var req dto.ServisRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ValidationError(c, gin.H{"body": err.Error()})
		return
	}

	item, err := h.svc.Create(c.Request.Context(), kendaraanID, req)
	if err != nil {
		h.writeError(c, err)
		return
	}
	response.Success(c, http.StatusCreated, item)
}

// Update mengubah riwayat servis.
//
//	@Summary		Ubah servis
//	@Tags			servis
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id		path		int					true	"ID servis"
//	@Param			request	body		dto.ServisRequest	true	"Data servis"
//	@Success		200		{object}	dto.ServisResponse	"dibungkus data"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		404		{object}	response.ErrorBody
//	@Router			/api/v1/servis/{id} [put]
func (h *ServisHandler) Update(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	var req dto.ServisRequest
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

// Delete menghapus riwayat servis (soft delete).
//
//	@Summary		Hapus servis
//	@Tags			servis
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path	int	true	"ID servis"
//	@Success		204	"tidak ada isi"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		403	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Router			/api/v1/servis/{id} [delete]
func (h *ServisHandler) Delete(c *gin.Context) {
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

func (h *ServisHandler) writeError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, repository.ErrNotFound):
		response.Error(c, http.StatusNotFound, "NOT_FOUND", "Data servis atau kendaraan tidak ditemukan", nil)
	case errors.Is(err, service.ErrValidation):
		response.Error(c, http.StatusBadRequest, "VALIDATION_ERROR", err.Error(), nil)
	default:
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
	}
}

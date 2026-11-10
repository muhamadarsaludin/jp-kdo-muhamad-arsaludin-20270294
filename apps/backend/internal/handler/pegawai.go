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

// PegawaiHandler menangani endpoint pegawai.
type PegawaiHandler struct {
	svc *service.PegawaiService
}

// NewPegawaiHandler membuat handler pegawai.
func NewPegawaiHandler(svc *service.PegawaiService) *PegawaiHandler {
	return &PegawaiHandler{svc: svc}
}

// List menampilkan daftar pegawai.
//
//	@Summary		Daftar pegawai
//	@Description	Mendukung search nama/NIP, filter OPD/golongan/status, sorting, dan pagination.
//	@Tags			pegawai
//	@Produce		json
//	@Security		BearerAuth
//	@Param			page					query		int		false	"Halaman (default 1)"
//	@Param			limit					query		int		false	"Jumlah per halaman (default 10, max 100)"
//	@Param			search					query		string	false	"Cari nama atau NIP"
//	@Param			perangkat_daerah_id		query		int		false	"Filter perangkat daerah"
//	@Param			golongan				query		string	false	"Filter golongan (mis. III/a)"
//	@Param			status					query		string	false	"aktif|nonaktif|pensiun"
//	@Param			sort					query		string	false	"nama|nip|created_at"
//	@Param			order					query		string	false	"asc|desc"
//	@Success		200						{array}		dto.PegawaiResponse	"dibungkus data + meta"
//	@Failure		400						{object}	response.ErrorBody
//	@Failure		401						{object}	response.ErrorBody
//	@Router			/api/v1/pegawai [get]
func (h *PegawaiHandler) List(c *gin.Context) {
	page := clampInt(queryInt(c, "page", 1), 1, 1_000_000)
	limit := clampInt(queryInt(c, "limit", 10), 1, 100)

	q := dto.PegawaiListQuery{
		Page:          page,
		Limit:         limit,
		Search:        c.Query("search"),
		Golongan:      c.Query("golongan"),
		StatusPegawai: c.Query("status"),
		SortBy:        c.Query("sort"),
		SortOrder:     c.Query("order"),
	}

	if raw := c.Query("perangkat_daerah_id"); raw != "" {
		id, err := strconv.ParseInt(raw, 10, 64)
		if err != nil || id <= 0 {
			response.ValidationError(c, gin.H{"perangkat_daerah_id": "harus angka positif"})
			return
		}
		q.PerangkatDaerahID = &id
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

// Get menampilkan detail pegawai.
//
//	@Summary		Detail pegawai
//	@Tags			pegawai
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path		int	true	"ID pegawai"
//	@Success		200	{object}	dto.PegawaiResponse	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Router			/api/v1/pegawai/{id} [get]
func (h *PegawaiHandler) Get(c *gin.Context) {
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

// Create menambah pegawai.
//
//	@Summary		Tambah pegawai
//	@Tags			pegawai
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			request	body		dto.PegawaiRequest	true	"Data pegawai"
//	@Success		201		{object}	dto.PegawaiResponse	"dibungkus data"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		409		{object}	response.ErrorBody
//	@Router			/api/v1/pegawai [post]
func (h *PegawaiHandler) Create(c *gin.Context) {
	var req dto.PegawaiRequest
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

// Update mengubah pegawai.
//
//	@Summary		Ubah pegawai
//	@Tags			pegawai
//	@Accept			json
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id		path		int					true	"ID pegawai"
//	@Param			request	body		dto.PegawaiRequest	true	"Data pegawai"
//	@Success		200		{object}	dto.PegawaiResponse	"dibungkus data"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		404		{object}	response.ErrorBody
//	@Failure		409		{object}	response.ErrorBody
//	@Router			/api/v1/pegawai/{id} [put]
func (h *PegawaiHandler) Update(c *gin.Context) {
	id, ok := pathID(c)
	if !ok {
		return
	}

	var req dto.PegawaiRequest
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

// Delete menghapus pegawai (soft delete).
//
//	@Summary		Hapus pegawai
//	@Description	Menolak penghapusan bila pegawai punya riwayat peminjaman.
//	@Tags			pegawai
//	@Produce		json
//	@Security		BearerAuth
//	@Param			id	path	int	true	"ID pegawai"
//	@Success		204	"tidak ada isi"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		403	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Failure		409	{object}	response.ErrorBody
//	@Router			/api/v1/pegawai/{id} [delete]
func (h *PegawaiHandler) Delete(c *gin.Context) {
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

func (h *PegawaiHandler) writeError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, repository.ErrNotFound):
		response.Error(c, http.StatusNotFound, "NOT_FOUND", "Pegawai tidak ditemukan", nil)
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

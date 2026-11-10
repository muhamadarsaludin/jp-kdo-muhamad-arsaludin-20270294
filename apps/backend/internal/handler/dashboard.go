package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"kdo/backend/internal/dto"
	"kdo/backend/internal/response"
	"kdo/backend/internal/service"
)

// DashboardHandler menangani endpoint statistik.
type DashboardHandler struct {
	dashboard  *service.DashboardService
	peminjaman *service.PeminjamanService
}

// NewDashboardHandler membuat handler dashboard.
func NewDashboardHandler(dashboard *service.DashboardService, peminjaman *service.PeminjamanService) *DashboardHandler {
	return &DashboardHandler{dashboard: dashboard, peminjaman: peminjaman}
}

// Stats menampilkan ringkasan dashboard.
//
//	@Summary		Ringkasan dashboard
//	@Tags			dashboard
//	@Produce		json
//	@Security		BearerAuth
//	@Success		200	{object}	dto.DashboardStats	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Router			/api/v1/dashboard/stats [get]
func (h *DashboardHandler) Stats(c *gin.Context) {
	stats, err := h.dashboard.Stats(c.Request.Context())
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
		return
	}
	response.Success(c, http.StatusOK, stats)
}

// Kondisi menampilkan jumlah kendaraan per kondisi.
//
//	@Summary		Kendaraan per kondisi
//	@Tags			dashboard
//	@Produce		json
//	@Security		BearerAuth
//	@Success		200	{array}		dto.DashboardKondisiItem	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Router			/api/v1/dashboard/kendaraan-per-kondisi [get]
func (h *DashboardHandler) Kondisi(c *gin.Context) {
	items, err := h.dashboard.Kondisi(c.Request.Context())
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
		return
	}
	response.Success(c, http.StatusOK, items)
}

// PerOpd menampilkan jumlah kendaraan per perangkat daerah.
//
//	@Summary		Kendaraan per perangkat daerah
//	@Tags			dashboard
//	@Produce		json
//	@Security		BearerAuth
//	@Success		200	{array}		dto.DashboardOpdItem	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Router			/api/v1/dashboard/kendaraan-per-opd [get]
func (h *DashboardHandler) PerOpd(c *gin.Context) {
	items, err := h.dashboard.PerOpd(c.Request.Context())
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
		return
	}
	response.Success(c, http.StatusOK, items)
}

// BiayaBulanan menampilkan biaya servis 6 bulan terakhir.
//
//	@Summary		Biaya servis bulanan
//	@Tags			dashboard
//	@Produce		json
//	@Security		BearerAuth
//	@Success		200	{array}		dto.DashboardBiayaBulananItem	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Router			/api/v1/dashboard/biaya-servis-bulanan [get]
func (h *DashboardHandler) BiayaBulanan(c *gin.Context) {
	items, err := h.dashboard.BiayaBulanan(c.Request.Context())
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
		return
	}
	response.Success(c, http.StatusOK, items)
}

// PeminjamanMenunggu menampilkan pengajuan yang belum diputuskan.
//
//	@Summary		Peminjaman menunggu persetujuan
//	@Tags			dashboard
//	@Produce		json
//	@Security		BearerAuth
//	@Success		200	{array}		dto.PeminjamanResponse	"dibungkus data"
//	@Failure		401	{object}	response.ErrorBody
//	@Router			/api/v1/dashboard/peminjaman-menunggu [get]
func (h *DashboardHandler) PeminjamanMenunggu(c *gin.Context) {
	items, _, err := h.peminjaman.List(c.Request.Context(), dto.PeminjamanListQuery{
		Page:      1,
		Limit:     5,
		Status:    "diajukan",
		SortBy:    "tanggal_mulai",
		SortOrder: "asc",
	})
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
		return
	}
	response.Success(c, http.StatusOK, items)
}

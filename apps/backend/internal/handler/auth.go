package handler

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"

	"kdo/backend/internal/dto"
	"kdo/backend/internal/middleware"
	"kdo/backend/internal/repository"
	"kdo/backend/internal/response"
	"kdo/backend/internal/service"
)

// AuthHandler menangani endpoint autentikasi.
type AuthHandler struct {
	auth *service.AuthService
}

// NewAuthHandler membuat handler autentikasi.
func NewAuthHandler(auth *service.AuthService) *AuthHandler {
	return &AuthHandler{auth: auth}
}

// Login memverifikasi kredensial dan mengembalikan JWT.
//
//	@Summary		Login
//	@Description	Login dengan email dan password, mengembalikan token JWT.
//	@Tags			auth
//	@Accept			json
//	@Produce		json
//	@Param			request	body		dto.LoginRequest	true	"Kredensial pengguna"
//	@Success		200		{object}	dto.LoginResponse	"data berisi token dan profil"
//	@Failure		400		{object}	response.ErrorBody
//	@Failure		401		{object}	response.ErrorBody
//	@Failure		403		{object}	response.ErrorBody
//	@Failure		500		{object}	response.ErrorBody
//	@Router			/api/v1/auth/login [post]
func (h *AuthHandler) Login(c *gin.Context) {
	var req dto.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ValidationError(c, gin.H{"body": err.Error()})
		return
	}

	result, err := h.auth.Login(c.Request.Context(), req)
	switch {
	case errors.Is(err, service.ErrInvalidCredentials):
		response.Unauthorized(c, "Email atau password salah")
	case errors.Is(err, service.ErrInactiveAccount):
		response.Forbidden(c, "Akun tidak aktif")
	case err != nil:
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
	default:
		response.Success(c, http.StatusOK, result)
	}
}

// Me mengembalikan profil pengguna yang sedang login.
//
//	@Summary		Profil pengguna aktif
//	@Description	Mengembalikan data pengguna berdasarkan token JWT.
//	@Tags			auth
//	@Produce		json
//	@Security		BearerAuth
//	@Success		200	{object}	dto.PenggunaResponse	"data berisi profil pengguna"
//	@Failure		401	{object}	response.ErrorBody
//	@Failure		404	{object}	response.ErrorBody
//	@Router			/api/v1/auth/me [get]
func (h *AuthHandler) Me(c *gin.Context) {
	profil, err := h.auth.Me(c.Request.Context(), middleware.PenggunaID(c))
	switch {
	case errors.Is(err, repository.ErrNotFound):
		response.Error(c, http.StatusNotFound, "NOT_FOUND", "Pengguna tidak ditemukan", nil)
	case err != nil:
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Terjadi kesalahan pada server", nil)
	default:
		response.Success(c, http.StatusOK, profil)
	}
}

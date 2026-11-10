package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// ErrorDetail adalah isi dari objek error.
type ErrorDetail struct {
	Code    string `json:"code" example:"VALIDATION_ERROR"`
	Message string `json:"message" example:"Data tidak valid"`
	Details any    `json:"details,omitempty"`
}

// ErrorBody adalah envelope untuk response gagal.
type ErrorBody struct {
	Error ErrorDetail `json:"error"`
}

// Meta berisi informasi pagination.
type Meta struct {
	Page       int   `json:"page" example:"1"`
	Limit      int   `json:"limit" example:"10"`
	Total      int64 `json:"total" example:"42"`
	TotalPages int   `json:"total_pages" example:"5"`
}

type successBody struct {
	Data any   `json:"data"`
	Meta *Meta `json:"meta,omitempty"`
}

// Success mengirim response sukses tanpa meta.
func Success(c *gin.Context, status int, data any) {
	c.JSON(status, successBody{Data: data})
}

// SuccessWithMeta mengirim response sukses dengan informasi pagination.
func SuccessWithMeta(c *gin.Context, status int, data any, meta Meta) {
	c.JSON(status, successBody{Data: data, Meta: &meta})
}

// Error mengirim response gagal dengan kode dan pesan yang konsisten.
func Error(c *gin.Context, status int, code, message string, details any) {
	c.JSON(status, ErrorBody{Error: ErrorDetail{
		Code:    code,
		Message: message,
		Details: details,
	}})
}

// ValidationError mempersingkat response kesalahan validasi.
func ValidationError(c *gin.Context, details any) {
	Error(c, http.StatusBadRequest, "VALIDATION_ERROR", "Data tidak valid", details)
}

// Unauthorized mempersingkat response 401.
func Unauthorized(c *gin.Context, message string) {
	Error(c, http.StatusUnauthorized, "UNAUTHORIZED", message, nil)
}

// Forbidden mempersingkat response 403.
func Forbidden(c *gin.Context, message string) {
	Error(c, http.StatusForbidden, "FORBIDDEN", message, nil)
}

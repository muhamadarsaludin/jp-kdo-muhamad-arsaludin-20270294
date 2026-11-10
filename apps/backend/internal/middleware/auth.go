package middleware

import (
	"strings"

	"github.com/gin-gonic/gin"

	"kdo/backend/internal/auth"
	"kdo/backend/internal/response"
)

const (
	// ContextPenggunaID adalah key id pengguna di gin.Context.
	ContextPenggunaID = "pengguna_id"
	// ContextRole adalah key role pengguna di gin.Context.
	ContextRole = "role"
)

// Auth memvalidasi Bearer token dan menyimpan identitas pengguna ke context.
func Auth(manager *auth.Manager) gin.HandlerFunc {
	return func(c *gin.Context) {
		header := c.GetHeader("Authorization")
		if !strings.HasPrefix(header, "Bearer ") {
			response.Unauthorized(c, "Token tidak ditemukan")
			c.Abort()
			return
		}

		raw := strings.TrimSpace(strings.TrimPrefix(header, "Bearer "))
		claims, err := manager.Parse(raw)
		if err != nil {
			response.Unauthorized(c, "Token tidak valid atau kedaluwarsa")
			c.Abort()
			return
		}

		c.Set(ContextPenggunaID, claims.PenggunaID)
		c.Set(ContextRole, claims.Role)
		c.Next()
	}
}

// RequireRole membatasi akses hanya untuk role tertentu.
func RequireRole(roles ...string) gin.HandlerFunc {
	allowed := make(map[string]struct{}, len(roles))
	for _, r := range roles {
		allowed[r] = struct{}{}
	}

	return func(c *gin.Context) {
		role, ok := c.Get(ContextRole)
		if !ok {
			response.Forbidden(c, "Akses ditolak")
			c.Abort()
			return
		}

		if _, ok := allowed[role.(string)]; !ok {
			response.Forbidden(c, "Anda tidak memiliki akses untuk aksi ini")
			c.Abort()
			return
		}

		c.Next()
	}
}

// PenggunaID mengambil id pengguna dari context.
func PenggunaID(c *gin.Context) int64 {
	v, ok := c.Get(ContextPenggunaID)
	if !ok {
		return 0
	}
	id, _ := v.(int64)
	return id
}

// Role mengambil role pengguna dari context.
func Role(c *gin.Context) string {
	v, ok := c.Get(ContextRole)
	if !ok {
		return ""
	}
	role, _ := v.(string)
	return role
}

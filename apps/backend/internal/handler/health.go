package handler

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

// HealthResponse adalah bentuk response health check.
type HealthResponse struct {
	Status   string `json:"status" example:"ok"`
	Database string `json:"database" example:"up"`
	Time     string `json:"time" example:"2026-11-10T10:00:00+07:00"`
	Version  string `json:"version" example:"1.0.0"`
}

// Health mengecek status aplikasi dan koneksi database.
//
//	@Summary		Health check
//	@Description	Mengembalikan status aplikasi dan koneksi PostgreSQL.
//	@Tags			system
//	@Produce		json
//	@Success		200	{object}	HealthResponse
//	@Failure		503	{object}	HealthResponse
//	@Router			/health [get]
func Health(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), 2*time.Second)
		defer cancel()

		res := HealthResponse{
			Status:   "ok",
			Database: "up",
			Time:     time.Now().Format(time.RFC3339),
			Version:  "1.0.0",
		}

		if err := pool.Ping(ctx); err != nil {
			res.Status = "degraded"
			res.Database = "down"
			c.JSON(http.StatusServiceUnavailable, res)
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

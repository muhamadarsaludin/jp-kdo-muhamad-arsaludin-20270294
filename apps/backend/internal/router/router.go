package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"kdo/backend/internal/auth"
	"kdo/backend/internal/handler"
	"kdo/backend/internal/middleware"
)

// New menyusun seluruh route aplikasi.
func New(
	pool *pgxpool.Pool,
	authHandler *handler.AuthHandler,
	pdHandler *handler.PerangkatDaerahHandler,
	pegawaiHandler *handler.PegawaiHandler,
	kendaraanHandler *handler.KendaraanHandler,
	jwtManager *auth.Manager,
) *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"name":    "KDO API",
			"version": "1.0.0",
			"docs":    "/swagger/index.html",
			"health":  "/health",
		})
	})

	r.GET("/health", handler.Health(pool))
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	api := r.Group("/api/v1")
	api.POST("/auth/login", authHandler.Login)

	terlindungi := api.Group("")
	terlindungi.Use(middleware.Auth(jwtManager))
	terlindungi.GET("/auth/me", authHandler.Me)

	pd := terlindungi.Group("/perangkat-daerah")
	pd.GET("", pdHandler.List)
	pd.GET("/:id", pdHandler.Get)

	pdTulis := middleware.RequireRole("admin", "operator")
	pd.POST("", pdTulis, pdHandler.Create)
	pd.PUT("/:id", pdTulis, pdHandler.Update)
	pd.DELETE("/:id", pdTulis, pdHandler.Delete)

	pegawai := terlindungi.Group("/pegawai")
	pegawai.GET("", pegawaiHandler.List)
	pegawai.GET("/:id", pegawaiHandler.Get)
	pegawai.POST("", pdTulis, pegawaiHandler.Create)
	pegawai.PUT("/:id", pdTulis, pegawaiHandler.Update)
	pegawai.DELETE("/:id", pdTulis, pegawaiHandler.Delete)

	kendaraan := terlindungi.Group("/kendaraan")
	kendaraan.GET("", kendaraanHandler.List)
	kendaraan.GET("/:id", kendaraanHandler.Get)
	kendaraan.POST("", pdTulis, kendaraanHandler.Create)
	kendaraan.PUT("/:id", pdTulis, kendaraanHandler.Update)
	kendaraan.DELETE("/:id", pdTulis, kendaraanHandler.Delete)

	return r
}

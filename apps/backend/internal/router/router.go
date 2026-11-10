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

// Handlers mengelompokkan seluruh handler agar signature router tetap ringkas.
type Handlers struct {
	Auth            *handler.AuthHandler
	PerangkatDaerah *handler.PerangkatDaerahHandler
	Pegawai         *handler.PegawaiHandler
	Kendaraan       *handler.KendaraanHandler
	Peminjaman      *handler.PeminjamanHandler
	Servis          *handler.ServisHandler
	Dashboard       *handler.DashboardHandler
	Export          *handler.ExportHandler
	Pengguna        *handler.PenggunaHandler
}

// New menyusun seluruh route aplikasi.
func New(pool *pgxpool.Pool, h Handlers, jwtManager *auth.Manager, corsOrigins []string) *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery(), middleware.CORS(corsOrigins))

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
	api.POST("/auth/login", h.Auth.Login)

	terlindungi := api.Group("")
	terlindungi.Use(middleware.Auth(jwtManager))
	terlindungi.GET("/auth/me", h.Auth.Me)

	pd := terlindungi.Group("/perangkat-daerah")
	pd.GET("", h.PerangkatDaerah.List)
	pd.GET("/:id", h.PerangkatDaerah.Get)

	pegawai := terlindungi.Group("/pegawai")
	pegawai.GET("", h.Pegawai.List)
	pegawai.GET("/:id", h.Pegawai.Get)

	kendaraan := terlindungi.Group("/kendaraan")
	kendaraan.GET("", h.Kendaraan.List)
	kendaraan.GET("/:id", h.Kendaraan.Get)
	kendaraan.GET("/:id/servis", h.Servis.ListByKendaraan)

	peminjaman := terlindungi.Group("/peminjaman")
	peminjaman.GET("", h.Peminjaman.List)
	peminjaman.GET("/:id", h.Peminjaman.Get)

	dashboard := terlindungi.Group("/dashboard")
	dashboard.GET("/stats", h.Dashboard.Stats)
	dashboard.GET("/kendaraan-per-kondisi", h.Dashboard.Kondisi)
	dashboard.GET("/kendaraan-per-opd", h.Dashboard.PerOpd)
	dashboard.GET("/biaya-servis-bulanan", h.Dashboard.BiayaBulanan)
	dashboard.GET("/peminjaman-menunggu", h.Dashboard.PeminjamanMenunggu)

	export := terlindungi.Group("/export")
	export.GET("/kendaraan.csv", h.Export.Kendaraan)
	export.GET("/pegawai.csv", h.Export.Pegawai)
	export.GET("/peminjaman.csv", h.Export.Peminjaman)

	tulis := middleware.RequireRole("admin", "operator")
	pd.POST("", tulis, h.PerangkatDaerah.Create)
	pd.PUT("/:id", tulis, h.PerangkatDaerah.Update)
	pd.DELETE("/:id", tulis, h.PerangkatDaerah.Delete)

	pegawai.POST("", tulis, h.Pegawai.Create)
	pegawai.PUT("/:id", tulis, h.Pegawai.Update)
	pegawai.DELETE("/:id", tulis, h.Pegawai.Delete)

	kendaraan.POST("", tulis, h.Kendaraan.Create)
	kendaraan.PUT("/:id", tulis, h.Kendaraan.Update)
	kendaraan.DELETE("/:id", tulis, h.Kendaraan.Delete)
	kendaraan.POST("/:id/servis", tulis, h.Servis.Create)

	servis := terlindungi.Group("/servis")
	servis.PUT("/:id", tulis, h.Servis.Update)
	servis.DELETE("/:id", tulis, h.Servis.Delete)

	peminjaman.POST("", tulis, h.Peminjaman.Create)
	peminjaman.PATCH("/:id/selesai", tulis, h.Peminjaman.Selesai)
	peminjaman.PATCH("/:id/batalkan", tulis, h.Peminjaman.Batalkan)

	persetujuan := middleware.RequireRole("admin", "pimpinan")
	peminjaman.PATCH("/:id/setujui", persetujuan, h.Peminjaman.Setujui)
	peminjaman.PATCH("/:id/tolak", persetujuan, h.Peminjaman.Tolak)

	admin := middleware.RequireRole("admin")
	pengguna := terlindungi.Group("/pengguna", admin)
	pengguna.GET("", h.Pengguna.List)
	pengguna.POST("", h.Pengguna.Create)
	pengguna.PUT("/:id", h.Pengguna.Update)
	pengguna.DELETE("/:id", h.Pengguna.Delete)

	return r
}

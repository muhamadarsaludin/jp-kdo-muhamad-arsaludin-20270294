package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"kdo/backend/internal/auth"
	"kdo/backend/internal/config"
	"kdo/backend/internal/database"
	"kdo/backend/internal/database/sqlc"
	"kdo/backend/internal/handler"
	"kdo/backend/internal/repository"
	"kdo/backend/internal/router"
	"kdo/backend/internal/seed"
	"kdo/backend/internal/service"

	_ "kdo/backend/docs"
)

// @title           KDO API
// @version         1.0
// @description     API Aplikasi Kendaraan Dinas Operasional (KDO).
// @description     Kelola kendaraan dinas, pegawai, perangkat daerah, peminjaman, dan servis.
// @contact.name    Muhamad Arsaludin
// @contact.email   muhamadarsaludin71@gmail.com
// @host            localhost:8080
// @BasePath        /
// @schemes         http
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Masukkan token dengan format: Bearer {token}
func main() {
	cfg := config.Load()

	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))
	slog.SetDefault(logger)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	pool, err := database.NewPool(ctx, cfg.DatabaseURL)
	if err != nil {
		slog.Error("gagal menyiapkan database", "error", err)
		os.Exit(1)
	}
	defer pool.Close()

	if err := database.Migrate(cfg.DatabaseURL); err != nil {
		slog.Error("gagal menjalankan migrasi", "error", err)
		os.Exit(1)
	}
	slog.Info("migrasi selesai")

	if cfg.SeedOnStart {
		if err := seed.Run(ctx, pool); err != nil {
			slog.Error("gagal mengisi data seed", "error", err)
			os.Exit(1)
		}
	}

	jwtManager := auth.NewManager(cfg.JWTSecret, time.Duration(cfg.JWTExpiredHours)*time.Hour)

	queries := sqlc.New(pool)
	penggunaRepo := repository.NewPenggunaRepository(queries)
	authService := service.NewAuthService(penggunaRepo, jwtManager)
	authHandler := handler.NewAuthHandler(authService)

	pdRepo := repository.NewPerangkatDaerahRepository(queries)
	pdService := service.NewPerangkatDaerahService(pdRepo)
	pdHandler := handler.NewPerangkatDaerahHandler(pdService)

	pegawaiRepo := repository.NewPegawaiRepository(pool, queries)
	pegawaiService := service.NewPegawaiService(pegawaiRepo)
	pegawaiHandler := handler.NewPegawaiHandler(pegawaiService)

	kendaraanRepo := repository.NewKendaraanRepository(queries)
	kendaraanService := service.NewKendaraanService(kendaraanRepo)
	kendaraanHandler := handler.NewKendaraanHandler(kendaraanService)

	peminjamanRepo := repository.NewPeminjamanRepository(pool, queries)
	peminjamanService := service.NewPeminjamanService(peminjamanRepo)
	peminjamanHandler := handler.NewPeminjamanHandler(peminjamanService)

	servisRepo := repository.NewServisRepository(queries)
	servisService := service.NewServisService(servisRepo)
	servisHandler := handler.NewServisHandler(servisService)

	dashboardRepo := repository.NewDashboardRepository(queries)
	dashboardService := service.NewDashboardService(dashboardRepo)
	dashboardHandler := handler.NewDashboardHandler(dashboardService, peminjamanService)

	exportHandler := handler.NewExportHandler(kendaraanService, pegawaiService, peminjamanService)

	penggunaAdminRepo := repository.NewPenggunaAdminRepository(queries)
	penggunaService := service.NewPenggunaService(penggunaAdminRepo)
	penggunaHandler := handler.NewPenggunaHandler(penggunaService)

	handlers := router.Handlers{
		Auth:            authHandler,
		PerangkatDaerah: pdHandler,
		Pegawai:         pegawaiHandler,
		Kendaraan:       kendaraanHandler,
		Peminjaman:      peminjamanHandler,
		Servis:          servisHandler,
		Dashboard:       dashboardHandler,
		Export:          exportHandler,
		Pengguna:        penggunaHandler,
	}

	srv := &http.Server{
		Addr:              ":" + cfg.AppPort,
		Handler:           router.New(pool, handlers, jwtManager, cfg.CORSOrigins),
		ReadHeaderTimeout: 10 * time.Second,
	}

	go func() {
		slog.Info("server berjalan", "port", cfg.AppPort, "docs", "http://localhost:"+cfg.AppPort+"/swagger/index.html")
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			slog.Error("server berhenti tidak normal", "error", err)
			os.Exit(1)
		}
	}()

	<-ctx.Done()
	slog.Info("menghentikan server")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		slog.Error("gagal shutdown", "error", err)
	}
}

// Command seed menjalankan migrasi lalu mengisi data contoh, tanpa menjalankan server.
// Seed dilewati bila data master sudah ada.
package main

import (
	"context"
	"log/slog"
	"os"

	"kdo/backend/internal/config"
	"kdo/backend/internal/database"
	"kdo/backend/internal/seed"
)

func main() {
	cfg := config.Load()
	ctx := context.Background()

	if err := database.Migrate(cfg.DatabaseURL); err != nil {
		slog.Error("migrasi gagal", "error", err)
		os.Exit(1)
	}

	pool, err := database.NewPool(ctx, cfg.DatabaseURL)
	if err != nil {
		slog.Error("koneksi database gagal", "error", err)
		os.Exit(1)
	}
	defer pool.Close()

	if err := seed.Run(ctx, pool); err != nil {
		slog.Error("seed gagal", "error", err)
		os.Exit(1)
	}
}

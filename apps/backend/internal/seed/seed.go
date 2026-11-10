package seed

import (
	"context"
	"fmt"
	"io/fs"
	"log/slog"
	"sort"

	"github.com/jackc/pgx/v5/pgxpool"

	seeddata "kdo/backend/db/seed"
)

// Run menjalankan seluruh file SQL di db/seed secara berurutan dalam satu transaksi.
// Seed idempoten: jika data master sudah ada, seluruh proses dilewati.
func Run(ctx context.Context, pool *pgxpool.Pool) error {
	tx, err := pool.Begin(ctx)
	if err != nil {
		return fmt.Errorf("mulai transaksi seed: %w", err)
	}
	defer tx.Rollback(ctx) //nolint:errcheck

	var existing int
	if err := tx.QueryRow(ctx, `SELECT count(*) FROM perangkat_daerah WHERE deleted_at IS NULL`).Scan(&existing); err != nil {
		return fmt.Errorf("cek data seed: %w", err)
	}
	if existing > 0 {
		slog.Info("seed dilewati, data sudah ada", "perangkat_daerah", existing)
		return nil
	}

	files, err := fs.Glob(seeddata.FS, "*.sql")
	if err != nil {
		return fmt.Errorf("baca daftar file seed: %w", err)
	}
	sort.Strings(files)

	for _, name := range files {
		content, err := seeddata.FS.ReadFile(name)
		if err != nil {
			return fmt.Errorf("baca file seed %s: %w", name, err)
		}
		if _, err := tx.Exec(ctx, string(content)); err != nil {
			return fmt.Errorf("eksekusi seed %s: %w", name, err)
		}
		slog.Info("seed file dijalankan", "file", name)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("commit seed: %w", err)
	}

	slog.Info("seed selesai", "jumlah_file", len(files))
	return nil
}

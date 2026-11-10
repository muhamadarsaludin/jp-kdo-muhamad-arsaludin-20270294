// Command migrate menjalankan migrasi database tanpa CLI tambahan.
//
// Contoh:
//
//	go run ./cmd/migrate -up
//	go run ./cmd/migrate -down 1
//	go run ./cmd/migrate -down all
//	go run ./cmd/migrate -version
//	go run ./cmd/migrate -force 3
package main

import (
	"flag"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"

	"kdo/backend/internal/config"
	"kdo/backend/internal/database"
)

const migrationsDir = "db/migrations"

func main() {
	up := flag.Bool("up", false, "jalankan semua migrasi yang belum diterapkan")
	down := flag.String("down", "", "turunkan migrasi: jumlah langkah (mis. 1) atau 'all'")
	version := flag.Bool("version", false, "tampilkan versi migrasi saat ini")
	force := flag.Int("force", -1, "paksa versi migrasi (dipakai saat dirty)")
	create := flag.String("create", "", "buat pasangan file migrasi baru (nama snake_case)")
	flag.Parse()

	actions := 0
	for _, aktif := range []bool{*up, *down != "", *version, *force >= 0, *create != ""} {
		if aktif {
			actions++
		}
	}
	if actions != 1 {
		fmt.Fprintln(os.Stderr, "pilih tepat satu aksi: -up, -down, -version, -force, atau -create")
		flag.Usage()
		os.Exit(2)
	}

	cfg := config.Load()
	var err error

	switch {
	case *up:
		err = database.Migrate(cfg.DatabaseURL)
		if err == nil {
			slog.Info("migrasi up selesai")
		}

	case *version:
		var v uint
		var dirty bool
		v, dirty, err = database.MigrateVersion(cfg.DatabaseURL)
		if err == nil {
			slog.Info("versi migrasi", "version", v, "dirty", dirty)
		}

	case *force >= 0:
		err = database.MigrateForce(cfg.DatabaseURL, *force)
		if err == nil {
			slog.Info("versi migrasi dipaksa", "version", *force)
		}

	case *create != "":
		var paths []string
		paths, err = createMigration(*create)
		if err == nil {
			slog.Info("file migrasi dibuat", "files", paths)
		}

	case *down != "":
		if strings.EqualFold(*down, "all") {
			err = database.Rollback(cfg.DatabaseURL)
			if err == nil {
				slog.Info("seluruh migrasi diturunkan")
			}
			break
		}

		var steps int
		steps, err = strconv.Atoi(*down)
		if err != nil || steps <= 0 {
			fmt.Fprintln(os.Stderr, "-down harus angka > 0 atau 'all'")
			os.Exit(2)
		}
		err = database.MigrateSteps(cfg.DatabaseURL, -steps)
		if err == nil {
			slog.Info("migrasi down selesai", "steps", steps)
		}
	}

	if err != nil {
		slog.Error("migrasi gagal", "error", err)
		os.Exit(1)
	}
}

var namaMigrasiValid = regexp.MustCompile(`^[a-z0-9]+(_[a-z0-9]+)*$`)

// createMigration membuat pasangan file .up.sql dan .down.sql berikutnya.
func createMigration(name string) ([]string, error) {
	name = strings.ToLower(strings.TrimSpace(name))
	if !namaMigrasiValid.MatchString(name) {
		return nil, fmt.Errorf("nama migrasi hanya huruf kecil, angka, dan underscore: %q", name)
	}

	entries, err := os.ReadDir(migrationsDir)
	if err != nil {
		return nil, fmt.Errorf("baca folder migrasi: %w", err)
	}

	terakhir := 0
	for _, entry := range entries {
		if entry.IsDir() || !strings.HasSuffix(entry.Name(), ".up.sql") {
			continue
		}
		var nomor int
		if _, err := fmt.Sscanf(entry.Name(), "%06d_", &nomor); err == nil && nomor > terakhir {
			terakhir = nomor
		}
	}

	berikut := terakhir + 1
	base := fmt.Sprintf("%06d_%s", berikut, name)
	upPath := filepath.Join(migrationsDir, base+".up.sql")
	downPath := filepath.Join(migrationsDir, base+".down.sql")

	if _, err := os.Stat(upPath); err == nil {
		return nil, fmt.Errorf("file %s sudah ada", upPath)
	}

	if err := os.WriteFile(upPath, []byte("-- "+base+".up.sql\n\n"), 0o644); err != nil {
		return nil, err
	}
	if err := os.WriteFile(downPath, []byte("-- "+base+".down.sql\n\n"), 0o644); err != nil {
		return nil, err
	}

	return []string{upPath, downPath}, nil
}

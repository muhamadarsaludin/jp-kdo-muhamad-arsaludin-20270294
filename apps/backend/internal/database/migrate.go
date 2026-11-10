package database

import (
	"database/sql"
	"errors"
	"fmt"

	"github.com/golang-migrate/migrate/v4"
	pgxmigrate "github.com/golang-migrate/migrate/v4/database/pgx/v5"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	_ "github.com/jackc/pgx/v5/stdlib"

	"kdo/backend/db/migrations"
)

// newMigrator menyiapkan instance migrate beserta fungsi pembersihnya.
func newMigrator(databaseURL string) (*migrate.Migrate, func(), error) {
	source, err := iofs.New(migrations.FS, ".")
	if err != nil {
		return nil, nil, fmt.Errorf("siapkan source migrasi: %w", err)
	}

	db, err := sql.Open("pgx", databaseURL)
	if err != nil {
		return nil, nil, fmt.Errorf("buka koneksi migrasi: %w", err)
	}

	driver, err := pgxmigrate.WithInstance(db, &pgxmigrate.Config{})
	if err != nil {
		db.Close()
		return nil, nil, fmt.Errorf("buat driver migrasi: %w", err)
	}

	m, err := migrate.NewWithInstance("iofs", source, "pgx", driver)
	if err != nil {
		db.Close()
		return nil, nil, fmt.Errorf("inisialisasi migrasi: %w", err)
	}

	cleanup := func() {
		_, _ = m.Close()
		_ = db.Close()
	}
	return m, cleanup, nil
}

// Migrate menjalankan seluruh migrasi yang belum diterapkan.
// File SQL diambil dari embed.FS sehingga tidak membutuhkan CLI.
func Migrate(databaseURL string) error {
	m, cleanup, err := newMigrator(databaseURL)
	if err != nil {
		return err
	}
	defer cleanup()

	if err := m.Up(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		return fmt.Errorf("jalankan migrasi: %w", err)
	}
	return nil
}

// MigrateSteps menjalankan n langkah migrasi (positif = up, negatif = down).
func MigrateSteps(databaseURL string, steps int) error {
	m, cleanup, err := newMigrator(databaseURL)
	if err != nil {
		return err
	}
	defer cleanup()

	if err := m.Steps(steps); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		return fmt.Errorf("jalankan %d langkah migrasi: %w", steps, err)
	}
	return nil
}

// Rollback membatalkan seluruh migrasi (dipakai manual saat development).
func Rollback(databaseURL string) error {
	m, cleanup, err := newMigrator(databaseURL)
	if err != nil {
		return err
	}
	defer cleanup()

	if err := m.Down(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		return fmt.Errorf("rollback migrasi: %w", err)
	}
	return nil
}

// MigrateVersion mengembalikan versi migrasi saat ini dan status dirty.
func MigrateVersion(databaseURL string) (uint, bool, error) {
	m, cleanup, err := newMigrator(databaseURL)
	if err != nil {
		return 0, false, err
	}
	defer cleanup()

	version, dirty, err := m.Version()
	if err != nil {
		if errors.Is(err, migrate.ErrNilVersion) {
			return 0, false, nil
		}
		return 0, false, fmt.Errorf("baca versi migrasi: %w", err)
	}
	return version, dirty, nil
}

// MigrateForce memaksa versi migrasi (dipakai saat status dirty).
func MigrateForce(databaseURL string, version int) error {
	m, cleanup, err := newMigrator(databaseURL)
	if err != nil {
		return err
	}
	defer cleanup()

	if err := m.Force(version); err != nil {
		return fmt.Errorf("force versi migrasi: %w", err)
	}
	return nil
}

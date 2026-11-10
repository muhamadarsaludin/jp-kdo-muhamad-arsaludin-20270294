package config

import (
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
)

// Config menampung seluruh konfigurasi aplikasi dari environment.
type Config struct {
	AppPort         string
	AppEnv          string
	DatabaseURL     string
	JWTSecret       string
	JWTExpiredHours int
	CORSOrigins     []string
	SeedOnStart     bool
}

// Load membaca .env (bila ada) lalu environment. Nilai default dipakai untuk
// konfigurasi yang aman dijalankan di mesin lokal.
func Load() *Config {
	_ = godotenv.Load()

	return &Config{
		AppPort:         env("APP_PORT", "8080"),
		AppEnv:          env("APP_ENV", "development"),
		DatabaseURL:     env("DATABASE_URL", "postgres://kdo:kdo@localhost:5435/kdo?sslmode=disable"),
		JWTSecret:       env("JWT_SECRET", "dev-secret-jangan-dipakai-di-produksi"),
		JWTExpiredHours: envInt("JWT_EXPIRED_HOURS", 12),
		CORSOrigins:     splitCSV(env("CORS_ORIGINS", "http://localhost:5173")),
		SeedOnStart:     envBool("SEED_ON_START", true),
	}
}

func env(key, fallback string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return fallback
}

func envInt(key string, fallback int) int {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		if n, err := strconv.Atoi(v); err == nil {
			return n
		}
	}
	return fallback
}

func envBool(key string, fallback bool) bool {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		if b, err := strconv.ParseBool(v); err == nil {
			return b
		}
	}
	return fallback
}

func splitCSV(v string) []string {
	parts := strings.Split(v, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		if p = strings.TrimSpace(p); p != "" {
			out = append(out, p)
		}
	}
	return out
}

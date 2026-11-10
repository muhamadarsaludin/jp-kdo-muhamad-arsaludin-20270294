SHELL := /bin/sh
DB_CONTAINER := kdo-postgres

.DEFAULT_GOAL := help

.PHONY: help setup run build test lint fmt check tidy clean \
	db-up db-down db-reset db-logs db-ps db-shell \
	migrate-up migrate-down migrate-reset migrate-version migrate-force migrate-create \
	seed sqlc swag

##@ Umum

help: ## Tampilkan daftar perintah
	@echo "KDO backend — perintah yang tersedia:"
	@grep -E '^[a-zA-Z0-9_-]+:.*## ' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

setup: db-up migrate-up seed ## Nyalakan DB, jalankan migrasi, isi seed
	@echo "Backend siap. Jalankan 'make run'."

run: ## Jalankan API (migrasi + seed otomatis saat start)
	go run ./cmd/api

build: ## Build binary API ke bin/api
	go build -o bin/api ./cmd/api

test: ## Jalankan unit test
	go test ./...

lint: ## go vet
	go vet ./...

fmt: ## Format kode Go
	gofmt -w .

check: ## Pastikan format rapi + go vet bersih
	@files=$$(gofmt -l .); \
	if [ -n "$$files" ]; then \
		echo "File belum diformat (jalankan 'make fmt'):"; \
		echo "$$files"; \
		exit 1; \
	fi
	go vet ./...

tidy: ## Rapikan go.mod/go.sum
	go mod tidy

clean: ## Bersihkan artefak build
	rm -rf bin
	@echo "Artefak build dibersihkan."

##@ Database (Docker)

db-up: ## Nyalakan PostgreSQL
	docker compose up -d db

db-down: ## Matikan container PostgreSQL
	docker compose down

db-reset: ## Hapus volume database lalu nyalakan ulang
	docker compose down -v
	docker compose up -d db

db-logs: ## Lihat log PostgreSQL
	docker compose logs -f db

db-ps: ## Status container database
	docker compose ps

db-shell: ## Masuk ke psql interaktif
	docker exec -it $(DB_CONTAINER) psql -U kdo -d kdo

##@ Migrasi

migrate-up: ## Jalankan semua migrasi yang belum diterapkan
	go run ./cmd/migrate -up

migrate-down: ## Turunkan satu langkah migrasi
	go run ./cmd/migrate -down 1

migrate-reset: ## Rollback semua migrasi lalu jalankan ulang dari awal
	go run ./cmd/migrate -down all
	go run ./cmd/migrate -up

migrate-version: ## Tampilkan versi migrasi saat ini
	go run ./cmd/migrate -version

migrate-force: ## Paksa versi migrasi: make migrate-force VERSION=3
	@if [ -z "$(VERSION)" ]; then echo "VERSION wajib diisi, contoh: make migrate-force VERSION=3"; exit 1; fi
	go run ./cmd/migrate -force $(VERSION)

migrate-create: ## Buat file migrasi baru: make migrate-create NAME=tambah_kolom
	@if [ -z "$(NAME)" ]; then echo "NAME wajib diisi, contoh: make migrate-create NAME=tambah_kolom"; exit 1; fi
	go run ./cmd/migrate -create $(NAME)

##@ Data & kode

seed: ## Isi data contoh (dilewati bila data sudah ada)
	go run ./cmd/seed

sqlc: ## Regenerate kode dari db/queries/*.sql
	sqlc generate

swag: ## Regenerate dokumentasi Swagger
	go run github.com/swaggo/swag/cmd/swag@v1.16.6 init -g cmd/api/main.go -o docs

SHELL := /bin/sh
BACKEND := apps/backend
DB_CONTAINER := kdo-postgres

.DEFAULT_GOAL := help

.PHONY: help install setup dev run build test check fmt clean \
	db-up db-down db-reset db-logs db-ps db-shell \
	migrate-up migrate-down migrate-reset migrate-version migrate-force migrate-create \
	seed sqlc swag

##@ Umum

help: ## Tampilkan daftar perintah
	@echo "KDO — perintah yang tersedia:"
	@grep -E '^[a-zA-Z0-9_-]+:.*## ' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

install: ## Install dependency (pnpm + Go modules)
	pnpm install
	cd $(BACKEND) && go mod download

setup: install db-up migrate-up seed ## Setup awal: install, nyalakan DB, migrasi, seed
	@echo "Setup selesai. Jalankan 'make run' untuk menyalakan API."

dev: ## Jalankan semua app lewat turbo
	pnpm dev

run: ## Jalankan API (migrasi + seed otomatis saat start)
	cd $(BACKEND) && go run ./cmd/api

build: ## Build backend & frontend
	pnpm build
	cd $(BACKEND) && go build -o bin/api ./cmd/api

test: ## Jalankan seluruh test
	pnpm test

check: ## Lint & verifikasi (Biome + go vet)
	pnpm check
	cd $(BACKEND) && go vet ./...

fmt: ## Format kode (Biome + gofmt)
	pnpm format
	cd $(BACKEND) && gofmt -w .

clean: ## Bersihkan artefak build
	rm -rf $(BACKEND)/bin .turbo
	@echo "Artefak build dibersihkan."

##@ Database (Docker)

db-up: ## Nyalakan PostgreSQL
	pnpm db:up

db-down: ## Matikan container PostgreSQL
	pnpm db:down

db-reset: ## Hapus volume database lalu nyalakan ulang
	pnpm db:reset
	pnpm db:up

db-logs: ## Lihat log PostgreSQL
	pnpm db:logs

db-ps: ## Status container database
	pnpm db:ps

db-shell: ## Masuk ke psql interaktif
	docker exec -it $(DB_CONTAINER) psql -U kdo -d kdo

##@ Migrasi

migrate-up: ## Jalankan semua migrasi yang belum diterapkan
	cd $(BACKEND) && go run ./cmd/migrate -up

migrate-down: ## Turunkan satu langkah migrasi
	cd $(BACKEND) && go run ./cmd/migrate -down 1

migrate-reset: ## Rollback semua migrasi lalu jalankan ulang dari awal
	cd $(BACKEND) && go run ./cmd/migrate -down all
	cd $(BACKEND) && go run ./cmd/migrate -up

migrate-version: ## Tampilkan versi migrasi saat ini
	cd $(BACKEND) && go run ./cmd/migrate -version

migrate-force: ## Paksa versi migrasi: make migrate-force VERSION=3
	@if [ -z "$(VERSION)" ]; then echo "VERSION wajib diisi, contoh: make migrate-force VERSION=3"; exit 1; fi
	cd $(BACKEND) && go run ./cmd/migrate -force $(VERSION)

migrate-create: ## Buat file migrasi baru: make migrate-create NAME=tambah_kolom
	@if [ -z "$(NAME)" ]; then echo "NAME wajib diisi, contoh: make migrate-create NAME=tambah_kolom"; exit 1; fi
	cd $(BACKEND) && go run ./cmd/migrate -create $(NAME)

##@ Data & kode

seed: ## Isi data contoh (dilewati bila data sudah ada)
	cd $(BACKEND) && go run ./cmd/seed

sqlc: ## Regenerate kode dari db/queries/*.sql
	cd $(BACKEND) && sqlc generate

swag: ## Regenerate dokumentasi Swagger
	cd $(BACKEND) && go run github.com/swaggo/swag/cmd/swag@v1.16.6 init -g cmd/api/main.go -o docs

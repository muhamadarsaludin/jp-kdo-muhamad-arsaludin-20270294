# Agents.md — Aplikasi KDO (Kendaraan Dinas Operasional)

> **Baca file ini sampai habis sebelum menulis kode.** File ini adalah sumber kebenaran tunggal
> (single source of truth) untuk stack, struktur, konvensi, kontrak API, dan definisi selesai.
> Jika ada instruksi yang bertentangan dengan file ini, tanyakan dulu — jangan berasumsi.

---

## 0. Mode & Model yang Dipakai

| Item | Nilai |
| --- | --- |
| Model | DeepSeek V4.1 Flash |
| Provider / Model ID | `opencode-go` / `deepseek-v4.1-flash` |
| Mode agent | **Build (Code Mode)** — boleh menulis file, menjalankan shell, build & test |
| Bahasa komunikasi | Indonesia (UI & penjelasan), identifier kode tetap bahasa Inggris |
| Tanggal Agents.md dibuat | 10 November 2026 |
| Konteks | Ujian praktik Junior Programmer BPAD |

**Aturan mode:**
- Mode Build dipakai untuk implementasi. Untuk perubahan besar/berisiko (migrasi skema,
  refactor lintas layer), ajukan rencana singkat dulu sebelum mengeksekusi.
- Jangan pernah menghapus file yang tidak kamu buat tanpa konfirmasi.
- Setiap selesai satu unit kerja: build → test → laporkan apa yang berubah.

---

## 1. Ringkasan Proyek

Aplikasi web fullstack untuk mengelola **Kendaraan Dinas Operasional (KDO)** di lingkungan
Pemerintah Daerah. Ada 3 entitas wajib (CRUD penuh) + fitur pendukung untuk nilai tambah.

**Entitas wajib:**
1. **Kendaraan Dinas** — nomor polisi, merek, tipe, tahun produksi, warna, kondisi, status, dll.
2. **Pegawai (PNS)** — nama, NIP, jabatan, golongan, perangkat daerah, dll.
3. **Perangkat Daerah** — kode, nama instansi, alamat, kepala, dll.

**Fitur tambahan (wajib dikerjakan, bukan opsional):**
- Autentikasi JWT + role (`admin`, `operator`, `pimpinan`).
- Peminjaman/penggunaan kendaraan (booking) dengan alur persetujuan.
- Riwayat servis & biaya perawatan per kendaraan.
- Dashboard statistik (jumlah kendaraan per kondisi/status, total biaya servis, peminjaman aktif).
- Pencarian, filter, sorting, pagination di semua tabel.
- Export CSV.
- Soft delete + audit sederhana (`created_at`, `updated_at`, `deleted_at`).

**Target demo:** examiner bisa login, CRUD 3 entitas, ajukan + setujui peminjaman,
lihat dashboard berubah, dan data bertahan setelah restart.

---

## 2. Tech Stack (jangan diganti tanpa persetujuan)

### Backend
| Komponen | Pilihan |
| --- | --- |
| Bahasa | Go 1.23+ |
| HTTP framework | Gin `github.com/gin-gonic/gin` v1.10 |
| Driver database | pgx v5 `github.com/jackc/pgx/v5` + `pgxpool` |
| Query layer | **sqlc** (`sqlc.dev`) — SQL ditulis manual, kode Go di-generate |
| Migrasi | **golang-migrate** (`golang-migrate/migrate/v4`) dengan file SQL + `embed` |
| Database | PostgreSQL 16 (Docker Compose) |
| Auth | JWT `github.com/golang-jwt/jwt/v5` (HS256), password `golang.org/x/crypto/bcrypt` |
| Dokumentasi API | **Swaggo** (`swaggo/swag` + `gin-swagger`) |
| Validasi | tag `binding` Gin + validasi domain di service layer |
| Config | `github.com/joho/godotenv` + `os.Getenv` |
| Logging | `log/slog` (stdlib) |
| Testing | `testing` + `net/http/httptest` + `testify` |

### Keputusan yang sudah final
- **Tanpa ORM/GORM.** Semua query lewat SQL eksplisit di `queries/*.sql` dan di-generate sqlc.
- **Tanpa Redis.** Tidak ada cache/session store terpusat; JWT stateless dan query dashboard
  cukup ringan. Redis baru dipertimbangkan bila butuh rate limit, refresh-token store, atau
  deployment multi-instance.
- **Tanpa refresh token** pada versi ujian: satu access token berumur 12 jam.
- Migrasi dijalankan otomatis saat startup dari file yang di-`embed`, tanpa perlu CLI
  `migrate` saat demo. CLI hanya dipakai untuk membuat/menguji migrasi baru.

### Frontend
| Komponen | Pilihan |
| --- | --- |
| Build tool | Vite |
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing | React Router v7 |
| Data fetching | TanStack Query v5 |
| Form | react-hook-form + zod (`@hookform/resolvers`) |
| HTTP | `axios` dengan interceptor token + normalisasi error |
| Ikon | `lucide-react` |
| Grafik | `recharts` |
| Notifikasi | `sonner` |

### Infrastruktur
- **Monorepo**: pnpm workspaces + Turborepo untuk frontend (`apps/web`, `packages/*`).
- **Backend Go tidak masuk workspace pnpm/Turbo**; dikelola lewat `apps/backend/Makefile`.
- Docker Compose **hanya untuk PostgreSQL**, file di `apps/backend/docker-compose.yml`
  (host port 5435). Backend & frontend jalan native saat demo.
- **Biome** untuk lint + format + urutkan import (menggantikan ESLint & Prettier).
- Tanpa query builder tambahan, tanpa state manager global (cukup Query + Context auth).

---

## 3. Struktur Repo (monorepo)

```
.
├── Agents.md
├── README.md
├── package.json                # script root (turbo, frontend)
├── pnpm-workspace.yaml         # apps/web + packages/*
├── pnpm-lock.yaml
├── turbo.json                  # definisi task: dev, build, lint, typecheck, test
├── .editorconfig
├── .gitignore
├── .nvmrc
├── biome.json                  # lint + format (Biome)
├── docs/
│   ├── api.md                  # kontrak API (diupdate manual per endpoint baru)
│   └── erd.md                  # diagram relasi (Mermaid)
├── apps/
│   ├── backend/                # Go + Gin + pgx + sqlc  → bukan workspace pnpm
│   │   ├── Makefile            # seluruh perintah backend
│   │   ├── docker-compose.yml  # PostgreSQL 16 (host port 5435)
│   │   ├── go.mod
│   │   ├── sqlc.yaml           # konfigurasi generate query
│   │   ├── .env.example
│   │   ├── cmd/
│   │   │   └── api/main.go     # config → db → migrate → seed → router
│   │   ├── db/
│   │   │   ├── migrations/     # 000001_init.up.sql / .down.sql (golang-migrate)
│   │   │   ├── queries/        # *.sql, sumber generate sqlc
│   │   │   └── seed/           # *.sql data contoh (dijalankan setelah migrasi)
│   │   ├── docs/               # hasil `swag init` (swagger.json, docs.go)
│   │   └── internal/
│   │       ├── config/config.go
│   │       ├── database/
│   │       │   ├── postgres.go # pgxpool + ping
│   │       │   ├── migrate.go  # jalankan migrasi dari embed.FS
│   │       │   └── sqlc/       # hasil generate — JANGAN diedit manual
│   │       ├── auth/           # JWT manager (generate & parse token)
│   │       ├── dto/            # request/response, tidak pernah expose row sqlc
│   │       ├── repository/     # bungkus sqlc.Queries + transaksi pgx
│   │       ├── service/        # aturan bisnis, validasi, transaksi
│   │       ├── handler/        # HTTP: bind → service → response
│   │       ├── middleware/     # auth JWT, role, CORS, request logger, recovery
│   │       ├── router/router.go
│   │       ├── response/       # envelope sukses & error
│   │       ├── seed/seed.go
│   │       └── utils/          # pagination, parser, helper
│   └── web/                    # React + Vite + TS + Tailwind → @kdo/web
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── src/
│           ├── main.tsx
│           ├── App.tsx
│           ├── index.css
│           ├── routes/         # definisi route + ProtectedRoute
│           ├── lib/            # api.ts, queryClient.ts, utils.ts, format.ts
│           ├── hooks/          # useAuth, useDebounce, usePagination
│           ├── components/
│           │   ├── ui/         # Button, Input, Select, Modal, Table, Badge, Card...
│           │   └── layout/     # Sidebar, Topbar, PageHeader
│           ├── features/
│           │   ├── auth/
│           │   ├── kendaraan/
│           │   ├── pegawai/
│           │   ├── perangkat-daerah/
│           │   ├── peminjaman/
│           │   ├── servis/
│           │   └── dashboard/
│           └── types/          # tipe domain bersama
└── packages/                   # (opsional) paket bersama, mis. konfigurasi UI
```

**Konvensi workspace:**
- Nama package frontend: `@kdo/web`; filter turbo memakai nama ini (`pnpm dev:web`).
- **Backend tidak punya `package.json` dan tidak terdaftar di `pnpm-workspace.yaml`.**
  Semua perintah Go lewat `apps/backend/Makefile`.
- `pnpm-workspace.yaml` hanya berisi `apps/web` dan `packages/*`.
- Folder dibuat kosong pada tahap scaffolding; kode diisi per fase di §10.

**Aturan struktur:**
- Satu entitas = satu file query (`db/queries/<entitas>.sql`), satu repository, satu service,
  satu handler.
- Handler **tidak boleh** menyentuh `*pgxpool.Pool` atau `sqlc.Queries` langsung; selalu lewat service.
- Semua SQL berada di `db/queries/*.sql`. Dilarang menulis query string di handler/service.
  Setelah mengubah query: `sqlc generate`.
- Setiap perubahan skema = file migrasi baru (`.up.sql` + `.down.sql`), bukan mengedit migrasi lama.
- Repository **tidak boleh** berisi aturan bisnis.
- Frontend: logika per fitur di `features/<fitur>`, bukan numpuk di `pages`.
- Komponen UI generik hanya di `components/ui`, tanpa ketergantungan ke fitur.

---

## 4. Model Data

Semua tabel: `id BIGSERIAL PRIMARY KEY`, `created_at`, `updated_at`, `deleted_at` (soft delete,
kecuali tabel log). Nama tabel & kolom `snake_case` bahasa Indonesia.

### 4.1 `perangkat_daerah`
| Kolom | Tipe | Aturan |
| --- | --- | --- |
| kode | varchar(20) | unik, uppercase, contoh `DISPENDIK` |
| nama | varchar(150) | wajib, unik |
| singkatan | varchar(30) | opsional |
| alamat | text | opsional |
| telepon | varchar(20) | opsional |
| email | varchar(100) | opsional, format email |
| nama_kepala | varchar(100) | opsional |
| is_active | boolean | default `true` |

### 4.2 `pegawai`
| Kolom | Tipe | Aturan |
| --- | --- | --- |
| nip | char(18) | unik, wajib, tepat 18 digit angka |
| nama | varchar(100) | wajib |
| gelar_depan | varchar(20) | opsional |
| gelar_belakang | varchar(30) | opsional |
| jabatan | varchar(100) | wajib |
| golongan | varchar(10) | wajib, enum `I/a`…`IV/e` |
| pangkat | varchar(50) | opsional |
| perangkat_daerah_id | bigint FK | wajib, `ON DELETE RESTRICT` |
| email | varchar(100) | opsional |
| telepon | varchar(20) | opsional |
| tanggal_lahir | date | opsional |
| status_pegawai | varchar(20) | enum `aktif`, `nonaktif`, `pensiun`; default `aktif` |

### 4.3 `kendaraan`
| Kolom | Tipe | Aturan |
| --- | --- | --- |
| nomor_polisi | varchar(15) | unik, wajib, dinormalisasi uppercase 1 spasi |
| nomor_rangka | varchar(50) | unik, opsional |
| nomor_mesin | varchar(50) | unik, opsional |
| merek | varchar(50) | wajib |
| tipe | varchar(50) | wajib |
| tahun_produksi | smallint | wajib, 1980 ≤ x ≤ tahun berjalan + 1 |
| warna | varchar(30) | wajib |
| jenis | varchar(20) | enum `motor`, `mobil`, `minibus`, `pickup`, `ambulans` |
| bahan_bakar | varchar(20) | enum `bensin`, `solar`, `listrik`, `hybrid` |
| kapasitas_cc | int | opsional |
| odometer_km | int | default 0 |
| kondisi | varchar(20) | enum `baik`, `rusak_ringan`, `rusak_berat`; default `baik` |
| status | varchar(20) | enum `tersedia`, `digunakan`, `perbaikan`, `dihapuskan`; default `tersedia` |
| tanggal_pajak | date | opsional |
| tanggal_stnk | date | opsional |
| perangkat_daerah_id | bigint FK | wajib |
| penanggung_jawab_id | bigint FK → pegawai | opsional |
| foto_url | text | opsional |
| keterangan | text | opsional |

### 4.4 `peminjaman`
| Kolom | Tipe | Aturan |
| --- | --- | --- |
| kode_peminjaman | varchar(30) | unik, format `PJM-YYYYMMDD-XXXX` |
| kendaraan_id | bigint FK | wajib |
| pegawai_id | bigint FK | wajib (peminjam) |
| perangkat_daerah_id | bigint FK | wajib (asal peminjam) |
| keperluan | varchar(200) | wajib |
| tujuan | varchar(200) | wajib |
| tanggal_mulai | timestamptz | wajib |
| tanggal_selesai | timestamptz | wajib, > `tanggal_mulai` |
| status | varchar(20) | enum `diajukan`, `disetujui`, `ditolak`, `selesai`, `dibatalkan` |
| catatan | text | opsional |
| disetujui_oleh | bigint FK → pengguna | nullable |

### 4.5 `servis`
| Kolom | Tipe | Aturan |
| --- | --- | --- |
| kendaraan_id | bigint FK | wajib |
| tanggal | date | wajib |
| jenis | varchar(30) | enum `rutin`, `perbaikan`, `ganti_part` |
| deskripsi | text | wajib |
| bengkel | varchar(100) | opsional |
| biaya | numeric(14,2) | ≥ 0 |
| odometer_km | int | opsional |

### 4.6 `pengguna`
| Kolom | Tipe | Aturan |
| --- | --- | --- |
| nama | varchar(100) | wajib |
| email | varchar(100) | unik, wajib |
| password_hash | text | bcrypt cost 10 |
| role | varchar(20) | enum `admin`, `operator`, `pimpinan` |
| is_active | boolean | default `true` |

---

## 5. Aturan Bisnis (harus diuji)

1. **Normalisasi nomor polisi**: uppercase, rapikan spasi (`B 1234 XYZ`).
2. **NIP** harus 18 digit numerik dan unik; tolak selain itu dengan pesan jelas.
3. **Tahun produksi** tidak boleh di masa depan > tahun berjalan + 1.
4. **Kendaraan tidak bisa dipinjam** jika `status != tersedia` atau ada peminjaman
   berstatus `diajukan`/`disetujui` yang waktunya beririsan.
5. **Transisi status peminjaman** hanya:
   `diajukan → disetujui | ditolak`, `disetujui → selesai`, `diajukan|disetujui → dibatalkan`.
   Saat `disetujui`: kendaraan → `digunakan`. Saat `selesai`/`dibatalkan`: kendaraan → `tersedia`.
6. **Hapus kendaraan** ditolak bila masih punya peminjaman aktif; gunakan soft delete.
7. **Hapus perangkat daerah** ditolak bila masih punya pegawai/kendaraan aktif.
8. **Hapus pegawai** yang menjadi penanggung jawab kendaraan → set null, jangan gagal.
9. Semua endpoint tulis data master (`POST/PUT/PATCH/DELETE` perangkat daerah, pegawai,
   kendaraan, servis) wajib role `admin` atau `operator`. Khusus `PATCH /peminjaman/:id/setujui`
   dan `/tolak`, role `pimpinan` ikut diizinkan. Manajemen `pengguna` hanya `admin`.
   `pimpinan` tidak boleh mengubah data master.
10. Validasi di **service layer** — bukan hanya di frontend.

---

## 6. Kontrak API

Base URL: `/api/v1`. Semua response JSON.

### Envelope sukses
```json
{ "data": { }, "meta": { "page": 1, "limit": 10, "total": 42, "total_pages": 5 } }
```
`meta` hanya untuk endpoint list.

### Envelope error
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Data tidak valid", "details": { "nip": "NIP harus 18 digit" } } }
```

Kode error: `VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `INTERNAL_ERROR`.

### Query parameter list (standar)
`page` (default 1), `limit` (default 10, max 100), `search`, `sort` (default `created_at`),
`order` (`asc|desc`), plus filter spesifik per entitas.

### Endpoint
```
POST   /auth/login
GET    /auth/me

GET    /perangkat-daerah            ?search=&is_active=
POST   /perangkat-daerah
GET    /perangkat-daerah/:id
PUT    /perangkat-daerah/:id
DELETE /perangkat-daerah/:id

GET    /pegawai                     ?search=&perangkat_daerah_id=&golongan=&status_pegawai=
POST   /pegawai
GET    /pegawai/:id
PUT    /pegawai/:id
DELETE /pegawai/:id

GET    /kendaraan                   ?search=&perangkat_daerah_id=&kondisi=&status=&jenis=&tahun=
POST   /kendaraan
GET    /kendaraan/:id
PUT    /kendaraan/:id
DELETE /kendaraan/:id

GET    /peminjaman                  ?status=&kendaraan_id=&pegawai_id=&tanggal=
POST   /peminjaman
GET    /peminjaman/:id
PATCH  /peminjaman/:id/setujui
PATCH  /peminjaman/:id/tolak
PATCH  /peminjaman/:id/selesai
PATCH  /peminjaman/:id/batalkan

GET    /kendaraan/:id/servis
POST   /kendaraan/:id/servis
PUT    /servis/:id
DELETE /servis/:id

GET    /dashboard/stats
GET    /dashboard/kendaraan-per-kondisi
GET    /dashboard/biaya-servis-bulanan

GET    /options/perangkat-daerah
GET    /options/pegawai

GET    /export/kendaraan.csv
GET    /export/pegawai.csv
GET    /export/peminjaman.csv
```

Setiap endpoint baru **wajib** ditambahkan ke `docs/api.md` pada commit yang sama.

---

## 7. Konvensi Kode

### Go
- `gofmt` + `goimports` wajib; jalankan `go vet ./...`.
- Nama package singular: `handler`, `service`, `repository`, `config`, `database`.
- Terima `context.Context` sebagai parameter pertama di repository/service.
- Error domain: `var ErrNotFound = errors.New(...)`; handler memetakan ke HTTP via `response.Error`.
- Jangan `panic` di handler; gunakan `gin.Recovery()` + error yang dikembalikan.
- DTO terpisah: `CreateXRequest`, `UpdateXRequest`, `XResponse`, `XListResponse`.
- Transaksi hanya di service: `pgxpool.Begin` → `defer tx.Rollback(ctx)` → `tx.Commit(ctx)`,
  atau helper `database.WithTx(ctx, pool, func(q *sqlc.Queries) error {...})`.
- SQL **hanya** di `db/queries/*.sql` dengan named parameter sqlc (`@nama`). Dilarang
  menyusun SQL dengan string concatenation.
- Kode di `internal/database/sqlc/` hasil generate — jangan diedit manual; regenerate
  dengan `sqlc generate` setelah query berubah.
- Setiap handler baru wajib diberi anotasi Swaggo (`@Summary`, `@Tags`, `@Success`, `@Failure`),
  lalu `swag init` dijalankan ulang.
- Jangan log password/token.

### TypeScript / React
- Strict mode aktif; dilarang `any` (pakai `unknown` + narrowing).
- Komponen fungsi + hooks; tidak ada class component.
- Server state **hanya** lewat TanStack Query; tidak menyimpan hasil fetch di `useState` global.
- Semua fetch lewat `lib/api.ts`; URL tidak ditulis langsung di komponen.
- Form: react-hook-form + schema zod; pesan error berbahasa Indonesia.
- Query key terpusat di `features/<fitur>/queries.ts` (mis. `['kendaraan', filter]`).
- Setelah mutasi: `invalidateQueries` pada key terkait.
- Tailwind: utility langsung, tanpa CSS module; varian warna konsisten (lihat §8).
- Aksesibilitas: setiap input punya `<label>`, tombol ikon punya `aria-label`.
- Komponen tabel & form dibuat reusable, bukan copy-paste 3x.

### Penamaan
- Kode: Inggris untuk konstruksi (`createKendaraan`, `handleList`), domain Indonesia
  (`kendaraan`, `pegawai`, `perangkatDaerah`).
- UI: 100% bahasa Indonesia.
- Git: Conventional Commits (`feat(kendaraan): tambah filter status`).

---

## 8. Desain UI

- Layout: sidebar kiri (navigasi), topbar (judul halaman + user menu), konten `max-w-7xl`.
- Warna: primer `#1D4ED8` (blue-700), netral slate, semantik: hijau `tersedia`, kuning
  `digunakan`, oranye `perbaikan`, merah `dihapuskan`/error.
- Setiap halaman list: judul, tombol aksi utama, search, filter, tabel, pagination,
  empty state, skeleton loading, dan konfirmasi hapus (modal).
- Form create/edit memakai halaman terpisah (`/kendaraan/baru`, `/kendaraan/:id/edit`),
  bukan modal, agar mudah di-demo dan di-refresh.
- Responsif minimal sampai lebar 768px (tabel boleh scroll horizontal).
- Bahasa angka/tanggal: `id-ID` (`Intl.NumberFormat`, `Intl.DateTimeFormat`).

---

## 9. Environment & Perintah

### `.env` backend (`apps/backend/.env`)
```
APP_PORT=8080
APP_ENV=development
CORS_ORIGINS=http://localhost:5173

POSTGRES_USER=kdo
POSTGRES_PASSWORD=kdo
POSTGRES_DB=kdo
POSTGRES_PORT=5435
DATABASE_URL=postgres://kdo:kdo@localhost:5435/kdo?sslmode=disable

JWT_SECRET=ganti-di-produksi-minimal-32-karakter
JWT_EXPIRED_HOURS=12
SEED_ON_START=true
```

> Satu file `.env` dipakai backend **dan** docker compose (compose membaca `.env` di
> folder yang sama dengan `docker-compose.yml`).

### `.env` frontend (`apps/web/.env`)
```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### Perintah frontend (dari root repo)
```bash
pnpm install              # install dependency workspace
pnpm dev                  # jalankan frontend lewat turbo
pnpm dev:web              # filter @kdo/web
pnpm build                # build frontend
pnpm test                 # test frontend (Vitest)

pnpm lint                 # biome lint .
pnpm check                # biome check . (lint + format + import)
pnpm check:fix            # biome check --write .
pnpm format               # biome format --write .
```

### Perintah backend (dari `apps/backend`)
```bash
make help                 # daftar perintah
make setup                # nyalakan DB + migrasi + seed
make run                  # jalankan API (migrasi otomatis)
make build                # binary ke bin/api
make test                 # go test ./...
make check                # cek gofmt + go vet

make db-up                # nyalakan PostgreSQL
make db-down              # matikan container
make db-reset             # hapus volume database
make db-logs              # log PostgreSQL
make db-ps                # status container
make db-shell             # psql interaktif

make migrate-up           # migrasi naik
make migrate-down         # turun satu langkah
make migrate-reset        # rollback semua + migrasi ulang
make migrate-version      # cek versi & status dirty
make migrate-create NAME=tambah_kolom
make migrate-force VERSION=3

make seed                 # isi data contoh
make sqlc                 # regenerate query
make swag                 # regenerate Swagger
```

> Docker Compose dijalankan dari `apps/backend` (file ada di folder itu).
> CLI `migrate` eksternal **tidak diperlukan**; migrasi memakai `cmd/migrate`
> dengan file `embed.FS` yang sama dengan aplikasi.

> Biome **bukan** test runner. Test backend memakai `go test ./...`; test frontend memakai
> Vitest dan dieksekusi lewat task `test` di Turbo.

Akun seed:
| Role | Email | Password |
| --- | --- | --- |
| admin | `admin@kdo.go.id` | `admin123` |
| operator | `operator@kdo.go.id` | `operator123` |
| pimpinan | `pimpinan@kdo.go.id` | `pimpinan123` |

Seed juga mengisi minimal: 4 perangkat daerah, 12 pegawai, 10 kendaraan, 6 peminjaman
(berbagai status), 8 riwayat servis — supaya dashboard langsung terlihat berisi.

---

## 10. Alur Kerja Agent

1. **Sebelum menulis kode**: baca `Agents.md`, cek kondisi repo, konfirmasi file terkait.
2. **Implementasi bertahap** (satu fase = satu commit):
   - Fase 1: scaffolding, config, koneksi pgx, migrasi awal, setup sqlc, health check.
   - Fase 2: auth + middleware + seed pengguna.
   - Fase 3: CRUD perangkat daerah → pegawai → kendaraan (backend).
   - Fase 4: peminjaman + servis + dashboard + export (backend).
   - Fase 5: frontend shell (routing, auth, layout, komponen UI).
   - Fase 6: halaman CRUD 3 entitas.
   - Fase 7: peminjaman, servis, dashboard, export.
   - Fase 8: polish (loading/empty/error state, validasi, README, demo script).
3. **Setelah setiap perubahan**:
   - Backend (dari `apps/backend`): `go build ./...`, `go vet ./...`, `go test ./...`.
   - Frontend: `pnpm --filter @kdo/web exec tsc --noEmit` dan `pnpm build`.
   - Lint/format: `pnpm check` (Biome) — wajib bersih sebelum commit.
   - Perbaiki error sebelum lanjut. Jangan menyerahkan kode yang tidak bisa di-build.
4. **Jangan** menambah dependency baru tanpa alasan jelas dan tanpa menyebutkannya.
5. **Jangan** commit `.env`, `node_modules`, binary, atau data lokal.
6. Jika menemukan bug di luar scope: catat di `docs/notes.md`, jangan refactor diam-diam.

---

## 11. Definisi Selesai (Definition of Done)

- [ ] `cd apps/backend && make db-up` lalu backend jalan tanpa error di mesin bersih.
- [ ] Migrasi golang-migrate membuat semua tabel + relasi + index unik (up & down jalan).
- [ ] `sqlc generate` menghasilkan kode tanpa error dan tidak ada query di luar `db/queries`.
- [ ] Seed menghasilkan data contoh yang konsisten dan idempoten.
- [ ] Login 3 role berfungsi; token kedaluwarsa ditangani (redirect ke login).
- [ ] CRUD penuh 3 entitas + validasi server & client.
- [ ] Peminjaman: ajukan → setujui/tolak → selesai, status kendaraan ikut berubah.
- [ ] Servis: tambah/edit/hapus, total biaya muncul di dashboard.
- [ ] Dashboard menampilkan angka nyata dari DB, bukan hardcode.
- [ ] Search, filter, sort, pagination bekerja di semua list.
- [ ] Export CSV terbuka benar di Excel (delimiter koma, UTF-8 BOM).
- [ ] `cd apps/backend && make build && make check` bersih, `pnpm build`, `pnpm check` bersih.
- [ ] README berisi langkah run < 5 menit + akun demo + screenshot.
- [ ] Tidak ada secret/`.env` ter-commit.

---

## 12. Di Luar Scope (jangan dikerjakan)

- Mobile app / PWA offline.
- Realtime websocket, notifikasi email/WA.
- Upload file fisik ke cloud storage (cukup `foto_url` string).
- Multi-tenant, SSO pemerintah, integrasi e-Office.
- Payment gateway, GPS tracking, IoT.

Jika waktu ujian masih ada dan semua DoD terpenuhi, tambahan yang aman:
audit log aktivitas, import CSV, cetak surat izin peminjaman (print view), dark mode.

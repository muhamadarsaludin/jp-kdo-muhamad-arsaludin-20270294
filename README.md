# KDO — Aplikasi Kendaraan Dinas Operasional

Aplikasi web fullstack untuk mengelola **Kendaraan Dinas Operasional (KDO)** di lingkungan
pemerintah daerah: data kendaraan, data pegawai (PNS), data perangkat daerah, peminjaman
kendaraan, dan riwayat perawatan.

Dibangun sebagai tugas **Ujian Praktik Junior Programmer — BPAD**.

![Go](https://img.shields.io/badge/Go-1.23-00ADD8?logo=go&logoColor=white)
![Gin](https://img.shields.io/badge/Gin-1.10-008ECF)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

---

## Daftar Isi

- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Arsitektur](#arsitektur)
- [Struktur Repo](#struktur-repo)
- [Skema Data](#skema-data)
- [Prasyarat](#prasyarat)
- [Instalasi & Menjalankan](#instalasi--menjalankan)
- [Akun Demo](#akun-demo)
- [Environment Variable](#environment-variable)
- [Ringkasan API](#ringkasan-api)
- [Alur Peminjaman Kendaraan](#alur-peminjaman-kendaraan)
- [Penggunaan AI](#penggunaan-ai)
- [Troubleshooting](#troubleshooting)
- [Lisensi](#lisensi)

---

## Dokumentasi

| Dokumen | Isi |
| --- | --- |
| [`docs/product-overview.md`](docs/product-overview.md) | Latar belakang, tujuan, pengguna, ruang lingkup |
| [`docs/prd.md`](docs/prd.md) | Kebutuhan fungsional, aturan bisnis, acceptance criteria |
| [`docs/erd.md`](docs/erd.md) | Skema tabel, relasi, index, rencana migrasi |
| [`Agents.md`](Agents.md) | Konvensi teknis & alur kerja pengembangan |

---

## Fitur

### Entitas utama (CRUD penuh)

| Entitas | Data yang dikelola |
| --- | --- |
| **Kendaraan Dinas** | Nomor polisi, nomor rangka/mesin, merek, tipe, tahun produksi, warna, jenis, bahan bakar, odometer, kondisi, status, pajak/STNK, penanggung jawab |
| **Pegawai (PNS)** | NIP, nama + gelar, jabatan, golongan/pangkat, perangkat daerah, kontak, status kepegawaian |
| **Perangkat Daerah** | Kode, nama instansi, singkatan, alamat, telepon, email, nama kepala |

### Fitur pendukung

- **Autentikasi JWT** dengan tiga role: `admin`, `operator`, `pimpinan` (read-only).
- **Peminjaman kendaraan** dengan alur pengajuan → persetujuan/penolakan → selesai.
- **Riwayat servis** per kendaraan beserta biaya perawatan.
- **Dashboard statistik**: total kendaraan, sebaran kondisi, kendaraan tersedia, biaya servis bulanan.
- **Pencarian, filter, sorting, dan pagination** di semua tabel.
- **Export CSV** untuk data kendaraan, pegawai, dan peminjaman.
- **Soft delete** dan pencatatan waktu (`created_at`, `updated_at`, `deleted_at`).
- **Validasi dua lapis**: client (zod) dan server (service layer).
- **Responsif** hingga lebar tablet, UI berbahasa Indonesia, format angka & tanggal `id-ID`.

### Aturan bisnis utama

- NIP wajib **18 digit angka** dan unik.
- Nomor polisi dinormalisasi otomatis (uppercase, spasi tunggal) dan unik.
- Tahun produksi tidak boleh melebihi tahun berjalan + 1.
- Kendaraan berstatus selain `tersedia` tidak dapat dipinjam.
- Peminjaman dengan jadwal beririsan otomatis ditolak.
- Menyetujui peminjaman mengubah status kendaraan menjadi `digunakan`; menyelesaikan
  atau membatalkan mengembalikannya ke `tersedia`.
- Perangkat daerah / kendaraan yang masih memiliki relasi aktif tidak dapat dihapus.

---

## Tech Stack

### Backend
| Komponen | Teknologi |
| --- | --- |
| Bahasa | Go 1.23 |
| HTTP framework | Gin |
| Driver database | pgx v5 (`pgxpool`) |
| Query layer | sqlc (SQL manual, kode di-generate) |
| Migrasi | golang-migrate (file SQL + `embed`) |
| Database | PostgreSQL 16 |
| Autentikasi | JWT (`golang-jwt/jwt/v5`) + bcrypt |
| Dokumentasi API | Swaggo (Swagger UI) |
| Testing | `testing`, `httptest`, `testify` |

### Frontend
| Komponen | Teknologi |
| --- | --- |
| Build tool | Vite |
| Library | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Data fetching | TanStack Query v5 |
| Form & validasi | react-hook-form + zod |
| HTTP client | Axios |
| Grafik | Recharts |
| Ikon & notifikasi | lucide-react, sonner |

### Infrastruktur
- **Monorepo** dengan **pnpm workspaces + Turborepo** (`apps/backend`, `apps/web`).
- **Docker Compose** untuk PostgreSQL di `apps/backend/docker-compose.yml` (port host 5435).
- **Biome** sebagai linter + formatter (menggantikan ESLint & Prettier).
- Vitest untuk unit test frontend, `go test` untuk backend.
- **Tanpa Redis**: JWT stateless, tidak ada session store terpusat.

---

## Arsitektur

```
┌──────────────────────┐        HTTP/JSON        ┌──────────────────────┐
│   React SPA (Vite)   │ ──────────────────────► │   REST API (Gin)     │
│  React Router + TS   │ ◄────────────────────── │  JWT Auth Middleware │
│  TanStack Query      │                         └──────────┬───────────┘
└──────────────────────┘                                    │
                                                            ▼
                                                 ┌──────────────────────┐
                                                 │  Service (bisnis)    │
                                                 │  Repository (sqlc)   │
                                                 └──────────┬───────────┘
                                                            │
                                                            ▼
                                                 ┌──────────────────────┐
                                                 │   PostgreSQL 16      │
                                                 │   (Docker volume)    │
                                                 └──────────────────────┘
```

Pola backend: **Handler → Service → Repository**. Handler hanya menangani HTTP,
service memegang aturan bisnis dan transaksi, repository khusus akses database.
Frontend memisahkan kode per fitur (`features/*`) dengan komponen UI reusable.

---

## Struktur Repo

```
.
├── Agents.md                 # kontrak kerja & konvensi proyek
├── README.md
├── package.json              # script root (turbo)
├── pnpm-workspace.yaml
├── turbo.json
├── biome.json                # lint + format
├── docs/
│   ├── api.md                # dokumentasi endpoint
│   └── erd.md                # diagram relasi
├── apps/
│   ├── backend/              # Go + Gin + pgx + sqlc (@kdo/backend)
│   │   ├── docker-compose.yml # PostgreSQL 16 (port host 5435)
│   │   ├── .env.example
│   │   ├── cmd/api/main.go
│   │   ├── sqlc.yaml
│   │   ├── db/
│   │   │   ├── migrations/   # golang-migrate (.up/.down.sql)
│   │   │   └── queries/      # sumber query sqlc
│   │   ├── docs/             # Swagger hasil generate
│   │   ├── internal/
│   │   │   ├── config/ database/ dto/
│   │   │   ├── repository/ service/ handler/
│   │   │   ├── middleware/ router/ response/
│   │   │   └── seed/ utils/
│   │   └── package.json      # wrapper script turbo → go
│   └── web/                  # React + Vite + TS + Tailwind (@kdo/web)
│       └── src/
│           ├── components/ui/ components/layout/
│           ├── features/ (auth, kendaraan, pegawai, perangkat-daerah,
│           │              peminjaman, servis, dashboard)
│           ├── lib/ hooks/ routes/ types/
│           └── ...
└── packages/                 # paket bersama (opsional)
```

---

## Skema Data

```mermaid
erDiagram
    PERANGKAT_DAERAH ||--o{ PEGAWAI : "memiliki"
    PERANGKAT_DAERAH ||--o{ KENDARAAN : "memiliki"
    PERANGKAT_DAERAH ||--o{ PEMINJAMAN : "mengajukan"

    PEGAWAI ||--o{ KENDARAAN : "penanggung jawab"
    PEGAWAI ||--o{ PEMINJAMAN : "meminjam"

    KENDARAAN ||--o{ PEMINJAMAN : "dipinjam"
    KENDARAAN ||--o{ SERVIS : "riwayat servis"

    PENGGUNA ||--o{ PEMINJAMAN : "menyetujui"
```

| Tabel | Fungsi |
| --- | --- |
| `perangkat_daerah` | Data instansi/OPD |
| `pegawai` | Data PNS beserta golongan dan jabatan |
| `kendaraan` | Data kendaraan dinas operasional |
| `peminjaman` | Transaksi peminjaman + status persetujuan |
| `servis` | Riwayat perawatan dan biaya |
| `pengguna` | Akun login aplikasi (admin/operator/pimpinan) |

Semua tabel menggunakan soft delete (`deleted_at`) dan kolom waktu otomatis.

---

## Prasyarat

| Kebutuhan | Versi |
| --- | --- |
| Go | ≥ 1.23 |
| Node.js | ≥ 20 |
| pnpm | ≥ 9 |
| Docker Desktop | terbaru (untuk PostgreSQL) |
| sqlc + golang-migrate CLI | opsional, hanya untuk regenerasi |

---

## Instalasi & Menjalankan

### 1. Clone repository

```bash
git clone <url-repo> jp-kdo
cd jp-kdo
```

### 2. Install dependency & siapkan environment

```bash
pnpm install
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env
```

Sesuaikan `apps/backend/.env` bila perlu (default sudah cocok dengan `apps/backend/docker-compose.yml`).

### 3. Jalankan database

```bash
pnpm db:up
# atau: docker compose -f apps/backend/docker-compose.yml up -d db
```

Tunggu hingga PostgreSQL siap (`pnpm db:ps` → status `healthy`).
Database berjalan di `localhost:5435` (bukan 5432, agar tidak bentrok dengan PostgreSQL lain).

### 4. Jalankan backend

```bash
pnpm dev:backend
# atau: cd apps/backend && go run ./cmd/api
```

Saat pertama kali dijalankan, backend otomatis:
1. menjalankan migrasi database (golang-migrate dari file yang di-`embed`),
2. mengisi data contoh bila `SEED_ON_START=true`.

API tersedia di `http://localhost:8090`, health check di `GET /health`,
dokumentasi Swagger di `http://localhost:8090/swagger/index.html`.

### 5. Jalankan frontend

```bash
pnpm dev:web
# atau: cd apps/web && pnpm dev
```

Buka `http://localhost:5173`.

Atau jalankan keduanya sekaligus dengan `pnpm dev`.

### 6. Build, lint & test

```bash
pnpm build      # build backend + frontend lewat turbo
pnpm test       # go test + vitest
pnpm check      # biome: lint + format + import
pnpm check:fix  # perbaiki otomatis
```

### Perintah Penting

| Perintah | Fungsi |
| --- | --- |
| `pnpm dev` | Jalankan backend + web sekaligus |
| `pnpm dev:backend` | Jalankan API (hot reload manual) |
| `pnpm dev:web` | Jalankan dev server frontend |
| `pnpm build` | Build semua app |
| `pnpm test` | Test backend & frontend |
| `pnpm lint` | Biome lint |
| `pnpm check` | Biome check (lint + format + import) |
| `pnpm format` | Format kode |
| `pnpm db:up` | Nyalakan PostgreSQL |
| `pnpm db:down` | Matikan container |
| `pnpm db:reset` | Hapus volume database (reset total) |
| `pnpm db:logs` | Lihat log PostgreSQL |
| `pnpm db:ps` | Cek status container |
| `sqlc generate` | Regenerate kode dari query (di `apps/backend`) |
| `swag init -g cmd/api/main.go -o docs` | Regenerate Swagger |

---

## Akun Demo

| Role | Email | Password | Hak akses |
| --- | --- | --- | --- |
| Admin | `admin@kdo.go.id` | `admin123` | Semua fitur + manajemen pengguna |
| Operator | `operator@kdo.go.id` | `operator123` | CRUD data & peminjaman |
| Pimpinan | `pimpinan@kdo.go.id` | `pimpinan123` | Lihat & setujui peminjaman |

> Akun di atas hanya untuk keperluan demo. Ganti kredensial dan `JWT_SECRET` sebelum
> dipakai di lingkungan nyata.

Data seed mencakup 4 perangkat daerah, 12 pegawai, 10 kendaraan, 6 peminjaman
(berbagai status), dan 8 riwayat servis agar dashboard langsung terisi.

---

## Environment Variable

### `apps/backend/.env`

| Variabel | Default | Keterangan |
| --- | --- | --- |
| `APP_PORT` | `8090` | Port API |
| `APP_ENV` | `development` | Mode aplikasi |
| `POSTGRES_USER` | `kdo` | User database (dipakai compose) |
| `POSTGRES_PASSWORD` | `kdo` | Password database (dipakai compose) |
| `POSTGRES_DB` | `kdo` | Nama database |
| `POSTGRES_PORT` | `5435` | Port host PostgreSQL |
| `DATABASE_URL` | `postgres://kdo:kdo@localhost:5435/kdo?sslmode=disable` | Koneksi PostgreSQL |
| `JWT_SECRET` | — | Wajib, minimal 32 karakter |
| `JWT_EXPIRED_HOURS` | `12` | Masa berlaku token |
| `CORS_ORIGINS` | `http://localhost:5173` | Origin frontend yang diizinkan |
| `SEED_ON_START` | `true` | Isi data contoh saat start |

### `apps/web/.env`

| Variabel | Default | Keterangan |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:8090/api/v1` | Base URL API |

---

## Ringkasan API

Base URL: `/api/v1` — detail lengkap di [`docs/api.md`](docs/api.md).

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| POST | `/auth/login` | Login, mengembalikan JWT |
| GET | `/auth/me` | Profil pengguna aktif |
| GET/POST | `/perangkat-daerah` | List & tambah perangkat daerah |
| GET/PUT/DELETE | `/perangkat-daerah/:id` | Detail, ubah, hapus |
| GET/POST | `/pegawai` | List & tambah pegawai |
| GET/PUT/DELETE | `/pegawai/:id` | Detail, ubah, hapus |
| GET/POST | `/kendaraan` | List & tambah kendaraan |
| GET/PUT/DELETE | `/kendaraan/:id` | Detail, ubah, hapus |
| GET/POST | `/peminjaman` | List & ajukan peminjaman |
| PATCH | `/peminjaman/:id/setujui` | Setujui peminjaman |
| PATCH | `/peminjaman/:id/tolak` | Tolak peminjaman |
| PATCH | `/peminjaman/:id/selesai` | Selesaikan peminjaman |
| PATCH | `/peminjaman/:id/batalkan` | Batalkan peminjaman |
| GET/POST | `/kendaraan/:id/servis` | Riwayat & tambah servis |
| PUT/DELETE | `/servis/:id` | Ubah & hapus servis |
| GET | `/dashboard/stats` | Statistik ringkas |
| GET | `/export/{kendaraan,pegawai,peminjaman}.csv` | Export CSV |

Format response:

```json
{ "data": { }, "meta": { "page": 1, "limit": 10, "total": 42, "total_pages": 5 } }
```

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Data tidak valid", "details": { } } }
```

Query parameter standar untuk endpoint list: `page`, `limit`, `search`, `sort`, `order`,
ditambah filter spesifik (mis. `kondisi`, `status`, `perangkat_daerah_id`).

---

## Alur Peminjaman Kendaraan

```
[Operator]            [Pimpinan/Admin]              [Sistem]
    │                        │                         │
    │  ajukan peminjaman     │                         │
    ├────────────────────────┼────────────────────────►│ status: diajukan
    │                        │                         │ kendaraan tetap tersedia
    │                        │  setujui                │
    │                        ├────────────────────────►│ status: disetujui
    │                        │                         │ kendaraan: digunakan
    │                        │                         │
    │  selesaikan (kembali)  │                         │
    ├────────────────────────┼────────────────────────►│ status: selesai
    │                        │                         │ kendaraan: tersedia
```

Penolakan dan pembatalan tetap tercatat sebagai riwayat, tidak menghapus data.

---

## Penggunaan AI

Aplikasi ini dibangun menggunakan **Visual Studio Code (VS Code)** sebagai editor kode,
dengan bantuan **AI coding agent OpenCode** yang berjalan di dalam terminal VS Code.

### Model yang digunakan

| Item | Detail |
| --- | --- |
| Model | **DeepSeek V4.1 Flash** |
| Provider / Model ID | `opencode-go` / `deepseek-v4.1-flash` |
| Mode | **Build / Code Mode** (menulis file, menjalankan terminal, build & test) |
| Editor | Visual Studio Code |
| Periode pengerjaan | November 2026 |

### Bagaimana AI digunakan

| Tahap | Peran AI | Peran manusia |
| --- | --- | --- |
| Perencanaan | Menyusun `Agents.md`: stack, struktur folder, skema data, kontrak API, aturan bisnis | Menentukan kebutuhan & memilih stack |
| Desain data | Merancang tabel, relasi, enum, dan validasi | Menyetujui dan menyesuaikan istilah dinas |
| Backend | Menulis handler, service, repository, migrasi, seed, dan test | Menjalankan, menguji manual, meninjau logika |
| Frontend | Menulis komponen, halaman, form, dan integrasi API | Mengecek tampilan & alur di browser |
| Dokumentasi | Menyusun README dan dokumentasi API | Memverifikasi kesesuaian dengan aplikasi |

### Prinsip penggunaan

1. **AI sebagai alat bantu, bukan pengganti pemahaman.** Setiap potongan kode dibaca dan
   diuji sebelum dianggap selesai.
2. **Verifikasi wajib.** Kode dianggap benar hanya setelah `go build`, `go vet`, `pnpm build`,
   dan pengujian manual di browser berhasil.
3. **Tidak ada data sensitif** (kredensial asli, data pribadi, dokumen internal) yang
   dimasukkan ke prompt AI.
4. **Keputusan arsitektur tetap di tangan pengembang**; saran AI yang tidak sesuai kebutuhan
   dinas tidak dipakai.
5. Seluruh konvensi dan batasan pengerjaan dicatat di [`Agents.md`](Agents.md) agar hasilnya
   konsisten dan dapat ditinjau.

> Kredensial pada aplikasi ini adalah data demo, bukan kredensial produksi.

---

## Troubleshooting

| Masalah | Solusi |
| --- | --- |
| `connection refused` ke PostgreSQL | Pastikan `pnpm db:up` berjalan dan container `healthy`; cek port 5435 tidak dipakai instans lain |
| `password authentication failed` | Hapus volume lama: `pnpm db:reset`, lalu jalankan ulang backend |
| Frontend gagal fetch (CORS) | Samakan `CORS_ORIGINS` di backend dengan URL dev frontend |
| Token selalu invalid | Pastikan `JWT_SECRET` konsisten dan tidak berubah saat backend restart |
| Data seed tidak muncul | Set `SEED_ON_START=true` atau jalankan `SEED_ON_START=true go run ./cmd/api` |
| Port 8090/5173/5435 dipakai | Ubah `APP_PORT`, `POSTGRES_PORT`, atau jalankan `pnpm dev:web -- --port 5174` |

---

## Lisensi

Proyek ini dibuat untuk keperluan **ujian praktik** dan pembelajaran.
Bebas digunakan kembali dengan menyebutkan sumber.

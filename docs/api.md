# Dokumentasi API — KDO

Base URL: `http://localhost:8080`
Swagger UI: `http://localhost:8080/swagger/index.html`

Semua response memakai JSON.

## Format Response

Sukses:

```json
{ "data": { }, "meta": { "page": 1, "limit": 10, "total": 42, "total_pages": 5 } }
```

`meta` hanya muncul pada endpoint list.

Gagal:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data tidak valid",
    "details": { "email": "Format email tidak valid" }
  }
}
```

Kode error: `VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`,
`INTERNAL_ERROR`.

## Autentikasi

Endpoint yang dilindungi membutuhkan header:

```
Authorization: Bearer <token>
```

Token diperoleh dari `POST /api/v1/auth/login` dan berlaku 12 jam.

---

## Endpoint

### `GET /health`

Status aplikasi dan koneksi database.

| Status | Arti |
| --- | --- |
| 200 | Aplikasi dan database sehat |
| 503 | Database tidak dapat dijangkau |

```json
{ "status": "ok", "database": "up", "time": "2026-11-10T12:00:00+07:00", "version": "1.0.0" }
```

### `POST /api/v1/auth/login`

**Body**

```json
{ "email": "admin@kdo.go.id", "password": "admin123" }
```

**Sukses 200**

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_at": "2026-11-10T22:00:00+07:00",
    "user": { "id": 1, "nama": "Administrator", "email": "admin@kdo.go.id", "role": "admin" }
  }
}
```

**Gagal**

| Status | Kondisi |
| --- | --- |
| 400 | Body tidak valid / email tidak sesuai format |
| 401 | Email atau password salah |
| 403 | Akun nonaktif |

### `GET /api/v1/auth/me`

Memerlukan header `Authorization`.

**Sukses 200**

```json
{ "data": { "id": 1, "nama": "Administrator", "email": "admin@kdo.go.id", "role": "admin" } }
```

| Status | Kondisi |
| --- | --- |
| 401 | Token tidak ada / tidak valid / kedaluwarsa |
| 404 | Pengguna sudah tidak ada |

---

## Perangkat Daerah

Semua endpoint memerlukan `Authorization: Bearer <token>`.
Endpoint tulis hanya untuk role `admin` dan `operator`.

### `GET /api/v1/perangkat-daerah`

Query: `page`, `limit` (max 100), `search`, `is_active`, `sort` (`nama|kode|created_at`),
`order` (`asc|desc`).

```json
{
  "data": [
    {
      "id": 3,
      "kode": "BPAD",
      "nama": "Badan Pengelolaan Keuangan dan Aset Daerah",
      "singkatan": "BPAD",
      "alamat": "Jl. Keuangan No. 7",
      "telepon": "021-5550103",
      "email": "bpad@kdo.go.id",
      "nama_kepala": "Agus Setiawan, S.E., M.M",
      "is_active": true,
      "created_at": "2026-11-10T12:15:01+07:00",
      "updated_at": "2026-11-10T12:15:01+07:00"
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 4, "total_pages": 1 }
}
```

### `GET /api/v1/perangkat-daerah/{id}`

Sukses `200` dengan objek pada `data`. Tidak ditemukan → `404`.

### `POST /api/v1/perangkat-daerah`

```json
{
  "kode": "dishub",
  "nama": "Dinas Perhubungan",
  "singkatan": "Dishub",
  "alamat": "Jl. Transportasi No. 2",
  "telepon": "021-5550105",
  "email": "dishub@kdo.go.id",
  "nama_kepala": "Ir. Joko Susilo",
  "is_active": true
}
```

- `kode` otomatis diubah menjadi uppercase.
- `is_active` opsional, default `true`.
- Sukses `201`, `kode`/`nama` duplikat → `409`.
- `kode` wajib, `nama` wajib, `email` harus valid → `400`.

### `PUT /api/v1/perangkat-daerah/{id}`

Body sama dengan create. Bila `is_active` tidak dikirim, nilai lama dipertahankan.
Sukses `200`, tidak ditemukan `404`, duplikat `409`.

### `DELETE /api/v1/perangkat-daerah/{id}`

- Sukses `204` tanpa body.
- `404` bila tidak ada.
- `409` bila masih memiliki pegawai atau kendaraan aktif, contoh:

```json
{
  "error": {
    "code": "CONFLICT",
    "message": "data masih memiliki relasi: masih ada 3 pegawai dan 2 kendaraan"
  }
}
```

Penghapusan bersifat **soft delete**; data tidak hilang dari database.

---

## Pegawai

Semua endpoint memerlukan `Authorization: Bearer <token>`.
Endpoint tulis hanya untuk role `admin` dan `operator`.

### `GET /api/v1/pegawai`

Query: `page`, `limit` (max 100), `search` (nama/NIP), `perangkat_daerah_id`,
`golongan`, `status` (`aktif|nonaktif|pensiun`), `sort` (`nama|nip|created_at`),
`order` (`asc|desc`).

```json
{
  "data": [
    {
      "id": 2,
      "nip": "198203152009012002",
      "nama": "Siti Rahmawati",
      "gelar_depan": "S.Pd",
      "gelar_belakang": "",
      "jabatan": "Sekretaris Dinas",
      "golongan": "III/d",
      "pangkat": "Penata Tingkat I",
      "perangkat_daerah_id": 1,
      "perangkat_daerah_nama": "Dinas Pendidikan",
      "email": "siti@kdo.go.id",
      "telepon": "081200000002",
      "tanggal_lahir": "1982-03-15",
      "status_pegawai": "aktif",
      "created_at": "2026-11-10T12:00:00+07:00",
      "updated_at": "2026-11-10T12:00:00+07:00"
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 12, "total_pages": 2 }
}
```

### `GET /api/v1/pegawai/{id}`

Sukses `200`, tidak ditemukan `404`.

### `POST /api/v1/pegawai`

```json
{
  "nip": "199901012020011001",
  "nama": "Rizky Pratama",
  "gelar_depan": "S.Kom",
  "jabatan": "Pranata Komputer",
  "golongan": "III/a",
  "pangkat": "Penata Muda",
  "perangkat_daerah_id": 4,
  "email": "rizky@kdo.go.id",
  "telepon": "081200000013",
  "tanggal_lahir": "1999-01-01",
  "status_pegawai": "aktif"
}
```

Aturan:

- `nip` wajib **18 digit angka** dan unik → selain itu `400`, duplikat `409`.
- `golongan` harus salah satu `I/a`–`IV/e`.
- `status_pegawai` default `aktif`.
- `tanggal_lahir` format `YYYY-MM-DD` (opsional).
- `perangkat_daerah_id` harus ada → `400` bila tidak ditemukan.
- Sukses `201`.

### `PUT /api/v1/pegawai/{id}`

Body sama dengan create. Sukses `200`, tidak ditemukan `404`, duplikat NIP `409`.

### `DELETE /api/v1/pegawai/{id}`

- Sukses `204` tanpa body.
- `409` bila pegawai masih punya riwayat peminjaman.
- Saat dihapus, kendaraan yang menjadikannya penanggung jawab otomatis di-set `NULL`.
- Penghapusan bersifat soft delete.

---

## Akun Demo

| Role | Email | Password |
| --- | --- | --- |
| admin | `admin@kdo.go.id` | `admin123` |
| operator | `operator@kdo.go.id` | `operator123` |
| pimpinan | `pimpinan@kdo.go.id` | `pimpinan123` |

---

## Catatan Implementasi

- Password disimpan sebagai bcrypt hash; perbandingan memakai `bcrypt.CompareHashAndPassword`.
- JWT ditandatangani HS256 dengan issuer `kdo-api`.
- Email salah dan password salah menghasilkan pesan yang sama (mencegah enumerasi akun).
- Setiap endpoint baru wajib ditambahkan ke dokumen ini dan anotasi Swaggo-nya diperbarui.

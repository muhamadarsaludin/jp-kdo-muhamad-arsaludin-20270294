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

## Kendaraan

Semua endpoint memerlukan `Authorization: Bearer <token>`.
Endpoint tulis hanya untuk role `admin` dan `operator`.

### `GET /api/v1/kendaraan`

Query: `page`, `limit` (max 100), `search` (nopol/merek/tipe), `perangkat_daerah_id`,
`kondisi`, `status`, `jenis`, `tahun`, `sort` (`nomor_polisi|merek|tahun_produksi|created_at`),
`order` (`asc|desc`).

```json
{
  "data": [
    {
      "id": 1,
      "nomor_polisi": "B 1234 XYZ",
      "merek": "Toyota",
      "tipe": "Avanza",
      "tahun_produksi": 2019,
      "warna": "Silver",
      "jenis": "minibus",
      "bahan_bakar": "bensin",
      "kapasitas_cc": 1500,
      "odometer_km": 48210,
      "kondisi": "baik",
      "status": "tersedia",
      "tanggal_pajak": "2027-02-10",
      "tanggal_stnk": "2027-02-10",
      "perangkat_daerah_id": 1,
      "perangkat_daerah_nama": "Dinas Pendidikan",
      "penanggung_jawab_id": 2,
      "penanggung_jawab_nama": "Siti Rahmawati"
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 10, "total_pages": 1 }
}
```

### `GET /api/v1/kendaraan/{id}`

Sukses `200`, tidak ditemukan `404`.

### `POST /api/v1/kendaraan`

```json
{
  "nomor_polisi": "b 9999 kdo",
  "nomor_rangka": "MHKA1BA3JKA00099",
  "nomor_mesin": "1NR-F000099",
  "merek": "Toyota",
  "tipe": "Raize",
  "tahun_produksi": 2023,
  "warna": "Merah",
  "jenis": "mobil",
  "bahan_bakar": "bensin",
  "kapasitas_cc": 1000,
  "odometer_km": 1200,
  "kondisi": "baik",
  "status": "tersedia",
  "tanggal_pajak": "2027-05-01",
  "tanggal_stnk": "2027-05-01",
  "perangkat_daerah_id": 4,
  "penanggung_jawab_id": 1
}
```

Aturan:

- Nomor polisi dinormalisasi uppercase + spasi tunggal, format `AA 1234 BBB`.
- Nomor polisi, rangka, dan mesin unik → duplikat `409`.
- Tahun produksi 1980 s.d. tahun berjalan + 1.
- `status` default `tersedia`, `kondisi` default `baik`, `bahan_bakar` default `bensin`.
- `perangkat_daerah_id` wajib; `penanggung_jawab_id` opsional.
- Sukses `201`.

### `PUT /api/v1/kendaraan/{id}`

Body sama dengan create. Status **tidak dapat diubah** selama ada peminjaman aktif (`409`).

### `DELETE /api/v1/kendaraan/{id}`

- Sukses `204`.
- `409` bila masih ada peminjaman berstatus `diajukan`/`disetujui`.
- Soft delete.

---

## Peminjaman

Semua endpoint memerlukan `Authorization: Bearer <token>`.

| Method | Path | Akses |
| --- | --- | --- |
| GET | `/api/v1/peminjaman` | semua role |
| GET | `/api/v1/peminjaman/{id}` | semua role |
| POST | `/api/v1/peminjaman` | admin, operator |
| PATCH | `/api/v1/peminjaman/{id}/setujui` | admin, pimpinan |
| PATCH | `/api/v1/peminjaman/{id}/tolak` | admin, pimpinan |
| PATCH | `/api/v1/peminjaman/{id}/selesai` | admin, operator |
| PATCH | `/api/v1/peminjaman/{id}/batalkan` | admin, operator |

Query list: `page`, `limit`, `search` (kode/keperluan/tujuan), `status`, `kendaraan_id`,
`pegawai_id`, `dari`, `sampai` (YYYY-MM-DD atau ISO-8601), `sort`
(`tanggal_mulai|kode_peminjaman|created_at`), `order` (default `tanggal_mulai desc`).

### `POST /api/v1/peminjaman`

```json
{
  "kendaraan_id": 5,
  "pegawai_id": 3,
  "keperluan": "Rapat koordinasi",
  "tujuan": "Kantor Pusat",
  "tanggal_mulai": "2026-12-01T08:00",
  "tanggal_selesai": "2026-12-02T17:00",
  "catatan": "Membawa 3 orang"
}
```

Aturan:

- `tanggal_selesai` harus setelah `tanggal_mulai`.
- Kendaraan harus ada dan berstatus `tersedia` → selain itu `400`.
- Jadwal yang beririsan dengan peminjaman `diajukan`/`disetujui` ditolak `409`.
- Perangkat daerah diambil otomatis dari data pegawai.
- Kode dibuat otomatis: `PJM-YYYYMMDD-XXXX`.
- Sukses `201`.

### Transisi status

| Aksi | Status awal | Status akhir | Efek kendaraan |
| --- | --- | --- | --- |
| setujui | `diajukan` | `disetujui` | `digunakan` |
| tolak | `diajukan` | `ditolak` | tidak berubah |
| selesai | `disetujui` | `selesai` | `tersedia` |
| batalkan | `diajukan` | `dibatalkan` | tidak berubah |
| batalkan | `disetujui` | `dibatalkan` | `tersedia` |

Transisi lain menghasilkan `409` dengan pesan status saat ini.

Body `tolak` opsional:

```json
{ "catatan": "Kendaraan dipakai pimpinan" }
```

Semua aksi mengembalikan data peminjaman terbaru pada `data`.

---

## Servis

| Method | Path | Akses |
| --- | --- | --- |
| GET | `/api/v1/kendaraan/{id}/servis` | semua role |
| POST | `/api/v1/kendaraan/{id}/servis` | admin, operator |
| PUT | `/api/v1/servis/{id}` | admin, operator |
| DELETE | `/api/v1/servis/{id}` | admin, operator |

Query list: `page`, `limit`.

```json
{
  "tanggal": "2026-11-05",
  "jenis": "rutin",
  "deskripsi": "Servis rutin 50.000 km",
  "bengkel": "Auto2000",
  "biaya": 250000,
  "odometer_km": 50000
}
```

Aturan:

- `tanggal` format `YYYY-MM-DD`, `jenis` salah satu `rutin|perbaikan|ganti_part`.
- `deskripsi` wajib, `biaya` ≥ 0.
- Kendaraan harus ada → `404` bila tidak.
- Sukses create `201`, update `200`, delete `204` (soft delete).
- Data diurutkan dari tanggal terbaru.

---

## Dashboard

Semua endpoint memerlukan `Authorization: Bearer <token>`.

| Endpoint | Isi |
| --- | --- |
| `GET /api/v1/dashboard/stats` | total kendaraan, tersedia, digunakan, perbaikan, dihapuskan, pegawai, OPD, peminjaman diajukan/aktif, biaya servis |
| `GET /api/v1/dashboard/kendaraan-per-kondisi` | jumlah kendaraan per kondisi |
| `GET /api/v1/dashboard/kendaraan-per-opd` | jumlah kendaraan per perangkat daerah |
| `GET /api/v1/dashboard/biaya-servis-bulanan` | total biaya servis 6 bulan terakhir (bulan kosong = 0) |
| `GET /api/v1/dashboard/peminjaman-menunggu` | maksimal 5 pengajuan berstatus `diajukan` |

---

## Export CSV

| Endpoint | Isi |
| --- | --- |
| `GET /api/v1/export/kendaraan.csv` | data kendaraan |
| `GET /api/v1/export/pegawai.csv` | data pegawai |
| `GET /api/v1/export/peminjaman.csv` | data peminjaman |

- Mendukung filter yang sama dengan endpoint list (`search`, `status`, `kondisi`, dll.).
- Response `text/csv` dengan `Content-Disposition: attachment`.
- Memakai UTF-8 BOM agar terbuka benar di Excel.

---

## Pengguna (khusus admin)

| Method | Path | Keterangan |
| --- | --- | --- |
| GET | `/api/v1/pengguna` | Daftar akun + filter role/is_active |
| POST | `/api/v1/pengguna` | Tambah akun (password min. 8) |
| PUT | `/api/v1/pengguna/{id}` | Ubah akun; password opsional |
| DELETE | `/api/v1/pengguna/{id}` | Soft delete |

Aturan:

- Hanya role `admin`.
- Email unik → `409` bila duplikat.
- Admin tidak dapat menonaktifkan atau menghapus akunnya sendiri → `400`.
- Password disimpan sebagai bcrypt hash.

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

# PRD — Aplikasi KDO (Kendaraan Dinas Operasional)

**Versi:** 1.0
**Tanggal:** 10 November 2026
**Status:** Disetujui untuk implementasi
**Pemilik produk:** Bagian Umum / Pengelola Aset BPAD
**Terkait:** [`product-overview.md`](product-overview.md) · [`erd.md`](erd.md) · [`../Agents.md`](../Agents.md)

---

## 1. Tujuan Dokumen

Dokumen ini menjabarkan kebutuhan fungsional dan non-fungsional aplikasi KDO secara rinci,
sebagai acuan tunggal sebelum pembuatan skema database dan implementasi kode.

Setiap kebutuhan memiliki ID (`FR-*`, `BR-*`, `NFR-*`) agar dapat dilacak sampai ke
implementasi dan pengujian.

---

## 2. Ringkasan Produk

Aplikasi web internal untuk mendata kendaraan dinas operasional, pegawai PNS, perangkat
daerah, peminjaman kendaraan, dan riwayat servis. Pengguna mengakses lewat browser dengan
hak akses berbeda sesuai peran.

**Masalah yang diselesaikan:** data aset tersebar, peminjaman tidak terkontrol, riwayat
perawatan hilang, dan rekap manual lambat.

**Nilai yang diberikan:** satu sumber data, peminjaman terkendali, biaya perawatan terpantau,
dan laporan siap pakai.

---

## 3. Pengguna & Peran

| Peran | Deskripsi | Frekuensi pakai | Kebutuhan utama |
| --- | --- | --- | --- |
| Admin | Pengelola aplikasi & data master | Harian | Kontrol penuh, termasuk akun pengguna |
| Operator | Staf pengelola aset | Harian | Input cepat, validasi jelas, pencarian |
| Pimpinan | Kepala bagian/badan | Mingguan | Ringkasan aset, persetujuan peminjaman |

### Matriks izin

| Kemampuan | Admin | Operator | Pimpinan |
| --- | --- | --- | --- |
| Login & lihat dashboard | Ya | Ya | Ya |
| Lihat seluruh data | Ya | Ya | Ya |
| CRUD perangkat daerah | Ya | Ya | Tidak |
| CRUD pegawai | Ya | Ya | Tidak |
| CRUD kendaraan | Ya | Ya | Tidak |
| Ajukan peminjaman | Ya | Ya | Tidak |
| Setujui/tolak peminjaman | Ya | Tidak | Ya |
| Selesaikan/batalkan peminjaman | Ya | Ya | Tidak |
| CRUD servis | Ya | Ya | Tidak |
| Export CSV | Ya | Ya | Ya |
| Kelola akun pengguna | Ya | Tidak | Tidak |

---

## 4. Ruang Lingkup

### 4.1 Termasuk

- Autentikasi dan otorisasi berbasis peran.
- Master data: perangkat daerah, pegawai, kendaraan.
- Transaksi: peminjaman kendaraan, riwayat servis.
- Dashboard ringkasan.
- Pencarian, filter, sorting, pagination.
- Export CSV.
- Audit dasar (waktu dibuat/diubah, soft delete).

### 4.2 Tidak termasuk

- Aplikasi mobile native / PWA offline.
- GPS tracking, IoT, integrasi e-Office/SIMPEG.
- Notifikasi email/WhatsApp.
- Upload file dokumen ke object storage.
- Pembayaran atau integrasi akuntansi.
- Multi-tenant dan SSO pemerintah.

---

## 5. Alur Utama

### 5.1 Peminjaman kendaraan

```
Operator membuat pengajuan
   → sistem validasi kendaraan tersedia + tidak bentrok
   → status DIAJUKAN
   → Pimpinan/Admin meninjau
        ├─ tolak  → DITOLAK
        └─ setuju → DISETUJUI, kendaraan DIGUNAKAN
   → Operator menandai selesai → SELESAI, kendaraan TERSEDIA
   (dapat dibatalkan selama DIAJUKAN/DISETUJUI)
```

### 5.2 Perawatan

```
Operator mencatat servis (tanggal, jenis, biaya)
   → (opsional) ubah status kendaraan ke PERBAIKAN
   → setelah selesai, status kembali TERSEDIA
   → biaya masuk ringkasan dashboard
```

### 5.3 Pendataan aset

```
Admin membuat perangkat daerah
   → menambahkan pegawai
   → menambahkan kendaraan + penanggung jawab
   → aset siap dipinjamkan
```

---

## 6. Kebutuhan Fungsional

Prioritas memakai MoSCoW: **M** (Must), **S** (Should), **C** (Could).

### 6.1 Autentikasi & Sesi

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| FR-AUTH-01 | Pengguna login dengan email dan password | M |
| FR-AUTH-02 | Sistem menerbitkan JWT berumur 12 jam | M |
| FR-AUTH-03 | Pengguna dapat melihat profil sendiri (`/auth/me`) | M |
| FR-AUTH-04 | Menu & tombol disembunyikan sesuai peran | M |
| FR-AUTH-05 | Token kedaluwarsa mengarahkan pengguna ke halaman login | M |
| FR-AUTH-06 | Akun nonaktif tidak dapat login | S |
| FR-AUTH-07 | Logout menghapus token di sisi klien | M |

**Acceptance criteria**

- Password salah → HTTP 401, pesan "Email atau password salah".
- Email tidak terdaftar → pesan sama (tidak membocorkan akun mana yang ada).
- `GET /auth/me` tanpa token → 401.
- Token valid tetapi role tidak berhak → 403.
- Setelah 12 jam, request berikutnya → 401 dan frontend redirect ke `/login`.

### 6.2 Perangkat Daerah

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| FR-PD-01 | Melihat daftar dengan pagination | M |
| FR-PD-02 | Mencari berdasarkan kode/nama/singkatan | M |
| FR-PD-03 | Filter status aktif/nonaktif | S |
| FR-PD-04 | Menambah perangkat daerah | M |
| FR-PD-05 | Mengubah data | M |
| FR-PD-06 | Menghapus (soft delete) | M |
| FR-PD-07 | Menampilkan jumlah pegawai & kendaraan | S |

**Acceptance criteria**

- `kode` wajib, unik, otomatis uppercase.
- `nama` wajib dan unik.
- Email harus berformat valid bila diisi.
- Hapus ditolak (409) jika masih memiliki pegawai/kendaraan aktif.
- Setelah hapus, data hilang dari list tetapi tetap ada di database.

### 6.3 Pegawai

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| FR-PGW-01 | Daftar pegawai + pagination | M |
| FR-PGW-02 | Cari berdasarkan nama/NIP | M |
| FR-PGW-03 | Filter perangkat daerah, golongan, status | M |
| FR-PGW-04 | Tambah pegawai | M |
| FR-PGW-05 | Ubah data pegawai | M |
| FR-PGW-06 | Hapus pegawai (soft delete) | M |
| FR-PGW-07 | Melihat kendaraan yang menjadi tanggung jawabnya | C |

**Acceptance criteria**

- NIP wajib, tepat 18 digit angka, unik.
- Nama, jabatan, golongan, perangkat daerah wajib.
- Golongan hanya dari daftar `I/a`–`IV/e`.
- Perangkat daerah harus ada (validasi FK).
- Menghapus pegawai yang menjadi penanggung jawab kendaraan → kolom
  `penanggung_jawab_id` pada kendaraan menjadi `NULL`, bukan gagal.
- Menghapus pegawai yang punya riwayat peminjaman → ditolak (409).

### 6.4 Kendaraan

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| FR-KDR-01 | Daftar kendaraan + pagination | M |
| FR-KDR-02 | Cari berdasarkan nomor polisi, merek, tipe | M |
| FR-KDR-03 | Filter kondisi, status, jenis, perangkat daerah, tahun | M |
| FR-KDR-04 | Tambah kendaraan | M |
| FR-KDR-05 | Ubah kendaraan | M |
| FR-KDR-06 | Hapus kendaraan (soft delete) | M |
| FR-KDR-07 | Detail kendaraan: data, riwayat servis, riwayat peminjaman | S |
| FR-KDR-08 | Menampilkan indikator pajak/STNK mendekati jatuh tempo | C |

**Acceptance criteria**

- Nomor polisi wajib, unik, dinormalisasi (uppercase, spasi tunggal).
- Merek, tipe, warna, tahun produksi, jenis wajib.
- Tahun produksi antara 1980 dan tahun berjalan + 1.
- Odometer dan kapasitas mesin tidak boleh negatif.
- Status default `tersedia`, kondisi default `baik`.
- Nomor rangka/mesin unik bila diisi.
- Hapus ditolak (409) jika ada peminjaman aktif.
- Perubahan status manual tidak boleh menimpa status `digunakan` saat ada peminjaman aktif.

### 6.5 Peminjaman

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| FR-PJM-01 | Daftar peminjaman + filter status/tanggal/kendaraan | M |
| FR-PJM-02 | Ajukan peminjaman | M |
| FR-PJM-03 | Validasi bentrok jadwal | M |
| FR-PJM-04 | Setujui / tolak (Admin, Pimpinan) | M |
| FR-PJM-05 | Selesaikan peminjaman | M |
| FR-PJM-06 | Batalkan peminjaman | S |
| FR-PJM-07 | Kode peminjaman otomatis `PJM-YYYYMMDD-XXXX` | S |
| FR-PJM-08 | Riwayat status & pencatat persetujuan | S |

**Acceptance criteria**

- Keperluan, tujuan, waktu mulai, waktu selesai wajib.
- Waktu selesai harus lebih besar dari waktu mulai.
- Kendaraan harus berstatus `tersedia` saat pengajuan.
- Jadwal yang beririsan dengan peminjaman `diajukan`/`disetujui` ditolak (409).
- Hanya `diajukan` yang boleh disetujui/ditolak.
- Menyetujui → kendaraan `digunakan`; menolak → kendaraan tidak berubah.
- Menyelesaikan hanya dari status `disetujui` → kendaraan `tersedia`.
- Membatalkan dari `diajukan`/`disetujui` → kendaraan `tersedia`.
- Operator tidak dapat menyetujui pengajuannya sendiri.
- Peminjaman yang sudah `selesai`/`ditolak`/`dibatalkan` tidak dapat diubah lagi.

### 6.6 Servis

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| FR-SRV-01 | Melihat riwayat servis per kendaraan | M |
| FR-SRV-02 | Menambah catatan servis | M |
| FR-SRV-03 | Mengubah catatan servis | M |
| FR-SRV-04 | Menghapus catatan servis | S |
| FR-SRV-05 | Total biaya per kendaraan | S |

**Acceptance criteria**

- Tanggal, jenis, deskripsi wajib.
- Biaya ≥ 0 dan disimpan sebagai `numeric(14,2)`.
- Odometer servis tidak boleh lebih kecil dari odometer terakhir kendaraan (peringatan, bukan blokir).
- Penghapusan servis tidak mengubah status kendaraan.

### 6.7 Dashboard

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| FR-DSH-01 | Kartu total kendaraan, tersedia, digunakan, perbaikan | M |
| FR-DSH-02 | Grafik kendaraan per kondisi | S |
| FR-DSH-03 | Grafik biaya servis 6 bulan terakhir | S |
| FR-DSH-04 | Daftar peminjaman menunggu persetujuan | M |
| FR-DSH-05 | Daftar kendaraan per perangkat daerah | C |

**Acceptance criteria**

- Semua angka berasal dari database, bukan hardcode.
- Angka berubah setelah data ditambah/diubah (invalidate cache query).
- Pimpinan melihat tombol setujui/tolak pada daftar menunggu persetujuan.

### 6.8 Export & Pencarian

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| FR-EXP-01 | Export CSV kendaraan sesuai filter aktif | S |
| FR-EXP-02 | Export CSV pegawai | S |
| FR-EXP-03 | Export CSV peminjaman | S |
| FR-EXP-04 | File terbuka benar di Excel (UTF-8 BOM) | S |
| FR-SRC-01 | Pencarian debounce 300 ms di semua list | S |
| FR-SRC-02 | Sorting kolom pada tabel | C |

### 6.9 Manajemen Pengguna

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| FR-USR-01 | Admin melihat daftar akun | S |
| FR-USR-02 | Admin menambah akun + memilih role | S |
| FR-USR-03 | Admin menonaktifkan akun | S |
| FR-USR-04 | Admin mereset password | C |

**Acceptance criteria**

- Email unik dan valid.
- Password minimal 8 karakter, disimpan sebagai bcrypt hash.
- Admin tidak dapat menonaktifkan akunnya sendiri.
- Role hanya `admin`, `operator`, `pimpinan`.

---

## 7. Aturan Bisnis

| ID | Aturan |
| --- | --- |
| BR-01 | NIP tepat 18 digit angka dan unik di antara data aktif. |
| BR-02 | Nomor polisi unik dan dinormalisasi uppercase dengan spasi tunggal. |
| BR-03 | Tahun produksi 1980 s.d. tahun berjalan + 1. |
| BR-04 | Kendaraan hanya dapat dipinjam saat status `tersedia`. |
| BR-05 | Peminjaman dengan rentang waktu beririsan untuk kendaraan yang sama ditolak. |
| BR-06 | Persetujuan mengubah kendaraan menjadi `digunakan`. |
| BR-07 | Penyelesaian/pembatalan mengembalikan kendaraan ke `tersedia`. |
| BR-08 | Kendaraan dengan peminjaman aktif tidak dapat dihapus. |
| BR-09 | Perangkat daerah dengan pegawai/kendaraan aktif tidak dapat dihapus. |
| BR-10 | Pegawai dengan riwayat peminjaman tidak dapat dihapus. |
| BR-11 | Semua penghapusan bersifat soft delete. |
| BR-12 | Operator tidak menyetujui pengajuan miliknya sendiri. |
| BR-13 | Status peminjaman hanya berubah lewat transisi yang sah. |
| BR-14 | Satu peminjaman hanya untuk satu kendaraan. |

---

## 8. Kebutuhan Data

| Entitas | Jumlah field inti | Volume awal | Volume 1 tahun |
| --- | --- | --- | --- |
| Perangkat daerah | 9 | 4 | ± 30 |
| Pegawai | 12 | 12 | ± 500 |
| Kendaraan | 20 | 10 | ± 150 |
| Peminjaman | 11 | 6 | ± 1.200 |
| Servis | 8 | 8 | ± 600 |
| Pengguna | 6 | 3 | ± 10 |

Ketentuan umum:

- Primary key `bigserial`.
- Waktu memakai `timestamptz`.
- Uang memakai `numeric(14,2)`.
- Soft delete lewat `deleted_at`.
- Detail kolom dan relasi ada di [`erd.md`](erd.md).

---

## 9. Kebutuhan Non-Fungsional

| ID | Aspek | Kebutuhan |
| --- | --- | --- |
| NFR-01 | Performa | List 1.000 baris merespons < 1 detik (dengan pagination) |
| NFR-02 | Keamanan | Password bcrypt cost ≥ 10; JWT HS256; secret ≥ 32 karakter |
| NFR-03 | Otorisasi | Setiap endpoint diperiksa di server, bukan hanya UI |
| NFR-04 | Validasi | Validasi ganda: klien (zod) dan server (service layer) |
| NFR-05 | Keandalan | Operasi multi-tabel memakai transaksi database |
| NFR-06 | Audit | `created_at` & `updated_at` otomatis; data terhapus dapat dipulihkan |
| NFR-07 | Usability | Bahasa Indonesia, pesan error spesifik per field |
| NFR-08 | Aksesibilitas | Label pada input, navigasi keyboard, kontras memadai |
| NFR-09 | Kompatibilitas | Chrome/Edge/Firefox terbaru, lebar ≥ 768 px |
| NFR-10 | Dokumentasi | Swagger selalu sinkron dengan handler |
| NFR-11 | Maintainability | Lint & format bersih (Biome), `go vet` bersih |

---

## 10. Kebutuhan Antarmuka

### 10.1 Halaman

| Rute | Halaman | Peran |
| --- | --- | --- |
| `/login` | Login | Semua |
| `/` | Dashboard | Semua |
| `/kendaraan` | Daftar kendaraan | Semua |
| `/kendaraan/baru` | Form tambah | Admin, Operator |
| `/kendaraan/:id` | Detail | Semua |
| `/kendaraan/:id/edit` | Form ubah | Admin, Operator |
| `/pegawai` | Daftar pegawai | Semua |
| `/pegawai/baru`, `/pegawai/:id/edit` | Form pegawai | Admin, Operator |
| `/perangkat-daerah` | Daftar instansi | Semua |
| `/perangkat-daerah/baru`, `/:id/edit` | Form instansi | Admin, Operator |
| `/peminjaman` | Daftar peminjaman | Semua |
| `/peminjaman/baru` | Form pengajuan | Admin, Operator |
| `/peminjaman/:id` | Detail + aksi | Semua (aksi sesuai peran) |
| `/servis` | Riwayat servis | Semua |
| `/pengguna` | Manajemen akun | Admin |

### 10.2 State wajib per halaman list

- Loading (skeleton), kosong (empty state + CTA), error (pesan + tombol coba lagi).
- Konfirmasi sebelum menghapus.
- Notifikasi sukses/gagal setelah mutasi.
- Filter aktif terlihat dan dapat direset.

### 10.3 Format

- Tanggal: `10 Nov 2026` ( `id-ID`).
- Uang: `Rp 1.250.000`.
- Nomor polisi: uppercase.
- NIP: ditampilkan lengkap tanpa pemisah.

---

## 11. Rencana Rilis

| Milestone | Cakupan | Kriteria selesai |
| --- | --- | --- |
| M1 — Fondasi | Monorepo, Docker, koneksi DB, migrasi, Swagger, health check | `docker compose up` + API hidup |
| M2 — Auth | Login, JWT, middleware role, seed akun | 3 role dapat login |
| M3 — Master data | CRUD perangkat daerah, pegawai, kendaraan (API) | Semua acceptance criteria backend lulus |
| M4 — Transaksi | Peminjaman, servis, dashboard, export (API) | Alur peminjaman end-to-end |
| M5 — UI shell | Routing, layout, komponen UI, auth guard | Halaman placeholder tampil |
| M6 — UI master | Halaman CRUD 3 entitas | CRUD dari browser |
| M7 — UI transaksi | Peminjaman, servis, dashboard, export | Demo alur penuh |
| M8 — Polish | State, validasi, README, screenshot | Definition of Done terpenuhi |

---

## 12. Risiko & Asumsi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Docker tidak tersedia saat demo | Aplikasi tidak jalan | Siapkan PostgreSQL lokal sebagai cadangan |
| Waktu ujian terbatas | Fitur tidak selesai | Prioritaskan M1–M4 dan M6 |
| sqlc menambah langkah generate | Lupa regenerate | Commit hasil generate, jalankan `sqlc generate` di checklist |
| Data seed tidak realistis | Demo kurang meyakinkan | Seed 4 OPD, 12 pegawai, 10 kendaraan, 6 peminjaman |
| Perubahan skema di tengah jalan | Migrasi berantakan | Selalu tambah migrasi baru, jangan edit yang lama |

**Asumsi:** jaringan internal, satu kendaraan milik satu perangkat daerah, satu peminjaman
satu kendaraan, persetujuan dilakukan di aplikasi.

---

## 13. Pertanyaan Terbuka

| No | Pertanyaan | Usulan default |
| --- | --- | --- |
| 1 | Format CSV: koma atau titik koma? | Koma + UTF-8 BOM |
| 2 | Perlu refresh token? | Tidak, access token 12 jam |
| 3 | Perlu unggah foto kendaraan? | Tidak, cukup tautan (`foto_url`) |
| 4 | Pimpinan boleh membatalkan peminjaman? | Tidak, hanya menyetujui/menolak |
| 5 | Perlu audit log perubahan field? | Tidak, cukup timestamp |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| KDO | Kendaraan Dinas Operasional |
| OPD | Organisasi Perangkat Daerah |
| NIP | Nomor Induk Pegawai (18 digit) |
| STNK | Surat Tanda Nomor Kendaraan |
| Soft delete | Data ditandai `deleted_at`, tidak dihapus fisik |
| Peminjaman aktif | Status `diajukan` atau `disetujui` |
| Bentrok jadwal | Dua peminjaman kendaraan sama dengan rentang waktu beririsan |

---

## 15. Riwayat Dokumen

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| 1.0 | 10 Nov 2026 | PRD awal sebelum pembuatan skema database |

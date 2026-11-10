-- 000002_indexes.down.sql
ALTER TABLE peminjaman DROP CONSTRAINT IF EXISTS excl_peminjaman_jadwal;

DROP INDEX IF EXISTS idx_pd_nama_trgm;
DROP INDEX IF EXISTS idx_pegawai_nama_trgm;
DROP INDEX IF EXISTS idx_kendaraan_nopol_trgm;

DROP INDEX IF EXISTS uq_pengguna_email;
DROP INDEX IF EXISTS idx_servis_kendaraan;
DROP INDEX IF EXISTS idx_pjm_status;
DROP INDEX IF EXISTS idx_pjm_kendaraan_waktu;
DROP INDEX IF EXISTS uq_peminjaman_kode;
DROP INDEX IF EXISTS idx_kendaraan_kondisi;
DROP INDEX IF EXISTS idx_kendaraan_status;
DROP INDEX IF EXISTS idx_kendaraan_pd;
DROP INDEX IF EXISTS uq_kendaraan_mesin;
DROP INDEX IF EXISTS uq_kendaraan_rangka;
DROP INDEX IF EXISTS uq_kendaraan_nopol;
DROP INDEX IF EXISTS idx_pegawai_pd;
DROP INDEX IF EXISTS uq_pegawai_nip;
DROP INDEX IF EXISTS uq_pd_nama;
DROP INDEX IF EXISTS uq_pd_kode;

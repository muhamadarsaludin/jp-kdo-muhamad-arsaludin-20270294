-- 000003_triggers.down.sql
DROP TRIGGER IF EXISTS trg_servis_updated_at ON servis;
DROP TRIGGER IF EXISTS trg_peminjaman_updated_at ON peminjaman;
DROP TRIGGER IF EXISTS trg_kendaraan_updated_at ON kendaraan;
DROP TRIGGER IF EXISTS trg_pengguna_updated_at ON pengguna;
DROP TRIGGER IF EXISTS trg_pegawai_updated_at ON pegawai;
DROP TRIGGER IF EXISTS trg_pd_updated_at ON perangkat_daerah;

DROP FUNCTION IF EXISTS set_updated_at();

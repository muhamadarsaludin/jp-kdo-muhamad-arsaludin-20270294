-- 000003_triggers.up.sql
-- updated_at otomatis untuk semua tabel transaksional.

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_pd_updated_at
    BEFORE UPDATE ON perangkat_daerah
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_pegawai_updated_at
    BEFORE UPDATE ON pegawai
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_pengguna_updated_at
    BEFORE UPDATE ON pengguna
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_kendaraan_updated_at
    BEFORE UPDATE ON kendaraan
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_peminjaman_updated_at
    BEFORE UPDATE ON peminjaman
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_servis_updated_at
    BEFORE UPDATE ON servis
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

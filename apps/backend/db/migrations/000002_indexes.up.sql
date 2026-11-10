-- 000002_indexes.up.sql
-- Index, constraint unik parsial (soft delete), dan pencegahan bentrok jadwal.

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Unik parsial: nilai boleh dipakai lagi setelah data di-soft-delete.
CREATE UNIQUE INDEX uq_pd_kode
    ON perangkat_daerah (lower(kode)) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_pd_nama
    ON perangkat_daerah (lower(nama)) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX uq_pegawai_nip
    ON pegawai (nip) WHERE deleted_at IS NULL;
CREATE INDEX idx_pegawai_pd
    ON pegawai (perangkat_daerah_id) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX uq_kendaraan_nopol
    ON kendaraan (nomor_polisi) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_kendaraan_rangka
    ON kendaraan (nomor_rangka) WHERE deleted_at IS NULL AND nomor_rangka IS NOT NULL;
CREATE UNIQUE INDEX uq_kendaraan_mesin
    ON kendaraan (nomor_mesin) WHERE deleted_at IS NULL AND nomor_mesin IS NOT NULL;
CREATE INDEX idx_kendaraan_pd
    ON kendaraan (perangkat_daerah_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_kendaraan_status
    ON kendaraan (status) WHERE deleted_at IS NULL;
CREATE INDEX idx_kendaraan_kondisi
    ON kendaraan (kondisi) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX uq_peminjaman_kode
    ON peminjaman (kode_peminjaman);
CREATE INDEX idx_pjm_kendaraan_waktu
    ON peminjaman (kendaraan_id, tanggal_mulai) WHERE deleted_at IS NULL;
CREATE INDEX idx_pjm_status
    ON peminjaman (status) WHERE deleted_at IS NULL;

CREATE INDEX idx_servis_kendaraan
    ON servis (kendaraan_id, tanggal DESC) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX uq_pengguna_email
    ON pengguna (lower(email)) WHERE deleted_at IS NULL;

-- Pencarian teks (ILIKE '%kata%').
CREATE INDEX idx_kendaraan_nopol_trgm
    ON kendaraan USING gin (nomor_polisi gin_trgm_ops);
CREATE INDEX idx_pegawai_nama_trgm
    ON pegawai USING gin (lower(nama) gin_trgm_ops);
CREATE INDEX idx_pd_nama_trgm
    ON perangkat_daerah USING gin (lower(nama) gin_trgm_ops);

-- Jaminan level database: satu kendaraan tidak bisa dipinjam pada rentang waktu beririsan.
ALTER TABLE peminjaman
    ADD CONSTRAINT excl_peminjaman_jadwal
    EXCLUDE USING gist (
        kendaraan_id WITH =,
        tstzrange(tanggal_mulai, tanggal_selesai, '[)') WITH &&
    )
    WHERE (status IN ('diajukan', 'disetujui') AND deleted_at IS NULL);

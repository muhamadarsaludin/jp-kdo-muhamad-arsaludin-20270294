-- 000001_init.up.sql
-- Skema awal Aplikasi KDO (6 tabel).

CREATE TABLE perangkat_daerah (
    id            BIGSERIAL PRIMARY KEY,
    kode          VARCHAR(20)  NOT NULL,
    nama          VARCHAR(150) NOT NULL,
    singkatan     VARCHAR(30),
    alamat        TEXT,
    telepon       VARCHAR(20),
    email         VARCHAR(100),
    nama_kepala   VARCHAR(100),
    is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    deleted_at    TIMESTAMPTZ,
    CONSTRAINT chk_pd_kode_upper CHECK (kode = upper(kode)),
    CONSTRAINT chk_pd_email CHECK (
        email IS NULL OR email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    )
);

CREATE TABLE pegawai (
    id                   BIGSERIAL PRIMARY KEY,
    nip                  CHAR(18)     NOT NULL,
    nama                 VARCHAR(100) NOT NULL,
    gelar_depan          VARCHAR(20),
    gelar_belakang       VARCHAR(30),
    jabatan              VARCHAR(100) NOT NULL,
    golongan             VARCHAR(10)  NOT NULL,
    pangkat              VARCHAR(50),
    perangkat_daerah_id  BIGINT       NOT NULL,
    email                VARCHAR(100),
    telepon              VARCHAR(20),
    tanggal_lahir        DATE,
    status_pegawai       VARCHAR(20)  NOT NULL DEFAULT 'aktif',
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
    deleted_at           TIMESTAMPTZ,
    CONSTRAINT fk_pegawai_pd FOREIGN KEY (perangkat_daerah_id)
        REFERENCES perangkat_daerah (id) ON DELETE RESTRICT,
    CONSTRAINT chk_pegawai_nip CHECK (nip ~ '^[0-9]{18}$'),
    CONSTRAINT chk_pegawai_golongan CHECK (golongan IN (
        'I/a','I/b','I/c','I/d',
        'II/a','II/b','II/c','II/d',
        'III/a','III/b','III/c','III/d',
        'IV/a','IV/b','IV/c','IV/d','IV/e'
    )),
    CONSTRAINT chk_pegawai_status CHECK (status_pegawai IN ('aktif','nonaktif','pensiun')),
    CONSTRAINT chk_pegawai_tanggal_lahir CHECK (
        tanggal_lahir IS NULL OR tanggal_lahir >= DATE '1945-01-01'
    ),
    CONSTRAINT chk_pegawai_email CHECK (
        email IS NULL OR email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    )
);

CREATE TABLE pengguna (
    id            BIGSERIAL PRIMARY KEY,
    nama          VARCHAR(100) NOT NULL,
    email         VARCHAR(100) NOT NULL,
    password_hash TEXT         NOT NULL,
    role          VARCHAR(20)  NOT NULL DEFAULT 'operator',
    is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    deleted_at    TIMESTAMPTZ,
    CONSTRAINT chk_pengguna_role CHECK (role IN ('admin','operator','pimpinan')),
    CONSTRAINT chk_pengguna_password CHECK (length(password_hash) >= 20),
    CONSTRAINT chk_pengguna_email CHECK (
        email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    )
);

CREATE TABLE kendaraan (
    id                   BIGSERIAL PRIMARY KEY,
    nomor_polisi         VARCHAR(15)   NOT NULL,
    nomor_rangka         VARCHAR(50),
    nomor_mesin          VARCHAR(50),
    merek                VARCHAR(50)   NOT NULL,
    tipe                 VARCHAR(50)   NOT NULL,
    tahun_produksi       SMALLINT      NOT NULL,
    warna                VARCHAR(30)   NOT NULL,
    jenis                VARCHAR(20)   NOT NULL,
    bahan_bakar          VARCHAR(20)   NOT NULL DEFAULT 'bensin',
    kapasitas_cc         INTEGER,
    odometer_km          INTEGER       NOT NULL DEFAULT 0,
    kondisi              VARCHAR(20)   NOT NULL DEFAULT 'baik',
    status               VARCHAR(20)   NOT NULL DEFAULT 'tersedia',
    tanggal_pajak        DATE,
    tanggal_stnk         DATE,
    perangkat_daerah_id  BIGINT        NOT NULL,
    penanggung_jawab_id  BIGINT,
    foto_url             TEXT,
    keterangan           TEXT,
    created_at           TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ   NOT NULL DEFAULT now(),
    deleted_at           TIMESTAMPTZ,
    CONSTRAINT fk_kendaraan_pd FOREIGN KEY (perangkat_daerah_id)
        REFERENCES perangkat_daerah (id) ON DELETE RESTRICT,
    CONSTRAINT fk_kendaraan_pj FOREIGN KEY (penanggung_jawab_id)
        REFERENCES pegawai (id) ON DELETE SET NULL,
    CONSTRAINT chk_kendaraan_nopol CHECK (
        nomor_polisi ~ '^[A-Z]{1,2} [0-9]{1,4} [A-Z]{1,3}$'
    ),
    CONSTRAINT chk_kendaraan_tahun CHECK (tahun_produksi BETWEEN 1980 AND 2100),
    CONSTRAINT chk_kendaraan_cc CHECK (kapasitas_cc IS NULL OR kapasitas_cc >= 0),
    CONSTRAINT chk_kendaraan_odo CHECK (odometer_km >= 0),
    CONSTRAINT chk_kendaraan_jenis CHECK (
        jenis IN ('motor','mobil','minibus','pickup','ambulans')
    ),
    CONSTRAINT chk_kendaraan_bahan_bakar CHECK (
        bahan_bakar IN ('bensin','solar','listrik','hybrid')
    ),
    CONSTRAINT chk_kendaraan_kondisi CHECK (
        kondisi IN ('baik','rusak_ringan','rusak_berat')
    ),
    CONSTRAINT chk_kendaraan_status CHECK (
        status IN ('tersedia','digunakan','perbaikan','dihapuskan')
    )
);

CREATE TABLE peminjaman (
    id                   BIGSERIAL PRIMARY KEY,
    kode_peminjaman      VARCHAR(30)  NOT NULL,
    kendaraan_id         BIGINT       NOT NULL,
    pegawai_id           BIGINT       NOT NULL,
    perangkat_daerah_id  BIGINT       NOT NULL,
    keperluan            VARCHAR(200) NOT NULL,
    tujuan               VARCHAR(200) NOT NULL,
    tanggal_mulai        TIMESTAMPTZ  NOT NULL,
    tanggal_selesai      TIMESTAMPTZ  NOT NULL,
    status               VARCHAR(20)  NOT NULL DEFAULT 'diajukan',
    catatan              TEXT,
    disetujui_oleh       BIGINT,
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
    deleted_at           TIMESTAMPTZ,
    CONSTRAINT fk_peminjaman_kendaraan FOREIGN KEY (kendaraan_id)
        REFERENCES kendaraan (id) ON DELETE RESTRICT,
    CONSTRAINT fk_peminjaman_pegawai FOREIGN KEY (pegawai_id)
        REFERENCES pegawai (id) ON DELETE RESTRICT,
    CONSTRAINT fk_peminjaman_pd FOREIGN KEY (perangkat_daerah_id)
        REFERENCES perangkat_daerah (id) ON DELETE RESTRICT,
    CONSTRAINT fk_peminjaman_penyetuju FOREIGN KEY (disetujui_oleh)
        REFERENCES pengguna (id) ON DELETE SET NULL,
    CONSTRAINT chk_peminjaman_kode CHECK (
        kode_peminjaman ~ '^PJM-[0-9]{8}-[0-9]{4}$'
    ),
    CONSTRAINT chk_peminjaman_waktu CHECK (tanggal_selesai > tanggal_mulai),
    CONSTRAINT chk_peminjaman_status CHECK (
        status IN ('diajukan','disetujui','ditolak','selesai','dibatalkan')
    )
);

CREATE TABLE servis (
    id             BIGSERIAL PRIMARY KEY,
    kendaraan_id   BIGINT       NOT NULL,
    tanggal        DATE         NOT NULL,
    jenis          VARCHAR(30)  NOT NULL,
    deskripsi      TEXT         NOT NULL,
    bengkel        VARCHAR(100),
    biaya          NUMERIC(14,2) NOT NULL DEFAULT 0,
    odometer_km    INTEGER,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT now(),
    deleted_at     TIMESTAMPTZ,
    CONSTRAINT fk_servis_kendaraan FOREIGN KEY (kendaraan_id)
        REFERENCES kendaraan (id) ON DELETE CASCADE,
    CONSTRAINT chk_servis_jenis CHECK (jenis IN ('rutin','perbaikan','ganti_part')),
    CONSTRAINT chk_servis_biaya CHECK (biaya >= 0),
    CONSTRAINT chk_servis_odo CHECK (odometer_km IS NULL OR odometer_km >= 0)
);

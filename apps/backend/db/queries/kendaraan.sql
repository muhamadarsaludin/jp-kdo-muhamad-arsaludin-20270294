-- name: ListKendaraan :many
SELECT k.*, pd.nama AS perangkat_daerah_nama, pj.nama AS penanggung_jawab_nama
FROM kendaraan k
JOIN perangkat_daerah pd ON pd.id = k.perangkat_daerah_id
LEFT JOIN pegawai pj ON pj.id = k.penanggung_jawab_id AND pj.deleted_at IS NULL
WHERE k.deleted_at IS NULL
  AND pd.deleted_at IS NULL
  AND (
    sqlc.narg('search')::text IS NULL
    OR k.nomor_polisi ILIKE '%' || sqlc.narg('search')::text || '%'
    OR k.merek ILIKE '%' || sqlc.narg('search')::text || '%'
    OR k.tipe ILIKE '%' || sqlc.narg('search')::text || '%'
  )
  AND (
    sqlc.narg('perangkat_daerah_id')::bigint IS NULL
    OR k.perangkat_daerah_id = sqlc.narg('perangkat_daerah_id')::bigint
  )
  AND (sqlc.narg('kondisi')::text IS NULL OR k.kondisi = sqlc.narg('kondisi')::text)
  AND (sqlc.narg('status')::text IS NULL OR k.status = sqlc.narg('status')::text)
  AND (sqlc.narg('jenis')::text IS NULL OR k.jenis = sqlc.narg('jenis')::text)
  AND (sqlc.narg('tahun')::smallint IS NULL OR k.tahun_produksi = sqlc.narg('tahun')::smallint)
ORDER BY
    CASE WHEN sqlc.arg('sort_by')::text = 'nomor_polisi' AND sqlc.arg('sort_order')::text = 'asc' THEN k.nomor_polisi END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'nomor_polisi' AND sqlc.arg('sort_order')::text = 'desc' THEN k.nomor_polisi END DESC,
    CASE WHEN sqlc.arg('sort_by')::text = 'merek' AND sqlc.arg('sort_order')::text = 'asc' THEN lower(k.merek) END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'merek' AND sqlc.arg('sort_order')::text = 'desc' THEN lower(k.merek) END DESC,
    CASE WHEN sqlc.arg('sort_by')::text = 'tahun_produksi' AND sqlc.arg('sort_order')::text = 'asc' THEN k.tahun_produksi END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'tahun_produksi' AND sqlc.arg('sort_order')::text = 'desc' THEN k.tahun_produksi END DESC,
    CASE WHEN sqlc.arg('sort_by')::text = 'created_at' AND sqlc.arg('sort_order')::text = 'asc' THEN k.created_at END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'created_at' AND sqlc.arg('sort_order')::text = 'desc' THEN k.created_at END DESC,
    k.id ASC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountKendaraan :one
SELECT count(*)
FROM kendaraan k
JOIN perangkat_daerah pd ON pd.id = k.perangkat_daerah_id
WHERE k.deleted_at IS NULL
  AND pd.deleted_at IS NULL
  AND (
    sqlc.narg('search')::text IS NULL
    OR k.nomor_polisi ILIKE '%' || sqlc.narg('search')::text || '%'
    OR k.merek ILIKE '%' || sqlc.narg('search')::text || '%'
    OR k.tipe ILIKE '%' || sqlc.narg('search')::text || '%'
  )
  AND (
    sqlc.narg('perangkat_daerah_id')::bigint IS NULL
    OR k.perangkat_daerah_id = sqlc.narg('perangkat_daerah_id')::bigint
  )
  AND (sqlc.narg('kondisi')::text IS NULL OR k.kondisi = sqlc.narg('kondisi')::text)
  AND (sqlc.narg('status')::text IS NULL OR k.status = sqlc.narg('status')::text)
  AND (sqlc.narg('jenis')::text IS NULL OR k.jenis = sqlc.narg('jenis')::text)
  AND (sqlc.narg('tahun')::smallint IS NULL OR k.tahun_produksi = sqlc.narg('tahun')::smallint);

-- name: GetKendaraan :one
SELECT k.*, pd.nama AS perangkat_daerah_nama, pj.nama AS penanggung_jawab_nama
FROM kendaraan k
JOIN perangkat_daerah pd ON pd.id = k.perangkat_daerah_id
LEFT JOIN pegawai pj ON pj.id = k.penanggung_jawab_id AND pj.deleted_at IS NULL
WHERE k.id = sqlc.arg('id') AND k.deleted_at IS NULL;

-- name: CreateKendaraan :one
INSERT INTO kendaraan (nomor_polisi, nomor_rangka, nomor_mesin, merek, tipe, tahun_produksi,
                       warna, jenis, bahan_bakar, kapasitas_cc, odometer_km, kondisi, status,
                       tanggal_pajak, tanggal_stnk, perangkat_daerah_id, penanggung_jawab_id,
                       foto_url, keterangan)
VALUES (
    sqlc.arg('nomor_polisi'),
    NULLIF(sqlc.arg('nomor_rangka'), ''),
    NULLIF(sqlc.arg('nomor_mesin'), ''),
    sqlc.arg('merek'),
    sqlc.arg('tipe'),
    sqlc.arg('tahun_produksi'),
    sqlc.arg('warna'),
    sqlc.arg('jenis'),
    sqlc.arg('bahan_bakar'),
    sqlc.narg('kapasitas_cc'),
    sqlc.arg('odometer_km'),
    sqlc.arg('kondisi'),
    sqlc.arg('status'),
    sqlc.narg('tanggal_pajak'),
    sqlc.narg('tanggal_stnk'),
    sqlc.arg('perangkat_daerah_id'),
    sqlc.narg('penanggung_jawab_id'),
    NULLIF(sqlc.arg('foto_url'), ''),
    NULLIF(sqlc.arg('keterangan'), '')
)
RETURNING *;

-- name: UpdateKendaraan :one
UPDATE kendaraan
SET nomor_polisi = sqlc.arg('nomor_polisi'),
    nomor_rangka = NULLIF(sqlc.arg('nomor_rangka'), ''),
    nomor_mesin = NULLIF(sqlc.arg('nomor_mesin'), ''),
    merek = sqlc.arg('merek'),
    tipe = sqlc.arg('tipe'),
    tahun_produksi = sqlc.arg('tahun_produksi'),
    warna = sqlc.arg('warna'),
    jenis = sqlc.arg('jenis'),
    bahan_bakar = sqlc.arg('bahan_bakar'),
    kapasitas_cc = sqlc.narg('kapasitas_cc'),
    odometer_km = sqlc.arg('odometer_km'),
    kondisi = sqlc.arg('kondisi'),
    status = sqlc.arg('status'),
    tanggal_pajak = sqlc.narg('tanggal_pajak'),
    tanggal_stnk = sqlc.narg('tanggal_stnk'),
    perangkat_daerah_id = sqlc.arg('perangkat_daerah_id'),
    penanggung_jawab_id = sqlc.narg('penanggung_jawab_id'),
    foto_url = NULLIF(sqlc.arg('foto_url'), ''),
    keterangan = NULLIF(sqlc.arg('keterangan'), '')
WHERE id = sqlc.arg('id') AND deleted_at IS NULL
RETURNING *;

-- name: SoftDeleteKendaraan :execrows
UPDATE kendaraan
SET deleted_at = now()
WHERE id = sqlc.arg('id') AND deleted_at IS NULL;

-- name: CountPeminjamanAktifByKendaraan :one
SELECT count(*)
FROM peminjaman
WHERE kendaraan_id = sqlc.arg('kendaraan_id')
  AND status IN ('diajukan', 'disetujui')
  AND deleted_at IS NULL;

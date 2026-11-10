-- name: ListPeminjaman :many
SELECT pm.*, k.nomor_polisi, k.merek, k.tipe,
       pg.nama AS pegawai_nama,
       pd.nama AS perangkat_daerah_nama,
       u.nama AS penyetuju_nama
FROM peminjaman pm
JOIN kendaraan k ON k.id = pm.kendaraan_id
JOIN pegawai pg ON pg.id = pm.pegawai_id
JOIN perangkat_daerah pd ON pd.id = pm.perangkat_daerah_id
LEFT JOIN pengguna u ON u.id = pm.disetujui_oleh
WHERE pm.deleted_at IS NULL
  AND (
    sqlc.narg('search')::text IS NULL
    OR pm.kode_peminjaman ILIKE '%' || sqlc.narg('search')::text || '%'
    OR pm.keperluan ILIKE '%' || sqlc.narg('search')::text || '%'
    OR pm.tujuan ILIKE '%' || sqlc.narg('search')::text || '%'
  )
  AND (sqlc.narg('status')::text IS NULL OR pm.status = sqlc.narg('status')::text)
  AND (sqlc.narg('kendaraan_id')::bigint IS NULL OR pm.kendaraan_id = sqlc.narg('kendaraan_id')::bigint)
  AND (sqlc.narg('pegawai_id')::bigint IS NULL OR pm.pegawai_id = sqlc.narg('pegawai_id')::bigint)
  AND (sqlc.narg('dari')::timestamptz IS NULL OR pm.tanggal_mulai >= sqlc.narg('dari')::timestamptz)
  AND (sqlc.narg('sampai')::timestamptz IS NULL OR pm.tanggal_selesai <= sqlc.narg('sampai')::timestamptz)
ORDER BY
    CASE WHEN sqlc.arg('sort_by')::text = 'tanggal_mulai' AND sqlc.arg('sort_order')::text = 'asc' THEN pm.tanggal_mulai END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'tanggal_mulai' AND sqlc.arg('sort_order')::text = 'desc' THEN pm.tanggal_mulai END DESC,
    CASE WHEN sqlc.arg('sort_by')::text = 'kode_peminjaman' AND sqlc.arg('sort_order')::text = 'asc' THEN pm.kode_peminjaman END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'kode_peminjaman' AND sqlc.arg('sort_order')::text = 'desc' THEN pm.kode_peminjaman END DESC,
    CASE WHEN sqlc.arg('sort_by')::text = 'created_at' AND sqlc.arg('sort_order')::text = 'asc' THEN pm.created_at END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'created_at' AND sqlc.arg('sort_order')::text = 'desc' THEN pm.created_at END DESC,
    pm.id DESC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountPeminjaman :one
SELECT count(*)
FROM peminjaman pm
WHERE pm.deleted_at IS NULL
  AND (
    sqlc.narg('search')::text IS NULL
    OR pm.kode_peminjaman ILIKE '%' || sqlc.narg('search')::text || '%'
    OR pm.keperluan ILIKE '%' || sqlc.narg('search')::text || '%'
    OR pm.tujuan ILIKE '%' || sqlc.narg('search')::text || '%'
  )
  AND (sqlc.narg('status')::text IS NULL OR pm.status = sqlc.narg('status')::text)
  AND (sqlc.narg('kendaraan_id')::bigint IS NULL OR pm.kendaraan_id = sqlc.narg('kendaraan_id')::bigint)
  AND (sqlc.narg('pegawai_id')::bigint IS NULL OR pm.pegawai_id = sqlc.narg('pegawai_id')::bigint)
  AND (sqlc.narg('dari')::timestamptz IS NULL OR pm.tanggal_mulai >= sqlc.narg('dari')::timestamptz)
  AND (sqlc.narg('sampai')::timestamptz IS NULL OR pm.tanggal_selesai <= sqlc.narg('sampai')::timestamptz);

-- name: GetPeminjaman :one
SELECT pm.*, k.nomor_polisi, k.merek, k.tipe,
       pg.nama AS pegawai_nama,
       pd.nama AS perangkat_daerah_nama,
       u.nama AS penyetuju_nama
FROM peminjaman pm
JOIN kendaraan k ON k.id = pm.kendaraan_id
JOIN pegawai pg ON pg.id = pm.pegawai_id
JOIN perangkat_daerah pd ON pd.id = pm.perangkat_daerah_id
LEFT JOIN pengguna u ON u.id = pm.disetujui_oleh
WHERE pm.id = sqlc.arg('id') AND pm.deleted_at IS NULL;

-- name: CreatePeminjaman :one
INSERT INTO peminjaman (kode_peminjaman, kendaraan_id, pegawai_id, perangkat_daerah_id,
                        keperluan, tujuan, tanggal_mulai, tanggal_selesai, status, catatan)
VALUES (
    sqlc.arg('kode_peminjaman'),
    sqlc.arg('kendaraan_id'),
    sqlc.arg('pegawai_id'),
    sqlc.arg('perangkat_daerah_id'),
    sqlc.arg('keperluan'),
    sqlc.arg('tujuan'),
    sqlc.arg('tanggal_mulai'),
    sqlc.arg('tanggal_selesai'),
    'diajukan',
    NULLIF(sqlc.arg('catatan'), '')
)
RETURNING *;

-- name: GetKendaraanRingkas :one
SELECT id, status, perangkat_daerah_id
FROM kendaraan
WHERE id = sqlc.arg('id') AND deleted_at IS NULL;

-- name: GetPegawaiRingkas :one
SELECT id, nama, perangkat_daerah_id
FROM pegawai
WHERE id = sqlc.arg('id') AND deleted_at IS NULL;

-- name: CountPeminjamanBentrok :one
SELECT count(*)
FROM peminjaman
WHERE kendaraan_id = sqlc.arg('kendaraan_id')
  AND status IN ('diajukan', 'disetujui')
  AND deleted_at IS NULL
  AND tanggal_mulai < sqlc.arg('tanggal_selesai')
  AND tanggal_selesai > sqlc.arg('tanggal_mulai');

-- name: NextNomorPeminjaman :one
SELECT COALESCE(MAX(right(kode_peminjaman, 4)::int), 0) + 1
FROM peminjaman
WHERE kode_peminjaman LIKE sqlc.arg('prefix')::text || '%';

-- name: UpdatePeminjamanStatus :execrows
UPDATE peminjaman
SET status = sqlc.arg('status'),
    disetujui_oleh = COALESCE(sqlc.narg('disetujui_oleh')::bigint, disetujui_oleh),
    catatan = COALESCE(sqlc.narg('catatan')::text, catatan)
WHERE id = sqlc.arg('id')
  AND status = sqlc.arg('status_lama')
  AND deleted_at IS NULL;

-- name: SetKendaraanStatusByPeminjaman :exec
UPDATE kendaraan k
SET status = sqlc.arg('status')
WHERE k.id = (SELECT pm.kendaraan_id FROM peminjaman pm WHERE pm.id = sqlc.arg('peminjaman_id'));

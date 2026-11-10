-- name: ListPegawai :many
SELECT p.*, pd.nama AS perangkat_daerah_nama
FROM pegawai p
JOIN perangkat_daerah pd ON pd.id = p.perangkat_daerah_id
WHERE p.deleted_at IS NULL
  AND pd.deleted_at IS NULL
  AND (
    sqlc.narg('search')::text IS NULL
    OR p.nama ILIKE '%' || sqlc.narg('search')::text || '%'
    OR p.nip LIKE '%' || sqlc.narg('search')::text || '%'
  )
  AND (
    sqlc.narg('perangkat_daerah_id')::bigint IS NULL
    OR p.perangkat_daerah_id = sqlc.narg('perangkat_daerah_id')::bigint
  )
  AND (
    sqlc.narg('golongan')::text IS NULL
    OR p.golongan = sqlc.narg('golongan')::text
  )
  AND (
    sqlc.narg('status_pegawai')::text IS NULL
    OR p.status_pegawai = sqlc.narg('status_pegawai')::text
  )
ORDER BY
    CASE WHEN sqlc.arg('sort_by')::text = 'nama' AND sqlc.arg('sort_order')::text = 'asc' THEN lower(p.nama) END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'nama' AND sqlc.arg('sort_order')::text = 'desc' THEN lower(p.nama) END DESC,
    CASE WHEN sqlc.arg('sort_by')::text = 'nip' AND sqlc.arg('sort_order')::text = 'asc' THEN p.nip END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'nip' AND sqlc.arg('sort_order')::text = 'desc' THEN p.nip END DESC,
    CASE WHEN sqlc.arg('sort_by')::text = 'created_at' AND sqlc.arg('sort_order')::text = 'asc' THEN p.created_at END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'created_at' AND sqlc.arg('sort_order')::text = 'desc' THEN p.created_at END DESC,
    p.id ASC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountPegawai :one
SELECT count(*)
FROM pegawai p
JOIN perangkat_daerah pd ON pd.id = p.perangkat_daerah_id
WHERE p.deleted_at IS NULL
  AND pd.deleted_at IS NULL
  AND (
    sqlc.narg('search')::text IS NULL
    OR p.nama ILIKE '%' || sqlc.narg('search')::text || '%'
    OR p.nip LIKE '%' || sqlc.narg('search')::text || '%'
  )
  AND (
    sqlc.narg('perangkat_daerah_id')::bigint IS NULL
    OR p.perangkat_daerah_id = sqlc.narg('perangkat_daerah_id')::bigint
  )
  AND (
    sqlc.narg('golongan')::text IS NULL
    OR p.golongan = sqlc.narg('golongan')::text
  )
  AND (
    sqlc.narg('status_pegawai')::text IS NULL
    OR p.status_pegawai = sqlc.narg('status_pegawai')::text
  );

-- name: GetPegawai :one
SELECT p.*, pd.nama AS perangkat_daerah_nama
FROM pegawai p
JOIN perangkat_daerah pd ON pd.id = p.perangkat_daerah_id
WHERE p.id = sqlc.arg('id') AND p.deleted_at IS NULL;

-- name: CreatePegawai :one
INSERT INTO pegawai (nip, nama, gelar_depan, gelar_belakang, jabatan, golongan, pangkat,
                     perangkat_daerah_id, email, telepon, tanggal_lahir, status_pegawai)
VALUES (
    sqlc.arg('nip'),
    sqlc.arg('nama'),
    NULLIF(sqlc.arg('gelar_depan'), ''),
    NULLIF(sqlc.arg('gelar_belakang'), ''),
    sqlc.arg('jabatan'),
    sqlc.arg('golongan'),
    NULLIF(sqlc.arg('pangkat'), ''),
    sqlc.arg('perangkat_daerah_id'),
    NULLIF(sqlc.arg('email'), ''),
    NULLIF(sqlc.arg('telepon'), ''),
    sqlc.narg('tanggal_lahir'),
    sqlc.arg('status_pegawai')
)
RETURNING *;

-- name: UpdatePegawai :one
UPDATE pegawai
SET nip = sqlc.arg('nip'),
    nama = sqlc.arg('nama'),
    gelar_depan = NULLIF(sqlc.arg('gelar_depan'), ''),
    gelar_belakang = NULLIF(sqlc.arg('gelar_belakang'), ''),
    jabatan = sqlc.arg('jabatan'),
    golongan = sqlc.arg('golongan'),
    pangkat = NULLIF(sqlc.arg('pangkat'), ''),
    perangkat_daerah_id = sqlc.arg('perangkat_daerah_id'),
    email = NULLIF(sqlc.arg('email'), ''),
    telepon = NULLIF(sqlc.arg('telepon'), ''),
    tanggal_lahir = sqlc.narg('tanggal_lahir'),
    status_pegawai = sqlc.arg('status_pegawai')
WHERE id = sqlc.arg('id') AND deleted_at IS NULL
RETURNING *;

-- name: SoftDeletePegawai :execrows
UPDATE pegawai
SET deleted_at = now()
WHERE id = sqlc.arg('id') AND deleted_at IS NULL;

-- name: ClearPenanggungJawabKendaraan :exec
UPDATE kendaraan
SET penanggung_jawab_id = NULL
WHERE penanggung_jawab_id = sqlc.arg('pegawai_id')::bigint AND deleted_at IS NULL;

-- name: CountPeminjamanByPegawai :one
SELECT count(*)
FROM peminjaman
WHERE pegawai_id = sqlc.arg('pegawai_id')::bigint AND deleted_at IS NULL;

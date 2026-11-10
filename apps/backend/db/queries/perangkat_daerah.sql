-- name: ListPerangkatDaerah :many
SELECT *
FROM perangkat_daerah
WHERE deleted_at IS NULL
  AND (
    sqlc.narg('search')::text IS NULL
    OR lower(nama) LIKE '%' || lower(sqlc.narg('search')::text) || '%'
    OR lower(kode) LIKE '%' || lower(sqlc.narg('search')::text) || '%'
    OR lower(coalesce(singkatan, '')) LIKE '%' || lower(sqlc.narg('search')::text) || '%'
  )
  AND (
    sqlc.narg('is_active')::boolean IS NULL
    OR is_active = sqlc.narg('is_active')::boolean
  )
ORDER BY
    CASE WHEN sqlc.arg('sort_by')::text = 'nama' AND sqlc.arg('sort_order')::text = 'asc' THEN lower(nama) END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'nama' AND sqlc.arg('sort_order')::text = 'desc' THEN lower(nama) END DESC,
    CASE WHEN sqlc.arg('sort_by')::text = 'kode' AND sqlc.arg('sort_order')::text = 'asc' THEN kode END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'kode' AND sqlc.arg('sort_order')::text = 'desc' THEN kode END DESC,
    CASE WHEN sqlc.arg('sort_by')::text = 'created_at' AND sqlc.arg('sort_order')::text = 'asc' THEN created_at END ASC,
    CASE WHEN sqlc.arg('sort_by')::text = 'created_at' AND sqlc.arg('sort_order')::text = 'desc' THEN created_at END DESC,
    id ASC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountPerangkatDaerah :one
SELECT count(*)
FROM perangkat_daerah
WHERE deleted_at IS NULL
  AND (
    sqlc.narg('search')::text IS NULL
    OR lower(nama) LIKE '%' || lower(sqlc.narg('search')::text) || '%'
    OR lower(kode) LIKE '%' || lower(sqlc.narg('search')::text) || '%'
    OR lower(coalesce(singkatan, '')) LIKE '%' || lower(sqlc.narg('search')::text) || '%'
  )
  AND (
    sqlc.narg('is_active')::boolean IS NULL
    OR is_active = sqlc.narg('is_active')::boolean
  );

-- name: GetPerangkatDaerah :one
SELECT *
FROM perangkat_daerah
WHERE id = sqlc.arg('id') AND deleted_at IS NULL;

-- name: CreatePerangkatDaerah :one
INSERT INTO perangkat_daerah (kode, nama, singkatan, alamat, telepon, email, nama_kepala, is_active)
VALUES (
    upper(sqlc.arg('kode')),
    sqlc.arg('nama'),
    NULLIF(sqlc.arg('singkatan'), ''),
    NULLIF(sqlc.arg('alamat'), ''),
    NULLIF(sqlc.arg('telepon'), ''),
    NULLIF(sqlc.arg('email'), ''),
    NULLIF(sqlc.arg('nama_kepala'), ''),
    sqlc.arg('is_active')
)
RETURNING *;

-- name: UpdatePerangkatDaerah :one
UPDATE perangkat_daerah
SET kode = upper(sqlc.arg('kode')),
    nama = sqlc.arg('nama'),
    singkatan = NULLIF(sqlc.arg('singkatan'), ''),
    alamat = NULLIF(sqlc.arg('alamat'), ''),
    telepon = NULLIF(sqlc.arg('telepon'), ''),
    email = NULLIF(sqlc.arg('email'), ''),
    nama_kepala = NULLIF(sqlc.arg('nama_kepala'), ''),
    is_active = sqlc.arg('is_active')
WHERE id = sqlc.arg('id') AND deleted_at IS NULL
RETURNING *;

-- name: SoftDeletePerangkatDaerah :execrows
UPDATE perangkat_daerah
SET deleted_at = now()
WHERE id = sqlc.arg('id') AND deleted_at IS NULL;

-- name: CountRelasiPerangkatDaerah :one
SELECT
    (SELECT count(*) FROM pegawai p
     WHERE p.perangkat_daerah_id = sqlc.arg('opd_id') AND p.deleted_at IS NULL) AS pegawai,
    (SELECT count(*) FROM kendaraan k
     WHERE k.perangkat_daerah_id = sqlc.arg('opd_id') AND k.deleted_at IS NULL) AS kendaraan;

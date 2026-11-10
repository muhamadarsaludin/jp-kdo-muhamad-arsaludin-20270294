-- name: ListPengguna :many
SELECT id, nama, email, role, is_active, created_at, updated_at
FROM pengguna
WHERE deleted_at IS NULL
  AND (
    sqlc.narg('search')::text IS NULL
    OR nama ILIKE '%' || sqlc.narg('search')::text || '%'
    OR email ILIKE '%' || sqlc.narg('search')::text || '%'
  )
  AND (sqlc.narg('role')::text IS NULL OR role = sqlc.narg('role')::text)
  AND (sqlc.narg('is_active')::boolean IS NULL OR is_active = sqlc.narg('is_active')::boolean)
ORDER BY created_at DESC, id DESC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountPengguna :one
SELECT count(*)
FROM pengguna
WHERE deleted_at IS NULL
  AND (
    sqlc.narg('search')::text IS NULL
    OR nama ILIKE '%' || sqlc.narg('search')::text || '%'
    OR email ILIKE '%' || sqlc.narg('search')::text || '%'
  )
  AND (sqlc.narg('role')::text IS NULL OR role = sqlc.narg('role')::text)
  AND (sqlc.narg('is_active')::boolean IS NULL OR is_active = sqlc.narg('is_active')::boolean);

-- name: CreatePengguna :one
INSERT INTO pengguna (nama, email, password_hash, role, is_active)
VALUES (
    sqlc.arg('nama'),
    lower(sqlc.arg('email')),
    sqlc.arg('password_hash'),
    sqlc.arg('role'),
    sqlc.arg('is_active')
)
RETURNING id, nama, email, role, is_active, created_at, updated_at;

-- name: UpdatePengguna :one
UPDATE pengguna
SET nama = sqlc.arg('nama'),
    email = lower(sqlc.arg('email')),
    role = sqlc.arg('role'),
    is_active = sqlc.arg('is_active'),
    password_hash = COALESCE(sqlc.narg('password_hash')::text, password_hash)
WHERE id = sqlc.arg('id') AND deleted_at IS NULL
RETURNING id, nama, email, role, is_active, created_at, updated_at;

-- name: SoftDeletePengguna :execrows
UPDATE pengguna
SET deleted_at = now(), is_active = false
WHERE id = sqlc.arg('id') AND deleted_at IS NULL;

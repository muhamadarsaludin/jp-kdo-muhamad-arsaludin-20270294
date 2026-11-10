-- name: GetPenggunaByEmail :one
SELECT *
FROM pengguna
WHERE lower(email) = lower(sqlc.arg(email)) AND deleted_at IS NULL
LIMIT 1;

-- name: GetPenggunaByID :one
SELECT *
FROM pengguna
WHERE id = sqlc.arg(id) AND deleted_at IS NULL;

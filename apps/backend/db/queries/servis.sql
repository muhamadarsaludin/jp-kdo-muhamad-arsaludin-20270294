-- name: ListServisByKendaraan :many
SELECT s.*, k.nomor_polisi, k.merek
FROM servis s
JOIN kendaraan k ON k.id = s.kendaraan_id
WHERE s.kendaraan_id = sqlc.arg('kendaraan_id') AND s.deleted_at IS NULL
ORDER BY s.tanggal DESC, s.id DESC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountServisByKendaraan :one
SELECT count(*)
FROM servis
WHERE kendaraan_id = sqlc.arg('kendaraan_id') AND deleted_at IS NULL;

-- name: GetServis :one
SELECT s.*, k.nomor_polisi, k.merek
FROM servis s
JOIN kendaraan k ON k.id = s.kendaraan_id
WHERE s.id = sqlc.arg('id') AND s.deleted_at IS NULL;

-- name: CreateServis :one
INSERT INTO servis (kendaraan_id, tanggal, jenis, deskripsi, bengkel, biaya, odometer_km)
VALUES (
    sqlc.arg('kendaraan_id'),
    sqlc.arg('tanggal'),
    sqlc.arg('jenis'),
    sqlc.arg('deskripsi'),
    NULLIF(sqlc.arg('bengkel'), ''),
    sqlc.arg('biaya'),
    sqlc.narg('odometer_km')
)
RETURNING *;

-- name: UpdateServis :one
UPDATE servis
SET tanggal = sqlc.arg('tanggal'),
    jenis = sqlc.arg('jenis'),
    deskripsi = sqlc.arg('deskripsi'),
    bengkel = NULLIF(sqlc.arg('bengkel'), ''),
    biaya = sqlc.arg('biaya'),
    odometer_km = sqlc.narg('odometer_km')
WHERE id = sqlc.arg('id') AND deleted_at IS NULL
RETURNING *;

-- name: SoftDeleteServis :execrows
UPDATE servis
SET deleted_at = now()
WHERE id = sqlc.arg('id') AND deleted_at IS NULL;

-- name: TotalBiayaServisByKendaraan :one
SELECT COALESCE(SUM(biaya), 0)::numeric
FROM servis
WHERE kendaraan_id = sqlc.arg('kendaraan_id') AND deleted_at IS NULL;

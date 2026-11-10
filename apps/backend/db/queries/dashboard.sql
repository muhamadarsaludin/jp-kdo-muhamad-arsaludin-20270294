-- name: DashboardRingkasan :one
SELECT
    (SELECT count(*) FROM kendaraan WHERE deleted_at IS NULL) AS total_kendaraan,
    (SELECT count(*) FROM kendaraan WHERE deleted_at IS NULL AND status = 'tersedia') AS tersedia,
    (SELECT count(*) FROM kendaraan WHERE deleted_at IS NULL AND status = 'digunakan') AS digunakan,
    (SELECT count(*) FROM kendaraan WHERE deleted_at IS NULL AND status = 'perbaikan') AS perbaikan,
    (SELECT count(*) FROM kendaraan WHERE deleted_at IS NULL AND status = 'dihapuskan') AS dihapuskan,
    (SELECT count(*) FROM pegawai WHERE deleted_at IS NULL) AS total_pegawai,
    (SELECT count(*) FROM perangkat_daerah WHERE deleted_at IS NULL AND is_active) AS total_opd,
    (SELECT count(*) FROM peminjaman WHERE deleted_at IS NULL AND status = 'diajukan') AS peminjaman_diajukan,
    (SELECT count(*) FROM peminjaman WHERE deleted_at IS NULL AND status = 'disetujui') AS peminjaman_aktif,
    (SELECT COALESCE(SUM(biaya), 0)::numeric FROM servis
     WHERE deleted_at IS NULL AND date_trunc('month', tanggal) = date_trunc('month', now())) AS biaya_bulan_ini,
    (SELECT COALESCE(SUM(biaya), 0)::numeric FROM servis WHERE deleted_at IS NULL) AS biaya_total;

-- name: DashboardKendaraanPerKondisi :many
SELECT kondisi, count(*) AS total
FROM kendaraan
WHERE deleted_at IS NULL
GROUP BY kondisi
ORDER BY kondisi;

-- name: DashboardKendaraanPerOpd :many
SELECT pd.nama AS nama, count(k.id) AS total
FROM perangkat_daerah pd
LEFT JOIN kendaraan k ON k.perangkat_daerah_id = pd.id AND k.deleted_at IS NULL
WHERE pd.deleted_at IS NULL
GROUP BY pd.id, pd.nama
ORDER BY total DESC, pd.nama ASC;

-- name: DashboardBiayaServisBulanan :many
SELECT to_char(date_trunc('month', tanggal), 'YYYY-MM') AS bulan,
       COALESCE(SUM(biaya), 0)::numeric AS total
FROM servis
WHERE deleted_at IS NULL
  AND tanggal >= date_trunc('month', now()) - interval '5 months'
GROUP BY 1
ORDER BY 1;

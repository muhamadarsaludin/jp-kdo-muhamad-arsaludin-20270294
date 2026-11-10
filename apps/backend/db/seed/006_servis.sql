-- Seed riwayat servis (6 bulan terakhir agar grafik dashboard terisi).
INSERT INTO servis (kendaraan_id, tanggal, jenis, deskripsi, bengkel, biaya, odometer_km)
VALUES
    ((SELECT id FROM kendaraan WHERE nomor_polisi = 'B 1234 XYZ'), DATE '2026-06-15', 'rutin', 'Servis rutin 40.000 km, ganti oli dan filter', 'Auto2000 Cempaka', 450000, 40100),
    ((SELECT id FROM kendaraan WHERE nomor_polisi = 'B 1234 XYZ'), DATE '2026-09-20', 'ganti_part', 'Ganti kampas rem depan dan belakang', 'Auto2000 Cempaka', 1250000, 46500),
    ((SELECT id FROM kendaraan WHERE nomor_polisi = 'B 5678 ABC'), DATE '2026-07-05', 'rutin', 'Servis rutin dan ganti oli', 'AHASS Jaya', 180000, 15000),
    ((SELECT id FROM kendaraan WHERE nomor_polisi = 'D 1122 KDO'), DATE '2026-08-12', 'perbaikan', 'Perbaikan sistem pendingin dan radiator', 'Isuzu Service', 2750000, 91200),
    ((SELECT id FROM kendaraan WHERE nomor_polisi = 'D 3344 KDS'), DATE '2026-07-22', 'rutin', 'Servis 30.000 km', 'Suzuki Service', 520000, 30000),
    ((SELECT id FROM kendaraan WHERE nomor_polisi = 'AB 7788 BP'), DATE '2026-09-02', 'perbaikan', 'Perbaikan AC dan kelistrikan', 'Toyota Service', 3100000, 72000),
    ((SELECT id FROM kendaraan WHERE nomor_polisi = 'N 2211 KDO'), DATE '2026-10-18', 'perbaikan', 'Overhaul mesin dan ganti kopling', 'Mitsubishi Service', 4800000, 131000),
    ((SELECT id FROM kendaraan WHERE nomor_polisi = 'H 6677 ST'), DATE '2026-08-30', 'rutin', 'Servis rutin 40.000 km', 'Auto2000 Sudirman', 650000, 40000)
ON CONFLICT DO NOTHING;

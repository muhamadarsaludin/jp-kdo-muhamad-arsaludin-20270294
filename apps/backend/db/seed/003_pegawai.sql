-- Seed pegawai (12 orang, tersebar di 4 perangkat daerah).
INSERT INTO pegawai (nip, nama, gelar_depan, gelar_belakang, jabatan, golongan, pangkat,
                     perangkat_daerah_id, email, telepon, tanggal_lahir)
VALUES
    ('197805122006041001', 'Bambang Sutrisno', 'Drs.', 'M.Si', 'Kepala Dinas', 'IV/a', 'Pembina', (SELECT id FROM perangkat_daerah WHERE kode = 'DISPENDIK'), 'bambang@kdo.go.id', '081200000001', DATE '1978-05-12'),
    ('198203152009012002', 'Siti Rahmawati', 'S.Pd', NULL, 'Sekretaris Dinas', 'III/d', 'Penata Tingkat I', (SELECT id FROM perangkat_daerah WHERE kode = 'DISPENDIK'), 'siti@kdo.go.id', '081200000002', DATE '1982-03-15'),
    ('199001202015031003', 'Andi Prasetyo', 'S.Kom', NULL, 'Staf Umum', 'III/a', 'Penata Muda', (SELECT id FROM perangkat_daerah WHERE kode = 'DISPENDIK'), 'andi@kdo.go.id', '081200000003', DATE '1990-01-20'),
    ('197611082005011004', 'Ratna Dewi', 'dr.', 'M.Kes', 'Kepala Dinas', 'IV/b', 'Pembina Tingkat I', (SELECT id FROM perangkat_daerah WHERE kode = 'DINKES'), 'ratna@kdo.go.id', '081200000004', DATE '1976-11-08'),
    ('198507212011012005', 'Nugroho Hadi', 'S.KM', NULL, 'Kabid Pelayanan', 'III/c', 'Penata', (SELECT id FROM perangkat_daerah WHERE kode = 'DINKES'), 'nugroho@kdo.go.id', '081200000005', DATE '1985-07-21'),
    ('199203102017022006', 'Maya Lestari', 'A.Md', NULL, 'Staf Keuangan', 'II/c', 'Pengatur', (SELECT id FROM perangkat_daerah WHERE kode = 'DINKES'), 'maya@kdo.go.id', '081200000006', DATE '1992-03-10'),
    ('197904042006021007', 'Agus Setiawan', 'S.E.', 'M.M', 'Kepala Badan', 'IV/a', 'Pembina', (SELECT id FROM perangkat_daerah WHERE kode = 'BPAD'), 'agus@kdo.go.id', '081200000007', DATE '1979-04-04'),
    ('198812012012011008', 'Rina Kurniasih', 'S.E', NULL, 'Kasubbag Umum', 'III/c', 'Penata', (SELECT id FROM perangkat_daerah WHERE kode = 'BPAD'), 'rina@kdo.go.id', '081200000008', DATE '1988-12-01'),
    ('199505252019031009', 'Fajar Ramadhan', 'S.Kom', NULL, 'Pranata Komputer', 'III/a', 'Penata Muda', (SELECT id FROM perangkat_daerah WHERE kode = 'BPAD'), 'fajar@kdo.go.id', '081200000009', DATE '1995-05-25'),
    ('197701152003121010', 'Hendra Wijaya', 'S.Sos', NULL, 'Sekretaris Daerah', 'IV/c', 'Pembina Utama Muda', (SELECT id FROM perangkat_daerah WHERE kode = 'SETDA'), 'hendra@kdo.go.id', '081200000010', DATE '1977-01-15'),
    ('198309182010011011', 'Dewi Anggraini', 'S.H', NULL, 'Kabag Hukum', 'III/d', 'Penata Tingkat I', (SELECT id FROM perangkat_daerah WHERE kode = 'SETDA'), 'dewi@kdo.go.id', '081200000011', DATE '1983-09-18'),
    ('199411072018012012', 'Bayu Prakoso', 'A.Md', NULL, 'Staf Protokol', 'II/d', 'Pengatur Tingkat I', (SELECT id FROM perangkat_daerah WHERE kode = 'SETDA'), 'bayu@kdo.go.id', '081200000012', DATE '1994-11-07')
ON CONFLICT DO NOTHING;

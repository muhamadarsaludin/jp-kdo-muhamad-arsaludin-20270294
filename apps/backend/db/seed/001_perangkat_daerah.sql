-- Seed perangkat daerah.
INSERT INTO perangkat_daerah (kode, nama, singkatan, alamat, telepon, email, nama_kepala)
VALUES
    ('DISPENDIK', 'Dinas Pendidikan', 'Disdik', 'Jl. Merdeka No. 1', '021-5550101', 'disdik@kdo.go.id', 'Drs. Bambang Sutrisno, M.Si'),
    ('DINKES', 'Dinas Kesehatan', 'Dinkes', 'Jl. Sehat No. 12', '021-5550102', 'dinkes@kdo.go.id', 'dr. Ratna Dewi, M.Kes'),
    ('BPAD', 'Badan Pengelolaan Keuangan dan Aset Daerah', 'BPAD', 'Jl. Keuangan No. 7', '021-5550103', 'bpad@kdo.go.id', 'Agus Setiawan, S.E., M.M'),
    ('SETDA', 'Sekretariat Daerah', 'Setda', 'Jl. Pemerintahan No. 1', '021-5550104', 'setda@kdo.go.id', 'Hendra Wijaya, S.Sos')
ON CONFLICT DO NOTHING;

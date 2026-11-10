-- Seed akun pengguna.
-- Password: admin123 / operator123 / pimpinan123 (bcrypt cost 10, khusus demo).
INSERT INTO pengguna (nama, email, password_hash, role)
VALUES
    ('Administrator', 'admin@kdo.go.id', '$2a$10$E/6TIMh4zYFpRD1NI7hEVOhGprhWEr3xVv8Z.6a5E5uNG.fYUaHeq', 'admin'),
    ('Operator Aset', 'operator@kdo.go.id', '$2a$10$qKExpLdma819uX3k03lLaO7y9EEGFT67ATOwcK2Bp7lrORfFKyav6', 'operator'),
    ('Kepala BPAD', 'pimpinan@kdo.go.id', '$2a$10$GCFo2BY.oorkwGmJw4F1ee7ho4P2UDQChJAQq9IFdJr3sFeiddAva', 'pimpinan')
ON CONFLICT DO NOTHING;

package seed

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

type opdSeed struct {
	kode, nama, singkatan, alamat, telepon, email, kepala string
}

type pegawaiSeed struct {
	nip, nama, gelarDepan, gelarBelakang, jabatan, golongan, pangkat string
	opdKode, email, telepon                                          string
	tanggalLahir                                                     time.Time
}

type kendaraanSeed struct {
	nopol, rangka, mesin, merek, tipe, warna string
	tahun, cc, odometer                      int
	jenis, bahanBakar, kondisi, status       string
	pajak, stnk                              time.Time
	opdKode, pjNIP                           string
}

type peminjamanSeed struct {
	kode, nopol, nip, opdKode          string
	keperluan, tujuan, status, catatan string
	mulai, selesai                     time.Time
	penyetujuEmail                     string
}

type servisSeed struct {
	nopol, jenis, deskripsi, bengkel string
	tanggal                          time.Time
	biaya                            float64
	odometer                         int
}

type penggunaSeed struct {
	nama, email, password, role string
}

var pengguna = []penggunaSeed{
	{"Administrator", "admin@kdo.go.id", "admin123", "admin"},
	{"Operator Aset", "operator@kdo.go.id", "operator123", "operator"},
	{"Kepala BPAD", "pimpinan@kdo.go.id", "pimpinan123", "pimpinan"},
}

var perangkatDaerah = []opdSeed{
	{"DISPENDIK", "Dinas Pendidikan", "Disdik", "Jl. Merdeka No. 1", "021-5550101", "disdik@kdo.go.id", "Drs. Bambang Sutrisno, M.Si"},
	{"DINKES", "Dinas Kesehatan", "Dinkes", "Jl. Sehat No. 12", "021-5550102", "dinkes@kdo.go.id", "dr. Ratna Dewi, M.Kes"},
	{"BPAD", "Badan Pengelolaan Keuangan dan Aset Daerah", "BPAD", "Jl. Keuangan No. 7", "021-5550103", "bpad@kdo.go.id", "Agus Setiawan, S.E., M.M"},
	{"SETDA", "Sekretariat Daerah", "Setda", "Jl. Pemerintahan No. 1", "021-5550104", "setda@kdo.go.id", "Hendra Wijaya, S.Sos"},
}

var pegawai = []pegawaiSeed{
	{"197805122006041001", "Bambang Sutrisno", "Drs.", "M.Si", "Kepala Dinas", "IV/a", "Pembina", "DISPENDIK", "bambang@kdo.go.id", "081200000001", date("1978-05-12")},
	{"198203152009012002", "Siti Rahmawati", "S.Pd", "", "Sekretaris Dinas", "III/d", "Penata Tingkat I", "DISPENDIK", "siti@kdo.go.id", "081200000002", date("1982-03-15")},
	{"199001202015031003", "Andi Prasetyo", "S.Kom", "", "Staf Umum", "III/a", "Penata Muda", "DISPENDIK", "andi@kdo.go.id", "081200000003", date("1990-01-20")},
	{"197611082005011004", "Ratna Dewi", "dr.", "M.Kes", "Kepala Dinas", "IV/b", "Pembina Tingkat I", "DINKES", "ratna@kdo.go.id", "081200000004", date("1976-11-08")},
	{"198507212011012005", "Nugroho Hadi", "S.KM", "", "Kabid Pelayanan", "III/c", "Penata", "DINKES", "nugroho@kdo.go.id", "081200000005", date("1985-07-21")},
	{"199203102017022006", "Maya Lestari", "A.Md", "", "Staf Keuangan", "II/c", "Pengatur", "DINKES", "maya@kdo.go.id", "081200000006", date("1992-03-10")},
	{"197904042006021007", "Agus Setiawan", "S.E.", "M.M", "Kepala Badan", "IV/a", "Pembina", "BPAD", "agus@kdo.go.id", "081200000007", date("1979-04-04")},
	{"198812012012011008", "Rina Kurniasih", "S.E", "", "Kasubbag Umum", "III/c", "Penata", "BPAD", "rina@kdo.go.id", "081200000008", date("1988-12-01")},
	{"199505252019031009", "Fajar Ramadhan", "S.Kom", "", "Pranata Komputer", "III/a", "Penata Muda", "BPAD", "fajar@kdo.go.id", "081200000009", date("1995-05-25")},
	{"197701152003121010", "Hendra Wijaya", "S.Sos", "", "Sekretaris Daerah", "IV/c", "Pembina Utama Muda", "SETDA", "hendra@kdo.go.id", "081200000010", date("1977-01-15")},
	{"198309182010011011", "Dewi Anggraini", "S.H", "", "Kabag Hukum", "III/d", "Penata Tingkat I", "SETDA", "dewi@kdo.go.id", "081200000011", date("1983-09-18")},
	{"199411072018012012", "Bayu Prakoso", "A.Md", "", "Staf Protokol", "II/d", "Pengatur Tingkat I", "SETDA", "bayu@kdo.go.id", "081200000012", date("1994-11-07")},
}

var kendaraan = []kendaraanSeed{
	{"B 1234 XYZ", "MHKA1BA3JKA00001", "1NR-F000001", "Toyota", "Avanza", "Silver", 2019, 1500, 48210, "minibus", "bensin", "baik", "tersedia", date("2027-02-10"), date("2027-02-10"), "DISPENDIK", "198203152009012002"},
	{"B 5678 ABC", "MH1JFB210MK00002", "JM21E000002", "Honda", "Vario 125", "Hitam", 2021, 125, 18900, "motor", "bensin", "baik", "tersedia", date("2026-12-01"), date("2026-12-01"), "DISPENDIK", "199001202015031003"},
	{"D 1122 KDO", "MHR1D5G8GJA00003", "4JK1E000003", "Isuzu", "Hilux", "Putih", 2017, 2500, 96500, "pickup", "solar", "rusak_ringan", "tersedia", date("2026-11-20"), date("2026-11-20"), "DINKES", "198507212011012005"},
	{"D 3344 KDS", "MHYEW2121PJ00004", "K15C-000004", "Suzuki", "Ertiga", "Putih", 2020, 1500, 31200, "minibus", "bensin", "baik", "digunakan", date("2027-01-15"), date("2027-01-15"), "DINKES", "199203102017022006"},
	{"AB 7788 BP", "MHFXW42G8J800005", "2KD-000005", "Toyota", "Hiace Ambulans", "Putih", 2018, 2500, 74300, "ambulans", "solar", "baik", "tersedia", date("2026-12-15"), date("2026-12-15"), "DINKES", "198507212011012005"},
	{"N 2211 KDO", "MHK1B1BE9JK00006", "4D56-000006", "Mitsubishi", "L300", "Putih", 2015, 2500, 132400, "pickup", "solar", "rusak_ringan", "perbaikan", date("2026-12-05"), date("2026-12-05"), "BPAD", "198812012012011008"},
	{"N 4455 KDO", "MH1JF2110MK00007", "JM21E000007", "Honda", "Beat", "Merah", 2022, 110, 11250, "motor", "bensin", "baik", "tersedia", date("2027-03-01"), date("2027-03-01"), "BPAD", "199505252019031009"},
	{"H 6677 ST", "MHFXW42G5K800008", "2KD-000008", "Toyota", "Innova", "Hitam", 2021, 2400, 42800, "minibus", "bensin", "baik", "digunakan", date("2027-04-10"), date("2027-04-10"), "SETDA", "198309182010011011"},
	{"H 8899 ST", "MH3SE8810LK00009", "G3E4E000009", "Yamaha", "NMAX", "Abu-abu", 2020, 155, 23400, "motor", "bensin", "baik", "tersedia", date("2026-12-20"), date("2026-12-20"), "SETDA", "199411072018012012"},
	{"L 1010 KD", "MDHNT32J1EK000010", "QR25-000010", "Nissan", "X-Trail", "Perak", 2014, 2500, 188900, "mobil", "bensin", "rusak_berat", "dihapuskan", date("2026-06-30"), date("2026-06-30"), "BPAD", "198812012012011008"},
}

var peminjaman = []peminjamanSeed{
	{"PJM-20261105-0001", "D 3344 KDS", "198507212011012005", "DINKES", "Koordinasi lintas sektor", "Kecamatan Sukamaju", "disetujui", "Disetujui untuk kegiatan dinas", datetime("2026-11-09 08:00"), datetime("2026-11-11 17:00"), "admin@kdo.go.id"},
	{"PJM-20261108-0002", "H 6677 ST", "197701152003121010", "SETDA", "Rapat koordinasi daerah", "Kantor Gubernur", "disetujui", "", datetime("2026-11-10 08:00"), datetime("2026-11-12 16:00"), "admin@kdo.go.id"},
	{"PJM-20261110-0003", "B 1234 XYZ", "199001202015031003", "DISPENDIK", "Monitoring sekolah", "Kecamatan Cendana", "diajukan", "Menunggu persetujuan pimpinan", datetime("2026-11-15 07:00"), datetime("2026-11-16 18:00"), ""},
	{"PJM-20261020-0004", "B 5678 ABC", "198203152009012002", "DISPENDIK", "Pengambilan dokumen", "Kantor Pusat", "selesai", "Sudah dikembalikan", datetime("2026-10-21 09:00"), datetime("2026-10-22 15:00"), "admin@kdo.go.id"},
	{"PJM-20261015-0005", "N 2211 KDO", "198812012012011008", "BPAD", "Pengiriman barang", "Gudang Aset", "ditolak", "Kendaraan dalam perbaikan", datetime("2026-10-16 08:00"), datetime("2026-10-17 12:00"), "pimpinan@kdo.go.id"},
	{"PJM-20261010-0006", "H 8899 ST", "198309182010011011", "SETDA", "Kunjungan lapangan", "Kecamatan Sukamaju", "dibatalkan", "Kegiatan dibatalkan", datetime("2026-10-11 08:00"), datetime("2026-10-12 17:00"), "admin@kdo.go.id"},
}

var servis = []servisSeed{
	{"B 1234 XYZ", "rutin", "Servis rutin 40.000 km, ganti oli dan filter", "Auto2000 Cempaka", date("2026-06-15"), 450000, 40100},
	{"B 1234 XYZ", "ganti_part", "Ganti kampas rem depan dan belakang", "Auto2000 Cempaka", date("2026-09-20"), 1250000, 46500},
	{"B 5678 ABC", "rutin", "Servis rutin dan ganti oli", "AHASS Jaya", date("2026-07-05"), 180000, 15000},
	{"D 1122 KDO", "perbaikan", "Perbaikan sistem pendingin dan radiator", "Isuzu Service", date("2026-08-12"), 2750000, 91200},
	{"D 3344 KDS", "rutin", "Servis 30.000 km", "Suzuki Service", date("2026-07-22"), 520000, 30000},
	{"AB 7788 BP", "perbaikan", "Perbaikan AC dan kelistrikan", "Toyota Service", date("2026-09-02"), 3100000, 72000},
	{"N 2211 KDO", "perbaikan", "Overhaul mesin dan ganti kopling", "Mitsubishi Service", date("2026-10-18"), 4800000, 131000},
	{"H 6677 ST", "rutin", "Servis rutin 40.000 km", "Auto2000 Sudirman", date("2026-08-30"), 650000, 40000},
}

// Run mengisi database dengan data contoh. Idempoten: jika data master sudah
// ada, seed dilewati. Seluruh proses dibungkus satu transaksi.
func Run(ctx context.Context, pool *pgxpool.Pool) error {
	tx, err := pool.Begin(ctx)
	if err != nil {
		return fmt.Errorf("mulai transaksi seed: %w", err)
	}
	defer tx.Rollback(ctx) //nolint:errcheck

	var existing int
	if err := tx.QueryRow(ctx, `SELECT count(*) FROM perangkat_daerah`).Scan(&existing); err != nil {
		return fmt.Errorf("cek data seed: %w", err)
	}
	if existing > 0 {
		slog.Info("seed dilewati, data sudah ada", "perangkat_daerah", existing)
		return nil
	}

	if err := seedPengguna(ctx, tx); err != nil {
		return err
	}
	if err := seedPerangkatDaerah(ctx, tx); err != nil {
		return err
	}
	if err := seedPegawai(ctx, tx); err != nil {
		return err
	}
	if err := seedKendaraan(ctx, tx); err != nil {
		return err
	}
	if err := seedPeminjaman(ctx, tx); err != nil {
		return err
	}
	if err := seedServis(ctx, tx); err != nil {
		return err
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("commit seed: %w", err)
	}
	slog.Info("seed selesai",
		"perangkat_daerah", len(perangkatDaerah),
		"pegawai", len(pegawai),
		"kendaraan", len(kendaraan),
		"peminjaman", len(peminjaman),
		"servis", len(servis),
	)
	return nil
}

func seedPengguna(ctx context.Context, tx pgx.Tx) error {
	for _, p := range pengguna {
		hash, err := bcrypt.GenerateFromPassword([]byte(p.password), bcrypt.DefaultCost)
		if err != nil {
			return fmt.Errorf("hash password %s: %w", p.email, err)
		}
		_, err = tx.Exec(ctx, `
			INSERT INTO pengguna (nama, email, password_hash, role)
			VALUES ($1, lower($2), $3, $4)
			ON CONFLICT DO NOTHING`,
			p.nama, p.email, string(hash), p.role)
		if err != nil {
			return fmt.Errorf("insert pengguna %s: %w", p.email, err)
		}
	}
	return nil
}

func seedPerangkatDaerah(ctx context.Context, tx pgx.Tx) error {
	for _, p := range perangkatDaerah {
		_, err := tx.Exec(ctx, `
			INSERT INTO perangkat_daerah (kode, nama, singkatan, alamat, telepon, email, nama_kepala)
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			ON CONFLICT DO NOTHING`,
			p.kode, p.nama, p.singkatan, p.alamat, p.telepon, p.email, p.kepala)
		if err != nil {
			return fmt.Errorf("insert perangkat daerah %s: %w", p.kode, err)
		}
	}
	return nil
}

func seedPegawai(ctx context.Context, tx pgx.Tx) error {
	for _, p := range pegawai {
		var opdID int64
		if err := tx.QueryRow(ctx,
			`SELECT id FROM perangkat_daerah WHERE kode = $1`, p.opdKode).Scan(&opdID); err != nil {
			return fmt.Errorf("cari opd %s: %w", p.opdKode, err)
		}

		_, err := tx.Exec(ctx, `
			INSERT INTO pegawai (nip, nama, gelar_depan, gelar_belakang, jabatan, golongan,
			                     pangkat, perangkat_daerah_id, email, telepon, tanggal_lahir)
			VALUES ($1, $2, NULLIF($3,''), NULLIF($4,''), $5, $6, $7, $8, $9, $10, $11)
			ON CONFLICT DO NOTHING`,
			p.nip, p.nama, p.gelarDepan, p.gelarBelakang, p.jabatan, p.golongan,
			p.pangkat, opdID, p.email, p.telepon, p.tanggalLahir)
		if err != nil {
			return fmt.Errorf("insert pegawai %s: %w", p.nip, err)
		}
	}
	return nil
}

func seedKendaraan(ctx context.Context, tx pgx.Tx) error {
	for _, k := range kendaraan {
		var opdID int64
		if err := tx.QueryRow(ctx,
			`SELECT id FROM perangkat_daerah WHERE kode = $1`, k.opdKode).Scan(&opdID); err != nil {
			return fmt.Errorf("cari opd %s: %w", k.opdKode, err)
		}

		var pjID *int64
		if k.pjNIP != "" {
			var id int64
			if err := tx.QueryRow(ctx,
				`SELECT id FROM pegawai WHERE nip = $1`, k.pjNIP).Scan(&id); err != nil {
				return fmt.Errorf("cari penanggung jawab %s: %w", k.pjNIP, err)
			}
			pjID = &id
		}

		_, err := tx.Exec(ctx, `
			INSERT INTO kendaraan (nomor_polisi, nomor_rangka, nomor_mesin, merek, tipe,
			                       tahun_produksi, warna, jenis, bahan_bakar, kapasitas_cc,
			                       odometer_km, kondisi, status, tanggal_pajak, tanggal_stnk,
			                       perangkat_daerah_id, penanggung_jawab_id)
			VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
			ON CONFLICT DO NOTHING`,
			k.nopol, k.rangka, k.mesin, k.merek, k.tipe, k.tahun, k.warna, k.jenis,
			k.bahanBakar, k.cc, k.odometer, k.kondisi, k.status, k.pajak, k.stnk,
			opdID, pjID)
		if err != nil {
			return fmt.Errorf("insert kendaraan %s: %w", k.nopol, err)
		}
	}
	return nil
}

func seedPeminjaman(ctx context.Context, tx pgx.Tx) error {
	for _, p := range peminjaman {
		var kendaraanID, pegawaiID, opdID int64
		if err := tx.QueryRow(ctx,
			`SELECT id FROM kendaraan WHERE nomor_polisi = $1`, p.nopol).Scan(&kendaraanID); err != nil {
			return fmt.Errorf("cari kendaraan %s: %w", p.nopol, err)
		}
		if err := tx.QueryRow(ctx,
			`SELECT id, perangkat_daerah_id FROM pegawai WHERE nip = $1`, p.nip).
			Scan(&pegawaiID, &opdID); err != nil {
			return fmt.Errorf("cari pegawai %s: %w", p.nip, err)
		}

		var penyetuju *int64
		if p.penyetujuEmail != "" {
			var id int64
			if err := tx.QueryRow(ctx,
				`SELECT id FROM pengguna WHERE lower(email) = lower($1)`, p.penyetujuEmail).Scan(&id); err != nil {
				return fmt.Errorf("cari penyetuju %s: %w", p.penyetujuEmail, err)
			}
			penyetuju = &id
		}

		_, err := tx.Exec(ctx, `
			INSERT INTO peminjaman (kode_peminjaman, kendaraan_id, pegawai_id, perangkat_daerah_id,
			                        keperluan, tujuan, tanggal_mulai, tanggal_selesai, status,
			                        catatan, disetujui_oleh)
			VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NULLIF($10,''),$11)
			ON CONFLICT DO NOTHING`,
			p.kode, kendaraanID, pegawaiID, opdID, p.keperluan, p.tujuan,
			p.mulai, p.selesai, p.status, p.catatan, penyetuju)
		if err != nil {
			return fmt.Errorf("insert peminjaman %s: %w", p.kode, err)
		}
	}
	return nil
}

func seedServis(ctx context.Context, tx pgx.Tx) error {
	for _, s := range servis {
		var kendaraanID int64
		if err := tx.QueryRow(ctx,
			`SELECT id FROM kendaraan WHERE nomor_polisi = $1`, s.nopol).Scan(&kendaraanID); err != nil {
			return fmt.Errorf("cari kendaraan %s: %w", s.nopol, err)
		}

		_, err := tx.Exec(ctx, `
			INSERT INTO servis (kendaraan_id, tanggal, jenis, deskripsi, bengkel, biaya, odometer_km)
			VALUES ($1,$2,$3,$4,NULLIF($5,''),$6,$7)`,
			kendaraanID, s.tanggal, s.jenis, s.deskripsi, s.bengkel, s.biaya, s.odometer)
		if err != nil {
			return fmt.Errorf("insert servis %s: %w", s.nopol, err)
		}
	}
	return nil
}

func date(v string) time.Time {
	t, err := time.Parse("2006-01-02", v)
	if err != nil {
		panic(err)
	}
	return t
}

func datetime(v string) time.Time {
	t, err := time.ParseInLocation("2006-01-02 15:04", v, time.Local)
	if err != nil {
		panic(err)
	}
	return t
}

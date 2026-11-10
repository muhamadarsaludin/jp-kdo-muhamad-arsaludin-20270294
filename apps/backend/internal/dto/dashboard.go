package dto

// DashboardStats adalah ringkasan angka untuk kartu dashboard.
type DashboardStats struct {
	TotalKendaraan      int64   `json:"total_kendaraan" example:"10"`
	Tersedia            int64   `json:"tersedia" example:"6"`
	Digunakan           int64   `json:"digunakan" example:"2"`
	Perbaikan           int64   `json:"perbaikan" example:"1"`
	Dihapuskan          int64   `json:"dihapuskan" example:"1"`
	TotalPegawai        int64   `json:"total_pegawai" example:"12"`
	TotalOpd            int64   `json:"total_opd" example:"4"`
	PeminjamanDiajukan  int64   `json:"peminjaman_diajukan" example:"1"`
	PeminjamanAktif     int64   `json:"peminjaman_aktif" example:"2"`
	BiayaServisBulanIni float64 `json:"biaya_servis_bulan_ini" example:"450000"`
	BiayaServisTotal    float64 `json:"biaya_servis_total" example:"13250000"`
}

// DashboardKondisiItem adalah jumlah kendaraan per kondisi.
type DashboardKondisiItem struct {
	Kondisi string `json:"kondisi" example:"baik"`
	Total   int64  `json:"total" example:"7"`
}

// DashboardOpdItem adalah jumlah kendaraan per perangkat daerah.
type DashboardOpdItem struct {
	Nama  string `json:"nama" example:"Dinas Pendidikan"`
	Total int64  `json:"total" example:"2"`
}

// DashboardBiayaBulananItem adalah total biaya servis per bulan.
type DashboardBiayaBulananItem struct {
	Bulan string  `json:"bulan" example:"2026-11"`
	Total float64 `json:"total" example:"1250000"`
}

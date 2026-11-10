package dto

import "time"

// PeminjamanRequest adalah payload pengajuan peminjaman.
type PeminjamanRequest struct {
	KendaraanID    int64  `json:"kendaraan_id" binding:"required,gt=0" example:"1"`
	PegawaiID      int64  `json:"pegawai_id" binding:"required,gt=0" example:"2"`
	Keperluan      string `json:"keperluan" binding:"required,max=200" example:"Monitoring sekolah"`
	Tujuan         string `json:"tujuan" binding:"required,max=200" example:"Kecamatan Cendana"`
	TanggalMulai   string `json:"tanggal_mulai" binding:"required" example:"2026-11-15T07:00:00+07:00"`
	TanggalSelesai string `json:"tanggal_selesai" binding:"required" example:"2026-11-16T18:00:00+07:00"`
	Catatan        string `json:"catatan" binding:"omitempty" example:"Membawa 3 orang"`
}

// TolakPeminjamanRequest adalah alasan penolakan (opsional).
type TolakPeminjamanRequest struct {
	Catatan string `json:"catatan" binding:"omitempty,max=500" example:"Kendaraan sedang diperbaiki"`
}

// PeminjamanResponse adalah data peminjaman untuk API.
type PeminjamanResponse struct {
	ID                   int64     `json:"id" example:"1"`
	KodePeminjaman       string    `json:"kode_peminjaman" example:"PJM-20261110-0001"`
	KendaraanID          int64     `json:"kendaraan_id" example:"1"`
	KendaraanNomorPolisi string    `json:"kendaraan_nomor_polisi" example:"B 1234 XYZ"`
	KendaraanMerek       string    `json:"kendaraan_merek" example:"Toyota"`
	KendaraanTipe        string    `json:"kendaraan_tipe" example:"Avanza"`
	PegawaiID            int64     `json:"pegawai_id" example:"3"`
	PegawaiNama          string    `json:"pegawai_nama" example:"Andi Prasetyo"`
	PerangkatDaerahID    int64     `json:"perangkat_daerah_id" example:"1"`
	PerangkatDaerahNama  string    `json:"perangkat_daerah_nama" example:"Dinas Pendidikan"`
	Keperluan            string    `json:"keperluan" example:"Monitoring sekolah"`
	Tujuan               string    `json:"tujuan" example:"Kecamatan Cendana"`
	TanggalMulai         time.Time `json:"tanggal_mulai" example:"2026-11-15T07:00:00+07:00"`
	TanggalSelesai       time.Time `json:"tanggal_selesai" example:"2026-11-16T18:00:00+07:00"`
	Status               string    `json:"status" example:"diajukan"`
	Catatan              string    `json:"catatan" example:""`
	DisetujuiOleh        *int64    `json:"disetujui_oleh" example:"1"`
	PenyetujuNama        string    `json:"penyetuju_nama" example:"Administrator"`
	CreatedAt            time.Time `json:"created_at" example:"2026-11-10T12:00:00+07:00"`
	UpdatedAt            time.Time `json:"updated_at" example:"2026-11-10T12:00:00+07:00"`
}

// PeminjamanListQuery adalah parameter list peminjaman.
type PeminjamanListQuery struct {
	Page        int
	Limit       int
	Search      string
	Status      string
	KendaraanID *int64
	PegawaiID   *int64
	Dari        *time.Time
	Sampai      *time.Time
	SortBy      string
	SortOrder   string
}

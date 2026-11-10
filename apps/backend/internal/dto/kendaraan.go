package dto

import "time"

// KendaraanRequest adalah payload tambah/ubah kendaraan.
type KendaraanRequest struct {
	NomorPolisi       string `json:"nomor_polisi" binding:"required,max=15" example:"B 1234 XYZ"`
	NomorRangka       string `json:"nomor_rangka" binding:"omitempty,max=50" example:"MHKA1BA3JKA00001"`
	NomorMesin        string `json:"nomor_mesin" binding:"omitempty,max=50" example:"1NR-F000001"`
	Merek             string `json:"merek" binding:"required,max=50" example:"Toyota"`
	Tipe              string `json:"tipe" binding:"required,max=50" example:"Avanza"`
	TahunProduksi     int    `json:"tahun_produksi" binding:"required,gte=1980,lte=2100" example:"2019"`
	Warna             string `json:"warna" binding:"required,max=30" example:"Silver"`
	Jenis             string `json:"jenis" binding:"required,oneof=motor mobil minibus pickup ambulans" example:"minibus"`
	BahanBakar        string `json:"bahan_bakar" binding:"omitempty,oneof=bensin solar listrik hybrid" example:"bensin"`
	KapasitasCC       *int   `json:"kapasitas_cc" binding:"omitempty,gte=0" example:"1500"`
	OdometerKm        int    `json:"odometer_km" binding:"gte=0" example:"48210"`
	Kondisi           string `json:"kondisi" binding:"omitempty,oneof=baik rusak_ringan rusak_berat" example:"baik"`
	Status            string `json:"status" binding:"omitempty,oneof=tersedia digunakan perbaikan dihapuskan" example:"tersedia"`
	TanggalPajak      string `json:"tanggal_pajak" binding:"omitempty" example:"2027-02-10"`
	TanggalSTNK       string `json:"tanggal_stnk" binding:"omitempty" example:"2027-02-10"`
	PerangkatDaerahID int64  `json:"perangkat_daerah_id" binding:"required,gt=0" example:"1"`
	PenanggungJawabID *int64 `json:"penanggung_jawab_id" binding:"omitempty,gt=0" example:"2"`
	FotoURL           string `json:"foto_url" binding:"omitempty" example:"https://contoh.id/foto.jpg"`
	Keterangan        string `json:"keterangan" binding:"omitempty" example:"Kendaraan operasional harian"`
}

// KendaraanResponse adalah data kendaraan untuk API.
type KendaraanResponse struct {
	ID                  int64     `json:"id" example:"1"`
	NomorPolisi         string    `json:"nomor_polisi" example:"B 1234 XYZ"`
	NomorRangka         string    `json:"nomor_rangka" example:"MHKA1BA3JKA00001"`
	NomorMesin          string    `json:"nomor_mesin" example:"1NR-F000001"`
	Merek               string    `json:"merek" example:"Toyota"`
	Tipe                string    `json:"tipe" example:"Avanza"`
	TahunProduksi       int16     `json:"tahun_produksi" example:"2019"`
	Warna               string    `json:"warna" example:"Silver"`
	Jenis               string    `json:"jenis" example:"minibus"`
	BahanBakar          string    `json:"bahan_bakar" example:"bensin"`
	KapasitasCC         *int32    `json:"kapasitas_cc" example:"1500"`
	OdometerKm          int32     `json:"odometer_km" example:"48210"`
	Kondisi             string    `json:"kondisi" example:"baik"`
	Status              string    `json:"status" example:"tersedia"`
	TanggalPajak        string    `json:"tanggal_pajak" example:"2027-02-10"`
	TanggalSTNK         string    `json:"tanggal_stnk" example:"2027-02-10"`
	PerangkatDaerahID   int64     `json:"perangkat_daerah_id" example:"1"`
	PerangkatDaerahNama string    `json:"perangkat_daerah_nama" example:"Dinas Pendidikan"`
	PenanggungJawabID   *int64    `json:"penanggung_jawab_id" example:"2"`
	PenanggungJawabNama string    `json:"penanggung_jawab_nama" example:"Siti Rahmawati"`
	FotoURL             string    `json:"foto_url" example:""`
	Keterangan          string    `json:"keterangan" example:""`
	CreatedAt           time.Time `json:"created_at" example:"2026-11-10T12:00:00+07:00"`
	UpdatedAt           time.Time `json:"updated_at" example:"2026-11-10T12:00:00+07:00"`
}

// KendaraanListQuery adalah parameter list kendaraan.
type KendaraanListQuery struct {
	Page              int
	Limit             int
	Search            string
	PerangkatDaerahID *int64
	Kondisi           string
	Status            string
	Jenis             string
	Tahun             *int
	SortBy            string
	SortOrder         string
}

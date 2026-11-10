package dto

import "time"

// ServisRequest adalah payload tambah/ubah riwayat servis.
type ServisRequest struct {
	Tanggal    string  `json:"tanggal" binding:"required" example:"2026-11-01"`
	Jenis      string  `json:"jenis" binding:"required,oneof=rutin perbaikan ganti_part" example:"rutin"`
	Deskripsi  string  `json:"deskripsi" binding:"required" example:" Servis rutin 50.000 km"`
	Bengkel    string  `json:"bengkel" binding:"omitempty,max=100" example:"Auto2000"`
	Biaya      float64 `json:"biaya" binding:"gte=0" example:"450000"`
	OdometerKm *int    `json:"odometer_km" binding:"omitempty,gte=0" example:"50000"`
}

// ServisResponse adalah data servis untuk API.
type ServisResponse struct {
	ID          int64     `json:"id" example:"1"`
	KendaraanID int64     `json:"kendaraan_id" example:"1"`
	NomorPolisi string    `json:"nomor_polisi" example:"B 1234 XYZ"`
	Merek       string    `json:"merek" example:"Toyota"`
	Tanggal     string    `json:"tanggal" example:"2026-11-01"`
	Jenis       string    `json:"jenis" example:"rutin"`
	Deskripsi   string    `json:"deskripsi" example:"Servis rutin 50.000 km"`
	Bengkel     string    `json:"bengkel" example:"Auto2000"`
	Biaya       float64   `json:"biaya" example:"450000"`
	OdometerKm  *int32    `json:"odometer_km" example:"50000"`
	CreatedAt   time.Time `json:"created_at" example:"2026-11-10T12:00:00+07:00"`
	UpdatedAt   time.Time `json:"updated_at" example:"2026-11-10T12:00:00+07:00"`
}

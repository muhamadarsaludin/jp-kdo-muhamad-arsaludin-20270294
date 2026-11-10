package dto

import "time"

// PegawaiRequest adalah payload tambah/ubah pegawai.
type PegawaiRequest struct {
	NIP               string `json:"nip" binding:"required,len=18,numeric" example:"198203152009012002"`
	Nama              string `json:"nama" binding:"required,max=100" example:"Siti Rahmawati"`
	GelarDepan        string `json:"gelar_depan" binding:"omitempty,max=20" example:"S.Pd"`
	GelarBelakang     string `json:"gelar_belakang" binding:"omitempty,max=30"`
	Jabatan           string `json:"jabatan" binding:"required,max=100" example:"Sekretaris Dinas"`
	Golongan          string `json:"golongan" binding:"required" example:"III/d"`
	Pangkat           string `json:"pangkat" binding:"omitempty,max=50" example:"Penata Tingkat I"`
	PerangkatDaerahID int64  `json:"perangkat_daerah_id" binding:"required,gt=0" example:"1"`
	Email             string `json:"email" binding:"omitempty,email,max=100" example:"siti@kdo.go.id"`
	Telepon           string `json:"telepon" binding:"omitempty,max=20" example:"081200000002"`
	TanggalLahir      string `json:"tanggal_lahir" binding:"omitempty" example:"1982-03-15"`
	StatusPegawai     string `json:"status_pegawai" binding:"omitempty,oneof=aktif nonaktif pensiun" example:"aktif"`
}

// PegawaiResponse adalah data pegawai untuk API.
type PegawaiResponse struct {
	ID                  int64     `json:"id" example:"1"`
	NIP                 string    `json:"nip" example:"198203152009012002"`
	Nama                string    `json:"nama" example:"Siti Rahmawati"`
	GelarDepan          string    `json:"gelar_depan" example:"S.Pd"`
	GelarBelakang       string    `json:"gelar_belakang" example:""`
	Jabatan             string    `json:"jabatan" example:"Sekretaris Dinas"`
	Golongan            string    `json:"golongan" example:"III/d"`
	Pangkat             string    `json:"pangkat" example:"Penata Tingkat I"`
	PerangkatDaerahID   int64     `json:"perangkat_daerah_id" example:"1"`
	PerangkatDaerahNama string    `json:"perangkat_daerah_nama" example:"Dinas Pendidikan"`
	Email               string    `json:"email" example:"siti@kdo.go.id"`
	Telepon             string    `json:"telepon" example:"081200000002"`
	TanggalLahir        string    `json:"tanggal_lahir" example:"1982-03-15"`
	StatusPegawai       string    `json:"status_pegawai" example:"aktif"`
	CreatedAt           time.Time `json:"created_at" example:"2026-11-10T12:00:00+07:00"`
	UpdatedAt           time.Time `json:"updated_at" example:"2026-11-10T12:00:00+07:00"`
}

// PegawaiListQuery adalah parameter list pegawai.
type PegawaiListQuery struct {
	Page              int
	Limit             int
	Search            string
	PerangkatDaerahID *int64
	Golongan          string
	StatusPegawai     string
	SortBy            string
	SortOrder         string
}

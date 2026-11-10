package dto

import "time"

// PerangkatDaerahRequest adalah payload tambah/ubah perangkat daerah.
type PerangkatDaerahRequest struct {
	Kode       string `json:"kode" binding:"required,max=20" example:"DISPENDIK"`
	Nama       string `json:"nama" binding:"required,max=150" example:"Dinas Pendidikan"`
	Singkatan  string `json:"singkatan" binding:"omitempty,max=30" example:"Disdik"`
	Alamat     string `json:"alamat" example:"Jl. Merdeka No. 1"`
	Telepon    string `json:"telepon" binding:"omitempty,max=20" example:"021-5550101"`
	Email      string `json:"email" binding:"omitempty,email,max=100" example:"disdik@kdo.go.id"`
	NamaKepala string `json:"nama_kepala" binding:"omitempty,max=100" example:"Drs. Bambang Sutrisno, M.Si"`
	IsActive   *bool  `json:"is_active" example:"true"`
}

// PerangkatDaerahResponse adalah data perangkat daerah untuk API.
type PerangkatDaerahResponse struct {
	ID         int64     `json:"id" example:"1"`
	Kode       string    `json:"kode" example:"DISPENDIK"`
	Nama       string    `json:"nama" example:"Dinas Pendidikan"`
	Singkatan  string    `json:"singkatan" example:"Disdik"`
	Alamat     string    `json:"alamat" example:"Jl. Merdeka No. 1"`
	Telepon    string    `json:"telepon" example:"021-5550101"`
	Email      string    `json:"email" example:"disdik@kdo.go.id"`
	NamaKepala string    `json:"nama_kepala" example:"Drs. Bambang Sutrisno, M.Si"`
	IsActive   bool      `json:"is_active" example:"true"`
	CreatedAt  time.Time `json:"created_at" example:"2026-11-10T12:00:00+07:00"`
	UpdatedAt  time.Time `json:"updated_at" example:"2026-11-10T12:00:00+07:00"`
}

// PerangkatDaerahListQuery adalah parameter list perangkat daerah.
type PerangkatDaerahListQuery struct {
	Page      int
	Limit     int
	Search    string
	IsActive  *bool
	SortBy    string
	SortOrder string
}

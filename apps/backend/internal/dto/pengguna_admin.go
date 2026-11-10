package dto

import "time"

// PenggunaRequest adalah payload tambah/ubah akun.
type PenggunaRequest struct {
	Nama     string `json:"nama" binding:"required,max=100" example:"Operator Aset"`
	Email    string `json:"email" binding:"required,email,max=100" example:"operator2@kdo.go.id"`
	Password string `json:"password" binding:"omitempty,min=8" example:"rahasia123"`
	Role     string `json:"role" binding:"required,oneof=admin operator pimpinan" example:"operator"`
	IsActive *bool  `json:"is_active" example:"true"`
}

// PenggunaAdminResponse adalah data akun untuk API.
type PenggunaAdminResponse struct {
	ID        int64     `json:"id" example:"4"`
	Nama      string    `json:"nama" example:"Operator Aset"`
	Email     string    `json:"email" example:"operator2@kdo.go.id"`
	Role      string    `json:"role" example:"operator"`
	IsActive  bool      `json:"is_active" example:"true"`
	CreatedAt time.Time `json:"created_at" example:"2026-11-10T12:00:00+07:00"`
	UpdatedAt time.Time `json:"updated_at" example:"2026-11-10T12:00:00+07:00"`
}

// PenggunaListQuery adalah parameter list akun.
type PenggunaListQuery struct {
	Page     int
	Limit    int
	Search   string
	Role     string
	IsActive *bool
}

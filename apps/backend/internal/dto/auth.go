package dto

import "time"

// LoginRequest adalah payload login.
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email" example:"admin@kdo.go.id"`
	Password string `json:"password" binding:"required,min=6" example:"admin123"`
}

// PenggunaResponse adalah data pengguna yang aman ditampilkan.
type PenggunaResponse struct {
	ID    int64  `json:"id" example:"1"`
	Nama  string `json:"nama" example:"Administrator"`
	Email string `json:"email" example:"admin@kdo.go.id"`
	Role  string `json:"role" example:"admin"`
}

// LoginResponse adalah hasil login yang berhasil.
type LoginResponse struct {
	Token     string           `json:"token" example:"eyJhbGciOi..."`
	ExpiresAt time.Time        `json:"expires_at" example:"2026-11-10T22:00:00+07:00"`
	User      PenggunaResponse `json:"user"`
}

package service

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"golang.org/x/crypto/bcrypt"

	"kdo/backend/internal/auth"
	"kdo/backend/internal/database/sqlc"
	"kdo/backend/internal/dto"
	"kdo/backend/internal/repository"
)

var (
	// ErrInvalidCredentials dipakai untuk email salah maupun password salah,
	// agar tidak membocorkan akun mana yang terdaftar.
	ErrInvalidCredentials = errors.New("email atau password salah")
	// ErrInactiveAccount dikembalikan bila akun dinonaktifkan.
	ErrInactiveAccount = errors.New("akun tidak aktif")
)

// AuthService menangani aturan bisnis autentikasi.
type AuthService struct {
	pengguna *repository.PenggunaRepository
	jwt      *auth.Manager
}

// NewAuthService membuat service autentikasi.
func NewAuthService(pengguna *repository.PenggunaRepository, jwt *auth.Manager) *AuthService {
	return &AuthService{pengguna: pengguna, jwt: jwt}
}

// Login memverifikasi kredensial dan menerbitkan token.
func (s *AuthService) Login(ctx context.Context, req dto.LoginRequest) (*dto.LoginResponse, error) {
	email := strings.ToLower(strings.TrimSpace(req.Email))

	pengguna, err := s.pengguna.FindByEmail(ctx, email)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			return nil, ErrInvalidCredentials
		}
		return nil, fmt.Errorf("login: %w", err)
	}

	if err := bcrypt.CompareHashAndPassword([]byte(pengguna.PasswordHash), []byte(req.Password)); err != nil {
		return nil, ErrInvalidCredentials
	}

	if !pengguna.IsActive {
		return nil, ErrInactiveAccount
	}

	token, expiresAt, err := s.jwt.Generate(pengguna.ID, pengguna.Role)
	if err != nil {
		return nil, fmt.Errorf("terbitkan token: %w", err)
	}

	return &dto.LoginResponse{
		Token:     token,
		ExpiresAt: expiresAt,
		User:      toPenggunaResponse(pengguna),
	}, nil
}

// Me mengambil profil pengguna aktif berdasarkan id dari token.
func (s *AuthService) Me(ctx context.Context, id int64) (*dto.PenggunaResponse, error) {
	pengguna, err := s.pengguna.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			return nil, repository.ErrNotFound
		}
		return nil, fmt.Errorf("ambil profil: %w", err)
	}

	res := toPenggunaResponse(pengguna)
	return &res, nil
}

func toPenggunaResponse(p sqlc.Pengguna) dto.PenggunaResponse {
	return dto.PenggunaResponse{
		ID:    p.ID,
		Nama:  p.Nama,
		Email: p.Email,
		Role:  p.Role,
	}
}

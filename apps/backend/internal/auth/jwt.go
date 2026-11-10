package auth

import (
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// ErrInvalidToken dikembalikan bila token tidak valid atau kedaluwarsa.
var ErrInvalidToken = errors.New("token tidak valid")

// Claims adalah isi payload JWT.
type Claims struct {
	PenggunaID int64  `json:"uid"`
	Role       string `json:"role"`
	jwt.RegisteredClaims
}

// Manager membuat dan memverifikasi JWT.
type Manager struct {
	secret []byte
	ttl    time.Duration
	issuer string
}

// NewManager membuat manager JWT dengan masa berlaku tertentu.
func NewManager(secret string, ttl time.Duration) *Manager {
	if ttl <= 0 {
		ttl = 12 * time.Hour
	}
	return &Manager{
		secret: []byte(secret),
		ttl:    ttl,
		issuer: "kdo-api",
	}
}

// TTL mengembalikan masa berlaku token.
func (m *Manager) TTL() time.Duration {
	return m.ttl
}

// Generate membuat token untuk pengguna.
func (m *Manager) Generate(penggunaID int64, role string) (string, time.Time, error) {
	now := time.Now()
	expiresAt := now.Add(m.ttl)

	claims := Claims{
		PenggunaID: penggunaID,
		Role:       role,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    m.issuer,
			Subject:   fmt.Sprintf("%d", penggunaID),
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(expiresAt),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := token.SignedString(m.secret)
	if err != nil {
		return "", time.Time{}, fmt.Errorf("tanda tangani token: %w", err)
	}
	return signed, expiresAt, nil
}

// Parse memvalidasi token dan mengembalikan claims.
func (m *Manager) Parse(raw string) (*Claims, error) {
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(
		raw,
		claims,
		func(t *jwt.Token) (any, error) {
			if t.Method.Alg() != jwt.SigningMethodHS256.Alg() {
				return nil, ErrInvalidToken
			}
			return m.secret, nil
		},
		jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}),
		jwt.WithIssuer(m.issuer),
	)
	if err != nil || !token.Valid {
		return nil, ErrInvalidToken
	}

	return claims, nil
}

package auth

import (
	"testing"
	"time"
)

func TestGenerateAndParse(t *testing.T) {
	m := NewManager("rahasia-uji-yang-cukup-panjang", time.Hour)

	token, expiresAt, err := m.Generate(7, "admin")
	if err != nil {
		t.Fatalf("generate: %v", err)
	}
	if token == "" {
		t.Fatal("token kosong")
	}
	if time.Until(expiresAt) <= 0 {
		t.Fatal("expiry tidak masuk akal")
	}

	claims, err := m.Parse(token)
	if err != nil {
		t.Fatalf("parse: %v", err)
	}
	if claims.PenggunaID != 7 {
		t.Errorf("pengguna id = %d, want 7", claims.PenggunaID)
	}
	if claims.Role != "admin" {
		t.Errorf("role = %q, want admin", claims.Role)
	}
}

func TestParseRejectsInvalidToken(t *testing.T) {
	m := NewManager("rahasia-uji-yang-cukup-panjang", time.Hour)

	if _, err := m.Parse("bukan.token.valid"); err == nil {
		t.Fatal("token invalid seharusnya ditolak")
	}
}

func TestParseRejectsWrongSecret(t *testing.T) {
	issuer := NewManager("secret-satu-yang-cukup-panjang", time.Hour)
	verifier := NewManager("secret-dua-yang-cukup-panjang", time.Hour)

	token, _, err := issuer.Generate(1, "operator")
	if err != nil {
		t.Fatalf("generate: %v", err)
	}

	if _, err := verifier.Parse(token); err == nil {
		t.Fatal("token dengan secret berbeda seharusnya ditolak")
	}
}

package service

import (
	"errors"
	"testing"
)

func TestParseWaktu(t *testing.T) {
	valid := []string{
		"2026-11-15T07:00:00+07:00",
		"2026-11-15T07:00",
		"2026-11-15 07:00",
	}
	for _, v := range valid {
		if _, err := parseWaktu(v, "tanggal_mulai"); err != nil {
			t.Errorf("%q seharusnya valid: %v", v, err)
		}
	}

	invalid := []string{"", "15-11-2026", "besok pagi"}
	for _, v := range invalid {
		if _, err := parseWaktu(v, "tanggal_mulai"); !errors.Is(err, ErrValidation) {
			t.Errorf("%q: err = %v, want ErrValidation", v, err)
		}
	}
}

func TestNormalisasiSortPeminjaman(t *testing.T) {
	cases := []struct {
		inBy, inOrder   string
		wantBy, wantOrd string
	}{
		{"", "", "tanggal_mulai", "desc"},
		{"kode_peminjaman", "asc", "kode_peminjaman", "asc"},
		{"created_at", "aneh", "created_at", "desc"},
		{"drop table", "asc", "tanggal_mulai", "asc"},
	}

	for _, c := range cases {
		by, order := normalisasiSortPeminjaman(c.inBy, c.inOrder)
		if by != c.wantBy || order != c.wantOrd {
			t.Errorf("normalisasi(%q,%q) = (%q,%q), want (%q,%q)",
				c.inBy, c.inOrder, by, order, c.wantBy, c.wantOrd)
		}
	}
}

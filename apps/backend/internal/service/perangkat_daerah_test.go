package service

import (
	"errors"
	"testing"

	"kdo/backend/internal/dto"
)

func TestBuildUpsertParamsNormalisasi(t *testing.T) {
	params, err := buildUpsertParams(dto.PerangkatDaerahRequest{
		Kode:     "  dispendik ",
		Nama:     "  Dinas Pendidikan ",
		Email:    " DISDIK@KDO.GO.ID ",
		IsActive: nil,
	}, true)
	if err != nil {
		t.Fatalf("tidak expect error: %v", err)
	}

	if params.Kode != "DISPENDIK" {
		t.Errorf("kode = %q, want DISPENDIK", params.Kode)
	}
	if params.Nama != "Dinas Pendidikan" {
		t.Errorf("nama = %q", params.Nama)
	}
	if params.Email != "disdik@kdo.go.id" {
		t.Errorf("email = %q", params.Email)
	}
	if !params.IsActive {
		t.Error("is_active seharusnya true")
	}
}

func TestBuildUpsertParamsMenolakKodeKosong(t *testing.T) {
	_, err := buildUpsertParams(dto.PerangkatDaerahRequest{
		Kode: "   ",
		Nama: "Dinas",
	}, true)

	if !errors.Is(err, ErrValidation) {
		t.Fatalf("err = %v, want ErrValidation", err)
	}
}

func TestNormalisasiSort(t *testing.T) {
	cases := []struct {
		inBy, inOrder   string
		wantBy, wantOrd string
	}{
		{"nama", "desc", "nama", "desc"},
		{"KODE", "ASC", "kode", "asc"},
		{"drop table", "desc", "nama", "desc"},
		{"created_at", "aneh", "created_at", "asc"},
	}

	for _, c := range cases {
		by, order := normalisasiSort(c.inBy, c.inOrder)
		if by != c.wantBy || order != c.wantOrd {
			t.Errorf("normalisasiSort(%q, %q) = (%q, %q), want (%q, %q)",
				c.inBy, c.inOrder, by, order, c.wantBy, c.wantOrd)
		}
	}
}

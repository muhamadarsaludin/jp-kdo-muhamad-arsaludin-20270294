package service

import (
	"errors"
	"testing"

	"kdo/backend/internal/dto"
)

func validPegawaiRequest() dto.PegawaiRequest {
	return dto.PegawaiRequest{
		NIP:               "199001202015031003",
		Nama:              "Andi Prasetyo",
		Jabatan:           "Staf Umum",
		Golongan:          "III/a",
		PerangkatDaerahID: 1,
		TanggalLahir:      "1990-01-20",
	}
}

func TestBuildUpsertPegawaiValid(t *testing.T) {
	req := validPegawaiRequest()
	req.Nama = "  Andi Prasetyo "
	req.Email = " ANDI@KDO.GO.ID "

	params, err := buildUpsertPegawai(req)
	if err != nil {
		t.Fatalf("tidak expect error: %v", err)
	}

	if params.NIP != "199001202015031003" {
		t.Errorf("nip = %q", params.NIP)
	}
	if params.Nama != "Andi Prasetyo" {
		t.Errorf("nama = %q", params.Nama)
	}
	if params.Email != "andi@kdo.go.id" {
		t.Errorf("email = %q", params.Email)
	}
	if params.StatusPegawai != "aktif" {
		t.Errorf("status = %q, want aktif", params.StatusPegawai)
	}
	if !params.TanggalLahir.Valid {
		t.Error("tanggal lahir seharusnya valid")
	}
}

func TestBuildUpsertPegawaiMenolakNIP(t *testing.T) {
	cases := []string{"123", "19900120201503100X", "1990012020150310033"}

	for _, nip := range cases {
		req := validPegawaiRequest()
		req.NIP = nip
		if _, err := buildUpsertPegawai(req); !errors.Is(err, ErrValidation) {
			t.Errorf("NIP %q: err = %v, want ErrValidation", nip, err)
		}
	}
}

func TestBuildUpsertPegawaiMenolakGolongan(t *testing.T) {
	req := validPegawaiRequest()
	req.Golongan = "V/a"

	if _, err := buildUpsertPegawai(req); !errors.Is(err, ErrValidation) {
		t.Fatalf("err = %v, want ErrValidation", err)
	}
}

func TestBuildUpsertPegawaiMenolakTanggal(t *testing.T) {
	req := validPegawaiRequest()
	req.TanggalLahir = "20-01-1990"

	if _, err := buildUpsertPegawai(req); !errors.Is(err, ErrValidation) {
		t.Fatalf("err = %v, want ErrValidation", err)
	}
}

func TestBuildUpsertPegawaiMenolakStatus(t *testing.T) {
	req := validPegawaiRequest()
	req.StatusPegawai = "cuti"

	if _, err := buildUpsertPegawai(req); !errors.Is(err, ErrValidation) {
		t.Fatalf("err = %v, want ErrValidation", err)
	}
}

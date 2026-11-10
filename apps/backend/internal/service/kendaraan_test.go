package service

import (
	"errors"
	"testing"

	"kdo/backend/internal/dto"
)

func validKendaraanRequest() dto.KendaraanRequest {
	return dto.KendaraanRequest{
		NomorPolisi:       "B 1234 XYZ",
		Merek:             "Toyota",
		Tipe:              "Avanza",
		TahunProduksi:     2019,
		Warna:             "Silver",
		Jenis:             "minibus",
		OdometerKm:        48210,
		PerangkatDaerahID: 1,
	}
}

func TestBuildKendaraanParamsNormalisasi(t *testing.T) {
	req := validKendaraanRequest()
	req.NomorPolisi = "  b   1234   xyz "
	req.Status = ""

	params, err := buildKendaraanParams(req)
	if err != nil {
		t.Fatalf("tidak expect error: %v", err)
	}

	if params.NomorPolisi != "B 1234 XYZ" {
		t.Errorf("nomor polisi = %q, want B 1234 XYZ", params.NomorPolisi)
	}
	if params.Status != "tersedia" {
		t.Errorf("status = %q, want tersedia", params.Status)
	}
	if params.Kondisi != "baik" {
		t.Errorf("kondisi = %q, want baik", params.Kondisi)
	}
	if params.BahanBakar != "bensin" {
		t.Errorf("bahan bakar = %q, want bensin", params.BahanBakar)
	}
}

func TestBuildKendaraanParamsMenolakNopol(t *testing.T) {
	for _, nopol := range []string{"", "B1234XYZ", "1234 XYZ", "B 1234"} {
		req := validKendaraanRequest()
		req.NomorPolisi = nopol
		if _, err := buildKendaraanParams(req); !errors.Is(err, ErrValidation) {
			t.Errorf("nopol %q: err = %v, want ErrValidation", nopol, err)
		}
	}
}

func TestBuildKendaraanParamsMenolakTahun(t *testing.T) {
	req := validKendaraanRequest()
	req.TahunProduksi = 1970

	if _, err := buildKendaraanParams(req); !errors.Is(err, ErrValidation) {
		t.Fatalf("err = %v, want ErrValidation", err)
	}
}

func TestBuildKendaraanParamsMenolakEnum(t *testing.T) {
	cases := []func(*dto.KendaraanRequest){
		func(r *dto.KendaraanRequest) { r.Jenis = "pesawat" },
		func(r *dto.KendaraanRequest) { r.Status = "hilang" },
		func(r *dto.KendaraanRequest) { r.Kondisi = "rusak_parah" },
		func(r *dto.KendaraanRequest) { r.BahanBakar = "nuklir" },
	}

	for i, ubah := range cases {
		req := validKendaraanRequest()
		ubah(&req)
		if _, err := buildKendaraanParams(req); !errors.Is(err, ErrValidation) {
			t.Errorf("kasus %d: err = %v, want ErrValidation", i, err)
		}
	}
}

func TestBuildKendaraanParamsMenolakTanggal(t *testing.T) {
	req := validKendaraanRequest()
	req.TanggalPajak = "10-02-2027"

	if _, err := buildKendaraanParams(req); !errors.Is(err, ErrValidation) {
		t.Fatalf("err = %v, want ErrValidation", err)
	}
}

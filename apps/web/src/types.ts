export type Role = "admin" | "operator" | "pimpinan";

export interface Pengguna {
  id: number;
  nama: string;
  email: string;
  role: Role;
}

export interface Envelope<T> {
  data: T;
  meta?: Meta;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface DashboardStats {
  total_kendaraan: number;
  tersedia: number;
  digunakan: number;
  perbaikan: number;
  dihapuskan: number;
  total_pegawai: number;
  total_opd: number;
  peminjaman_diajukan: number;
  peminjaman_aktif: number;
  biaya_servis_bulan_ini: number;
  biaya_servis_total: number;
}

export interface KondisiItem {
  kondisi: string;
  total: number;
}

export interface BiayaBulananItem {
  bulan: string;
  total: number;
}

export interface Peminjaman {
  id: number;
  kode_peminjaman: string;
  kendaraan_id: number;
  kendaraan_nomor_polisi: string;
  kendaraan_merek: string;
  kendaraan_tipe: string;
  pegawai_id: number;
  pegawai_nama: string;
  perangkat_daerah_id: number;
  perangkat_daerah_nama: string;
  keperluan: string;
  tujuan: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status: "diajukan" | "disetujui" | "ditolak" | "selesai" | "dibatalkan";
  catatan: string;
  penyetuju_nama: string;
}

export interface LoginResult {
  token: string;
  expires_at: string;
  user: Pengguna;
}

export interface Kendaraan {
  id: number;
  nomor_polisi: string;
  nomor_rangka: string;
  nomor_mesin: string;
  merek: string;
  tipe: string;
  tahun_produksi: number;
  warna: string;
  jenis: "motor" | "mobil" | "minibus" | "pickup" | "ambulans";
  bahan_bakar: "bensin" | "solar" | "listrik" | "hybrid";
  kapasitas_cc: number | null;
  odometer_km: number;
  kondisi: "baik" | "rusak_ringan" | "rusak_berat";
  status: "tersedia" | "digunakan" | "perbaikan" | "dihapuskan";
  tanggal_pajak: string;
  tanggal_stnk: string;
  perangkat_daerah_id: number;
  perangkat_daerah_nama: string;
  penanggung_jawab_id: number | null;
  penanggung_jawab_nama: string;
  foto_url: string;
  keterangan: string;
}

export interface OpsiOpd {
  id: number;
  kode: string;
  nama: string;
}

export interface OpsiPegawai {
  id: number;
  nip: string;
  nama: string;
}

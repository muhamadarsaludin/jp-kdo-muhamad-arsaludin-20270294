import { Badge, Button, Card, EmptyState, Input, Modal, Skeleton, Table } from "@kdo/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { api, pesanError } from "@/lib/api";
import type { Envelope, Kendaraan, OpsiOpd, OpsiPegawai } from "@/types";

const PAGE_SIZE = 10;

const statusColor: Record<Kendaraan["status"], "green" | "blue" | "yellow" | "red"> = {
  tersedia: "green",
  digunakan: "blue",
  perbaikan: "yellow",
  dihapuskan: "red",
};

const kondisiColor: Record<Kendaraan["kondisi"], "green" | "yellow" | "red"> = {
  baik: "green",
  rusak_ringan: "yellow",
  rusak_berat: "red",
};

const labelStatus: Record<Kendaraan["status"], string> = {
  tersedia: "Tersedia",
  digunakan: "Digunakan",
  perbaikan: "Perbaikan",
  dihapuskan: "Dihapuskan",
};

const labelKondisi: Record<Kendaraan["kondisi"], string> = {
  baik: "Baik",
  rusak_ringan: "Rusak ringan",
  rusak_berat: "Rusak berat",
};

interface FormState {
  nomor_polisi: string;
  merek: string;
  tipe: string;
  tahun_produksi: string;
  warna: string;
  jenis: string;
  bahan_bakar: string;
  kapasitas_cc: string;
  odometer_km: string;
  kondisi: string;
  status: string;
  tanggal_pajak: string;
  tanggal_stnk: string;
  perangkat_daerah_id: string;
  penanggung_jawab_id: string;
  keterangan: string;
}

function formKosong(): FormState {
  return {
    nomor_polisi: "",
    merek: "",
    tipe: "",
    tahun_produksi: String(new Date().getFullYear()),
    warna: "",
    jenis: "mobil",
    bahan_bakar: "bensin",
    kapasitas_cc: "",
    odometer_km: "0",
    kondisi: "baik",
    status: "tersedia",
    tanggal_pajak: "",
    tanggal_stnk: "",
    perangkat_daerah_id: "",
    penanggung_jawab_id: "",
    keterangan: "",
  };
}

function formDari(k: Kendaraan): FormState {
  return {
    nomor_polisi: k.nomor_polisi,
    merek: k.merek,
    tipe: k.tipe,
    tahun_produksi: String(k.tahun_produksi),
    warna: k.warna,
    jenis: k.jenis,
    bahan_bakar: k.bahan_bakar,
    kapasitas_cc: k.kapasitas_cc == null ? "" : String(k.kapasitas_cc),
    odometer_km: String(k.odometer_km),
    kondisi: k.kondisi,
    status: k.status,
    tanggal_pajak: k.tanggal_pajak,
    tanggal_stnk: k.tanggal_stnk,
    perangkat_daerah_id: String(k.perangkat_daerah_id),
    penanggung_jawab_id: k.penanggung_jawab_id == null ? "" : String(k.penanggung_jawab_id),
    keterangan: k.keterangan,
  };
}

function payloadDari(form: FormState): Record<string, unknown> {
  return {
    nomor_polisi: form.nomor_polisi,
    merek: form.merek,
    tipe: form.tipe,
    tahun_produksi: Number(form.tahun_produksi),
    warna: form.warna,
    jenis: form.jenis,
    bahan_bakar: form.bahan_bakar,
    kapasitas_cc: form.kapasitas_cc ? Number(form.kapasitas_cc) : undefined,
    odometer_km: Number(form.odometer_km || 0),
    kondisi: form.kondisi,
    status: form.status,
    tanggal_pajak: form.tanggal_pajak,
    tanggal_stnk: form.tanggal_stnk,
    perangkat_daerah_id: Number(form.perangkat_daerah_id),
    penanggung_jawab_id: form.penanggung_jawab_id ? Number(form.penanggung_jawab_id) : undefined,
    keterangan: form.keterangan,
  };
}

const inputSelect =
  "h-9 w-full rounded-lg border border-secondary bg-primary px-3 text-sm text-primary outline-none focus:ring-2 focus:ring-brand-primary/40";

export function KendaraanPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [status, setStatus] = useState("");
  const [kondisi, setKondisi] = useState("");

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Kendaraan | null>(null);
  const [hapus, setHapus] = useState<Kendaraan | null>(null);
  const [form, setForm] = useState<FormState>(formKosong);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounced(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const list = useQuery({
    queryKey: ["kendaraan", page, searchDebounced, status, kondisi],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });
      if (searchDebounced) params.set("search", searchDebounced);
      if (status) params.set("status", status);
      if (kondisi) params.set("kondisi", kondisi);
      const res = await api.get<Envelope<Kendaraan[]>>(`/kendaraan?${params.toString()}`);
      return res.data;
    },
  });

  const opd = useQuery({
    queryKey: ["opsi", "opd"],
    queryFn: async () => {
      const res = await api.get<Envelope<OpsiOpd[]>>("/perangkat-daerah?limit=100&is_active=true");
      return res.data.data;
    },
  });

  const pegawai = useQuery({
    queryKey: ["opsi", "pegawai"],
    queryFn: async () => {
      const res = await api.get<Envelope<OpsiPegawai[]>>("/pegawai?limit=100&status=aktif");
      return res.data.data;
    },
  });

  const simpan = useMutation({
    mutationFn: async () => {
      const payload = payloadDari(form);
      if (editing) {
        await api.put(`/kendaraan/${editing.id}`, payload);
      } else {
        await api.post("/kendaraan", payload);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["kendaraan"] });
      setOpen(false);
      setError("");
    },
    onError: (err) => setError(pesanError(err)),
  });

  const hapusMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/kendaraan/${id}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["kendaraan"] });
      setHapus(null);
    },
    onError: (err) => setError(pesanError(err)),
  });

  const bukaTambah = () => {
    setEditing(null);
    setForm(formKosong());
    setError("");
    setOpen(true);
  };

  const bukaEdit = (k: Kendaraan) => {
    setEditing(k);
    setForm(formDari(k));
    setError("");
    setOpen(true);
  };

  const ubah = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const meta = list.data?.meta;
  const items = list.data?.data ?? [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-semibold text-2xl text-primary">Kendaraan Dinas</h1>
          <p className="mt-1 text-tertiary text-sm">Kelola data kendaraan operasional.</p>
        </div>
        <Button onClick={bukaTambah}>
          <Plus className="size-4" /> Tambah Kendaraan
        </Button>
      </div>

      <Card className="rounded-2xl">
        <Card.Content className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <div className="min-w-56 flex-1">
              <Input
                placeholder="Cari nomor polisi, merek, tipe…"
                value={search}
                onValueChange={setSearch}
                startContent={<Search className="size-4 text-tertiary" />}
              />
            </div>
            <select
              className={`${inputSelect} w-auto min-w-36`}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Semua status</option>
              <option value="tersedia">Tersedia</option>
              <option value="digunakan">Digunakan</option>
              <option value="perbaikan">Perbaikan</option>
              <option value="dihapuskan">Dihapuskan</option>
            </select>
            <select
              className={`${inputSelect} w-auto min-w-36`}
              value={kondisi}
              onChange={(e) => setKondisi(e.target.value)}
            >
              <option value="">Semua kondisi</option>
              <option value="baik">Baik</option>
              <option value="rusak_ringan">Rusak ringan</option>
              <option value="rusak_berat">Rusak berat</option>
            </select>
          </div>

          {list.isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : list.isError ? (
            <EmptyState title="Gagal memuat data" description={pesanError(list.error)} />
          ) : items.length === 0 ? (
            <EmptyState
              title="Belum ada kendaraan"
              description="Tambahkan kendaraan pertama untuk memulai."
            />
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Nomor Polisi</Table.Head>
                  <Table.Head>Kendaraan</Table.Head>
                  <Table.Head>Tahun</Table.Head>
                  <Table.Head>Perangkat Daerah</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Kondisi</Table.Head>
                  <Table.Head className="text-right">Aksi</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {items.map((k) => (
                  <Table.Row key={k.id}>
                    <Table.Cell className="font-medium text-primary">{k.nomor_polisi}</Table.Cell>
                    <Table.Cell>
                      <p className="text-primary">
                        {k.merek} {k.tipe}
                      </p>
                      <p className="text-tertiary text-xs">{k.jenis}</p>
                    </Table.Cell>
                    <Table.Cell className="tabular-nums">{k.tahun_produksi}</Table.Cell>
                    <Table.Cell className="text-secondary">{k.perangkat_daerah_nama}</Table.Cell>
                    <Table.Cell>
                      <Badge color={statusColor[k.status]} variant="subtle" size="sm">
                        {labelStatus[k.status]}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color={kondisiColor[k.kondisi]} variant="subtle" size="sm">
                        {labelKondisi[k.kondisi]}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="xs"
                          variant="text"
                          color="neutral"
                          onClick={() => bukaEdit(k)}
                          aria-label="Ubah"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          size="xs"
                          variant="text"
                          color="error"
                          onClick={() => {
                            setError("");
                            setHapus(k);
                          }}
                          aria-label="Hapus"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-tertiary text-sm">
              {meta ? `Total ${meta.total} kendaraan` : "Memuat…"}
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                color="neutral"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Sebelumnya
              </Button>
              <span className="text-secondary text-sm">
                {meta?.page ?? page} / {meta?.total_pages ?? 1}
              </span>
              <Button
                size="sm"
                variant="outline"
                color="neutral"
                disabled={!meta || page >= meta.total_pages}
                onClick={() => setPage((p) => p + 1)}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>

      <Modal open={open} onOpenChange={setOpen} size="xl">
        <Modal.Header
          title={editing ? `Ubah ${editing.nomor_polisi}` : "Tambah Kendaraan"}
          description="Data kendaraan dinas operasional."
        />
        <Modal.Body>
          <form
            id="form-kendaraan"
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              simpan.mutate();
            }}
          >
            <div className="space-y-1.5">
              <label htmlFor="nomor_polisi" className="font-medium text-primary text-sm">
                Nomor polisi
              </label>
              <Input
                id="nomor_polisi"
                value={form.nomor_polisi}
                onValueChange={(v) => ubah("nomor_polisi", v)}
                placeholder="B 1234 XYZ"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="tahun_produksi" className="font-medium text-primary text-sm">
                Tahun produksi
              </label>
              <Input
                id="tahun_produksi"
                type="number"
                value={form.tahun_produksi}
                onValueChange={(v) => ubah("tahun_produksi", v)}
                min={1980}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="merek" className="font-medium text-primary text-sm">
                Merek
              </label>
              <Input
                id="merek"
                value={form.merek}
                onValueChange={(v) => ubah("merek", v)}
                placeholder="Toyota"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="tipe" className="font-medium text-primary text-sm">
                Tipe
              </label>
              <Input
                id="tipe"
                value={form.tipe}
                onValueChange={(v) => ubah("tipe", v)}
                placeholder="Avanza"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="warna" className="font-medium text-primary text-sm">
                Warna
              </label>
              <Input
                id="warna"
                value={form.warna}
                onValueChange={(v) => ubah("warna", v)}
                placeholder="Silver"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="jenis" className="font-medium text-primary text-sm">
                Jenis
              </label>
              <select
                id="jenis"
                className={inputSelect}
                value={form.jenis}
                onChange={(e) => ubah("jenis", e.target.value)}
              >
                <option value="mobil">Mobil</option>
                <option value="minibus">Minibus</option>
                <option value="motor">Motor</option>
                <option value="pickup">Pickup</option>
                <option value="ambulans">Ambulans</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="bahan_bakar" className="font-medium text-primary text-sm">
                Bahan bakar
              </label>
              <select
                id="bahan_bakar"
                className={inputSelect}
                value={form.bahan_bakar}
                onChange={(e) => ubah("bahan_bakar", e.target.value)}
              >
                <option value="bensin">Bensin</option>
                <option value="solar">Solar</option>
                <option value="listrik">Listrik</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="kapasitas_cc" className="font-medium text-primary text-sm">
                Kapasitas mesin (cc)
              </label>
              <Input
                id="kapasitas_cc"
                type="number"
                value={form.kapasitas_cc}
                onValueChange={(v) => ubah("kapasitas_cc", v)}
                placeholder="1500"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="odometer_km" className="font-medium text-primary text-sm">
                Odometer (km)
              </label>
              <Input
                id="odometer_km"
                type="number"
                value={form.odometer_km}
                onValueChange={(v) => ubah("odometer_km", v)}
                min={0}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="kondisi" className="font-medium text-primary text-sm">
                Kondisi
              </label>
              <select
                id="kondisi"
                className={inputSelect}
                value={form.kondisi}
                onChange={(e) => ubah("kondisi", e.target.value)}
              >
                <option value="baik">Baik</option>
                <option value="rusak_ringan">Rusak ringan</option>
                <option value="rusak_berat">Rusak berat</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="status" className="font-medium text-primary text-sm">
                Status
              </label>
              <select
                id="status"
                className={inputSelect}
                value={form.status}
                onChange={(e) => ubah("status", e.target.value)}
              >
                <option value="tersedia">Tersedia</option>
                <option value="digunakan">Digunakan</option>
                <option value="perbaikan">Perbaikan</option>
                <option value="dihapuskan">Dihapuskan</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="perangkat_daerah_id" className="font-medium text-primary text-sm">
                Perangkat daerah
              </label>
              <select
                id="perangkat_daerah_id"
                className={inputSelect}
                value={form.perangkat_daerah_id}
                onChange={(e) => ubah("perangkat_daerah_id", e.target.value)}
                required
              >
                <option value="">Pilih OPD…</option>
                {(opd.data ?? []).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="penanggung_jawab_id" className="font-medium text-primary text-sm">
                Penanggung jawab
              </label>
              <select
                id="penanggung_jawab_id"
                className={inputSelect}
                value={form.penanggung_jawab_id}
                onChange={(e) => ubah("penanggung_jawab_id", e.target.value)}
              >
                <option value="">Tidak ada</option>
                {(pegawai.data ?? []).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="tanggal_pajak" className="font-medium text-primary text-sm">
                Jatuh tempo pajak
              </label>
              <Input
                id="tanggal_pajak"
                type="date"
                value={form.tanggal_pajak}
                onValueChange={(v) => ubah("tanggal_pajak", v)}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="tanggal_stnk" className="font-medium text-primary text-sm">
                Jatuh tempo STNK
              </label>
              <Input
                id="tanggal_stnk"
                type="date"
                value={form.tanggal_stnk}
                onValueChange={(v) => ubah("tanggal_stnk", v)}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="keterangan" className="font-medium text-primary text-sm">
                Keterangan
              </label>
              <Input
                id="keterangan"
                value={form.keterangan}
                onValueChange={(v) => ubah("keterangan", v)}
                placeholder="Opsional"
              />
            </div>

            {error ? (
              <p className="rounded-lg bg-error-muted-primary px-3 py-2 text-error-primary text-sm sm:col-span-2">
                {error}
              </p>
            ) : null}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" color="neutral" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button type="submit" form="form-kendaraan" loading={simpan.isPending}>
            {editing ? "Simpan Perubahan" : "Tambah Kendaraan"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal open={Boolean(hapus)} onOpenChange={(value) => !value && setHapus(null)} size="sm">
        <Modal.Header
          title="Hapus kendaraan?"
          description={hapus ? `${hapus.nomor_polisi} — ${hapus.merek} ${hapus.tipe}` : ""}
        />
        <Modal.Body>
          <p className="text-secondary text-sm">
            Kendaraan akan dihapus dari daftar. Penghapusan ditolak bila masih ada peminjaman aktif.
          </p>
          {error ? <p className="mt-3 text-error-primary text-sm">{error}</p> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" color="neutral" onClick={() => setHapus(null)}>
            Batal
          </Button>
          <Button
            color="error"
            loading={hapusMutation.isPending}
            onClick={() => hapus && hapusMutation.mutate(hapus.id)}
          >
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

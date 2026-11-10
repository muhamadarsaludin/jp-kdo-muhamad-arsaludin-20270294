import { Badge, Card, EmptyState, Skeleton, StatCard } from "@kdo/components";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  ArrowUpRight,
  Car,
  CheckCircle2,
  ClipboardList,
  KeyRound,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

import { api } from "@/lib/api";
import { rupiah, tanggalWaktu } from "@/lib/format";
import type { BiayaBulananItem, DashboardStats, Envelope, KondisiItem, Peminjaman } from "@/types";

async function ambil<T>(url: string): Promise<T> {
  const res = await api.get<Envelope<T>>(url);
  return res.data.data;
}

const warnaKondisi: Record<string, string> = {
  baik: "var(--color-green-500)",
  rusak_ringan: "var(--color-yellow-500)",
  rusak_berat: "var(--color-red-500)",
};

const labelKondisi: Record<string, string> = {
  baik: "Baik",
  rusak_ringan: "Rusak ringan",
  rusak_berat: "Rusak berat",
};

const warnaStatus: Record<string, "blue" | "green" | "neutral" | "red" | "yellow"> = {
  diajukan: "blue",
  disetujui: "green",
  selesai: "neutral",
  ditolak: "red",
  dibatalkan: "yellow",
};

function namaBulan(bulan: string): string {
  const [tahun, nomor] = bulan.split("-");
  const date = new Date(Number(tahun), Number(nomor) - 1, 1);
  return new Intl.DateTimeFormat("id-ID", { month: "short" }).format(date);
}

export function DashboardPage() {
  const stats = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: () => ambil<DashboardStats>("/dashboard/stats"),
  });
  const kondisi = useQuery({
    queryKey: ["dashboard", "kondisi"],
    queryFn: () => ambil<KondisiItem[]>("/dashboard/kendaraan-per-kondisi"),
  });
  const biaya = useQuery({
    queryKey: ["dashboard", "biaya"],
    queryFn: () => ambil<BiayaBulananItem[]>("/dashboard/biaya-servis-bulanan"),
  });
  const menunggu = useQuery({
    queryKey: ["dashboard", "menunggu"],
    queryFn: () => ambil<Peminjaman[]>("/dashboard/peminjaman-menunggu"),
  });

  const data = stats.data;
  const maksBiaya = Math.max(1, ...(biaya.data ?? []).map((item) => item.total));
  const totalKondisi = (kondisi.data ?? []).reduce((total, item) => total + item.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-semibold text-2xl text-primary">Dashboard</h1>
          <p className="mt-1 text-tertiary text-sm">
            Ringkasan aset kendaraan dinas, peminjaman, dan biaya perawatan.
          </p>
        </div>
        <Link
          to="/peminjaman"
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-brand-primary text-sm hover:bg-brand-muted-primary"
        >
          Lihat peminjaman <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Kendaraan"
          value={stats.isLoading ? "…" : (data?.total_kendaraan ?? 0)}
          icon={<Car />}
          color="brand"
        />
        <StatCard
          label="Tersedia"
          value={stats.isLoading ? "…" : (data?.tersedia ?? 0)}
          icon={<CheckCircle2 />}
          color="success"
        />
        <StatCard
          label="Digunakan"
          value={stats.isLoading ? "…" : (data?.digunakan ?? 0)}
          icon={<KeyRound />}
          color="info"
        />
        <StatCard
          label="Perbaikan"
          value={stats.isLoading ? "…" : (data?.perbaikan ?? 0)}
          icon={<Wrench />}
          color="warning"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl lg:col-span-2">
          <Card.Header className="flex-row items-center justify-between">
            <div>
              <Card.Title>Biaya Servis</Card.Title>
              <Card.Description>Enam bulan terakhir</Card.Description>
            </div>
            <Badge color="brand" variant="subtle">
              {rupiah(data?.biaya_servis_total ?? 0)}
            </Badge>
          </Card.Header>
          <Card.Content>
            {biaya.isLoading ? (
              <Skeleton className="h-44 w-full" />
            ) : (
              <div className="flex h-44 items-end gap-3">
                {(biaya.data ?? []).map((item) => (
                  <div key={item.bulan} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                    <div className="flex h-32 w-full items-end">
                      <div
                        className="w-full rounded-t-md bg-[var(--color-brand-500)] transition-all"
                        style={{ height: `${Math.max(4, (item.total / maksBiaya) * 100)}%` }}
                        title={rupiah(item.total)}
                      />
                    </div>
                    <span className="text-tertiary text-xs">{namaBulan(item.bulan)}</span>
                  </div>
                ))}
              </div>
            )}
          </Card.Content>
        </Card>

        <Card className="rounded-2xl">
          <Card.Header>
            <Card.Title>Kondisi Kendaraan</Card.Title>
            <Card.Description>Sebaran kondisi armada</Card.Description>
          </Card.Header>
          <Card.Content className="space-y-4">
            {kondisi.isLoading ? (
              <Skeleton className="h-40 w-full" />
            ) : (
              (kondisi.data ?? []).map((item) => {
                const persen = totalKondisi > 0 ? (item.total / totalKondisi) * 100 : 0;
                return (
                  <div key={item.kondisi} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-secondary">
                        <span
                          className="size-2 rounded-full"
                          style={{
                            backgroundColor:
                              warnaKondisi[item.kondisi] ?? "var(--color-neutral-400)",
                          }}
                        />
                        {labelKondisi[item.kondisi] ?? item.kondisi}
                      </span>
                      <span className="font-medium text-primary tabular-nums">{item.total}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${persen}%`,
                          backgroundColor: warnaKondisi[item.kondisi] ?? "var(--color-neutral-400)",
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </Card.Content>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl">
          <Card.Content className="flex items-center gap-3 py-1">
            <span className="flex size-10 items-center justify-center rounded-lg bg-info-muted-primary text-info-primary">
              <Users className="size-5" />
            </span>
            <div>
              <p className="text-tertiary text-xs">Pegawai aktif</p>
              <p className="font-semibold text-xl text-primary tabular-nums">
                {data?.total_pegawai ?? 0}
              </p>
            </div>
          </Card.Content>
        </Card>
        <Card className="rounded-2xl">
          <Card.Content className="flex items-center gap-3 py-1">
            <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-tertiary">
              <Activity className="size-5" />
            </span>
            <div>
              <p className="text-tertiary text-xs">Perangkat daerah</p>
              <p className="font-semibold text-xl text-primary tabular-nums">
                {data?.total_opd ?? 0}
              </p>
            </div>
          </Card.Content>
        </Card>
        <Card className="rounded-2xl">
          <Card.Content className="flex items-center gap-3 py-1">
            <span className="flex size-10 items-center justify-center rounded-lg bg-success-muted-primary text-success-primary">
              <Wallet className="size-5" />
            </span>
            <div>
              <p className="text-tertiary text-xs">Biaya bulan ini</p>
              <p className="font-semibold text-lg text-primary tabular-nums">
                {rupiah(data?.biaya_servis_bulan_ini ?? 0)}
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <Card.Header className="flex-row items-center justify-between">
          <div>
            <Card.Title>Menunggu Persetujuan</Card.Title>
            <Card.Description>Pengajuan peminjaman yang perlu ditinjau</Card.Description>
          </div>
          <Badge color="blue" variant="subtle">
            <ClipboardList className="mr-1 size-3.5" />
            {data?.peminjaman_diajukan ?? 0}
          </Badge>
        </Card.Header>
        <Card.Content>
          {menunggu.isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : (menunggu.data ?? []).length === 0 ? (
            <EmptyState
              size="sm"
              title="Tidak ada pengajuan"
              description="Semua pengajuan peminjaman sudah diproses."
            />
          ) : (
            <div className="divide-y divide-[var(--color-border-secondary)]">
              {(menunggu.data ?? []).map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-primary text-sm">
                      {item.kendaraan_nomor_polisi} · {item.pegawai_nama}
                    </p>
                    <p className="truncate text-tertiary text-xs">
                      {item.keperluan} → {item.tujuan} · {tanggalWaktu(item.tanggal_mulai)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-quaternary text-xs">{item.kode_peminjaman}</span>
                    <Badge color={warnaStatus[item.status] ?? "neutral"} variant="subtle" size="sm">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}

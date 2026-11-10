import {
  Building2,
  Car,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Users,
  Wrench,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Avatar, Button } from "@kdo/components";

import { useAuth } from "@/auth/AuthProvider";

const menu = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/kendaraan", label: "Kendaraan", icon: Car },
  { to: "/pegawai", label: "Pegawai", icon: Users },
  { to: "/perangkat-daerah", label: "Perangkat Daerah", icon: Building2 },
  { to: "/peminjaman", label: "Peminjaman", icon: ClipboardList },
  { to: "/servis", label: "Servis", icon: Wrench },
];

const judulHalaman: Record<string, string> = {
  "/": "Dashboard",
  "/kendaraan": "Kendaraan Dinas",
  "/pegawai": "Pegawai",
  "/perangkat-daerah": "Perangkat Daerah",
  "/peminjaman": "Peminjaman",
  "/servis": "Riwayat Servis",
};

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const keluar = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-secondary">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-secondary border-r bg-primary md:flex">
        <div className="flex h-16 items-center gap-3 border-secondary border-b px-5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-primary text-primary-inverse">
            <Car className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="font-semibold text-primary text-sm">KDO</p>
            <p className="text-tertiary text-xs">Kendaraan Dinas</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-sm transition-colors",
                  isActive
                    ? "bg-brand-muted-primary text-brand-primary"
                    : "text-secondary hover:bg-secondary hover:text-primary",
                ].join(" ")
              }
            >
              <item.icon className="size-4.5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-secondary border-t p-3">
          <p className="px-2 pb-2 text-quaternary text-xs">Masuk sebagai</p>
          <div className="flex items-center gap-2 rounded-lg px-2 py-2">
            <Avatar name={user?.nama ?? "Pengguna"} size="sm" />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate font-medium text-primary text-sm">{user?.nama ?? "Pengguna"}</p>
              <p className="truncate text-tertiary text-xs capitalize">{user?.role ?? "-"}</p>
            </div>
            <Button size="xs" variant="text" color="neutral" onClick={keluar} aria-label="Keluar">
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-secondary border-b bg-primary/80 px-4 backdrop-blur md:px-8">
          <div>
            <p className="font-semibold text-primary text-lg">{judulHalaman[pathname] ?? "KDO"}</p>
            <p className="text-tertiary text-xs">Sistem Kendaraan Dinas Operasional</p>
          </div>
          <div className="flex items-center gap-2">
            <Avatar name={user?.nama ?? "Pengguna"} size="sm" />
            <Button size="sm" variant="outline" color="neutral" onClick={keluar}>
              Keluar
            </Button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

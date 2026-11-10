import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@/auth/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";
import { ComingSoonPage } from "@/pages/ComingSoonPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/LoginPage";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route
            path="kendaraan"
            element={<ComingSoonPage title="Kendaraan Dinas" description="Kelola data kendaraan operasional." />}
          />
          <Route
            path="pegawai"
            element={<ComingSoonPage title="Pegawai" description="Kelola data PNS dan penanggung jawab." />}
          />
          <Route
            path="perangkat-daerah"
            element={<ComingSoonPage title="Perangkat Daerah" description="Kelola data instansi/OPD." />}
          />
          <Route
            path="peminjaman"
            element={<ComingSoonPage title="Peminjaman" description="Ajukan dan setujui peminjaman kendaraan." />}
          />
          <Route
            path="servis"
            element={<ComingSoonPage title="Riwayat Servis" description="Catat perawatan dan biaya kendaraan." />}
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

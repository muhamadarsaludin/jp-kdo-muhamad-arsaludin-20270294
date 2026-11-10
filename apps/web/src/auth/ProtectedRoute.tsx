import { Navigate, Outlet } from "react-router-dom";

import { sudahLogin } from "@/auth/AuthProvider";

export function ProtectedRoute() {
  if (!sudahLogin()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

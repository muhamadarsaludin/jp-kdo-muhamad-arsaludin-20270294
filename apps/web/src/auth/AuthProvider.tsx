import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";

import { api, getToken, hapusSesi, simpanSesi } from "@/lib/api";
import type { Envelope, LoginResult, Pengguna } from "@/types";

interface AuthContextValue {
  user: Pengguna | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function bacaUser(): Pengguna | null {
  try {
    const raw = localStorage.getItem("kdo_user");
    return raw ? (JSON.parse(raw) as Pengguna) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Pengguna | null>(bacaUser);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post<Envelope<LoginResult>>("/auth/login", { email, password });
    simpanSesi(res.data.data.token, res.data.data.user);
    setUser(res.data.data.user);
  }, []);

  const logout = useCallback(() => {
    hapusSesi();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }
  return context;
}

export function sudahLogin(): boolean {
  return Boolean(getToken());
}

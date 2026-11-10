import { Button, Card, Input } from "@kdo/components";
import { Car } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/auth/AuthProvider";
import { pesanError } from "@/lib/api";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@kdo.go.id");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(pesanError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-primary text-primary-inverse">
            <Car className="size-6" />
          </span>
          <h1 className="font-semibold text-2xl text-primary">KDO</h1>
          <p className="text-tertiary text-sm">Kendaraan Dinas Operasional</p>
        </div>

        <Card className="rounded-2xl p-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="font-medium text-primary text-sm">
                Email
              </label>
              <Input
                id="email"
                type="email"
                size="lg"
                value={email}
                onValueChange={setEmail}
                placeholder="admin@kdo.go.id"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="font-medium text-primary text-sm">
                Password
              </label>
              <Input
                id="password"
                type="password"
                size="lg"
                value={password}
                onValueChange={setPassword}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            {error ? (
              <p className="rounded-lg bg-error-muted-primary px-3 py-2 text-error-primary text-sm">
                {error}
              </p>
            ) : null}

            <Button type="submit" size="lg" fullWidth loading={loading}>
              Masuk
            </Button>
          </form>
        </Card>

        <p className="mt-4 text-center text-tertiary text-xs">Demo: admin@kdo.go.id / admin123</p>
      </div>
    </div>
  );
}

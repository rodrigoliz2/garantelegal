"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setLoading(true);
    const data = new FormData(event.currentTarget);
    const result = await signIn("credentials", { email: data.get("email"), password: data.get("password"), redirect: false });
    setLoading(false);
    if (result?.error) { setError("No pudimos iniciar sesión. Revisa el correo y la contraseña."); return; }
    router.push("/admin"); router.refresh();
  }
  return <form onSubmit={submit} className="card mt-8 max-w-md space-y-4 p-6"><label className="block font-semibold">Correo del administrador<input name="email" className="field mt-2" type="email" autoComplete="username" required /></label><label className="block font-semibold">Contraseña<input name="password" className="field mt-2" type="password" autoComplete="current-password" required /></label>{error && <p role="alert" className="rounded border border-slate p-3">{error}</p>}<button className="btn btn-primary w-full" disabled={loading} type="submit">{loading ? "Ingresando…" : "Entrar al panel"}</button></form>;
}

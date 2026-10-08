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
  return <form onSubmit={submit} className="grid max-w-md gap-5 border-t border-black pt-6"><label className="label">Correo del administrador<input name="email" className="field" type="email" autoComplete="username" required /></label><label className="label">Contraseña<input name="password" className="field" type="password" autoComplete="current-password" required /></label>{error && <p role="alert" className="notice font-medium">{error}</p>}<button className="b b-solid w-full" disabled={loading} type="submit">{loading ? "Ingresando…" : "Entrar al panel"}</button></form>;
}

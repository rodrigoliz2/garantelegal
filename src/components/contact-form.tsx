"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { trackEvent } from "@/lib/analytics";

export function ContactForm({ siteKey }: { siteKey: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const turnstileToken = String(data.get("cf-turnstile-response") || "");
    if (!turnstileToken) { setError("Completa la verificación de seguridad."); return; }
    setState("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ clientName: data.get("clientName"), clientPhone: data.get("clientPhone"), clientEmail: data.get("clientEmail"), message: data.get("message"), privacyAccepted: data.get("privacyAccepted") === "on", turnstileToken }) });
      const body = await response.json();
      if (!response.ok) { setError(body.error || "No pudimos enviar el mensaje."); setState("idle"); return; }
      setState("success");
      trackEvent("formulario_enviado", "contacto");
    } catch { setError("No pudimos conectar con el servidor. Intenta de nuevo."); setState("idle"); }
  }
  if (state === "success") return <div className="card p-6" role="status"><h2 className="display text-3xl">Mensaje recibido</h2><p className="mt-3">El despacho revisará tu solicitud. Si se trata de una detención, usa la llamada o WhatsApp de la barra inferior.</p></div>;
  return <form onSubmit={submit} className="card space-y-4 p-5 md:p-7"><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /><h2 className="display text-3xl">Escríbenos</h2><label className="block font-semibold">Nombre<input className="field mt-2" name="clientName" minLength={2} maxLength={100} autoComplete="name" required /></label><label className="block font-semibold">Teléfono<input className="field mt-2" name="clientPhone" type="tel" autoComplete="tel" minLength={10} required /></label><label className="block font-semibold">Correo (opcional)<input className="field mt-2" name="clientEmail" type="email" autoComplete="email" /></label><label className="block font-semibold">Mensaje breve<textarea className="field mt-2 min-h-28" name="message" minLength={10} maxLength={500} required placeholder="Evita incluir datos sensibles; los detalles se revisan en consulta." /></label><label className="flex items-start gap-3"><input className="mt-1 h-5 w-5 shrink-0" type="checkbox" name="privacyAccepted" required /><span>Acepto el <Link href="/aviso-de-privacidad" target="_blank" className="font-bold underline">aviso de privacidad</Link> para recibir respuesta.</span></label><div className="min-h-[66px]"><div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" /></div>{error && <p className="rounded border border-slate p-3" role="alert">{error}</p>}<button className="btn btn-primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando…" : "Enviar mensaje"}</button></form>;
}

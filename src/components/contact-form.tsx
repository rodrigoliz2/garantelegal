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
  if (state === "success") return <div className="border-t border-black pt-8" role="status"><h2 className="t-h2">Mensaje recibido</h2><p className="t-muted mt-4 max-w-[48ch]">El despacho revisará tu solicitud. Si se trata de una detención, contáctanos de inmediato por WhatsApp.</p></div>;
  return <form onSubmit={submit} className="grid gap-5 border-t border-black pt-6"><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /><h2 className="text-[clamp(1.375rem,2vw,1.75rem)] font-normal tracking-[-0.022em]">Escríbenos</h2><div className="grid gap-5 md:grid-cols-2"><label className="label">Nombre<input className="field" name="clientName" minLength={2} maxLength={100} autoComplete="name" required /></label><label className="label">Teléfono<input className="field" name="clientPhone" type="tel" autoComplete="tel" minLength={10} required /></label></div><label className="label">Correo (opcional)<input className="field" name="clientEmail" type="email" autoComplete="email" /></label><label className="label">Mensaje breve<textarea className="field" name="message" minLength={10} maxLength={500} required placeholder="Evita incluir datos sensibles; los detalles se revisan en consulta." /></label><label className="flex items-start gap-3"><input className="check" type="checkbox" name="privacyAccepted" required /><span>Acepto el <Link href="/aviso-de-privacidad" target="_blank" className="u">aviso de privacidad</Link> para recibir respuesta.</span></label><div className="min-h-[66px]"><div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" /></div>{error && <p className="notice font-medium" role="alert">{error}</p>}<button className="b b-solid w-full sm:w-fit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando…" : "Enviar mensaje"}</button></form>;
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { formatInTimeZone } from "date-fns-tz";
import { appointmentMessage, emergencyMessage } from "@/lib/contact";
import { modalityLabels, modalities } from "@/lib/booking-constants";
import type { Slot } from "@/lib/availability";
import { siteConfig, whatsappHref } from "@/site.config";
import { trackEvent } from "@/lib/analytics";

type ServiceOption = { id: string; name: string; areaId: string; areaName: string; isEmergency: boolean };
type BookingResult = { folio: string; startsAt: string; endsAt: string; service: string; modality: string };

export function BookingForm({ services, initialServiceId, turnstileSiteKey }: { services: ServiceOption[]; initialServiceId?: string; turnstileSiteKey: string }) {
  const areas = useMemo(() => Array.from(new Map(services.map(service => [service.areaId, service.areaName])).entries()), [services]);
  const firstService = services.find(item => item.id === initialServiceId && !item.isEmergency) || services.find(item => !item.isEmergency);
  const [areaId, setAreaId] = useState(firstService?.areaId || "");
  const [serviceId, setServiceId] = useState(firstService?.id || "");
  const [modality, setModality] = useState<(typeof modalities)[number]>("VIDEO");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slot, setSlot] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<BookingResult | null>(null);
  const areaServices = services.filter(item => item.areaId === areaId);
  const selectedService = services.find(item => item.id === serviceId);

  useEffect(() => { trackEvent("cita_iniciada"); }, []);

  useEffect(() => {
    let active = true;
    setLoadingSlots(true);
    setSlot("");
    fetch(`/api/availability?modality=${modality}`, { cache: "no-store" }).then(async response => {
      if (!response.ok) throw new Error("No pudimos cargar los horarios.");
      return response.json() as Promise<{ slots: Slot[] }>;
    }).then(data => { if (active) { setSlots(data.slots); setError(""); } }).catch(() => { if (active) setError("No pudimos cargar los horarios. Actualiza la página e intenta de nuevo."); }).finally(() => { if (active) setLoadingSlots(false); });
    return () => { active = false; };
  }, [modality]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const token = String(data.get("cf-turnstile-response") || "");
    if (!token) { setError("Completa la verificación de seguridad antes de continuar."); return; }
    if (!slot) { setError("Elige un día y horario disponible."); return; }
    setSubmitting(true);
    try {
      const response = await fetch("/api/appointments", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ serviceId, modality, startsAt: slot, clientName: data.get("clientName"), clientPhone: data.get("clientPhone"), clientEmail: data.get("clientEmail"), notes: data.get("notes"), privacyAccepted: data.get("privacyAccepted") === "on", turnstileToken: token }) });
      const payload = await response.json();
      if (!response.ok) { setError(payload.error || "No pudimos guardar la cita."); if (response.status === 409) setSlot(""); return; }
      setResult(payload as BookingResult);
      trackEvent("cita_creada");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch { setError("No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo."); }
    finally { setSubmitting(false); }
  }

  if (result) {
    const date = formatInTimeZone(new Date(result.startsAt), siteConfig.timeZone, "dd/MM/yyyy");
    const time = formatInTimeZone(new Date(result.startsAt), siteConfig.timeZone, "HH:mm");
    return <div className="card max-w-2xl p-7" role="status"><p className="eyebrow text-brass">Solicitud recibida</p><h2 className="display mt-3 text-4xl">Tu folio es {result.folio}</h2><p className="mt-4">Recibimos tu solicitud para <strong>{result.service}</strong> el {date} a las {time} ({siteConfig.timeZone}). El despacho confirmará la cita.</p><div className="mt-6 flex flex-wrap gap-3"><a className="btn btn-primary" href={whatsappHref(`Confirmo mi cita ${result.folio} del ${date} a las ${time}.`)} target="_blank" rel="noopener noreferrer">Confirmar por WhatsApp</a><a className="btn btn-secondary" href={`/api/appointments/${result.folio}/calendar`}>Descargar calendario (.ics)</a></div></div>;
  }

  return <form onSubmit={submit} className="grid gap-8" noValidate={false}>
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
    <fieldset className="card p-5 md:p-7"><legend className="display px-2 text-2xl">1. Elige el servicio</legend><div className="grid gap-4 md:grid-cols-2"><label className="font-semibold">Área<select className="field mt-2" value={areaId} onChange={event => { const nextArea = event.target.value; setAreaId(nextArea); setServiceId(services.find(item => item.areaId === nextArea)?.id || ""); }}>{areas.map(([id, name]) => <option value={id} key={id}>{name}</option>)}</select></label><label className="font-semibold">Servicio<select className="field mt-2" value={serviceId} onChange={event => setServiceId(event.target.value)} required>{areaServices.map(service => <option value={service.id} key={service.id}>{service.name}</option>)}</select></label></div>{selectedService?.isEmergency && <div className="mt-4 rounded border border-slate p-4"><p>Las urgencias se atienden por llamada o WhatsApp.</p><a className="btn btn-emergency mt-3" href={siteConfig.phoneHref}>Llamar ahora</a><a className="ml-3 underline" href={whatsappHref(emergencyMessage)}>WhatsApp</a></div>}</fieldset>
    {!selectedService?.isEmergency && <><fieldset className="card p-5 md:p-7"><legend className="display px-2 text-2xl">2. Modalidad y horario</legend><div className="grid gap-3 sm:grid-cols-3">{modalities.map(value => <label className={`flex cursor-pointer items-center gap-2 rounded border p-3 ${modality === value ? "border-brass bg-ivory" : "border-[#d8d3c8]"}`} key={value}><input type="radio" name="modality" value={value} checked={modality === value} onChange={() => setModality(value)} />{modalityLabels[value]}</label>)}</div><p className="mt-5 text-sm">Horarios en {siteConfig.timeZone}. Disponibilidad de ejemplo: lunes a viernes, 09:00–18:00.</p>{loadingSlots ? <p className="mt-4" role="status">Cargando horarios…</p> : slots.length ? <div className="mt-5 max-h-80 overflow-y-auto rounded border border-[#d8d3c8] p-3"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">{slots.map(item => <label key={item.startsAt} className={`cursor-pointer rounded border p-2 text-center text-sm ${slot === item.startsAt ? "border-brass bg-ivory font-bold" : "border-[#d8d3c8]"}`}><input type="radio" name="slot" value={item.startsAt} className="sr-only" checked={slot === item.startsAt} onChange={() => setSlot(item.startsAt)} /><span className="block capitalize">{item.dayLabel}</span><span className="block">{item.time}</span></label>)}</div></div> : <p className="mt-4 rounded bg-ivory p-4">No hay horarios disponibles para esta modalidad. Prueba otra o escríbenos por WhatsApp.</p>}</fieldset>
    <fieldset className="card p-5 md:p-7"><legend className="display px-2 text-2xl">3. Tus datos</legend><div className="grid gap-4 md:grid-cols-2"><label className="font-semibold">Nombre completo<input className="field mt-2" name="clientName" autoComplete="name" minLength={2} maxLength={100} required /></label><label className="font-semibold">Teléfono<input className="field mt-2" name="clientPhone" autoComplete="tel" type="tel" minLength={10} required /></label><label className="font-semibold">Correo (opcional)<input className="field mt-2" name="clientEmail" autoComplete="email" type="email" /></label><label className="font-semibold md:col-span-2">Descripción breve (opcional)<textarea className="field mt-2 min-h-28" name="notes" maxLength={500} placeholder="No incluyas datos sensibles. Los detalles se revisan en la consulta." /></label></div><label className="mt-5 flex items-start gap-3"><input type="checkbox" name="privacyAccepted" required className="mt-1 h-5 w-5 shrink-0" /><span>Acepto el <Link href="/aviso-de-privacidad" className="font-bold underline" target="_blank">aviso de privacidad</Link> y autorizo el uso de mis datos para gestionar esta solicitud.</span></label><div className="mt-5 min-h-[66px]"><div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" /></div></fieldset>
    {error && <p role="alert" className="rounded border border-slate bg-paper p-4 font-semibold">{error}</p>}
    <button className="btn btn-primary w-full md:w-fit" type="submit" disabled={submitting || loadingSlots || !slot}>{submitting ? "Guardando solicitud…" : "Solicitar cita"}</button></>}
    <p className="text-sm">¿Prefieres escribir? <a className="font-bold underline" href={whatsappHref(appointmentMessage(selectedService?.name))} target="_blank" rel="noopener noreferrer">Agendar por WhatsApp</a>.</p>
  </form>;
}

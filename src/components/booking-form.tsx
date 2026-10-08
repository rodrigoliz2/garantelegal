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
const dayFormat = new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "long", timeZone: siteConfig.timeZone });
const dayLabel = (iso: string) => { const label = dayFormat.format(new Date(iso)); return label.charAt(0).toLocaleUpperCase("es-MX") + label.slice(1); };

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
    return <div className="border-t border-black pt-8" role="status"><p className="t-small t-muted">Solicitud recibida</p><h2 className="t-h2 mt-3">Tu folio es {result.folio}</h2><p className="mt-5 max-w-[56ch] text-[1.0625rem]">Recibimos tu solicitud para <strong className="font-medium">{result.service}</strong> el {date} a las {time} (hora del centro de México). El despacho confirmará la cita.</p><div className="mt-8 flex flex-col gap-2 sm:flex-row"><a className="b b-solid" href={whatsappHref(`Confirmo mi cita ${result.folio} del ${date} a las ${time}.`)} target="_blank" rel="noopener noreferrer">Confirmar por WhatsApp</a><a className="b b-line" href={`/api/appointments/${result.folio}/calendar`}>Descargar calendario (.ics)</a></div></div>;
  }

  const legend = "mb-6 w-full border-t border-black pt-5 text-[clamp(1.375rem,2vw,1.75rem)] font-normal tracking-[-0.022em]";
  return <form onSubmit={submit} className="grid gap-14" noValidate={false}>
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
    <fieldset><legend className={legend}>Elige el servicio</legend><div className="grid gap-5 md:grid-cols-2"><label className="label">Área<select className="field" value={areaId} onChange={event => { const nextArea = event.target.value; setAreaId(nextArea); setServiceId(services.find(item => item.areaId === nextArea)?.id || ""); }}>{areas.map(([id, name]) => <option value={id} key={id}>{name}</option>)}</select></label><label className="label">Servicio<select className="field" value={serviceId} onChange={event => setServiceId(event.target.value)} required>{areaServices.map(service => <option value={service.id} key={service.id}>{service.name}</option>)}</select></label></div>{selectedService?.isEmergency && <div className="notice mt-6"><p>Las urgencias no se agendan: se atienden de inmediato por WhatsApp, con llamada o mensaje.</p><div className="mt-4"><a className="b b-urgent" href={whatsappHref(emergencyMessage)} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="agendar-urgencia">Llamar por WhatsApp</a></div></div>}</fieldset>
    {!selectedService?.isEmergency && <><fieldset><legend className={legend}>Modalidad y horario</legend><div className="grid gap-2 sm:grid-cols-3">{modalities.map(value => <label className={`tap flex min-h-[52px] cursor-pointer items-center gap-3 border px-4 transition-colors duration-150 ${modality === value ? "border-black bg-black text-white" : "border-g-400 hover:border-black"}`} key={value}><input type="radio" name="modality" value={value} checked={modality === value} onChange={() => setModality(value)} className="check accent-white" />{modalityLabels[value]}</label>)}</div><p className="t-small t-muted mt-6">Solo aparecen los horarios libres. Todos están en hora del centro de México.</p>{loadingSlots ? <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4" role="status" aria-label="Cargando horarios">{Array.from({ length: 8 }).map((_, index) => <span key={index} className="h-[60px] bg-g-50" />)}</div> : slots.length ? <div className="relative mt-4 max-h-[360px] overflow-y-auto border-y border-g-200 py-3"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">{slots.map(item => <label key={item.startsAt} className={`tap flex min-h-[60px] cursor-pointer flex-col justify-center border px-3 text-center text-[.9375rem] leading-snug transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ${slot === item.startsAt ? "border-black bg-black text-white" : "border-g-200 hover:border-black"}`}><input type="radio" name="slot" value={item.startsAt} className="sr-only" checked={slot === item.startsAt} onChange={() => setSlot(item.startsAt)} /><span className="block">{dayLabel(item.startsAt)}</span><span className="block font-medium">{item.time}</span></label>)}</div></div> : <p className="notice mt-4">No hay horarios disponibles para esta modalidad. Prueba otra o escríbenos por WhatsApp.</p>}</fieldset>
    <fieldset><legend className={legend}>Tus datos</legend><div className="grid gap-5 md:grid-cols-2"><label className="label">Nombre completo<input className="field" name="clientName" autoComplete="name" minLength={2} maxLength={100} required /></label><label className="label">Teléfono<input className="field" name="clientPhone" autoComplete="tel" type="tel" minLength={10} required /></label><label className="label">Correo (opcional)<input className="field" name="clientEmail" autoComplete="email" type="email" /></label><label className="label md:col-span-2">Descripción breve (opcional)<textarea className="field" name="notes" maxLength={500} placeholder="No incluyas datos sensibles. Los detalles se revisan en la consulta." /></label></div><label className="mt-6 flex items-start gap-3"><input type="checkbox" name="privacyAccepted" required className="check" /><span>Acepto el <Link href="/aviso-de-privacidad" className="u" target="_blank">aviso de privacidad</Link> y autorizo el uso de mis datos para gestionar esta solicitud.</span></label><div className="mt-6 min-h-[66px]"><div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" /></div></fieldset>
    {error && <p role="alert" className="notice font-medium">{error}</p>}
    <div className="flex flex-col gap-6 border-t border-black pt-8 sm:flex-row sm:items-center sm:justify-between"><button className="b b-solid b-lg w-full sm:w-auto" type="submit" disabled={submitting || loadingSlots || !slot}>{submitting ? "Guardando solicitud…" : "Solicitar cita"}</button><p className="t-small t-muted">¿Prefieres escribir? <a className="u text-black" href={whatsappHref(appointmentMessage(selectedService?.name))} target="_blank" rel="noopener noreferrer">Agendar por WhatsApp</a>.</p></div></>}
    {selectedService?.isEmergency && <p className="t-small t-muted">¿Prefieres escribir? <a className="u text-black" href={whatsappHref(appointmentMessage(selectedService?.name))} target="_blank" rel="noopener noreferrer">Agendar por WhatsApp</a>.</p>}
  </form>;
}

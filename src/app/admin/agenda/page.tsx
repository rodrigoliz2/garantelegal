import type { Metadata } from "next";
import Link from "next/link";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { AdminNav } from "@/components/admin-nav";
import { requireAdmin } from "@/lib/auth";
import { clientWhatsAppHref } from "@/lib/contact";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/site.config";
import { rescheduleAppointment, updateAppointmentStatus } from "@/app/admin/actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Agenda del despacho", robots: { index: false, follow: false } };
const statusLabels: Record<string, string> = { PENDING: "Pendiente", CONFIRMED: "Confirmada", RESCHEDULED: "Reprogramada", CANCELLED: "Cancelada", ATTENDED: "Atendida" };
const modalityLabels: Record<string, string> = { IN_PERSON: "Presencial", VIDEO: "Videollamada", PHONE: "Llamada" };

export default async function AgendaPage({ searchParams }: { searchParams: Promise<{ view?: string; date?: string; error?: string }> }) {
  await requireAdmin();
  const query = await searchParams;
  const view = query.view === "week" ? "week" : "day";
  const today = formatInTimeZone(new Date(), siteConfig.timeZone, "yyyy-MM-dd");
  const date = /^\d{4}-\d{2}-\d{2}$/.test(query.date || "") ? query.date! : today;
  const first = fromZonedTime(`${date} 00:00:00`, siteConfig.timeZone);
  const endDate = new Date(`${date}T12:00:00Z`);
  endDate.setUTCDate(endDate.getUTCDate() + (view === "week" ? 7 : 1));
  const last = fromZonedTime(`${endDate.toISOString().slice(0, 10)} 00:00:00`, siteConfig.timeZone);
  const appointments = await prisma.appointment.findMany({ where: { startsAt: { gte: first, lt: last } }, include: { service: true }, orderBy: { startsAt: "asc" } });
  return <div className="container-page section-pad"><p className="eyebrow text-brass">Panel</p><h1 className="display mt-3 text-5xl">Agenda</h1><div className="mt-8"><AdminNav /></div><form className="mt-6 flex flex-wrap items-end gap-3" action="/admin/agenda"><label className="font-semibold">Desde<input className="field mt-2" type="date" name="date" defaultValue={date} /></label><label className="font-semibold">Vista<select className="field mt-2" name="view" defaultValue={view}><option value="day">Día</option><option value="week">Semana</option></select></label><button className="btn btn-primary" type="submit">Ver agenda</button></form>{query.error && <p role="alert" className="mt-5 rounded border border-emergency p-4">No pudimos guardar el cambio. Revisa el horario; puede estar ocupado.</p>}<p className="mt-6 text-sm">Fechas en {siteConfig.timeZone}. {appointments.length} citas en esta vista.</p><div className="mt-4 grid gap-4">{appointments.length ? appointments.map(item => <article className="card p-5" key={item.id}><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-brass">{item.folio} · {statusLabels[item.status]}</p><h2 className="display mt-2 text-2xl">{item.clientName}</h2><p className="mt-1">{item.service.name} · {modalityLabels[item.modality]}</p><p className="mt-1 font-bold">{formatInTimeZone(item.startsAt, siteConfig.timeZone, "dd/MM/yyyy HH:mm")}</p><p className="mt-1 text-sm">{item.clientPhone}{item.clientEmail ? ` · ${item.clientEmail}` : ""}</p>{item.notes && <p className="mt-3 max-w-2xl text-sm">{item.notes}</p>}</div><a className="btn btn-secondary" href={clientWhatsAppHref(item.clientPhone, `Hola, te escribimos de ${siteConfig.name} sobre tu cita ${item.folio}.`)} target="_blank" rel="noopener noreferrer">WhatsApp al cliente</a></div><div className="mt-5 flex flex-wrap gap-2">{[["CONFIRMED", "Confirmar"], ["ATTENDED", "Marcar atendida"], ["CANCELLED", "Cancelar"]].map(([status, label]) => <form action={updateAppointmentStatus} key={status}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="status" value={status} /><button className="btn btn-secondary text-sm" type="submit" disabled={item.status === status}>{label}</button></form>)}</div><form action={rescheduleAppointment} className="mt-4 flex flex-wrap items-end gap-2"><input type="hidden" name="id" value={item.id} /><label className="text-sm font-semibold">Reprogramar (hora local)<input className="field mt-1" type="datetime-local" name="localStartsAt" required /></label><button className="btn btn-primary text-sm" type="submit">Guardar nueva hora</button></form></article>) : <div className="card p-8"><h2 className="display text-2xl">No hay citas en esta vista</h2><p className="mt-2">Elige otro día o revisa los horarios disponibles.</p><Link className="mt-4 inline-block underline" href="/admin/disponibilidad">Ver disponibilidad</Link></div>}</div></div>;
}

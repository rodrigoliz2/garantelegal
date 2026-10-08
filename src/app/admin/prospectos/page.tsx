import type { Metadata } from "next";
import { AdminNav } from "@/components/admin-nav";
import { updateLeadStatus } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { clientWhatsAppHref } from "@/lib/contact";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/site.config";
import { formatInTimeZone } from "date-fns-tz";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Prospectos", robots: { index: false, follow: false } };

export default async function LeadsPage() {
  await requireAdmin();
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return <div className="container-page section-pad"><p className="eyebrow text-brass">Panel</p><h1 className="display mt-3 text-5xl">Prospectos</h1><div className="mt-8"><AdminNav /></div><p className="mt-6 text-sm">Últimos {leads.length} contactos recibidos.</p><div className="mt-5 grid gap-4">{leads.length ? leads.map(lead => <article className="card p-5" key={lead.id}><div className="flex flex-wrap justify-between gap-4"><div><p className="eyebrow text-brass">{lead.origin} · {formatInTimeZone(lead.createdAt, siteConfig.timeZone, "dd/MM/yyyy HH:mm")}</p><h2 className="display mt-2 text-2xl">{lead.clientName}</h2><p>{lead.clientPhone}{lead.clientEmail && ` · ${lead.clientEmail}`}</p><p className="mt-3 max-w-2xl">{lead.message}</p></div><a className="btn btn-secondary" href={clientWhatsAppHref(lead.clientPhone, `Hola, te escribimos de ${siteConfig.name} por tu consulta.`)} target="_blank" rel="noopener noreferrer">WhatsApp al cliente</a></div><form action={updateLeadStatus} className="mt-5 flex flex-wrap items-end gap-2"><input type="hidden" name="id" value={lead.id} /><label className="text-sm font-semibold">Estado<select className="field mt-1" name="status" defaultValue={lead.status}><option value="NEW">Nuevo</option><option value="CONTACTED">Contactado</option><option value="CLIENT">Cliente</option><option value="DISCARDED">Descartado</option></select></label><button className="btn btn-primary text-sm" type="submit">Guardar estado</button></form></article>) : <div className="card p-8"><h2 className="display text-2xl">Aún no hay prospectos</h2><p className="mt-2">Los mensajes enviados desde contacto aparecerán aquí.</p></div>}</div></div>;
}

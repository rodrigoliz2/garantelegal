import type { Metadata } from "next";
import Link from "next/link";
import { AdminNav } from "@/components/admin-nav";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Panel administrativo", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const admin = await requireAdmin();
  const [appointments, leads, services] = await Promise.all([prisma.appointment.count({ where: { status: { in: ["PENDING", "CONFIRMED", "RESCHEDULED"] } } }), prisma.lead.count({ where: { status: "NEW" } }), prisma.service.count({ where: { published: true } })]);
  return <div className="container-page section-pad"><p className="eyebrow text-brass">Operación del despacho</p><h1 className="display mt-3 text-5xl">Hola, {admin.name}</h1><div className="mt-8"><AdminNav /></div><div className="mt-8 grid gap-3 md:grid-cols-3">{[["Citas activas", appointments, "/admin/agenda"], ["Prospectos nuevos", leads, "/admin/prospectos"], ["Servicios publicados", services, "/admin/contenido"]].map(([label, value, href]) => <Link className="card p-6" href={String(href)} key={label}><p className="eyebrow text-brass">{label}</p><p className="display mt-3 text-5xl">{value}</p></Link>)}</div><p className="mt-7 text-sm">Los cambios de agenda y contenido se guardan en la base de datos. Mantén los textos jurídicos bajo revisión del abogado titular.</p></div>;
}

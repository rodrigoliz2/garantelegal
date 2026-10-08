import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BookingForm } from "@/components/booking-form";
import { turnstileSiteKey } from "@/lib/abuse";
import { siteConfig } from "@/site.config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Agendar consulta", description: `Elige servicio, modalidad y horario para solicitar una cita con ${siteConfig.name}.` };

export default async function BookingPage({ searchParams }: { searchParams: Promise<{ servicio?: string }> }) {
  const params = await searchParams;
  const services = await prisma.service.findMany({ where: { published: true }, include: { area: true }, orderBy: [{ area: { sortOrder: "asc" } }, { sortOrder: "asc" }] });
  return <div className="container-page section-pad"><p className="eyebrow text-brass">Consulta jurídica</p><h1 className="display mt-3 text-5xl md:text-6xl">Agenda una conversación.</h1><p className="mt-5 max-w-2xl text-lg">Selecciona un horario disponible. La solicitud queda pendiente de confirmación por el despacho.</p><p className="mt-3 text-sm">{siteConfig.consultationCost}. {siteConfig.address}.</p><div className="mt-10 max-w-4xl"><BookingForm services={services.map(item => ({ id: item.id, name: item.name, areaId: item.areaId, areaName: item.area.name, isEmergency: item.isEmergency }))} initialServiceId={params.servicio} turnstileSiteKey={turnstileSiteKey()} /></div></div>;
}

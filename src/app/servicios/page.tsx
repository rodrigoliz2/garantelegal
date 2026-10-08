import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ServiceSearch } from "@/components/service-search";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Servicios jurídicos", description: "Explora las áreas de práctica y encuentra el servicio jurídico que necesitas." };

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ where: { published: true }, include: { area: true }, orderBy: [{ area: { sortOrder: "asc" } }, { sortOrder: "asc" }] });
  return <div className="container-page section-pad"><p className="eyebrow text-brass">Catálogo de servicios</p><h1 className="display mt-3 max-w-3xl text-5xl md:text-6xl">Encuentra la atención que necesitas.</h1><p className="mt-5 max-w-2xl text-lg">Explora por área o busca el tema. Si hay una detención, usa la barra de contacto inmediato.</p><div className="mt-9"><ServiceSearch services={services.map(item => ({ name: item.name, slug: item.slug, summary: item.summary, areaName: item.area.name, areaSlug: item.area.slug }))} /></div></div>;
}

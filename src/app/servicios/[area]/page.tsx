import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/site.config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ area: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: slug } = await params;
  const area = await prisma.practiceArea.findUnique({ where: { slug } });
  return { title: area ? `${area.name} en ${siteConfig.city}` : "Área no encontrada", description: area?.description };
}

export default async function AreaPage({ params }: Props) {
  const { area: slug } = await params;
  const area = await prisma.practiceArea.findUnique({ where: { slug }, include: { services: { where: { published: true }, orderBy: { sortOrder: "asc" } } } });
  if (!area) notFound();
  return <div className="container-page section-pad"><nav className="text-sm" aria-label="Ruta"><Link href="/servicios" className="underline">Servicios</Link> / {area.name}</nav><p className="eyebrow mt-10 text-brass">Área de práctica</p><h1 className="display mt-3 text-5xl md:text-6xl">{area.name}</h1><p className="mt-5 max-w-2xl text-lg">{area.description}</p><div className="mt-10 grid gap-3 md:grid-cols-2">{area.services.map(service => <Link className="card group flex min-h-44 flex-col justify-between p-6 hover:border-brass" href={`/servicios/${area.slug}/${service.slug}`} key={service.id}><div><h2 className="display text-2xl">{service.name}</h2><p className="mt-3">{service.summary}</p></div><span className="mt-4 flex items-center gap-2 font-bold">Ver detalles <ArrowRight size={17} aria-hidden="true" /></span></Link>)}</div>{area.services.length === 0 && <p className="card mt-8 p-6">Aún no hay servicios publicados en esta área.</p>}</div>;
}

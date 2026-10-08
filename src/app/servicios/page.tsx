import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ServiceSearch } from "@/components/service-search";
import { AreaIllustration } from "@/components/site/illustrations";
import { publicText } from "@/lib/public-text";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Servicios jurídicos", description: "Explora las áreas de práctica y encuentra el servicio jurídico que necesitas." };

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ where: { published: true }, include: { area: true }, orderBy: [{ area: { sortOrder: "asc" } }, { sortOrder: "asc" }] });
  const areas = Array.from(new Map(services.map(item => [item.area.slug, item.area])).values());
  return (
    <>
      <section className="wrap pb-14 pt-10 md:pb-20 md:pt-16">
        <h1 className="t-h1 max-w-[16ch]">Servicios jurídicos</h1>
        <p className="t-lead t-muted mt-6 max-w-[52ch]">Explora por área o busca el tema. Si hay una detención en este momento, llámanos o escríbenos por WhatsApp.</p>
      </section>

      <nav aria-label="Áreas de práctica" className="wrap">
        <ul className="grid border-t border-g-200 lg:grid-cols-5 lg:border-b">
          {areas.map(area => (
            <li key={area.slug} className="border-b border-g-200 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <Link href={`/servicios/${area.slug}`} className="group flex items-center gap-6 py-5 lg:h-full lg:flex-col lg:items-start lg:gap-8 lg:px-6 lg:py-10">
                <AreaIllustration slug={area.slug} className="w-[72px] shrink-0 transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1 lg:w-24" />
                <span className="text-[1.375rem] tracking-[-0.02em]"><span className="u u-hover">{area.name}</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section aria-label="Buscador de servicios" className="wrap py-16 md:py-24">
        <ServiceSearch services={services.map(item => ({ name: item.name, slug: item.slug, summary: publicText(item.summary), areaName: item.area.name, areaSlug: item.area.slug }))} />
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ServiceSearch } from "@/components/service-search";
import { AreaIllustration } from "@/components/site/illustrations";
import { publicText } from "@/lib/public-text";

export const dynamic = "force-dynamic";
export const metadata: Metadata = pageMetadata({ title: "Servicios jurídicos", path: "/servicios", description: "Servicios legales en Guadalajara y todo México: urgencias, amparo, derecho administrativo, civil, mercantil y corporativo, con sociedades, SOFOMES y fideicomisos." });

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
        <ul className="grid border-t border-g-200 xl:grid-cols-6 xl:border-b">
          {areas.map(area => (
            <li key={area.slug} className="border-b border-g-200 xl:border-b-0 xl:border-r xl:last:border-r-0">
              <Link href={`/servicios/${area.slug}`} className="group flex items-center gap-6 py-5 xl:h-full xl:flex-col xl:items-start xl:gap-8 xl:px-6 xl:py-10">
                <AreaIllustration slug={area.slug} className="w-[72px] shrink-0 transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1 xl:w-24" />
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

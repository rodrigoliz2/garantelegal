import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { areaImage } from "@/lib/areas";
import { emergencyPhoneHref } from "@/lib/contact";
import { siteConfig } from "@/site.config";
import { AreaIllustration } from "@/components/site/illustrations";
import { ParallaxImage } from "@/components/site/parallax-image";
import { RevealHeading } from "@/components/site/reveal-heading";
import { publicText } from "@/lib/public-text";

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
  const image = areaImage(area.slug);
  const emergency = area.services.some(service => service.isEmergency);

  return (
    <>
      <div className="wrap pt-8 md:pt-12"><nav className="t-small t-muted" aria-label="Ruta"><Link href="/servicios" className="u">Servicios</Link><span aria-hidden="true"> / </span><span aria-current="page">{area.name}</span></nav></div>
      <section className="wrap grid gap-8 pb-14 pt-10 md:pb-20 md:pt-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <h1 className="t-hero">{area.name}</h1>
          <p className="t-lead t-muted mt-6 max-w-[46ch]">{area.description}</p>
        </div>
        <div className="order-first flex items-end lg:order-none lg:col-span-3 lg:col-start-10 lg:justify-end">
          <AreaIllustration slug={area.slug} title={`Ilustración de ${area.name}`} className="w-24 md:w-32 lg:w-full lg:max-w-[260px]" />
        </div>
      </section>

      <ParallaxImage src={image.src} alt={image.alt} priority sizes="100vw" quality={60} className="aspect-[16/10] md:aspect-[21/9]" imageClassName="object-[50%_45%]" />

      <section aria-labelledby="servicios-area" className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <RevealHeading id="servicios-area" lines={["Servicios"]} className="t-h2" />
        </div>
        {area.services.length > 0 ? (
          <ul className="border-t border-black lg:col-span-8">
            {area.services.map(service => (
              <li key={service.id} className="border-b border-g-200">
                <Link href={`/servicios/${area.slug}/${service.slug}`} className="group grid gap-3 py-7 md:grid-cols-8 md:gap-6">
                  <span className="t-h3 transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-2 md:col-span-4">{service.name}</span>
                  <span className="t-muted md:col-span-4">{publicText(service.summary)}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="t-muted lg:col-span-8">Aún no hay servicios publicados en esta área. <Link href="/contacto" className="u text-black">Escríbenos</Link> y te orientamos.</p>
        )}
      </section>

      <section className="border-t border-g-200 bg-g-50">
        <div className="wrap flex flex-col justify-between gap-8 py-16 md:flex-row md:items-end md:py-20">
          <p className="t-h2 max-w-[18ch]">{emergency ? "Si la detención es ahora, llama." : "Cuéntanos tu caso en una consulta."}</p>
          {emergency ? (
            <a href={emergencyPhoneHref} className="b b-urgent" data-event="clic_llamar" data-origin={`area-${area.slug}`}><Phone size={18} strokeWidth={1.75} aria-hidden="true" />Llamar ahora</a>
          ) : (
            <Link href="/agendar" className="b b-solid">Agendar consulta</Link>
          )}
        </div>
      </section>
    </>
  );
}

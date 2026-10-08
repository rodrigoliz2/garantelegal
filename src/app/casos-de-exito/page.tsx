import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { pageMetadata } from "@/lib/seo";
import { Testimonials } from "@/components/site/testimonials";
import { CaseList } from "@/components/site/cases";

export const dynamic = "force-dynamic";
export const metadata: Metadata = pageMetadata({ title: "Casos y testimonios", path: "/casos-de-exito", description: "Casos documentados y testimonios de clientes de Garante Jurídico, publicados con su autorización. Cada asunto es distinto." });

// Solo existe cuando hay contenido real, anonimizado y autorizado. Sin contenido responde 404.
export default async function CasesPage() {
  const [cases, testimonials] = await Promise.all([
    prisma.caseStudy.findMany({ where: { published: true, consented: true }, include: { area: true }, orderBy: { createdAt: "desc" } }),
    prisma.testimonial.findMany({ where: { published: true, consented: true }, orderBy: { date: "desc" } })
  ]);
  if (cases.length === 0 && testimonials.length === 0) notFound();
  return (
    <>
      <section className="wrap pb-14 pt-10 md:pb-20 md:pt-16">
        <h1 className="t-h1 max-w-[14ch]">Casos y testimonios</h1>
        <p className="t-lead t-muted mt-6 max-w-[52ch]">Experiencias reales, publicadas con autorización de las personas involucradas. Los casos se presentan sin datos que las identifiquen.</p>
      </section>
      {testimonials.length > 0 && (
        <section aria-label="Testimonios" className="on-dark bg-black text-white">
          <div className="wrap py-20 md:py-28 lg:grid lg:grid-cols-12"><div className="lg:col-span-8 lg:col-start-3">
            <Testimonials items={testimonials.map(item => ({ id: item.id, author: item.author, text: item.text, date: item.date.toISOString(), source: item.source }))} />
          </div></div>
        </section>
      )}
      {cases.length > 0 && (
        <section aria-labelledby="casos" className="wrap py-20 md:py-28">
          <h2 id="casos" className="t-h2 mb-12">Casos documentados</h2>
          <CaseList items={cases.map(item => ({ id: item.id, area: item.area.name, title: item.title, problem: item.problem, strategy: item.strategy, result: item.result, duration: item.duration }))} />
        </section>
      )}
      <section className="border-t border-g-200 bg-g-50">
        <div className="wrap flex flex-col justify-between gap-8 py-16 md:flex-row md:items-end md:py-20">
          <p className="t-h2 max-w-[18ch]">Cuéntanos tu caso en una consulta.</p>
          <Link className="b b-solid" href="/agendar">Agendar consulta</Link>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Casos documentados", description: "Casos anonimizados y publicados con consentimiento." };

// Solo existe cuando hay casos reales, anonimizados y autorizados. Sin contenido, la ruta responde 404.
export default async function CasesPage() {
  const cases = await prisma.caseStudy.findMany({ where: { published: true, consented: true }, include: { area: true }, orderBy: { createdAt: "desc" } });
  if (cases.length === 0) notFound();
  return (
    <>
      <section className="wrap pb-14 pt-10 md:pb-20 md:pt-16">
        <h1 className="t-h1 max-w-[14ch]">Casos documentados</h1>
        <p className="t-lead t-muted mt-6 max-w-[52ch]">Casos reales, anonimizados y publicados con autorización. Ninguno predice el resultado de otro asunto.</p>
      </section>
      <section aria-label="Casos" className="wrap pb-24 md:pb-32">
        {cases.map(item => (
          <article key={item.id} className="grid gap-8 border-t border-black py-10 lg:grid-cols-12">
            <div className="lg:col-span-4"><p className="t-small t-muted">{item.area.name}</p><h2 className="t-h3 mt-3">{item.title}</h2></div>
            <dl className="grid gap-6 text-[1.0625rem] sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {[["Situación", item.problem], ["Estrategia", item.strategy], ["Resultado de ese caso", item.result], ["Duración", item.duration]].map(([term, value]) => <div key={term}><dt className="t-small t-muted">{term}</dt><dd className="mt-1">{value}</dd></div>)}
            </dl>
          </article>
        ))}
      </section>
    </>
  );
}

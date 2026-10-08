import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Casos documentados", description: "Casos anonimizados y publicados con consentimiento, cuando estén disponibles." };

export default async function CasesPage() {
  const cases = await prisma.caseStudy.findMany({ where: { published: true, consented: true }, include: { area: true }, orderBy: { createdAt: "desc" } });
  return <div className="container-page section-pad"><p className="eyebrow text-brass">Experiencia documentada</p><h1 className="display mt-3 text-5xl">Casos documentados</h1>{cases.length ? <div className="mt-9 grid gap-4 md:grid-cols-2">{cases.map(item => <article className="card p-6" key={item.id}><p className="eyebrow text-brass">{item.area.name}</p><h2 className="display mt-3 text-3xl">{item.title}</h2><dl className="mt-5 space-y-3"><div><dt className="font-bold">Situación</dt><dd>{item.problem}</dd></div><div><dt className="font-bold">Estrategia</dt><dd>{item.strategy}</dd></div><div><dt className="font-bold">Resultado de ese caso</dt><dd>{item.result}</dd></div><div><dt className="font-bold">Duración</dt><dd>{item.duration}</dd></div></dl><p className="mt-4 text-sm">Este caso no predice el resultado de otro asunto.</p></article>)}</div> : <div className="card mt-9 max-w-2xl p-8"><h2 className="display text-3xl">Sin casos publicados por ahora</h2><p className="mt-3">Solo mostraremos casos reales, anonimizados y autorizados por la persona involucrada.</p></div>}</div>;
}

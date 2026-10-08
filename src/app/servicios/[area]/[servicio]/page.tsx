import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { serviceMessage } from "@/lib/contact";
import { siteConfig, whatsappHref } from "@/site.config";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ area: string; servicio: string }> };

async function getService(params: Props["params"]) {
  const { area, servicio } = await params;
  return prisma.service.findFirst({ where: { slug: servicio, published: true, area: { slug: area } }, include: { area: true } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService(params);
  return { title: service ? `${service.name} en ${siteConfig.city}` : "Servicio no encontrado", description: service?.summary };
}

export default async function ServicePage({ params }: Props) {
  const service = await getService(params);
  if (!service) notFound();
  const documents = Array.isArray(service.documents) ? service.documents.map(String) : [];
  const steps = Array.isArray(service.steps) ? service.steps.map(String) : [];
  const faqs = Array.isArray(service.faqs) ? service.faqs.filter((faq): faq is { question: string; answer: string } => Boolean(faq && typeof faq === "object" && !Array.isArray(faq) && "question" in faq && "answer" in faq)).map(faq => ({ question: String(faq.question), answer: String(faq.answer) })) : [];
  return <>
    <section className="bg-navy py-16 text-white"><div className="container-page"><nav className="text-sm text-[#d5dce0]" aria-label="Ruta"><Link href="/servicios" className="underline">Servicios</Link> / <Link href={`/servicios/${service.area.slug}`} className="underline">{service.area.name}</Link></nav><p className="eyebrow mt-10 text-[#dbbf83]">{service.area.name}</p><h1 className="display mt-3 max-w-4xl text-5xl md:text-6xl">{service.name}</h1><p className="mt-6 max-w-2xl text-lg text-[#e2e8eb]">{service.summary}</p><div className="mt-8 flex flex-wrap gap-3">{service.isEmergency ? <a className="btn btn-emergency" href={siteConfig.phoneHref} data-event="clic_llamar" data-origin="servicio"><Phone size={18} aria-hidden="true" />Llamar ahora</a> : <Link className="btn btn-brass" href={`/agendar?servicio=${encodeURIComponent(service.id)}`}>Agendar consulta <ArrowRight size={18} aria-hidden="true" /></Link>}<a className="btn btn-secondary" href={whatsappHref(serviceMessage(service.name))} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="servicio"><MessageCircle size={18} aria-hidden="true" />WhatsApp</a></div></div></section>
    <div className="container-page section-pad grid gap-12 lg:grid-cols-[1fr_260px]"><div className="space-y-12"><section><p className="eyebrow text-brass">Qué es</p><h2 className="display mt-3 text-3xl">Sobre este servicio</h2><p className="mt-4">{service.description}</p></section><section><p className="eyebrow text-brass">Cuándo aplica</p><h2 className="display mt-3 text-3xl">Cuándo consultar</h2><p className="mt-4">{service.appliesWhen}</p></section><section><p className="eyebrow text-brass">Preparación</p><h2 className="display mt-3 text-3xl">Documentos útiles</h2><ul className="mt-4 list-inside list-disc space-y-2">{documents.map(item => <li key={item}>{item}</li>)}</ul></section><section><p className="eyebrow text-brass">Proceso</p><h2 className="display mt-3 text-3xl">Cómo avanzamos</h2><ol className="mt-4 space-y-3">{steps.map((item, index) => <li className="flex gap-3" key={item}><span className="font-bold text-brass">0{index + 1}</span>{item}</li>)}</ol></section><section><p className="eyebrow text-brass">Tiempos</p><h2 className="display mt-3 text-3xl">Plazos orientativos</h2><p className="mt-4">Los tiempos dependen del procedimiento, la autoridad y los documentos. [BORRADOR JURÍDICO: validar plazos por el abogado titular]</p></section><section><p className="eyebrow text-brass">Preguntas frecuentes</p><h2 className="display mt-3 text-3xl">Dudas comunes</h2><div className="mt-4 space-y-4">{faqs.map(faq => <div key={faq.question} className="border-t border-[#d8d3c8] pt-4"><h3 className="font-bold">{faq.question}</h3><p className="mt-2">{faq.answer}</p></div>)}</div></section></div><aside className="card h-fit p-5 lg:sticky lg:top-6"><p className="eyebrow text-brass">Siguiente paso</p><p className="mt-3">Cuéntanos lo esencial y revisamos contigo las opciones.</p>{service.isEmergency ? <a className="btn btn-emergency mt-5 w-full" href={siteConfig.phoneHref}>Llamar ahora</a> : <Link className="btn btn-primary mt-5 w-full" href={`/agendar?servicio=${encodeURIComponent(service.id)}`}>Agendar consulta</Link>}</aside></div>
  </>;
}

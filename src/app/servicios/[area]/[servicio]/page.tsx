import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { serviceMessage } from "@/lib/contact";
import { siteConfig, whatsappHref } from "@/site.config";
import { AreaIllustration } from "@/components/site/illustrations";
import { publicText } from "@/lib/public-text";

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

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="scroll-mt-[calc(var(--header-h)+24px)] border-t border-g-200 py-10 md:py-14">
      <h2 id={`${id}-t`} className="text-[clamp(1.5rem,2.4vw,2rem)] font-normal leading-tight tracking-[-0.025em]">{title}</h2>
      <div className="mt-5 max-w-[64ch] text-[1.0625rem] leading-relaxed">{children}</div>
    </section>
  );
}

export default async function ServicePage({ params }: Props) {
  const service = await getService(params);
  if (!service) notFound();
  const documents = Array.isArray(service.documents) ? service.documents.map(String) : [];
  const steps = Array.isArray(service.steps) ? service.steps.map(String) : [];
  const faqs = Array.isArray(service.faqs) ? service.faqs.filter((faq): faq is { question: string; answer: string } => Boolean(faq && typeof faq === "object" && !Array.isArray(faq) && "question" in faq && "answer" in faq)).map(faq => ({ question: String(faq.question), answer: String(faq.answer) })) : [];
  const sections = [
    { id: "que-es", title: "Qué es" },
    { id: "cuando", title: "Cuándo aplica" },
    ...(documents.length ? [{ id: "documentos", title: "Documentos útiles" }] : []),
    ...(steps.length ? [{ id: "proceso", title: "Cómo avanzamos" }] : []),
    { id: "tiempos", title: "Plazos orientativos" },
    ...(faqs.length ? [{ id: "preguntas", title: "Preguntas frecuentes" }] : [])
  ];
  const primary = service.isEmergency
    ? <a className="b b-urgent" href={siteConfig.phoneHref} data-event="clic_llamar" data-origin="servicio"><Phone size={18} strokeWidth={1.75} aria-hidden="true" />Llamar ahora</a>
    : <Link className="b b-solid" href={`/agendar?servicio=${encodeURIComponent(service.id)}`}>Agendar consulta</Link>;

  return (
    <>
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }).replace(/</g, "\\u003c") }} />}

      <div className="wrap pt-8 md:pt-12">
        <nav className="t-small t-muted" aria-label="Ruta"><Link href="/servicios" className="u">Servicios</Link><span aria-hidden="true"> / </span><Link href={`/servicios/${service.area.slug}`} className="u">{service.area.name}</Link></nav>
      </div>

      <section className="wrap grid gap-10 pb-14 pt-10 md:pb-20 md:pt-14 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <h1 className="t-h1 max-w-[18ch]">{service.name}</h1>
          <p className="t-lead t-muted mt-6 max-w-[52ch]">{publicText(service.summary)}</p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            {primary}
            <a className="b b-line" href={whatsappHref(serviceMessage(service.name))} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="servicio"><MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />WhatsApp</a>
          </div>
        </div>
        <div className="hidden items-end justify-end lg:col-span-3 lg:flex">
          <AreaIllustration slug={service.area.slug} className="w-full max-w-[200px] text-g-600" />
        </div>
      </section>

      <div className="wrap grid gap-10 pb-20 md:pb-28 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <nav aria-label="En esta página" className="hidden lg:block">
              <ul className="grid gap-1 border-t border-black pt-4 text-[.9375rem]">
                {sections.map(section => <li key={section.id}><a href={`#${section.id}`} className="u u-hover inline-flex min-h-10 items-center">{section.title}</a></li>)}
              </ul>
            </nav>
            <div className="border-t border-black pt-5 lg:mt-10">
              <p className="t-muted text-[.9375rem]">Cuéntanos lo esencial y revisamos contigo las opciones.</p>
              <div className="mt-4 grid gap-2">{primary}</div>
            </div>
          </div>
        </aside>

        <article className="lg:col-span-8 lg:col-start-5">
          <Block id="que-es" title="Qué es"><p>{publicText(service.description)}</p></Block>
          <Block id="cuando" title="Cuándo aplica"><p>{publicText(service.appliesWhen)}</p></Block>
          {documents.length > 0 && (
            <Block id="documentos" title="Documentos útiles">
              <ul className="border-t border-g-200">{documents.map(publicText).map(item => <li key={item} className="border-b border-g-200 py-3">{item}</li>)}</ul>
            </Block>
          )}
          {steps.length > 0 && (
            <Block id="proceso" title="Cómo avanzamos">
              <ol className="grid gap-6 border-l border-black pl-6">{steps.map(publicText).map(item => <li key={item}>{item}</li>)}</ol>
            </Block>
          )}
          <Block id="tiempos" title="Plazos orientativos"><p>Los tiempos dependen del procedimiento, la autoridad y los documentos disponibles. Te damos una estimación concreta en la consulta, una vez revisado tu caso.</p></Block>
          {faqs.length > 0 && (
            <Block id="preguntas" title="Preguntas frecuentes">
              <div className="border-t border-g-200">
                {faqs.map(faq => (
                  <details key={faq.question} className="group border-b border-g-200">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium [&::-webkit-details-marker]:hidden">{faq.question}<span aria-hidden="true" className="text-[1.5rem] font-light leading-none transition-transform duration-200 group-open:rotate-45">+</span></summary>
                    <p className="t-muted pb-5 pr-8">{publicText(faq.answer)}</p>
                  </details>
                ))}
              </div>
            </Block>
          )}
          <p className="t-small t-muted border-t border-g-200 pt-6">Texto en borrador para revisión del abogado titular. Es información general y no sustituye una consulta.</p>
        </article>
      </div>
    </>
  );
}

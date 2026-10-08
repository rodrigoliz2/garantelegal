import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";
import { emergencyPhoneHref, emergencyWhatsAppHref } from "@/lib/contact";
import { provided, siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Urgencias jurídicas por detención y alcoholímetro",
  description: `Ayuda jurídica ante detenciones y arrestos por alcoholímetro. Sede en ${siteConfig.city}, atención nacional.`
};

// Página de aterrizaje para urgencias: sin animaciones, sin fotografías, todo estático.
const steps = [
  { title: "Llama o escribe", text: "Dinos dónde está la persona y qué autoridad la tiene bajo custodia. No necesitas llenar un formulario antes." },
  { title: "Ten los datos a mano", text: "Nombre de la persona, lugar de la detención o centro de sanciones administrativas y hora aproximada." },
  { title: "Revisamos la situación", text: "El despacho escucha el caso y explica las opciones disponibles según la autoridad y el lugar." }
];

const checklist = ["Nombre completo de la persona detenida y un teléfono donde localizarte.", "Ciudad, lugar o autoridad que realizó la detención.", "Hora aproximada y la boleta o documento que recibió, si existe."];

const faqs = [
  { question: "¿Debo esperar a tener todos los documentos?", answer: "No. Puedes llamar con los datos disponibles y reunir el resto después." },
  { question: "¿Atienden fuera de Guadalajara?", answer: `Sí, el despacho indica opciones de atención en ${siteConfig.coverage} según el asunto.` },
  { question: "¿Qué significa amparo?", answer: "Es un proceso judicial para pedir la protección de derechos frente a ciertos actos de autoridad. Su viabilidad depende del caso concreto." }
];

export default function EmergenciesPage() {
  const hours = provided(siteConfig.emergencyHours);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }).replace(/</g, "\\u003c") }} />

      <section className="border-b border-g-200">
        <div className="wrap grid gap-10 pb-12 pt-10 md:pb-20 md:pt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h1 className="t-h1 max-w-[14ch]">Ante una detención, habla con una persona.</h1>
            <p className="t-lead t-muted mt-6 max-w-[48ch]">Asistencia jurídica por arresto por alcoholímetro, detenciones y traslado a un centro de sanciones administrativas. Atención en {siteConfig.coverage}.</p>
          </div>
          <div className="lg:col-span-5">
            <a href={emergencyPhoneHref} className="b b-urgent b-lg w-full" data-event="clic_llamar" data-origin="urgencias"><Phone size={20} strokeWidth={1.75} aria-hidden="true" />Llamar ahora</a>
            <a href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" className="b b-solid b-lg mt-2 w-full" data-event="clic_whatsapp" data-origin="urgencias"><MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />Escribir por WhatsApp</a>
            <p className="mt-5 text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-none tracking-[-0.04em]"><a href={emergencyPhoneHref} className="u" data-event="clic_llamar" data-origin="urgencias-numero">{siteConfig.phoneDisplay}</a></p>
            <p className="t-small t-muted mt-4">{hours ? `${hours}. ` : ""}Si no logramos atender la llamada, deja un mensaje por WhatsApp.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="ahora" className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <h2 id="ahora" className="t-h2 lg:col-span-4">Qué hacer ahora</h2>
        <ol className="grid gap-10 md:grid-cols-3 lg:col-span-8">
          {steps.map(step => (
            <li key={step.title} className="border-t border-black pt-5">
              <h3 className="t-h3">{step.title}</h3>
              <p className="t-muted mt-3">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="datos" className="on-dark bg-black text-white">
        <div className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <h2 id="datos" className="t-h2 lg:col-span-5">Datos que ayudan a orientarte</h2>
          <ul className="grid gap-0 lg:col-span-6 lg:col-start-7">
            {checklist.map(item => <li key={item} className="border-t border-g-900 py-5 text-[1.125rem] leading-snug last:border-b">{item}</li>)}
          </ul>
        </div>
      </section>

      <section aria-labelledby="preguntas" className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <h2 id="preguntas" className="t-h2 lg:col-span-4">Antes de llamar</h2>
        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map(faq => (
            <details key={faq.question} className="group border-t border-g-200 last-of-type:border-b">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.125rem] font-medium [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span aria-hidden="true" className="text-[1.5rem] font-light leading-none group-open:rotate-45">+</span>
              </summary>
              <p className="t-muted pb-6 pr-8">{faq.answer}</p>
            </details>
          ))}
          <p className="t-small t-muted mt-10 max-w-[60ch]">Borrador para revisión del abogado titular. El contenido es informativo y no sustituye una consulta jurídica.</p>
        </div>
      </section>
    </>
  );
}

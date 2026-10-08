import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { MessageCircle } from "lucide-react";
import { emergencyWhatsAppHref } from "@/lib/contact";
import { provided, siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({ title: "Abogado urgente por detención o alcoholímetro", path: "/urgencias", description: `Ayuda jurídica inmediata ante detenciones, arresto por alcoholímetro y vehículos en el corralón. Llámanos o escríbenos por WhatsApp al ${siteConfig.phoneDisplay}.` });

// Página de aterrizaje para urgencias: sin animaciones, sin fotografías, todo estático.
const steps = [
  { title: "Llama o escribe por WhatsApp", text: "Dinos dónde está la persona y qué autoridad la tiene bajo custodia. No necesitas llenar un formulario antes." },
  { title: "Ten los datos a mano", text: "Nombre de la persona, lugar de la detención o centro de sanciones administrativas y hora aproximada." },
  { title: "Revisamos la situación", text: "El despacho escucha el caso y explica las opciones disponibles según la autoridad y el lugar." }
];

const checklist = ["Nombre completo de la persona detenida y un teléfono donde localizarte.", "Ciudad, lugar o autoridad que realizó la detención.", "Hora aproximada y la boleta o documento que recibió, si existe."];

const faqs = [
  { question: "¿Debo esperar a tener todos los documentos?", answer: "No. Escríbenos o llámanos por WhatsApp con los datos que tengas y reúne el resto después." },
  { question: "¿Atienden fuera de Guadalajara?", answer: `Sí. Atendemos asuntos en ${siteConfig.coverage}; según el caso, te indicamos cómo y dónde actuar.` },
  { question: "¿Qué significa amparo?", answer: "Es un juicio para pedir a un tribunal federal que proteja tus derechos frente a un acto de autoridad, como una detención o una sanción. Si procede, depende de los hechos y de los plazos del caso; lo revisamos contigo." }
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
            <a href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" className="b b-urgent b-lg w-full" data-event="clic_whatsapp" data-origin="urgencias"><MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />Llamar o escribir por WhatsApp</a>
            <p className="mt-5 text-[1.25rem] tracking-[-0.02em]">WhatsApp <a href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" className="u" data-event="clic_whatsapp" data-origin="urgencias-numero">{siteConfig.phoneDisplay}</a></p>
            <p className="t-small t-muted mt-3 max-w-[46ch]">Se abre el chat del despacho: desde ahí puedes llamar o escribir. No atendemos llamadas telefónicas convencionales.{hours ? ` ${hours}.` : ""} Si no podemos contestar en ese momento, deja tu mensaje en el mismo chat.</p>
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

        </div>
      </section>
    </>
  );
}

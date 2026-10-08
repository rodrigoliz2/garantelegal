import type { Metadata } from "next";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { emergencyPhoneHref, emergencyWhatsAppHref } from "@/lib/contact";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Urgencias jurídicas por detención y alcoholímetro",
  description: `Ayuda jurídica ante detenciones y arrestos por alcoholímetro. Sede en ${siteConfig.city}, atención nacional.`
};

const steps = [
  { title: "Llama o escribe", text: "Dinos dónde está la persona y quién la tiene bajo custodia. No necesitas llenar un formulario antes de contactar." },
  { title: "Ten los datos a mano", text: "Nombre de la persona, lugar de la detención o centro de sanciones administrativas y hora aproximada." },
  { title: "Revisamos la situación", text: "El despacho escucha el caso y explica las opciones disponibles según la autoridad y el lugar." }
];

export default function EmergenciesPage() {
  return <>
    <section className="bg-navy py-16 text-white md:py-24"><div className="container-page grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
      <div><p className="eyebrow text-[#dbbf83]">Contacto inmediato · {siteConfig.city}</p><h1 className="display mt-5 max-w-3xl text-[clamp(3rem,8vw,6rem)]">Ante una detención, habla con una persona.</h1><p className="mt-6 max-w-xl text-lg text-[#e2e8eb]">Asistencia jurídica por arresto por alcoholímetro, detenciones y traslado a un centro de sanciones administrativas. Atención en {siteConfig.coverage}.</p></div>
      <div className="rounded bg-paper p-5 text-ink md:p-7"><p className="eyebrow text-brass">Actúa ahora</p><div className="mt-5 grid gap-3"><a className="btn btn-emergency w-full text-lg" href={emergencyPhoneHref} data-event="clic_llamar" data-origin="urgencias"><Phone aria-hidden="true" />Llamar ahora</a><a className="btn btn-primary w-full text-lg" href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="urgencias"><MessageCircle aria-hidden="true" />Escribir por WhatsApp</a></div><p className="mt-5 text-sm">{siteConfig.emergencyHours}. Si no logramos atender la llamada, deja un mensaje por WhatsApp.</p></div>
    </div></section>
    <section className="section-pad container-page"><p className="eyebrow text-brass">Qué hacer ahora</p><h2 className="display mt-3 max-w-2xl text-4xl md:text-5xl">Tres pasos sencillos</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{steps.map((step, i) => <div className="card p-6" key={step.title}><span className="eyebrow text-brass">0{i + 1}</span><h3 className="display mt-5 text-2xl">{step.title}</h3><p className="mt-3">{step.text}</p></div>)}</div></section>
    <section className="bg-paper section-pad"><div className="container-page grid gap-8 md:grid-cols-2"><div><p className="eyebrow text-brass">Al comunicarte</p><h2 className="display mt-3 text-4xl">Datos que ayudan a orientarte</h2></div><ul className="space-y-4">{["Nombre de la persona detenida y cómo contactarte.", "Ciudad, lugar o autoridad que realizó la detención.", "Hora aproximada y documento o boleta que recibió, si existe."].map(item => <li className="flex gap-3 border-b border-[#d8d3c8] pb-4" key={item}><ArrowRight className="mt-1 shrink-0 text-brass" size={18} aria-hidden="true" />{item}</li>)}</ul></div></section>
    <section className="section-pad container-page"><p className="eyebrow text-brass">Preguntas frecuentes</p><h2 className="display mt-3 text-4xl">Antes de llamar</h2><div className="mt-7 max-w-3xl space-y-5"><div><h3 className="font-bold">¿Debo esperar a tener todos los documentos?</h3><p>No. Puedes llamar con los datos disponibles y reunir el resto después.</p></div><div><h3 className="font-bold">¿Atienden fuera de Guadalajara?</h3><p>Sí, el despacho indica opciones de atención en {siteConfig.coverage} según el asunto.</p></div><div><h3 className="font-bold">¿Qué significa amparo?</h3><p>Es un proceso judicial para pedir la protección de derechos frente a ciertos actos de autoridad. Su viabilidad depende del caso concreto.</p></div></div><p className="mt-8 rounded border-l-4 border-brass bg-paper p-4 text-sm"><strong>Borrador para revisión del abogado titular:</strong> «El Torito» (CDMX) y «la Curva» (Guadalajara) son nombres locales que deben comprobarse antes de publicar. El contenido es informativo y no sustituye una consulta jurídica.</p></section>
  </>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MessageCircle, Phone } from "lucide-react";
import { emergencyPhoneHref, emergencyWhatsAppHref } from "@/lib/contact";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: `Abogados en ${siteConfig.city} | ${siteConfig.name}`,
  description: `Urgencias jurídicas y consultas en derecho constitucional, administrativo, civil y mercantil. Sede en ${siteConfig.city}; atención nacional.`
};

const practices = [
  { name: "Urgencias", slug: "urgencias", text: "Detenciones, arresto por alcoholímetro y vehículos en depósito." },
  { name: "Administrativo", slug: "administrativo", text: "Multas, clausuras, licencias y actos de autoridad." },
  { name: "Constitucional", slug: "constitucional", text: "Amparo y defensa de derechos frente a actos de autoridad." },
  { name: "Civil", slug: "civil", text: "Contratos, arrendamiento, adeudos y sucesiones." },
  { name: "Mercantil", slug: "mercantil", text: "Conflictos comerciales, pagarés y asuntos de sociedades." }
];

export default function HomePage() {
  return <>
    <section className="bg-navy text-white"><div className="container-page grid gap-10 py-16 md:grid-cols-[1.25fr_.75fr] md:items-end md:py-28">
      <div><p className="eyebrow text-[#dbbf83]">Sede en {siteConfig.city} · Atención nacional</p><h1 className="display mt-5 max-w-[12ch] text-[clamp(3.25rem,8vw,7rem)]">La orientación empieza con una conversación.</h1><p className="mt-6 max-w-xl text-lg text-[#e2e8eb]">Si alguien fue detenido, comunícate ahora. Si tu asunto puede esperar, elige un servicio y agenda una consulta.</p></div>
      <div className="grid gap-3"><Link href="/urgencias" className="group flex min-h-24 items-center justify-between gap-4 rounded bg-emergency p-5 text-lg font-bold"><span>Tengo una urgencia<span className="mt-1 block text-sm font-normal">Detención, alcoholímetro o corralón</span></span><ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link><Link href="/agendar" className="group flex min-h-24 items-center justify-between gap-4 rounded bg-paper p-5 text-lg font-bold text-ink"><span>Quiero una consulta<span className="mt-1 block text-sm font-normal">Elige servicio, día y hora</span></span><ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></div>
    </div></section>
    <section className="section-pad container-page"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-brass">Áreas de práctica</p><h2 className="display mt-3 text-4xl md:text-5xl">Encuentra por dónde empezar</h2></div><Link href="/servicios" className="font-bold underline">Ver todos los servicios</Link></div><div className="mt-9 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{practices.map((practice, index) => <Link className="card group flex min-h-52 flex-col justify-between p-6 transition-colors hover:border-brass" href={`/servicios/${practice.slug}`} key={practice.slug}><div><span className="eyebrow text-brass">0{index + 1} / área</span><h3 className="display mt-4 text-2xl">{practice.name}</h3><p className="mt-2 text-sm">{practice.text}</p></div><span className="mt-4 inline-flex items-center gap-2 font-bold">Explorar <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link>)}</div></section>
    <section className="bg-paper section-pad"><div className="container-page grid gap-10 md:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow text-brass">Cómo trabajamos</p><h2 className="display mt-3 text-4xl md:text-5xl">Pasos claros, desde el primer contacto.</h2></div><ol className="divide-y divide-[#d8d3c8] border-t border-[#d8d3c8]">{[["01", "Cuéntanos lo esencial", "Llama, escribe o agenda. Para una urgencia no hay formulario previo."], ["02", "Revisamos tu situación", "Identificamos la autoridad, documentos y decisiones que requieren atención."], ["03", "Conoces las opciones", "Explicamos los pasos posibles y el alcance del servicio antes de avanzar."]].map(([number, title, copy]) => <li className="grid grid-cols-[3rem_1fr] gap-3 py-6" key={number}><span className="eyebrow pt-2 text-brass">{number}</span><div><h3 className="display text-2xl">{title}</h3><p className="mt-2">{copy}</p></div></li>)}</ol></div></section>
    <section className="section-pad container-page grid gap-8 md:grid-cols-2"><div className="card p-7"><Phone className="text-emergency" aria-hidden="true" /><h2 className="display mt-5 text-3xl">¿Es urgente?</h2><p className="mt-3">Una llamada puede iniciar la revisión del caso. Ten a mano el lugar y la hora aproximada.</p><div className="mt-6 flex flex-wrap gap-3"><a className="btn btn-emergency" href={emergencyPhoneHref} data-event="clic_llamar" data-origin="inicio">Llamar ahora</a><a className="btn btn-secondary" href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="inicio"><MessageCircle size={18} aria-hidden="true" />WhatsApp</a></div></div><div className="card p-7"><CalendarDays className="text-brass" aria-hidden="true" /><h2 className="display mt-5 text-3xl">¿Puedes programarlo?</h2><p className="mt-3">Selecciona el servicio, la modalidad y un horario disponible. Recibirás un folio de cita.</p><Link className="btn btn-primary mt-6" href="/agendar">Agendar consulta <ArrowRight size={18} aria-hidden="true" /></Link></div></section>
    <section className="bg-navy py-12 text-white"><div className="container-page flex flex-wrap items-center justify-between gap-5"><div><p className="font-display text-2xl">Información, no promesas.</p><p className="mt-1 max-w-2xl text-sm text-[#d5dce0]">Cada asunto depende de sus hechos y documentos. Los textos jurídicos son borradores sujetos a revisión del abogado titular.</p></div><Link href="/servicios" className="btn btn-secondary">Explorar servicios</Link></div></section>
  </>;
}

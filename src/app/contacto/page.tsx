import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { turnstileSiteKey } from "@/lib/abuse";
import { siteConfig, whatsappHref } from "@/site.config";

export const metadata: Metadata = { title: "Contacto", description: `Contacta a ${siteConfig.name} en ${siteConfig.city}.` };
export const dynamic = "force-dynamic";

export default function ContactPage() {
  return <div className="container-page section-pad"><p className="eyebrow text-brass">Contacto</p><h1 className="display mt-3 text-5xl md:text-6xl">Hablemos de tu asunto.</h1><p className="mt-5 max-w-2xl text-lg">Sede en {siteConfig.city}; atención en {siteConfig.coverage}. Si hay una detención, llama de inmediato.</p><div className="mt-10 grid gap-8 lg:grid-cols-2"><div className="space-y-5"><div className="card p-6"><h2 className="display text-2xl">Línea de contacto</h2><a className="mt-3 block font-bold underline" href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a><a className="mt-2 block underline" href={whatsappHref("Hola, quiero información sobre sus servicios jurídicos.")} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a><p className="mt-4 text-sm">{siteConfig.emergencyHours}</p></div><div className="card p-6"><h2 className="display text-2xl">Oficina y correo</h2><p className="mt-3">{siteConfig.address}</p><p className="mt-2">{siteConfig.contactEmail}</p><p className="mt-2">{siteConfig.fees}</p></div></div><ContactForm siteKey={turnstileSiteKey()} /></div></div>;
}

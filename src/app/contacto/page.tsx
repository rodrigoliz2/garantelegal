import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact-form";
import { turnstileSiteKey } from "@/lib/abuse";
import { generalWhatsAppHref } from "@/lib/contact";
import { provided, siteConfig } from "@/site.config";
import { ParallaxImage } from "@/components/site/parallax-image";

export const metadata: Metadata = pageMetadata({ title: "Contacto", path: "/contacto", description: `WhatsApp ${siteConfig.phoneDisplay} para llamadas y mensajes, correo ${siteConfig.contactEmail} e Instagram ${siteConfig.instagram.handle}. Sede en Guadalajara, Jalisco.` });
export const dynamic = "force-dynamic";

export default function ContactPage() {
  const email = provided(siteConfig.contactEmail);
  const address = provided(siteConfig.address);
  const hours = provided(siteConfig.emergencyHours);
  const fees = provided(siteConfig.fees);
  return (
    <div className="wrap grid gap-14 pb-24 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <h1 className="t-h1 max-w-[12ch]">Hablemos de tu asunto.</h1>
        <p className="t-lead t-muted mt-6 max-w-[40ch]">Sede en {siteConfig.city}; atención en {siteConfig.coverage}. Si hay una detención, contáctanos de inmediato por WhatsApp.</p>
        <div className="mt-10 border-t border-g-200 pt-6">
          <p className="t-small t-muted">WhatsApp: llamadas y mensajes</p>
          <a className="u mt-2 text-[clamp(1.75rem,2.6vw,2.25rem)] font-light leading-none tracking-[-0.035em]" href={generalWhatsAppHref} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="contacto">{siteConfig.phoneDisplay}</a>
          <p className="t-small t-muted mt-3 max-w-[40ch]">No atendemos llamadas telefónicas convencionales: llama o escribe desde WhatsApp.</p>
          {hours && <p className="t-small t-muted mt-2">{hours}</p>}
          <p className="mt-6"><span className="t-small t-muted block">Instagram</span><a className="u mt-1 text-[1.125rem]" href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" data-event="clic_instagram" data-origin="contacto">{siteConfig.instagram.handle}</a></p>
        </div>
        {(email || address || fees) && (
          <dl className="mt-8 grid border-t border-g-200 text-[.9375rem]">
            {email && <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-g-200 py-4"><dt className="t-muted">Correo</dt><dd><a className="u" href={`mailto:${email}`}>{email}</a></dd></div>}
            {address && <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-g-200 py-4"><dt className="t-muted">Oficina</dt><dd>{address}</dd></div>}
            {fees && <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-g-200 py-4"><dt className="t-muted">Honorarios</dt><dd>{fees}</dd></div>}
          </dl>
        )}
        <ParallaxImage src="/fotos/escalera-concreto.jpg" alt="Escalera de concreto en blanco y negro" sizes="(min-width: 1024px) 34vw, 100vw" quality={60} strength={5} className="mt-14 hidden aspect-[4/5] max-w-[440px] lg:block" />
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <ContactForm siteKey={turnstileSiteKey()} />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { turnstileSiteKey } from "@/lib/abuse";
import { emergencyPhoneHref } from "@/lib/contact";
import { provided, siteConfig, whatsappHref } from "@/site.config";
import { ParallaxImage } from "@/components/site/parallax-image";

export const metadata: Metadata = { title: "Contacto", description: `Contacta a ${siteConfig.name} en ${siteConfig.city}.` };
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
        <p className="t-lead t-muted mt-6 max-w-[40ch]">Sede en {siteConfig.city}; atención en {siteConfig.coverage}. Si hay una detención, llama de inmediato.</p>
        <div className="mt-10 border-t border-g-200 pt-6">
          <p className="t-small t-muted">Teléfono y WhatsApp</p>
          <a className="u mt-2 text-[clamp(2rem,3.6vw,3rem)] font-light leading-none tracking-[-0.04em]" href={emergencyPhoneHref} data-event="clic_llamar" data-origin="contacto">{siteConfig.phoneDisplay}</a>
          <p className="mt-4"><a className="u" href={whatsappHref("Hola, quiero información sobre sus servicios jurídicos.")} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="contacto">Escribir por WhatsApp</a></p>
          {hours && <p className="t-small t-muted mt-4">{hours}</p>}
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

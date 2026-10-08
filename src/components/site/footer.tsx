import Link from "next/link";
import { Wordmark } from "./wordmark";
import { emergencyWhatsAppHref } from "@/lib/contact";
import { provided, siteConfig } from "@/site.config";

const groups = [
  { title: "Despacho", links: [["Urgencias", "/urgencias"], ["Áreas de práctica", "/servicios"], ["La firma", "/nosotros"], ["Guías", "/guias"]] },
  { title: "Contacto", links: [["Agendar consulta", "/agendar"], ["Escríbenos", "/contacto"]] },
  { title: "Legal", links: [["Aviso de privacidad", "/aviso-de-privacidad"], ["Términos de uso", "/terminos"]] }
] as const;

export function SiteFooter() {
  const address = provided(siteConfig.address);
  const email = provided(siteConfig.contactEmail);
  return (
    <footer className="on-dark bg-black text-white">
      <div className="wrap grid gap-14 pb-10 pt-20 md:pt-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href="/" aria-label={`${siteConfig.name}, inicio`} className="tap inline-flex min-h-12 items-center"><Wordmark className="text-[1.5rem]" /></Link>
          <p className="t-muted mt-4 max-w-[34ch]">Sede en {siteConfig.city}. Atención en {siteConfig.coverage}.</p>
          <dl className="mt-10 grid gap-3 text-[.9375rem]">
            <div><dt className="t-muted t-small">WhatsApp: llamadas y mensajes</dt><dd className="mt-1"><a href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" className="u" data-event="clic_whatsapp" data-origin="pie">{siteConfig.phoneDisplay}</a></dd></div>
            {email && <div><dt className="t-muted t-small">Correo</dt><dd className="mt-1"><a className="u" href={`mailto:${email}`}>{email}</a></dd></div>}
          </dl>
          {address && <p className="t-muted mt-2 max-w-[34ch]">{address}</p>}
        </div>
        <nav aria-label="Enlaces del pie" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
          {groups.map(group => (
            <div key={group.title}>
              <p className="t-small t-muted">{group.title}</p>
              <ul className="mt-4 grid gap-1">
                {group.links.map(([label, href]) => <li key={href}><Link href={href} className="u u-hover inline-flex min-h-11 items-center">{label}</Link></li>)}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="wrap">
        <div className="grid gap-4 border-t border-g-900 py-8 text-[.8125rem] text-g-400 md:grid-cols-2">
          <p className="max-w-[60ch]">El contenido de este sitio es informativo; no constituye asesoría legal ni crea una relación abogado-cliente.</p>
          <p className="md:text-right">© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  );
}

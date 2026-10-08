import Link from "next/link";
import { siteConfig } from "@/site.config";

export function SiteFooter() {
  return <footer className="bg-navy py-12 text-white">
    <div className="container-page grid gap-8 md:grid-cols-3">
      <div><p className="font-display text-2xl">{siteConfig.name}</p><p className="mt-3 text-sm text-[#d5dce0]">Sede en {siteConfig.city}. Atención en {siteConfig.coverage}.</p></div>
      <nav aria-label="Enlaces del pie" className="flex flex-col items-start gap-2 text-sm">
        <Link href="/servicios">Servicios</Link><Link href="/agendar">Agendar consulta</Link><Link href="/contacto">Contacto</Link><Link href="/styleguide">Guía de estilo</Link>
      </nav>
      <div className="text-sm text-[#d5dce0]"><p>Contenido informativo. No constituye asesoría legal ni crea una relación abogado-cliente.</p><div className="mt-4 flex gap-4"><Link href="/aviso-de-privacidad">Aviso de privacidad</Link><Link href="/terminos">Términos</Link></div></div>
    </div>
  </footer>;
}

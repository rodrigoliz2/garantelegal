import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Phone } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-[#d8d3c8] bg-paper">
      <div className="container-page flex min-h-[76px] items-center justify-between gap-5">
        <Link href="/" className="font-display text-xl font-semibold leading-none text-navy md:text-2xl" aria-label={`${siteConfig.name}, inicio`}>
          {siteConfig.name}<span className="ml-1 text-brass">.</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex" aria-label="Navegación principal">
          <Link href="/urgencias" className="hover:underline">Urgencias</Link>
          <Link href="/servicios" className="hover:underline">Servicios</Link>
          <Link href="/agendar" className="hover:underline">Agendar</Link>
          <Link href="/contacto" className="hover:underline">Contacto</Link>
        </nav>
        <a href={siteConfig.phoneHref} className="btn btn-emergency hidden text-sm md:inline-flex" data-event="clic_llamar" data-origin="encabezado"><Phone size={16} aria-hidden="true" />Llamar ahora</a>
        <Link href="/servicios" className="text-sm font-semibold underline md:hidden">Servicios</Link>
      </div>
    </header>
  );
}

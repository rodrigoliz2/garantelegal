import Link from "next/link";
import { siteConfig } from "@/site.config";

export function SiteHeader() {
  return (
    <header className="border-b border-[#d8d3c8] bg-paper">
      <div className="container-page flex min-h-[76px] items-center justify-between gap-5">
        <Link href="/" className="font-display text-xl font-semibold leading-none text-navy md:text-2xl" aria-label={`${siteConfig.name}, inicio`}>
          {siteConfig.name}<span className="ml-1 text-brass">.</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex" aria-label="Navegación principal">
          <Link href="/urgencias" className="hover:underline">Urgencias</Link>
          <Link href="/servicios" className="hover:underline">Servicios</Link>
          <Link href="/agendar" className="hover:underline">Agendar</Link>
          <Link href="/contacto" className="hover:underline">Contacto</Link>
        </nav>
        <Link href="/servicios" className="text-sm font-semibold underline md:hidden">Servicios</Link>
      </div>
    </header>
  );
}

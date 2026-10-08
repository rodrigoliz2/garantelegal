import Image from "next/image";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { siteConfig } from "@/site.config";

const links = [["Urgencias", "/urgencias"], ["Áreas de práctica", "/servicios"], ["Cómo trabajamos", "/#proceso"], ["La firma", "/nosotros"], ["Agendar", "/agendar"]] as const;

export function SiteHeader() {
  return <header className="relative z-40 border-b border-white/15 bg-navy text-white"><div className="container-page flex min-h-[76px] items-center justify-between gap-3">
    <Link href="/" aria-label={`${siteConfig.name}, inicio`} className="block shrink-0"><Image src="/brand/logo-header-negative.svg" alt={siteConfig.name} width={250} height={60} className="h-auto w-[180px] md:w-[205px] lg:w-[230px]" priority /></Link>
    <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex" aria-label="Navegación principal">{links.map(([label, href]) => <Link key={href} href={href} className="hover:underline">{label}</Link>)}</nav>
    <div className="hidden shrink-0 md:block"><a href={siteConfig.phoneHref} className="btn btn-emergency text-sm" data-event="clic_llamar" data-origin="encabezado"><Phone size={16} aria-hidden="true" />Llamar ahora</a></div>
    <details className="group md:hidden"><summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded border border-white/40" aria-label="Abrir menú"><Menu aria-hidden="true" /></summary><nav aria-label="Navegación móvil" className="absolute inset-x-0 top-full grid gap-1 border-t border-white/20 bg-navy p-4 shadow-lg">{links.map(([label, href]) => <Link className="min-h-12 border-b border-white/15 py-3 font-semibold" key={href} href={href}>{label}</Link>)}</nav></details>
  </div></header>;
}

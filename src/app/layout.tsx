import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/site.config";
import { EmergencyBar } from "@/components/emergency-bar";

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: `Despacho jurídico con sede en ${siteConfig.city} y atención en ${siteConfig.coverage}.`,
  metadataBase: new URL(siteConfig.url)
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-MX"><body className="pb-[72px] md:pb-0"><a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-paper focus:p-3">Saltar al contenido</a><SiteHeader /><main id="contenido">{children}</main><SiteFooter /><EmergencyBar /></body></html>;
}

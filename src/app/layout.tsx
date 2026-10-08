import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/site.config";
import { EmergencyBar } from "@/components/emergency-bar";
import localFont from "next/font/local";
import { Analytics } from "@/components/analytics";

const displayFont = localFont({ src: [{ path: "../fonts/cormorant-garamond-500.woff2", weight: "500" }, { path: "../fonts/cormorant-garamond-600.woff2", weight: "600" }], variable: "--font-display", display: "swap" });
const bodyFont = localFont({ src: [{ path: "../fonts/manrope-400.woff2", weight: "400" }, { path: "../fonts/manrope-600.woff2", weight: "600" }, { path: "../fonts/manrope-700.woff2", weight: "700" }], variable: "--font-body", display: "swap" });
const brandFont = localFont({ src: "../fonts/cinzel-600.woff2", variable: "--font-brand", display: "swap" });

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: `Despacho jurídico con sede en ${siteConfig.city} y atención en ${siteConfig.coverage}.`,
  metadataBase: new URL(siteConfig.url),
  openGraph: { type: "website", locale: "es_MX", siteName: siteConfig.name, title: siteConfig.name, description: `Asistencia jurídica inmediata y consultas en ${siteConfig.city}.`, url: siteConfig.url, images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.tagline}` }] },
  twitter: { card: "summary_large_image", images: ["/brand/og.png"] },
  icons: { icon: [{ url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" }, { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" }], apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const legalService = { "@context": "https://schema.org", "@type": "LegalService", name: siteConfig.name, slogan: siteConfig.tagline, url: siteConfig.url, telephone: siteConfig.phoneHref.replace("tel:", ""), image: `${siteConfig.url}/brand/og.png`, areaServed: { "@type": "Country", name: "México" }, address: { "@type": "PostalAddress", addressLocality: "Guadalajara", addressRegion: "Jalisco", addressCountry: "MX" } };
  return <html lang="es-MX"><body className={`${displayFont.variable} ${bodyFont.variable} ${brandFont.variable} pb-[72px] md:pb-0`}><a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-paper focus:p-3">Saltar al contenido</a><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalService).replace(/</g, "\\u003c") }} /><SiteHeader /><main id="contenido">{children}</main><SiteFooter /><EmergencyBar /><Analytics /></body></html>;
}

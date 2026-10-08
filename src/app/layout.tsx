import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Host_Grotesk, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { UrgentBar } from "@/components/site/urgent-bar";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/site.config";

const sans = Host_Grotesk({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500"], variable: "--font-sans", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], style: ["italic"], weight: ["300"], variable: "--font-serif", display: "swap", preload: false });

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: `Despacho jurídico con sede en ${siteConfig.city} y atención en ${siteConfig.coverage}.`,
  metadataBase: new URL(siteConfig.url),
  openGraph: { type: "website", locale: "es_MX", siteName: siteConfig.name, title: siteConfig.name, description: `Asistencia jurídica inmediata y consultas en ${siteConfig.city}.`, url: siteConfig.url, images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: `${siteConfig.name}, ${siteConfig.tagline}` }] },
  twitter: { card: "summary_large_image", images: ["/brand/og.png"] },
  icons: { icon: [{ url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" }, { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" }], apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] }
};

export const viewport: Viewport = { themeColor: "#0a0a0a", viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const legalService = { "@context": "https://schema.org", "@type": "LegalService", name: siteConfig.name, slogan: siteConfig.tagline, url: siteConfig.url, telephone: siteConfig.phoneE164, email: siteConfig.contactEmail, sameAs: [siteConfig.instagram.url], image: `${siteConfig.url}/brand/og.png`, areaServed: { "@type": "Country", name: "México" }, address: { "@type": "PostalAddress", addressLocality: "Guadalajara", addressRegion: "Jalisco", addressCountry: "MX" } };
  return (
    <html lang="es-MX" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3 focus:text-black">Saltar al contenido</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalService).replace(/</g, "\\u003c") }} />
        <SiteHeader />
        <main id="contenido" tabIndex={-1} className="pt-[var(--header-h)]">{children}</main>
        <SiteFooter />
        <UrgentBar />
        <Analytics />
      </body>
    </html>
  );
}

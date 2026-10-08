import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Host_Grotesk, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { UrgentBar } from "@/components/site/urgent-bar";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/site.config";
import { organizationId } from "@/lib/seo";
import { JsonLd } from "@/components/site/json-ld";

const sans = Host_Grotesk({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500"], variable: "--font-sans", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], style: ["italic"], weight: ["300"], variable: "--font-serif", display: "swap", preload: false });

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: `Despacho jurídico con sede en ${siteConfig.city} y atención en ${siteConfig.coverage}.`,
  metadataBase: new URL(siteConfig.url),
  openGraph: { type: "website", locale: "es_MX", siteName: siteConfig.name, title: siteConfig.name, description: `Asistencia jurídica inmediata y consultas en ${siteConfig.city}.`, url: siteConfig.url, images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: `${siteConfig.name}, ${siteConfig.tagline}` }] },
  twitter: { card: "summary_large_image", images: ["/brand/og.png"] },
  alternates: { canonical: "/" },
  // Verificación opcional de buscadores (si se usa el método de etiqueta en lugar de DNS).
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined, other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined },
  icons: { icon: [{ url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" }, { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" }], apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] }
};

export const viewport: Viewport = { themeColor: "#0a0a0a", viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": organizationId,
        name: siteConfig.name,
        slogan: siteConfig.tagline,
        description: "Litigio estratégico y asesoría jurídica para personas y empresas: urgencias, derecho corporativo, constitucional, administrativo, civil y mercantil.",
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/pwa-512.png`,
        image: `${siteConfig.url}/brand/og.png`,
        telephone: siteConfig.phoneE164,
        email: siteConfig.contactEmail,
        sameAs: [siteConfig.instagram.url],
        areaServed: { "@type": "Country", name: "México" },
        address: { "@type": "PostalAddress", addressLocality: "Guadalajara", addressRegion: "Jalisco", addressCountry: "MX" },
        contactPoint: { "@type": "ContactPoint", telephone: siteConfig.phoneE164, email: siteConfig.contactEmail, contactType: "customer service", availableLanguage: "es", areaServed: "MX" },
        knowsAbout: ["Amparo", "Derecho constitucional", "Derecho administrativo", "Derecho civil", "Derecho mercantil", "Derecho corporativo", "Sociedades mercantiles", "SOFOM", "Fideicomisos", "Prevención de lavado de dinero"]
      },
      { "@type": "WebSite", "@id": `${siteConfig.url}/#sitio`, url: siteConfig.url, name: siteConfig.name, inLanguage: "es-MX", publisher: { "@id": organizationId } }
    ]
  };
  return (
    <html lang="es-MX" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3 focus:text-black">Saltar al contenido</a>
        <JsonLd data={structuredData} />
        <SiteHeader />
        <main id="contenido" tabIndex={-1} className="pt-[var(--header-h)]">{children}</main>
        <SiteFooter />
        <UrgentBar />
        <Analytics />
      </body>
    </html>
  );
}

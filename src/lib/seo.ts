import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

// Metadatos por página: URL canónica, Open Graph y tarjeta de X/Twitter coherentes.
// El título lleva la plantilla «%s | Garante Jurídico» salvo que se pida absoluto.
export function pageMetadata({ title, description, path, absoluteTitle = false, type = "website" }: { title: string; description: string; path: string; absoluteTitle?: boolean; type?: "website" | "article" }): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type, locale: "es_MX", siteName: siteConfig.name, title: fullTitle, description, url, images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: siteConfig.name }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/brand/og.png"] }
  };
}

export const organizationId = `${siteConfig.url}/#despacho`;

/** Migas de pan para datos estructurados (BreadcrumbList). */
export function breadcrumbs(items: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({ "@type": "ListItem", position: index + 1, name, item: `${siteConfig.url}${path === "/" ? "" : path}` }))
  };
}

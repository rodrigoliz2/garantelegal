import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  // /admin y /styleguide usan noindex en el HTML: el rastreador debe poder leerlo.
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api"] }, sitemap: `${siteConfig.url}/sitemap.xml`, host: siteConfig.url };
}

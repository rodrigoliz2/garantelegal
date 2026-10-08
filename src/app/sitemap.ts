import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/site.config";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts] = await Promise.all([prisma.service.findMany({ where: { published: true }, include: { area: true } }), prisma.post.findMany({ where: { published: true } })]);
  const paths = ["/", "/urgencias", "/servicios", "/agendar", "/contacto", "/nosotros", "/guias", "/aviso-de-privacidad", "/terminos"];
  const areas = Array.from(new Set(services.map(item => `/servicios/${item.area.slug}`)));
  return [...paths, ...areas, ...services.map(item => `/servicios/${item.area.slug}/${item.slug}`), ...posts.map(post => `/guias/${post.slug}`)].map(path => ({ url: `${siteConfig.url}${path}`, changeFrequency: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : .6 }));
}

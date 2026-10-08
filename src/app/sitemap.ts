import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/site.config";

export const dynamic = "force-dynamic";

// Solo rutas públicas con contenido publicado. Prioridades: inicio y urgencias primero,
// luego áreas y servicios (las páginas que responden búsquedas concretas).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, cases, testimonials] = await Promise.all([
    prisma.service.findMany({ where: { published: true }, include: { area: true } }),
    prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.caseStudy.count({ where: { published: true, consented: true } }),
    prisma.testimonial.count({ where: { published: true, consented: true } })
  ]);
  const url = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], lastModified?: Date) => ({ url: url(path), priority, changeFrequency, ...(lastModified ? { lastModified } : {}) });
  const areas = Array.from(new Set(services.map(item => item.area.slug)));
  return [
    entry("/", 1, "weekly"),
    entry("/urgencias", 0.9, "monthly"),
    entry("/servicios", 0.8, "weekly"),
    ...areas.map(slug => entry(`/servicios/${slug}`, 0.8, "monthly")),
    ...services.map(item => entry(`/servicios/${item.area.slug}/${item.slug}`, 0.7, "monthly")),
    entry("/agendar", 0.7, "monthly"),
    entry("/contacto", 0.6, "yearly"),
    entry("/nosotros", 0.6, "yearly"),
    ...(cases + testimonials > 0 ? [entry("/casos-de-exito", 0.6, "monthly")] : []),
    entry("/guias", 0.6, "weekly"),
    ...posts.map(post => entry(`/guias/${post.slug}`, 0.6, "monthly", post.updatedAt)),
    entry("/aviso-de-privacidad", 0.2, "yearly"),
    entry("/terminos", 0.2, "yearly")
  ];
}

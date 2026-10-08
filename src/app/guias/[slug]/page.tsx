import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/site.config";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  return { title: post?.title || "Guía no encontrada", description: post?.summary };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post?.published) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.summary, datePublished: post.createdAt.toISOString(), dateModified: post.updatedAt.toISOString(), author: { "@type": "Organization", name: siteConfig.name }, publisher: { "@type": "Organization", name: siteConfig.name }, mainEntityOfPage: `${siteConfig.url}/guias/${post.slug}` };
  return <article className="container-page section-pad max-w-4xl"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /><Link href="/guias" className="text-sm font-bold underline">Todas las guías</Link><p className="eyebrow mt-10 text-brass">Borrador jurídico para revisión</p><h1 className="display mt-3 text-5xl md:text-6xl">{post.title}</h1><p className="mt-5 text-lg">{post.summary}</p><div className="prose-copy mt-9 border-t border-[#d8d3c8] pt-6">{post.content.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><p className="mt-9 rounded border-l-4 border-brass bg-paper p-5 text-sm">Este texto es informativo y está sujeto a revisión del abogado titular. No constituye asesoría legal individual.</p><Link href="/agendar" className="btn btn-primary mt-6">Agendar consulta</Link></article>;
}

import type { Metadata } from "next";
import { breadcrumbs, organizationId, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/site/json-ld";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { publicText } from "@/lib/public-text";
import { siteConfig } from "@/site.config";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post?.published) return { title: "Guía no encontrada" };
  return pageMetadata({ title: post.title, path: `/guias/${post.slug}`, description: publicText(post.summary), type: "article" });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post?.published) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: publicText(post.summary), datePublished: post.createdAt.toISOString(), dateModified: post.updatedAt.toISOString(), author: { "@id": organizationId }, publisher: { "@id": organizationId }, inLanguage: "es-MX", image: `${siteConfig.url}/brand/og.png`, mainEntityOfPage: `${siteConfig.url}/guias/${post.slug}` };
  const paragraphs = post.content.split("\n\n").map(publicText).filter(Boolean);
  return (
    <article>
      <JsonLd data={[jsonLd, breadcrumbs([["Inicio", "/"], ["Guías", "/guias"], [post.title, `/guias/${post.slug}`]])]} />
      <div className="wrap pt-8 md:pt-12"><nav aria-label="Ruta" className="t-small t-muted"><Link href="/guias" className="u">Guías</Link></nav></div>
      <header className="wrap pb-12 pt-10 md:pb-16 md:pt-14">
        <h1 className="t-h1 max-w-[18ch]">{post.title}</h1>
        <p className="t-lead t-muted mt-6 max-w-[52ch]">{publicText(post.summary)}</p>
      </header>
      <div className="wrap grid gap-12 pb-24 lg:grid-cols-12">
        <div className="prose border-t border-black pt-4 lg:col-span-7 lg:col-start-4">
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

          <div className="mt-10 flex flex-col gap-2 sm:flex-row">
            <Link href="/agendar" className="b b-solid">Agendar consulta</Link>
            <Link href="/guias" className="b b-line">Todas las guías</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
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
  return { title: post?.title || "Guía no encontrada", description: post ? publicText(post.summary) : undefined };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post?.published) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: publicText(post.summary), datePublished: post.createdAt.toISOString(), dateModified: post.updatedAt.toISOString(), author: { "@type": "Organization", name: siteConfig.name }, publisher: { "@type": "Organization", name: siteConfig.name }, mainEntityOfPage: `${siteConfig.url}/guias/${post.slug}` };
  const paragraphs = post.content.split("\n\n").map(publicText).filter(Boolean);
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="wrap pt-8 md:pt-12"><nav aria-label="Ruta" className="t-small t-muted"><Link href="/guias" className="u">Guías</Link></nav></div>
      <header className="wrap pb-12 pt-10 md:pb-16 md:pt-14">
        <h1 className="t-h1 max-w-[18ch]">{post.title}</h1>
        <p className="t-lead t-muted mt-6 max-w-[52ch]">{publicText(post.summary)}</p>
      </header>
      <div className="wrap grid gap-12 pb-24 lg:grid-cols-12">
        <div className="prose border-t border-black pt-4 lg:col-span-7 lg:col-start-4">
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <p className="t-small t-muted border-t border-g-200 pt-6">Texto informativo en borrador, sujeto a revisión del abogado titular. No constituye asesoría legal individual.</p>
          <div className="mt-10 flex flex-col gap-2 sm:flex-row">
            <Link href="/agendar" className="b b-solid">Agendar consulta</Link>
            <Link href="/guias" className="b b-line">Todas las guías</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

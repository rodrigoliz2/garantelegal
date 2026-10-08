import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { publicText } from "@/lib/public-text";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Guías jurídicas", description: "Información general sobre detenciones, multas, vehículos retenidos y amparo." };

export default async function GuidesPage() {
  const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return (
    <>
      <section className="wrap pb-14 pt-10 md:pb-20 md:pt-16">
        <h1 className="t-h1">Guías</h1>
        <p className="t-lead t-muted mt-6 max-w-[50ch]">Textos breves para entender una situación antes de la consulta. Son informativos y no sustituyen una revisión individual.</p>
      </section>
      <section aria-label="Guías publicadas" className="wrap pb-24 md:pb-32">
        {posts.length ? (
          <ul className="border-t border-black">
            {posts.map(post => (
              <li key={post.id} className="border-b border-g-200">
                <Link href={`/guias/${post.slug}`} className="group grid gap-3 py-8 md:grid-cols-12 md:gap-6 md:py-12">
                  <h2 className="t-h2 transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-2 md:col-span-7">{post.title}</h2>
                  <p className="t-muted md:col-span-4 md:col-start-9 md:pt-2">{publicText(post.summary)}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="t-muted border-t border-black pt-8">Aún no hay guías publicadas.</p>
        )}
      </section>
    </>
  );
}

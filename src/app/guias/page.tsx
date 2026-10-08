import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Guías jurídicas", description: "Información general sobre detenciones, multas, vehículos retenidos y amparo." };

export default async function GuidesPage() {
  const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return <div className="container-page section-pad"><p className="eyebrow text-brass">Información útil</p><h1 className="display mt-3 text-5xl">Guías jurídicas</h1><p className="mt-5 max-w-2xl">Son textos informativos en borrador para revisión del abogado titular. No sustituyen una consulta individual.</p>{posts.length ? <div className="mt-9 grid gap-4 md:grid-cols-2">{posts.map(post => <Link href={`/guias/${post.slug}`} className="card p-6 hover:border-brass" key={post.id}><h2 className="display text-3xl">{post.title}</h2><p className="mt-3">{post.summary}</p><span className="mt-5 inline-block font-bold underline">Leer guía</span></Link>)}</div> : <p className="card mt-8 p-6">Aún no hay guías publicadas.</p>}</div>;
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

type Item = { name: string; slug: string; summary: string; areaName: string; areaSlug: string };

export function ServiceSearch({ services }: { services: Item[] }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("todas");
  const areas = useMemo(() => Array.from(new Set(services.map(item => item.areaSlug))), [services]);
  const filtered = services.filter(item => (area === "todas" || item.areaSlug === area) && `${item.name} ${item.summary}`.toLocaleLowerCase("es-MX").includes(query.toLocaleLowerCase("es-MX")));
  return <div>
    <div className="grid gap-4 rounded bg-paper p-4 md:grid-cols-[1fr_220px]"><label className="block font-semibold"><span className="mb-2 block">Buscar servicio</span><span className="relative block"><Search size={19} aria-hidden="true" className="absolute left-3 top-4 text-brass" /><input className="field pl-10" value={query} onChange={event => setQuery(event.target.value)} placeholder="Ej. multa, contrato, amparo" /></span></label><label className="block font-semibold"><span className="mb-2 block">Área</span><select className="field" value={area} onChange={event => setArea(event.target.value)}><option value="todas">Todas las áreas</option>{areas.map(slug => <option key={slug} value={slug}>{services.find(item => item.areaSlug === slug)?.areaName}</option>)}</select></label></div>
    <p className="mt-5 text-sm" aria-live="polite">{filtered.length} servicios</p>
    {filtered.length ? <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{filtered.map(item => <Link key={`${item.areaSlug}/${item.slug}`} href={`/servicios/${item.areaSlug}/${item.slug}`} className="card group flex min-h-52 flex-col justify-between p-6 transition-colors hover:border-brass"><div><p className="eyebrow text-brass">{item.areaName}</p><h2 className="display mt-3 text-2xl">{item.name}</h2><p className="mt-3 text-sm">{item.summary}</p></div><span className="mt-5 flex items-center gap-2 font-bold">Ver servicio <ArrowRight size={17} aria-hidden="true" /></span></Link>)}</div> : <div className="card mt-4 p-8"><h2 className="display text-2xl">No encontramos ese servicio</h2><p className="mt-2">Prueba otra palabra o elige todas las áreas.</p></div>}
  </div>;
}

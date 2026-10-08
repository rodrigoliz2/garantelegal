"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

type Item = { name: string; slug: string; summary: string; areaName: string; areaSlug: string };

export function ServiceSearch({ services }: { services: Item[] }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("todas");
  const areas = useMemo(() => Array.from(new Set(services.map(item => item.areaSlug))), [services]);
  const filtered = services.filter(item => (area === "todas" || item.areaSlug === area) && `${item.name} ${item.summary}`.toLocaleLowerCase("es-MX").includes(query.toLocaleLowerCase("es-MX")));
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-[1fr_260px]">
        <label className="label">Buscar servicio
          <span className="relative block">
            <Search size={18} strokeWidth={1.75} aria-hidden="true" className="pointer-events-none absolute left-4 top-[calc(50%+4px)] -translate-y-1/2 text-g-600" />
            <input className="field pl-11" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Ej. multa, contrato, amparo" />
          </span>
        </label>
        <label className="label">Área
          <select className="field" value={area} onChange={event => setArea(event.target.value)}>
            <option value="todas">Todas las áreas</option>
            {areas.map(slug => <option key={slug} value={slug}>{services.find(item => item.areaSlug === slug)?.areaName}</option>)}
          </select>
        </label>
      </div>
      <p className="t-small t-muted mt-8" aria-live="polite">{filtered.length === 1 ? "1 servicio" : `${filtered.length} servicios`}</p>
      {filtered.length ? (
        <ul className="mt-4 border-t border-black">
          {filtered.map((item, index) => (
            <li key={`${item.areaSlug}/${item.slug}`} className={index > 0 && filtered[index - 1].areaSlug !== item.areaSlug ? "border-b border-g-200 [border-top:1px_solid_var(--black)] -mt-px" : "border-b border-g-200"}>
              <Link href={`/servicios/${item.areaSlug}/${item.slug}`} className="group grid gap-2 py-6 md:grid-cols-12 md:gap-6 md:py-8">
                <span className={index > 0 && filtered[index - 1].areaSlug === item.areaSlug ? "t-small t-muted md:invisible md:col-span-2 md:pt-1.5" : "t-small md:col-span-2 md:pt-1.5"}>{item.areaName}</span>
                <span className="t-h3 transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-2 md:col-span-5">{item.name}</span>
                <span className="t-muted md:col-span-5">{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 border-t border-black py-12">
          <h2 className="t-h3">No encontramos ese servicio</h2>
          <p className="t-muted mt-2">Prueba otra palabra o elige todas las áreas. También puedes <Link href="/contacto" className="u text-black">escribirnos</Link> y te orientamos.</p>
        </div>
      )}
    </div>
  );
}

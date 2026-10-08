import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = { title: "La firma", description: `Conoce cómo trabaja ${siteConfig.name}, con sede en ${siteConfig.city}.` };

export default function AboutPage() {
  return <div className="container-page section-pad"><p className="eyebrow text-brass">La firma</p><h1 className="display mt-3 max-w-3xl text-5xl md:text-6xl">Atención clara, con una estrategia para cada asunto.</h1><p className="mt-6 max-w-2xl text-lg">{siteConfig.name} tiene sede en {siteConfig.city} y atiende asuntos en {siteConfig.coverage}. Trabaja en urgencias, derecho constitucional, administrativo, civil y mercantil.</p><div className="mt-12 grid gap-4 md:grid-cols-3">{[["Escuchar", "Revisamos los hechos y la documentación disponible."], ["Explicar", "Presentamos las vías posibles, los tiempos orientativos y el alcance del servicio."], ["Acompañar", "Mantenemos la comunicación durante el asunto por el canal acordado."]].map(([title, text]) => <div className="card p-6" key={title}><h2 className="display text-3xl">{title}</h2><p className="mt-3">{text}</p></div>)}</div><p className="mt-10 max-w-2xl border-l-4 border-brass pl-5 text-sm">Las credenciales de abogados se publicarán cuando el despacho proporcione nombres, cédulas verificables y autorización. No se presentan perfiles provisionales.</p><Link className="btn btn-primary mt-8" href="/agendar">Agendar consulta</Link></div>;
}

import Link from "next/link";
import { siteConfig } from "@/site.config";

export default function HomePage() {
  return <section className="container-page section-pad min-h-[60vh]"><p className="eyebrow text-brass">Sede en {siteConfig.city}</p><h1 className="display mt-5 max-w-3xl text-5xl md:text-7xl">Orientación jurídica cuando la necesitas.</h1><p className="mt-6 max-w-xl text-lg">Atendemos urgencias y consultas programadas en {siteConfig.coverage}.</p><div className="mt-8 flex flex-wrap gap-3"><Link className="btn btn-primary" href="/urgencias">Tengo una urgencia</Link><Link className="btn btn-secondary" href="/agendar">Quiero una consulta</Link></div></section>;
}

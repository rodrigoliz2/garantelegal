import Link from "next/link";

export function AdminNav() {
  return <nav aria-label="Navegación del panel" className="flex flex-wrap gap-2 border-b border-[#d8d3c8] pb-4 text-sm font-bold"><Link className="btn btn-secondary" href="/admin">Resumen</Link><Link className="btn btn-secondary" href="/admin/agenda">Agenda</Link><Link className="btn btn-secondary" href="/admin/prospectos">Prospectos</Link><Link className="btn btn-secondary" href="/admin/disponibilidad">Disponibilidad</Link><Link className="btn btn-secondary" href="/admin/contenido">Contenido</Link></nav>;
}

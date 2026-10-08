import { cn } from "@/lib/utils";

// Crédito del abogado titular. Solo se muestra con nombre y cédula proporcionados por el despacho.
// El retrato queda reservado: cuando exista la foto real se añade aquí, nunca una imagen de archivo.
export function AttorneyCredit({ name, license, className }: { name: string; license: string; className?: string }) {
  return (
    <div className={cn("border-t border-current/20 pt-5", className)}>
      <p className="text-[1.125rem] font-medium">{name}</p>
      <p className="t-muted t-small mt-1">Abogado titular. Cédula profesional {license}</p>
      <a className="u t-small mt-3" href="https://www.cedulaprofesional.sep.gob.mx/" target="_blank" rel="noopener noreferrer">Verificar en el Registro Nacional de Profesionistas</a>
    </div>
  );
}

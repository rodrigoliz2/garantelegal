import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

// Logotipo tipográfico monocromo. No existe public/brand/logo.svg; cuando el
// despacho entregue el archivo maestro, se sustituye aquí.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-[.3em] whitespace-nowrap text-[1.1875rem] font-medium leading-none tracking-[-0.035em]", className)}>
      <span>Garante</span>
      <span className="font-light">Jurídico</span>
      <span className="sr-only">, {siteConfig.tagline}</span>
    </span>
  );
}

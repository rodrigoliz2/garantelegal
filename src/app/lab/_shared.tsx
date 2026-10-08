import Link from "next/link";
import { cn } from "@/lib/utils";

export const heroLines = ["Defensa jurídica", "con criterio, desde", "la primera llamada."];
export const heroLead = "Sede en Guadalajara, atención en todo México. Urgencias por detención o multa y asuntos constitucionales, administrativos, civiles y mercantiles.";

export function HeroHeadline({ className, lines = heroLines }: { className?: string; lines?: string[] }) {
  return (
    <h1 className={cn("t-hero", className)}>
      {lines.map((line, index) => (
        <span className="line" key={line} style={{ "--i": index } as React.CSSProperties}><span>{line}</span></span>
      ))}
    </h1>
  );
}

export function HeroActions({ className, tone = "light", delay = 480 }: { className?: string; tone?: "light" | "dark"; delay?: number }) {
  return (
    <div className={cn("seq-in flex flex-col gap-2 sm:flex-row", className)} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      <Link href="/agendar" className={cn("b", tone === "dark" ? "b-invert" : "b-solid")}>Agendar consulta</Link>
      <Link href="/urgencias" className="b b-urgent" data-origin="inicio-hero">Tengo una urgencia</Link>
    </div>
  );
}

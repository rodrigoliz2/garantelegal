import { cn } from "@/lib/utils";

export type CaseItem = { id: string; area: string; title: string; problem: string; strategy: string; result: string; duration: string };

// Ficha de caso documentado. Solo casos reales, anonimizados y publicados con autorización.
export function CaseList({ items, compact = false }: { items: CaseItem[]; compact?: boolean }) {
  return (
    <div className="border-t border-black">
      {items.map(item => (
        <article key={item.id} className="grid gap-6 border-b border-g-200 py-10 lg:grid-cols-12 lg:gap-10">
          <header className="lg:col-span-4">
            <p className="t-small t-muted">{item.area}</p>
            <h3 className="t-h3 mt-3">{item.title}</h3>
            <p className="t-small t-muted mt-4">Duración: {item.duration}</p>
          </header>
          <dl className={cn("grid gap-6 text-[1.0625rem] lg:col-span-7 lg:col-start-6", !compact && "sm:grid-cols-2")}>
            {!compact && <div><dt className="t-small t-muted">Situación</dt><dd className="mt-1">{item.problem}</dd></div>}
            {!compact && <div><dt className="t-small t-muted">Estrategia</dt><dd className="mt-1">{item.strategy}</dd></div>}
            <div className={cn(!compact && "sm:col-span-2")}><dt className="t-small t-muted">Resultado de ese caso</dt><dd className="mt-1">{item.result}</dd></div>
          </dl>
        </article>
      ))}
      <p className="t-small t-muted pt-6">Cada asunto es distinto: un caso anterior no predice el resultado de otro.</p>
    </div>
  );
}

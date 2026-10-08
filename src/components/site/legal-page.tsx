// Plantilla de páginas legales: índice fijo a la izquierda y texto largo a la derecha.
export type LegalSection = { id: string; title: string; body: React.ReactNode };

export function LegalPage({ title, sections, footnote }: { title: string; sections: LegalSection[]; footnote?: React.ReactNode }) {
  return (
    <article>
      <header className="wrap pb-12 pt-10 md:pb-16 md:pt-16">
        <h1 className="t-h1 max-w-[14ch]">{title}</h1>
        <p className="notice mt-8 max-w-[60ch] text-[.9375rem]">Borrador en revisión por el abogado titular. Se publicará la versión definitiva una vez validada.</p>
      </header>
      <div className="wrap grid gap-10 pb-24 md:pb-32 lg:grid-cols-12">
        <nav aria-label="Secciones" className="hidden lg:col-span-3 lg:block">
          <ul className="sticky top-[calc(var(--header-h)+32px)] grid gap-1 border-t border-black pt-4 text-[.9375rem]">
            {sections.map(section => <li key={section.id}><a className="u u-hover inline-flex min-h-10 items-center" href={`#${section.id}`}>{section.title}</a></li>)}
          </ul>
        </nav>
        <div className="prose lg:col-span-7 lg:col-start-5">
          {sections.map(section => (
            <section key={section.id} id={section.id} className="scroll-mt-[calc(var(--header-h)+24px)] border-t border-g-200 pb-4 pt-8 first:border-black first:pt-4">
              <h2 className="!mt-0">{section.title}</h2>
              {section.body}
            </section>
          ))}
          {footnote && <div className="t-small t-muted mt-10 border-t border-g-200 pt-6">{footnote}</div>}
        </div>
      </div>
    </article>
  );
}

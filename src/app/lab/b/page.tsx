import { SiteHeader } from "@/components/site/header";
import { ParallaxImage } from "@/components/site/parallax-image";
import { UrgentBar } from "@/components/site/urgent-bar";
import { siteConfig } from "@/site.config";
import { HeroActions, HeroHeadline, heroLead } from "../_shared";

// Variante B: blanco, asimétrica. Texto en siete columnas, fotografía vertical a sangre a la derecha.
export default function LabB() {
  return (
    <>
      <SiteHeader />
      <section className="seq relative grid min-h-[calc(100dvh-var(--bar-h))] bg-[var(--white)] pt-16 lg:grid-cols-12 lg:pt-[72px]">
        <div className="wrap flex flex-col justify-between gap-10 pb-10 pt-10 lg:col-span-7 lg:max-w-none lg:pb-14 lg:pr-0 lg:pt-16">
          <HeroHeadline className="lg:text-[clamp(3.5rem,6.6vw,8rem)]" />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="seq-in t-lead max-w-[42ch] text-[var(--g-600)]" style={{ "--d": "380ms" } as React.CSSProperties}>{heroLead}</p>
              <HeroActions className="mt-7" />
            </div>
            <a href={siteConfig.phoneHref} className="seq-in hidden pr-10 text-right lg:block" style={{ "--d": "560ms" } as React.CSSProperties} data-event="clic_llamar" data-origin="inicio-hero">
              <span className="t-small block text-[var(--g-600)]">Línea directa</span>
              <span className="u text-[1.75rem] font-light tracking-[-0.03em]">{siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
        <ParallaxImage src="/fotos/columnas-degollado.jpg" alt="Columnas de cantera del Teatro Degollado, Guadalajara" priority quality={70} sizes="(min-width: 1024px) 42vw, 100vw" settle strength={6} className="aspect-[4/5] lg:col-span-5 lg:aspect-auto lg:h-full" imageClassName="object-[50%_35%]" />
      </section>
      <section className="wrap py-24"><p className="t-h3 max-w-xl text-[var(--g-600)]">Continúa con la franja de urgencias…</p></section>
      <UrgentBar />
    </>
  );
}

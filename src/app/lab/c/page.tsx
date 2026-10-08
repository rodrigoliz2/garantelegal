import { SiteHeader } from "@/components/site/header";
import { ParallaxImage } from "@/components/site/parallax-image";
import { UrgentBar } from "@/components/site/urgent-bar";
import { HeroActions, HeroHeadline, heroLead } from "../_shared";

// Variante C: campo negro, titular a todo el ancho y una franja fotográfica panorámica
// que sale por el borde derecho, con el texto de apoyo a su izquierda.
export default function LabC() {
  return (
    <>
      <SiteHeader overlay />
      <section className="seq flex min-h-[calc(100dvh-var(--bar-h))] flex-col bg-[var(--black)] pt-16 text-[var(--white)] lg:pt-[72px]">
        <div className="wrap pb-8 pt-10 lg:pb-12 lg:pt-14">
          <HeroHeadline className="lg:text-[clamp(4rem,8.4vw,10rem)]" />
        </div>
        <div className="grid flex-1 lg:grid-cols-12">
          <div className="wrap flex flex-col justify-end pb-10 lg:col-span-4 lg:max-w-none lg:pb-14 lg:pr-10">
            <p className="seq-in t-lead max-w-[38ch] text-[var(--g-200)]" style={{ "--d": "380ms" } as React.CSSProperties}>{heroLead}</p>
            <HeroActions tone="dark" className="mt-7 lg:flex-col xl:flex-row" />
          </div>
          <ParallaxImage src="/fotos/corredor-arcos.jpg" alt="Corredor con arcos de cantera en Guadalajara" priority quality={70} sizes="(min-width: 1024px) 66vw, 100vw" settle strength={5} className="min-h-[300px] lg:col-span-8 lg:min-h-[340px]" imageClassName="object-[50%_55%]" />
        </div>
      </section>
      <section className="wrap py-24"><p className="t-h3 max-w-xl text-[var(--g-600)]">Continúa con la franja de urgencias…</p></section>
      <UrgentBar />
    </>
  );
}

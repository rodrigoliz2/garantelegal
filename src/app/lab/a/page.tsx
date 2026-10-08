import { SiteHeader } from "@/components/site/header";
import { ParallaxImage } from "@/components/site/parallax-image";
import { UrgentBar } from "@/components/site/urgent-bar";
import { HeroActions, HeroHeadline, heroLead } from "../_shared";

// Variante A: fotografía a sangre, titular apoyado abajo a la izquierda.
export default function LabA() {
  return (
    <>
      <SiteHeader overlay />
      <section className="seq relative flex min-h-[calc(100dvh-var(--bar-h))] flex-col justify-end overflow-hidden bg-[var(--black)] text-[var(--white)]">
        <ParallaxImage src="/fotos/arcos-guadalajara.jpg" alt="Arcos de cantera en un edificio histórico de Guadalajara" priority quality={70} sizes="100vw" settle className="!absolute inset-0" imageClassName="object-[50%_60%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_10/.86)_0%,rgb(10_10_10/.55)_45%,rgb(10_10_10/.25)_100%)]" aria-hidden="true" />
        <div className="wrap relative grid gap-8 pb-10 pt-32 md:pb-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          <HeroHeadline className="lg:col-span-8" />
          <div className="lg:col-span-4 lg:pb-3">
            <p className="seq-in t-lead max-w-[38ch] text-[var(--g-200)]" style={{ "--d": "380ms" } as React.CSSProperties}>{heroLead}</p>
            <HeroActions tone="dark" className="mt-7" />
          </div>
        </div>
      </section>
      <section className="wrap py-24"><p className="t-h3 max-w-xl text-[var(--g-600)]">Continúa con la franja de urgencias…</p></section>
      <UrgentBar />
    </>
  );
}

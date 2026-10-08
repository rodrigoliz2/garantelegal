import type { Metadata } from "next";
import Link from "next/link";
import { provided, siteConfig } from "@/site.config";
import { ParallaxImage } from "@/components/site/parallax-image";
import { RevealHeading } from "@/components/site/reveal-heading";
import { AttorneyCredit } from "@/components/site/attorney";

export const metadata: Metadata = { title: "La firma", description: `Conoce cómo trabaja ${siteConfig.name}, con sede en ${siteConfig.city}.` };

const principles = [
  { title: "Escuchar", text: "Revisamos los hechos y la documentación disponible antes de dar una opinión. Si el asunto no es de nuestras materias, te lo decimos." },
  { title: "Explicar", text: "Presentamos las vías posibles, los tiempos orientativos, el alcance del servicio y los honorarios antes de avanzar." },
  { title: "Acompañar", text: "Mantenemos la comunicación durante el asunto por el canal que acordemos contigo." }
];

const materias = ["Urgencias por detención, alcoholímetro y vehículos retenidos", "Derecho constitucional y amparo", "Derecho administrativo, multas y sanciones", "Derecho civil: contratos, arrendamiento, adeudos y sucesiones", "Derecho mercantil: títulos de crédito, sociedades y cartera"];

export default function AboutPage() {
  const attorney = provided(siteConfig.leadAttorney);
  const license = provided(siteConfig.professionalLicense);
  return (
    <>
      <section className="wrap pb-14 pt-10 md:pb-20 md:pt-16">
        <h1 className="t-h1 max-w-[15ch]">Atención clara, con una estrategia para cada asunto.</h1>
        <p className="t-lead t-muted mt-8 max-w-[52ch]">{siteConfig.name} tiene sede en {siteConfig.city} y atiende asuntos en {siteConfig.coverage}, en urgencias y en materia constitucional, administrativa, civil y mercantil.</p>
      </section>

      <ParallaxImage src="/fotos/cabanas-interior.jpg" alt="Interior del Hospicio Cabañas, Guadalajara" priority sizes="100vw" quality={60} className="aspect-[4/3] md:aspect-[21/9]" imageClassName="object-[50%_40%]" />

      <section aria-labelledby="forma" className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4"><RevealHeading id="forma" lines={["Cómo", "trabajamos"]} className="t-h2" /></div>
        <dl className="lg:col-span-7 lg:col-start-6">
          {principles.map(item => (
            <div key={item.title} className="grid gap-3 border-t border-g-200 py-8 md:grid-cols-7 md:gap-6">
              <dt className="t-h3 md:col-span-2">{item.title}</dt>
              <dd className="t-muted text-[1.0625rem] md:col-span-5">{item.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="on-dark bg-black text-white">
        <div className="wrap py-24 md:py-32">
          <blockquote>
            <p className="t-quote max-w-[17ch] text-[clamp(2rem,4.4vw,4rem)] leading-[1.08]">«No prometemos resultados. Explicamos cada paso.»</p>
            <footer className="t-small t-muted mt-6">Principio de trabajo del despacho</footer>
          </blockquote>
        </div>
      </section>

      <section aria-labelledby="materias" className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4"><RevealHeading id="materias" lines={["Materias"]} className="t-h2" /></div>
        <ul className="lg:col-span-7 lg:col-start-6">
          {materias.map(item => <li key={item} className="border-t border-g-200 py-5 text-[1.125rem] last:border-b">{item}</li>)}
        </ul>
      </section>

      {attorney && license && (
        <section aria-label="Abogado titular" className="wrap pb-20 md:pb-28">
          <AttorneyCredit name={attorney} license={license} className="max-w-md border-black" />
        </section>
      )}

      <section className="border-t border-g-200 bg-g-50">
        <div className="wrap flex flex-col justify-between gap-8 py-16 md:flex-row md:items-end md:py-20">
          <p className="t-h2 max-w-[18ch]">Cuéntanos tu caso en una consulta.</p>
          <Link className="b b-solid" href="/agendar">Agendar consulta</Link>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { appointmentMessage, emergencyWhatsAppHref } from "@/lib/contact";
import { prisma } from "@/lib/prisma";
import { areaImage } from "@/lib/areas";
import { provided, siteConfig, whatsappHref } from "@/site.config";
import { ParallaxImage } from "@/components/site/parallax-image";
import { PracticeList } from "@/components/site/practice-list";
import { RevealHeading } from "@/components/site/reveal-heading";
import { AttorneyCredit } from "@/components/site/attorney";
import { IllustrationEntrada, IllustrationRevision, IllustrationRuta } from "@/components/site/illustrations";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: `Abogados en ${siteConfig.city} | ${siteConfig.name}` },
  description: `Litigio estratégico y asesoría jurídica para personas y empresas: urgencias, derecho corporativo, constitucional, administrativo, civil y mercantil. Sede en ${siteConfig.city}; representación en toda la República.`
};

const heroLines = ["Defensa jurídica", "con criterio, desde", "la primera llamada."];

const steps = [
  { Illustration: IllustrationEntrada, title: "Nos cuentas qué pasó", text: "Por WhatsApp, con una llamada o un mensaje, o en una consulta agendada. Basta con lo esencial: qué ocurrió, cuándo y qué autoridad intervino." },
  { Illustration: IllustrationRevision, title: "Revisamos documentos y plazos", text: "Leemos lo que tengas, como boletas, contratos o notificaciones, y ubicamos los plazos que pueden estar corriendo." },
  { Illustration: IllustrationRuta, title: "Explicamos las vías y los honorarios", text: "Te decimos qué opciones existen, cuánto suelen tardar y cuánto cuesta cada una. Tú decides si avanzamos." }
];

export default async function HomePage() {
  const [areas, posts] = await Promise.all([
    prisma.practiceArea.findMany({ orderBy: { sortOrder: "asc" }, include: { services: { where: { published: true }, orderBy: { sortOrder: "asc" }, select: { name: true } } } }),
    prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3, select: { slug: true, title: true, summary: true } })
  ]);
  const practice = areas.filter(area => area.services.length > 0).map(area => ({ slug: area.slug, name: area.name, description: area.description, services: area.services.map(service => service.name), image: areaImage(area.slug) }));
  const attorney = provided(siteConfig.leadAttorney);
  const license = provided(siteConfig.professionalLicense);

  return (
    <>
      {/* 1. Hero */}
      <section className="seq on-dark relative -mt-[var(--header-h)] flex min-h-[calc(100dvh-var(--bar-h))] flex-col justify-end overflow-hidden bg-black text-white">
        <ParallaxImage src="/fotos/arcos-guadalajara.jpg" alt="Arcos de cantera en un edificio histórico de Guadalajara" priority quality={70} sizes="100vw" settle className="!absolute inset-0" imageClassName="object-[50%_60%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_10/.88)_0%,rgb(10_10_10/.55)_45%,rgb(10_10_10/.3)_100%)]" aria-hidden="true" />
        <div className="wrap relative grid gap-8 pb-10 pt-36 md:pb-28 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1 className="t-hero lg:col-span-8">
            {heroLines.map((line, index) => <span className="line" key={line} style={{ "--i": index } as React.CSSProperties}><span>{line}</span></span>)}
          </h1>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="seq-in t-lead max-w-[38ch] text-g-200" style={{ "--d": "380ms" } as React.CSSProperties}>Litigio estratégico y asesoría jurídica para personas y empresas. Sede en Guadalajara, representación en toda la República Mexicana.</p>
            <div className="seq-in mt-7 flex flex-col gap-2 sm:flex-row" style={{ "--d": "480ms" } as React.CSSProperties}>
              <Link href="/agendar" className="b b-invert">Agendar consulta</Link>
              <Link href="/urgencias" className="b b-urgent">Tengo una urgencia</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Franja de urgencias */}
      <section aria-labelledby="urgencia" className="border-b border-g-200">
        <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h2 id="urgencia" className="t-h2">¿Hay una detención en este momento?</h2>
            <p className="t-muted mt-5 max-w-[46ch]">Alcoholímetro, arresto administrativo o vehículo en el corralón. Llámanos o escríbenos por WhatsApp; no hace falta llenar ningún formulario.</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <a href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" className="b b-urgent b-lg w-full sm:w-auto" data-event="clic_whatsapp" data-origin="inicio-urgencia"><MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />Llamar o escribir por WhatsApp</a>
            <p className="t-small t-muted mt-4">WhatsApp {siteConfig.phoneDisplay}. Solo atendemos llamadas por WhatsApp.</p>
            <p className="t-small mt-5"><Link href="/urgencias" className="u">Qué hacer mientras tanto</Link></p>
          </div>
        </div>
      </section>

      {/* 3. Áreas de práctica */}
      <section aria-labelledby="areas" className="section">
        <div className="wrap">
          <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <RevealHeading id="areas" lines={["Áreas de práctica"]} className="t-h1" />
            <Link href="/servicios" className="u self-start md:self-auto">Todos los servicios</Link>
          </div>
          <PracticeList items={practice} />
        </div>
      </section>

      {/* 4. La firma */}
      <section aria-labelledby="firma" className="on-dark bg-black text-white">
        <div className="wrap grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between gap-14 lg:col-span-7">
            <RevealHeading id="firma" lines={["No prometemos resultados.", "Explicamos cada opción,", "sus tiempos y su costo."]} className="t-h2" />
            <div className="grid gap-8 sm:grid-cols-3">
              {[["Escuchar", "Revisamos los hechos y los documentos antes de opinar."], ["Explicar", "Presentamos las vías posibles, sus tiempos orientativos y su alcance."], ["Acompañar", "Acordamos contigo cómo y cada cuándo informar los avances."]].map(([title, text]) => (
                <div key={title} className="border-t border-g-900 pt-5">
                  <h3 className="text-[1.125rem] font-medium">{title}</h3>
                  <p className="t-muted mt-2 text-[.9375rem]">{text}</p>
                </div>
              ))}
            </div>
            <Link href="/nosotros" className="u self-start">Conocer la firma</Link>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <ParallaxImage src="/fotos/cabanas-interior.jpg" alt="Interior del Hospicio Cabañas, Guadalajara" sizes="(min-width: 1024px) 30vw, 100vw" quality={60} className="aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5]" />
            {attorney && license && <AttorneyCredit name={attorney} license={license} className="mt-6" />}
          </div>
        </div>
      </section>

      {/* 5. Cómo empieza un asunto: columna fija y pasos que avanzan */}
      <section aria-labelledby="proceso" id="proceso" className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)]">
              <RevealHeading id="proceso-titulo" lines={["Cómo empieza", "un asunto"]} className="t-h1" />
              <p className="t-muted mt-6 max-w-[40ch]">Sin compromiso de contratar. Si el asunto no es de nuestras materias, te lo decimos.</p>
              <Link href="/agendar" className="b b-solid mt-8">Agendar consulta</Link>
            </div>
          </div>
          <ol className="grid gap-20 lg:col-span-6 lg:col-start-7 lg:gap-0">
            {steps.map(({ Illustration, title, text }) => (
              <li key={title} className="grid content-center gap-6 lg:min-h-[72vh]">
                <Illustration className="w-[150px] text-black md:w-[190px]" />
                <h3 className="t-h3 max-w-[22ch]">{title}</h3>
                <p className="t-muted max-w-[44ch]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Guías recientes (solo si hay publicadas) */}
      {posts.length > 0 && (
        <section aria-labelledby="guias" className="border-t border-g-200 bg-g-50">
          <div className="wrap py-24 md:py-32">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <RevealHeading id="guias" lines={["Guías"]} className="t-h1" />
              <Link href="/guias" className="u self-start md:self-auto">Todas las guías</Link>
            </div>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
              <Link href={`/guias/${posts[0].slug}`} className="group lg:col-span-7">
                <h3 className="t-h2 max-w-[18ch] transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-2">{posts[0].title}</h3>
                <p className="t-muted mt-5 max-w-[52ch]">{posts[0].summary}</p>
                <span className="u mt-6">Leer la guía</span>
              </Link>
              {posts.length > 1 && (
                <ul className="grid content-start gap-10 lg:col-span-4 lg:col-start-9">
                  {posts.slice(1).map(post => (
                    <li key={post.slug} className="border-t border-g-200 pt-6">
                      <Link href={`/guias/${post.slug}`} className="group block">
                        <h3 className="t-h3 transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1">{post.title}</h3>
                        <p className="t-muted mt-3 text-[.9375rem]">{post.summary}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 7. Contacto y agendado */}
      <section aria-labelledby="agendar" className="grid lg:grid-cols-2">
        <ParallaxImage src="/fotos/escalera.jpg" alt="Escalera interior con barandal, en blanco y negro" sizes="(min-width: 1024px) 50vw, 100vw" quality={60} className="aspect-[4/3] lg:aspect-auto lg:min-h-[640px]" />
        <div className="wrap flex flex-col justify-center py-20 lg:max-w-[720px] lg:py-28 lg:pl-16">
          <RevealHeading id="agendar" lines={["Agenda", "una consulta"]} className="t-h1" />
          <p className="t-lead t-muted mt-6 max-w-[40ch]">Presencial en Guadalajara, por videollamada o por llamada de WhatsApp. Eliges día y hora y recibes un folio de solicitud.</p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <Link href="/agendar" className="b b-solid">Elegir día y hora</Link>
            <a href={whatsappHref(appointmentMessage())} target="_blank" rel="noopener noreferrer" className="b b-line" data-event="clic_whatsapp" data-origin="inicio-agendar">Agendar por WhatsApp</a>
          </div>
          <p className="t-small t-muted mt-8">¿Prefieres escribir con calma? <Link href="/contacto" className="u text-black">Envíanos un mensaje</Link>.</p>
        </div>
      </section>
    </>
  );
}

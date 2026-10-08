import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Wordmark } from "@/components/site/wordmark";
import { IllustrationAdministrativo, IllustrationCivil, IllustrationConstitucional, IllustrationEntrada, IllustrationMercantil, IllustrationRevision, IllustrationRuta, IllustrationUrgencias } from "@/components/site/illustrations";

export const metadata: Metadata = { title: "Guía de estilo", robots: { index: false, follow: false } };

const palette = [
  { name: "Negro", hex: "#0A0A0A", token: "--black", className: "bg-black text-white" },
  { name: "Gris 900", hex: "#171717", token: "--g-900", className: "bg-g-900 text-white" },
  { name: "Gris 600", hex: "#525252", token: "--g-600", className: "bg-g-600 text-white" },
  { name: "Gris 400", hex: "#A3A3A3", token: "--g-400", className: "bg-g-400 text-black" },
  { name: "Gris 200", hex: "#E5E5E5", token: "--g-200", className: "bg-g-200 text-black" },
  { name: "Gris 50", hex: "#F5F5F5", token: "--g-50", className: "bg-g-50 text-black" },
  { name: "Blanco", hex: "#FFFFFF", token: "--white", className: "bg-white text-black border border-g-200" },
  { name: "Rojo de urgencia", hex: "#C8102E", token: "--urgent", className: "bg-urgent text-white" }
];

const type = [
  { label: "Hero · .t-hero", sample: "Defensa jurídica", className: "t-hero" },
  { label: "Título de página · .t-h1", sample: "Agenda una conversación.", className: "t-h1" },
  { label: "Título de sección · .t-h2", sample: "Cómo empieza un asunto", className: "t-h2" },
  { label: "Subtítulo · .t-h3", sample: "Revisamos documentos y plazos", className: "t-h3" },
  { label: "Entrada · .t-lead", sample: "Sede en Guadalajara, atención en todo México.", className: "t-lead" },
  { label: "Texto · 16 px", sample: "El contenido de este sitio es informativo y no constituye asesoría legal.", className: "text-base" },
  { label: "Cita · Newsreader cursiva 300", sample: "«No prometemos resultados. Explicamos cada paso.»", className: "t-quote text-[2rem] leading-tight" }
];

const illustrations = [
  ["Urgencias", IllustrationUrgencias], ["Administrativo", IllustrationAdministrativo], ["Constitucional", IllustrationConstitucional], ["Civil", IllustrationCivil], ["Mercantil", IllustrationMercantil],
  ["Proceso · entrada", IllustrationEntrada], ["Proceso · revisión", IllustrationRevision], ["Proceso · ruta", IllustrationRuta]
] as const;

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-black py-12 lg:grid-cols-12">
      <h2 className="t-h3 lg:col-span-3">{title}</h2>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="wrap pb-24 pt-10 md:pt-16">
      <h1 className="t-h1">Guía de estilo</h1>
      <p className="t-lead t-muted mt-6 max-w-[56ch]">Identidad monocroma de Garante Jurídico. La fuente de verdad de los tokens es <code>src/app/globals.css</code>; el detalle está en BRAND_GUIDELINES.md.</p>

      <div className="mt-16">
        <Block title="Logotipo">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="flex min-h-48 items-center justify-center border border-g-200 bg-white"><Wordmark className="text-[2rem]" /></div>
            <div className="flex min-h-48 items-center justify-center bg-black text-white"><Wordmark className="text-[2rem]" /></div>
          </div>
          <p className="t-small t-muted mt-4">Wordmark tipográfico en Host Grotesk 500 y 300. Negro sobre blanco y blanco sobre negro; nunca en otro color.</p>
        </Block>

        <Block title="Color">
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {palette.map(color => (
              <li key={color.hex} className={`flex min-h-36 flex-col justify-end p-4 ${color.className}`}>
                <span className="font-medium">{color.name}</span>
                <span className="t-small opacity-80">{color.hex} · {color.token}</span>
              </li>
            ))}
          </ul>
          <p className="t-small t-muted mt-4">El rojo solo se usa en acciones de urgencia: «Llamar por WhatsApp» y «Tengo una urgencia». Sin degradados de color, sin sombras, sin vidrio.</p>
        </Block>

        <Block title="Tipografía">
          <div className="grid gap-8">
            {type.map(item => (
              <div key={item.label} className="grid gap-2 border-b border-g-200 pb-8">
                <span className="t-small t-muted">{item.label}</span>
                <span className={item.className}>{item.sample}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Botones y enlaces">
          <div className="flex flex-wrap gap-2">
            <button className="b b-solid" type="button">Agendar consulta</button>
            <button className="b b-line" type="button">Ver servicios</button>
            <button className="b b-urgent" type="button"><MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />Llamar por WhatsApp</button>
            <button className="b b-solid" type="button" disabled>Deshabilitado</button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 bg-black p-4">
            <button className="b b-invert" type="button">Agendar consulta</button>
            <button className="b b-line text-white" type="button">Sobre negro</button>
          </div>
          <p className="mt-8 flex flex-wrap gap-8"><a className="u" href="#botones">Enlace subrayado</a><a className="u u-hover" href="#botones">Enlace con subrayado al pasar</a></p>
          <p className="t-small t-muted mt-4">Esquinas rectas. Al presionar, escala .97 en 160 ms. Subrayados y cambios de estado entre 150 y 250 ms, con salida suave.</p>
        </Block>

        <Block title="Formularios">
          <div className="grid max-w-xl gap-5">
            <label className="label">Nombre completo<input className="field" placeholder="Como aparece en tu identificación" /></label>
            <label className="label">Área<select className="field" defaultValue="civil"><option value="civil">Civil</option><option value="mercantil">Mercantil</option></select></label>
            <label className="flex items-start gap-3"><input type="checkbox" className="check" />Acepto el aviso de privacidad.</label>
            <p className="notice" role="note">Mensaje de error o aviso: dice qué pasó y cómo corregirlo.</p>
          </div>
        </Block>

        <Block title="Ilustraciones">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {illustrations.map(([label, Illustration]) => <li key={label}><Illustration className="w-full max-w-[160px]" /><span className="t-small t-muted mt-3 block">{label}</span></li>)}
          </ul>
          <p className="t-small t-muted mt-6">Juego propio: lienzo 200 × 200, trazo único de 1.25 px que no escala, sin rellenos, esquinas rectas y la misma línea de suelo. Motivos tomados de la arquitectura de las fotografías.</p>
        </Block>

        <Block title="Fotografía">
          <div className="grid grid-cols-3 gap-2">
            {["arcos-guadalajara", "columnas-degollado", "corredor-arcos"].map(name => (
              <div key={name} className="relative aspect-[4/5] overflow-hidden bg-g-50"><Image src={`/fotos/${name}.jpg`} alt="" fill sizes="(min-width: 1024px) 25vw, 33vw" quality={60} className="object-cover" /></div>
            ))}
          </div>
          <p className="t-small t-muted mt-4">Arquitectura, interiores y texturas de Guadalajara. Blanco y negro con la misma curva y el mismo grano (<code>scripts/process-photos.mjs</code>). Nunca personas presentadas como abogados o clientes. Créditos en CREDITOS.md.</p>
        </Block>

        <Block title="Barra de urgencia">
          <div className="max-w-sm border border-g-200 bg-white p-2">
            <span className="b b-urgent flex w-full px-3"><MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />Llamar o escribir por WhatsApp</span>
          </div>
          <p className="t-small t-muted mt-4">Fija en móvil en todas las páginas; el cuerpo reserva su altura para no tapar contenido. El despacho solo atiende por WhatsApp (llamada o mensaje), así que hay una sola acción. No se anima.</p>
        </Block>

        <Block title="Movimiento">
          <ul className="grid gap-3 text-[.9375rem]">
            <li>Solo <code>transform</code> y <code>opacity</code>. Curva de salida <code>cubic-bezier(0.23, 1, 0.32, 1)</code>.</li>
            <li>Carga del inicio: titular por líneas con máscara, párrafo, botones e imagen. Termina antes de 1.2 s.</li>
            <li>Titulares de sección: revelado por líneas al entrar en pantalla, una sola vez.</li>
            <li>Imágenes con paralaje de 5 a 8 % de su altura.</li>
            <li>Transición entre páginas: 240 ms; no corre en la primera carga ni en /urgencias.</li>
            <li>Con movimiento reducido todo queda estático.</li>
          </ul>
        </Block>
      </div>
    </div>
  );
}

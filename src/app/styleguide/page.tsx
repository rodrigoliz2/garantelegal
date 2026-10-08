import { Button } from "@/components/ui/button";

export default function StyleguidePage() {
  const colors = [["Azul marino", "bg-navy text-white"], ["Marfil", "bg-ivory"], ["Papel", "bg-paper"], ["Latón", "bg-brass text-white"], ["Urgencia", "bg-emergency text-white"]];
  return <div className="container-page section-pad space-y-12">
    <div><p className="eyebrow text-brass">Sistema visual</p><h1 className="display mt-3 text-5xl">Guía de estilo</h1><p className="mt-4 max-w-2xl">Una interfaz clara para actuar con rapidez y leer sin esfuerzo.</p></div>
    <section><h2 className="display mb-5 text-3xl">Paleta</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{colors.map(([name, style]) => <div className={`flex h-28 items-end rounded p-4 font-semibold ${style}`} key={name}>{name}</div>)}</div></section>
    <section><h2 className="display mb-5 text-3xl">Tipografía</h2><p className="display text-4xl">Fraunces para titulares.</p><p className="mt-3 text-lg">DM Sans para información y decisiones claras.</p></section>
    <section><h2 className="display mb-5 text-3xl">Botones</h2><div className="flex flex-wrap gap-3"><Button>Acción principal</Button><Button variant="secondary">Secundaria</Button><Button variant="brass">Agendar consulta</Button><Button variant="emergency">Llamar ahora</Button></div></section>
    <section><h2 className="display mb-5 text-3xl">Tarjetas</h2><div className="card max-w-sm p-6"><p className="eyebrow text-brass">Área de práctica</p><h3 className="display mt-3 text-2xl">Derecho administrativo</h3><p className="mt-3">Información concreta, pasos claros y contacto a la mano.</p></div></section>
    <section><h2 className="display mb-5 text-3xl">Formulario</h2><div className="max-w-md"><label htmlFor="styleguide-name" className="mb-2 block font-semibold">Tu nombre</label><input id="styleguide-name" className="field" placeholder="Escribe tu nombre" /></div></section>
    <section><h2 className="display mb-5 text-3xl">Barra de emergencia</h2><p>La barra fija aparece al pie de esta página y de todas las demás.</p></section>
  </div>;
}

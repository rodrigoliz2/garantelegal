import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = { title: "Términos de uso" };

export default function TermsPage() {
  return <article className="container-page section-pad max-w-4xl"><p className="eyebrow text-brass">Borrador para revisión del abogado titular</p><h1 className="display mt-3 text-5xl">Términos de uso</h1><div className="prose-copy mt-8 space-y-8"><section><h2 className="display text-3xl">Contenido informativo</h2><p>La información de {siteConfig.name} es general e informativa. No constituye asesoría legal individual ni crea por sí sola una relación abogado-cliente.</p></section><section><h2 className="display text-3xl">Consultas y citas</h2><p>El envío de un formulario registra una solicitud. La cita queda pendiente de confirmación del despacho. La disponibilidad puede cambiar y cada asunto se evalúa de manera individual.</p></section><section><h2 className="display text-3xl">Sin garantía de resultado</h2><p>Los resultados de un asunto dependen de sus hechos, documentos, autoridades y otras circunstancias. Ningún contenido del sitio garantiza un resultado.</p></section><section><h2 className="display text-3xl">Contacto y cambios</h2><p>Para dudas sobre estos términos, escribe a {siteConfig.contactEmail}. [PENDIENTE: validar jurisdicción aplicable, fecha de vigencia y texto final con el abogado titular].</p></section></div></article>;
}

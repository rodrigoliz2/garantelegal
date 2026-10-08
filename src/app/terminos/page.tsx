import type { Metadata } from "next";
import { provided, siteConfig } from "@/site.config";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Términos de uso" };

export default function TermsPage() {
  const email = provided(siteConfig.contactEmail);
  return (
    <LegalPage
      title="Términos de uso"
      sections={[
        { id: "contenido", title: "Contenido informativo", body: <p>La información de {siteConfig.name} es general e informativa. No constituye asesoría legal individual ni crea por sí sola una relación abogado-cliente.</p> },
        { id: "citas", title: "Consultas y citas", body: <p>El envío de un formulario registra una solicitud. La cita queda pendiente de confirmación del despacho. La disponibilidad puede cambiar y cada asunto se evalúa de manera individual.</p> },
        { id: "resultados", title: "Sin garantía de resultado", body: <p>Los resultados de un asunto dependen de sus hechos, documentos, autoridades y otras circunstancias. Ningún contenido del sitio garantiza un resultado.</p> },
        { id: "contacto", title: "Contacto y cambios", body: <p>Para dudas sobre estos términos, {email ? <>escribe a <a href={`mailto:${email}`}>{email}</a></> : <>comunícate al {siteConfig.phoneDisplay}</>}. Los cambios se publicarán en esta ruta.</p> }
      ]}
    />
  );
}

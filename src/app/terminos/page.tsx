import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = pageMetadata({ title: "Términos de uso", path: "/terminos", description: `Condiciones de uso del sitio de ${siteConfig.name}.` });

export default function TermsPage() {
  const email = siteConfig.contactEmail;
  return (
    <LegalPage
      title="Términos de uso"
      updated="8 de octubre de 2026"
      sections={[
        { id: "contenido", title: "Contenido informativo", body: <p>La información de este sitio, incluidas las guías, es general y tiene fines informativos. No constituye asesoría legal sobre un caso concreto: cada asunto requiere revisar sus hechos y documentos.</p> },
        { id: "relacion", title: "Relación profesional", body: <p>Escribirnos, llamarnos por WhatsApp o enviar un formulario no crea por sí solo una relación abogado-cliente. Esta comienza cuando acordamos contigo, por escrito, el alcance del servicio y los honorarios.</p> },
        { id: "citas", title: "Consultas y citas", body: <p>Una solicitud de cita queda pendiente hasta que el despacho la confirma. Si necesitamos moverla, te lo avisaremos por el medio de contacto que nos diste.</p> },
        { id: "whatsapp", title: "Atención por WhatsApp", body: <p>El despacho atiende llamadas y mensajes únicamente por WhatsApp, al {siteConfig.phoneDisplay}. No recibimos llamadas telefónicas convencionales. El uso de WhatsApp está sujeto a los términos de ese servicio.</p> },
        { id: "resultados", title: "Sin garantía de resultado", body: <p>El resultado de un asunto depende de sus hechos, de las pruebas y de la decisión de las autoridades. Nos comprometemos a explicarte las vías posibles y a actuar con diligencia, pero no garantizamos resultados.</p> },
        { id: "propiedad", title: "Propiedad intelectual", body: <p>Los textos, ilustraciones y la identidad gráfica del sitio pertenecen a {siteConfig.name}. Las fotografías se usan conforme a sus licencias. No se permite reproducirlos con fines comerciales sin autorización.</p> },
        { id: "ley", title: "Ley aplicable", body: <p>Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia se resolverá ante los tribunales competentes de Guadalajara, Jalisco.</p> },
        { id: "contacto", title: "Contacto", body: <p>Para dudas sobre estos términos, escribe a <a href={`mailto:${email}`}>{email}</a>. Los cambios se publicarán en esta página, con su fecha de actualización.</p> }
      ]}
    />
  );
}

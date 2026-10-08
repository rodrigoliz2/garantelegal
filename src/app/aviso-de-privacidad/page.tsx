import type { Metadata } from "next";
import { provided, siteConfig } from "@/site.config";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Aviso de privacidad" };

export default function PrivacyPage() {
  const address = provided(siteConfig.address);
  const email = provided(siteConfig.contactEmail);
  const contact = email ? <>escribe a <a href={`mailto:${email}`}>{email}</a></> : <>comunícate al {siteConfig.phoneDisplay}</>;
  return (
    <LegalPage
      title="Aviso de privacidad"
      sections={[
        { id: "responsable", title: "Responsable", body: <p>{siteConfig.name}, con sede en {siteConfig.city}, es responsable del tratamiento de los datos proporcionados en este sitio.{address ? ` Domicilio: ${address}.` : ""} Para asuntos de privacidad, {contact}.</p> },
        { id: "datos", title: "Datos que se recaban", body: <p>Para responder solicitudes de contacto o cita se solicitan nombre, teléfono, correo opcional, servicio de interés, modalidad, horario y una descripción breve opcional. Evita incluir datos sensibles en el formulario; los detalles del asunto se revisan en consulta.</p> },
        { id: "finalidades", title: "Finalidades", body: <p>Los datos se utilizan para responder la consulta, gestionar citas, comunicarse contigo y dar seguimiento a la solicitud.</p> },
        { id: "proveedores", title: "Transferencias y proveedores", body: <p>La operación del sitio puede implicar proveedores de alojamiento, base de datos, protección contra abuso y correo electrónico.</p> },
        { id: "derechos", title: "Derechos y revocación", body: <p>Para ejercer derechos de acceso, rectificación, cancelación u oposición, o revocar el consentimiento, {contact}.</p> },
        { id: "seguridad", title: "Seguridad y cambios", body: <p>El sitio usa HTTPS y restringe el acceso al panel del despacho. Los cambios a este aviso se publicarán en esta ruta.</p> }
      ]}
      footnote={<p>Referencia de revisión: <a className="underline underline-offset-2" href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf" target="_blank" rel="noopener noreferrer">Ley Federal de Protección de Datos Personales en Posesión de los Particulares</a>. Este enlace no sustituye la revisión jurídica.</p>}
    />
  );
}

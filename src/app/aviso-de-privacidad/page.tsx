import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { provided, siteConfig } from "@/site.config";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = pageMetadata({ title: "Aviso de privacidad", path: "/aviso-de-privacidad", description: `Cómo trata ${siteConfig.name} los datos personales que recibe a través de su sitio, WhatsApp y correo.` });

export default function PrivacyPage() {
  const address = provided(siteConfig.address);
  const email = siteConfig.contactEmail;
  const mail = <a href={`mailto:${email}`}>{email}</a>;
  return (
    <LegalPage
      title="Aviso de privacidad"
      updated="8 de octubre de 2026"
      sections={[
        { id: "responsable", title: "Responsable", body: <p>{siteConfig.name}, despacho jurídico con sede en {siteConfig.city}{address ? `, con domicilio en ${address}` : ""}, es responsable del tratamiento de los datos personales que recibe a través de este sitio, de WhatsApp y del correo {mail}, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p> },
        { id: "datos", title: "Datos que tratamos", body: <><p>Para atender una solicitud de contacto o de cita tratamos nombre, teléfono, correo electrónico (opcional), servicio de interés, modalidad y horario elegidos, y la descripción breve que decidas compartir.</p><p>No solicitamos datos personales sensibles en los formularios. Te pedimos no incluirlos: los detalles de tu asunto se tratan en la consulta, con la confidencialidad propia del secreto profesional.</p></> },
        { id: "finalidades", title: "Para qué los usamos", body: <><p>Usamos tus datos para responder tu solicitud, agendar y confirmar citas, comunicarnos contigo sobre tu asunto y dar seguimiento a la atención que solicitaste.</p><p>No los usamos con fines publicitarios ni los vendemos.</p></> },
        { id: "transferencias", title: "Con quién los compartimos", body: <><p>No transferimos tus datos a terceros sin tu consentimiento, salvo en los casos que permite la ley o cuando una autoridad competente lo requiera.</p><p>Para operar el sitio nos apoyamos en proveedores de alojamiento, base de datos, protección contra abuso y envío de correo. Tratan los datos por cuenta nuestra, solo para prestar esos servicios.</p></> },
        { id: "derechos", title: "Tus derechos", body: <><p>Puedes acceder a tus datos, rectificarlos, cancelarlos u oponerte a su tratamiento (derechos ARCO), así como revocar tu consentimiento. Para hacerlo, escribe a {mail} con:</p><ul className="list-disc pl-5"><li>tu nombre y un medio para responderte;</li><li>una identificación oficial, o la que acredite a tu representante;</li><li>la descripción clara del derecho que quieres ejercer y de los datos de que se trata.</li></ul><p>Te responderemos dentro de los plazos que establece la ley.</p></> },
        { id: "cookies", title: "Cookies y medición", body: <p>El sitio no usa cookies publicitarias. Podemos medir visitas de forma agregada y sin identificarte, y usamos una verificación de seguridad en los formularios para evitar envíos automáticos.</p> },
        { id: "cambios", title: "Cambios a este aviso", body: <p>Cualquier cambio a este aviso se publicará en esta misma página, con su fecha de actualización.</p> }
      ]}
    />
  );
}

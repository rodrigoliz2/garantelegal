import { formatInTimeZone } from "date-fns-tz";
import { es } from "date-fns/locale";
import { modalityLabels } from "@/lib/booking-constants";
import { clientWhatsAppHref } from "@/lib/contact";
import type { EmailContent } from "@/lib/mail";
import { siteConfig, whatsappHref } from "@/site.config";

// Contenido de los correos transaccionales. La plantilla visual vive en lib/mail.ts.

type Modality = keyof typeof modalityLabels;
export type AppointmentEmailData = { folio: string; serviceName: string; modality: Modality; startsAt: Date; clientName: string; clientPhone: string; clientEmail?: string | null; notes?: string };
export type LeadEmailData = { clientName: string; clientPhone: string; clientEmail?: string | null; message: string };

const zone = "hora del centro de México";
const day = (date: Date) => { const text = formatInTimeZone(date, siteConfig.timeZone, "EEEE d 'de' MMMM 'de' yyyy", { locale: es }); return text.charAt(0).toLocaleUpperCase("es-MX") + text.slice(1); };
const time = (date: Date) => formatInTimeZone(date, siteConfig.timeZone, "HH:mm");
const firstName = (name: string) => name.trim().split(/\s+/)[0];

export function appointmentForFirm(data: AppointmentEmailData): { subject: string; content: EmailContent } {
  const when = `${day(data.startsAt)}, ${time(data.startsAt)} h`;
  const panel = `${siteConfig.url}/admin/agenda?date=${formatInTimeZone(data.startsAt, siteConfig.timeZone, "yyyy-MM-dd")}`;
  return {
    subject: `Nueva cita ${data.folio}: ${data.clientName}`,
    content: {
      preheader: `${data.serviceName}, ${when}.`,
      heading: "Nueva solicitud de cita",
      paragraphs: ["Queda pendiente de confirmación. Confírmala, reprográmala o cancélala desde el panel."],
      details: [
        ["Folio", data.folio],
        ["Servicio", data.serviceName],
        ["Modalidad", modalityLabels[data.modality]],
        ["Fecha", `${when} (${zone})`],
        ["Nombre", data.clientName],
        ["Teléfono", data.clientPhone],
        ["Correo", data.clientEmail || "No proporcionado"],
        ...(data.notes?.trim() ? [["Notas", data.notes.trim()] as [string, string]] : [])
      ],
      action: { label: "Abrir en el panel", href: panel },
      links: [{ label: `Escribir a ${firstName(data.clientName)} por WhatsApp`, href: clientWhatsAppHref(data.clientPhone, `Hola, ${firstName(data.clientName)}. Te escribimos de ${siteConfig.name} sobre tu solicitud de cita ${data.folio}.`) }]
    }
  };
}

export function appointmentForClient(data: AppointmentEmailData): { subject: string; content: EmailContent } {
  const date = formatInTimeZone(data.startsAt, siteConfig.timeZone, "dd/MM/yyyy");
  return {
    subject: `Recibimos tu solicitud de cita (folio ${data.folio})`,
    content: {
      preheader: `${day(data.startsAt)}, ${time(data.startsAt)} h. Queda pendiente de confirmación.`,
      heading: "Recibimos tu solicitud",
      paragraphs: [`Hola, ${firstName(data.clientName)}. Gracias por escribirnos. Tu cita queda pendiente hasta que el despacho la confirme; te contactaremos por WhatsApp o por este medio.`],
      details: [
        ["Folio", data.folio],
        ["Servicio", data.serviceName],
        ["Modalidad", modalityLabels[data.modality]],
        ["Fecha", day(data.startsAt)],
        ["Hora", `${time(data.startsAt)} h (${zone})`]
      ],
      action: { label: "Confirmar por WhatsApp", href: whatsappHref(`Confirmo mi cita ${data.folio} del ${date} a las ${time(data.startsAt)}.`) },
      links: [{ label: "Agregar a mi calendario", href: `${siteConfig.url}/api/appointments/${data.folio}/calendar` }],
      note: `Si necesitas cambiar la fecha, responde a este correo o escríbenos por WhatsApp al ${siteConfig.phoneDisplay}. Lleva a la consulta los documentos relacionados con tu asunto.`
    }
  };
}

export function leadForFirm(data: LeadEmailData): { subject: string; content: EmailContent } {
  return {
    subject: `Nuevo mensaje de ${data.clientName}`,
    content: {
      preheader: data.message.slice(0, 120),
      heading: "Nuevo mensaje de contacto",
      paragraphs: ["Llegó desde el formulario de contacto del sitio."],
      details: [["Nombre", data.clientName], ["Teléfono", data.clientPhone], ["Correo", data.clientEmail || "No proporcionado"], ["Mensaje", data.message]],
      action: { label: "Responder por WhatsApp", href: clientWhatsAppHref(data.clientPhone, `Hola, ${firstName(data.clientName)}. Te escribimos de ${siteConfig.name} en respuesta a tu mensaje.`) },
      links: [{ label: "Ver prospectos en el panel", href: `${siteConfig.url}/admin/prospectos` }]
    }
  };
}

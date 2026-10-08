import { siteConfig, whatsappHref } from "@/site.config";

export const emergencyMessage = "URGENTE: necesito ayuda por una detención. Nombre: __ · Lugar: __ · Hora: __";

export function serviceMessage(service: string) {
  return `Hola, quiero información sobre ${service}.`;
}

export function appointmentMessage(service = "__", day = "__", modality = "__") {
  return `Hola, quiero agendar una consulta. Servicio: ${service} · Día preferido: ${day} · Modalidad: ${modality}`;
}

export const emergencyWhatsAppHref = whatsappHref(emergencyMessage);
export const emergencyPhoneHref = siteConfig.phoneHref;

export function clientWhatsAppHref(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  const international = digits.length === 10 ? `52${digits}` : digits;
  return `https://wa.me/${international}?text=${encodeURIComponent(message)}`;
}

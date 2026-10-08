export const siteConfig = {
  name: "Garante Jurídico",
  tagline: "Soluciones Legales Estratégicas",
  domain: "garantejuridico.com",
  url: "https://garantejuridico.com",
  city: "Guadalajara, Jalisco",
  coverage: "toda la República Mexicana",
  timeZone: "America/Mexico_City",
  // Línea única del despacho. Solo atiende por WhatsApp (llamada o mensaje); no recibe llamadas convencionales.
  phoneDisplay: "618 282 9873",
  phone: "6182829873",
  phoneE164: "+526182829873",
  whatsappBase: "https://wa.me/526182829873",
  emergencyHours: "[PENDIENTE: horario de atención por WhatsApp]",
  address: "[PENDIENTE: dirección de la oficina en Guadalajara]",
  contactEmail: "contacto@garantejuridico.com",
  instagram: { handle: "@garantejuridico", url: "https://www.instagram.com/garantejuridico/" },
  consultationCost: "[PENDIENTE: costo de la consulta inicial]",
  fees: "[PENDIENTE: honorarios o política de cotización]",
  leadAttorney: "[PENDIENTE: nombre del abogado titular]",
  professionalLicense: "[PENDIENTE: cédula profesional del abogado titular]",
  booking: { minimumNoticeHours: 2, durationMinutes: 30 },
  sections: { cases: true, testimonials: true, attorneys: false }
} as const;

export function whatsappHref(message: string): string {
  return `${siteConfig.whatsappBase}?text=${encodeURIComponent(message)}`;
}

/** Devuelve el dato solo si el despacho ya lo proporcionó; los marcadores [PENDIENTE: …] no se muestran al público. */
export function provided(value: string): string | null {
  return value.trim().startsWith("[PENDIENTE") ? null : value;
}

export const siteConfig = {
  name: "Garante Jurídico",
  domain: "garantejuridico.com",
  url: "https://garantejuridico.com",
  city: "Guadalajara, Jalisco",
  coverage: "toda la República Mexicana",
  timeZone: "America/Mexico_City",
  phoneDisplay: "669 212 2543",
  phone: "6692122543",
  phoneHref: "tel:+526692122543",
  whatsappBase: "https://wa.me/526692122543",
  emergencyHours: "[PENDIENTE: horario de la línea de urgencias]",
  address: "[PENDIENTE: dirección de la oficina en Guadalajara]",
  contactEmail: "[PENDIENTE: correo de contacto del despacho]",
  consultationCost: "[PENDIENTE: costo de la consulta inicial]",
  fees: "[PENDIENTE: honorarios o política de cotización]",
  leadAttorney: "[PENDIENTE: nombre del abogado titular]",
  professionalLicense: "[PENDIENTE: cédula profesional del abogado titular]",
  booking: { minimumNoticeHours: 2, durationMinutes: 30 },
  sections: { cases: false, testimonials: false, attorneys: false }
} as const;

export function whatsappHref(message: string): string {
  return `${siteConfig.whatsappBase}?text=${encodeURIComponent(message)}`;
}

// Conecta contenido informativo existente con la página comercial que responde al mismo asunto.
// Las relaciones se usan solo si ambas páginas siguen publicadas.
export const guideServicePairs = [
  { guideSlug: "que-hacer-alcoholimetro", areaSlug: "urgencias", serviceSlug: "amparo-arresto-alcoholimetro" },
  { guideSlug: "como-impugnar-multa", areaSlug: "administrativo", serviceSlug: "impugnacion-multas-transito" },
  { guideSlug: "vehiculo-corralon", areaSlug: "urgencias", serviceSlug: "liberacion-vehiculo-corralon" },
  { guideSlug: "suspension-amparo", areaSlug: "constitucional", serviceSlug: "suspension-acto-reclamado" }
] as const;

export function relatedServiceForGuide(slug: string) {
  return guideServicePairs.find(pair => pair.guideSlug === slug);
}

export function relatedGuideForService(areaSlug: string, serviceSlug: string) {
  return guideServicePairs.find(pair => pair.areaSlug === areaSlug && pair.serviceSlug === serviceSlug);
}

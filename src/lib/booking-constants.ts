export const modalities = ["IN_PERSON", "VIDEO", "PHONE"] as const;
export const modalityLabels: Record<(typeof modalities)[number], string> = { IN_PERSON: "Presencial", VIDEO: "Videollamada", PHONE: "Llamada" };

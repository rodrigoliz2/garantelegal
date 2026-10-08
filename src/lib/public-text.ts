// Quita del texto público los marcadores internos ([BORRADOR JURÍDICO: …], [PENDIENTE: …]).
// Red de seguridad: si alguien vuelve a capturar un marcador desde el panel, no llega al público.
const marker = String.raw`\[(?:BORRADOR|PENDIENTE)[^\]]*\]`;

export function publicText(text: string): string {
  return text
    .replace(new RegExp(String.raw`^\s*${marker}\s*[.:]?\s*`, "i"), "")
    .replace(new RegExp(String.raw`\s*${marker}`, "gi"), "")
    .trim();
}

// Quita del texto público los marcadores internos ([BORRADOR JURÍDICO: …], [PENDIENTE: …]).
// El contenido sigue intacto en la base de datos y en el panel; la página avisa que es un borrador.
const marker = String.raw`\[(?:BORRADOR|PENDIENTE)[^\]]*\]`;

export function publicText(text: string): string {
  return text
    .replace(new RegExp(String.raw`^\s*${marker}\s*[.:]?\s*`, "i"), "")
    .replace(new RegExp(String.raw`\s*${marker}`, "gi"), "")
    .trim();
}

// Quita del texto público los marcadores internos ([BORRADOR JURÍDICO: …], [PENDIENTE: …]).
// El contenido sigue intacto en la base de datos y en el panel; la página avisa que es un borrador.
export function publicText(text: string): string {
  return text.replace(/\s*\[(?:BORRADOR|PENDIENTE)[^\]]*\]/gi, "").trim();
}

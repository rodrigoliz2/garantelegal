// Fotografía asociada a cada área de práctica (ver CREDITOS.md).
export const areaImages: Record<string, { src: string; alt: string }> = {
  urgencias: { src: "/fotos/via-nocturna.jpg", alt: "Vía rápida iluminada de noche" },
  administrativo: { src: "/fotos/fachada-guadalajara.jpg", alt: "Fachada de oficinas de retícula en Guadalajara" },
  constitucional: { src: "/fotos/columnas-degollado.jpg", alt: "Columnas de cantera del Teatro Degollado, Guadalajara" },
  civil: { src: "/fotos/corredor-arcos.jpg", alt: "Corredor con arcos de cantera en Guadalajara" },
  mercantil: { src: "/fotos/torres-guadalajara.jpg", alt: "Torres de oficinas en Guadalajara" },
  corporativo: { src: "/fotos/mesa-consejo.jpg", alt: "Mesa de consejo vacía en una sala de juntas" }
};

export function areaImage(slug: string) {
  return areaImages[slug] || { src: "/fotos/arcos-guadalajara.jpg", alt: "Arcos de cantera en Guadalajara" };
}

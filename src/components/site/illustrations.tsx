import { cn } from "@/lib/utils";

// Juego propio de ilustraciones de línea. Reglas: lienzo 200 × 200, un solo trazo
// de 1.25 px que no escala, sin rellenos, esquinas rectas y la misma línea de suelo
// (y = 176) en todas. Los motivos salen de la arquitectura de las fotografías.

type Props = { className?: string; title?: string };

function Frame({ className, title, children }: Props & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="square" strokeLinejoin="miter" className={cn("illus block", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <g>
        <path d="M16 176H184" />
        {children}
      </g>
    </svg>
  );
}

/** Urgencias: una vía de noche y su poste de luz. */
export function IllustrationUrgencias(props: Props) {
  return (
    <Frame {...props}>
      <path d="M52 176V38H86" />
      <path d="M78 38v7h16v-7" />
      <path d="M86 45L66 176M86 45l36 131" strokeDasharray="2 5" />
      <path d="M104 176C124 142 150 120 184 104" />
      <path d="M150 176c10-24 20-40 34-52" />
      <path d="M128 176c14-28 32-46 56-60" strokeDasharray="7 7" />
    </Frame>
  );
}

/** Administrativo: fachada moderna de retícula, como las oficinas de gobierno. */
export function IllustrationAdministrativo(props: Props) {
  return (
    <Frame {...props}>
      <path d="M36 34H164" />
      <path d="M44 34V176M156 34V176" />
      <path d="M72 34V150M100 34V150M128 34V150" />
      <path d="M44 62H156M44 90H156M44 118H156M44 150H156" />
      <path d="M88 176V158H112V176" />
    </Frame>
  );
}

/** Constitucional: una columna de cantera con capitel y basa. */
export function IllustrationConstitucional(props: Props) {
  return (
    <Frame {...props}>
      <path d="M62 40H138V48H62Z" />
      <path d="M70 48L80 60H120L130 48" />
      <path d="M82 60V158M118 60V158" />
      <path d="M94 66V152M106 66V152" />
      <path d="M74 158H126V166H74Z" />
      <path d="M66 166H134V176" />
      <path d="M66 166V176" />
    </Frame>
  );
}

/** Civil: un portón con arco, la entrada de una casa. */
export function IllustrationCivil(props: Props) {
  return (
    <Frame {...props}>
      <path d="M40 176V58H160V176" />
      <path d="M66 176V104a34 34 0 0 1 68 0V176" />
      <path d="M76 176V106a24 24 0 0 1 48 0V176" />
      <path d="M100 82V176" />
      <path d="M94 140h0M106 140h0" strokeWidth={3} />
      <path d="M36 58H164" />
    </Frame>
  );
}

/** Mercantil: dos torres de oficinas, una escalonada. */
export function IllustrationMercantil(props: Props) {
  return (
    <Frame {...props}>
      <path d="M50 176V54H70V30H94V176" />
      <path d="M50 74H94M50 94H94M50 114H94M50 134H94M50 154H94" />
      <path d="M108 176V78H150V176" />
      <path d="M122 78V176M136 78V176" />
      <path d="M94 120H108" />
    </Frame>
  );
}

/** Proceso, primer paso: una puerta que se abre. */
export function IllustrationEntrada(props: Props) {
  return (
    <Frame {...props}>
      <path d="M64 176V40H136V176" />
      <path d="M64 40L100 52V172L64 176" />
      <path d="M92 112v8" />
      <path d="M100 176L160 176M136 176l30 0" />
      <path d="M100 172l50 4" strokeDasharray="2 5" />
    </Frame>
  );
}

/** Proceso, segundo paso: los documentos que se revisan. */
export function IllustrationRevision(props: Props) {
  return (
    <Frame {...props}>
      <path d="M56 156V36H124" />
      <path d="M72 176V54H132L148 70V176" />
      <path d="M132 54V70H148" />
      <path d="M86 92H134M86 106H134M86 120H134M86 134H116" />
      <path d="M86 156H110" />
    </Frame>
  );
}

/** Proceso, tercer paso: la ruta, una escalera que sube. */
export function IllustrationRuta(props: Props) {
  return (
    <Frame {...props}>
      <path d="M24 176V152H56V128H88V104H120V80H152V56H184" />
      <path d="M40 132L168 36" />
      <path d="M40 132V152M72 108V128M104 84V104M136 60V80M168 36V56" />
    </Frame>
  );
}

export const areaIllustrations: Record<string, (props: Props) => React.JSX.Element> = {
  urgencias: IllustrationUrgencias,
  administrativo: IllustrationAdministrativo,
  constitucional: IllustrationConstitucional,
  civil: IllustrationCivil,
  mercantil: IllustrationMercantil
};

export function AreaIllustration({ slug, ...props }: Props & { slug: string }) {
  const Component = areaIllustrations[slug] || IllustrationConstitucional;
  return <Component {...props} />;
}

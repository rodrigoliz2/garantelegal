# Garante Jurídico: guía de identidad

Versión monocroma, octubre de 2026. Reemplaza la paleta azul marino, latón y marfil anterior. La referencia visual viva está en `/styleguide`.

## Esencia

- Nombre: **Garante Jurídico**. Lema: Soluciones legales estratégicas.
- Tono: profesional, claro, directo y humano. De tú. Sin promesas de resultado.
- Sede: Guadalajara, Jalisco; atención en toda la República Mexicana.

## Color

| Token | Valor | Uso |
| --- | --- | --- |
| `--black` | `#0A0A0A` | Texto, fondos de bloque, botón principal, pie |
| `--g-900` | `#171717` | Hover del botón principal, divisores sobre negro |
| `--g-600` | `#525252` | Texto secundario sobre blanco (7.8:1) |
| `--g-400` | `#A3A3A3` | Bordes de campos, texto secundario sobre negro |
| `--g-200` | `#E5E5E5` | Divisores sobre blanco |
| `--g-50` | `#F5F5F5` | Fondos de franja y avisos |
| `--white` | `#FFFFFF` | Fondo principal |
| `--urgent` | `#C8102E` | **Solo** acciones de urgencia: «Llamar ahora» y «Tengo una urgencia» |

Prohibido: azul marino, dorado, marfil, degradados de color, sombras pesadas y vidrio esmerilado. El hero usa un velo negro neutro sobre la fotografía para dar contraste al texto; no es un degradado de color.

Los tokens viven en `src/app/globals.css` y se exponen en Tailwind (`tailwind.config.js`) como `black`, `white`, `g-50…g-900` y `urgent`. Los alias antiguos (`navy`, `brass`, `ivory`…) apuntan a la nueva paleta solo para el panel interno.

## Tipografía

- **Host Grotesk** (300, 400, 500) para titulares y texto. Grotesca suiza con carácter en la «y», la «j» y la «a».
- **Newsreader** cursiva 300, solo para citas.
- Ambas se cargan con `next/font/google`. Prohibidas Inter, Roboto, Arial y Manrope.
- Titulares grandes, peso 300, interletra negativa (−0.04 a −0.05 em), máximo 2 o 3 líneas. Sin palabras resaltadas en otro color ni en cursiva.
- Escala: `.t-hero`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-lead`, `.t-small`, `.t-quote`. El cuerpo nunca baja de 16 px.
- En el correo transaccional se usa Helvetica del sistema, porque los clientes de correo no cargan fuentes web de forma fiable.

## Logotipo

No existe `public/brand/logo.svg`. Se usa un wordmark tipográfico (`src/components/site/wordmark.tsx`): «Garante» en 500 y «Jurídico» en 300, en negro sobre blanco o blanco sobre negro. El ícono (favicon, PWA, Apple) es una «G» de Host Grotesk en blanco sobre negro, generada con `scripts/render-mono-brand.mjs`, que también produce `og.png`.

Los SVG con monograma de la versión anterior (`logo-*.svg`, `isotype*.svg`) y las plantillas de `public/brand/templates/` siguen en el repositorio, pero ya no se usan en el sitio. Deben rehacerse en monocromo antes de imprimir papelería (ver PENDIENTES.md).

## Forma

- Esquinas rectas en todo: botones, campos y bloques.
- Sin tarjetas redondeadas repetidas. Se agrupa con filetes de 1 px y espacio.
- Prohibido: etiquetas en mayúsculas espaciadas sobre los títulos, numeración decorativa 01/02/03, flechas pegadas a los botones, balanzas y mazos.

## Fotografía

Arquitectura, interiores y texturas, sobre todo de Guadalajara. Todo en blanco y negro con el mismo tratamiento (`scripts/process-photos.mjs`): escala de grises, normalización, curva 1.12/−14, gamma 1.08 y grano monocromo. Nunca fotos de personas presentadas como abogados o clientes. El retrato del titular queda reservado hasta tener la foto real. Créditos y licencias en `CREDITOS.md`.

## Ilustración

Juego propio de ocho dibujos de línea (`src/components/site/illustrations.tsx`): uno por área (urgencias, administrativo, constitucional, civil y mercantil) y tres de proceso (entrada, revisión y ruta). Lienzo de 200 × 200, trazo único de 1.25 px que no escala, sin rellenos, esquinas rectas y la misma línea de suelo. Los motivos salen de las fotografías: poste de luz, retícula de fachada, columna de cantera, portón con arco, torres, puerta, documentos y escalera.

## Movimiento

Librería `motion`. Solo `transform` y `opacity`, con curva de salida `cubic-bezier(0.23, 1, 0.32, 1)`.

| Momento | Comportamiento |
| --- | --- |
| Carga del inicio | Titular por líneas con máscara, luego párrafo, botones e imagen. Menos de 1.2 s. Es CSS para no esperar a la hidratación. |
| Titulares de sección | Revelado por líneas al entrar en pantalla, una sola vez |
| Imágenes | Paralaje de 5 a 8 % |
| La firma / Cómo empieza un asunto | Columna fija y pasos que avanzan |
| Áreas de práctica | Escritorio: el nombre se desplaza y la foto sigue al puntero con resorte. Móvil: acordeón con altura animada (única excepción a «solo transform», pedida explícitamente) |
| Encabezado | Se oculta al bajar y reaparece al subir |
| Menú móvil | Pantalla completa con entrada escalonada de 40 ms |
| Páginas | Transición de 240 ms; no corre en la primera carga ni en /urgencias |
| Botones y enlaces | Escala .97 al presionar y subrayado animado, de 150 a 250 ms |
| /urgencias y barra de emergencia | Sin animaciones decorativas |

Con `prefers-reduced-motion` todo queda estático.

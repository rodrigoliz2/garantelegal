# Garante Jurídico — guía de identidad

## Esencia

- Nombre: **Garante Jurídico**.
- Lema oficial: **SOLUCIONES LEGALES ESTRATÉGICAS**.
- Tono: profesional, claro, directo y humano. Sin promesas de resultado.
- Sede: Guadalajara, Jalisco; atención en toda la República Mexicana.

## Identidad visual

| Token | Valor | Uso |
| --- | --- | --- |
| Azul institucional | `#101F32` | Encabezados, fondos principales, texto |
| Latón | `#B9955B` | Monograma, divisores y acentos grandes |
| Marfil | `#F5F0E6` | Fondos editoriales |
| Gris pizarra | `#526174` | Texto secundario |
| Blanco | `#FFFFFF` | Superficies y contraste |
| Rojo urgencia | `#BD3434` | Solo asistencia inmediata |

El texto pequeño que emplea un acento dorado usa `#6D4F25` para alcanzar contraste AA sobre marfil y blanco. Los tokens viven en `src/app/globals.css` y `tailwind.config.js`.

Tipografías autohospedadas mediante `next/font/local`: Cinzel 600 para identidad, Cormorant Garamond 500/600 para titulares editoriales y Manrope 400/600/700 para información funcional. El cuerpo nunca baja de 16 px.

## Logotipo y recursos

`public/brand/` contiene las variantes vertical, horizontal, negativa, monocromáticas e isotipo en SVG maestro y PNG. Incluye favicon 16/32/48, Apple Touch Icon 180, PWA 192/512 e imagen Open Graph 1200 × 630. `scripts/generate-brand.py` y `scripts/render-brand.mjs` regeneran los recursos. Se usa el logotipo horizontal en la navegación y el isotipo en tamaños reducidos.

La imagen aprobada es un raster con un monograma personalizado. El SVG reproduce la composición, los colores y la columna interior con un contorno de Cormorant Garamond; **no es una vectorización exacta del dibujo original**. Si el despacho dispone del archivo maestro del diseñador, debe sustituir estos SVG antes de aplicaciones de imprenta. Esta limitación no afecta la funcionalidad del sitio.

No estirar, recolorear ni añadir sombras al logotipo. Mantener un margen libre equivalente, como mínimo, a la mitad de la altura del isotipo.

## Aplicaciones

`public/brand/templates/` contiene tarjeta, hoja membretada tamaño carta, firma HTML de correo, portada de propuesta, portada jurídica, publicación social y encabezado de correo. El isotipo sirve como foto de perfil. El panel administrativo emplea los mismos colores y tipos. Los marcadores `[PENDIENTE: ...]` deben reemplazarse solo con datos aprobados.

## Interfaz

La portada se inspira en el PDF de inicio entregado por el despacho: hero azul, título editorial, contacto inmediato y listado claro de áreas. La representación de abogados, casos o testimonios depende de datos reales publicados y de consentimiento. El rojo no se usa fuera de las acciones de urgencia.

El estilo completo se consulta en `/styleguide`. Las verificaciones de móvil, escritorio y contraste se guardan en `docs/screenshots/` y en el reporte final de Lighthouse.

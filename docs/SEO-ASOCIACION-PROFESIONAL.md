# SEO institucional y asociación profesional discreta

Auditoría del 13 de octubre de 2026. Dominio canónico: `https://garantejuridico.com/`.

## Estado inicial comprobado

- Proyecto Next.js 15 con App Router, Metadata API, HTML generado en el servidor, Prisma y sitemap dinámico.
- Se consultaron con un agente `Googlebot` las **59 URL públicas del sitemap**. Todas respondieron 200, declararon `lang="es-MX"`, una canónica propia, un título y una metadescripción únicos, Open Graph y Twitter Cards coherentes, sin `noindex` y con JSON-LD sintácticamente válido. No se encontró el nombre de Rodrigo Lizárraga Camacho en ese HTML.
- `https://www.garantejuridico.com/` respondía 308 hacia la raíz sin `www`. `robots.txt` y `sitemap.xml` respondían 200; el sitemap solo contenía el dominio canónico.
- La portada tenía el título `Abogados en Guadalajara | Garante Jurídico`. Era una consulta pertinente, pero daba menos prioridad visual a la marca que el título institucional solicitado.
- `robots.txt` impedía rastrear `/admin` y `/styleguide` aunque esas páginas ya tenían `meta robots noindex`. Google necesita poder rastrearlas para leer esa instrucción.
- El JSON-LD ya describía un único despacho como `LegalService`, subtipo de `Organization`, con nombre comercial, lema, URL, logotipo, contacto, Guadalajara y cobertura nacional. El mismo grafo incluía `WebSite` con editor enlazado al despacho. Los servicios tenían `Service` y `BreadcrumbList`; las guías, `Article` y `BreadcrumbList`. No había relación personal `founder`, `employee`, `member` ni `worksFor`.
- El logotipo declarado en el grafo (`/brand/pwa-512.png`) es idéntico por SHA-256 al isotipo oficial de `/favicon-512.png` y responde HTTP 200. No se agregaron dirección precisa, horarios, cédula, reseñas ni reconocimientos que aún no estén confirmados.

## Cambios realizados

| Archivo | Cambio y motivo |
| --- | --- |
| `src/app/page.tsx` | Título de portada con marca primero: `Garante Jurídico | Soluciones Legales Estratégicas`. Descripción comercial natural que incluye amparo, fiscal y áreas ya publicadas, Guadalajara y cobertura nacional. No cambia el contenido ni el diseño visible. |
| `src/site.config.ts` | Variante ortográfica sin acento `Garante Juridico`, centralizada como nombre alternativo de la misma marca. |
| `src/app/layout.tsx` | Se añade ese nombre alternativo a los nodos existentes `LegalService` y `WebSite`; se conserva el mismo `@id`, logotipo y demás datos públicos. No se añadió ninguna entidad `Person` ni una relación personal. |
| `src/app/robots.ts` | Solo se bloquea `/api`. `/admin` y `/styleguide` quedan rastreables para que Google pueda leer su `noindex`; siguen fuera del sitemap. |
| `e2e/seo.spec.ts` | Verifica título y metadatos de portada, grafo institucional sin perfil personal y `noindex` rastreable en páginas excluidas. |

No se crearon páginas, textos ocultos, listas de consultas, enlaces artificiales ni cambios visuales. El `LegalService` existente es la especialización de `Organization` adecuada para un despacho; duplicar la misma entidad como otro nodo `Organization` no agregaría una relación verificable. `WebSite` expresa el nombre preferido del sitio.

## Asociación externa propuesta, aún sin publicar

La asociación con la búsqueda del nombre completo **requiere una señal pública legítima**. No basta añadir el nombre a metadatos o JSON-LD y ocultarlo al visitante: eso sería una discrepancia con el contenido visible. Se comprobó que `https://lizarragaibarra.com/` ya presenta públicamente a Rodrigo Lizárraga Camacho como socio y que `https://vigilex.mx/` muestra su nombre en el pie. Ninguno se modificó.

Si el vínculo profesional con Garante Jurídico se confirma para publicación, estas menciones naturales pueden incorporarse en páginas existentes:

- **Perfil de socio en Lizárraga & Ibarra:** «Rodrigo Lizárraga Camacho también desarrolla proyectos de atención jurídica a través de [Garante Jurídico](https://garantejuridico.com/), despacho con sede en Guadalajara y cobertura nacional.»
- **Página institucional de VIGILEX, solo si encaja con la explicación de quién creó el proyecto:** «VIGILEX es un proyecto de tecnología jurídica de Rodrigo Lizárraga Camacho. Su práctica de atención legal también está vinculada con [Garante Jurídico](https://garantejuridico.com/).»

Una mención contextual por sitio, visible para sus lectores, con un enlace normal a la portada, sería suficiente. Debe describir una relación real y vigente; no recomendamos repetir anclas optimizadas, añadir enlaces en masa ni crear páginas dedicadas solo a buscadores. Si no se desea publicar la relación en esos sitios, se puede usar un perfil profesional auténtico en otra plataforma que sí permita explicar ambos proyectos. La opción de una breve mención dentro de Garante aumentaría la claridad de la relación, pero haría público el nombre allí y **no se implementó**.

## Search Console: acciones de la propiedad

1. En [Google Search Console](https://search.google.com/search-console/), añadir la propiedad de **dominio** `garantejuridico.com`. En Cloudflare DNS crear el registro TXT en `@` con el valor exacto `google-site-verification=...` que entregue Google; no existe un valor universal. Verificar la propiedad.
2. En **Sitemaps**, enviar `https://garantejuridico.com/sitemap.xml`. En **Inspección de URL**, analizar `https://garantejuridico.com/`, `/urgencias`, `/servicios`, `/servicios/administrativo/impugnacion-multas-transito` y `/servicios/constitucional/amparo-indirecto`. Comprobar URL rastreable, canónica seleccionada por Google, HTML renderizado y estado de indexación; solicitar indexación si corresponde.
3. En **Rendimiento > Resultados de búsqueda**, medir impresiones, clics, CTR y posición de la portada y las páginas de práctica. Filtrar por separado consultas con `Rodrigo`, `Lizárraga`, `Lizarraga`, `Garante Jurídico`, `abogado Guadalajara`, `impugnar multas`, `alcoholímetro` y `amparo`. Comparar por página, dispositivo y periodo; usar país México cuando interese la demanda nacional. Las consultas de poco volumen pueden omitirse por privacidad.
4. Revisar **Indexación > Páginas** y **Core Web Vitals** de forma periódica. Probar el grafo con [Schema Markup Validator](https://validator.schema.org/) y verificar los resultados elegibles con [Rich Results Test](https://search.google.com/test/rich-results). La validez del marcado no garantiza un resultado enriquecido ni una posición determinada.

## Riesgos, límites y oportunidad

- No hay acceso a la propiedad de Search Console en esta auditoría: **no se afirma que Google ya haya indexado el dominio o seleccionado una canónica**. Un código 200 y un sitemap solo demuestran disponibilidad técnica.
- Google genera títulos y fragmentos automáticamente a partir de la página y de referencias externas. El título y la descripción institucionales son señales, no una garantía absoluta de que el nombre personal nunca aparezca en un resultado para una consulta personal.
- Sin una mención pública que conecte la persona con la marca, la probabilidad de aparecer para búsquedas del nombre puede seguir siendo baja. La estrategia externa propuesta permite crear esa señal sin exponer el nombre en la interfaz de Garante.
- La dirección exacta, horario de urgencias, titular y cédula siguen pendientes. No se añadieron a Schema.org. Cuando se confirmen, deben publicarse coherentemente en el contenido visible antes de ampliar el grafo.
- La clasificación de búsquedas amplias como «abogado» depende de competencia, ubicación y relevancia real. Es preferible mejorar y mantener las páginas de práctica ya existentes que producir páginas redundantes para variantes de palabras clave.

## Pruebas y resultados

- `npm run lint`, `npm run typecheck`, `npm test` (12 pruebas) y `npm run build`: correctos. Vitest mostró un aviso preexistente sobre su cargador de configuración; no afecta el resultado.
- `BASE_URL=http://localhost:3199 npm run test:e2e`: **6/6 correctas**, incluidos cita, urgencias, acceso al panel y dos verificaciones SEO nuevas. El puerto 3000 estaba ocupado por otra versión local; se usó un puerto aislado para probar el build de esta revisión.
- Auditoría HTTP del build de producción local: **57 URL** del sitemap, todas con 200, canónica propia, `es-MX`, descripción y títulos sociales; cero títulos o descripciones duplicados; cero apariciones del nombre personal en el HTML. La producción inicial tenía 59 URL por diferencias en su contenido publicado.
- Lighthouse móvil local, portada y `/urgencias`: rendimiento **95/98**, accesibilidad **100/100**, LCP **2.9/2.5 s**, CLS **0/0**. La categoría SEO local marca 69/66 únicamente porque el proyecto sirve `X-Robots-Tag: noindex` en `localhost` intencionalmente; la puntuación de SEO debe medirse en el dominio canónico después de publicar.

## Referencias técnicas

- [Google: datos estructurados de organizaciones](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Schema.org: `LegalService` es subtipo de `Organization`](https://schema.org/LegalService)
- [Google: coherencia de datos estructurados con contenido visible](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google: nombre del sitio y `WebSite`](https://developers.google.com/search/docs/appearance/site-names)
- [Google: `noindex` requiere permitir el rastreo](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Google: títulos y fragmentos se generan automáticamente](https://developers.google.com/search/docs/appearance/title-link), [fragmentos](https://developers.google.com/search/docs/appearance/snippet)
- [Search Console: verificación DNS](https://support.google.com/webmasters/answer/9008080), [envío de sitemaps](https://support.google.com/webmasters/answer/7451001), [informe de rendimiento](https://support.google.com/webmasters/answer/7576553)

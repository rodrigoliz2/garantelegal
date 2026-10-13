# Garante Jurídico — fase 2 de SEO orgánico

**Corte de auditoría:** 13 de octubre de 2026. **Base inspeccionada:** producción en `https://garantejuridico.com/`, antes de los cambios de esta fase, commit `577b8a1`. **Alcance:** 59 URL del sitemap, código Next.js App Router y muestra pública de competidores. La hoja [URL-AUDIT.csv](URL-AUDIT.csv) conserva la evaluación individual y los metadatos observados de cada URL; [KEYWORD-MATRIX.csv](KEYWORD-MATRIX.csv) es una hipótesis de priorización comercial, no una medición de volumen ni de posiciones.

## 1. Estado SEO inicial

- **59/59 URL** del sitemap respondieron HTTP 200, sin `noindex` en HTML/cabecera, con canonical absoluto hacia sí mismas, `lang="es-MX"`, H1, título y descripción. No hubo duplicados exactos de títulos, descripciones, H1 ni canonical entre esas URL.
- El sitemap dinámico incluye solo servicios y guías publicados y la página de casos solo cuando hay casos o testimonios publicados y consentidos. `robots.txt` permite las rutas públicas y anuncia el sitemap. `www` y el dominio raíz ya fueron verificados como canónicos en la fase anterior; aquí se conserva esa configuración.
- El layout ya publica `LegalService` y `WebSite`; las fichas añaden `Service` y `BreadcrumbList`; los hubs de área, `ItemList`; las guías, `Article`; FAQ visibles, `FAQPage`. No hay datos personales del abogado en el JSON-LD institucional.
- La identidad es coherente en la interfaz y metadata: Garante Jurídico, sede Guadalajara, cobertura nacional. No hay una dirección física, horario de urgencias ni credenciales profesionales confirmados. No se deben inventar.
- **Debilidad comprobada:** las cinco guías son breves (80–176 palabras dentro de `<main>`, según página) y no tenían enlaces contextuales a servicios. Los hubs de urgencias, administrativo, constitucional, civil y mercantil son listas útiles pero breves (70–106 palabras en `<main>`). La página `/urgencias` tenía contacto claro, pasos y FAQ, pero no llevaba directamente a sus fichas específicas. Estas observaciones son editoriales y de navegación; **no** implican que Google penalice un número de palabras.
- No se detectó impedimento técnico de indexación en el HTML público. **No se verificó indexación efectiva ni rankings**, porque no hay acceso a la propiedad de Search Console. El HTML rastreable no equivale a una URL indexada.

**Método:** lectura del código y solicitudes HTTP reales al sitemap y a cada URL; se extrajeron status, robots, canonical, título, descripción, H1–H3, enlaces internos, tipos JSON-LD y texto principal. Las columnas de enlaces incluyen el destino observado, y el recuento total incluye navegación y footer. El tamaño de contenido es una medida descriptiva, no un objetivo SEO. No se usaron métricas inventadas de tráfico o búsqueda.

## 2. Matriz de consultas e intención

La matriz de 30 grupos está en [KEYWORD-MATRIX.csv](KEYWORD-MATRIX.csv). **P0** significa encaje directo con un servicio y una necesidad comercial urgente o frecuente en la muestra pública; **P1**, encaje con intención transaccional o local que conviene validar; **P2**, demanda incierta o intención informativa. Esta priorización es cualitativa. No tenemos volúmenes de Semrush/Ahrefs, Google Ads ni datos de Search Console.

| Grupo | Página que debe recibir la intención | Criterio |
| --- | --- | --- |
| Despacho/abogados Guadalajara | `/` y `/servicios` | Inicio para marca/propuesta; catálogo para elegir área. |
| Detención o alcoholímetro ahora | `/urgencias` | Contacto inmediato y datos que conviene tener a mano. |
| Alcoholímetro, corralón, multa | Fichas específicas de urgencias/administrativo | Una necesidad concreta por ficha; guías como apoyo informativo. |
| Administrativo/fiscal y amparo | Hubs de área + fichas específicas | Diferenciar disciplina de procedimiento; no crear páginas por cada variante léxica. |
| Civil, mercantil, corporativo | Hubs + fichas existentes | Mapear contrato, cobro, pagaré, sociedad, etc. a su intención real. |
| Zapopan | Ninguna página geográfica nueva | Solo optimizar referencias donde la prestación concreta esté confirmada; Guadalajara no equivale a una oficina en Zapopan. |

Las variantes como «ayuda torito Guadalajara» requieren cuidado: «el Torito» suele referir a CDMX; no debe usarse como sinónimo universal de centros de sanciones en Jalisco. La marca debe comunicar el hecho jurídico en términos nacionales y validar cualquier nombre local con el titular.

## 3. Competidores: muestra pública, sin atribuir posiciones

Se consultaron resultados públicos por consultas de Guadalajara/Jalisco, amparo, administrativo, multas y mercantil, y se abrieron directamente las páginas siguientes (HTTP 200 en el corte). Las búsquedas públicas no sustituyen una SERP localizada y personalizada de Google ni prueban orden de ranking. Algunas consultas mezclan Guadalajara, España; esas páginas se excluyeron.

| Sitio observado | Arquitectura y señales visibles | Oportunidad para Garante |
| --- | --- | --- |
| [Thomas & Asociados, administrativo](https://corporativothomas.com/abogado-administrativo-en-guadalajara/) | Página específica «abogado administrativo en Guadalajara», asuntos concretos, proceso, FAQ y contacto directo; comunica política de consulta propia. | Profundizar el hub administrativo con problemas reales y alcance jurídico revisado, sin copiar precios ni plazos. |
| [ADAYD, administrativo](https://adayd.ai/administrativo/) | Secciones de casos frecuentes, asuntos atendidos, proceso, documentos y FAQ. | Hacer más útil la ficha para saber qué documento preparar y cuándo contactar. |
| [LGPS, amparo](https://lgpsabogados.com/constitucional-amparo/) | Tipos de amparo, derechos, FAQ y enlaces hacia otras áreas/guías. | Distinguir amparo directo, indirecto, suspensión y urgencia mediante la arquitectura existente. |
| [AXKAN, mercantil](https://www.axkanabogados.com/derecho-mercantil/) | Servicios, proceso, FAQ, honorarios declarados por el propio competidor y numerosas rutas internas. | Claridad sobre pagarés, contratos, cartera y conflictos empresariales, sin inventar honorarios de Garante. |
| [Dávalos Legal, mercantil](https://davaloslegal.mx/area-mercantil) | Página de área orientada a cobranza, contratos y pagarés, con WhatsApp y consulta. | Garante ya dispone de fichas separadas; conectarlas desde el hub y medir cuál capta consultas. |
| [Don Multas](https://www.donmultas.com/) | Página muy enfocada en multas y corralón, FAQ y contacto. Usa mensajes de resultado que Garante no debe replicar. | Mantener prudencia jurídica y dar una ruta clara de consulta sobre multa o vehículo retenido. |

La diferencia verificable es de **estructura y contenido visible**, no de autoridad SEO, tráfico, conversiones ni posición. Para comparar cuota de impresiones por consulta y detectar competidores reales en la SERP de cada usuario, se necesita Search Console y una herramienta de seguimiento local.

## 4. Auditoría individual de 59 URL

[URL-AUDIT.csv](URL-AUDIT.csv) contiene una fila por URL con objetivo comercial, intención, consultas hipotéticas principales/secundarias, evaluación del texto, título, descripción, H1/H2/H3, canonical, enlaces internos observados, tipos de esquema, potencial de conversión, riesgo de canibalización y acción. El CSV representa **el estado inicial**; los enlaces implementados a continuación se verifican como regresión del estado final.

Hallazgos entre páginas cercanas:

- `/urgencias` debe resolver «necesito ayuda ahora»; `/servicios/urgencias` debe ordenar el catálogo. Las fichas de alcoholímetro, detenciones y corralón responden necesidades específicas. Mantener las cuatro URL tiene una razón de intención, sujeta a comprobar con consultas reales.
- `/guias/como-impugnar-multa` informa qué reunir; la ficha de impugnación ofrece la consulta. La misma distinción aplica a alcoholímetro, corralón y suspensión en amparo. Se añadieron enlaces recíprocos solo cuando el contenido relacionado continúa publicado.
- `/servicios/mercantil/cobro-pagares-titulos` y `/servicios/mercantil/recuperacion-cartera` pueden competir por «cobranza judicial». La primera debe centrarse en título de crédito; la segunda, en gestión de cartera. El texto para profundizarlo requiere revisión jurídica.
- `/servicios/administrativo/defensa-autoridades-fiscales` representa la intención «abogado fiscal» sin crear un área fiscal vacía. Su rendimiento futuro dirá si necesita una arquitectura distinta.

## 5. Cambios de bajo riesgo implementados

| Archivo | Cambio y razón |
| --- | --- |
| `src/lib/related-guides.ts` | Mapa explícito de cuatro pares guía–servicio. Evita enlazar variantes sin relación. |
| `src/app/guias/[slug]/page.tsx` | Enlace contextual al servicio publicado correspondiente, comprobado contra la base de datos para evitar destinos despublicados. |
| `src/app/servicios/[area]/[servicio]/page.tsx` | Enlace de regreso a la guía publicada, útil para dudas previas a la contratación. |
| `src/app/urgencias/page.tsx` | Tres enlaces a fichas urgentes ya existentes bajo el contenido principal. Conserva el contacto inmediato en primer plano y el sistema visual actual. |
| `src/components/booking-form.tsx` | Etiquetas de evento en los enlaces de WhatsApp del agendado que faltaban. No se envían nombre, teléfono, correo, folio ni descripción a la analítica. |
| `docs/seo/*` | Auditoría, matriz, propuestas y plan de medición. |

No se cambiaron títulos, metadata, robots, sitemap, schema, URL canónicas, texto jurídico sustancial ni páginas externas: estaban coherentes o el cambio requería evidencia/revisión adicional. No se crearon páginas artificiales para «Zapopan» ni variantes de una sola búsqueda.

## 6. Contenido jurídico propuesto, pendiente de aprobación

Las propuestas concretas están en [CONTENIDO-PROPUESTO.md](CONTENIDO-PROPUESTO.md). No se publicaron cambios jurídicos sustanciales. Antes de redactar/editar para producción, el abogado titular debe validar hechos, jurisdicción, normas vigentes, alcance del servicio y plazos. Google recomienda contenido útil, fiable y orientado a personas, especialmente cuando puede afectar decisiones importantes; cantidad de palabras y schema no sustituyen exactitud. Fuente: [guía oficial de contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=es-419).

## 7. SEO local: Guadalajara y Zapopan

La web declara sede en Guadalajara y cobertura nacional; no anuncia oficina en Zapopan. El teléfono, correo y marca salen de `site.config.ts`. Antes de crear o reclamar Perfil de Empresa en Google, confirmar **ubicación real, forma de atención, horario y elegibilidad**. Google admite un perfil si los clientes pueden visitar la ubicación real o la empresa acude a ellos; una oficina virtual sin personal/atención no es apta. Si es negocio de área de servicio, se debe ocultar la dirección al público según el caso y usar áreas precisas, no todo México por el mero hecho de atender en línea. No se añadirá dirección falsa al sitio ni al JSON-LD. Fuentes: [lineamientos de Perfil de Empresa](https://support.google.com/business/answer/3038177?hl=es-419), [áreas de servicio](https://support.google.com/business/answer/9157481?hl=es-419), [datos estructurados LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business?hl=es-419).

**Plan operativo:** (1) verificar elegibilidad y datos con el despacho; (2) reclamar una ficha única con nombre real «Garante Jurídico», sitio canónico y canal que atiende; (3) cargar categorías/servicios de forma fiel, horario verdadero y, si aplica, fotos propias autorizadas; (4) enlazar al sitio y comprobar consistencia en directorios profesionales legítimos; (5) medir consultas locales y solicitudes reales. No se solicitarán reseñas ficticias ni se copiarán testimonios sin consentimiento.

## 8. Conversión y privacidad

- El botón de WhatsApp fijo funciona en móvil y escritorio; `/urgencias` mantiene el CTA principal arriba de las opciones informativas. Los formularios de contacto/cita siguen con validación servidor, rate limit, Turnstile y consentimiento de privacidad. La reserva mantiene su restricción de exclusión en PostgreSQL para evitar doble cita.
- Los eventos ya existentes son `clic_whatsapp` (con `origin` no personal), `cita_iniciada`, `cita_creada` y `formulario_enviado`. Esta fase cubre tres enlaces de WhatsApp del flujo de cita que carecían de etiqueta. La analítica está desactivada si falta `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- **Embudo a medir** en Plausible/GSC/administración, por separado: clic desde resultado de búsqueda → visita a página de servicio/urgencias → clic WhatsApp o comienzo de cita → solicitud registrada → consulta atendida (dato interno). No enviar contenido de formularios, identificadores de cita ni datos del cliente a Plausible. El clic no prueba conversación ni cliente ganado.

## 9. Asociación profesional externa, sin nombre en Garante

La página pública de [Rodrigo Lizárraga Camacho en Lizárraga & Ibarra](https://lizarragaibarra.com/equipo/rodrigo-lizarraga-camacho) respondió 200 y muestra nombre y práctica profesional. **No muestra actualmente una relación explícita con Garante Jurídico en el contenido observado**. Propuesta para revisión por sus responsables, sin modificar ese proyecto: «Rodrigo Lizárraga Camacho también participa en Garante Jurídico, despacho con sede en Guadalajara enfocado en defensa y asesoría jurídica», con enlace editorial a `https://garantejuridico.com/`, **solo si la relación y la redacción son exactas y se aprueba su publicación**. En VIGILEX, cualquier mención debería explicar una colaboración real y comprobable, no intercambiar enlaces por SEO. El enlace externo puede aportar una señal de asociación; no garantiza que Garante aparezca por el nombre ni controla los fragmentos que Google genera. No se añade `founder`, `employee`, `worksFor`, `sameAs` personal o mención del nombre en el sitio de Garante.

## 10. Search Console y seguimiento 30/60/90 días

El dominio tiene un registro DNS público de verificación observado en la fase anterior; **eso no prueba que esta cuenta tenga una propiedad verificada ni que el sitemap se haya enviado**. Sin acceso a Search Console no se pudieron inspeccionar cobertura, consultas, Core Web Vitals de campo, impresiones o clics.

1. Entrar en [Google Search Console](https://search.google.com/search-console/). Verificar o crear propiedad de dominio `garantejuridico.com` con TXT DNS en Cloudflare, sin borrar registros existentes. Confirmar el estado dentro de la cuenta.
2. Enviar `https://garantejuridico.com/sitemap.xml`; inspeccionar la URL principal, `/urgencias` y una URL por área; pedir indexación si procede.
3. Revisar **Páginas**: indexadas, excluidas, motivo, URL canónica elegida por Google; contrastar con las 59 URL elegibles. No forzar que todas se indexen si Google juzga que no aportan valor.
4. En **Rendimiento**, segmentar consultas de marca, «Guadalajara», urgencias, amparo, administrativo, mercantil y nombre del profesional; exportar página/consulta/país/dispositivo. Comparar impresiones, clics, CTR y posición media como series temporales, sin prometer posiciones.
5. Revisar [Core Web Vitals con datos de campo](https://developers.google.com/search/docs/appearance/core-web-vitals?hl=es-419): LCP, INP y CLS por grupo de URL; Lighthouse es diagnóstico de laboratorio, no sustituto.

| Corte | Indicadores y decisiones |
| --- | --- |
| 30 días | Confirmar propiedad, sitemap, cobertura, primeras consultas y páginas con impresiones; corregir exclusiones técnicas reales. Establecer línea base de clics WhatsApp, formularios y citas por origen. |
| 60 días | Comparar con primeros 30 días por grupo de consulta y URL; observar canibalización guía/ficha y hub/ficha; priorizar el contenido jurídico aprobado que tenga impresiones y CTR bajo. Revisar CWV de campo si ya hay datos. |
| 90 días | Comparar ventanas equivalentes, estacionalidad y cambios de SERP; evaluar consultas comerciales con citas/consultas reales, no solo tráfico. Decidir si ampliar fichas o consolidar páginas según evidencia. |

## 11. Límites y riesgos

No se dispone de GSC, Semrush, Ahrefs, un histórico de ranking ni acceso a leads reales. La muestra de búsqueda y competidores acredita **existencia de oferta**, no volumen, posición o ventaja competitiva. Google puede reescribir títulos/fragmentos. En servicios jurídicos, la mayor oportunidad editorial también es el mayor riesgo: publicar plazos, requisitos o expectativas sin validación del titular podría perjudicar al cliente. No se han añadido nuevos supuestos de procedencia ni resultados garantizados. Los datos de dirección, horario, cédula y honorarios siguen pendientes conforme a `PENDIENTES.md`.

## 12. Validación y registro

- Auditoría HTTP inicial: 59/59 páginas 200; 59 canonicals autoconsistentes, 59 títulos y descripciones no duplicados, H1 presente y `es-MX` en todas; JSON-LD presente en los tipos esperados. La evaluación individual está en el CSV.
- `npm run lint`: correcto. `npm run typecheck`: correcto. `npm test`: 6 archivos y 12 pruebas correctas, incluida concurrencia de reservas. `npm run build`: correcto. `BASE_URL=http://localhost:3199 npm run test:e2e`: 7/7 pruebas correctas en Chromium móvil (barra de urgencia, panel, cita, SEO y enlaces nuevos).
- Revisión en Chromium local de `/`, `/urgencias`, guía de multa, ficha de multa, `/agendar`, `/contacto` y `/admin/login` a **375 y 1280 px**: 14 respuestas 200 y ningún desborde horizontal (`scrollWidth === clientWidth`). Las seis capturas de las tres páginas modificadas están en [screenshots/](screenshots/). La inspección visual no detectó texto cortado ni cambios de identidad. El detector de Impeccable devolvió `[]` en los cuatro archivos de interfaz editados.
- Se observaron avisos del entorno de pruebas sobre la carga futura del archivo de configuración de Vite y la combinación `NO_COLOR`/`FORCE_COLOR`; no son fallas de las pruebas ni advertencias del build. El resultado visual y funcional se probó en la compilación local.
- La versión de producción se auditará de nuevo **solo si se publica esta fase**. El corte inicial no demuestra que el cambio ya esté desplegado.

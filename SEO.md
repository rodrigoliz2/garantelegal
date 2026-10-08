# SEO y posicionamiento de garantejuridico.com

## Lo que ya hace el sitio

| Elemento | Detalle |
| --- | --- |
| URL canónica | Cada página declara su dirección oficial (`https://garantejuridico.com/...`) |
| Títulos y descripciones | Propios por página, orientados a búsquedas locales: «Derecho corporativo en Guadalajara», «Amparo indirecto en Guadalajara», etc. |
| Vista al compartir | Título, descripción e imagen correctos en WhatsApp, Facebook, LinkedIn y X |
| Datos estructurados | `LegalService` (despacho, contacto, Instagram, áreas, cobertura), `WebSite`, `Service` y `FAQPage` en cada servicio, `BreadcrumbList` en áreas, servicios y guías, `ItemList` en áreas y `Article` en guías |
| Sitemap | `/sitemap.xml` con todas las páginas publicadas y sus prioridades; se actualiza solo al publicar contenido desde el panel |
| robots.txt | Excluye `/admin`, `/api` y `/styleguide` |
| Contenido duplicado | La dirección `*.vercel.app` y cualquier dominio distinto al oficial envían `noindex` |
| Enlaces internos | Cada servicio enlaza a los demás de su área |
| Rendimiento y accesibilidad | Lighthouse móvil: rendimiento 94–98, accesibilidad, buenas prácticas y SEO en 100 |
| Verificación opcional | Variables `GOOGLE_SITE_VERIFICATION` y `BING_SITE_VERIFICATION` si prefieres verificar por etiqueta en lugar de DNS |

## Lo que tienes que hacer tú

### 1. Dominio principal en Vercel (urgente, 1 minuto)

Hoy `garantejuridico.com` redirige a `www.garantejuridico.com`, pero el sitio declara como oficial la versión **sin** `www`. Esa contradicción le resta posicionamiento. En Vercel → Settings → Domains:

- `garantejuridico.com`: **sin redirección** (Connect to an environment: Production).
- `www.garantejuridico.com`: **Redirect to** `garantejuridico.com` (308).

### 2. Google Search Console (15 minutos)

1. Entra a search.google.com/search-console y agrega una propiedad de tipo **Dominio**: `garantejuridico.com`.
2. Google te dará un registro **TXT**. Créalo en Cloudflare → DNS (nombre `@`, tipo TXT, el valor que te den) y presiona Verificar.
3. En **Sitemaps**, envía `https://garantejuridico.com/sitemap.xml`.
4. En **Inspección de URL**, solicita la indexación del inicio, `/urgencias`, `/servicios` y `/servicios/corporativo`.

### 3. Bing Webmaster Tools (5 minutos)

En bing.com/webmasters, elige **Importar desde Google Search Console**. Bing también alimenta a ChatGPT y a otros buscadores.

### 4. Perfil de Empresa en Google (lo que más pesa en búsquedas locales)

1. Entra a business.google.com y crea el perfil **Garante Jurídico**.
2. Categoría principal: **Abogado**. Agrega también categorías secundarias de tus materias, como abogado de derecho corporativo.
3. Si no quieres mostrar tu dirección, configúralo como **negocio de área de servicio**, con Guadalajara y Zapopan, y agrega otras ciudades si atiendes en persona. Google enviará una verificación, normalmente por video o postal.
4. Teléfono: 618 282 9873. Sitio web: `https://garantejuridico.com`.
5. Agrega horario, servicios (copia los nombres de las áreas y servicios del sitio), fotos reales de la oficina y tu foto profesional.
6. Usa siempre el mismo nombre, teléfono y dominio en todos lados (Google, Instagram, directorios).

### 5. Reseñas reales (esto también alimenta la sección de testimonios)

1. En tu Perfil de Empresa, usa **Pedir reseñas** para obtener tu enlace corto.
2. Al cerrar cada asunto, envíalo por WhatsApp al cliente con un mensaje breve de agradecimiento.
3. Si el cliente acepta que lo publiquemos en el sitio, captúralo en el panel → Contenido → Testimonios: nombre de pila o iniciales, el texto, la fecha y la fuente («Google»). Marca **Consentimiento** y **Publicado**. La sección aparece sola en el inicio y en `/casos-de-exito`.
4. Los casos documentados se capturan igual, sin datos que identifiquen al cliente.

### 6. Datos que suben la confianza (y el posicionamiento)

Completa en `src/site.config.ts` tu **nombre** y **cédula profesional**, y agrega tu **foto**. Google valora que el contenido legal tenga un autor identificable y verificable. Con la cédula, el sitio enlaza al Registro Nacional de Profesionistas.

### 7. Instagram y directorios

- En la biografía de @garantejuridico, pon el enlace `https://garantejuridico.com`.
- Date de alta en directorios jurídicos y en tu colegio o barra de abogados, con el enlace al sitio y los mismos datos de contacto.

### 8. Contenido: dos guías al mes

Cada guía bien escrita atrae búsquedas que hoy no te encuentran. Se publican desde el panel → Contenido → Guías. Temas con demanda:

- Cómo sacar un auto del corralón en Guadalajara
- Qué hacer si te detienen en el alcoholímetro en Jalisco
- Cómo impugnar una fotomulta en Jalisco
- Qué es una S.A.S. y cuándo conviene
- S.A. de C.V. o S. de R.L.: diferencias para emprender
- Cómo constituir una SOFOM E.N.R. paso a paso
- Qué es el beneficiario controlador y qué debe hacer tu empresa
- Actividades vulnerables: quién debe darse de alta ante el SAT
- Fideicomiso de garantía: cómo funciona
- Qué revisar antes de comprar una empresa
- Cómo funciona el amparo contra una multa o una clausura

Recomendaciones: un tema por guía, de 800 a 1 500 palabras, respondiendo la pregunta en el primer párrafo, con ejemplos y una invitación clara a consultar.

### 9. Medición (opcional)

Si quieres saber cuántas visitas y contactos genera el sitio, activa Plausible (ver DEPLOY.md) y revisa Search Console cada mes: búsquedas, clics y páginas que más atraen.

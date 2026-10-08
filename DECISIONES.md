# Decisiones de implementación

- El repositorio llegó vacío. Se inicializó Git y se copió el brief adjunto a `BRIEF.md` antes de escribir código.
- El disco tenía 131 MB libres y npm no podía instalar dependencias. Se limpió únicamente la caché descargable de npm para liberar espacio.
- Se usa Next.js 15 y Prisma 6 para mantener migraciones SQL reproducibles con la restricción PostgreSQL `EXCLUDE USING gist`.
- La consulta no tiene cobro en línea hasta que se confirme su costo. Los honorarios se solicitan mediante cotización.
- La disponibilidad inicial de lunes a viernes, 09:00–18:00, es un ejemplo editable. No representa el horario de la línea de urgencias.
- Los asuntos familiares se cargan como borrador sin publicar hasta que el despacho confirme que los atiende.
- La presencia de un marcador `[PENDIENTE: ...]` impide presentar como confirmados los datos no proporcionados por el despacho.
- La fase 1 ofrece un solo recurso de consulta; por eso la restricción de exclusión impide cualquier traslape de citas activas, incluso si las modalidades son distintas. Si se incorporan varios abogados o salas habrá que modelar recursos y ajustar la restricción.
- Sin claves de Turnstile se usan las claves oficiales de prueba incluso en un build de producción local, como pidió el despacho para funcionar sin cuentas. Antes de un despliegue público hay que configurar ambas claves reales: las de prueba siempre aceptan el reto y no protegen contra abuso automatizado.
- Se usó el PDF de inicio como referencia de composición y la imagen de marca como guía cromática y tipográfica. El monograma SVG generado en código aproxima el raster aprobado; no reemplaza un archivo vectorial maestro del diseñador.
- Docker no está instalado en esta computadora. Las migraciones, la semilla y la prueba de concurrencia se ejecutaron contra PostgreSQL 18 local; `docker-compose.yml` queda preparado para PostgreSQL 16 en otras computadoras.
- El dominio, el correo y los teléfonos reales no se conectaron ni probaron porque el proyecto no se despliega en esta entrega.
- `npm audit --omit=dev` reportó cinco avisos de dependencias (uno moderado y cuatro altos, asociados a Next.js/Prisma y dependencias transitivas) al 7 de octubre de 2026. Las correcciones sugeridas implican cambios mayores o retrocesos de versión que necesitan migración y nuevas pruebas; esta entrega conserva las versiones que pasaron lint, tipos, tests, build y E2E. Resolver los avisos antes de publicar.
- No se emite `Attorney` en JSON-LD hasta recibir nombre y cédula verificables del abogado titular. Publicarlo con un perfil ficticio contradice el brief. `LegalService`, `FAQPage` y `Article` sí usan contenido disponible.

## Rediseño monocromo (octubre de 2026)

- Se eligió la variante A del laboratorio (fotografía a sangre con el titular abajo a la izquierda). Las variantes B y C se retiraron; sus capturas quedan en `docs/screenshots/lab/`.
- Pareja tipográfica: Host Grotesk para titulares y texto, y Newsreader cursiva solo para citas. Se descartaron Hanken Grotesk (muy neutra), Bricolage Grotesque (muy juguetona) y Archivo (demasiado condensada) tras compararlas con un titular real.
- Fotografía de Pexels en lugar de Unsplash: Unsplash bloquea la consulta automatizada con un reto antibots, y Pexels permite descargar por ID desde su CDN con la misma licencia libre.
- La carga del hero se orquesta en CSS y no con `motion`, para que corra antes de la hidratación y no retrase el LCP. El resto del movimiento (paralaje, lista de áreas, encabezado, menú, acordeón y transición entre páginas) usa `motion`.
- El acordeón móvil anima su altura (`height: auto`), como pide el brief. Es la única propiedad de diseño que se anima fuera de transform y opacity.
- La lógica de agendado, formularios, panel, base de datos y rutas no cambió. En los formularios solo cambiaron clases y estructura visual; nombres de campos, etiquetas y textos que usan las pruebas se conservan.
- Correcciones visuales encontradas en la revisión, sin tocar la lógica:
  - Los horarios de /agendar se mostraban en inglés («Thursday 8 De October»). Ahora se formatean en es-MX en el formulario a partir de `startsAt`; `lib/availability.ts` queda igual.
  - Los radios ocultos de los horarios estiraban la página 3000 px por debajo del pie. Se arregló con `relative` en su contenedor.
  - Los marcadores `[BORRADOR JURÍDICO: …]` de la base de datos se veían en público. Se filtran al mostrar el texto (`src/lib/public-text.ts`, con prueba).
- /casos-de-exito responde 404 mientras no haya casos reales con consentimiento.
- El panel interno no se rediseñó (fuera del alcance). Hereda la paleta monocroma a través de las clases heredadas remapeadas en `globals.css` y `tailwind.config.js`.
- El correo transaccional pasó a monocromo con wordmark en texto. Usa Helvetica del sistema: los clientes de correo no cargan fuentes web.

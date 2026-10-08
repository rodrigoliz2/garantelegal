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

# Decisiones de implementación

- El repositorio llegó vacío. Se inicializó Git y se copió el brief adjunto a `BRIEF.md` antes de escribir código.
- El disco tenía 131 MB libres y npm no podía instalar dependencias. Se limpió únicamente la caché descargable de npm para liberar espacio.
- Se usa Next.js 15 y Prisma 6 para mantener migraciones SQL reproducibles con la restricción PostgreSQL `EXCLUDE USING gist`.
- La consulta no tiene cobro en línea hasta que se confirme su costo. Los honorarios se solicitan mediante cotización.
- La disponibilidad inicial de lunes a viernes, 09:00–18:00, es un ejemplo editable. No representa el horario de la línea de urgencias.
- Los asuntos familiares se cargan como borrador sin publicar hasta que el despacho confirme que los atiende.
- La presencia de un marcador `[PENDIENTE: ...]` impide presentar como confirmados los datos no proporcionados por el despacho.
- La fase 1 ofrece un solo recurso de consulta; por eso la restricción de exclusión impide cualquier traslape de citas activas, incluso si las modalidades son distintas. Si se incorporan varios abogados o salas habrá que modelar recursos y ajustar la restricción.
- Las claves públicas de prueba de Turnstile se usan solo en desarrollo o pruebas. En producción faltarán las claves reales y el formulario rechazará envíos para evitar una protección ficticia.

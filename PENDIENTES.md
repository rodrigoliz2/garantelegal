# Datos pendientes del despacho

Los datos marcados como `[PENDIENTE: …]` en `src/site.config.ts` **no se muestran al público**: la función `provided()` los oculta y las secciones que dependen de ellos desaparecen. Al completar cada dato en `site.config.ts`, aparece solo en el sitio.

| Dato | Dónde aparecerá al completarlo |
| --- | --- |
| [PENDIENTE: nombre del abogado titular] | Bloque «La firma» del inicio y /nosotros |
| [PENDIENTE: cédula profesional del abogado titular] | Junto al nombre, con enlace al Registro Nacional de Profesionistas |
| [PENDIENTE: retrato real del abogado titular] | Espacio reservado en «La firma»; hoy se muestra una foto de arquitectura, nunca una persona de archivo |
| [PENDIENTE: dirección de la oficina en Guadalajara] | Pie, /contacto, /agendar y aviso de privacidad |
| [PENDIENTE: horario de atención por WhatsApp] | /urgencias y /contacto |
| [PENDIENTE: honorarios o política de cotización] | /contacto |
| [PENDIENTE: costo de la consulta inicial] | /agendar |

## Resueltos

- Teléfono: **618 282 9873**, solo por WhatsApp (llamadas y mensajes). El sitio no tiene enlaces `tel:`.
- Correo de contacto: **contacto@garantejuridico.com** (pie, /contacto, menú móvil y páginas legales). Para recibir los avisos de citas, configura también `CONTACT_EMAIL` en el entorno de producción.
- Textos jurídicos (servicios, guías, urgencias, aviso de privacidad y términos): el abogado titular los dio por buenos el 8 de octubre de 2026. Se retiraron las leyendas de borrador y los marcadores `[BORRADOR JURÍDICO: …]` de la semilla y de la base de datos.

## Otros pendientes

1. [PENDIENTE: archivo vectorial del logotipo definitivo (`public/brand/logo.svg`); hoy se usa un wordmark tipográfico]
2. [PENDIENTE: rehacer en monocromo la papelería de `public/brand/templates/` y los SVG con monograma de la versión anterior]
3. [PENDIENTE: casos documentados y testimonios reales con consentimiento; /casos-de-exito responde 404 mientras no haya]
4. [PENDIENTE: confirmar si el despacho atiende asuntos familiares; el servicio está cargado sin publicar]
5. [PENDIENTE: `EMAIL_FROM` y la clave de Resend para enviar correos reales]
6. [PENDIENTE: revisar y resolver los avisos de dependencias antes de publicar (ver DECISIONES.md)]

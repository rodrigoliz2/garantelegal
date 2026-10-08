# Datos pendientes del despacho

1. [PENDIENTE: nombre del abogado titular]
2. [PENDIENTE: cédula profesional del abogado titular]
3. [PENDIENTE: dirección de la oficina en Guadalajara]
4. [PENDIENTE: horario de la línea de urgencias]
5. [PENDIENTE: honorarios o política de cotización]
6. [PENDIENTE: costo de la consulta inicial]
7. [PENDIENTE: correo de contacto del despacho]

Estos datos deben revisarse antes de publicar. También falta la validación jurídica de todos los textos marcados como borrador.

## Definiciones adicionales para completar los borradores legales y la marca

8. [PENDIENTE: nombre y cargo autorizados para papelería y firma de correo]
9. [PENDIENTE: validar finalidades secundarias del aviso, si existen]
10. [PENDIENTE: validar transferencias, encargados y mecanismos aplicables]
11. [PENDIENTE: procedimiento, plazos y persona responsable para derechos ARCO]
12. [PENDIENTE: fecha de última actualización y política de conservación]
13. [PENDIENTE: jurisdicción aplicable, fecha de vigencia y texto final de términos]
14. [PENDIENTE: confirmar uso local de «el Torito» y «la Curva» con el abogado titular]
15. [PENDIENTE: revisar y resolver avisos de dependencias antes de publicar]

Los marcadores compuestos de las plantillas corporativas («correo y dirección», «cargo y cédula») se resuelven con los puntos anteriores. La revisión final del aviso y de cada texto jurídico corresponde al abogado titular.

## Rediseño monocromo (octubre de 2026)

Desde el rediseño, los datos marcados como `[PENDIENTE: …]` en `site.config.ts` **no se muestran al público**: la función `provided()` los oculta y las secciones que dependen de ellos desaparecen. Al completar cada dato en `site.config.ts`, aparece solo en el sitio.

| Dato | Dónde aparecerá al completarlo |
| --- | --- |
| Nombre y cédula del abogado titular (1, 2) | Bloque «La firma» del inicio y /nosotros, con enlace al Registro Nacional de Profesionistas |
| Retrato real del abogado titular | Espacio reservado en «La firma»; hoy se muestra una foto de arquitectura, nunca una persona de archivo |
| Dirección de la oficina (3) | Pie, /contacto, /agendar y aviso de privacidad |
| Horario de la línea de urgencias (4) | /urgencias y /contacto |
| Honorarios o política de cotización (5) | /contacto |
| Costo de la consulta (6) | /agendar |
| Correo de contacto (7) | Pie, /contacto y páginas legales (hoy remiten al teléfono) |

16. [PENDIENTE: archivo vectorial del logotipo definitivo (`public/brand/logo.svg`); hoy se usa un wordmark tipográfico]
17. [PENDIENTE: rehacer en monocromo la papelería de `public/brand/templates/` y los SVG con monograma de la versión anterior]
18. [PENDIENTE: casos documentados y testimonios reales con consentimiento; /casos-de-exito responde 404 mientras no haya]
19. [PENDIENTE: validar los textos jurídicos de servicios y guías; los marcadores `[BORRADOR JURÍDICO: …]` siguen en la base de datos y se ocultan al público con `publicText()`]
20. [PENDIENTE: plazos orientativos por servicio; hoy se dice que se estiman en la consulta]
21. [PENDIENTE: revisar textos de la sección «La firma» y la cita «No prometemos resultados. Explicamos cada paso.» con el abogado titular]

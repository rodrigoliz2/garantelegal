# Brief de proyecto: plataforma de despacho jurídico y defensa inmediata

Oct 7, 2026 · @Rodrigo Lizarraga Camacho

## Resumen

Se construye el sitio web y el sistema de captación de un despacho jurídico mexicano con dos carriles: **urgencias** (alcoholímetro, detenciones, multas) y **asuntos programados** (constitucional, administrativo, civil y mercantil).

El sitio tiene un solo trabajo: convertir una visita en una llamada, un WhatsApp o una cita. Todo lo demás (servicios, casos, guías) existe para dar la confianza que hace falta antes de ese contacto.

- **Línea de contacto única:** 669 212 2543 (llamada y WhatsApp).
- **Regla de oro:** desde cualquier pantalla, en móvil, el usuario llega a llamar o escribir en máximo 2 toques.
- **Entregable:** sitio público, agendado de citas y panel de administración para el despacho.
- **Nombre de marca:** Garante Jurídico; en el código vive en una sola variable de configuración.

## Decisiones por confirmar

El nombre ya está definido (Garante Jurídico); falta el dominio y seis datos más que solo el despacho puede dar. Codex puede avanzar con marcadores, pero el sitio no se publica sin ellos.

| Decisión | Por qué importa | Mientras tanto |
| --- | --- | --- |
| Nombre y dominio | Resuelto: Garante Jurídico, garantejuridico.com | Variable `SITE_NAME` |
| Ciudad y estado de cobertura | Cambia reglamentos citados, textos y SEO local. El número es lada 669 (Mazatlán) y «torito» es término de CDMX: resuelto: sede en Guadalajara, Jalisco, con cobertura en toda la República (zona horaria America/Mexico\_City) | Variable `COVERAGE` sin ciudad fija |
| Abogado titular y cédula profesional | Es la principal prueba de confianza de un despacho | Sección «Nosotros» oculta |
| Horario real de la línea de urgencias | Si no es 24/7, el botón debe decirlo fuera de horario | Horario configurable |
| Honorarios: precios «desde» o solo cotización | Define si hay tabla de precios | Solo «Solicitar cotización» |
| Consulta inicial: gratuita o con costo | Define si se necesita pago en línea | Sin cobro en línea (fase 1) |
| Casos y testimonios reales disponibles | No se publican ejemplos inventados | Secciones ocultas hasta tener contenido real |

## Usuarios y escenarios

El diseño se decide pensando en el primer escenario: si funciona para alguien con prisa y miedo en un celular, funciona para todos.

| Usuario | Situación | Qué necesita del sitio |
| --- | --- | --- |
| Familiar o amigo de un detenido | De madrugada, en el celular, con poca batería y datos lentos | Llamar o escribir ya; saber qué datos tener a la mano |
| Conductor con multa o vehículo en el corralón | Tiene una boleta y un plazo corriendo | Saber si se puede impugnar, cuánto tarda y qué documentos llevar |
| Persona o negocio con un asunto civil, mercantil o administrativo | Compara despachos con calma, desde computadora | Entender el servicio, ver credenciales y agendar una consulta |
| Cliente que regresa | Ya conoce al despacho | Agendar o escribir sin volver a explicar todo |

## Mapa del sitio

Doce rutas públicas y un panel privado. La barra de urgencia (Llamar / WhatsApp) aparece en todas.

| Ruta | Propósito | Contenido clave |
| --- | --- | --- |
| `/` | Orientar en 5 segundos | Hero con dos caminos («Tengo una urgencia» / «Quiero una consulta»), áreas de práctica, cómo trabajamos en 3 pasos, credenciales, casos, testimonios, preguntas frecuentes, cierre con agendado |
| `/urgencias` | Página de aterrizaje para alcoholímetro y detenciones | Botones gigantes de llamada y WhatsApp, qué hacer ahora, qué datos tener a la mano, qué hace el despacho, preguntas frecuentes |
| `/servicios` | Catálogo completo | Áreas con filtro y buscador |
| `/servicios/[area]` | Una página por área | Descripción y lista de servicios del área |
| `/servicios/[area]/[servicio]` | Página de servicio (plantilla única) | Qué es, cuándo aplica, documentos necesarios, proceso en pasos, tiempos orientativos, preguntas frecuentes, botón de acción |
| `/agendar` | Reservar cita | Flujo de agendado directo y alternativa por WhatsApp |
| `/casos-de-exito` | Prueba de resultados | Casos reales anonimizados, filtrables por área |
| `/nosotros` | Quién está detrás | Abogados, cédulas, trayectoria, forma de trabajo |
| `/guias` | Contenido útil y SEO | Artículos: «Qué hacer si te detienen en el alcoholímetro», «Cómo impugnar una multa», etc. |
| `/contacto` | Datos y ubicación | Teléfono, WhatsApp, correo, dirección, mapa, horario |
| `/aviso-de-privacidad`, `/terminos` | Cumplimiento | Textos legales |
| `/admin` | Operación del despacho | Agenda, prospectos, contenido, disponibilidad |

## Catálogo de servicios

Cinco áreas, con urgencias siempre en primer lugar. El catálogo se carga como datos (no como texto fijo) para que el despacho agregue o quite servicios desde el panel.

| Área | Servicios iniciales |
| --- | --- |
| Urgencias | Amparo contra arresto por alcoholímetro · Asistencia en detenciones ante juez cívico o Ministerio Público · Liberación de vehículo del corralón · Localización de persona detenida |
| Administrativo | Impugnación de multas de tránsito y fotomultas · Clausuras, multas y sanciones a negocios · Licencias y permisos · Defensa ante autoridades fiscales · Juicio contencioso administrativo (nulidad) · Responsabilidad patrimonial del Estado |
| Constitucional | Amparo indirecto · Amparo directo · Suspensión del acto reclamado · Amparo contra leyes y actos de autoridad · Defensa de derechos humanos |
| Civil | Contratos · Arrendamiento y desocupación · Cobro de adeudos · Daños y responsabilidad civil · Sucesiones y testamentos · Asuntos familiares (divorcio, pensión, custodia), si el despacho los lleva |
| Mercantil | Cobro de pagarés y títulos de crédito (juicio ejecutivo mercantil) · Constitución de sociedades · Contratos mercantiles · Conflictos entre socios · Recuperación de cartera · Concursos mercantiles |

Cada servicio usa la misma plantilla de página: qué es, cuándo aplica, documentos necesarios, proceso en pasos, tiempos orientativos, preguntas frecuentes y botón de acción. El botón es «Llamar ahora» en urgencias y «Agendar consulta» en el resto.

Los textos jurídicos que redacte Codex son borradores: plazos, fundamentos y alcances los valida el abogado titular antes de publicar.

## Flujos clave

Tres flujos concentran el valor del sitio: emergencia, WhatsApp y agendado directo.

### Botón de emergencia

- En móvil: barra fija inferior con dos botones, **Llamar ahora** y **WhatsApp**, visible en todas las páginas y por encima de cualquier otro elemento.
- En escritorio: botón fijo en el encabezado y botón flotante abajo a la derecha.
- Llamada: enlace `tel:+526692122543`.
- WhatsApp: `https://wa.me/526692122543?text=<mensaje codificado>`. Probar en un teléfono real; si no abre el chat, usar el prefijo `521`.
- Nunca se bloquea la llamada con un formulario. Un asistente opcional de 3 preguntas (quién está detenido, dónde, desde cuándo) arma el mensaje de WhatsApp; se puede saltar.
- Fuera del horario configurado, el botón lo dice con claridad y ofrece dejar mensaje por WhatsApp.
- Rojo reservado solo para este botón; en ningún otro lugar del sitio.

### Mensajes de WhatsApp prellenados

El mensaje cambia según desde dónde se pulsa, para que el despacho sepa de inmediato de qué se trata.

| Origen | Mensaje |
| --- | --- |
| Barra de emergencia | «URGENTE: necesito ayuda por una detención. Nombre: \_\_ · Lugar: \_\_ · Hora: \_\_» |
| Página de un servicio | «Hola, quiero información sobre \[servicio\].» |
| Agendado por WhatsApp | «Hola, quiero agendar una consulta. Servicio: \_\_ · Día preferido: \_\_ · Modalidad: \_\_» |
| Cita creada en el sitio | «Confirmo mi cita \[folio\] del \[fecha\] a las \[hora\].» |

### Agendado directo en la página

1. Elegir área y servicio (preseleccionado si viene de una página de servicio).
2. Elegir modalidad: presencial, videollamada o llamada.
3. Elegir día y hora entre los horarios disponibles.
4. Capturar nombre, teléfono, correo opcional y una descripción breve. Casilla de aceptación del aviso de privacidad.
5. Confirmación con folio, botón «Confirmar por WhatsApp», archivo de calendario (.ics) y correo al despacho y al cliente.

Reglas del agendado:

- La disponibilidad sale de reglas semanales más bloqueos puntuales que el despacho edita en el panel.
- No se permite doble reserva del mismo horario; la validación se hace en el servidor.
- Estados de una cita: pendiente, confirmada, reprogramada, cancelada, atendida.
- Zona horaria configurable según la ciudad de cobertura.
- Antelación mínima y duración de la cita configurables (propuesta: 2 horas y 30 minutos).
- Las urgencias no se agendan: el flujo redirige a llamar.

Los recordatorios automáticos por WhatsApp requieren la API de WhatsApp Business y quedan para la fase 2; en la fase 1 se usan enlaces y correo.

## Confianza: casos, recomendaciones y credenciales

En un despacho la confianza se gana con datos verificables, no con adjetivos. Por eso estas secciones solo muestran contenido real.

- **Casos de éxito:** fichas anonimizadas con área, problema, estrategia, resultado y tiempo. Sin nombres ni datos que identifiquen al cliente, y con su consentimiento.
- **Recomendaciones:** testimonios reales con nombre de pila o iniciales y fecha. Lo ideal es enlazar a las reseñas del perfil de Google del despacho.
- **Credenciales:** nombre completo y cédula profesional de cada abogado, con enlace para verificarla en el Registro Nacional de Profesionistas.
- **Cifras:** solo las que el despacho pueda sostener (años de ejercicio, asuntos atendidos).
- **Sin promesas de resultado:** nada de «100 % garantizado» ni «te sacamos seguro». Sí se puede prometer tiempo de respuesta.

Regla para Codex: no generar casos, testimonios, cifras ni reseñas ficticias. Cada sección de confianza tiene un interruptor y permanece oculta mientras no haya contenido real cargado desde el panel.

## Diseño UI/UX

La dirección visual es «despacho serio que contesta rápido»: sobrio y editorial, sin clichés de balanzas, mazos ni fotos de archivo de gente con traje.

- **Primero móvil:** se diseña a 375 px y se amplía. Zonas táctiles de al menos 48 px.
- **Paleta:** azul marino profundo como base, marfil como fondo, un acento cálido (ámbar o latón) para acciones normales y rojo exclusivo para emergencia.
- **Tipografía:** serif con carácter en titulares y sans muy legible en texto; cuerpo mínimo de 16 px.
- **Inicio:** el hero ofrece dos caminos claros, «Tengo una urgencia» y «Quiero una consulta», en lugar de un carrusel.
- **Lenguaje:** español claro, de tú, sin latinismos. Cada tecnicismo (amparo, suspensión) se explica en una línea.
- **Movimiento:** transiciones breves y discretas; se respeta la preferencia de movimiento reducido.
- **Accesibilidad:** contraste AA, navegación por teclado, foco visible, etiquetas en formularios.
- **Rendimiento:** la página de urgencias debe cargar rápido con datos lentos: sin video, imágenes ligeras, LCP menor a 2.5 s en 4G.
- **Formularios:** pocos campos, validación en línea, mensajes de error que dicen cómo corregir.
- **Estados completos:** cargando, vacío, error y éxito diseñados en cada flujo.

## Stack técnico, datos y panel

Stack propuesto: Next.js con TypeScript, pensado para que un solo proyecto sirva el sitio, el agendado y el panel. Codex puede sustituir piezas equivalentes si lo justifica.

| Capa | Elección |
| --- | --- |
| Aplicación | Next.js (App Router) + TypeScript |
| Estilos y componentes | Tailwind CSS + shadcn/ui |
| Base de datos | PostgreSQL (Supabase o Neon) con Prisma |
| Acceso al panel | Auth.js o Supabase Auth, solo usuarios del despacho |
| Correo transaccional | Resend |
| Validación | Zod en cliente y servidor |
| Protección de formularios | Límite de peticiones + Cloudflare Turnstile |
| Despliegue | Vercel |
| Analítica | Plausible o GA4 con eventos de conversión |

Toda la configuración del negocio vive en un solo archivo (`site.config.ts`): nombre, teléfono, horario, ciudad, zona horaria, redes e interruptores de secciones.

### Modelo de datos

| Entidad | Campos principales |
| --- | --- |
| PracticeArea | nombre, slug, descripción, orden |
| Service | área, nombre, slug, resumen, contenido, documentos, pasos, preguntas frecuentes, esUrgencia, publicado |
| Appointment | folio, servicio, modalidad, inicio, fin, estado, nombre, teléfono, correo, notas |
| AvailabilityRule | día de la semana, hora inicio, hora fin, modalidad |
| BlockedSlot | inicio, fin, motivo |
| Lead | origen, servicio, nombre, teléfono, mensaje, estado |
| CaseStudy | área, título, problema, estrategia, resultado, duración, publicado |
| Testimonial | autor, texto, fecha, fuente, publicado |
| Post | título, slug, contenido, publicado |
| AdminUser | nombre, correo, rol |

### Panel de administración

- Agenda: vista por día y semana; confirmar, reprogramar y cancelar citas.
- Prospectos: lista de contactos recibidos con estado (nuevo, contactado, cliente, descartado).
- Disponibilidad: horarios semanales y bloqueos.
- Contenido: alta y edición de servicios, casos, testimonios y guías.
- Cada cita y prospecto tiene un botón que abre WhatsApp con el cliente.

## Cumplimiento legal y ético

Un sitio de abogados con fallas legales pierde credibilidad de inmediato; estos seis puntos son requisito de publicación.

- **Aviso de privacidad:** conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares vigente, enlazado en el pie y en cada formulario.
- **Consentimiento expreso:** casilla sin premarcar en cada formulario; los asuntos legales pueden implicar datos sensibles.
- **Datos mínimos:** los formularios piden solo lo necesario para contactar; los detalles del asunto se tratan en la consulta.
- **Aviso de no asesoría:** el contenido es informativo, no constituye asesoría legal ni crea relación abogado-cliente.
- **Publicidad veraz:** sin garantías de resultado, sin cifras no comprobables, sin comparaciones con otros despachos.
- **Seguridad:** HTTPS, panel protegido, datos de clientes nunca expuestos en rutas públicas.

El aviso de privacidad, los términos y los avisos los redacta o valida el abogado titular; Codex deja la estructura y un borrador marcado como tal.

## SEO local y medición

Quien busca «abogado alcoholímetro» o «impugnar multa» más su ciudad debe encontrar una página que responda exactamente eso.

- Una página por servicio con título, descripción y encabezados propios; la ciudad de cobertura se inserta desde la configuración.
- Datos estructurados: `LegalService` en el sitio, `Attorney` en «Nosotros», `FAQPage` en preguntas frecuentes y `Article` en guías.
- Perfil de Empresa en Google con el mismo nombre, teléfono y dirección que el sitio.
- Sitemap, robots, metadatos Open Graph e imagen para compartir en WhatsApp.
- Guías iniciales: qué hacer en un alcoholímetro, cómo impugnar una multa, cómo sacar un vehículo del corralón, qué es un amparo.

Eventos a medir: `clic_llamar`, `clic_whatsapp` (con origen), `cita_iniciada`, `cita_creada`, `formulario_enviado`. El indicador principal es contactos por cada 100 visitas.

## Fases y criterios de aceptación

Dos fases: la primera deja el sitio operando y captando; la segunda automatiza.

| Fase | Incluye |
| --- | --- |
| 1. Lanzamiento | Sitio público completo, barra de emergencia, WhatsApp prellenado, agendado directo, correos de confirmación, panel (agenda, prospectos, disponibilidad, contenido), SEO base, textos legales en borrador |
| 2. Automatización | Recordatorios por API de WhatsApp Business, pago en línea de la consulta, sincronización con Google Calendar, portal de seguimiento para clientes, reseñas de Google integradas |

La fase 1 se da por terminada cuando se cumple todo esto:

- [ ] Desde cualquier página, en móvil, se llega a llamar o abrir WhatsApp en máximo 2 toques.
- [ ] Los enlaces de llamada y WhatsApp abren el 669 212 2543 en iPhone y Android reales.
- [ ] Se puede crear una cita de principio a fin y aparece en el panel con su folio.
- [ ] Dos personas no pueden reservar el mismo horario.
- [ ] El despacho recibe correo por cada cita y cada prospecto.
- [ ] Servicios, casos y testimonios se editan desde el panel sin tocar código.
- [ ] Las secciones sin contenido real no se muestran.
- [ ] Lighthouse móvil: rendimiento ≥ 90, accesibilidad ≥ 95, SEO ≥ 95.
- [ ] Ningún formulario se envía sin aceptar el aviso de privacidad.
- [ ] El proyecto incluye README con instalación, variables de entorno y despliegue, y pruebas del flujo de agendado.

## Prompt inicial para Codex

Pega este texto en Codex junto con el documento completo (expórtalo como Markdown y guárdalo en el repositorio como `BRIEF.md`).

```text
Visto bueno a tu plan. Cambio de modalidad: ejecuta las siete etapas de corrido, sin esperar aprobaciones intermedias, hasta dejar el proyecto completo. Guarda el brief como BRIEF.md y aplica estas actualizaciones, que prevalecen sobre el brief.

DATOS CONFIRMADOS
- Nombre: Garante Jurídico. Dominio: garantejuridico.com (registrado en Cloudflare).
- Sede: Guadalajara, Jalisco. Cobertura: toda la República Mexicana. Zona horaria: America/Mexico_City.
- Teléfono y WhatsApp: 6692122543 (tel:+526692122543 y https://wa.me/526692122543).
- Siguen pendientes: abogado titular y cédula, dirección de la oficina, horario de la línea de urgencias, honorarios, costo de la consulta y correo de contacto. Usa marcadores visibles con el formato [PENDIENTE: ...] y enuméralos todos en PENDIENTES.md.

AJUSTES AL PLAN
1. Textos: despacho con sede en Guadalajara y atención en todo el país. En urgencias por alcoholímetro usa lenguaje válido a nivel nacional («arresto por alcoholímetro», «centro de sanciones administrativas») y menciona los nombres locales («el Torito» en CDMX, «la Curva» en Guadalajara) como borrador a validar por el abogado titular.
2. Marca provisional: logotipo tipográfico «Garante Jurídico», favicon e imagen para compartir generados en código. Sin fotos de archivo ni ilustraciones de balanzas o mazos.
3. Crea la ruta /styleguide con paleta, tipografías, botones, tarjetas, formularios y barra de emergencia.
4. Guarda las fechas de las citas en UTC y muéstralas en la zona horaria de site.config.ts.
5. El panel no tiene registro público: el administrador se crea en la semilla a partir de variables de entorno.
6. Formularios de cita y contacto con límite de peticiones y Cloudflare Turnstile, validados en el servidor.
7. Verifica que btree_gist esté disponible para la restricción de exclusión y documéntalo.
8. Arquitectura de despliegue: aplicación en Vercel, PostgreSQL en Neon, dominio y DNS en Cloudflare, correo con Resend. No despliegues: deja DEPLOY.md con los pasos exactos, las variables de entorno y los registros DNS que debo crear en Cloudflare.

DEBE FUNCIONAR SIN MIS CUENTAS
- Postgres local con docker-compose y .env.example completo y comentado.
- Sin RESEND_API_KEY, los correos se escriben en la consola. Sin claves de Turnstile, usa las claves de prueba oficiales. Sin identificador de analítica, la analítica queda apagada.
- Semilla: las cinco áreas y sus servicios con contenido en borrador, disponibilidad de ejemplo de lunes a viernes de 9:00 a 18:00 y el administrador de desarrollo.
- No inventes casos, testimonios, reseñas, cifras, abogados ni cédulas. Esas secciones quedan ocultas hasta que haya contenido real.

DEFINICIÓN DE TERMINADO
- lint, verificación de tipos, pruebas y build pasan sin errores ni advertencias.
- Pruebas: unitarias de disponibilidad, una de concurrencia que demuestre que dos reservas simultáneas del mismo horario no pueden coexistir, y de extremo a extremo con Playwright para el flujo de cita, la barra de emergencia y el acceso al panel.
- Revisa todas las rutas a 375 px y a 1280 px, guarda capturas en docs/screenshots y corrige desbordes, textos cortados y contrastes insuficientes antes de terminar.
- Corre Lighthouse en / y /urgencias en modo móvil, guarda el reporte y corrige hasta alcanzar rendimiento ≥ 90, accesibilidad ≥ 95 y SEO ≥ 95.
- Un commit por etapa con mensaje claro.
- README con instalación en tres comandos, y la lista de criterios de aceptación del brief marcada punto por punto con su evidencia.

SI ALGO TE BLOQUEA
Toma la decisión más razonable, anótala en DECISIONES.md y continúa. No te detengas a preguntar salvo que la decisión implique borrar trabajo o contradiga el brief.

AL TERMINAR
Dame un reporte con: qué quedó hecho, qué quedó pendiente, qué no pudiste verificar por ti mismo (teléfonos reales, correos reales, despliegue) y los pasos exactos para que yo lo vea funcionando en mi computadora.
```

# Garante Jurídico

Sitio y sistema de captación para un despacho con sede en Guadalajara, Jalisco, y atención en toda la República Mexicana. El público puede llamar, abrir WhatsApp, consultar servicios y solicitar una cita. El despacho administra agenda, prospectos, disponibilidad y contenido desde `/admin`.

El contenido jurídico y los textos legales son **borradores para revisión del abogado titular**. Los datos por confirmar están en [PENDIENTES.md](PENDIENTES.md). No publiques el sitio antes de resolverlos.

## Instalación local en tres comandos

Requisitos: Node.js 20 o superior, npm y Docker con Compose. Desde la raíz del repositorio:

```bash
cp .env.example .env
docker compose up -d
npm install
```

Después inicia el proyecto con `npm run local:start`. Ese comando genera el cliente Prisma, aplica las migraciones, carga la semilla idempotente y arranca Next.js. Abre [http://localhost:3000](http://localhost:3000). El panel está en [http://localhost:3000/admin](http://localhost:3000/admin); usa las credenciales **solo de desarrollo** de `.env.example`. Cambia `ADMIN_PASSWORD` y `NEXTAUTH_SECRET` antes de usar datos reales. Si el puerto 3000 está ocupado, ajusta `NEXTAUTH_URL` y ejecuta `PORT=3001 npm run local:start`.

La semilla carga cinco áreas y 27 servicios del brief (el servicio familiar permanece sin publicar), cuatro guías marcadas como borrador, horarios de ejemplo de lunes a viernes de 09:00 a 18:00 y un administrador. No crea casos, testimonios, reseñas ni abogados ficticios.

## Arquitectura y configuración

- Next.js App Router, TypeScript, Tailwind CSS y componente Button compatible con shadcn/ui (`components.json` incluido).
- PostgreSQL con Prisma y migraciones SQL; Auth.js para el panel; Zod para validar en servidor.
- Cloudflare Turnstile y límite de peticiones persistido en PostgreSQL para cita y contacto.
- Resend para correo; sin clave, el mensaje aparece en la consola del servidor.
- Plausible opcional; sin identificador, no se carga.
- Vercel + Neon + Cloudflare + Resend para producción. Pasos en [DEPLOY.md](DEPLOY.md).

El archivo [src/site.config.ts](src/site.config.ts) es la fuente única del nombre, teléfono, enlaces de llamada/WhatsApp, sede, cobertura, zona horaria, horario de urgencias y marcadores pendientes. Las citas se almacenan en UTC (`TIMESTAMPTZ`) y se presentan en `America/Mexico_City`. La exclusión PostgreSQL `Appointment_no_active_overlap` evita traslapes de reservas activas incluso ante solicitudes concurrentes; requiere `btree_gist`. Consulta [DECISIONES.md](DECISIONES.md) para las decisiones de implementación.

### Variables de entorno

| Variable | Uso local y producción |
| --- | --- |
| `DATABASE_URL` | Cadena PostgreSQL; Docker local en `.env.example`, URL pooled de Neon en Vercel. |
| `NEXTAUTH_SECRET` | Secreto largo y aleatorio para sesiones. |
| `NEXTAUTH_URL` | URL pública exacta del sitio. |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Usuario creado por `db:seed`; no existe registro público. |
| `RESEND_API_KEY` | Opcional localmente; obligatorio para correo real. |
| `EMAIL_FROM` | Remitente del dominio verificado en Resend. |
| `CONTACT_EMAIL` | Buzón que recibe las citas y los prospectos. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Vacías activan las claves oficiales de prueba, incluso para un build local de producción; usa claves reales antes de desplegar. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Opcional; si está vacía, la analítica queda apagada. |

`CONTACT_EMAIL` también debe sustituirse en el marcador visible de `src/site.config.ts` cuando el despacho lo confirme. No subas `.env` a Git.

### Comandos de verificación

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm run audit:routes
```

`test:e2e` y `audit:routes` requieren el servidor y la base de datos locales activos. `audit:routes` guarda capturas de las rutas públicas y privadas en `docs/screenshots/` a 375 y 1280 px. La última auditoría cubrió 104 combinaciones sin desbordes ni texto recortado. Los reportes de Lighthouse móvil para `/` y `/urgencias` están en `docs/lighthouse/`: **97/100/100** y **98/100/100** en rendimiento/accesibilidad/SEO. El LCP de `/urgencias` fue 2.46 s en esa medición local. Las pruebas de disponibilidad y concurrencia usan PostgreSQL; esta última comprueba que solo una de dos inserciones simultáneas para el mismo horario prospera.

## Marca y alcance

La identidad aprobada se documenta en [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) y se ve en `/styleguide`. Los SVG/PNG y las aplicaciones corporativas se generan en código con `scripts/generate-brand.py` y `scripts/render-brand.mjs`. El monograma es una aproximación vectorial del raster entregado; para imprenta conviene sustituirlo por el archivo maestro del diseñador. No se usan fotos de archivo ni motivos de balanzas o mazos.

Los recordatorios mediante WhatsApp Business, pago en línea, sincronización con Google Calendar, portal del cliente y reseñas de Google integradas pertenecen a la fase 2 del brief.

## Criterios de aceptación del brief

| Criterio de fase 1 | Estado y evidencia |
| --- | --- |
| Llamar o abrir WhatsApp en máximo dos toques desde cualquier página móvil | ✅ Barra fija global en `src/components/emergency-bar.tsx`; prueba `e2e/core-flows.spec.ts`; auditoría en `docs/screenshots/`. |
| Enlaces abren el número correcto en iPhone y Android reales | ⬜ Los `href` se verifican automáticamente; falta probarlos en teléfonos reales. |
| Crear una cita completa y verla en el panel con folio | ✅ Prueba E2E de cita y panel en `e2e/core-flows.spec.ts`. |
| Dos personas no reservan el mismo horario | ✅ Restricción de exclusión en `prisma/migrations/`; prueba de concurrencia en `tests/concurrency.test.ts`. |
| El despacho recibe correo por cada cita y prospecto | ⬜ En desarrollo se registra el mensaje; falta cuenta Resend, remitente y buzón reales para probar recepción. |
| Servicios, casos y testimonios editables desde el panel | ✅ Formularios protegidos en `/admin/contenido`; acceso de administrador probado E2E. |
| Secciones sin contenido real ocultas | ✅ Semilla sin casos/testimonios; la portada los consulta solo si están publicados y consentidos. |
| Lighthouse móvil: rendimiento ≥ 90, accesibilidad ≥ 95, SEO ≥ 95 | ✅ `/`: 97/100/100; `/urgencias`: 98/100/100. Reportes JSON y HTML en `docs/lighthouse/`. |
| Ningún formulario se envía sin aceptar el aviso de privacidad | ✅ Zod valida `privacyAccepted` en servidor; los formularios incluyen casilla sin marcar y enlace al aviso. |
| README con instalación, variables, despliegue y pruebas de agendado | ✅ Este README, `DEPLOY.md`, tests unitarios, de concurrencia y Playwright. |

Los criterios que requieren dispositivos, correo o cuentas reales permanecen abiertos hasta su prueba por el despacho. La lista de verificación de publicación está en [DEPLOY.md](DEPLOY.md).

`npm audit` reportó avisos en dependencias actuales, incluidos Next.js y Prisma, al 7 de octubre de 2026. Se conservaron las versiones probadas para cerrar esta entrega; revisa y actualiza esas dependencias con pruebas completas antes de publicar. Esto se anota en [DECISIONES.md](DECISIONES.md).

# Despliegue de Garante Jurídico

Arquitectura prevista: aplicación en **Vercel**, PostgreSQL en **Neon**, dominio y DNS en **Cloudflare**, correo en **Resend**. Esta entrega no realiza el despliegue.

## 1. Datos del despacho y estado del código

El código está listo para producción en la rama `main`. Los textos jurídicos están aprobados por el abogado titular (8 de octubre de 2026) y el contacto es solo por WhatsApp al 618 282 9873, con correo contacto@garantejuridico.com.

Antes o después del primer despliegue, completa en `src/site.config.ts` los datos marcados como `[PENDIENTE: …]` (nombre y cédula del titular, dirección, horario, honorarios y costo de la consulta). Mientras falten, el sitio los oculta, así que no bloquean la publicación. La lista está en [PENDIENTES.md](PENDIENTES.md). Publica casos o testimonios solo si son reales, anonimizados y consentidos.

**Dependencias:** `npm audit --omit=dev` (lo que corre en producción) reporta 0 vulnerabilidades. Las que corrige `overrides` en `package.json` son `postcss` dentro de Next 15, `deepmerge-ts` dentro de Prisma y `postcss-nested`/`postcss-selector-parser` dentro de Tailwind 3. Al actualizar Next, Prisma o Tailwind, revisa si los `overrides` siguen haciendo falta y quítalos cuando la versión nueva ya traiga la corrección. Quedan 7 avisos solo de desarrollo, de la cadena `braces` → `micromatch` → `fast-glob`/`chokidar`, que entra por Tailwind 3 y `eslint-config-next`. No existe versión corregida de `braces`, y estas herramientas solo procesan archivos del propio repositorio al compilar; no llegan al sitio publicado. Se eliminan al migrar a Tailwind 4 y a una versión futura de `eslint-config-next`.

## Archivos de entorno (ninguno se sube a GitHub)

| Archivo | Para qué | Quién lo carga |
| --- | --- | --- |
| `.env` | Desarrollo local: base local, claves de prueba de Turnstile, sin Resend | Next.js, Prisma y las pruebas, automáticamente |
| `.env.deploy` | Producción: dirección **directa** de Neon y administrador del panel, para migraciones y semilla | Solo a propósito: `set -a; . ./.env.deploy; set +a; npx prisma migrate deploy` |
| `.env.vercel` | Exactamente las variables de Vercel (Neon **con pooling**, NextAuth, Resend, Turnstile) | Se pega en Vercel → Settings → Environment Variables |

**Nunca pongas credenciales de producción en `.env` ni en `.env.production(.local)`:** Next.js carga esos archivos automáticamente, y las pruebas locales escribirían en la base real y enviarían correos de verdad.

## 2. Crear Neon y aplicar la base de datos

1. En Neon crea un proyecto PostgreSQL y una base de datos para producción. Copia su cadena de conexión **pooled** con SSL.
2. Comprueba que la extensión requerida existe con `SELECT name, installed_version FROM pg_available_extensions WHERE name = 'btree_gist';`. Debe devolver una fila. La primera migración ejecuta `CREATE EXTENSION IF NOT EXISTS btree_gist` y agrega `Appointment_no_active_overlap`; si Neon no permite instalarla en ese proyecto, no publiques hasta usar una instancia que la permita.
3. Define temporalmente `DATABASE_URL` con la cadena de Neon en un entorno seguro y ejecuta `npm ci`, `npm run db:generate`, `npm run db:migrate` y `npm run db:seed`. Usa credenciales nuevas para `ADMIN_NAME`, `ADMIN_EMAIL` y una contraseña aleatoria larga en `ADMIN_PASSWORD` antes de la semilla. Nunca uses las credenciales de desarrollo.
4. Verifica la restricción: `SELECT extname FROM pg_extension WHERE extname='btree_gist';` y `SELECT conname FROM pg_constraint WHERE conname='Appointment_no_active_overlap';`. Ambos deben devolver una fila.

La semilla es idempotente. Repetirla actualiza el administrador configurado y el catálogo inicial; revisa cualquier edición posterior antes de ejecutarla otra vez.

## 3. Configurar Resend y Turnstile

1. Agrega `garantejuridico.com` como dominio en Resend. Resend mostrará sus **valores exactos** de SPF/DKIM y, si aplica, MX del subdominio de envío. Crea esos registros en Cloudflare como **DNS only**. No inventes valores: copia el nombre, tipo y destino que entregue Resend y espera el estado *Verified*.
2. Crea una clave API restringida de Resend. Define `RESEND_API_KEY`, `EMAIL_FROM` (por ejemplo, una cuenta bajo el dominio verificado) y `CONTACT_EMAIL` (buzón real del despacho).
3. Crea un widget de Cloudflare Turnstile para `garantejuridico.com` y `www.garantejuridico.com`. Guarda la clave pública en `NEXT_PUBLIC_TURNSTILE_SITE_KEY` y la secreta en `TURNSTILE_SECRET_KEY`. Si faltan, la aplicación usa las claves oficiales de prueba; **no despliegues públicamente con esas claves**, porque aceptan los retos de prueba sin protección real.
4. Si el despacho habilita Plausible, registra el dominio y define `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=garantejuridico.com`. Si no, deja la variable vacía.

## 4. Crear el proyecto en Vercel

1. Importa este repositorio en Vercel como proyecto Next.js. Usa `npm ci` para instalación y `npm run build` para compilación; directorio de salida predeterminado de Next.js.
2. Configura las siguientes variables en **Production** antes del primer despliegue:

   | Variable | Valor |
   | --- | --- |
   | `DATABASE_URL` | URL pooled de Neon con SSL. |
   | `NEXTAUTH_SECRET` | Secreto generado con `openssl rand -base64 32`. |
   | `NEXTAUTH_URL` | `https://garantejuridico.com`. |
   | `RESEND_API_KEY` | Clave de Resend. |
   | `EMAIL_FROM` | Remitente verificado en Resend. |
   | `CONTACT_EMAIL` | Buzón real que recibe contactos. |
   | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clave pública real del widget. |
   | `TURNSTILE_SECRET_KEY` | Clave secreta real del widget. |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `garantejuridico.com` solo si se usa Plausible. |

   `ADMIN_NAME`, `ADMIN_EMAIL` y `ADMIN_PASSWORD` se usan para la semilla desde una terminal segura; no son necesarios en Vercel después de crear el usuario. No incluyas `.env` en Git.
3. Agrega `garantejuridico.com` y `www.garantejuridico.com` en **Vercel → Project → Settings → Domains**. Elige redirección de `www` al dominio principal. Despliega cuando las variables estén listas.

## 5. Crear DNS en Cloudflare

El dominio ya está registrado en Cloudflare. En la zona DNS, elimina registros A/AAAA/CNAME que entren en conflicto para `@` o `www`. Crea:

| Tipo | Nombre | Destino | Proxy |
| --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | DNS only durante verificación. |
| CNAME | `www` | `cname.vercel-dns-0.com` | DNS only durante verificación. |
| TXT/CNAME/MX | Según el panel de Resend | Valor exacto proporcionado por Resend | DNS only. |

Vercel puede mostrar destinos particulares para el proyecto. **Si difieren, usa los valores que muestra Vercel**, no los genéricos de esta tabla. Espera la verificación del dominio y el certificado HTTPS en Vercel. Si después activas el proxy de Cloudflare, usa SSL/TLS **Full (strict)** y vuelve a comprobar redirecciones, HTTPS, Turnstile y correo.

## 6. Comprobación antes de anunciar el sitio

1. Abre `/`, `/urgencias`, `/agendar`, `/contacto`, `/styleguide` y `/admin` en móvil y escritorio. Verifica barra fija, contenido y ausencia de marcadores pendientes.
2. Prueba los enlaces de WhatsApp (618 282 9873) en iPhone y Android reales; el despacho no usa enlaces `tel:` porque solo atiende llamadas por WhatsApp. Si WhatsApp no abre el chat correcto, revisa el prefijo internacional con el despacho y ajusta **solo** `src/site.config.ts`.
3. Reserva una cita y envía un contacto de prueba con Turnstile real. Confirma folio en el panel, bloqueo de horario ocupado y recepción real de correo en el buzón del despacho y del cliente.
4. Comprueba `sitemap.xml`, `robots.txt`, Open Graph y los eventos de Plausible si se configuró.
5. Ejecuta Lighthouse móvil sobre la URL publicada y compara con `docs/lighthouse/`. La medición local no sustituye la prueba de producción.

Fuentes oficiales: [dominios en Vercel](https://vercel.com/docs/domains/set-up-custom-domain), [pruebas de Turnstile](https://developers.cloudflare.com/turnstile/troubleshooting/testing/), [Neon con Prisma](https://neon.com/blog/better-postgres-with-prisma-experience). Los valores DNS de Resend se obtienen de su panel de verificación de dominio.

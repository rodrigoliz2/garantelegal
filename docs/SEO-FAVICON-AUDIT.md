# Auditoría de favicon y SEO técnico — 12 de octubre de 2026

## Estado público antes de este cambio

- `https://garantejuridico.com/` respondía `200` y `https://www.garantejuridico.com/` redirigía con `308` al dominio sin `www`. La redirección conservaba rutas como `/servicios`. Las variantes `http://` terminaban en HTTPS.
- La portada y las rutas `/urgencias`, `/servicios` y `/servicios/administrativo` declaraban su propia URL canónica en `https://garantejuridico.com`.
- Las etiquetas `rel="icon"` apuntaban a `/brand/favicon-16.png`, `/brand/favicon-32.png` y `/brand/favicon-48.png`, todas accesibles. En cambio, `/favicon.ico` y `/favicon.png` respondían `404`. La ausencia de rutas en la raíz no demuestra por sí sola por qué Google mostró un globo: Google puede aceptar los PNG anteriores, y el resultado también depende de su siguiente rastreo.
- `robots.txt` permitía la portada y los iconos; solo excluía `/admin`, `/api` y `/styleguide`. Publicaba el sitemap canónico. `sitemap.xml` usaba URLs sin `www`.

## Corrección preparada en el repositorio

- `/favicon.png`: isotipo monocromo activo de Garante Jurídico, PNG cuadrado de 192 × 192.
- `/favicon-512.png`: el mismo isotipo, PNG cuadrado de 512 × 512.
- `/favicon.ico`: cuatro tamaños (16, 32, 48 y 256 px) para navegadores que lo solicitan por convención.
- La portada y las demás páginas declaran los tres archivos con `rel="icon"` y rutas estables; el manifest usa los PNG de 192 y 512 px. No se cambiaron la redirección, las URL canónicas, el sitemap ni las reglas de rastreo porque ya eran coherentes.
- `npm run brand:favicons` regenera los tres archivos desde el isotipo monocromo activo. `scripts/render-mono-brand.mjs` lo ejecuta al regenerar los recursos de marca.

## Verificación antes del despliegue

- `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`: correctos. `npm run test:e2e`: 4 pruebas correctas, incluida la nueva prueba de favicon y SEO.
- En el build local de producción, `/favicon.ico`, `/favicon.png` y `/favicon-512.png` responden `200` con tipos MIME de imagen correctos incluso con un agente `Googlebot-Image`. Los PNG miden exactamente 192 × 192 y 512 × 512; el ICO contiene cuatro imágenes.
- Se recorrieron las **57 URL** del sitemap local: todas respondieron `200`, declararon su propia URL canónica y enlazaron `/favicon.png` en el HTML inicial.
- El dominio público sigue sirviendo la versión anterior hasta que se despliegue este commit. No se verificó la URL canónica elegida ni el favicon actual de Google mediante Search Console, porque eso requiere acceso a la propiedad y un nuevo rastreo.

## Comprobación después del despliegue

1. Comprueba `curl -I https://garantejuridico.com/favicon.ico`, `curl -I https://garantejuridico.com/favicon.png` y `curl -I https://garantejuridico.com/favicon-512.png`: deben responder `200` con tipo de imagen.
2. Comprueba `curl -I https://www.garantejuridico.com/` y una ruta interior: deben devolver `308` hacia el mismo camino en `https://garantejuridico.com`.
3. Inspecciona el HTML de `https://garantejuridico.com/`: debe contener `rel="icon" href="/favicon.png"` y `rel="canonical" href="https://garantejuridico.com"`.
4. En Search Console, usa **Inspección de URL** para la portada canónica y solicita indexación después del despliegue. Confirma allí la canónica seleccionada por Google. La actualización del favicon puede tardar días o semanas y no está garantizada.

Referencias: [Google: favicons en resultados de búsqueda](https://developers.google.com/search/docs/appearance/favicon-in-search), [Google: señales canónicas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Google: reglas de robots.txt](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec).

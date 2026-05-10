# Auditoria SEO organica de Replaid Lab

Fecha: 2026-05-10

## Resumen ejecutivo

Replaid Lab no esta bloqueada tecnicamente para Google: produccion responde 200, `robots.txt` permite las rutas publicas, el sitemap existe y las paginas publicas tienen title, canonical, meta robots y contenido renderizado. El problema principal no parece ser "Google no puede ver la web", sino una mezcla de canonicalizacion inconsistente, dominio nuevo/sin huella visible, mucho contenido programatico y falta de senales fuertes de autoridad/originalidad.

La recomendacion es no publicar volumen nuevo en masa todavia. Primero hay que arreglar la canonicalizacion `www` vs `non-www`, confirmar Search Console, limpiar o priorizar las paginas programaticas y mejorar las paginas que Google ya podria descubrir.

## Actualizacion Search Console 2026-05-10

- Sitemap en Search Console: procesado correctamente el 2026-05-10, con 270 paginas descubiertas.
- URL Inspection de `https://www.replaidlab.com/`: no indexada como "Pagina alternativa con etiqueta canonica adecuada"; Google ve como canonica declarada `https://replaidlab.com/`.
- URL Inspection de `https://www.replaidlab.com/guides` y una guia concreta: "Google no reconoce esta URL", sin sitemap de referencia todavia en la inspeccion individual.
- Export de rendimiento ultimos 3 meses: 3 clicks, 18 impresiones, CTR 16.67%, posicion media 6.4, con datos solo visibles el 2026-05-08.
- Paginas con impresiones/clicks detectadas: `/guides/sierra-guia-video-overwatch`, `/news`, `/guides/pharah-guia-overwatch-presion-aerea`, `/guides/fundamentos-overwatch-5v5-revisar-partidas`, `/guides/symmetra-guia-video-overwatch`.
- Produccion comprobada el 2026-05-10 antes de desplegar el fix: `https://www.replaidlab.com/` responde 200, pero canonicaliza a `https://replaidlab.com`; `https://www.replaidlab.com/sitemap.xml` responde 200 con 270 URLs, todas en `https://replaidlab.com`, y 14 URLs de mapas.

Conclusion: el problema urgente no es que Google no pueda rastrear, sino que el despliegue actual manda senales canonicas contradictorias. Hay que desplegar primero el fix local de `www`, reenviar el sitemap y solicitar indexacion de una muestra prioritaria.

## Hallazgos priorizados

| Prioridad | Hallazgo | Evidencia | Accion recomendada |
| --- | --- | --- | --- |
| Critico | Canonicalizacion inconsistente entre `www` y `non-www`. | Search Console marca la home `www` como pagina alternativa porque la canonica declarada es `https://replaidlab.com/`; produccion aun sirve sitemap con URLs apex. | Desplegar el fix local que fuerza `https://www.replaidlab.com`, confirmar canonicales/sitemap en produccion, reenviar sitemap y solicitar indexacion. |
| Critico | Search Console debe validarse contra el host canonico real. | El sitio tiene verificacion Google y sitemap publico, pero no tengo acceso directo a GSC en esta sesion. | En GSC, usar propiedad de dominio o verificar ambas variantes. Tras arreglar host, reenviar sitemap final y usar URL Inspection en home, `/guides`, `/heroes/ana`, `/counters/genji`, `/team-comps/ana` y una guia. |
| Alto | Sitemap muy grande para un dominio sin autoridad. | Sitemap publico: 270 URLs; 90 guias, 52 counters, 52 team-comps, 51 heroes, 14 mapas, 3 roles, 3 experts, 3 news, home/legal. | Mantener indexadas las paginas con valor claro. Revisar/noindex temporalmente paginas programaticas sin contenido unico suficiente, sobre todo mapas y team-comps si repiten plantilla. |
| Alto | Riesgo de contenido programatico repetitivo. | Las paginas `/heroes/*`, `/counters/*` y `/team-comps/*` tienen buena estructura, pero muchas comparten plantillas y bloques similares. | Enriquecer primero 20-30 URLs prioritarias con consejos especificos, matchups reales, ejemplos de VOD, mapa/contexto y autor/revisor. |
| Alto | Las guias de video pueden canibalizarse con guias pilar del mismo heroe. | Hay slugs tipo `genji-guia-video-overwatch` y tambien guias pilar tipo `genji-guia-overwatch-dash-deflect`. | Definir una sola pagina pilar por heroe. Integrar el video dentro de la pilar o enlazar fuerte; no mantener dos paginas compitiendo por "guia de X". |
| Alto | No hay huella visible en busquedas publicas. | Busquedas `site:replaidlab.com` y consultas de marca no devolvieron resultados claros; aparecen dominios parecidos. | Priorizar indexacion manual en GSC, enlaces externos basicos y senales de marca: Discord, perfiles sociales, YouTube, comunidades y enlaces desde contenido propio. |
| Medio | `/experts` es indexable pero muy generica. | Title correcto, pero H1 `EXPERTOS` y copy corto. | Reposicionar como "coaching de Overwatch en espanol" y "review de VOD de Overwatch"; crear secciones FAQ y prueba social. |
| Medio | Performance y page experience tienen warnings. | `npm.cmd run lint` y build pasan, pero avisan de `<img>` sin `next/image`; `/guides` pesa ~314 KB HTML. | Migrar imagenes publicas a `next/image` donde aplique y revisar si `/guides` carga demasiadas cards de golpe. |
| Medio | Falta una capa fuerte de E-E-A-T. | Hay autores en datos, pero no se ve una pagina clara de autor/metodologia/editorial. | Crear pagina "Sobre Replaid Lab", perfiles de autores/expertos, metodo de revision y fecha real de actualizacion cuando el contenido cambie. |
| Bajo | Newsletter no ayuda a descubrimiento inicial en Google. | Existe plan de newsletter, pero es retencion. | Implementarla despues de arreglar indexacion y contenido pilar; usarla para recuperar usuarios, no como palanca principal de SEO. |

## Diagnostico tecnico

- `robots.txt` publico permite `/` y bloquea zonas privadas: `/admin/`, `/dashboard/`, `/expert/`, `/api/`, `/orders/`, `/profile/`.
- `robots.txt` declara `Sitemap: https://replaidlab.com/sitemap.xml`, pero produccion redirige a `https://www.replaidlab.com/sitemap.xml`.
- Muestra de URLs publicas respondio 200: home, `/guides`, `/heroes/ana`, `/counters/genji`, `/team-comps/ana`, `/experts/ivajpro-dd362ac9`.
- Muestra de URLs tiene `robots: index, follow` y canonical absoluto.
- JSON-LD aparece en HTML publico en paginas de muestra.
- `npm.cmd run lint` pasa con warnings.
- `npm.cmd run build` pasa y genera 137 paginas en build local.

## Plan de implementacion recomendado

1. Semana 1: arreglar canonical host.
   - Elegir `www` o apex como host canonico.
   - Alinear `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_URL`, canonicales, sitemap, Open Graph y Search Console.
   - Redeploy y comprobar que URL final, canonical y sitemap usan el mismo host.

2. Semana 1: Search Console.
   - Enviar sitemap final.
   - Revisar "Pages": `Indexed`, `Discovered - currently not indexed`, `Crawled - currently not indexed`, `Duplicate without user-selected canonical` y errores de sitemap.
   - Revisar "Performance > Search results" ultimos 3 meses con dimensiones Query, Page, Country y Device.
   - Exportar CSV con clicks, impressions, CTR y position para priorizar contenidos reales.

3. Semana 2: poda y priorizacion de paginas.
   - Mantener indexadas: home, `/guides`, top 20 guias, top 10 heroes, top 10 counters, `/experts`.
   - Enriquecer antes de indexar masivamente: `/team-comps/*`, `/maps/*` y heroes con poco contenido unico.
   - Fusionar o diferenciar guias duplicadas por heroe.

4. Semanas 2-4: contenido pilar.
   - Crear/mejorar 2-3 piezas por semana, no mas, con profundidad real.
   - Prioridad de clusters: "como mejorar en Overwatch", "guia de [heroe]", "counters de [heroe]", "composiciones Overwatch 5v5/6v6", "review VOD Overwatch espanol".
   - Cada pieza debe incluir: autor/revisor, fecha, para quien es, errores frecuentes, ejemplos concretos, enlaces internos y CTA suave a expertos.

5. Mes 2: autoridad externa.
   - Enlazar desde Discord, YouTube, perfiles de expertos, posts sociales y comunidades donde sea natural.
   - Conseguir 5-10 enlaces reales de baja friccion: perfiles, colaboraciones, videos, recursos de comunidad y partners.

## Paginas a crear, mejorar, fusionar o noindex

- Crear/mejorar:
  - `/guides/como-mejorar-en-overwatch`
  - `/guides/review-vod-overwatch-espanol`
  - `/guides/counters-overwatch-guia-completa`
  - `/guides/composiciones-overwatch-5v5-6v6`
  - paginas pilar para Ana, Genji, Tracer, Kiriko, Reinhardt, D.Va, Winston, Mercy, Cassidy y Zarya.
- Fusionar o diferenciar:
  - pares `*-guia-video-overwatch` vs `*-guia-overwatch-*` cuando atacan la misma intencion.
- Noindex temporal o sacar de sitemap hasta enriquecer:
  - mapas sin guias/noticias relacionadas,
  - team-comps generadas solo por plantilla,
  - heroes sin contenido unico suficiente mas alla de bloques comunes.

## Calendario editorial inicial

| Semana | Pieza | Intencion |
| --- | --- | --- |
| 1 | Como mejorar en Overwatch sin depender de mecanicas | Informacional amplia |
| 1 | Review de VOD de Overwatch: como analizar tus partidas | Informacional + conversion suave |
| 2 | Counters de Genji: que cambiar y como jugar el matchup | Long-tail concreta |
| 2 | Guia de Ana: posicionamiento, granada, sleep y Nano | Hero pilar |
| 3 | Composiciones dive, brawl y poke en 5v5 y 6v6 | Cluster de composiciones |
| 3 | Como jugar support en Overwatch: errores comunes | Rol pilar |
| 4 | Guia de Tracer: presion lateral sin morir gratis | Hero pilar |
| 4 | Mejores heroes para subir en Overwatch por rol | Meta/tier list |

## Competencia y oportunidad SERP

Las SERPs actuales para las consultas revisadas estan dominadas por Fandom, Dexerto, Dot Esports, Games.gg, Mobalytics, YouTube y herramientas especificas de counters. Replaid no aparece de forma visible en las busquedas probadas. La oportunidad real esta en espanol y en diferenciarse con experiencia aplicada: VOD review, ejemplos de errores reales, consejos de coach y decisiones por mapa/composicion. Reescribir informacion generica de habilidades no va a competir bien contra wikis grandes.

## Datos pendientes de Search Console

Exportar estos datos para cerrar la auditoria cuantitativa:

- Performance ultimos 3 meses por Query: clicks, impressions, CTR, position.
- Performance ultimos 3 meses por Page.
- Pages / Indexing: razon de no indexacion y numero de URLs por razon.
- Sitemaps: estado, fecha de lectura, discovered URLs.
- URL Inspection para home, `/guides`, una guia pilar, `/heroes/ana`, `/counters/genji`, `/team-comps/ana`.

## Fuentes usadas

- Google Search Central: Helpful content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central: Build and submit a sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google Search Central: robots.txt: https://developers.google.com/search/reference/robots_txt
- Search Console Help: performance metrics: https://support.google.com/webmasters/answer/7042828

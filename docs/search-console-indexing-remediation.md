# Plan operativo de indexacion y AdSense

Fecha: 2026-06-01

## Diagnostico

Google ha marcado Replaid Lab como sitio con contenido de poco valor para AdSense y Search Console muestra varias familias de URLs no indexadas. La causa probable es mixta:

- demasiadas paginas programaticas para la autoridad actual del dominio;
- paginas de busqueda/filtro que aparecen en informes aunque deben seguir en `noindex, follow`;
- paginas con poco contenido propio o muy dependientes de video externo;
- posibles soft 404 en rutas sin contenido real;
- necesidad de reforzar paginas de confianza, privacidad, contacto y metodologia editorial.

## Clasificacion inicial de Search Console

| Motivo | Paginas | Tratamiento |
| --- | ---: | --- |
| Pagina alternativa con canonica adecuada | 19 | Revisar si son variantes `www`, filtros o duplicados correctos. No forzar indexacion si la canonica declarada es correcta. |
| Soft 404 | 10 | Convertir rutas sin contenido real en `notFound()` o sacarlas del sitemap. |
| Excluida por `noindex` | 5 | Mantener si son filtros, busquedas internas o paginas utiles para usuario pero no para Google. |
| Duplicada sin canonica elegida | 1 | Definir canonical explicito o redirigir a la pagina pilar. |
| Descubierta sin indexar | 24 | Mejorar enlazado interno y priorizar solo paginas pilar en sitemap. |
| Rastreada sin indexar | 18 | Enriquecer contenido propio o retirar del sitemap hasta que tenga suficiente valor. |

## Cambios aplicados como base

- Se define una politica interna de calidad para decidir que entra en sitemap y que puede mostrar anuncios.
- El sitemap prioriza rutas de confianza, hubs y un conjunto inicial de heroes/counters/composiciones pilar.
- Las guias de video genericas no entran automaticamente en sitemap salvo que esten marcadas como pilar o tengan contenido propio suficiente.
- Los anuncios se bloquean en paginas no aptas y no se renderizan en produccion si no hay slot real de AdSense.
- Los mapas sin contenido publicado pasan a `notFound()` para evitar soft 404.
- Se anaden paginas de confianza: `/about`, `/privacy` y `/editorial-methodology`.
- Se anade la guia pilar `/guides/como-mejorar-en-overwatch`.

## Checklist antes de volver a solicitar AdSense

- Produccion muestra `ads.txt` con la cuenta correcta.
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` apunta a la cuenta correcta.
- `/sitemap.xml` solo lista URLs canonicas y de valor suficiente.
- `/guides?q=ana` y filtros internos siguen en `noindex, follow`.
- Al menos 15-20 paginas tienen contenido propio, navegacion clara y enlaces internos.
- Home, guias, paginas de confianza y paginas pilar no muestran placeholders de anuncios rotos.
- Search Console valida correcciones de soft 404 y canonical.

## URLs prioritarias para inspeccion manual

- `/`
- `/guides`
- `/guides/como-mejorar-en-overwatch`
- `/heroes/ana`
- `/heroes/genji`
- `/heroes/tracer`
- `/roles/tank`
- `/roles/support`
- `/counters/genji`
- `/team-comps/genji`
- `/about`
- `/privacy`
- `/editorial-methodology`

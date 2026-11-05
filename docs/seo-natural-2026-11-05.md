# Lenguaje y acceso al catálogo: 5 de noviembre de 2026

El usuario autorizó implementar mejoras de impresiones y clics, dando prioridad a un lenguaje natural y buen SEO. Trabajo manual; no ejecuta ni avanza la automatización editorial diaria.

## Selección basada en búsquedas

Exportación directa de Search Console del 5 de noviembre: **28 de octubre–3 de noviembre**, búsqueda Web basada en texto, sin filtros de país/dispositivo. Archivos originales, cruces de consultas por URL y evidencias en `reports/seo-natural-2026-11-05/` del workspace principal.

| Ficha | Impresiones | Clics | Posición |
| --- | ---: | ---: | ---: |
| Rey Rata / Rat King | 348 | 2 | 8,73 |
| Lash | 302 | 0 | 8,65 |
| Venator | 299 | 1 | 8,57 |
| Vagabundo / Drifter | 272 | 1 | 8,38 |
| Siete / Seven | 253 | 0 | 8,00 |
| D.Va | 220 | 0 | 4,19 |

Las consultas de D.Va son principalmente nombre + juego; se amplía la presentación desde «Matrix, Boosters y peel en ranked» a «habilidades y cómo jugar». El texto nuevo describe los temas existentes sin alterar hechos del personaje.

En Deadlock se conservan nombres españoles y alias ingleses. Las consultas de Rey Rata también incluyen builds: se mantiene la ficha de habilidades y se facilita el acceso a la build publicada en su propia URL. No se inventan partidas, estadísticas de eficacia, cuotas de tráfico ni fechas de parche nuevas.

## Acceso al contenido

- `/heroes`: título, explicación breve y navegación por roles antes del catálogo; las publicaciones recientes aparecen después de las fichas.
- `/counters`: explicación, acceso a Pick Lab y elección de héroe rival antes de los consejos y novedades. La selección de guías tiene nombre accesible y enlaces HTML a los destinos canónicos.
- `/heroes/dva`: título y descripción de presentación separados del objeto editorial revisado. Se preservan el fingerprint, fechas, prioridad de revisiones DB, canónica, reglas de indexación y coherencia Open Graph/Twitter.

El orden es el mismo en DOM y visualmente: sin duplicar contenido ni alterar el orden con CSS. No se añade JavaScript al catálogo. Se conservan novedades, destinos existentes y filtros `noindex`.

## Revisión editorial

Cinco fichas de Deadlock se revisan mediante candidatos y evidencia de versión exacta. Se aclaran introducciones, descripciones, preguntas prácticas y redacción de acciones concretas; se conservan las cuatro habilidades, sus IDs, iconos, nombres ingleses, imágenes, fecha original y hechos de parche. Los títulos del payload son los H1 visibles; el helper de SEO mantiene su título de ficha con nombre, juego y habilidades.

Las fuentes y sus dependencias quedan en informes internos. No se consideran dos fuentes independientes las webs que reutilizan los mismos datos. No se muestran atribuciones ni citas de datos estructurados en Deadlock. Esta revisión distingue el texto modificado del resto del contenido heredado y no afirma una recertificación completa de toda la web.

## Verificación y evaluación

Pruebas de metadatos y catálogo, compilación y navegación real en escritorio y móvil. Comprobar la elección de rol, apertura de una ficha, apertura de counters y entrada a Pick Lab, además de las vistas previas de los artículos. Tras publicar, verificar versión pública, metadatos, habilidades, FAQ, enlaces, catálogo y sitemap. Los informes registran los resultados reales.

El efecto en impresiones y clics requiere datos posteriores al rastreo, comparando ventanas completas por URL, consulta, dispositivo, país y posición. La ventana actual acaba antes de los cambios del 4 y 5 de noviembre; no demuestra su impacto.

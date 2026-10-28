# Revisión individual: Flex, counters de Moira y Reaper

Revisión del 28 de octubre de 2026, por Codex. Pertenece al objetivo de revisar los 140 artículos canónicos observados con noindex el 27 de octubre. Cada decisión corresponde a la versión completa del artículo, no al catálogo de su familia.

## Lectura y decisión por URL

| URL | Resultado de la lectura | Corrección | Versión revisada |
| --- | --- | --- | --- |
| `/roles/flex` | Explica adaptación dentro del rol, alternativas que se conocen, coordinación, coste del swap, ejemplos de mapas y comparación de peleas en VOD. Se leen introducción, tres pools, seis secciones, checklist y tres FAQ. El bloqueo era incondicional y el sitemap ni siquiera contemplaba esta ruta. | Se sustituye la referencia a cinco compañeros por «todo el grupo», válida en ambos formatos. El enlace de VOD apunta directamente a su destino canónico. Fecha de contenido actualizada al 28 de octubre por la corrección. | `41f1fa6fb679925e67f2a9dc8f5c27973ecfad3e7ac60a9691166304932a8892` |
| `/counters/moira` | Argumento propio sobre destino de Fade, presión separada, intercepción del orbe y cobertura frente a Coalescence. Se leen los cuatro matchups, cuatro ventanas, adaptaciones, errores, tres ejemplos, checklist y tres FAQ. El análisis no promete counters automáticos ni resultados de rango. | No hace falta reescribir el texto contrastado. Se conserva su fecha de contenido del 2 de octubre; la nueva revisión se registra por separado. Faltaba la habilitación individual de publicación. | `4c93354f8fe655924fc207425833081b4dc63c77a3dec79485bd498085d061cd` |
| `/counters/reaper` | Argumento propio sobre detección del flanco, salida de Wraith y defensas escalonadas frente a Blossom. Se leen todas las secciones equivalentes, incluidos los límites de Pharah, alcance, ayuda y perks opcionales. | Texto y fecha del 2 de octubre conservados tras el contraste. Faltaba la habilitación individual de publicación. | `fd28d5dabb92746683d18ffe3440b622c6ef910bfc16c9e2c2516151a32a1860` |

## Exactitud y fuentes

Las fichas oficiales se descargan completas con HTTP 200 y se lee el apartado de habilidades y perks anterior a Stadium. Las fuentes y HTML públicos quedan en el directorio ignorado `reports/indexing-review-2026-10-27/`; no contienen credenciales. Las seis fichas de este lote se obtuvieron el 27 de octubre y las notas de parches se releyeron el 28. Para Ana, Kiriko, Cassidy y Genji se reutiliza la lectura oficial del primer lote del 27 de octubre, documentada en la revisión de DPS y Support.

- [Moira](https://overwatch.blizzard.com/en-gb/heroes/moira/): daño que repone energía, invulnerabilidad sin disparo durante Fade y perks opcionales Reversal, Phantom Step y Destruction’s Divide. No se trasladan poderes de Stadium al kit normal.
- [Presentación oficial de Moira](https://overwatch.blizzard.com/en-us/news/21182078/): Coalescence atraviesa barreras. [Parche de abril de 2023](https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2023/4/): Fade durante Coalescence. Se distinguen ambos hechos de los valores numéricos antiguos, que el artículo no cita.
- [D.Va](https://overwatch.blizzard.com/en-gb/heroes/dva/): Matrix bloquea proyectiles delante de ella. La distinción entre orbe y beams del artículo concuerda con esa descripción y la descripción de Moira; se trata de una comprobación documental, no de una prueba en partida.
- [Reaper](https://overwatch.blizzard.com/en-gb/heroes/reaper/): Wraith, The Reaping, Shadow Blink, Lingering Wraith y Trigger Finger. La lista resumida de habilidades omite Dire Triggers, pero su perk lo menciona. Se contrasta la discrepancia con el [parche de abril de 2026](https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/4/), que lo incorpora al kit básico. El [parche de junio de 2026](https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/6/) vuelve a describirlo como parte del kit. Las secciones de Arcade, Community Crafted y Stadium no se usan como reglas de ranked.
- [Ashe](https://overwatch.blizzard.com/en-gb/heroes/ashe/): Coach Gun y condición de Double-Barreled. El consejo mantiene el perk como opcional.
- [Winston](https://overwatch.blizzard.com/en-gb/heroes/winston/) y [Reinhardt](https://overwatch.blizzard.com/en-gb/heroes/reinhardt/): movilidad con salto y presión cercana como ejemplos de herramientas distintas. El texto no impone composiciones universales.
- [Parche de octubre de 2026](https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/10/): se revisan las menciones de estos héroes; los cambios de hitbox y la corrección de una voz de Moira no invalidan los consejos contrastados.

Los ejemplos de Oasis, Midtown, Gibraltar y King’s Row son situaciones hipotéticas explicadas con condiciones, no partidas observadas ni afirmaciones de experiencia personal. No hay cifras de daño, recarga o duración que dependan de un parche intermedio. No se necesita fabricar una fecha de primera publicación.

## Enlaces y presentación

Antes de cambiar la publicación pasan seis casos de navegador sobre el build aislado de `0f785dc`: Flex, Moira y Reaper en escritorio y Pixel 7. Se abren las FAQ, se comprueba la concordancia con JSON-LD, enlaces internos HTTP 200, imágenes cargadas, metadatos, fechas, canonical, ausencia de overflow y anuncios. Se inspeccionan las capturas completas y las cabeceras en ambos formatos. En móvil los bloques se apilan y el texto conserva su recorrido; las capturas completas tienen escala de dispositivo, por lo que su anchura física no representa overflow CSS.

Las capturas y logs están en `reports/indexing-review-2026-10-27/release-batch-two/`. La copia parte de Git y no incluye los cambios locales ajenos de mapas, Deadlock o tsconfig. La modificación de Flex requiere una nueva ejecución sobre la versión final antes de desplegar.

## Publicación y verificación

Se habilitan solo estas tres versiones, siempre con `adsAllowed: false`. Flex pasa por la comprobación de revisión exacta y de pools, secciones, fechas y enlaces; el sitemap usa la misma decisión. Moira y Reaper entran en la lista explícita de publicación de counters y siguen exigiendo la revisión exacta del modelo. Brigitte y las demás URLs pendientes conservan sus bloqueos. No se modifica la activación de anuncios ni se envía otra solicitud a AdSense.

Validación local final correcta: lint sin errores, 702 pruebas unitarias, build de producción y ocho casos de navegador para las tres páginas y la publicación del catálogo de counters, en escritorio y móvil. Otros seis casos sobre el mismo build comprueban DPS, Support y el modo de revisión de AdSense en plantillas de ambos juegos. Los tres artículos aparecen en sitemap sin noindex; los counters conservan sus fechas y Flex muestra la corrección y fecha nuevas. Se inspecciona la captura móvil final de Flex.

Despliegue de `1ae0f46` [completado por Vercel](https://vercel.com/masiajavs-projects/peakform/Eg42yVeS1zTLNSEZ22zXnWpFkFqC) el 28 de octubre. Las ocho respuestas públicas de comprobación son válidas: tres artículos nuevos HTTP 200, sin noindex, incluidos en sitemap y con las fechas esperadas; tres controles mantienen noindex y exclusión del sitemap; DPS y Support conservan su indexación. Ninguna de estas respuestas incluye slots ni script ejecutable de anuncios.

Pasan también seis casos adicionales contra producción, tres páginas por dos dispositivos, comprobando todo el texto visible, metadatos, FAQ interactivas y estructuradas, enlaces, imágenes, fechas, canonical, sitemap, errores de consola y overflow. Evidencias ignoradas: `batch-two-production.json` y `release-batch-two/production-browser-review.log`, en el directorio de informes del objetivo. El registro queda en cinco artículos habilitados y verificados de 140; 135 pendientes.

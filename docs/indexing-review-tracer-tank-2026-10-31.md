# Revisión individual de Tracer y consolidación de Tank

Revisión por Codex el 31 de octubre de 2026. Se completa la [lectura preliminar](indexing-review-tracer-tank-preliminary-2026-10-31.md), con tres filas publicadas revalidadas antes de editar. Son dos resoluciones diferentes: publicar la versión revisada de Tracer y consolidar una nota corta de Tank en una guía completa ya revisada. El destino de Tank no recibe otra aprobación ni se cuenta como un artículo nuevo.

## Tracer

Se lee el artículo completo: preparación del lateral, elección de objetivo, atención enemiga, regreso de Recall, gasto de Blink, Pulse Bomb, capítulos del vídeo, ejercicio VOD, cuatro FAQ y enlaces. Se mantiene el enfoque de decisiones según seguimiento y cobertura. Se añaden los cuatro perks actuales y sus condiciones, sin sumar alternativas minor/major ni convertir su disponibilidad en garantía de supervivencia.

La [ficha oficial de Tracer](https://overwatch.blizzard.com/en-gb/heroes/tracer/), consultada de nuevo el 31 de octubre, confirma arma de corto alcance, Blink direccional, Recall a posición y salud anteriores y bomba adherente. Temporal Regen adelanta la regeneración pasiva; requiere una pausa de daño y no aumenta la curación del Support. Kinetic Reload recarga con impactos de melee, no por acercarse o fallarlos. Blink Packs restaura una carga al recoger un botiquín, sin recuperar todos los Blinks. Quantum Entanglement añade sobrevida y munición a Recall; no sustituye una posición segura de regreso. No se inventa la fecha en que se introdujeron estos efectos ni se aplican cifras de la grabación de 2025 al balance actual.

El [vídeo de Awkward](https://www.youtube.com/watch?v=SRGJ7xZoZZ0), oEmbed y página pública permiten comprobar título exacto «Give me 15 minutes, I will teach you how to play Tracer», fecha 1 de septiembre de 2025, 927 segundos y playability `OK`. Se lee la descripción completa. Los datos públicos de capítulos sitúan Recall en 66,799 segundos y posicionamiento en 138,319: las referencias existentes 1:06 y 2:18 corresponden a esos capítulos. Se comprueba la pista original inglesa y la selección automática de doblaje español observada. No se afirma haber visto íntegro el vídeo.

Se registra la identidad exacta de medios y se elimina la asignación redundante de rol para no ocultar cambios posteriores de la fuente. La primera publicación canónica sigue siendo el 5 de mayo de 2026; la modificación visible del texto es el 31 de octubre. El vídeo se incorpora desde su alias existente, que conserva redirección hacia el artículo.

Versión de revisión de `/guides/tracer-presion-lateral-sin-morir-gratis`: `6879a16f2e5dd7685ca48c26babeb180d2ed237d692c7d2690509eedc16bf02a`. Huella renderizada de texto, medios y metadatos: `572db566e7dd3448024e1d12fdb73c2c1ce4c30dbd2547bf590abbb03c9512b4`.

## Tank: resolución de la nota corta

Se lee íntegra `/guides/tank-crear-espacio-sin-regalar-vida`: definición breve, cuatro prioridades, preguntas de replay y nota 6v6. No desarrolla una intención distinta de `/guides/como-mejorar-como-tank-overwatch`. La guía completa ya explica destino de avance, seguimiento, recursos, cobertura, pérdidas breves de visión, peel, retirada y reloj, reparto de dos Tanks y comparación de engages, con ejemplos concretos, checklist, seis FAQ y enlaces.

La consolidación evita ampliar una nota con otra repetición del mismo artículo. Se añade una redirección permanente 308 de la nota al destino completo; la nota no se aprueba como contenido indexable ni se añade al sitemap o al catálogo. Se conserva la fila original, sin modificar la base de datos. Su versión leída es `ef04e143db6a4871ce19102c30c49cc4683e4936115d669d8bd4a267b70d5b25`.

Se lee el destino completo y se contrasta el uso condicionado de movilidad, barrera frontal y cobertura con las fichas oficiales de [Reinhardt](https://overwatch.blizzard.com/en-gb/heroes/reinhardt/) y la revisión previa de Winston y D.Va. No promete una defensa universal ni una distancia fija a Supports. Su versión estática vigente se conserva: `d72e3e7af1bab046d7e2f074ed84bd1b405e86a1c05413845411d48a31043667`. También sus fechas propias: publicación 21 de junio y modificación 18 de octubre. No se traslada la fecha de la nota al destino.

## Presentación y evidencia

La copia aislada `release-batch-forty-two` parte de `8634932`, sin cambios locales ajenos. Ocho casos iniciales verifican Tracer y su reproductor, la nota de Tank aún excluida y el contenido íntegro del destino, en móvil/escritorio. La primera ejecución detectó una expectativa de prueba incorrecta sobre el H1 de la nota: la página usa su título SEO. Corregida la expectativa, los ocho casos pasan. Se inspeccionan las páginas completas de Tank en ambos tamaños y Tracer en escritorio y cabecera móvil, sin anuncios ni desbordamientos.

Evidencia de fuentes, modelos, medios y capítulos en `reports/indexing-review-2026-10-27/batch-forty-two/`.

## Validación final local

Pasan 709 pruebas unitarias, lint y seis casos finales de navegador en móvil/escritorio. Tracer se recorre desde su alias: texto completo, cuatro FAQ y respuestas estructuradas, enlaces, vídeo exacto y botón de reproducción, idioma, contexto, fechas, canonical, robots y sitemap. La consolidación de Tank comprueba el 308 sin seguir automáticamente la respuesta, llegada al destino, todos sus párrafos, checklist y seis FAQ, enlaces, fechas intactas, sitemap y un único resultado del destino en la búsqueda. El filtro sigue excluido.

Se inspeccionan cinco capturas finales: Tracer y Tank completos en ambos tamaños y la cabecera móvil de Tracer. Jerarquía y texto legibles, sin desbordamiento ni anuncios. El rectángulo negro del vídeo en la captura completa es un artefacto de captura; la prueba comprueba por separado que el reproductor correcto y su botón están disponibles. No se afirma haber reproducido íntegro el vídeo.

La nueva prueba unitaria impide convertir la nota de Tank en artículo independiente por añadir longitud: conserva su condición de alias, sin ficha, sitemap, anuncios o aprobación estática. También verifica que la revisión existente y las fechas del destino siguen vigentes. Las pruebas de Tracer invalidan cambios posteriores de medios, rol, etiquetas o cuerpo.

Hay dos artículos revisados en este lote, pero solo uno se habilita como artículo; la nota de Tank se resuelve por consolidación, sin volver a contar el destino existente.

## Publicación comprobada

El commit `359ce9c226ac355873a64fdd09e94939b41247e2` tiene [despliegue Vercel correcto](https://vercel.com/masiajavs-projects/peakform/4hcK7S1AmC56XMYf7CTHsqGyzmKk). Pasan 102 comprobaciones HTTP: Tracer, los 97 artículos anteriores y cuatro controles excluidos. Se verifica además el alias 308 de Tracer y la consolidación 308 de Tank con respuesta 200 del destino. Tracer permite indexación, está en sitemap y conserva primera publicación e identidad del vídeo. Tank conserva canonical, revisión, fechas y seis FAQ del destino; la nota queda fuera del sitemap.

Pasan otros cuatro casos de navegador en producción, dos por resolución, en móvil y escritorio. Incluyen texto completo, FAQ, enlaces, vídeo de Tracer y botón, fechas, metadatos, sitemap, catálogo sin duplicado de Tank y ausencia de slots o ejecución de anuncios.

El inventario inicial queda con 99 de 140 artículos revisados y resueltos: 98 habilitados y verificados públicamente, uno consolidado y verificado, y 41 pendientes. La nota consolidada conserva su entrada y motivo en el registro; no desaparece del alcance ni se convierte en una aprobación de su texto. La conciliación final del inventario actual de ambos juegos sigue pendiente.

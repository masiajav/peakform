# Revisión individual de artículos excluidos de Google

Objetivo activo: leer y verificar cada artículo público actualmente excluido por `noindex`, corregir lo necesario, registrar la revisión de su versión y habilitar su indexación solo cuando esté preparado. La incorporación al índice de Google es posterior y no determina la finalización técnica.

Estado comprobado al 28 de octubre: **24 de 140 artículos revisados, habilitados y verificados en producción; 116 pendientes**. Último lote completado: Mei. Siguiente revisión en curso: Sojourn. Los anuncios mantienen su configuración previa.

## Inventario y alcance

El diagnóstico del 27 de octubre consultó el contenido publicado actual de la base de datos y comprobó 499 rutas, uniendo el inventario previo con las URLs actuales de guías y artículos editoriales de ambos juegos. No se detectaron errores de inspección.

- 140 artículos canónicos con `noindex`, todos de Overwatch en esta observación.
- 70 filtros, 6 perfiles y el índice del archivo de parches: se mantienen excluidos y no se consideran artículos pendientes de revisión.
- 36 redirecciones comprobadas; 19 terminaban en destinos con `noindex`. Se revisa el destino canónico una vez, sin tratar cada alias como otro artículo.
- 246 rutas ya indexables, incluidos los artículos publicados de Deadlock comprobados. No se les concede una nueva aprobación solo por aparecer en este inventario.

El [registro por URL](indexing-review-ledger-2026-10-27.json) conserva el estado observado, la huella de la respuesta pública, la versión del modelo, el motivo del bloqueo, la evidencia de revisión y la comprobación pública posterior. Los estados pendientes no son aprobaciones editoriales. Los modelos de mapas que tienen cambios locales ajenos a este lote deberán contrastarse con la versión desplegada antes de revisar o publicar esos cambios.

## Primeras revisiones

Se releen y contrastan individualmente las guías existentes de DPS y Support. Su texto ya contenía decisiones y ejemplos útiles; una regla de publicación las mantenía incondicionalmente fuera del sitemap. Se registra la revisión exacta de esas dos versiones y se habilita su indexación sin activar anuncios. La revisión incluye fuentes primarias, enlaces, fechas, FAQ estructuradas, presentación móvil/escritorio y los recorridos existentes hacia expertos y el cuaderno de VOD.

Evidencia: [revisión de DPS y Support](indexing-review-dps-support-2026-10-27.md).

El resto de artículos sigue pendiente de su propia lectura y comprobaciones. No se han aprobado en bloque ni se ha sustituido el trabajo editorial por una comprobación de longitud. El objetivo global sigue activo.

## Resultado publicado del primer lote

Las dos guías están desplegadas y comprobadas en producción: HTTP 200, sin noindex, incluidas en sitemap, mismas fechas del contenido y anuncios bloqueados. Pasan lint, 700 pruebas unitarias, 18 comprobaciones locales de navegador y cuatro comprobaciones adicionales contra producción en móvil y escritorio. El registro queda en **2 artículos habilitados y verificados de 140; 138 pendientes**.

Prioridad fijada tras el primer lote: releer y verificar `/roles/flex`, `/counters/moira` y `/counters/reaper`, que conservan revisiones históricas pero tienen un bloqueo explícito de publicación. Su revisión antigua por sí sola no autoriza habilitarlos ahora.

## Segundo lote: 28 de octubre

Se leen y verifican individualmente Flex, counters de Moira y counters de Reaper. Flex corrige una referencia al número de compañeros y enlaza directamente la guía canónica de VOD. Los dos counters mantienen su contenido y fechas después de contrastar las habilidades y los perks con fuentes oficiales. Se elimina el bloqueo incondicional de Flex mediante una decisión que exige su revisión exacta; solo Moira y Reaper se añaden a la lista explícita de publicación de counters.

Evidencia: [revisión de Flex, Moira y Reaper](indexing-review-flex-moira-reaper-2026-10-28.md). Lint, 702 pruebas unitarias, build y 14 comprobaciones finales de navegador correctos, además de seis casos previos sobre las versiones aún excluidas. Se conserva el estado de los anuncios y de las demás URLs pendientes.

Despliegue y comprobación pública terminados para las tres páginas. Vercel confirma el commit `1ae0f46`; las ocho respuestas HTTP de verificación son correctas y pasan otros seis casos de navegador contra producción. Estado: **5 artículos revisados, habilitados y verificados públicamente de 140; 135 pendientes**.

La lectura inicial de las guías de Moira y Reaper detectó que había que comprobar también su integración de vídeo. En Moira, la página incorpora el vídeo de su alias mediante `mergeReviewedGuideVideo`, aunque el modelo inicial de la guía canónica no lo incluía. Ese trabajo continúa en el siguiente lote. El objetivo global sigue activo.

## Tercer lote: guías y composiciones de Moira y Reaper

Se completa la revisión de las cuatro URLs, incluidos texto, fuentes, equipos, vídeos, enlaces y presentación. Las guías añaden contexto sobre sus vídeos de 2025 y preservan autoría y fecha de la fuente; las composiciones mantienen su contenido y fechas. Las nuevas revisiones vinculan también los metadatos y el vídeo realmente incorporado a la versión revisada. Se corrigen el modelo del diagnóstico y la combinación del sitemap para que evalúen el mismo resultado que la página.

Evidencia: [guías y composiciones de Moira y Reaper](indexing-review-moira-reaper-guides-comps-2026-10-28.md). Pasan lint, 704 pruebas unitarias, build y 22 casos finales de navegador, además de ocho casos previos sobre las páginas aún excluidas. Los anuncios no cambian.

Despliegue `0e0a134` completado y verificado. Las doce respuestas públicas y el alias 308 son correctos, y pasan otros ocho casos de navegador contra producción. Estado: **9 artículos revisados, habilitados y verificados públicamente de 140; 131 pendientes**.

El siguiente trabajo iniciado fue la lectura completa de counter, guía y composiciones de Brigitte. Sus tres versiones y la comprobación inicial de la ficha oficial quedaron anotadas para continuar en el lote siguiente.

## Cuarto lote: Brigitte

Se completa la revisión individual de guía, counter y composiciones. El counter precisa los efectos de Inspiring Strike sin insinuar una reducción de recarga de Bash. La guía conserva el vídeo de JeffyJA y añade su contexto de 2025; la revisión vincula los metadatos y medios incorporados. Las composiciones conservan contenido y fecha tras comprobar equipos, decisiones y fuentes.

Evidencia: [revisión de Brigitte](indexing-review-brigitte-2026-10-28.md). Pasan lint, 704 pruebas unitarias, build y 16 casos finales de navegador, además de seis casos previos sobre las páginas aún excluidas. Los controles negativos se conservan en otras URLs pendientes y no cambia la activación de anuncios.

Despliegue `e3bfce0` completado y comprobado: dieciséis respuestas públicas y el alias 308 correctos, más seis casos de navegador contra producción. Estado: **12 artículos revisados, habilitados y verificados públicamente de 140; 128 pendientes**.

La siguiente revisión iniciada fue la lectura completa del counter, guía canónica y composiciones de Echo. Se comprobaron sus versiones y habilidades actuales para continuar en el lote siguiente.

## Quinto lote: Echo

Se completa la revisión individual de los tres artículos. La guía conserva el vídeo de Samito, comprueba su identidad y fecha del 1 de marzo de 2026 y añade contexto visible. El counter enlaza directamente a la guía canónica; su texto y fecha se mantienen, igual que en las composiciones. Se vincula la aprobación a las versiones y medios exactos, sin extenderla a otros artículos.

Evidencia: [revisión de Echo](indexing-review-echo-2026-10-28.md). Pasan lint, 704 pruebas unitarias, build y 16 casos finales de navegador, además de seis casos previos sobre las páginas aún excluidas. No cambia la activación de anuncios.

Despliegue `1dcdc7e` completado y comprobado: diecinueve respuestas públicas y el alias 308 correctos, más seis casos de navegador contra producción. Estado: **15 artículos revisados, habilitados y verificados públicamente de 140; 125 pendientes**.

Siguiente revisión iniciada: guía, counter y composiciones de Ashe. Se leen completos y sus versiones actuales coinciden con las del inventario. La ficha oficial y su atributo de tooltip confirman que los críticos de Sharpshooter reducen recargas de movilidad. Antes de aprobar, se precisarán la disponibilidad de Boosters de D.Va, la explicación de Coach Gun y la expresión «fuera de cooldown». Quedan pendientes vídeo incorporado, demás fuentes, enlaces y presentación final. Estas lecturas se anotan sin conceder aprobación. El objetivo global sigue activo.

## Sexto lote: Ashe

Se completa la revisión individual de guía, counter y composiciones. El counter corrige Boosters de D.Va y precisa Double-Barreled y Sharpshooter. La guía aclara la disponibilidad de Coach Gun y contextualiza el vídeo de qrxu del 28 de diciembre de 2025, con sus medios y metadatos exactos. Las composiciones conservan contenido y fecha tras contrastar los equipos y decisiones.

Evidencia: [revisión de Ashe](indexing-review-ashe-2026-10-28.md). Pasan lint, 704 pruebas unitarias, build y 16 casos finales de navegador, además de seis casos previos sobre las versiones aún excluidas. Se mantienen controles negativos en otros artículos pendientes y la activación de anuncios no cambia. Estado provisional: **18 artículos revisados de 140; 15 ya publicados y verificados; 3 pendientes de comprobar en producción; 122 pendientes de revisión**.

Despliegue `2597502` terminado y comprobado: veintidós respuestas públicas y el alias 308 correctos, más seis casos de navegador contra producción. Estado: **18 artículos revisados, habilitados y verificados públicamente de 140; 122 pendientes**.

La siguiente revisión iniciada incluye counter, guía y composiciones de Hanzo. Se leen completos y se comprueban sus versiones actuales. La ficha oficial confirma rebote base de Storm Arrows, Scatter Arrows y Frost Arrow opcionales, y Sharpshooter con críticos. YouTube y oEmbed confirman la identidad, disponibilidad, título y fecha del vídeo de Kajor; se leen descripción y capítulos. La guía debe precisar el rebote y contextualizar su material de 2025 antes de aprobarse. Las lecturas quedan registradas sin habilitar ninguna de las tres URLs. El objetivo global sigue activo.

## Séptimo lote: Hanzo

Se completa la revisión individual de las tres páginas. La guía precisa el rebote base y los perks y contextualiza el vídeo de Kajor del 14 de diciembre de 2025. La captura y las pruebas específicas detectan que el reproductor incrustado falla en móvil y escritorio pese a que la página original está disponible. Se conserva esa fuente como referencia externa con título, autor e idioma, sin iframe fallido ni anuncio de vídeo incrustado en datos estructurados. Counter y composiciones conservan texto y fechas tras contrastar las decisiones y fuentes.

Evidencia: [revisión de Hanzo](indexing-review-hanzo-2026-10-28.md). Pasan lint, 704 pruebas unitarias, build y 16 casos finales de navegador. También pasan seis casos iniciales y otros seis sobre la presentación corregida aún sin publicar. Las tres aprobaciones están vinculadas a su versión exacta; otros artículos pendientes siguen excluidos y los anuncios no cambian. Estado provisional: **21 artículos revisados de 140; 18 ya publicados y verificados; 3 pendientes de comprobar en producción; 119 pendientes de revisión**.

Despliegue `48e8983` terminado y comprobado: veinticinco respuestas públicas correctas, regresión del alias 308 de Ashe y otros seis casos de navegador contra producción. Estado: **21 artículos revisados, habilitados y verificados públicamente de 140; 119 pendientes**.

La siguiente revisión iniciada incluye guía, counter y composiciones de Mei. Se leen completos y sus versiones actuales coinciden con el inventario; la fila pública de la guía coincide íntegramente con el modelo leído. La ficha oficial confirma spray básico que ralentiza, Deep Freeze y Cryo-Storm como perks opcionales. El counter debe advertir del daño alrededor de Cryo cuando se elige Cryo-Storm. YouTube y oEmbed confirman título, qrxu y fecha del vídeo del 2 de marzo de 2026; se leen descripción y capítulos. Pasan ocho comprobaciones iniciales en la copia aislada, incluidas reproducción visible en ambos dispositivos y las tres páginas aún excluidas. Falta la corrección, contexto, revisión final de versiones y publicación. No se conceden aprobaciones a Mei y el objetivo global sigue activo.

## Octavo lote: Mei

Se completa la revisión individual de las tres páginas. El counter precisa que Cryo protege a Mei y advierte del daño cercano de Cryo-Storm como perk opcional. La guía contextualiza la serie de qrxu del 2 de marzo de 2026 y vincula sus medios y metadatos reales a la revisión. Las composiciones conservan texto y fecha después del contraste.

Evidencia: [revisión de Mei](indexing-review-mei-2026-10-28.md). Pasan lint, 704 pruebas unitarias, build y 16 casos finales de navegador, además de ocho iniciales. Se mantienen las exclusiones de otros artículos pendientes y la activación de anuncios no cambia. Estado provisional: **24 artículos revisados de 140; 21 ya publicados y verificados; 3 pendientes de comprobar en producción; 116 pendientes de revisión**.

Despliegue `77f298c` terminado y comprobado: veintiocho respuestas públicas correctas, regresión del alias 308 de Ashe y otros seis casos de navegador contra producción. Estado: **24 artículos revisados, habilitados y verificados públicamente de 140; 116 pendientes**.

Siguiente revisión iniciada: guía, counter y composiciones de Sojourn. Se leen completos y sus versiones actuales coinciden con el inventario. La fuente oficial confirma Disruptor sin slow base, Deceleration Field y las alternativas de movilidad. Se comprueban las dos filas públicas que se combinan en la guía, el vídeo de LeonDrummer del 12 de octubre de 2022 y su descripción. El título almacenado difiere del real («Guía básica: Sojourn | Overwatch 2»): falta corregirlo y contextualizar esta fuente antigua. Pasan ocho casos iniciales sobre las páginas aún excluidas y la disponibilidad visible del reproductor en ambos dispositivos. No se conceden aprobaciones a Sojourn; faltan correcciones, versión final y publicación. El objetivo global sigue activo.

## Noveno lote: Sojourn

Se completa la revisión individual de las tres páginas. La guía corrige el título de LeonDrummer únicamente para el vídeo y transcripción comprobados, preservando la entrada original. Contextualiza el vídeo del 12 de octubre de 2022 como material histórico y aclara el Disruptor actual. Counter y composiciones conservan texto y fechas tras el contraste. Las tres revisiones incluyen la versión exacta y la guía vincula sus medios renderizados.

Evidencia: [revisión de Sojourn](indexing-review-sojourn-2026-10-28.md). Pasan lint, 705 pruebas unitarias, build y 18 casos finales de navegador, además de ocho iniciales. La prueba de filtros comprueba las publicaciones canónicas individuales y mantiene excluidos alias y filtros. Los anuncios no cambian. Estado provisional: **27 artículos revisados de 140; 24 ya publicados y verificados; 3 pendientes de comprobar en producción; 113 pendientes de revisión**.

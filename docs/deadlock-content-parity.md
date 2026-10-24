# Paridad editorial: Deadlock y Overwatch

Objetivo: que Deadlock tenga una biblioteca y profundidad comparables a las páginas de Overwatch, manteniendo sus mecánicas propias. No se considera terminada por tener los mismos nombres de secciones ni por pasar un test de longitud.

## Estado inicial comprobado

El 23 de octubre había 25 artículos publicados: seis fichas de héroes, seis counters, seis builds, cuatro fundamentos, dos noticias y un parche. Las secciones de desarrollo tenían entre 140 y 260 palabras por artículo: son una primera introducción, no equivalen todavía a las guías de Overwatch. El catálogo mostraba 42 héroes, pero solo seis tenían guía.

## Requisitos de cierre

- Cobertura de los héroes jugables confirmados en el cliente y en los anuncios de Valve, con guía, counters y build propios. Resolver las discrepancias de catálogo antes de afirmar que está completo.
- Fichas con habilidades y decisiones de uso, línea, media partida, pelea de equipo, errores, escenarios de práctica y preguntas frecuentes.
- Counters con amenazas identificadas, ventanas de respuesta, alternativas mediante objetos, límites de cada respuesta y ejemplos de decisiones. No confundir una habilidad útil con un counter garantizado ni usar porcentajes inventados.
- Builds con objetos identificados y efectos verificados, prioridades por fase y alternativas según daño, control, curación y movilidad enemigos. No llamar build completa a una lista de categorías sin compras concretas.
- Biblioteca de fundamentos comparable: economía, líneas, movimiento, compras, daño y resistencias, objetivos y rotaciones, coordinación, selección de héroes y revisión de partidas.
- Estrategia de mapa y sinergias/composiciones adaptadas a Deadlock, sin copiar la clasificación de roles o la estructura de mapas de Overwatch.
- Noticias y parches con fechas y fuentes oficiales, diferenciando historia, lanzamiento y balance vigente.
- Navegación, búsqueda por nombres localizados y alias, enlaces relacionados, imágenes útiles y fuentes visibles.
- Versiones publicadas comprobadas en producción, con revisión de fuentes, comprobaciones móvil/escritorio y sitemap coherente. No dar aprobaciones a partir de slugs o métricas de cantidad.

## Primera ampliación

Preparadas y comprobadas las 25 revisiones: las seis fichas desarrollan las cuatro habilidades y decisiones de línea/equipo; los seis counters añaden matchups y objetos con límites; las seis builds identifican compras y precios actuales; los cuatro fundamentos añaden situaciones y preguntas frecuentes. Eliminadas las explicaciones del proceso editorial dentro del contenido. Las vistas previas pasan en 1440 y 390 píxeles; las tablas conservan su desplazamiento dentro del artículo y las preguntas se abren correctamente.

El catálogo se corrige a 44 héroes seleccionables y no deshabilitados. Baba y Violeta figuran todavía con una marca interna de desarrollo en los assets, pero son seleccionables y sus lanzamientos están confirmados en los anuncios de Valve del 6 y 16 de octubre. No se excluyen por esa marca. Los nombres sin ficha publicada participan en la búsqueda, sin enlaces a páginas inexistentes.

Las 25 revisiones están publicadas en producción. También se han comprobado y publicado seis guías nuevas de compras, daño/resistencias, sinergias, elección de héroe, revisión de partidas y lectura del mapa. La biblioteca suma 31 artículos y 10 fundamentos. Pasan los diez recorridos de navegador de producción (cinco en escritorio y cinco en móvil), además de las comprobaciones individuales de las 31 vistas previas. Las doce pruebas unitarias relevantes, lint y build pasan.

Se ha añadido y publicado el conjunto completo de Mo y Krill: ficha, counters y build. La biblioteca suma ahora 34 artículos, con siete conjuntos de héroe. Se han verificado las 34 versiones públicas exactas y el recorrido de búsqueda por alias → ficha → counters/build en móvil y escritorio. Dos pruebas adicionales protegen los enlaces de descubrimiento durante una publicación parcial y las rutas de composiciones de Overwatch. Las 14 pruebas unitarias relevantes pasan. Se corrige también el nombre de Piedra de Teletransporte en el párrafo de su build, conservando la fecha original de publicación.

Quedan pendientes las fichas, counters y builds de los otros 37 héroes, con las fuentes y los límites de sus interacciones. El siguiente grupo investigado incluye Kelvin, Bebop, Hiedra, Guardia y Viscoso; todavía no se han creado sus páginas públicas. Sus retratos ya están disponibles en `public/deadlock/`, con procedencia registrada en `content/deadlock/assets-batch-2.json`. Esta ampliación por sí sola no cierra la paridad.

Para continuar: usar los assets de `reports/deadlock-parity/sources`, recuperar la versión publicada antes de modificar páginas existentes, redactar conjuntos propios como `content/deadlock/mo-krill-depth.mjs`, preparar con `scripts/prepare-deadlock-hero.mjs`, comprobar con `scripts/editorial-batch.mjs` y publicar con base de producción. Las propuestas, evidencias y capturas de esta ampliación están en `reports/deadlock-parity/`. No volver a ejecutar generadores sobre páginas ya publicadas sin conservar las fechas y las actualizaciones de la base de datos. El mantenimiento diario sigue su runbook y no debe importar automáticamente estos lotes de desarrollo.

## Segundo grupo de héroes

Publicadas las quince páginas de Kelvin, Bebop, Hiedra, Guardia y Viscoso. Cada conjunto desarrolla habilidades, decisiones de línea y equipo, una secuencia de práctica, preguntas frecuentes, tres matchups con límites y una ruta de nueve compras con costes actuales. No se copian estadísticas ni se confunde una respuesta disponible con un resultado garantizado. El catálogo editorial suma **49 páginas: 12 fichas, 12 counters, 12 builds, 10 fundamentos, dos noticias y un parche**.

Evidencia de publicación: `reports/deadlock-parity/batch-3/manifest.candidates.json` y `inspection-public/result.json`; las quince versiones exactas se han comprobado en escritorio y móvil, incluidas imágenes, tablas, preguntas desplegables, ausencia de texto del proceso editorial y presencia en sus índices y sitemap. El snapshot publicado está en `reports/deadlock-parity/after-batch-3.json`. Una interrupción del proceso local de publicación se resolvió consultando primero la base de datos y reanudando con las mismas versiones; la publicación idempotente mantuvo las ya publicadas.

La portada mantiene una selección de seis héroes con retratos y un enlace al catálogo, añade tres accesos a fundamentos y ordena las noticias por fecha. Se evita que el crecimiento del catálogo entierre las noticias bajo todas las fichas. La verificación local pasa 22 recorridos de navegador en dos tamaños, las 14 pruebas unitarias relevantes, lint y build.

Se han descargado y verificado los retratos de los 44 héroes seleccionables y no deshabilitados, con ID, URL y SHA en `content/deadlock/catalog-assets.json`. Los retratos no crean páginas ni enlaces de descubrimiento por sí solos.

**Pendiente:** conjuntos editoriales de los otros 32 héroes y auditoría final de profundidad, cobertura, navegación y presentación. Próximo grupo recomendado: Vindicta, Lady Geist, Wraith, McGinnis y Paradoja (IDs 3, 4, 7, 8 y 10). Todos los datos de habilidades en ambos idiomas están en el snapshot actual; contrastar las guías y las compras antes de redactar. La paridad sigue abierta.

## Imagen y tono natural · 24 de octubre

La ampliación visual utiliza retratos grandes en las fichas, tarjetas de las cuatro habilidades y sus iconos reales, retratos en el catálogo, e iconos de héroes y objetos en los matchups y compras. En móvil, las tablas de Deadlock se leen como tarjetas con etiquetas y precio visible. Se conserva la semántica de tabla, el acceso por teclado y el texto de cada celda.

Los 176 iconos de habilidades y 173 de objetos proceden de los assets del cliente: `content/deadlock/ability-item-assets.json` registra identidad, URL y SHA; `src/lib/deadlock-media.json` publica el registro local. La versión de medios cubre nombres, ID y bytes y aparece en `data-media-version`. Las fichas pueden guardar sus cuatro `abilities` dentro de la revisión de Supabase; cambiar un nombre o un icono exige otra comprobación de la versión exacta. El validador impide usar iconos de otro héroe o alterar el orden de las cuatro posiciones.

Preparadas y comprobadas las introducciones y consejos iniciales de las doce fichas con frases más directas y acciones concretas. Se conservan fechas originales y el resto del contenido. Las noticias de Violeta y Enfermera Harrow incorporan su retrato. Propuestas y evidencias: `reports/deadlock-parity/visual-refresh/` y `visual-news/`.

La comprobación local pasa las 19 pruebas unitarias relevantes, 28 recorridos de navegador entre móvil y escritorio, lint y build. Las capturas de habilidades y de compras muestran la carga de las imágenes y sus vínculos a la explicación; muestras en `reports/deadlock-parity/visual-layout/`. La cuenta editorial sigue en 49 páginas y la cobertura pendiente continúa siendo de 32 héroes. Este cambio visual no cierra la paridad.

## Límites

Pick Lab, overlays y coaching siguen fuera de esta ampliación editorial. Las fuentes públicas alimentan una síntesis original; no se copian ni traducen artículos o vídeos completos. El código y los cambios de mapas que ya estaban en curso quedan separados de este trabajo.

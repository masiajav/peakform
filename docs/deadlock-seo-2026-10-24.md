# Deadlock: SEO, lenguaje y diseño

## Punto de partida

El snapshot de Supabase del 24 de octubre contiene 146 páginas publicadas: 44 fichas, 44 counters, 44 builds, diez fundamentos, dos noticias, un parche y un mapa. En 136 títulos visibles no aparecía el nombre del juego y 36 descripciones tenían menos de 80 caracteres. La brevedad no es un fallo por sí misma; varios casos eran eslóganes que no explicaban el contenido. Las URLs y las fechas originales se conservan.

La auditoría de lenguaje localizó 99 campos con «continuación» y 109 con «disponibilidad». Se revisó el contexto: un reinicio de habilidades, una carga adicional, una mejora de objeto y el ataque de un aliado necesitan explicaciones distintas. No se sustituye una palabra a ciegas ni se inventan estadísticas, experiencia personal o una tier list. Se revisaron las 146 páginas; las dos noticias ya tenían un texto claro y conservaron sus versiones.

## Cambios de aplicación

- Portada con búsqueda por héroe, imágenes reales y accesos directos a las siete secciones. Se mantiene la tipografía Bebas Neue/DM Sans, la cuadrícula, las tarjetas rectas y la navegación de Overwatch. El acento verde identifica Deadlock; sus estilos están limitados a esta sección.
- Catálogo visual ordenado por nombre, con alias ingleses y enlaces únicamente a fichas publicadas. Los índices de builds y counters utilizan tarjetas compactas. Las búsquedas aceptan nombres localizados, alias y parámetros repetidos sin producir un error.
- Metadatos específicos para ficha, counter, build, fundamento, mapa, noticia y parche. El título de las fichas incluye el juego y el alias inglés; las builds indican su código y las compras en la descripción. No se añaden palabras clave repetidas ni promesas de «mejor build» sin datos.
- Las variantes `?q=` tienen `noindex, follow` para robots y Googlebot, con canonical a la sección limpia. Los índices y artículos siguen siendo indexables y permiten imágenes de vista previa grandes.
- `BreadcrumbList` representa la ruta real. `CollectionPage`/`ItemList` contienen las páginas publicadas que aparecen en cada índice y en el mismo orden. El schema de artículo conserva fechas reales y referencias, y añade su página principal e imagen; las builds siguen sin publicar referencias de webs externas.
- El sitemap fecha las landings de Deadlock a partir de la última actualización publicada de su sección. No usa la hora de cada petición como falsa fecha de actualización. Las rutas y reglas de Overwatch se conservan.
- Imagen de compartir PNG de 1200 × 630, con marca y retratos del juego. Se genera con `scripts/generate-deadlock-social.mjs` a partir de los recursos ya registrados; no requiere un servicio de imágenes ni llamadas de IA.
- La portada compartida nombra directamente ambos juegos y sus contenidos. Las dos tarjetas mantienen sus botones alineados. El pie explica qué ofrece Replaid Lab sin eslóganes de proceso. La marca conserva su naranja también dentro de Deadlock.

## Revisión de textos

`content/deadlock/spanish-copy.mjs` contiene los cambios revisables. La preparación parte del snapshot publicado, no de los antiguos ficheros generados. Los títulos de héroes nombran sus habilidades o mecánicas; las builds explican su enfoque y conservan el código comunitario. Los fundamentos pasan a decir qué enseñan: conseguir almas, usar el aguante, elegir objetos o revisar una partida. Los enlaces relacionados de builds y counters llevan a compras, defensas y movimiento.

Se publicaron 144 revisiones mediante el CLI editorial y Supabase. El control final compara sus versiones exactas con los candidatos comprobados y conserva rutas, slugs, fechas originales, identidad de habilidades, imágenes y coordenadas del mapa. En 143 revisiones se conserva también la secuencia de cifras de mecánicas y precios de las secciones. La nota oficial del 14 de octubre es la excepción documentada: añade comparativas verificadas y alias de búsqueda. El runbook diario incorpora la misma pauta de lenguaje para no recuperar los eslóganes anteriores.

Los 44 códigos se consultaron con `force_refetch=true`: mismo héroe y compras principales, con versión y hora de comprobación guardadas. Durante la publicación avanzaron las versiones comunitarias de Violeta (19 → 20), Sinclair (8 → 9) y Apolo (4 → 5). Se consultaron las respuestas completas otra vez, se comprobaron sus compras activas y se repitió el circuito de revisión, vista previa y publicación. No se mantuvo una comprobación antigua como si correspondiera a la versión nueva. Las 25 páginas del respaldo local se sincronizaron con los payloads y las evidencias automatizadas reales ya publicados, conservando sus fechas.

Los cuerpos de los diez fundamentos se leyeron completos. `content/deadlock/fundamentals-copy.mjs` cambia los encabezados y los párrafos que seguían siendo abstractos, conservando tablas, ejemplos posteriores y las cifras del cálculo de resistencias. Los consejos nombran la acción: comprar antes de pelear, guardar un impulso, mirar el registro de daño o elegir una jugada para revisar.

Siete revisiones sustituyen citas de la wiki que agotaban el tiempo de conexión. Se consultaron los textos y datos del cliente en el commit `17462b250a0ca80e7f80102f2c83cc3eecff5f12` de SteamDB: la localización contiene la descripción de Rasgar de Mina y las mejoras de Participación del Público de Sinclair. Para el mapa se leyeron también los capítulos accesibles de estructuras, Midboss, campamentos, transportes y grieta de Deadlock Handbook. No se adoptaron sus recuentos contradictorios ni los valores de fábrica antiguos del Rejuvenecedor. `source-corrections.json` registra las sustituciones; las fuentes originales siguen en el historial publicado. Las siete versiones nuevas superaron el mismo comprobador de enlaces, sin excepciones para evitar sus controles.

`content/deadlock/patch-14-october-copy.mjs` sustituye el resumen vago del parche por una explicación breve y dos tablas de cambios. Se leyó el anuncio completo devuelto por la API oficial Steam News, con identificador `1846651706676198`, y se siguió su redirección al [anuncio oficial del 14 de octubre](https://steamcommunity.com/games/1422450/announcements/detail/669505296465396214). Se verificaron las cifras y los nombres localizados, incluido Andanada de Strix. Se conserva la fecha de publicación real del 15 de octubre y no se presenta esa nota como el parche más reciente ni como una transcripción completa. Los cambios no documentados del 21 y 22 siguen aplazados: esta revisión no sustituye sus fuentes originales inaccesibles por inferencias.

La auditoría pública detectó un último encabezado abstracto en la tabla de counters de Hiedra. Se cambió «Ventana útil» por «Cuándo actuar», manteniendo sus celdas. Esa revisión volvió a pasar comprobaciones, vista previa y publicación antes de cerrar la auditoría.

## Verificación

La aplicación está desplegada en `148b4d7`, `275448d`, `97e7d98` y `17ed60b`; este último tiene estado de despliegue Vercel `success`. Pasan lint, compilación y las 68 pruebas unitarias relevantes. El test de mapa eliminó las habilidades de héroe que heredaba su fixture al tomar el nuevo respaldo; el validador sigue rechazando habilidades en plantillas ajenas. Los 30 recorridos de producción pasan en escritorio y móvil: elección de juego, búsqueda por alias, metadatos de consultas, datos estructurados, carga de recursos, habilidades, tablas, copia de código incluso con portapapeles denegado y controles del mapa.

Las 36 comprobaciones de presentación cubren nueve rutas a 320, 768, 1070 y 1440 píxeles, sin desbordamiento horizontal ni errores de página. Se inspeccionaron capturas de portada, selector, catálogo, builds y artículos; se volvieron a capturar las imágenes tras cargarlas, incluidas las 44 del índice de builds. El bloque de actualizaciones de Overwatch ya está debajo de su cabecera, a todo el ancho del contenido, con borde naranja, categoría y fecha; se comprobó públicamente a 1070 y 390 píxeles.

Los informes completos y capturas se conservan en `reports/deadlock-seo/`. La comprobación final de integridad es `final-copy-integrity.json`: 144 candidatos comprobados y publicados, habilidades e imágenes intactas, 44 códigos y compras principales conservados, una excepción de cifras y ocho cambios de fuentes (siete sustituciones accesibles y el anuncio oficial corregido).

`public-audit.json` confirma las 146 páginas públicas y sus siete índices: respuestas correctas, 146 títulos y descripciones únicos, nombre del juego y alias de búsqueda, canonicales, robots, imagen social, fechas, breadcrumbs y artículos JSON-LD, versiones exactas y evidencias válidas, enlaces relacionados publicados y presencia en sitemap. Las dos noticias coinciden con sus revisiones originales. El informe no afirma que Google ya haya rastreado o indexado las 146 páginas.

## Criterios y medición

Se sigue la documentación de Google sobre [títulos descriptivos](https://developers.google.com/search/docs/appearance/title-link), [contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [canonicales](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) y [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb). El contenido debe responder a una necesidad del jugador; el marcado describe lo que puede leer, sin garantías de resultados enriquecidos ni de posiciones.

No hay acceso operativo a métricas de tráfico en esta sesión: el conector de Vercel devuelve `UNAUTHORIZED` y solicita reautenticación. No se presentan visitas ni posiciones inventadas como línea base. La búsqueda pública encontró la landing, pero eso no demuestra la indexación de todos los artículos ni sirve como informe de Google Search Console.

Cuando estén disponibles, comparar 28 días antes y después por página, consulta, país y dispositivo: clics, impresiones, CTR y posición de Search Console, y visitas con referencia de buscador en Analytics. Separar búsquedas de marca de héroes/builds/guías. Mantener las URLs permite esa comparación. Las comprobaciones técnicas prueban la implementación; el aumento de tráfico requiere datos posteriores al rastreo.

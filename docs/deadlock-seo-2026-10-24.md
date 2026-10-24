# Deadlock: SEO, lenguaje y diseño

## Punto de partida

El snapshot de Supabase del 24 de octubre contiene 146 páginas publicadas: 44 fichas, 44 counters, 44 builds, diez fundamentos, dos noticias, un parche y un mapa. En 136 títulos visibles no aparecía el nombre del juego y 36 descripciones tenían menos de 80 caracteres. La brevedad no es un fallo por sí misma; varios casos eran eslóganes que no explicaban el contenido. Las URLs y las fechas originales se conservan.

La auditoría de lenguaje localizó 99 campos con «continuación» y 109 con «disponibilidad». Se revisó el contexto: un reinicio de habilidades, una carga adicional, una mejora de objeto y el ataque de un aliado necesitan explicaciones distintas. No se sustituye una palabra a ciegas ni se inventan estadísticas, experiencia personal o una tier list. Las 146 páginas se revisan; las dos noticias ya tienen un texto claro y no necesitan una revisión artificial.

## Cambios de aplicación

- Portada con búsqueda por héroe, imágenes reales y accesos directos a las siete secciones. Se mantiene la tipografía Bebas Neue/DM Sans, la cuadrícula, las tarjetas rectas y la navegación de Overwatch. El acento verde identifica Deadlock; sus estilos están limitados a esta sección.
- Catálogo visual ordenado por nombre, con alias ingleses y enlaces únicamente a fichas publicadas. Los índices de builds y counters utilizan tarjetas compactas. Las búsquedas aceptan nombres localizados, alias y parámetros repetidos sin producir un error.
- Metadatos específicos para ficha, counter, build, fundamento, mapa, noticia y parche. El título de las fichas incluye el juego y el alias inglés; las builds indican su código y las compras en la descripción. No se añaden palabras clave repetidas ni promesas de «mejor build» sin datos.
- Las variantes `?q=` tienen `noindex, follow` para robots y Googlebot, con canonical a la sección limpia. Los índices y artículos siguen siendo indexables y permiten imágenes de vista previa grandes.
- `BreadcrumbList` representa la ruta real. `CollectionPage`/`ItemList` contienen las páginas publicadas que aparecen en cada índice y en el mismo orden. El schema de artículo conserva fechas reales y referencias, y añade su página principal e imagen; las builds siguen sin publicar referencias de webs externas.
- El sitemap fecha las landings de Deadlock a partir de la última actualización publicada de su sección. No usa la hora de cada petición como falsa fecha de actualización. Las rutas y reglas de Overwatch se conservan.
- Imagen de compartir PNG de 1200 × 630, con marca y retratos del juego. Se genera con `scripts/generate-deadlock-social.mjs` a partir de los recursos ya registrados; no requiere un servicio de imágenes ni llamadas de IA.

## Revisión de textos

`content/deadlock/spanish-copy.mjs` contiene los cambios revisables. La preparación parte del snapshot publicado, no de los antiguos ficheros generados. Los títulos de héroes nombran sus habilidades o mecánicas; las builds explican su enfoque y conservan el código comunitario. Los fundamentos pasan a decir qué enseñan: conseguir almas, usar el aguante, elegir objetos o revisar una partida. Los enlaces relacionados de builds y counters llevan a compras, defensas y movimiento.

Se han preparado 144 revisiones. El control comprueba que no cambian rutas, slugs, fechas originales, parche, alias, identidad de habilidades, imágenes, coordenadas del mapa, cifras de mecánicas ni precios de tablas. Los 44 códigos se han consultado otra vez con `force_refetch=true`: mismo héroe y compras principales, con versión y hora de comprobación guardadas. Las capturas firmadas, comprobaciones y publicación de estas revisiones se registran en `reports/deadlock-seo/`; prepararlas no equivale a publicarlas. El runbook diario incorpora la misma pauta de lenguaje para no recuperar los eslóganes anteriores.

Los cuerpos de los diez fundamentos se leyeron completos. `content/deadlock/fundamentals-copy.mjs` cambia los encabezados y los párrafos que seguían siendo abstractos, conservando tablas, ejemplos posteriores y las cifras del cálculo de resistencias. Los consejos nombran la acción: comprar antes de pelear, guardar un impulso, mirar el registro de daño o elegir una jugada para revisar.

Siete revisiones sustituyen citas de la wiki que agotaban el tiempo de conexión. Se consultaron los textos y datos del cliente en el commit `17462b250a0ca80e7f80102f2c83cc3eecff5f12` de SteamDB: la localización contiene la descripción de Rasgar de Mina y las mejoras de Participación del Público de Sinclair. Para el mapa se leyeron también los capítulos accesibles de estructuras, Midboss, campamentos, transportes y grieta de Deadlock Handbook. No se adoptaron sus recuentos contradictorios ni los valores de fábrica antiguos del Rejuvenecedor. `source-corrections.json` registra las sustituciones; las fuentes originales siguen en el historial publicado. El comprobador de enlaces se mantiene: las siete versiones nuevas deben superar los mismos controles.

La aplicación está desplegada en los commits `148b4d7` y `275448d`. Pasan lint, compilación, 18 pruebas unitarias de SEO/rutas/sitemap y los veinte recorridos de producción de SEO, búsqueda, imágenes y navegación en escritorio y móvil. Las 144 revisiones tienen comprobaciones firmadas correctas; la inspección adicional de imágenes, tablas, FAQ y copia de código continúa antes de su publicación.

## Criterios y medición

Se sigue la documentación de Google sobre [títulos descriptivos](https://developers.google.com/search/docs/appearance/title-link), [contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [canonicales](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) y [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb). El contenido debe responder a una necesidad del jugador; el marcado describe lo que puede leer, sin garantías de resultados enriquecidos ni de posiciones.

No hay acceso operativo a métricas de tráfico en esta sesión: el conector de Vercel devuelve `UNAUTHORIZED` y solicita reautenticación. No se presentan visitas ni posiciones inventadas como línea base. La búsqueda pública encontró la landing, pero eso no demuestra la indexación de todos los artículos ni sirve como informe de Google Search Console.

Cuando estén disponibles, comparar 28 días antes y después por página, consulta, país y dispositivo: clics, impresiones, CTR y posición de Search Console, y visitas con referencia de buscador en Analytics. Separar búsquedas de marca de héroes/builds/guías. Mantener las URLs permite esa comparación. Las comprobaciones técnicas prueban la implementación; el aumento de tráfico requiere datos posteriores al rastreo.

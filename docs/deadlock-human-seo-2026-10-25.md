# Deadlock: segunda revisión de SEO y redacción

La revisión parte de las 146 páginas publicadas en Supabase el 25 de octubre, después del primer trabajo de SEO. El estado publicado, sus versiones y evidencias están guardados en `reports/deadlock-human-seo/before.json`. El sitemap, los canonicales, los alias y las reglas para búsquedas filtradas ya existían; este trabajo no se los atribuye de nuevo.

## Qué mejora

- Los 44 counters reciben una descripción y una introducción escritas para el rival concreto. Explican qué evitar y qué respuestas encontrará el lector. Algunas descripciones anteriores eran demasiado vagas, como «Corta la continuidad de la quemadura»; la brevedad por sí sola no se considera un fallo de SEO.
- Se revisan otros 19 artículos: seis fichas, once builds y dos fundamentos. Bruma explica cómo acercarse y cuándo usar la definitiva; Viscoso distingue acertar, ayudar con el cubo y preparar la salida de la bola; Graves nombra las calaveras, el arma y la grieta. Se eliminan repeticiones y expresiones como «daño aplicable» o «mantener impactos», conservando las condiciones de las habilidades.
- Los nombres de héroes en las tablas enlazan a sus fichas cuando existe una versión publicada. Se reconocen los nombres localizados, ingleses y alias entre paréntesis cuando ambos corresponden al mismo héroe. Una pareja incorrecta, como Hiedra (Kelvin), no se interpreta como una ficha. Un nombre conocido sin ficha publicada sigue siendo texto e imagen; una frase que solo menciona al personaje no se convierte automáticamente en enlace.
- Los enlaces entre ficha, build y counters aparecen después de la introducción, antes del artículo largo. Sus textos nombran al héroe. El comportamiento de las páginas de Overwatch se conserva.
- El procedimiento editorial diario pide revisar frases completas y descripciones específicas. No sustituye una palabra vaga por otra ni elimina términos de juego legítimos como control o ventana.

Se sigue el criterio de [contenido útil para el lector](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) y [enlaces rastreables y descriptivos](https://developers.google.com/search/docs/crawling-indexing/links-crawlable). Se usan enlaces HTML con destino real, sin crear páginas vacías ni repetir palabras clave para atraer búsquedas.

## Integridad y comprobaciones

Las 63 revisiones se publicaron con el CLI editorial y Supabase, vinculadas a comprobaciones automatizadas de su versión exacta. Conservan rutas, slugs, fecha original, parche, alias, nombres e identidad de habilidades, imágenes, coordenadas, fuentes y cifras de mecánicas y precios en sus secciones. Los once códigos de build afectados se volvieron a consultar en el Game Coordinator, comprobando héroe, versión y compras principales. No se presenta una revisión automática como humana ni se atribuye contenido a vídeos que no se hayan revisado. Las 25 páginas de respaldo local conservan los payloads y las evidencias reales publicados.

Pasan lint, la compilación y 30 pruebas unitarias relevantes, incluidos los casos de alias incorrectos, frases sin una ficha exacta y bloqueo de enlaces a fichas no publicadas. Los 32 recorridos de producción pasan en escritorio y móvil: navegación, búsquedas, canonicales y robots, datos estructurados, imágenes, habilidades, tablas, códigos de build y mapa. El recorrido nuevo ficha → counters → otro héroe pasa también localmente. La presentación y publicación de las revisiones se registran en `reports/deadlock-human-seo/`.

La auditoría pública lee las 146 páginas: 63 versiones nuevas y 83 intactas respecto al snapshot. Confirma 146 títulos y descripciones únicos, fechas originales, canonicales, robots, datos estructurados, referencias y sitemap. Comprueba 137 enlaces contextuales con destino publicado y 132 páginas con navegación del héroe antes de los apartados. Los siete índices contienen solo páginas publicadas. Estos resultados prueban el estado de la web, no su posición en Google.

## Medición

El conector de Vercel sigue devolviendo `UNAUTHORIZED` y requiere reautenticación. No se dispone de una línea base de Search Console. No se afirman aumentos de visitas, posiciones, resultados enriquecidos o indexación completa. Para medir el resultado, comparar clics, impresiones, CTR y páginas de entrada orgánica después del rastreo, separando consultas de marca de búsquedas de héroes, counters y builds.

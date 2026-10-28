# Revisión individual de Mei: guía, counters y composiciones

Revisión del 28 de octubre de 2026 por Codex. Se leen completos los tres artículos y se contrastan sus versiones con el inventario original. La guía publicada actual coincide íntegramente con el modelo leído. No se aprueba ninguna otra URL.

| URL | Lectura y utilidad | Corrección y fechas | Versión revisada |
| --- | --- | --- | --- |
| `/guides/mei-guia-video-overwatch` | Muro con seguimiento, cancelación, spray e icicles, salida de Cryo, preparación de Blizzard, adaptación, VOD y tres FAQ. El texto distingue Deep Freeze del spray base. | Añade contexto para la serie de qrxu del 2 de marzo de 2026, conserva medios y vincula los metadatos renderizados. Primera publicación: 6 de mayo de 2026; revisión del contenido: 28 de octubre. | `360bc8a114c1a36e34a0a76da6de210c6c8a2fdea3bc65458c6b8a115a43fe30` |
| `/counters/mei` | Introducción, resumen, Pharah/Echo/Orisa/Kiriko con señal y respuesta, cuatro ventanas, adaptaciones, errores, tres ejemplos, checklist, tres FAQ y enlaces. Prioriza evitar aislamiento, abrir la columna útil y salir de Blizzard. | Advierte de que Cryo-Storm es opcional y puede dañar alrededor del bloque; preparar su salida no significa esperar pegado a Mei. El título precisa que Cryo protege a Mei. Revisión del contenido: 28 de octubre. | `2112c0076f314703403c23da13d926e1df15349cfe8937f7a6352b326921d1a0` |
| `/team-comps/mei` | Cinco argumentos de cada equipo, responsabilidades, rotación, debilidades, ejemplos, checklist y FAQ. Reinhardt/Cassidy, Sigma/Ashe y Reinhardt/D.Va/Reaper/Moira/Lúcio en 6v6, con tareas y líneas de ayuda explícitas. | Texto y fecha del 2 de octubre conservados tras verificar roles, formato, decisiones y fuentes. No exige usar muro ofensivo en cada pelea ni añadir una ultimate a Blizzard por costumbre. | `851fc831383ff9cfa3f9ace102131f3f88bf9e1939511f42e446f699e8d72192` |

## Exactitud y fuentes

Se descarga y lee la ficha actual de [Mei](https://overwatch.blizzard.com/en-gb/heroes/mei/): spray que ralentiza, icicles, invulnerabilidad y curación propia de Cryo-Freeze, muro y Blizzard. Se leen Skating Rink y Glacial Propulsion como opciones minor, y Deep Freeze y Cryo-Storm como alternativas major. No se atribuye la congelación del primario al kit base ni el daño de Cryo-Storm a todas las Meis. El counter deja espacio para preparar la salida del bloque sin exponerse al perk.

Las fichas de Pharah, Echo, Orisa, Kiriko, D.Va, Reinhardt, Cassidy, Baptiste, Lúcio, Sigma, Ashe, Brigitte, Reaper y Moira se contrastaron en los lotes anteriores. Las respuestas a Blizzard distinguen interceptar el lanzamiento de quedarse dentro del área ya desplegada. Fortify no atraviesa un muro ni restablece la línea de curación, y Suzu debe acompañar una salida. No se trasladan reglas de Stadium, Classic o eventos a ranked. Los equipos son ejemplos condicionados, con roles válidos, sin promesas de meta o resultado.

El [vídeo de qrxu](https://www.youtube.com/watch?v=GAUa8H5aQSQ) y oEmbed devuelven HTTP 200 y el reproductor indica `OK`. Coinciden título, canal y fecha del 2 de marzo de 2026. Se leen descripción y capítulos de su serie, organizada por tramos de rango. No se afirma haber visto sus 38620 segundos ni validado todas las decisiones del autor. La guía española contiene su propio análisis contrastado con el kit actual. El contexto identifica la fecha y evita convertir la miniatura o el recorrido del autor en una garantía de rendimiento.

La huella editorial renderizada es `84fd4c1ba30b10f2fce25f1c1c8c4e7496b16de935d7031ef5ed2df3efc9909a`. El cuerpo de la guía se mantiene; fecha de revisión y contexto se registran también en la huella de la revisión estática. Cambiar medios, atribución, imagen o metadatos relevantes invalida la aprobación.

## Enlaces, presentación y publicación

La copia aislada parte de `48e8983`, sin incorporar los cambios locales ajenos de mapas, Deadlock o tsconfig. Pasan ocho comprobaciones iniciales: los tres artículos en escritorio y móvil y dos pruebas específicas de disponibilidad del botón de reproducción. Se inspeccionan las tres capturas completas de escritorio y las tres cabeceras móviles. Enlaces, metadatos, imágenes, fechas, FAQ, estructura y ausencia de overflow y anuncios son correctos en esa versión inicial. La validación final comprobará el nuevo contexto, la advertencia de Cryo-Storm y la publicación.

Solo Mei se incorpora a las listas explícitas de publicación. Cada URL exige la revisión exacta y la guía requiere sus medios comprobados. Se mantienen controles negativos en otros artículos pendientes y `adsAllowed: false`, sin activar anuncios.

Fuentes y modelos: `reports/indexing-review-2026-10-27/batch-eight/`. Capturas y logs: `reports/indexing-review-2026-10-27/release-batch-eight/`.

Validación local final: lint sin errores, 704 pruebas unitarias y build correctos. Pasan diez casos de navegador para los tres artículos y ambos catálogos en móvil y escritorio, más seis de regresión sobre las guías de Hanzo y Ashe y la supresión de anuncios en ambos juegos. Se comprueban texto completo, nueva advertencia, contexto y botón de reproducción, fechas, atribución, FAQ, datos estructurados, enlaces, imágenes, sitemap y ausencia de overflow y slots. Se inspeccionan las capturas finales de la guía y el counter. Quedan pendientes despliegue y verificación pública.

El despliegue de `77f298c` está [completado por Vercel](https://vercel.com/masiajavs-projects/peakform/HbMWHFTTtUqkMRJ6k8zj1d9CUELM). Pasan veintiocho comprobaciones públicas: las tres URLs nuevas y las veintiuna anteriores permiten indexación y están en sitemap; cuatro controles pendientes o de filtros mantienen noindex y exclusión. Coinciden fecha de revisión, primera publicación, metadatos del vídeo, contexto de marzo de 2026 y advertencia de Cryo-Storm. El alias de Ashe conserva su 308 y exclusión como control de regresión adicional. Las respuestas no incluyen slots ni script ejecutable de AdSense.

Pasan otros seis casos de navegador contra producción, las tres páginas en ambos dispositivos: texto completo, contexto y botón de reproducción, FAQ, enlaces, fechas, metadatos, imágenes, sitemap y ausencia de overflow y slots. Evidencias ignoradas: `batch-eight-production.json` y `release-batch-eight/production-eight.log`. Resultado global: **24 artículos revisados, habilitados y verificados públicamente de 140; 116 pendientes**.

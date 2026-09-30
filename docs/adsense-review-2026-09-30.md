# Diagnóstico de AdSense: 30 de septiembre de 2026

## Alcance y estado del repositorio

Se ejecutó `git pull --ff-only` en `main`. El repositorio ya estaba al día con `origin/main`, en `e74a1d1`.

El análisis se hizo contra `https://www.replaidlab.com`, no contra una versión local. El informe completo está en `reports/adsense-production-2026-09-30.json`, generado por `npm run audit:content`. Los reportes se guardan localmente y están excluidos de Git.

El motivo del rechazo se toma del historial comunicado por el propietario: contenido de poco valor. No se ha accedido a la cuenta de AdSense ni al mensaje de rechazo más reciente. Google no identifica en ese mensaje qué URL concreta provoca su decisión; las prioridades siguientes son un diagnóstico basado en lo que sí se puede comprobar.

## Datos comprobados

| Comprobación | Resultado |
| --- | --- |
| URLs descubiertas por sitemap y enlaces públicos | 247 |
| URLs en sitemap | 105 |
| URLs con indexación permitida | 106 |
| URLs con noindex | 141 |
| Guías accesibles con noindex y menos de 650 palabras en el análisis automático | 59 |
| Guías adicionales noindex que requieren revisión separada | 2: DPS y Support |
| Páginas con avisos de similitud para revisar | 43, todas noindex |
| URLs rastreadas con respuesta distinta de HTTP 200 | Ninguna |
| Inventario publicitario visible en home y muestra de guía | Ninguno |
| ads.txt | HTTP 200, entrada DIRECT de Google |
| Consola e imágenes de la home en navegador interno | Sin errores ni imágenes rotas observadas |

La URL extra con indexación permitida es `/pick-lab?mode=counters`; su canonical apunta a `/pick-lab`. No es una segunda URL del sitemap ni una prueba de que Google la haya indexado.

## Hallazgo principal: contenido breve sigue formando parte de la navegación

La home y el hub muestran todos los héroes. Solo 12 tienen una ficha editorial pública; los demás enlazan a búsquedas de guías del héroe. Esas búsquedas pueden mostrar documentos breves y guías de vídeo que la vista principal de `/guides` ya excluye.

Ejemplos comprobados en el navegador interno:

- `/guides?hero=orisa` ofrece dos artículos antiguos.
- `/guides/orisa-guia-overwatch-fortify-javelin` contiene aproximadamente 212 palabras en su artículo, con una introducción, cuatro prioridades y errores generales.
- `/guides/orisa-guia-video-overwatch` añade un resumen corto, el vídeo de Kajor y recomendaciones generales de plan de juego, prioridades y revisión de VOD. Ese desarrollo aporta muy poco análisis específico de Orisa.

Estas páginas tienen `noindex, follow` y no muestran anuncios. Eso es correcto para indexación e inventario, pero no elimina su presencia pública ni su apariencia breve o repetitiva. `noindex` no es una certificación de calidad ni una garantía de exclusión de la evaluación del sitio por AdSense.

La prioridad es revisar la experiencia completa de un visitante, incluidos filtros y fichas antiguas, y no solo el sitemap.

## Fallo en el auditor anterior

El comparador guardaba arrays de secuencias de palabras, pero esperaba conjuntos con `.size` y `.has()`. El resultado era `NaN` y ninguna pareja superaba el umbral. Por tanto, el informe anterior con una lista vacía de similitudes no demostraba originalidad.

Se corrigió el tipo de dato y se añadió una prueba que ejecuta el crawler contra un servidor de prueba. También se excluyen comparaciones con el mismo canonical y se utiliza el artículo cuando falta `main`, para evitar contar navegación y footer.

El rastreo corregido detecta 43 páginas con avisos de similitud, todas fuera del índice permitido. Entre los pares están las guías de vídeo de Sombra y Torbjörn, y las composiciones de D.Mon y Doomfist. Son prioridades de lectura individual, no una prueba de que Google haya señalado esas URLs.

Una similitud alta de secuencias de siete palabras exige leer las dos páginas. No equivale a porcentaje de plagio y no es una métrica de Google. Tampoco se deben tratar búsquedas o perfiles de servicios como artículos editoriales defectuosos solo por su extensión.

## Otras señales que revisar

- La home sigue usando expresiones temporales sobre el hero trial de Doctrine y regalos después de la ceremonia. Es necesario comprobar vigencia, duración y condiciones oficiales antes de seguir ofreciéndolos como acciones actuales.
- Algunas tarjetas publicadas repiten una coletilla sobre consejos prácticos, checklist de VOD y enlaces internos. Deben describir la pregunta concreta que resuelve cada artículo, sin vocabulario interno.
- El quality gate de guías dinámicas sigue dependiendo sobre todo de extensión, resumen y categoría. No verifica originalidad entre artículos, autoría real o revisión editorial por sí mismo.
- `/counters` ofrece seis enlaces populares aunque el ItemList enumera once. Conviene mostrar todas las guías revisadas que se anuncian en el schema.
- El auditor señala 382 palabras en `/counters`. Esa cifra no demuestra que el hub sea de baja calidad: Google no exige 500 palabras. Debe evaluarse por su utilidad como directorio.
- La señal de imágenes sin alt de Pick Lab requiere separar imágenes decorativas con `alt=""` de imágenes que realmente carecen de alternativa accesible.
- En las páginas comprobadas no se observó el script de AdSense ni una meta de cuenta. `ads.txt` sí existe. Hay que confirmar en la cuenta qué método de verificación está aceptado; no se atribuye a esta observación el rechazo editorial.

## Orden de trabajo recomendado

1. Unificar la selección editorial en home, hubs y filtros. Destacar solo guías que aporten valor específico; cuando falte una guía del héroe, ofrecer alternativas útiles por rol o problema sin prometer una ficha completa.
2. Revisar las 59 guías breves una por una. Completar las que resuelvan una intención propia; consolidar las que dupliquen una guía mejor solo cuando exista un destino pertinente. Conservar el material útil y no aplicar redirecciones masivas al hub.
3. Añadir contenido diferencial a los artículos principales: ejemplos de peleas con mapa, objetivo y recursos concretos, comparación entre decisiones y una explicación de qué revisar en la VOD. No inventar partidas, experiencia personal ni imágenes de gameplay.
4. Revisar las noticias temporales y las promesas de cobertura de los hubs. Mantener fechas históricas cuando no haya cambios reales.
5. Repetir el rastreo, revisar enlaces e imágenes y verificar desktop/móvil. Comprobar que las URLs editadas funcionan y que no cambian pagos o áreas privadas.
6. Revisar el estado de rastreo en Search Console y el método de verificación de AdSense. Pedir otra revisión tras publicar y verificar los cambios sustanciales, no solo después de esperar un plazo arbitrario.

No se recomienda pedir otra revisión todavía. El siguiente trabajo debe resolver estas señales de contenido público; cambiar titles, añadir schema o aumentar palabras no basta. Tampoco se puede prometer aprobación después de estos cambios.

## Verificación de este cambio

- 135 tests superados, incluido un rastreo HTTP de prueba con artículos repetidos, variantes canonical, hubs y enlaces fuera del sitemap.
- Lint y TypeScript sin errores.
- Rastreo de producción completado: 247 respuestas HTTP 200.
- Home y muestra de guías revisadas en navegador interno.
- No se han modificado páginas públicas, pagos ni configuración de anuncios. Este cambio corrige la herramienta de diagnóstico y documenta el trabajo pendiente; no certifica una revisión editorial completa del sitio.

## Referencias

- [AdSense: contenido y experiencia de usuario](https://support.google.com/adsense/answer/10015918): valor original, contenido propio al utilizar vídeos y navegación que entregue lo prometido.
- [Inventario sin contenido propio o de poco valor](https://support.google.com/publisherpolicies/answer/11112688): restricciones sobre contenido de poco valor y contenido automático sin revisión.
- [Cómo funciona noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing): controla la aparición en búsquedas, no la calidad editorial.

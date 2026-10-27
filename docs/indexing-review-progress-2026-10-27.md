# Revisión individual de artículos excluidos de Google

Objetivo activo: leer y verificar cada artículo público actualmente excluido por `noindex`, corregir lo necesario, registrar la revisión de su versión y habilitar su indexación solo cuando esté preparado. La incorporación al índice de Google es posterior y no determina la finalización técnica.

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

Siguiente prioridad: releer y verificar `/roles/flex`, `/counters/moira` y `/counters/reaper`, que conservan revisiones históricas pero tienen un bloqueo explícito de publicación. Su revisión antigua por sí sola no autoriza habilitarlos ahora. Después continúan las guías de héroes, composiciones, counters restantes y mapas, con una decisión por URL y versión.

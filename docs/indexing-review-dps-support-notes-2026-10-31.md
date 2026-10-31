# Revisión individual y consolidación de las notas de DPS y Support

Revisión por Codex el 31 de octubre de 2026. Se completa la [lectura preliminar](indexing-review-dps-support-notes-preliminary-2026-10-31.md) y se revalidan ambas filas publicadas frente al inventario antes de editar: siguen idénticas. Cada nota y su destino se han leído completos. La resolución es consolidar dos resúmenes breves con sus guías completas existentes, sin aprobar los resúmenes como artículos independientes ni volver a contar los destinos como nuevas publicaciones.

| Nota revisada | Versión de la nota leída | Destino completo y versión vigente |
| --- | --- | --- |
| `/guides/dps-presion-final-blows-control-angulos` | `9dda1a90e72cca5b7f65c3767d7c846fdb7b861977a12e739bbd0cd62d52195a` | `/guides/como-mejorar-como-dps-overwatch` — `873f2be8f4e7b16461312a6dcc3db077f0c1ce58d88e28bb2e1723c587865a42` |
| `/guides/support-tempo-utilidad-supervivencia` | `5c1c900caf39d3f7add6a3a372570407f469bc25c4a8a277a8949327628115fe` | `/guides/como-mejorar-como-support-overwatch` — `55bd803a79a37909107bac3a1d747e228af16fa075e4c685634456a9df1d8168` |

## DPS: misma intención, desarrollo suficiente en el destino

La nota contiene definición de presión, tres tareas, un error de ángulo compartido y una nota 6v6. La guía completa desarrolla esos mismos temas: daño que cambia decisiones, ángulos útiles y cobertura, seguimiento, Recall y Dash, cambio de foco y conservación de altura, ejecución mecánica, overtime y segundo Tank, ultimates y cambios de héroe, ejercicio VOD, cinco FAQ y enlaces. Aporta condiciones y ejemplos de Gibraltar y Numbani que la nota no desarrolla.

La frase de la nota sobre el DPS que gana partidas puede interpretarse como una garantía. El destino evita esa conclusión: disparar al Tank puede ser correcto, forzar un cooldown necesita una oportunidad aprovechable y una muerte temprana no basta para evaluar el engage. No se identifica una intención propia que justifique ampliar la nota con otra repetición del mismo artículo. Se redirige permanentemente al destino completo.

La [ficha oficial de Genji](https://overwatch.blizzard.com/en-gb/heroes/genji/) confirma reinicio de Swift Strike con eliminaciones; la guía no lo da por conseguido al entrar. La de [Tracer](https://overwatch.blizzard.com/en-gb/heroes/tracer/) confirma regreso de Recall, que la guía distingue de una salida necesariamente segura. Los ejemplos tácticos son análisis editorial condicionado; no se presentan como recomendaciones oficiales ni se inventan cifras de balance.

## Support: utilidad y supervivencia ya desarrolladas

La nota contiene utilidad además de curación, cuatro prioridades, una pregunta de replay y nota 6v6. La guía completa explica posición, urgencias y alcance, daño y curación, uso o reserva de cooldowns, retirada frente a dive, cooperación con el otro Support, segundo Tank, ultimates con seguimiento, ejercicio VOD, cinco FAQ y enlaces. Cubre el propósito de la nota y limita sus posibles interpretaciones absolutas: puede hacer falta gastar Suzu y teleport juntos, perder visión brevemente no exige seguir al Tank por una línea peligrosa y atender al aliado más herido no siempre resuelve la urgencia principal.

Las fichas oficiales de [Kiriko](https://overwatch.blizzard.com/en-gb/heroes/kiriko/), [Lúcio](https://overwatch.blizzard.com/en-gb/heroes/lucio/) y [Zenyatta](https://overwatch.blizzard.com/en-gb/heroes/zenyatta/) contrastan limpieza de la mayoría de efectos y breve invulnerabilidad, teleport a un aliado, velocidad para aliados cercanos, salud adicional temporal, Discord y curación próxima de Trascendencia con invulnerabilidad propia. El destino mantiene las condiciones de alcance y seguimiento, sin prometer protección universal ni una proporción fija de daño y curación.

## Resolución, fechas y presentación inicial

Se añaden dos correspondencias explícitas de redirección 308. La política existente de aliases impide que las notas aparezcan como fichas independientes o URLs de sitemap, aunque se les añadiera longitud. No se modifican las filas originales de la base de datos ni los textos o revisiones de los destinos. Sus fechas siguen siendo publicación 21 de junio de 2026 y modificación 18 de octubre; no se trasladan las fechas del 5 de mayo de las notas ni se inventa una modificación del texto por añadir redirecciones.

La copia aislada `release-batch-forty-three` parte de `8376fb0`, sin cambios locales ajenos. Pasan cuatro casos iniciales, uno por pareja y tamaño, que recorren las cuatro páginas: texto completo de notas y destinos, cinco FAQ por destino y respuestas estructuradas, enlaces, fechas, canonical, robots, sitemap y ausencia de anuncios y desbordamiento. Se inspeccionan ocho capturas completas de las cuatro páginas en móvil y escritorio. La jerarquía y el texto se leen correctamente; la brevedad de las notas confirma que el problema es su desarrollo y solapamiento, no una rotura visual.

Evidencia de filas, modelos, fuentes y respuestas en `reports/indexing-review-2026-10-27/batch-forty-three/`; pruebas y capturas en `release-batch-forty-three/`.

## Validación final local

Pasan 711 pruebas unitarias, lint y seis casos finales de navegador: las dos nuevas consolidaciones y la previa de Tank en móvil/escritorio. Se inspeccionan cuatro capturas completas finales de los destinos de DPS y Support, correctas y sin anuncios ni desbordamientos.

Las comprobaciones exigen el 308 sin seguirlo automáticamente, llegada al destino canónico con 200, texto íntegro y resumen, metadatos, cinco FAQ y sus respuestas estructuradas por guía, fechas originales, todos los enlaces internos, sitemap, ausencia de anuncios, navegación efectiva al cuaderno de VOD y un único resultado de cada destino en la búsqueda. Los filtros conservan noindex y las notas quedan fuera del sitemap y el catálogo.

Dos pruebas unitarias verifican que las notas no se convierten en artículos aprobados al añadir longitud y que las versiones exactas de los destinos mantienen su revisión vigente. No se añade ninguna aprobación estática nueva. El despliegue y su verificación pública están pendientes.

# Revisión de rechazo y reparación · 16 de noviembre de 2026

## Evidencia del rechazo

El panel autenticado de AdSense muestra «Contenido de poco valor», con última actualización del 6 de noviembre a las 00:32 CET. No identifica URLs concretas. Pide valor propio, selección y mantenimiento continuos e interés real de usuarios. Este registro no atribuye la decisión a una página concreta ni garantiza aprobación tras las reparaciones.

Las cuatro variantes HTTP/HTTPS y raíz/www de `ads.txt` responden 200 al seguir sus redirecciones, con el publisher que muestra la cuenta. `robots.txt` permite su lectura. El panel todavía dice «No se encuentra»: no se sobrescribe un archivo correcto para intentar forzar esa actualización.

## Inventario y límites

Se ejecutó `scripts/audit-public-content.mjs` contra producción con el inventario histórico de octubre como semilla y límite de 1.200 rutas. Terminó con la cola vacía: 540 páginas observadas, 385 en sitemap, 424 respuestas indexables y 116 noindex. Los recuentos incluyen alias y filtros, no son un número de artículos únicos. Todas respondieron 200 tras las redirecciones. El comparador automático no detectó pares por encima de su umbral; esto no certifica originalidad.

Las once alertas de extensión se revisaron como heurísticas, sin rellenar portadas, índices o noticias hasta una cifra arbitraria. Google no establece aquí un mínimo de 500 palabras. Los mapas muestreados tienen contenido sustancial y diferenciado; una revisión estática pendiente no prueba que sean páginas vacías. Las notas personales de mayo conservan contexto y fechas: no se presentan como noticias actuales ni se borran para alterar el inventario.

Evidencia privada: `reports/adsense-2026-11-16/before.json` y `rejection.json`.

## Correcciones de producto

- El buscador de guías incorpora las fichas canónicas de héroes y sus revisiones publicadas. Doctrine y D.Mon dejaban una búsqueda sin resultados pese a existir fichas completas. Los filtros de rol, héroe, categoría y mapa se aplican también a las nuevas tarjetas. Se deduplican destinos y se usan las mismas URLs en tarjetas y JSON-LD, conservando `noindex, follow` en los filtros.
- El catálogo de builds promete código únicamente si el artículo incluye `buildImport`. Bruma conserva su guía de compras y el aviso de indisponibilidad; su título SEO deja de anunciar un código ausente. La descripción del catálogo hace explícito que el código depende de la guía.
- El catálogo de mapas ofrece cinco accesos por modo antes de las treinta tarjetas. Apuntan a los encabezados existentes y respetan el espacio de la navegación fija, también en móvil.

## Tres consolidaciones individuales

Una revisión editorial comparó origen y destino publicados, su intención y la información que podía perderse. Las siguientes rutas antiguas se consolidan mediante una redirección permanente directa:

| Origen en `/guides/` | Destino en `/guides/` | Contenido cubierto |
| --- | --- | --- |
| `composiciones-dive-brawl-poke-overwatch` | `composiciones-overwatch-5v5-6v6` | Estilos, coordinación y reparto entre Tanks, con ejemplos y dibujos. |
| `poke-composicion-overwatch-angulos-distancia` | `composiciones-overwatch-5v5-6v6` | Ángulos, distancia, retirada y respuesta al dive. |
| `fundamentos-overwatch-5v5-revisar-partidas` | `como-mejorar-en-overwatch` | Posición, decisión anterior a morir, coordinación y revisión. |

Se conservan los registros originales de Supabase, los cuerpos de destino y sus fechas. No se amplía indexación ni se renuevan revisiones por añadir estos alias. La guía de flyers, roles/subroles y la tier list histórica se mantienen separadas porque tienen intenciones propias. Tampoco se consolida la guía de lectura de tier lists sin conservar primero su contexto 6v6; queda como mejora editorial posterior, sin atribuirle el rechazo.

## Verificación y entrega

46 pruebas unitarias pertinentes aprobadas en siete archivos, incluida la comprobación de redirecciones, destinos revisados, búsqueda y filtros. La primera expectativa nueva de fecha se corrigió para respetar la publicación real de junio de la guía de fundamentos. Compilación de producción correcta. Revisión independiente del buscador y del resto de cambios sin bloqueos; se corrigió el margen del encabezado de los mapas tras la revisión.

En navegador local se comprobó una búsqueda real de D.Mon, el recorrido a Doctrine, los accesos de mapas en 320 px y el salto a Escolta, las tarjetas con/sin código y la consolidación de poke. El verificador HTTP local comprobó once recorridos, JSON-LD, filtros sin resultados, las tres redirecciones directas, destinos indexables, sitemap y ausencia de ejecución de anuncios en la muestra. La comprobación pública posterior y el estado de la nueva solicitud se conservan en el informe privado de cierre.

No se activan anuncios, compras o servicios adicionales. Una solicitud de revisión no equivale a aprobación y las mejoras editoriales continuarán después de enviarla.

## Documentación oficial consultada

- [Motivos y alcance de una revisión de AdSense](https://support.google.com/adsense/answer/81904?hl=es).
- [Contenido original, duplicados y navegación](https://support.google.com/adsense/answer/10015918?hl=es).
- [Inventario sin contenido o de poco valor](https://support.google.com/publisherpolicies/answer/11112688?hl=es).

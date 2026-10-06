# Baptiste e Illari: revisión de counters

Fecha de trabajo: 3 de octubre de 2026. Autor público: Replaid Lab.

## Alcance

Reescritura individual de `/counters/baptiste` y `/counters/illari`. Se mantienen las rutas y el marketplace. No se activan anuncios ni se publica un despliegue. Los ejemplos son situaciones hipotéticas, no experiencias atribuidas al autor.

Baptiste: orden de Burst y Lamp, tiro seguro al dispositivo, presión sobre Exo Boots y rutas frente a Window. Illari: ángulos del Pylon, llegada de Outburst, energía de curación y seguimiento de Captive Sun.

## Contraste de mecánicas

- Kit y perks de Baptiste: https://overwatch.blizzard.com/en-gb/heroes/baptiste/
- Kit y perks de Illari: https://overwatch.blizzard.com/en-gb/heroes/illari/
- Cambios normales de febrero de 2026: https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/02/
- Cambios normales de marzo de 2026: https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/03/
- Captive Sun y barreras, 24 de agosto de 2023: https://overwatch.blizzard.com/en-us/news/patch-notes/live/2023/8/
- Assault Burst conserva curación: https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2025/10/
- Descripción de Suzu y Swift Step: https://overwatch.blizzard.com/en-us/news/23841483/niech-kitsune-was-prowadzi-pierwsze-spojrzenie-na-projekt-i-styl-gry-kiriko/

La consulta directa de algunas páginas oficiales devolvió errores; se contrastó su texto oficial indexado. No se tomó una lista comunitaria como sustituto. Se excluyen los cambios de Community Crafted de junio de 2026: no convierten Lamp en la ultimate del Baptiste de ranked.

No se fijan tiempos de cooldown, salud del dispositivo ni umbrales de eliminación. Los perks se indican como elecciones opcionales y se distinguen las alternativas del mismo nivel. Solar Flare ya no consume energía del rayo. Matrix no cubre el hitscan de Solar Rifle ni elimina Sunstruck ya aplicado; Suzu se plantea antes de la detonación, no como devolución del daño recibido.

## Revisión individual realizada

Lectura completa de ambas páginas renderizadas, incluyendo escenarios, limitaciones de cada pick y FAQ. Se corrigieron «recuperar su cabeza», una recomendación innecesaria de Sleep y una referencia poco clara a la energía del rayo. Se revisó el resultado corregido, no solo el borrador.

Navegador interno: escritorio 1440 × 900 y móvil 390 × 844. Retratos cargados, fondo oscuro, un H1, canonical propio, Article/BreadcrumbList/FAQPage válidos y coherentes con el contenido. FAQ desplegable y navegación real a las guías de cada héroe. Sin overflow horizontal, errores de consola ni anuncios. Los 18 destinos comprobados en este lote respondieron 200, incluido el filtro de Ashe utilizado por la navegación segura.

Build previo a la aprobación: `Gt-Zi32-XlFs8zEjcJQlV`, copia aislada `.next-editorial-built-preview/baptiste-illari-review2-2026-10-03`. En esta vista ambas páginas seguían `noindex, follow`, como corresponde antes de registrar una revisión.

Versiones exactas comprobadas con el inspector de solo lectura:

- Baptiste: `a44e5d7fbc287e3f1a4b58de6ed09236e27f1f23a09a470ba62b5f4b904a8209`.
- Illari: `7ace1ef99235fea9868a04132ba2e22a5e1f3ae75bb3ec146a0a0fd29e0598d0`.

Se registran únicamente estas versiones con intención de publicación `index_no_ads`. Un cambio editorial invalida la coincidencia. El registro no certifica el resto del catálogo ni la aceptación de AdSense.

## Cierre técnico del lote

- `npm.cmd run verify`: lint correcto, 261 pruebas unitarias, build correcto y 532 pruebas E2E correctas en escritorio y móvil.
- `npx.cmd tsc --noEmit --incremental false` y `git diff --check`: correctos. Los avisos de fin de línea de Git no son errores de contenido.
- Evidencia preservada en `reports/verification-baptiste-illari-2026-10-03`: informe Playwright, capturas y resultado final sin fallos.
- Build final aislado: `fcopolG4p8d136eJaI9KZ`, en `.next-editorial-built-preview/baptiste-illari-final-2026-10-03`. El navegador interno confirmó ambas respuestas `index, follow`, fecha real de revisión, imágenes y FAQ operativas, sin publicidad. Navegación del hub a Baptiste comprobada.
- Rastreo final: `reports/adsense-local-2026-10-03-baptiste-illari-final.json`, 330 respuestas HTTP 200, 86 entradas de sitemap, 87 respuestas que permiten indexación y 243 noindex. Las variantes canonical explican que las respuestas indexables no coincidan exactamente con las entradas de sitemap; no representan URLs indexadas en Google.
- Siete avisos pendientes: similitud en Lucio, Mercy, Orisa, Ramattra y Sigma; umbral de extensión de los hubs `/news` y `/counters`. No se añaden palabras de relleno para pasar el umbral.

El rastreo sigue clasificando 21 páginas como genéricas. Jetpack Cat, Wuyang y Zenyatta han dejado de activar el aviso comparativo sin haberse reescrito ni aprobado: permanecen pendientes. Esta revisión no certifica compras reales, el sitio desplegado, un CMP ni el estado de AdSense. No se ha hecho push ni solicitado revisión.

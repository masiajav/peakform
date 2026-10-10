# Doctrine: counters y composiciones de Season 5

Revisor: Codex. Fecha: 2026-10-10. Autor publico: Replaid Lab.

## Alcance

- `/counters/doctrine`: cuatro amenazas, ventanas de cooldown, adaptaciones sin cambiar de heroe, ejemplos y FAQ.
- `/team-comps/doctrine`: dos propuestas 5v5 y una propuesta de cola por roles 6v6, responsabilidades, sustituciones, ejemplos, revision de VOD y FAQ.
- No se modifican pagos, cuentas, datos privados, configuracion publicitaria ni otras aprobaciones editoriales.

## Comprobacion del contenido

Se contrasto el kit y el parche de lanzamiento con las paginas oficiales de Blizzard:

- https://overwatch.blizzard.com/en-us/heroes/doctrine/
- https://overwatch.blizzard.com/en-us/news/patch-notes/retail/
- https://overwatch.blizzard.com/es-es/news/patch-notes/live/
- https://overwatch.blizzard.com/en-us/news/24303008/feed-your-hunger-in-reign-of-talon-season-5-a-grim-doctrine/

Las aperturas directas de algunas paginas devolvieron 403; la comprobacion utilizo su contenido oficial indexado, no una supuesta respuesta HTTP satisfactoria.

Se sustituyen las referencias al trial por el lanzamiento del 6 de octubre. Se distinguen Imbuir y su siguiente accion, los perks alternativos y el kit normal de Stadium. Se incorporan el cooldown de movimiento de 8 segundos, su reduccion de dano del 40% sin inmunidad a criticos, los drones con 30% de velocidad de ataque y los ajustes de Liberacion y Transfusion. El declive de Liberacion no se presenta como un plazo exacto para recuperar toda la salud.

La anticuracion no se describe como eliminacion del overhealth ni del buff de ataque. Las alineaciones cumplen sus roles; la variante 6v6 se identifica expresamente y no se vende como una alineacion 5v5. Las propuestas son razonamiento tactico, no resultados de pruebas personales, winrates ni afirmaciones de un meta medido.

Los argumentos, ejemplos y cierres son especificos. No se inventa fecha original de publicacion. Fecha visible y Article usan la revision del 10 de octubre. Las preguntas y respuestas visibles coinciden con FAQPage.

## Evidencia previa a la indexacion

- Lint sin cache satisfactorio, 392 tests unitarios satisfactorios y build aislado de 193 rutas satisfactorio.
- Revision manual en navegador interno: ambas paginas en escritorio y movil de 390 px, incluyendo cabeceras, alineaciones y FAQ abiertas. Fondo oscuro, retratos cargados, texto legible y sin solapes observados.
- Comprobacion independiente Playwright de cuatro vistas: HTTP 200, un H1, metadatos y schema coherentes, enlaces internos con HTTP 200, imagenes decodificadas, sin overflow ni errores de consola y sin ejecucion publicitaria.
- Informe local previo: `reports/doctrine-season-five/local-review.json`, cuatro vistas, 112 URLs en sitemap, sin errores. Ambas rutas permanecian noindex durante esa revision.

La aprobacion esta ligada a los hashes exactos de estas dos revisiones. Una edicion posterior debe invalidarla. Los informes y capturas generados son locales; no se publican bloques sobre este proceso en los articulos.

## Comprobaciones finales locales

La comprobacion independiente posterior a la aprobacion paso en las cuatro vistas. Texto, metadatos, schema y enlaces coinciden exactamente con el contenido revisado; solo cambian robots y elegibilidad en el sitemap. Se anaden exclusivamente las dos rutas de Doctrine: 114 URLs, sin bajas. Informe: `reports/doctrine-season-five/local-final.json`.

El rastreo del inventario anterior y del manifiesto actual visito 330 documentos, con la cola agotada: 114 indexables y 216 noindex. No marco pares de similitud alta. El unico aviso heuristico es el hub de counters por debajo de un umbral generico de 500 palabras; no representa un requisito de Google ni justifica rellenar el hub. Informe: `reports/doctrine-season-five/audit-local-final.json`.

Esta evidencia no certifica todas las paginas del sitio, un checkout autenticado, la configuracion de una CMP ni la decision externa de AdSense. La publicidad sigue desactivada.

La suite final `npm run verify` termino con codigo 0: lint sin cache, 392 tests unitarios en 46 archivos, build aislado de 193 rutas y 748 pruebas Playwright de escritorio y movil (9,7 minutos). Incluye validacion de que las ediciones no revisadas invalidan los dos permisos de indexacion, rutas privadas exigen autenticacion y no se ejecuta publicidad en modo revision. No hubo cambios al contenido servido despues de estas comprobaciones.

El rastreo local registro avisos de autenticacion al consultar estados de Stripe con las credenciales locales existentes. No se cambiaron esas credenciales ni se realizo un cobro: las comprobaciones de acceso anonimo no sustituyen una prueba autenticada del checkout.

# Revision individual: Doctrine y seleccion flexible

Fecha: 2026-10-03. Revisor: Codex. Autoria publica: Replaid Lab.

## Alcance

- `/counters/doctrine`: respuestas razonadas al kit mostrado en el trial,
  no tier de lanzamiento ni partidas jugadas. Estado de prueba tipado,
  headings sin falsa certeza de ranked y bloqueo de indexacion incluso si
  el slug se incluyera accidentalmente en una lista de publicacion.
- `/roles/flex`: sustituye el archivo generico por una guia propia de hero
  pool, ejemplos por rol, mapa, timing, ultimate y comparacion de VOD.
  No es un cuarto rol. Noindex y sin anuncios; rutas restantes intactas.

## Base factual y limites

La captura de habilidades enviada por el usuario permite leer Cetro eterno,
Imbuir, Impulso velado, Drones vigorizantes, Liberacion, Superviviente y sus
cuatro perks. El articulo evita cifras y cooldowns finales; no atribuye
limpiezas, reflejos o bloqueos no comprobados a la ultimate o al arma.

Busqueda oficial del 2026-10-03: noticia indexada
`https://overwatch.blizzard.com/en-us/news/24294376/` y versiones localizadas
confirman Support, trial 12-14 de septiembre y estreno con Season 5. La
apertura directa devuelve 403; la ficha oficial de Doctrine no es accesible
con la herramienta. No se finge un contraste de su version final.

Ejemplos por mapa y decisiones: analisis hipotetico propio, no experiencia
personal ni promesas de resultados. Flex no depende de cifras de balance,
breakpoints o afirmaciones de un formato concreto de ranked.

## Lectura y verificacion individual

Primer build `EFmy7zUvCa_atwUJ-NMqn`, conservado en
`.next-editorial-built-preview/doctrine-flex-review-2026-10-03`. Lectura
completa renderizada de ambos articulos y las tres FAQs abiertas de cada
uno. Se corrigen expresiones forzadas y alineacion del enlace de correccion.
Imagenes cargadas, un H1, noindex, cero anuncios y sin overflow observados
en 1440x900 y 390x844. Click de la guia de Ana desde Flex y URL/H1 correctos;
el destino conserva copy antiguo y necesita revision separada, no se da
por certificado.

Build corregido `mZh-aCDMWZhrXgpvCS-dl`, conservado en
`.next-editorial-built-preview/doctrine-flex-review2-2026-10-03`. Relectura
completa de ambos articulos, tres FAQs abiertas de cada uno y coincidencia
con Article/FAQPage. Capturas en escritorio y movil: sin solapes ni overflow.
Siete imagenes cargadas, un H1 por articulo, canonical correcto, noindex y
cero elementos publicitarios. Veinte destinos internos responden HTTP 200.
Click real hacia `/heroes/doctrine`, con URL y H1 correctos; el contenido del
destino requiere su propia revision. Sin errores de consola observados.

Se registran manualmente las versiones exactas, sin habilitar indexacion
ni anuncios. El helper de calculo no escribe revisiones; se desactiva su
watcher, innecesario para una lectura puntual y costoso con builds archivados.

## Cierre local del lote

- `npm.cmd run verify`: lint correcto, 287 unitarios, build y 660 E2E
  correctos (7.9 minutos de Playwright), cero retries configurados.
- `npx.cmd tsc --noEmit` y `git diff --check`: correctos.
- Build final `ESqg_cOvLcYWlDSMu32Ni`, conservado en
  `.next-editorial-built-preview/doctrine-flex-final-2026-10-03`, servido
  en `http://127.0.0.1:3012`. Gut-check CLI y navegador interno correctos.
- Informe y capturas archivados en
  `reports/verification-doctrine-flex-2026-10-03`; last-run passed, sin fallos.
  Capturas finales de ambos articulos en escritorio y movil inspeccionadas.
- Rastreo `reports/adsense-local-2026-10-03-doctrine-flex-final.json`:
  330 rutas HTTP 200, 105 entradas de sitemap sin cambios, 106 respuestas
  indexables contando variantes con canonical y 224 noindex. Cobertura del
  manifiesto 159 rutas y sin rutas pendientes en la cola.
- Ninguna ficha activa ya la clasificacion automatica de generica. No es un
  certificado editorial del resto del sitio. Persisten dos avisos por el
  umbral de 500 palabras de `/news` y `/counters`; no se agrega relleno para
  cumplir un umbral que Google no establece.

Un intento de build termino con error nativo 3221226505 al generar paginas;
el siguiente y el build de verify terminaron sin editar la configuracion de
Next. No se atribuye una causa sin pruebas. Separadamente, el helper Vite
consumia recursos por su watcher: tras desactivarlo, devuelve las mismas dos
versiones en menos de un segundo y sigue sin aprobar ni escribir registros.

La consola de los dos articulos no mostro errores. La consulta local de
cuentas de expertos sigue registrando StripeAuthenticationError; las pruebas
anonimas no certifican pagos autentificados ni se han realizado compras.
No se ha hecho push, deploy ni solicitado AdSense. El objetivo global sigue
activo y no se marca el sitio como listo por pasar una suite.

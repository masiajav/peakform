# Revision individual de la ficha de Genji

Estado: texto reescrito, contrastado y leido en navegador interno. QA manual,
suite completa y rastreo final cerrados.

## Alcance editorial

Solo `/heroes/genji`: entradas, shurikens, Dash, Deflect, Blade, movilidad,
perks, amenazas, composiciones, errores y ejercicios concretos de VOD.
Ejemplos hipoteticos del hangar de Gibraltar y hotel en King's Row; seis
FAQ, introduccion y cierre propios. No se inventa experiencia personal,
partidas jugadas, cifras actuales de balance ni resultados garantizados.
Autor y publisher Replaid Lab. Publicacion original 2026-06-26, revision
2026-10-04, fechas visibles y enlace para comunicar correcciones.

## Contraste y limites

Contenido oficial indexado consultado el 2026-10-04:
- https://overwatch.blizzard.com/en-gb/heroes/genji/
- https://overwatch.blizzard.com/es-es/heroes/genji/
- https://overwatch.blizzard.com/es-mx/heroes/genji/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2025/08/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2020/06/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2023/05/

La ficha actual confirma las cinco habilidades, reflejo de proyectiles,
bloqueo de melee y resets por eliminaciones. Los parches live confirman
cancelacion manual de Deflect. No se usan cambios experimentales de 2022,
el kit del evento de abril de 2026 ni poderes de Stadium como kit ranked.
Swift Cuts y Dragon's Thirst son alternativas Minor; Blade Twisting y
Meditation, Major. Blade Twisting aplica a enemigos por debajo de media vida,
no exige una eliminacion previa. Meditation regenera durante Deflect y no
requiere haber prevenido dano, a diferencia de un poder de Stadium.

Las recomendaciones de timing, recorridos y punto de llegada son analisis
de situaciones hipoteticas, no sesiones in-game verificadas. No se afirma
haber comprobado todo el ultimo parche. Se evita presentar Deflect como
inmunidad universal ante beams, area o todos los angulos. No se dan cifras
de combos garantizados ni instrucciones de cancelacion libre de Dash.

## Lectura y QA manual

- Lectura renderizada completa en navegador interno, segunda lectura tras
  corregir la expresion enganosa de un Dash mas corto y una frase sobre Nano
  al doblar esquina. Se explica direccion y superficie, no control libre
  de longitud. Nuevo build aislado para releer el texto corregido.
- Seis FAQ abiertas y leidas; FAQPage con seis respuestas coincidentes.
- Trece destinos internos distintos HTTP 200. Comprobar destinos no aprueba
  automaticamente los textos de las paginas enlazadas.
- Escritorio 1440x900 y movil 390x844: cabecera, habilidades y perks inspeccionados,
  un H1, imagen cargada, sin overflow ni anuncios ni errores de consola.
- Navegacion real en movil: Habilidades -> guia ranked -> atras conserva
  el hash y recupera el H1 de Genji, sin quedarse mostrando la guia.
- Axe 4.12.1 limitado a main: 0 violations, 22 passes, 0 incomplete.
  No certifica accesibilidad completa del sitio.
- Formato editorial compartido existente, sin nuevos hooks ni cambios de
  pagos, autenticacion, base de datos o variables de entorno.

Version comprobada:
`46b60f0129f194033d4845a6c44265458bbe0a14a0417ba4b95273eca3a56aed`.
Solo esta revision puede superar el control de version; no se aprueba por
slug, numero de palabras o longitud. Sin anuncios.

Preview de lectura: `.next-editorial-built-preview/hero-genji-read-2026-10-04`.
No se certifican produccion, CMP, compras reales ni aprobacion de Google.

## Rastreo del build final

Preview `.next-editorial-built-preview/hero-genji-final-2026-10-04`.
Imagen, canonical, un H1, fechas reales, robots explicito index/follow y
ausencia de anuncios comprobados otra vez en navegador interno. Acceso
real desde /heroes y vuelta a la home comprobados: 58 imagenes en main,
ninguna rota, sin overflow ni errores de consola. La navegacion de cliente
se confirma una vez completada, no leyendo el DOM antiguo durante la transicion.

`reports/adsense-local-2026-10-04-hero-genji-final.json`: 330 URLs, todas
HTTP 200; 159 rutas del manifiesto cubiertas y cola agotada. Sitemap 96,
97 respuestas indexables (incluidas variantes canonical) y 233 noindex.
Solo se reincorpora /heroes/genji frente al lote final de Kiriko; nada
se elimina. Dos avisos heurísticos de extension en /counters y /news;
no son un minimo de palabras exigido por Google ni justifican relleno.
Genji tiene 3394 palabras medidas y ningun aviso, pero su revision se apoya
en la lectura individual, no en esa cifra ni en la clasificacion automatica.

301 unitarios, TypeScript sin emitir y diff check correctos. Seis recorridos
focalizados de Ana, Kiriko y Genji pasan en desktop/movil; informes en
`reports/verification-hero-genji-2026-10-04-focused`. Los hashes de Ana y
Kiriko no cambian. `npm.cmd run verify` final correcto: lint, 301 unitarios,
build de produccion aislado y 684 Playwright desktop/movil, sin retries
(8.1 minutos E2E). Informes finales y capturas en
`reports/verification-hero-genji-2026-10-04`; last-run passed, failedTests vacio.
Capturas de cabecera desktop/movil inspeccionadas y habilidades/perks
comprobados en navegador interno. Sin push, deploy ni solicitud a AdSense.

Las consultas locales a Stripe siguen registrando StripeAuthenticationError
con identificadores redactados. No se cambian credenciales ni flujo de
compra, y estas verificaciones no certifican pagos reales autenticados.

# Preparacion de revision de la guia ranked de Reinhardt

4 de octubre de 2026. Investigacion, no aprobacion editorial. No se modifica
el articulo ni se registra una version revisada en este documento.

Ruta existente: /guides/como-jugar-reinhardt-ranked-overwatch.

## Lectura y problemas concretos

Leidos el modelo completo de Reinhardt en ranked-hero-guides.ts y el renderer
RankedHeroGuideArticle.tsx. Main local leido completo en el navegador interno;
las respuestas FAQ se han leido en el modelo, no se han abierto manualmente
en esta comprobacion inicial. La revision de /heroes/reinhardt no certifica
esta otra guia.

- La respuesta rapida ordena bajar barrera y recuperar vida al llegar a una
  esquina sin distinguir los angulos que siguen abiertos o una retirada aliada.
- "Cancelar desplazamientos" con Charge no explica una interaccion concreta.
  Es mejor desarrollar cancelacion manual y final de la ruta sin prometer
  control universal de habilidades enemigas.
- "Bloquear o limpiar Earthshatter" mezcla prevenir el impacto con quitar un
  derribo aplicado. Suzu no limpia hard knockdowns aplicados como Shatter.
- "La pantalla rival ya tenga otra decision pendiente" no indica que observar.
  Faltan senales visibles: barrera, direccion del Tank, llegada de los DPS y
  curacion disponible, sin inventar un contador exacto de ultimates.
- Las secciones generales repiten la ficha del heroe. La guia ranked necesita
  desarrollar decisiones y un replay hipotetico propio, no otra lista del kit.
- Faltan ejemplos especificos de avance, retirada y dificultad de altura,
  mostrando cuando adaptarse o hacer swap, sin afirmar experiencia personal.

## Contraste primario

Consulta oficial del 4 de octubre, ademas de la investigacion de la ficha:

- https://overwatch.blizzard.com/ko-kr/news/patch-notes/live/2024/06/
  Resultado indexado completo: Suzu deja de limpiar hard knockdown stuns;
  la explicacion distingue Earthshatter de Sleep Dart. No importar los
  valores antiguos de cooldown a una guia actual.
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2023/05/
  Opciones de Reinhardt, incluido Hide Charge Cancel Text. Evidencia de
  cancelacion manual, no de inmunidad general ni de todos los pins posibles.
- https://ga.overwatch.blizzard.com/en-gb/news/patch-notes/live/2023/10/
  Resultado de Charge Cancel Input y alternativas de binding.

Los resultados de junio de 2026 mezclan experimentos temporales y Stadium
con otros cambios. No se usa el texto de esos modos como kit normal de ranked.
Las situaciones tacticas propuestas deben presentarse como ejemplos
hipoteticos, no como partidas jugadas por el autor.

## Fechas que necesitan comprobacion

El modelo comparte publishedAt 2026-05-10 y modifiedAt 2026-09-05 con otras
seis guias. El primer commit encontrado para este fichero es 5bfcd1c, del
6 de septiembre. Esa discrepancia no demuestra por si sola que la publicacion
de mayo sea falsa: podria proceder de contenido anterior o migrado.
Conservar el historial mientras se busca evidencia; no sustituir una fecha
desconocida por otra supuestamente real. La proxima revision debe tener su
fecha efectiva y no cambiar las fechas de las otras seis guias por arrastre.

## Carencia del quality gate

La rama getRankedHeroGuide del detalle devuelve metadata y renderer sin
decision editorial. sitemap agrega todos los RANKED_EDITORIAL_GUIDE_SLUGS.
El comentario "hand-reviewed" del listado no es evidencia de una revision
individual. Estas siete rutas no estan sujetas al registro de version exacta
usado por heroes, counters y composiciones.

La siguiente implementacion debe conectar ambos puntos al control de
version, cubrir invalidacion por ediciones y conservar las siete rutas HTTP
200 sin anuncios. No registrar las siete por pertenecer al listado ni
aprobar el texto por cantidad de palabras. La guia de Reinhardt debe quedar
registrada solamente despues de contraste, lectura final, FAQ, enlaces y
revision visual desktop/movil. Los cambios previstos en indexacion deben
documentarse y contrastarse con las pruebas existentes.

## Verificacion prevista

Respuesta directa propia, ejemplos, decisiones y VOD; title y description
alineados, canonical invariable, autor Replaid Lab y fechas justificadas.
Lectura completa del render corregido y FAQ abiertas, retrato y enlaces,
back desde la ficha y rutas relacionadas. Contraste WCAG del main y capturas
desktop/movil. Suite sin cache, unitarios, build, Playwright y rastreo de
sitemap. Esto sigue pendiente; no se certifica una pagina por esta preparacion.

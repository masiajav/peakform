# Preparacion de revision individual de Shion - 4 de octubre de 2026

Ruta conservada: /heroes/shion. Autor publico: Replaid Lab.
Investigacion y lectura inicial; no es aprobacion ni implementacion nueva.

## Lectura previa

Leidas las constantes, habilidades, perks y ocho FAQ del route de heroes,
y todos los bloques JSX de Shion. Leido completo el main renderizado, con
las ocho FAQ visibles, entrando desde /heroes en el navegador interno.
La ficha es una implementacion especial, no un HeroPillar del modelo comun.
El quality gate la mantiene accesible, noindex/follow y sin publicidad.

Problemas concretos:

- El nerf del 25 de junio sigue presentado como el ultimo ajuste.
- Execution conserva recovery 0.4s a pesar de un ajuste posterior a 0.3s.
- "Recien estrenada" y "primeros counters" ya no reflejan octubre.
- Fecha visible 28 de junio distinta de dateModified 24 de julio. Publication
  15 de junio existe en schema, pero no se muestra como tal al lector.
- Faces of Death se describe como temporal; la ficha actual no lo limita asi.
- Evade no explica que la proteccion breve es exceso de salud; evitar que se
  interprete como invulnerabilidad o una retirada garantizada.
- "El error mas comun", "parece mas fuerte", "encaja perfecto" y "brilla"
  no tienen prueba estadistica y sustituyen decisiones por valoraciones.
- La distraccion se da por util solo porque dos rivales se giran, sin mirar
  si los companeros podian aprovechar ese tiempo.
- Habilidades, consejo inicial, dos introducciones y FAQ repiten la misma
  secuencia de entrada y salida. No resuelven casos distintos.
- El video debe conservarse como enlace/recurso util; no inventar prueba de
  haberlo visto ni su fecha real de subida. UploadDate actual sin comprobacion
  independiente. Mantener contenido historico de balance, pero fecharlo y
  contextualizarlo, no borrarlo para simplificar la nueva pagina.

## Referencias primarias consultadas el 4 de octubre

- https://overwatch.blizzard.com/en-us/heroes/shion/
  Ficha actual indexada: Kira Pistols, Execution con carga que estrecha
  dispersion, Joyride con reactivacion para desmontar y lanzar la moto,
  Evade con exceso de salud breve y Satsuriku Spree con tres avances.
  Damage/Flanker. No importar Recall de Tracer, vuelo libre, invulnerabilidad
  o velocidad/tiempos no indicados por esta ficha.
  Minor Rapid Reload/X Machina; Major Refuel/Faces of Death. Son elecciones
  alternativas; Faces of Death concede los otros subroles de Damage,
  no es una activacion temporal descrita por esta fuente.
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/06/
  Hotfix 25 junio: tamano de proyectil de Execution 0.17 a 0.07, recovery
  0 a 0.4s. Historico, no el ultimo estado demostrado.
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/7/
  Ajuste posterior de julio: recovery de Execution 0.4 a 0.3s; impacto
  de Joyride mientras se conduce 60 a 30. No mezclar dano de impacto durante
  conduccion con lanzamiento/detonacion de moto. La fecha exacta de ese
  bloque requiere lectura completa antes de titularlo como parche fechado.
  2 julio: arreglada Execution durante recarga. Joyride infinito figura en
  partidas personalizadas, no en kit normal.
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/
  Lanzamiento 16 junio y correcciones de Joyride y melee durante ultimate.
  Distinguir retail de Community Crafted y Stadium.
- https://overwatch.blizzard.com/en-gb/news/24271881/
  Contexto del lanzamiento de Season 3 y clan Hashimoto. No copiar su
  lenguaje promocional como consejo de ranked ni inventar lore.

Busquedas dirigidas a agosto, septiembre y octubre devolvieron tambien
paginas de otros meses y una URL indexada malformada. No prueban ausencia
de mas cambios; no llamar al ajuste de julio "ultimo parche" sin una revision
adicional. No se ha hecho una prueba in-game ni visto el video.

## Reescritura prevista

Conservar ruta, retrato local, contexto historico de balance y recurso en
video. Explicar una llegada concreta de Joyride, el desmontaje, municion,
Evade para corregir un duelo y trayectoria de los tres avances de ultimate.
Seleccionar ejemplos distintos de mapa tras leer sus fichas y contrastar
las interacciones que se afirmen. No sustituir informacion desconocida por
opiniones de rendimiento o un falso tier del meta.

Introducir modelo revisable por version, fechas consistentes, respuestas
rapidas propias, FAQ y enlaces realmente relacionados. No registrar la
revision hasta leer todo el nuevo render y comprobar visualmente desktop
y movil, imagen, video, enlaces, metadata y suite completa.
# Contraste posterior y borrador

Lectura directa del HTML oficial (Invoke-WebRequest, sin escrituras) de
https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/7/ confirma
que el ajuste Execution 0.4 -> 0.3 y Joyride al conducir 60 -> 30 pertenece
al 14 de julio, no al hotfix del 2 de julio.
La misma lectura de /2026/8/ situa la deteccion del lanzamiento por suelo
1.5 -> 1 metro en el bloque del 11 de agosto, no el del 14 de agosto.
/2026/9/ no menciona Shion en el documento consultado; no se infiere de
ello que no puedan existir cambios posteriores no encontrados.

Implementado modelo individual y renderer revisado, preservando fecha
original 15 de junio, URL, retrato, video 9abTdz8uD3g y opinion historica
solicitada por el propietario. Opinion fechada, sin experiencia personal
inventada ni conclusiones de winrate. Se retira VideoObject con uploadDate
no contrastado, no el video. Sombra se distingue entre kit DPS y rework
anunciado para Season 5. Pendiente lectura completa del nuevo render,
FAQ, enlaces, QA desktop/movil y suite antes de registrar una aprobacion.
# Identificacion del video

YouTube oEmbed consultado directamente el 4 de octubre devuelve titulo
"No juegues SHION sin saber esto antes | Guia Shion Overwatch" y creador
Ivajpro, canal youtube.com/@Ivajpro. Se corrige el titulo ingles y se retira
la etiqueta EN no contrastada. No se declara haber visto el video ni se
inventa su uploadDate. La autoria del articulo sigue siendo Replaid Lab.

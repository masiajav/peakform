# Revision individual de Zarya - 4 de octubre de 2026

Ruta: /heroes/zarya. Autor publico: Replaid Lab.
Version: c9703efac0fafa8ad9d171ec42b9b2bb7ed3667cde237f5fb8bdec8d1d8518df.

## Lectura y criterio editorial

Leidos el modelo anterior, su main y las cinco FAQ. Reescrito individualmente
en reviewed-hero-zarya.ts, sin duplicar el resumen generado ni opiniones de
jugadores inventadas. Leido completo el nuevo main y abiertas y leidas las
seis FAQ. Corregidos Particle Cannon y Extra Oomph; releidos ambos bloques
en el build posterior. Se conserva la fecha de publicacion que ya daba el
renderer anterior, 26 de junio, y la revision real del 4 de octubre.

La energia se distingue de salud, cobertura y alcance. Una burbuja que
permite un cruce sin recibir dano no se califica automaticamente de inutil.
Se explica que no se baja manualmente como el escudo de Reinhardt, como
decidir la proyectada frente a entradas y dive y que mirar despues de Grav.
Ejemplos propios de las puertas de University en Oasis y puente/castillo
de Eichenwalde, sin coordenadas de packs ni experiencia personal inventada.

Investigacion en content-research-hero-zarya-2026-10-04.md. Kit y cuatro
perks actuales contrastados con paginas oficiales; distinguidos de Stadium,
eventos, opciones retiradas y reglas de varios Tanks en 6v6. No se importa
teleport al aliado, barrera multiple, curacion periodica o energia 150 a
ranked normal. Energy Lance no exige el antiguo umbral de 50. Se distingue
beam de granadas frente a Matrix sin una afirmacion no contrastada sobre
el proyectil de Grav. No hay promesas de rango o de AdSense.

## Navegacion y QA manual

Preview de build corregido y aislado en
.next-editorial-built-preview/hero-zarya-read-2026-10-04, puerto 3012.
Inspeccionadas capturas de cabecera, habilidades y perks en desktop 1440x900
y movil 390x844. Fondo oscuro y retrato cargado; sin cortes, solapes ni
overflow horizontal observados. Click real a Habilidades, guia de cooldowns
y vuelta al ancla comprobados en ambos tamanos con navegacion completa.

Los 16 enlaces internos unicos del main responden HTTP 200. No se aprueba
por ello su contenido: counter, composicion y mapas necesitan su revision
individual. No anuncios, placeholders, script de AdSense ni errores de
consola observados. Axe 4.12.1 limitado a main: 0 infracciones, 22 passes y
0 pendientes. No es una certificacion de accesibilidad de todo el sitio.

## Verificacion final

Registro manual de esta version despues de lectura y QA. Suite completa
correcta: lint, 325 unitarios en 31 archivos, build y 684 Playwright en
desktop/movil sin retries (10.5 min), incluidos 18 casos de heroes revisados.
TypeScript y diff check correctos. Informes archivados en
reports/verification-hero-zarya-2026-10-04. Capturas finales desktop/movil
inspeccionadas; sin cortes ni solapes observados.

Metadata final comprobada: un H1, title y description propios, canonical,
index/follow, fechas visibles y Article concordantes, autor/publisher Replaid
Lab, BreadcrumbList y seis FAQ. Axe final: 0 infracciones, 22 passes, 0
pendientes en main. Rastreo final de 330 URLs, todas HTTP 200; 102 en sitemap,
103 respuestas indexables incluidas variantes canonical y 227 noindex.
159 rutas del manifiesto cubiertas; dos avisos de extension de hubs y sin
pares por encima del umbral comparativo, sin que ello pruebe calidad.
Solo /heroes/zarya entra en sitemap frente a Tracer; ninguna URL eliminada.
No significa que Google haya indexado esas URLs.
No se modifican pagos, autenticacion, APIs ni base de datos en este lote.
Mantener sin anuncios; el sitio completo aun no esta listo para AdSense.
Datos legales autorizados, CMP configurado, produccion, Search Console y
checkout real siguen pendientes. No hay push, deploy ni solicitud a Google.

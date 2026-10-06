# Preparacion de revision individual de Cassidy - 4 de octubre de 2026

Lectura completa del modelo antiguo en hero-pillars.ts y del main renderizado
de /heroes/cassidy en la preview final de Winston, incluidas las cinco FAQ.
Esto no constituye aprobacion. La ficha sigue noindex/follow y sin anuncios.

Carencias observadas: resumen generado mezcla jugar Cassidy con jugar contra
el, repite facts y frases como "timing, no por inercia ni por ego". Faltan
Flashbang y perks. Errores y VOD son demasiado breves, sin explicar que mirar.
"No disparar al Tank" es demasiado absoluto: presionar a un Tank sin defensa
puede servir al equipo. Roll para recargar no es siempre malo. Faltan ejemplos
de mapa, limites del anti-dive y resultados concretos al usar Deadeye.

## Referencias primarias consultadas

- https://overwatch.blizzard.com/es-es/heroes/cassidy/
- https://overwatch.blizzard.com/en-gb/heroes/cassidy/?mobile-app=true&theme=false
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/02/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/7/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2024/06/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2024/09/

La busqueda recupera contenido oficial; abrir directamente las fichas en-us
y es-es devuelve 403. No se declara haber abierto esos documentos con exito
ni haber probado las mecanicas dentro del juego.

Ficha actual: primario de Peacekeeper preciso, secundario dispara municion
restante; Combat Roll reduce dano y recarga; Deadeye fija objetivos y dispara.
La ficha enumera tres habilidades pero sus perks hacen referencia a Flashbang;
esa omision de la web no prueba que Flashbang no exista. Notas de junio 2024
restauran Flashbang con Hinder, no el stun completo antiguo. Septiembre 2024
confirma Hinder. Evitar cifras actuales basadas solo en ese parche antiguo.

Perks normales actuales: Minor Bang Bang (segunda Flashbang, mas distancia,
menos dano por granada), Giddy Up (velocidad tras Roll que decae); Major
Rollin' Round-Up (curacion por bala recargada con Roll), Silver Bullet
(sustituye secundario por tiro perforador con sangrado; Roll y Deadeye resetean
su cooldown). La ficha distingue estos perks de poderes de Stadium. Febrero
2026 retira Gun Slingin' y anade Rollin' Round-Up. Julio 2026 reduce tamano
del proyectil de Silver Bullet: no prometer un remate facil o cifra fija.

Community Crafted de junio 2026 permite invulnerabilidad en Roll, Deadeye
atravesando barreras y municion extra por bajas. Son cambios del evento,
no kit de ranked. Stadium incluye Hot Potato magnetica, autoaim y otros
resets/curaciones; no trasladarlos al kit normal ni confundir su Silver Bullet
con el perk homonimo. Past Noon de 2025 no aparece entre perks actuales.

## Redaccion pendiente

Articulo propio centrado en que esquina defender, a quien ayudar y cuanto
puede alejarse de los Supports. Ejemplos separados de rutas y high grounds,
sin vender un pick automatico contra Tracer o Genji. Explicar primario frente
a Fan the Hammer, Flashbang sin garantia de baja, recarga con retirada real
y Deadeye con cobertura/linea y respuesta rival. No maximizar palabras ni
copiar los ejemplos o la conclusion de otros heroes.

Verificar destino de cada enlace antes de elegir label, lectura completa
del nuevo render y FAQ, QA visual desktop/movil, metadata y suite antes de
registrar la version. Este documento solo prepara la revision siguiente.

## Borrador individual implementado

reviewed-hero-cassidy.ts sustituye el bloque antiguo, sin cambiar rutas,
componentes, APIs, DB ni pagos. Ejemplos propios de hotel y estatua en
King's Row y cambios de lado en la estacion de Midtown. Incluye primario,
Fan the Hammer, Flashbang, Roll, Deadeye y pasiva Sharpshooter. La ficha
oficial actual confirma reduccion de cooldown de movimiento por criticos.

Contraste adicional: ficha en-us actual mediante busqueda (rastreo del dia
anterior), notas oficiales de junio 2024 para Hinder sin stun completo y
de agosto 2025 para sustitucion de Fan the Hammer por Silver Bullet. No se
usan cifras antiguas como balance actual. La nota de junio 2026 distingue
Community Crafted de cambios de kit normal y de Stadium. Se mantiene esa
separacion, sin invulnerabilidad normal de Roll, autoaim ni granada magnetica.

Antes de leer el render se pulieron intro, explicacion del primario y una
frase confusa sobre marcas de Deadeye. Se retiro una afirmacion sobre
perforacion de barreras porque la referencia oficial solo dice disparo
perforador y no permite certificar todas sus interacciones. No se promete
un remate ni una combinacion numerica de dano. Pendiente lectura completa,
FAQ, QA y registro exacto. No se aprueba la ficha por existir este borrador.

## Estado posterior

Lectura completa del nuevo render y de las seis FAQ realizada. Tres frases
pulidas despues de leer y releidas en la preview corregida. QA visual,
enlaces y registro exacto completados. La suite final y el rastreo tambien
terminan correctamente; evidencia en content-review-hero-cassidy-2026-10-04.md.
La ficha queda index/follow y sin anuncios, no se publica ni se solicita
otra revision de AdSense por cerrar este articulo.

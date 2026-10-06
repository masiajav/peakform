# Lectura inicial de las siete guias ranked

4 de octubre de 2026. Preparacion editorial y tecnica. No aprueba ninguna
de estas rutas ni modifica el contenido servido.

Leidos completos los siete modelos de ranked-hero-guides.ts y su renderer.
Solo la guia de Reinhardt tiene, en este lote, una lectura adicional del main
local. La inspeccion de modelos no sustituye abrir las siete paginas y FAQ.

## Problemas por articulo

- Ana: Sleep y granada necesitan decisiones despues del recurso, no solo
  consejos de guardarlos. El texto de Nano no debe tratar toda espera de dos
  peleas como error ni asumir que un Winston dentro de la backline es un buen
  destinatario. Separar curacion disponible, vida, seguimiento y retirada.
  Un ejemplo propio debe mostrar como se pierde vision durante una rotacion
  y que se revisa en el replay, sin copiar la ficha de Ana.
- Kiriko: "limpiar una ultimate" y "un control" generalizan Suzu. Separar
  invulnerabilidad preventiva, cleanse de anti-heal/Sleep y hard knockdown ya
  aplicado. No describir el viaje de ofudas como un tiempo ilimitado para
  atacar. Ejemplo de conservar la salida y lectura del destino de Swift Step,
  con alternativa si el aliado va a morir.
- Genji: el timing se presenta con "medio segundo" como regla generica; el
  disparo del Tank no garantiza seguimiento. Revisar Dash como escape o acceso,
  cuando cancelar Deflect y continuidad tras primera baja. Distinguir forzar
  una defensiva de ganar realmente el objetivo; no dar por ganada una pelea
  por la cantidad de cooldowns gastados.
- Cassidy: "dos cooldowns para regresar" no describe su movilidad normal y
  parece una formula heredada. Nombrar la utilidad actual despues de contrastar
  el kit, explicar distancia a la retirada, peel y cuando abandonar el duelo.
  No confundir acierto mecanico con posicion como causa unica de la aim.
- Reinhardt: ver content-research-ranked-reinhardt-2026-10-04.md. Corregir
  consejos incondicionales de barrera, Charge ambiguo y cleanse de Shatter.
  Dar prioridad a decisiones de ranked/VOD propias de esta guia.
- D.Va: "si tu Winston entra" presupone dos Tanks aliados sin explicar que es
  6v6; no es un ejemplo valido de role queue 5v5. "Una ultimate canalizada"
  no es una categoria que Matrix niegue por completo. Separar proyectiles,
  rayos y melee; revisar la continuidad del demech/bomba sin prometer que
  la explosion devuelve automaticamente un mech.
- Winston: "Jump Pack tardara mas en volver" se liga a saltar desde lejos y
  sugiere un cooldown dependiente de la distancia. La dificultad es la falta
  de seguimiento y el tiempo de exposicion, no esa regla. "La burbuja corta
  relaciones" y "curar ultimates enemigas" son frases poco claras. Nombrar
  lineas de vision, curacion, barreras y carga de ultimates sin abstracciones.

## Enfoque de la reescritura

Cada guia debe desarrollar un problema de ranked, no recontar el kit entero
ni usar siete variaciones de la misma introduccion. Incluir ejemplos
hipoteticos propios, que observar antes del engage, decision tras gastar un
cooldown y que comprobar en una VOD. Evitar rellenar por longitud y recordar
que una recomendacion no garantiza ganar ni subir de rango.

La investigacion de las fichas revisadas sirve como punto de partida de
habilidades, pero no certifica este texto nuevo. Contrastar cualquier
interaccion adicional con fuente primaria y distinguir perks/modos temporales
de la partida normal. No simular experiencia in-game ni incluir un apartado
publico de SEO/proceso/fuentes artificiales.

## Gate, fechas y compatibilidad

Las siete ramas ranked del detalle y el sitemap omiten hoy el registro de
version exacta. Conectar indexacion y sitemap a una misma decision, no solo
una lista de slugs. Mantener HTTP 200, rutas, retratos, FAQ, enlaces y ausencia
de anuncios para pendientes. No conceder siete aprobaciones al modificar una
plantilla. Registrar individualmente solo las versiones efectivamente leidas
y verificadas.

Las fechas comunes de mayo/septiembre no tienen origen confirmado en esta
lectura. La primera incorporacion del fichero en Git el 6 de septiembre no
prueba que no hubiera publicacion anterior. Investigar antes de afirmar una
fecha original o cambiarla; una revision actual no puede retrofecharse.
No cambiar fechas de los otros articulos al editar uno.

Las pruebas antiguas de HTTP, title o enlaces no son aprobaciones editoriales.
Ampliar con invalidacion de version, robots y sitemap, schema/FAQ visibles,
no ads, retratos, overflow, console y recorridos reales. Verificar impacto en
guias y filtros, sin tocar pedidos ni pagos. Ejecutar una suite final por lote
coherente, no usar un build anterior para certificar cambios posteriores.

guide-discovery distingue bien accesibilidad de indexacion: usa el modelo
ranked para el titulo, extracto y fecha de las tarjetas. Mantener esa
transformacion aunque un articulo permanezca noindex; no volver al titulo
antiguo de base de datos ni ocultarlo de sus filtros. La home tambien permite
descubrir estos slugs. Comprobar el branch dinamico de sitemap para que una
fila de base de datos del mismo slug no eluda el gate del articulo que se
renderiza. Las pruebas deben representar ese caso, no solo la lista estatica.

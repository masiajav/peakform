# Comprobacion publica de produccion - 4 de octubre de 2026

Lectura solamente. No push, deploy, cambios de cuenta, compras o solicitud de
revision. Informe: reports/adsense-production-2026-10-04.json.

## Diferencia entre local y publicado

Rastreo de 330 URLs publicas, todas HTTP 200, con 159 rutas del manifiesto
como inventario adicional. 105 URLs de sitemap; 106 respuestas indexables
contando variantes canonical; 224 noindex. Sin rutas restantes en la cola.
No certifica rutas privadas ni otras URLs que este inventario no descubre.

La ficha publicada de D.Mon conserva el titulo antiguo y no contiene esta
revision del 4 de octubre. Home y Legal tampoco muestran la fecha nueva;
la ausencia de una fecha por si sola no prueba un despliegue, pero la ficha
de D.Mon si permite comparar directamente contenido antiguo y revisado.
HTTP 200 de ads.txt y robots.txt: este ultimo permite acceso publico y
excluye areas privadas. No se observan scripts o slots de AdSense en el
HTML de home, D.Mon o Legal; no es comprobacion global de ejecucion JS.

## Senales de contenido

El comparador automatico encuentra 1335 pares sobre su umbral y 106 paginas
con aviso de similitud. No se confunde ese umbral con un criterio de Google.
Un aviso adicional es la extension de /counters; no justifica anadir relleno
para superar 500 palabras. El informe no certifica calidad por longitud.

Lectura completa en navegador de /team-comps/brigitte y /team-comps/doctrine:
repiten descripciones, condiciones y limitaciones de dive, poke y rush en
ambos formatos, sustituyendo el nombre del Support. No explican tareas
propias de Repair Pack/Whip Shot frente a las decisiones de Imbuir/drones.
Doctrine presenta recomendaciones definitivas pese a no estar lanzado.
La ficha de Doctrine devuelve noindex/follow; sigue accesible para lectores.
Noindex no convierte esa experiencia en util ni demuestra que el evaluador
de AdSense la ignore.

Estas observaciones son compatibles con una percepcion de contenido en serie.
No se conoce la evaluacion interna de Google ni se atribuye con certeza el
rechazo a una URL concreta. Las revisiones locales deben publicarse y
comprobarse en produccion antes de pedir otra revision.

## Pendiente antes de considerar el sitio preparado

- Terminar revision individual del contenido publico, incluidos noindex.
- Completar titular y domicilio profesional con datos autorizados; no inventar.
- Publicar los lotes revisados con autorizacion y repetir QA en produccion.
- Comprobar sitemap/rastreo con Search Console y estado real de AdSense.
- Configurar y probar el CMP certificado real antes de servir publicidad.
- Verificar funcionamiento autentificado de marketplace/checkout sin compras
  reales no autorizadas. Las pruebas anonimas no prueban cobros reales.

Referencias oficiales consultadas hoy:
https://support.google.com/adsense/answer/7299563?hl=es
https://support.google.com/adsense/answer/12176698?hl=es
https://support.google.com/adsense/answer/13554116?hl=en
https://support.google.com/adsense/answer/9804260?hl=en

Google pide contenido propio util y navegacion clara. La verificacion de
propiedad, el sitemap, el numero de palabras y los tests no son aprobacion.
El CMP/TCF requiere configuracion real: CMP_READY no sustituye ese control.

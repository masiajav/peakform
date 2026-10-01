# Revision de contenido: segundo lote

Revision real: 1 de octubre de 2026. El objetivo general sigue activo; este
documento no certifica que el sitio entero este listo para AdSense.

## Trabajo realizado

Nueve articulos independientes reemplazan nueve guias breves: Junker Queen,
Echo, Pharah, Soldier: 76, Widowmaker, Brigitte, Illari, Lucio y Zenyatta.
Cada articulo conserva su identidad y fecha de publicacion originales, tiene
autoria de Replaid Lab y una fecha de revision propia. El lote del 30 de
septiembre conserva su fecha, aunque se publique otra revision despues.

Las nueve antiguas rutas de video redirigen permanentemente a su articulo.
Se preservan el video, su canal, idioma y fecha; el autor del video no se
presenta como autor del texto nuevo. No se han escrito datos de balance
numericos ni se ha atribuido experiencia personal inexistente.

Los 17 articulos revisados en ambos lotes siguen fuera del sitemap, con
noindex y sin anuncios. No se aumenta el inventario por volumen.

## Verificacion y anuncios

La meta google-adsense-account se genera en servidor cuando existe un ID
valido. Es el metodo de verificacion documentado por Google que no requiere
ejecutar adsbygoogle.js. El modo de revision bloquea script y slots incluso
si los flags de aprobacion y CMP estan activos. Se conserva ads.txt.

No se ha configurado un CMP en una cuenta externa ni activado publicidad.
El flag CMP_READY no configura un CMP: solo debera activarse despues de
configurar y comprobar uno certificado. Tampoco se ha accedido a AdSense,
solicitado revision, cambiado su estado ni probado cobros reales.

Los tests de navegador utilizan un ID ficticio dentro de .next-e2e, con
aprobacion y CMP en true y revision en true, para demostrar que la
verificacion no carga el script ni inventario. No cambiar esos valores
de prueba por una configuracion de produccion.

## Experiencia de lectura

- Las guias muestran tiempo de lectura aunque tengan un video adicional.
- Texto y fechas de las guias dinamicas tienen contraste minimo 4.5:1
  sobre las superficies de articulo comprobadas.
- La navegacion publica dispone de un menu de icono en pantallas estrechas,
  con estado aria-expanded, enlaces accesibles, cierre con Escape y retorno
  de foco. No se ha modificado AppNav ni la navegacion de areas privadas.
- El preview usa .next-editorial-preview, separado del build y Playwright.

## Rastreo de todo el inventario anterior

Se anadio AUDIT_SEED_FILE para volver a visitar rutas que ya no aparecen
en los menus. Una pagina no se considera resuelta por dejar de enlazarla.
El auditor registra redirecciones y evita areas privadas y endpoints API.

El informe local reports/adsense-local-2026-10-01.json vuelve a comprobar las
247 URLs de la linea base: 105 entradas de sitemap, ninguna anadida o
retirada; 106 respuestas con indexacion permitida y 141 con noindex.
La diferencia de una URL sigue siendo la variante canonical de Pick Lab.

Quedan 25 rutas de guias breves del inventario inicial. Los dos articulos
de rol que tenian que revisarse por separado y las fichas genericas de
counters/composiciones tambien siguen pendientes. No interpretar la
clasificacion automatica por extension como un requisito de Google.

## Evidencia disponible

- 145 tests unitarios superados, con controles de fechas, consolidacion,
  duplicacion de parrafos, politica publicitaria y rastreo de rutas antiguas.
- Lint superado.
- Build de produccion superado.
- Suite completa inicial: 198 pruebas de navegador superadas.
- Tras mejorar navegacion y contraste: 42 pruebas de navegador superadas,
  incluidos los 17 articulos en escritorio y movil, menu, contraste y
  verificacion sin ejecucion de anuncios.
- Ejecucion final de npm run verify: lint, 145 tests unitarios, build de
  produccion y las 204 pruebas completas de navegador superados.
- Revision manual de Echo y menu movil en navegador interno: sin errores
  observados, anuncios, pantalla blanca ni overflow horizontal.

Queda seguir la revision de contenido y realizar la auditoria final del sitio.
El servidor local registro errores de autenticacion de Stripe al consultar
algunas cuentas. No se han cambiado credenciales, cuentas ni codigo de pagos;
esta verificacion no demuestra que los cobros reales funcionen.

## Referencias tecnicas

- [Verificacion por meta o ads.txt](https://support.google.com/adsense/answer/12169212).
- [Contenido y navegacion para AdSense](https://support.google.com/adsense/answer/10015918).

Estas referencias pertenecen a la documentacion interna. No se han anadido
apartados artificiales de fuentes a las guias publicas.

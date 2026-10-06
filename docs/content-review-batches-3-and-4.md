# Revision de contenido: lotes tercero y cuarto

Revision real: 1 de octubre de 2026. El objetivo global permanece activo.
Este documento no certifica calidad de todo el sitio, cumplimiento legal
completo ni aprobacion futura de AdSense.

## Articulos revisados

Se han sustituido doce guias breves por articulos propios: Mauga, Ramattra,
Wrecking Ball, Bastion, Hanzo, Mei, Juno, Lifeweaver, Junkrat, Reaper,
Torbjorn y Venture. Las doce rutas existentes se mantienen sin redireccion
porque no tenian otro articulo canonico equivalente. Conservan el ID, la
fecha original y los datos del video y de su canal. La autoria del texto
es Replaid Lab, distinta de la autoria del video.

Cada articulo incluye decisiones concretas, situaciones de mapa, errores,
revision de VOD, tres FAQ y enlaces relacionados. No se han inventado cifras
de balance, probado resultados de ranked ni atribuido experiencia personal.
El contenido tactico es orientacion editorial, no una garantia de resultado.

Los 29 articulos de los cuatro lotes permanecen accesibles con noindex y sin
anuncios hasta terminar el control global. Ninguno entra automaticamente en
el sitemap por haberse ampliado.

## Control tecnico de publicacion

Las guias de base de datos ya no se aprueban solo por su longitud. Se exigen
titulo y descripcion, autor, fechas validas, respuesta inicial, secciones
distintas y enlaces relacionados. Se rechazan parrafos repetidos, relleno de
palabras e instrucciones internas. Una guia no publicada tampoco es elegible.

Estos controles son condiciones necesarias, no suficientes: falta seguir
con la revision semantica, entre paginas y visual antes de considerar un
articulo terminado. Los umbrales de longitud son politica interna, no un
minimo de palabras exigido por Google.

Las consultas de home, listado, articulos relacionados, sitemap y panel de
calidad recuperan los campos necesarios para aplicar el mismo control. No
se ha cambiado el contenido ni el esquema de la base de datos.

El auditor distingue atributo alt ausente de alt vacio. Un alt vacio puede
ser correcto en retratos decorativos junto al nombre visible del heroe;
no se considera automaticamente correcta cualquier imagen sin descripcion.

## Fechas y confianza

Se ha corregido portada, noticias, ficha de Doctrine, noticia de anuncios y
archivo de BlizzCon: el trial termino el 14 de septiembre, Season 5 esta
anunciada para el 6 de octubre y el vale mitico se obtiene y canjea hasta
el 5 de octubre. BlizzCon se presenta como evento terminado, manteniendo
horarios originales peninsulares y de Canarias y fecha de publicacion.

Las fechas de revision y lastModified se actualizan solo en las paginas
realmente modificadas. La FAQ visible coincide con el schema de la noticia.
La pagina de noticias dispone ahora del elemento main que faltaba.

Privacidad explica cuenta, pedidos, proveedores presentes en el codigo,
cookies de sesion, Analytics, almacenamiento local de Pick Lab, YouTube,
publicidad y solicitudes de derechos. No promete borrados automaticos ni
ubicaciones de datos o plazos no comprobados. Deben concretarse conservacion,
garantias de transferencias y responsable cuando se confirme la operativa.

Se han corregido clausulas absolutas sobre cancelacion, suspension y fuero,
y la afirmacion incorrecta de que no guardamos ningun dato de pago. No se han
modificado precios, comisiones, endpoints de cobro o reembolso. El aviso
legal todavia necesita identificacion real del titular y revisar fiscalidad,
operativa de desistimiento e informacion contractual. No esta certificado
por un asesor juridico. Se ha solicitado al usuario la identidad y domicilio
profesional que desea publicar; no se han deducido de cuentas privadas.

No se ha configurado una CMP externa, activado publicidad ni solicitado una
revision en AdSense. CMP_READY no sustituye configurar y verificar una CMP.

## Evidencia final

- npm run verify: lint, 148 tests unitarios, build y 248 pruebas Playwright
  de escritorio y movil superados.
- Las primeras cuatro comprobaciones nuevas fallaron: noticias no tenia
  main y un test asumio XML sin saltos de linea. Se corrigio el marcado y
  se analiza el sitemap como XML, sin debilitar la comprobacion de fechas.
- La auditoria con las 247 URLs de la linea base produce
  reports/adsense-local-2026-10-01-batch-4.json: 105 rutas de sitemap,
  106 respuestas indexables y 141 noindex. La comparacion de pertenencia
  al sitemap no muestra rutas anadidas o retiradas.
- 16 paginas tienen avisos automaticos, principalmente similitud de guias
  pendientes y dos composiciones genericas. La advertencia de menos de
  500 palabras en /news y /counters no es una infraccion demostrada ni
  obliga a rellenar un directorio con texto.
- Navegador interno: revision de Mei, Mauga, privacidad movil y noticia de
  Doctrine movil sin errores observados, fondo blanco ni desbordamiento.
- git diff --check superado; solo avisos de conversion LF/CRLF.

El preview independiente sigue en http://127.0.0.1:3012. Los registros
conservan errores antiguos de recompilacion que no aparecen en el rastreo
final. Las consultas de expertos registran StripeAuthenticationError en
local: no se han cambiado credenciales ni probado operaciones financieras.
La suite no demuestra que una compra real funcione en produccion.

## Pendiente real

Trece guias del inventario inicial: Sierra, Domina, Hazard, Roadhog, Anran,
Emre, Freja, Sombra, Symmetra, Vendetta, Jetpack Cat, Mizuki y Wuyang.
Roadhog y Sombra necesitan distinguir el kit disponible de los reworks de
Season 5; no presentar datos anunciados como balance ya aplicado.

Tambien quedan las dos guias de rol DPS/Support, las fichas genericas de
counters y composiciones, la revision final de frescura y el cierre de
calidad por pagina. Dejar una ruta fuera de los menus o poner noindex no
equivale a mejorar su contenido. No se ha completado ese objetivo global.

Tras terminar el contenido: confirmar titular y operativa legal, comprobar
proveedores y consentimiento, preparar/publicar solo cambios autorizados,
auditar produccion, revisar Search Console y solicitar AdSense cuando se
hayan rastreado las correcciones. No prometer una fecha de aceptacion.

## Referencias de comprobacion

- https://overwatch.blizzard.com/en-gb/news/24294376/
- https://overwatch.blizzard.com/en-gb/heroes/junkrat/
- https://overwatch.blizzard.com/heroes/reaper/
- https://overwatch.blizzard.com/en-gb/heroes/torbjorn/
- https://overwatch.blizzard.com/en-gb/heroes/venture/
- https://vercel.com/docs/analytics/privacy-policy
- https://support.google.com/adsense/answer/13554116?hl=es
- https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555

Las referencias de comprobacion no se han convertido en bloques artificiales
de fuentes dentro de las guias de jugadores.

# Nueva solicitud de revision: comprobacion previa

Decision operativa: cerrar la ronda actual de contenido y preparar una nueva
solicitud despues de publicar y comprobar los cambios. Esto no declara terminada
la revision integral, no garantiza aprobacion y no habilita anuncios.

## Evidencia actual

El rastreo de produccion termino correctamente. Informe:
`reports/adsense-production-2026-10-05-pre-submission.json`, generado a las
19:25:16 UTC del 5 de octubre. Se consultaron las 330 rutas publicas del
inventario local y sus enlaces: todas respondieron HTTP 200; 105 estaban en
sitemap, 106 respuestas eran indexables y 224 noindex. La cola termino vacia.
Esto no prueba rutas privadas, otros destinos no descubiertos ni calidad
editorial de cada documento.

La home publicada contiene una etiqueta `google-adsense-account` valida. Su
identificador coincide con la linea DIRECT de `ads.txt`, que responde HTTP 200.
`robots.txt` permite acceso publico y mantiene excluidas las areas privadas.
No hace falta cargar anuncios para verificar propiedad mediante la etiqueta.
No se consulto ni modifico el estado de aprobacion de la cuenta.

La home se comprobo con JavaScript en navegador: un H1, sin elementos de
AdSense, sin imagenes cargadas rotas ni overflow horizontal, tanto en escritorio
como a 412 x 915. No se registraron errores de JavaScript. Las solicitudes
capturadas de esta visita no incluyen el script de anuncios. Es una comprobacion
de la home y esa sesion, no una certificacion global de red o consentimiento.
Captura movil: `reports/adsense-production-home-mobile-2026-10-05.png`.

## Lo que aun no esta publicado

Las composiciones de Tracer y Zarya publicadas no contienen la revision del
5 de octubre. Legal y Privacidad tampoco contienen la identificacion autorizada
que si aparece en el preview local de 3021. No volver a pedir revision suponiendo
que Google ya puede leer esas modificaciones.

El preview local se construyo para verificacion, sin un identificador de
AdSense en su meta. Eso no invalida la meta observada en produccion; exige
volver a comprobar la configuracion real despues del nuevo despliegue.
No copiar valores ficticios de los tests a produccion.

El sitemap local y el publicado no contienen exactamente las mismas URLs:
25 entran y 24 salen de indexacion frente a produccion. Es una diferencia del
lote acumulado, no solo de las dos composiciones mas recientes. Las rutas
siguen accesibles. La salida de indexacion se debe comprobar contra el registro
de revision y no confundirse con eliminacion de contenido o un 404.

Entradas: counters de Anran, Baptiste, Freja, Hazard, Illari, Jetpack Cat,
Junker Queen, Junkrat, Juno, Lifeweaver, Lucio, Mauga, Mercy, Mizuki, Orisa,
Pharah, Ramattra, Sigma, Soldier: 76, Sombra, Vendetta, Venture, Wrecking Ball,
Wuyang y Zenyatta.

Salidas: ficha de Doctrine; counters de Ana, Cassidy, D.Va, Domina, Reinhardt,
Shion, Tracer, Winston y Zarya; composiciones de Ana, Cassidy, D.Va, Genji,
Kiriko, Reinhardt, Shion y Winston; guias de ultimates, revision de VOD,
Tank, cambio de heroe, cooldowns y eleccion de dive/poke/brawl.

El comparador de produccion senala 1335 pares de similitud; el local no
encuentra pares sobre su umbral. Es una heuristica, no el criterio de Google,
ni prueba que cada pagina sea original o que se conozca el motivo del rechazo.
Noindex tampoco obliga a AdSense a ignorar una pagina publica.

## Siguiente paso

1. Obtener confirmacion para commit y push. Hay cambios acumulados de contenido,
   seguridad y marketplace; no subir logs, entornos, capturas temporales ni
   artefactos de build, ni alterar trabajo ajeno.
2. Despues del deploy, comprobar las revisiones reales, identificacion, sitemap,
   meta de propiedad, ads.txt, navegacion, imagenes y ausencia de anuncios.
3. Consultar el estado real en AdSense. Si sigue rechazado y permite solicitar
   revision, presentar el sitio actualizado. Si ya esta en revision, no
   duplicar la solicitud. No existe aqui una espera obligatoria inventada de
   14 o 28 dias antes de volver a pedirla.
4. Antes de servir anuncios, verificar aprobacion, CMP configurado y probado,
   preferencias/rechazo/revocacion, slots y elegibilidad de cada articulo.
   Las banderas del codigo no constituyen consentimiento ni aprobacion.

La identificacion fiscal autorizada, la adecuacion completa de los terminos,
la revision editorial pendiente y las pruebas autenticadas del marketplace
siguen sin certificarse. Una solicitud controlada no sustituye estos trabajos
ni convierte el objetivo integral en terminado.

## Referencias oficiales

- Propiedad mediante meta o ads.txt, solicitud y configuracion posterior:
  https://support.google.com/adsense/answer/12169212?hl=es
- Motivos de rechazo y alcance de la revision del sitio:
  https://support.google.com/adsense/answer/81904?hl=es
- Requisitos de CMP para publicidad personalizada en EEE, Reino Unido y Suiza:
  https://support.google.com/adsense/answer/13554116?hl=es

En este cierre se repitio `npm.cmd test`: 359 tests de 41 archivos pasaron.
`git diff --check` termino con codigo 0. No se modifico codigo de la aplicacion
ni se repitio el build o la suite completa de navegador en este cierre; su
evidencia previa esta en el informe del lote Tracer/Zarya y confianza.

No se hizo push, deploy, solicitud de revision ni activacion de publicidad.

Ese estado corresponde al cierre previo a la autorizacion de publicacion.
El usuario autorizo despues commit y push manteniendo publicidad desactivada;
la nueva comprobacion tecnica se registra en `adsense-release-2026-10-06.md`.
La solicitud en la cuenta de AdSense sigue siendo una accion distinta.

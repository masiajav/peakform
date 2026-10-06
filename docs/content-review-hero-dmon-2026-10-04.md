# Revision individual de D.Mon - 4 de octubre de 2026

Ruta: /heroes/dmon. Autor publico: Replaid Lab.
Version: 710bfd45f9484773a522a97535205e187928331288c7414b0fb1c04bd4f84504.

## Lectura y contrastes

Leidos el modelo anterior, el main renderizado y sus FAQ. Reescrito el
articulo individualmente, leido el nuevo main completo y abiertas sus ocho
FAQ. Tras la lectura se corrigieron el dato de disponibilidad y la leyenda
del kit; ambos bloques se releen en el build corregido. Se conserva la fecha
original de publicacion, la URL, el retrato y la imagen del kit existente.

Kit y perks contrastados en la pagina oficial. Propulsors es horizontal;
Beast y piloto tienen armas y decisiones distintas. Beast Within recupera
barrera, no vida propia; Overstrike afecta Surging Strike, no cada ataque.
Las dos elecciones por nivel son alternativas. No se mezclan poderes de
Stadium ni dos Tanks con la cola por roles 5v5. Ejemplos propios de Control
Center y MEKA Base sin inventar geometria, packs o experiencia personal.

Balance del 8 y 17 de septiembre contrastado en patch notes oficiales en-US:
se distinguen transformacion y animacion de Call Mech, falloff del arma de
piloto y armadura 5v5/6v6. No se presentan los valores de lanzamiento como
actuales. Stalwart reduce empujes/ralentizaciones, no inmuniza ante todo CC.
Sombra actual DPS se separa de su futuro rework de Support. Investigacion y
limitaciones en content-research-hero-dmon-2026-10-04.md.

## QA manual de la version

Build corregido aislado en .next-editorial-built-preview/hero-dmon-qa-2026-10-04,
puerto 3012. Main y FAQ completos leidos. Cabecera, kit, perks y balance
inspeccionados a 1440x900 y 390x844; sin cortes u overflow observados. El kit
lazy carga al llegar a su seccion; no se confunde su primera captura antes
de terminar de cargar con una imagen rota. Retrato y kit cargados.

Click al enlace del kit en ambos tamanos: imagen original 1920x1080 cargada,
vuelta al ancla Habilidades. Click a guia de cooldowns y vuelta al ancla
comprobados en ambos tamanos. Veinte enlaces internos del main HTTP 200;
esto no aprueba editorialmente las paginas enlazadas. Un H1, sin publicidad
ni placeholders, sin errores de consola observados. Renderer en servidor,
imagen opcional con dimensiones intrinsecas, leyenda y enlace de 44px minimo;
ningun cambio de APIs, auth, pagos o base de datos en este lote.

El directorio de heroes deja de anunciar el trial de Doctrine como activo:
termino en septiembre. No se da por revisado todo el hub por esta correccion.
Sigue pendiente corregir/revisar su explicacion de subroles.

## Verificacion final

Lint, build limpio, TypeScript y diff check correctos. 334 unitarios en 33
archivos. Primera pasada E2E: 682 correctos y cuatro expectativas antiguas
sobre inclusion de D.Mon y fecha de revision, conservadas en el informe
first-pass. Corregidas esas expectativas sin quitar pruebas; segunda pasada:
686 correctos en 9.5 minutos, desktop y movil, sin retries. Evidencia final
en reports/verification-hero-dmon-2026-10-04 y capturas reviewed-heroes.

Metadata final: un H1, canonical conservado, index/follow, Article con
publicacion 2026-08-06 y revision 2026-10-04, autor/publisher Replaid Lab,
ocho FAQ visibles coincidentes con schema y breadcrumbs. Consola sin errores
observados. Axe WCAG 2 A/AA en main: cero infracciones, 14 comprobaciones
correctas; no certifica accesibilidad global del sitio.

Rastreo final: 330 documentos HTML HTTP 200, 104 URLs sitemap, 105 respuestas
indexables (incluidas variantes canonical), 225 noindex. Kit PNG 200 registrado
como recurso, no como articulo; una prueba cubre recurso roto e inclusion
incorrecta de binarios en sitemap. Solo /heroes/dmon entra respecto a Shion;
ninguna URL eliminada. Dos avisos de longitud de hubs no justifican relleno.

Registro manual ligado a la version leida y comprobada; no supone que el sitio
completo este listo para AdSense ni que Google vaya a aprobarlo. La lectura
de produccion aun muestra el articulo anterior; ver adsense-production-review-
2026-10-04.md. Sin push/deploy o solicitud a Google en este lote.

# Revisión individual de las guías de Sombra y Anran

Revisión del 29 de octubre de 2026 por Codex. Se leen por separado ambos artículos completos. Filas públicas y modelos actuales coinciden con el inventario antes de corregir. Sus counters y composiciones ya eran indexables y no reciben otra aprobación.

| URL | Lectura y utilidad | Correcciones | Versión revisada |
| --- | --- | --- | --- |
| `/guides/sombra-guia-video-overwatch` | Prioridades de Hotfix, sigilo, Cyberspace y Weaken, major, hack de botiquines y dispositivos, lateral con curación, Translocator, EMP y Life Hack, VOD, tres FAQ y enlaces. | Sustituye la etiqueta heredada dps por support, preservando las demás; precisa CTRL ALT ESC, Cybersecurity y Data Packet. Corrige el título conocido y fecha el contexto de DPS de 2022. Conserva primera publicación del 6 de mayo y revisa el contenido el 29 de octubre. | `e67f7a0c99c988bc37888ca19a330bd6a84b1e08b65c1c2b1658706a7b1d0e1d` |
| `/guides/anran-guia-video-overwatch` | Llegada y timing, quemaduras y Fan the Flames, destino de Rush, defensa y curación por impactos de Dancing Blaze, Ascent y Revival, VOD, tres FAQ y enlaces. | Aplica los cuatro perks actuales, distinguiendo curación base de la mejora de Hungering Blaze, y contextualiza febrero de 2026. Conserva primera publicación del 6 de mayo y revisa el contenido el 29 de octubre. | `fbae1cec3f0112f3ed4ce83402148441bb5e04b1f29d90a7aa950e812599e24b` |

## Sombra: exactitud y medios

Se descarga y lee la ficha oficial de [Sombra](https://overwatch.blizzard.com/en-gb/heroes/sombra/), contrastada con las [notas oficiales de octubre de 2026](https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/10/). Hotfix, Cyberspace y EMP corresponden al kit Support; Weaken reduce la producción de daño y curación del enemigo y no se presenta como anticuración ni bloqueo general de habilidades. CTRL ALT ESC inicia regeneración pasiva al usar Translocator por debajo de la mitad de vida. Cybersecurity duplica la curación de Cyberspace a aliados bajo ese umbral; Data Packet reduce el cooldown principal de Hotfix al hackear botiquines. Life Hack se conserva como efecto opcional de EMP.

La corrección de etiquetas se limita a sustituir `dps` por `support` en esta revisión. No modifica la entrada ni elimina otras etiquetas. Valores nuevos, ausentes o inesperados permanecen en el contenido y su huella impide aprobarlos automáticamente. El rol editorial Support se mantiene como valor propiedad de la revisión.

El [vídeo de LeonDrummer](https://www.youtube.com/watch?v=yOB_mrkOul8) y oEmbed responden 200, con playability `OK`, título real «Guía básica: Sombra | Overwatch 2» y fecha del 13 de octubre de 2022. Se lee la descripción completa, sin capítulos. El reproductor confirma audio español original. No se afirma haber visto íntegros sus 328 segundos. El contexto visible diferencia explícitamente la grabación de DPS de la guía escrita actual de Support; el cuerpo también conserva esa advertencia. Se corrige solo el título antiguo conocido del ID revisado. Huella de cuerpo y medios: `dc2902c2ac02844dd6bc5e3aa07937bbbb9db8118fc100d4a936adf752300858`.

## Anran: exactitud y medios

Se descarga y lee la ficha oficial de [Anran](https://overwatch.blizzard.com/en-gb/heroes/anran/). Se confirman Ignition, amplificación de quemadura, Rush, Dancing Blaze y las dos opciones de ultimate. Smoulder prolonga la quemadura; Heat Shield añade sobrevida al uso de ultimate y por enemigos prendidos por ella. Short Fuse requiere impactos de Rush; Hungering Blaze mejora la curación de golpes posteriores de Dancing Blaze. Las [notas oficiales del 14 de abril de 2026](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/04/) confirman que la curación por impactos pertenece ya al kit base. No se atribuye la curación completa al perk ni se adoptan cambios del modo experimental de abril.

El [vídeo de Awkward](https://www.youtube.com/watch?v=eVYF5am80UQ) y oEmbed responden 200, con playability `OK`, título y canal coincidentes y fecha del 6 de febrero de 2026. Se lee la descripción completa, sin capítulos. El reproductor confirma audio original inglés. No se afirma haber visto íntegros sus 1395 segundos. El contexto visible identifica la versión anterior a los cambios de Dancing Blaze y separa los consejos escritos de cifras y secuencias históricas. Huella de cuerpo y medios: `69740c93dc08a46fc34d30f33ffd612f632a56e4ae0e4de0a70804ae6014ef4a`.

## Presentación y publicación

La copia aislada parte de `d2c74f4`, sin cambios locales ajenos. Pasan ocho casos iniciales de ambas guías aún noindex y sus botones de reproducción en móvil y escritorio. Se inspeccionan las dos capturas completas de escritorio y las dos cabeceras móviles: estructura, lectura, fechas, FAQ y enlaces correctos, sin desbordamientos ni anuncios. Falta verificar las versiones corregidas y su estado público. Evidencia en `reports/indexing-review-2026-10-27/batch-twenty-four/` y `release-batch-twenty-four/`.

Solo estas dos URLs se proponen para publicación con revisión de sus versiones exactas. Los demás pendientes conservan noindex y los anuncios mantienen su configuración previa.

## Validación final local

Pasan 708 pruebas unitarias, lint, seis casos finales de ambas guías y filtros y ocho de regresión, incluidos Doomfist, Roadhog, el modo de revisión de anuncios y los filtros de rol de Sombra. La prueba de etiquetas demuestra conservación de la entrada, sustitución exclusiva de dps, estabilidad al volver a aplicar y rechazo de etiquetas nuevas, ausentes, inesperadas o con nombres de propiedades del prototipo; también controla cambios de vídeo y medios. Se inspeccionan las cuatro capturas finales de móvil y escritorio. Contexto antes de los vídeos, nuevas condiciones, fechas y estructura correctos. El navegador verifica todo el texto, FAQ, enlaces, medios y reproducción, metadatos e idioma, sitemap y ausencia de desbordamientos y anuncios. Sombra aparece al filtrar Support y no aparece en DPS; los filtros conservan noindex. Falta desplegar y comprobar ambas URLs públicas.

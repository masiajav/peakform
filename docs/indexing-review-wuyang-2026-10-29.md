# Revisión individual de la guía de Wuyang

Revisión del 29 de octubre de 2026 por Codex. URL: `/guides/wuyang-guia-video-overwatch`. Se lee completo el artículo: prioridades del stream pasivo, consumo de recurso activo, atención a los orbes, recorrido de Guardian Wave, destino de Rushing Torrent, anticipación de Tidal Blast, revisión de VOD, tres FAQ y enlaces. La fila pública y el modelo actual coinciden con el inventario antes de editar. Sus composiciones y counter ya eran indexables y no reciben otra aprobación.

## Exactitud y correcciones

Se descarga y lee la ficha oficial actual de [Wuyang](https://overwatch.blizzard.com/en-gb/heroes/wuyang/). Se confirman el orbe controlable, curación pasiva y activa con recurso, movilidad de Rushing Torrent, aumento de curación recibida y desplazamiento de Guardian Wave y detonación posterior de Tidal Blast. El artículo conserva la distinción entre curación inmediata y posterior; no promete inmunidad ni salvar cualquier pelea.

Se incorpora una sección que aplica Overflow y Balance como alternativas minor, y Ebb and Flow y Falling Rain como major. Se distinguen recurso y munición al activar Torrent, mejora temporal de la curación pasiva al hacer daño con orbes, retorno de la ola y tres orbes de menor daño y radio de explosión potenciada. El texto condiciona esos beneficios a cobertura, atención y necesidad real de curación, sin copiar poderes de Stadium. La primera publicación del 6 de mayo se conserva y la revisión del contenido pasa al 29 de octubre.

## Vídeo y atribución

El [vídeo incorporado](https://www.youtube.com/watch?v=cDBCYwJTGEQ) y oEmbed responden 200 con playability `OK`. Ambos muestran el título original «ウーヤン完全解説｜全て理解るオーバーウォッチ» y el canal 電脳遊戯部, cuyo identificador es @bach1ko; la fecha es el 20 de febrero de 2026. La descripción y sus capítulos se leen completos: habilidades, elección de perks, posicionamiento, cobertura, alturas, compañeros y rivales. No se afirma haber visto íntegros los 1247 segundos.

El reproductor confirma audio original japonés predeterminado `ja.4`, subtítulos automáticos japoneses y doblaje inglés automático opcional `en-US.10`. Los metadatos almacenados contenían una traducción del título, el alias Bachiko y `en`. Se corrigen conjuntamente a título y nombre originales y `ja`, con contexto visible en español que explica el doblaje y la antigüedad. La corrección solo se aplica al ID y los tres valores antiguos exactos conocidos. Cualquier título, canal, idioma, ID, URL o fecha inesperados invalida la publicación; no se modifican los datos originales de la base de datos.

Versión editorial revisada: `db6a7e1c2811e1068a61b1aeac2131f78c1517a7d3d224ff8d6b81915e74349a`. Huella del cuerpo y medios finales: `67bb30ba5350952a3c9b1b9110df0daffd75d86674c50bdd77df21c4cfe29561`.

## Presentación y publicación

La copia aislada parte de `957ac71`, sin cambios locales ajenos de mapas o configuración. Pasan cuatro casos iniciales con la guía aún noindex y el botón de reproducción en móvil y escritorio. Se inspeccionan captura completa de escritorio y cabecera móvil; texto, fechas, FAQ, enlaces y estructura correctos, sin desbordamientos ni anuncios. Falta verificar la versión corregida y su estado público. Evidencia en `reports/indexing-review-2026-10-27/batch-twenty/` y `release-batch-twenty/`.

Solo esta URL se propone para publicación, vinculada a su revisión exacta. Los demás pendientes conservan noindex y la configuración de anuncios permanece igual.

## Validación final local

Pasan 706 pruebas unitarias, lint, cuatro casos finales de guía y filtros y seis de regresión sobre Freja, Sojourn y el modo de revisión de anuncios. La nueva prueba de atribución verifica corrección conjunta de los valores conocidos, conservación de la entrada, aplicación repetida estable e invalidación por cambios de título, canal, idioma, ID, URL y fecha. Se inspeccionan la captura completa de escritorio y la cabecera móvil finales: contexto antes del vídeo, nombre original, JA, fecha revisada, sección de perks y estructura correctos. El navegador verifica todo el texto, FAQ, enlaces, vídeo y reproducción, idioma del VideoObject, fechas y ausencia de anuncios o desbordamientos. Falta desplegar y comprobar la URL pública.

## Resultado público

Vercel confirma el commit `de503e3` en [este despliegue de producción](https://vercel.com/masiajavs-projects/peakform/e9gPUhTvTfmRXigZFx1zSe8re7sQ). Pasan las 55 respuestas HTTP y la redirección de control: la guía responde 200, sin noindex, incluida en sitemap, con fecha, atribución y japonés en VideoObject correctos y sin anuncios. Los 50 artículos anteriores y los cuatro controles conservan su estado. Pasan otros dos casos de navegador contra producción, en móvil y escritorio. El ledger conserva respuesta, huella, fecha, commit y despliegue: **51 de 140 artículos habilitados y verificados; 89 pendientes de revisión**.

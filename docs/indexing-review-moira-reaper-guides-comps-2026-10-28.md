# Revisión individual de guías y composiciones de Moira y Reaper

Revisión del 28 de octubre de 2026, por Codex. Se revisan cuatro URLs del inventario original de 140 artículos excluidos. No se aprueba ningún otro artículo ni se cambia la activación de anuncios.

## Lectura y decisión por URL

| URL | Lectura y utilidad | Corrección y fecha | Versión exacta |
| --- | --- | --- | --- |
| `/guides/moira-guia-overwatch-recursos-supervivencia` | Texto completo sobre gasto y recuperación de curación, elección y recorrido de orbes, destino de Fade, ayuda al equipo, Coalescence, VOD y tres FAQ. La lectura iniciada en el lote anterior se contrasta con el modelo actual: el cuerpo coincide. | Contexto visible para el vídeo de Kajor de 2025, sin presentar su título como balance actual. Se preservan el vídeo, canal y fecha originales. Fecha de revisión del contenido: 28 de octubre; primera publicación: 5 de mayo de 2026. | `a63050b34a4fcf1c4ac8daf43cf3e4aa20249ab2708c325ffcd8317272d46117` |
| `/guides/reaper-guia-video-overwatch` | Texto completo sobre preparación, Dire Triggers básico y Trigger Finger opcional, Shadow Step, alcance, Wraith, Blossom, VOD y tres FAQ. El cuerpo coincide con la lectura anterior. No depende del vídeo para explicar las decisiones. | Contexto para la introducción y sesión larga de ChoiceOW de 2025. Se advierte de que las tier lists y mejoras antiguas no describen el kit actual. Primera publicación del artículo conservada: 6 de mayo de 2026; revisión de contenido: 28 de octubre. | `4749717014f6f6f7468bf04440fa48fa122de8ee163486e53cf41745b7ede540` |
| `/team-comps/moira` | Se leen introducción, resumen, tres equipos, sus cinco argumentos, tareas, rotación, debilidades, ejemplos, checklist y tres FAQ. Explica curación disponible, cercanía, reparto con el otro Support y límites frente a anticuración y presión separada. | No necesita reescritura tras el contraste. Texto y fecha de contenido del 2 de octubre conservados. Las composiciones son ejemplos condicionados, no promesas de meta ni resultados. | `4f390b42c8d7c0e9f7ba37c17e93425d7039c4c51e402aeb937df335ae7554e4` |
| `/team-comps/reaper` | Se leen todas las secciones equivalentes. Los ejemplos distinguen llegada con Queen y velocidad, lateral preparado para Winston y tareas separadas de Reinhardt y D.Va en 6v6. La salida y las defensas rivales condicionan Blossom. | Texto y fecha del 2 de octubre conservados. No se presenta Shadow Step como movilidad que siga cualquier salto ni se promete que daño y robo de vida resuelvan el duelo. | `97dc02bae9e1a90402b364e1652930ad4b7532efca82cd1f899b9d25505de0a4` |

## Datos, fuentes y vídeos

Se reutiliza el contraste oficial de Moira, Reaper, D.Va, Ashe, Winston y Reinhardt y las notas de abril de 2023, abril de 2026 y octubre de 2026 del [lote anterior](indexing-review-flex-moira-reaper-2026-10-28.md). Ana, Kiriko, Lúcio y Baptiste se habían leído en el primer lote. Además se descargan completas las fichas oficiales actuales de [Junker Queen](https://overwatch.blizzard.com/en-gb/heroes/junker-queen/), [Mei](https://overwatch.blizzard.com/en-gb/heroes/mei/) y [Sojourn](https://overwatch.blizzard.com/en-gb/heroes/sojourn/), leyendo sus habilidades. Se contrastan Shout, muro y movilidad como herramientas condicionadas, sin introducir valores numéricos ni poderes de Stadium. Los equipos tienen uno o dos Tanks según su formato, dos DPS y dos Supports, sin duplicados. Las variantes 6v6 no se anuncian como formato obligatorio de todas las partidas.

Las páginas de [Kajor](https://www.youtube.com/watch?v=v8vc9-ZHD5E) y [ChoiceOW](https://www.youtube.com/watch?v=FkN1shWryWI) y sus respuestas oficiales oEmbed devuelven HTTP 200. La respuesta del reproductor indica `playability: OK`; título y autor coinciden. La publicación original es 7 de mayo y 27 de julio de 2025, respectivamente, según el día mostrado por la fuente. Se leen las descripciones y capítulos del autor: el primero trata duelos, orbes, Coalescence y salidas; el segundo contiene una introducción seguida de una sesión larga. No se afirma haber visto íntegramente esas sesiones ni se usa su título promocional como evidencia de balance actual. La guía española tiene explicación propia y el nuevo contexto distingue ambas fechas y alcances.

En Moira se comprueba la fila de la guía canónica y la de su alias. La página combina el vídeo del alias mediante `mergeReviewedGuideVideo`; el modelo inicial del inventario solo recogía la fila canónica. Se corrige el diagnóstico para que sus próximos modelos reflejen también el vídeo incorporado. Se preserva el inventario histórico del 27 de octubre.

## Control de la versión y del sitemap

Las dos nuevas revisiones incluyen la identidad y metadatos del vídeo y la huella del artículo renderizado, calculada con el mismo normalizador de contenido editorial. Así, cambiar vídeo, atribución, imagen de portada, rol o etiquetas exige revisar de nuevo el resultado. Las fechas automáticas de la base de datos siguen fuera de esa huella; las fechas editoriales de revisión pertenecen al modelo estático revisado. Una guía ya aprobada sin vídeo tampoco admite ahora un vídeo nuevo sin comprobarlo.

El sitemap combina las mismas filas publicadas que la página antes de evaluar la elegibilidad. No debe omitir el vídeo al comprobar Moira ni aprobarla si se retira o sustituye esa fuente. Solo se añaden Moira y Reaper a la lista explícita de composiciones. Los anuncios siguen bloqueados en las cuatro URLs.

## Comprobaciones

Ocho casos de navegador previos sobre el build aislado de `9210620`: cuatro artículos por escritorio y móvil. Comprueban metadatos, enlaces, FAQ, imágenes, datos estructurados, fechas y ausencia de overflow y slots. La copia aislada excluye los cambios ajenos de mapas, Deadlock y tsconfig. Se inspeccionan capturas completas y cabeceras en ambos formatos. Esas pruebas previas no certifican la reproducción del vídeo, que se comprobará expresamente en la versión final.

Fuentes públicas y modelos actuales: `reports/indexing-review-2026-10-27/batch-three/`. Capturas y logs: `reports/indexing-review-2026-10-27/release-batch-three/`.

Validación final local: lint, 704 pruebas unitarias y build correctos; diez casos de navegador para los cuatro artículos y la publicación de composiciones, y otros doce para las cinco URLs del objetivo ya habilitadas y el modo de revisión de anuncios en ambos juegos. Los reproductores muestran su botón de reproducción. Se comprueban todos los párrafos de las guías nuevas y el texto completo de las composiciones, FAQ visibles y estructuradas, contexto y atribución del vídeo, metadatos, enlaces, fechas, imágenes y ausencia de overflow y slots. Se inspeccionan las capturas finales de las guías, incluidas las cabeceras móviles y el reproductor cargado.

Antes de ese resultado se corrigió un error de tipos de la proyección dinámica de Supabase en el sitemap. Una primera ejecución de navegador también detectó que el normalizador del test eliminaba el guion legítimo de «daño-curación»; se corrigió el test y se repitieron los diez casos sobre el mismo build. No se altera el texto para satisfacer esa expectativa incorrecta.

Despliegue y comprobación pública pendientes al preparar este registro. Estado del objetivo: nueve revisados, cinco verificados públicamente y cuatro esperando despliegue; 131 pendientes de revisión.

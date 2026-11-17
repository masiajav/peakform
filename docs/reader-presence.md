# Visitantes de Replaid Lab

Estado: desactivado temporalmente por petición del usuario. `PublicNav` no monta `LiveReaders` y el layout raíz no monta `ReaderPresenceProvider`: no se muestra el contador ni se abre su conexión de presencia. Se conservan los componentes, el transporte, las pruebas y las ilustraciones para recuperarlo más adelante.

Para reactivarlo, restaurar la importación y el montaje de `LiveReaders` junto a la marca en `PublicNav.tsx`, y la importación y el wrapper de `ReaderPresenceProvider` alrededor de children y PublicFooter en `src/app/layout.tsx`. Comprobar de nuevo la conexión y la presentación antes de publicar.

Funcionamiento cuando se active: la navegación pública integra un único contador junto a la marca de Replaid Lab, con el bot de Overwatch y el minion de Deadlock alrededor de la cifra. El total es el mismo en todas las secciones. El contexto persistente publica presencia en cualquier página, también en las rutas sin navegación pública. No se reactivan Kick/YouTube ni la consulta de estado del canal.

## Medición

Supabase Realtime Presence publica únicamente una marca de actividad del sitio y una clave aleatoria efímera, con un cliente aislado que no carga ni guarda la sesión de cuenta. No se envían el juego ni la ruta. No se usan cookies, almacenamiento persistente, correos ni identificadores de usuario para el contador. La política de privacidad describe el tratamiento y el proveedor de conexión.

Solo publica una pestaña visible por origen y contexto del navegador mediante un único Web Lock para todo el sitio. Las demás observan y pueden relevar a la primera. Un navegador con páginas de ambos juegos o de cualquier otra sección cuenta una sola vez, incluida la portada. Los cambios de ruta no reinician el contexto. Los dominios apex y www comparten canal; los Web Locks deduplican dentro de cada origen y la navegación pública habitual se sirve en www.

La cifra aproxima sesiones visibles; no prueba que sean personas distintas o que estén leyendo. Excluye clientes sin JavaScript o APIs compatibles y puede retrasarse al perderse una conexión. Al ser un canal público, no es una métrica certificada frente a bots o clientes manipulados. No se usa para publicidad, facturación o estadísticas de audiencia verificadas.

El valor aparece después de suscripción y sincronización reales. Durante conexión o fallo se muestra «—», nunca un cero inventado. Ocultar o cerrar la página retira su presencia y cancela las esperas de bloqueo. Si otra pestaña sigue visible, puede asumir la publicación.

Los dos dominios de producción usan `replaid-visitors-v2`; localhost y previews usan `replaid-visitors-preview-v2`. El bloqueo local incluye ese mismo nombre de canal. Las pruebas locales no suman visitas a producción. El canal nuevo permite revisar esta versión sin mezclar sus datos con los contadores por juego de la versión anterior. No hacen falta migraciones, nuevos proveedores ni cambios de plan.

## Ilustraciones

Dos ilustraciones propias generadas con ImageGen integrado, con referencias visuales del bot de entrenamiento y del trooper de vela. Los originales PNG y prompts se conservan en `reports/reader-presence-2026-11-16/art/` fuera del commit. Las copias de entrega conservan transparencia y se codifican en WebP:

- `/community/ow-training-bot.bb96a53951d3.webp`: 188 × 192, 14.934 bytes.
- `/community/deadlock-candle-trooper.d7fea4b1c90a.webp`: 97 × 192, 10.358 bytes.

Los SHA-256 completos están en el registro privado `art/assets.json`. No se cargan imágenes de terceros desde la cabecera. El movimiento es discreto y se desactiva cuando el navegador pide reducir animaciones.

## Verificación

20 pruebas del transporte y 4 de presentación aprobadas: total global, deduplicación entre pestañas, estados de conexión y posición de ambos personajes alrededor de una sola cifra. Compilación de producción aprobada y revisión independiente sin bloqueos. Los resultados reales de cada ejecución y las capturas se conservan en el directorio privado de la tarea. El usuario revisó la versión local del 17 de noviembre antes de autorizar su publicación.

## Fuentes técnicas

- [Supabase Presence](https://supabase.com/docs/guides/realtime/presence).
- [Web Locks](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API).

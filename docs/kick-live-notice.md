# Aviso de directos de ivajpro

La web muestra una tarjeta flotante cuando Kick confirma una emisión activa de `ivajpro`. Incluye indicador verde, título del directo, enlace a `https://kick.com/ivajpro` y botón para cerrar. Funciona en la entrada, Overwatch, Deadlock y el resto de páginas públicas; no se muestra ni consulta en zonas privadas, vistas previas editoriales o Arcade. El pie público incluye también el enlace al canal.

## Detección y comportamiento

- El navegador consulta `/api/community/kick-status` cada 60 segundos mientras la pestaña está visible y vuelve a consultar al regresar a ella. No consulta Kick directamente ni carga un reproductor.
- El servidor lee `https://kick.com/api/v2/channels/ivajpro`, el endpoint público del canal. Solo acepta el slug exacto, una emisión con `is_live: true` e identidad numérica válida. Una emisión nula confirma desconexión; una respuesta ausente, bloqueada o malformada produce `unknown`.
- La respuesta pública contiene únicamente canal, estado, ID de emisión, título acotado y fecha de consulta. No publica el payload completo del canal ni usa cookies o credenciales del visitante.
- La caché de CDN dura 30 segundos en estados confirmados y 10 en desconocido. No se sirve un estado antiguo mediante `stale-while-revalidate`. La consulta upstream tiene límite de siete segundos y el navegador de diez. El aviso suele actualizarse dentro de uno o dos minutos; no promete sincronía instantánea.
- El aviso se oculta al terminar, al recibir estado desconocido o al fallar una consulta. Al ocultar la pestaña se retira el estado anterior hasta volver a comprobarlo.
- Cerrar guarda el ID de esa emisión en `sessionStorage`; se conserva durante la visita y una emisión distinta puede aparecer. Si el almacenamiento está bloqueado, el cierre sigue funcionando en la página actual.
- No hay una opción de producción que fuerce «en directo». El estado visual de prueba se simula exclusivamente interceptando la respuesta en Playwright.

## Verificación y mantenimiento

`tests/unit/kick-status.test.ts` comprueba estados reales frente a desconocidos, identidad, límites, errores upstream y caché. `tests/e2e/kick-live-notice.spec.ts` prueba entrada y ambos juegos, inicio/fin sin recarga, cierre por emisión, fallos, zonas privadas y consulta real del servidor. Las capturas de prueba están en `reports/kick-live/` y su registro marca explícitamente `simulatedScreenshots: true`.

Durante la implementación, el endpoint público confirmó que `ivajpro` estaba desconectado. No se ha observado una emisión real activa del canal: el estado activo se comprueba con fixtures controladas, sin alterar la web pública ni la cuenta de Kick.

Despliegue `35c80f4` comprobado en producción: `/api/community/kick-status` devuelve HTTP 200 y estado `offline` confirmado desde Vercel. Pasan los 26 recorridos de navegador de aviso, selector y recursos visuales en móvil y escritorio, las 33 pruebas unitarias relevantes, lint y build. Las capturas de la tarjeta se han tomado también sobre la web publicada con la respuesta activa simulada; su registro conserva el estado real desconectado.

El endpoint de canal está disponible sin autenticación, pero no forma parte del contrato de la API para desarrolladores. Si deja de estar disponible, el aviso se oculta y el endpoint devuelve `unknown`; investigar el cambio antes de sustituirlo. Kick ofrece una [API oficial con OAuth de aplicación](https://docs.kick.com/getting-started/generating-tokens-oauth2-flow) y [eventos de cambio de directo](https://docs.kick.com/events/event-types) como posible migración futura, que requeriría configurar una aplicación de Kick. Esta entrega no crea aplicaciones ni necesita claves nuevas.

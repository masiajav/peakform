# Aviso de directos de ivajpro

La web muestra una franja visual en la parte superior de las páginas públicas: `ONLINE` en verde cuando Kick confirma una emisión activa y `OFFLINE` en gris cuando confirma desconexión. Incluye el canal `ivajpro`, indicador de estado y enlace a `https://kick.com/ivajpro`. El título del directo aparece en escritorio cuando está online. Funciona en la entrada, Overwatch, Deadlock y el resto de páginas públicas; no se muestra ni consulta en zonas privadas, vistas previas editoriales o Arcade. El pie público incluye también el enlace al canal.

## Detección y comportamiento

- El navegador consulta `/api/community/kick-status` cada 60 segundos mientras la pestaña está visible y vuelve a consultar al regresar a ella. No consulta Kick directamente ni carga un reproductor.
- El servidor lee `https://kick.com/api/v2/channels/ivajpro`, el endpoint público del canal. Solo acepta el slug exacto, una emisión con `is_live: true` e identidad numérica válida. Una emisión nula confirma desconexión; una respuesta ausente, bloqueada o malformada produce `unknown`.
- La respuesta pública contiene únicamente canal, estado, ID de emisión, título acotado y fecha de consulta. No publica el payload completo del canal ni usa cookies o credenciales del visitante.
- La caché de CDN dura 30 segundos en estados confirmados y 10 en desconocido. No se sirve un estado antiguo mediante `stale-while-revalidate`. La consulta upstream tiene límite de siete segundos y el navegador de diez. El aviso suele actualizarse dentro de uno o dos minutos; no promete sincronía instantánea.
- La franja permanece visible también cuando el canal está offline. Una consulta en curso indica `COMPROBANDO`; una respuesta desconocida o un fallo indica `NO DISPONIBLE`, sin inventar un estado offline. Al ocultar la pestaña se retira el estado anterior hasta volver a comprobarlo.
- No usa almacenamiento del visitante ni tiene un cierre que pueda ocultar el estado solicitado. La franja ocupa su propio espacio sobre la navegación y no tapa el contenido.
- No hay una opción de producción que fuerce «en directo». El estado visual de prueba se simula exclusivamente interceptando la respuesta en Playwright.

## Verificación y mantenimiento

`tests/unit/kick-status.test.ts` comprueba estados reales frente a desconocidos, identidad, límites, errores upstream y caché. `tests/e2e/kick-live-notice.spec.ts` prueba posición superior, estados online/offline en la entrada y ambos juegos, cambios sin recarga, fallos, pestañas ocultas, zonas privadas y consulta real del servidor. Las capturas de prueba están en `reports/kick-live/` y distinguen los estados simulados del estado real.

Durante la implementación, el endpoint público confirmó que `ivajpro` estaba desconectado. No se ha observado una emisión real activa del canal: el estado activo se comprueba con fixtures controladas, sin alterar la web pública ni la cuenta de Kick.

La primera versión (`35c80f4`) confirmó en producción HTTP 200 y estado `offline` desde Vercel, con 26 recorridos de navegador y 33 pruebas unitarias relevantes. El usuario pidió después una indicación permanente en la parte superior con ambos estados: esta franja sustituye la tarjeta flotante y sus comprobaciones se registran por separado. La caché CDN se ha observado con un `MISS` seguido de `HIT` y la misma fecha de comprobación.

El endpoint de canal está disponible sin autenticación, pero no forma parte del contrato de la API para desarrolladores. Si deja de estar disponible, la franja muestra `NO DISPONIBLE` y el endpoint devuelve `unknown`; investigar el cambio antes de sustituirlo. Kick ofrece una [API oficial con OAuth de aplicación](https://docs.kick.com/getting-started/generating-tokens-oauth2-flow) y [eventos de cambio de directo](https://docs.kick.com/events/event-types) como posible migración futura, que requeriría configurar una aplicación de Kick. Esta entrega no crea aplicaciones ni necesita claves nuevas.

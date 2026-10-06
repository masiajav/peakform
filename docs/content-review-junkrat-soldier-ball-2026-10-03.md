# Revision individual: Junkrat, Soldier: 76 y Wrecking Ball

Fecha: 2026-10-03. Revisor: Codex. Autoria publica: Replaid Lab.

## Alcance

- `/counters/junkrat`: cambiar la entrada del spam, observar trampas y minas, preparar RIP-Tire y evitar Total Mayhem; Pharah, Echo, D.Va y Ashe.
- `/counters/soldier-76`: disputar una plataforma con ayuda, aprovechar Sprint, distinguir Field/Stim y cortar el tiro de Visor; D.Va, Winston, Genji y Ana.
- `/counters/wrecking-ball`: peel sobre el aterrizaje y el DPS que sigue, control con seguimiento, exceso de salud y rutas de Minefield; Brigitte, Ana, Mei y Cassidy.

Se mantienen las rutas y funcionalidades existentes. Los ejemplos por mapa son situaciones hipoteticas propias, no partidas ni experiencia personal atribuidas a Ivajpro. No se ha probado en el juego.

## Contraste y limites

Se consulto contenido indexado de fichas oficiales y notas de Blizzard. Las aperturas directas de Cassidy y Soldier devolvieron 403: no se presenta esa apertura como satisfactoria.

- `https://overwatch.blizzard.com/en-gb/heroes/junkrat/`: arma con rebote, mina, trampa, rueda y Total Mayhem; minors Nitro Boost/Bomb Voyage y majors Mine Recycling/Frag Cannon. No se mezclan las mejoras de Stadium con ranked.
- `https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/4/`: Mine Recycling paso a major. Se excluye el modo temporal de scrap y tres trampas. Tampoco se reutilizan Aluminum Frame o Tick Tock de notas antiguas.
- `https://overwatch.blizzard.com/en-us/heroes/soldier-76/`: arma, Sprint, Field, Helix, Visor y perks actuales. Stim Pack sustituye Field y es la alternativa major a Full Stride, no curacion adicional que se sume siempre a los dos. No se atribuyen Run and Gun o Peripheral Pulse al kit normal.
- `https://overwatch.blizzard.com/en-gb/heroes/wrecking-ball/`: grapple, Roll, Piledriver, exceso de salud transferible y minas; minors Steamroller/Multi-Ball, majors Hang Time/Adaptive Barrier. No se da por presente la barrera sin su perk ni se convierte anti en eliminacion de overhealth.
- `https://overwatch.blizzard.com/en-gb/heroes/dva/`: Boosters y Matrix frontal. No se confunde cubrir proyectiles del arma de Junkrat con haber eliminado RIP-Tire.
- `https://overwatch.blizzard.com/en-gb/heroes/genji/`: escalada, Dash y Deflect. No se promete inmunidad desde todos los angulos ni que Soldier deba seguir disparando.
- `https://overwatch.blizzard.com/en-gb/heroes/brigitte/` y `https://overwatch.blizzard.com/en-us/news/patch-notes/live/2023/04/`: Whip Shot, Pack y diferencia entre Bash normal y stun durante Rally.
- `https://overwatch.blizzard.com/en-gb/heroes/mei/`: slow normal y Deep Freeze opcional. Se excluyen las variantes temporales de junio de 2026.
- `https://overwatch.blizzard.com/en-gb/heroes/cassidy/`: Roll y opciones del kit; no se usa Hot Potato de Stadium como granada magnetica de ranked.
- `https://overwatch.blizzard.com/en-us/heroes/ana/`: Sleep y granada. Se evita extrapolar jetpack, curacion critica o mejoras de Stadium al kit normal.

Los consejos sobre posiciones y elecciones son analisis propio condicionado al mapa y a la ayuda de los equipos. No se publican breakpoints ni cifras de dano o duracion no recertificadas, porcentajes de victoria ni una lista de picks que garantice ganar.

## Comprobacion previa al registro

Build final leido: `A9ktyvuaVGGhWdh3W2aJ7`, aislado en `.next-editorial-built-preview/routes-rifle-ball-review2-2026-10-03`, puerto 3012.

- Lectura completa de los tres articulos renderizados y apertura de todas las FAQs.
- Escritorio 1440x900 y movil 390x844: cabeceras, imagenes y secciones inferiores. Sin overflow horizontal ni retratos rotos en lo comprobado.
- Un H1, title y description propios, canonical de cada ruta y Article/BreadcrumbList/FAQPage coherentes con el texto. Autor Replaid Lab y fecha real, sin inventar publicacion anterior.
- La lectura inicial detecto un titular de Soldier con doble puntuacion y una frase confusa de Echo. Se corrigieron, se reconstruyo un artefacto aislado y se releyeron las partes cambiadas antes del registro.
- 24 destinos internos comprobados por HTTP, todos 200. Click y H1 confirmado en las tres guias relacionadas; no se sustituyen enlaces validos por slugs imaginados.
- Sin errores de consola observados en navegador interno y CLI. Noindex y ausencia de anuncios antes del registro.
- 275 unitarios pasados antes del registro, incluidos guards especificos de mecanicas y comprobacion de parrafos y metadatos distintos. La longitud no autoriza la publicacion.

## Versiones autorizadas

- Junkrat: `a6e9512d5bc7190b2e12ecefa13a6d0462ecd4e00a172c19c12544900e2fa503`.
- Soldier: 76: `40b0e71b6c805f98e15a31895bc470ffeff5b440f4f6384e19edc4a2c2891875`.
- Wrecking Ball: `62f57e933de2921a94348bb2d616026a4350655eeaa9175a45ce30bce3c804ab`.

Registro manual ligado al contenido concreto. Una edicion invalida la aprobacion hasta nueva revision. Se permite indexacion de estas versiones, nunca anuncios por pertenecer al registro.

## Verificacion final

- `npm.cmd run verify`: lint correcto, 275 unitarios, build correcto y 616 E2E pasados, sin retries, en 7.3 minutos de navegador.
- `npx.cmd tsc --noEmit --incremental false` y `git diff --check`: exit 0. Los avisos LF/CRLF no son errores del diff.
- Build final `l9ixeZWCrThuY-oXWQ_0r`, aislado en `.next-editorial-built-preview/routes-rifle-ball-final-2026-10-03`, puerto 3012.
- Navegador interno: las tres rutas index, follow, con canonical propio, un H1 y sin anuncios. Catalogo de 31 destinos en desktop/movil, sin overflow. Se probaron clicks a las tres nuevas rutas; ItemList y destinos comprobados tambien por E2E.
- Capturas viewport de Playwright de Soldier en desktop y Ball en movil inspeccionadas, ademas de la revision manual de los tres articulos en el navegador interno.
- Evidencias archivadas en `reports/verification-junkrat-soldier-ball-2026-10-03`; last-run passed y sin pruebas fallidas.
- Rastreo `reports/adsense-local-2026-10-03-routes-rifle-ball-final.json`: 330 HTTP 200, 100 URLs en sitemap, 101 respuestas indexables incluidas variantes canonical y 229 noindex. 159 rutas de manifiesto cubiertas, cola agotada. Las tres revisiones tienen metadatos y schema sin avisos automaticos.
- Quedan siete fichas clasificadas como genericas. Persisten los avisos de menos de 500 palabras en /news y /counters: no es un minimo de Google ni se introduce relleno para pasarlo. La ausencia de pares sobre el umbral de similitud tampoco aprueba textos pendientes.
- Los logs locales siguen registrando StripeAuthenticationError al consultar estados. No se hicieron compras, transferencias, cambios de onboarding ni escrituras de datos. Las pruebas de acceso anonimo pasan, pero no certifican pagos reales.

No se ha hecho push, deploy ni solicitud de AdSense. El objetivo global sigue activo: quedan contenido, identidad legal autorizada, CMP certificado y verificacion de la version desplegada.

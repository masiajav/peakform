# Revision individual: Junker Queen, Mauga y Hazard

Fecha: 2026-10-03. Revisor: Codex. Autoria publica: Replaid Lab.

## Alcance

- `/counters/junker-queen`: retirada comun ante Shout, heridas, Carnage y respuestas a Rampage; Kiriko, Ana, Lucio y Mei.
- `/counters/mauga`: negacion de disparos, cobertura durante Overdrive, llegada de Overrun y ayuda exterior a Cage Fight; Sigma, D.Va, Ana y Zenyatta.
- `/counters/hazard`: proteger la llegada sobre un aliado, recuperar lineas tras Wall, segundo angulo frente a Spike Guard y Downpour; Ana, Orisa, Mei y Pharah.

Se han leido los tres textos renderizados individualmente. Cada uno incluye ejemplos hipoteticos propios por mapa, no experiencias o partidas atribuidas a una persona. No se ha probado dentro del juego. No se cambian pagos, marketplace, tablas ni rutas existentes.

## Contraste y limites

Las aperturas directas de fichas oficiales devolvieron 403. Se consulto su contenido indexado y el de las notas oficiales; no se afirma acceso directo satisfactorio ni prueba en el juego.

- `https://overwatch.blizzard.com/en-us/heroes/junker-queen/`: kit y perks minor Rampant Charge/Battle Shout, major Willy-Willy/Savage Satiation. Rampant Charge es opcional: no se promete cancelar siempre Rampage. Anti no elimina el exceso de salud de Shout.
- `https://overwatch.blizzard.com/en-gb/heroes/mauga/`: armas, Overrun Unstoppable, Berserker, Cardiac, Cage y perks opcionales. No se confunde exceso de salud con curacion ni se afirma que Matrix o Grasp detengan un pisoton.
- `https://overwatch.blizzard.com/en-us/news/patch-notes/live/2023/12/`: funcionamiento de las armas y Cage al lanzamiento; los efectos antiguos no prevalecen sobre parches posteriores.
- `https://overwatch.blizzard.com/en-us/news/patch-notes/live/2025/03/`: Cardiac ya no proporciona reduccion de dano a los aliados. No se replica la descripcion antigua de lanzamiento.
- `https://overwatch.blizzard.com/en-us/heroes/hazard/`: Leap, Wall, Spike Guard, Downpour y Vault.
- `https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2025/8/`: recuperacion de municion de Spike Guard condicionada al dano. La distribucion antigua de perks fue sustituida posteriormente.
- `https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/`: cambio de Reconstitution a minor y Deep Leap a major, coherente con la ficha oficial actual. Anarchic Zeal es la otra minor, Explosive Impalements la alternativa major. Las variantes Community Crafted y Stadium no se trasladan al consejo de ranked.
- `https://overwatch.blizzard.com/es-mx/news/patch-notes/live/2026/02/`: Downpour inmoviliza; no se presenta como un stun que impida disparar. No se inventan escapes garantizados de Cage con Suzu o Swift Step.
- `https://overwatch.blizzard.com/en-gb/heroes/mei/`: Deep Freeze es una eleccion major, no congelacion garantizada del disparo principal de cualquier Mei.

Se evitan cifras de dano, duraciones y breakpoints no recertificados. Los consejos son analisis propio condicionado a cobertura, mapa, companeros y objetivo; no prometen ganar el matchup por seleccionar un heroe.

## Comprobacion previa al registro

Build revisado: `Epwhuo7wHZ3wUfgDTxr83`, conservado en `.next-editorial-built-preview/queen-mauga-hazard-review3-2026-10-03`, puerto 3012. Los textos de Mauga y Hazard se leyeron en la revision previa; permanecen sin cambios editoriales. Se releyo Queen y se verificaron sus correcciones finales.

- Lectura integral y apertura de todas las FAQs; cabeceras desktop 1440x900 y movil 390x844, respuestas inferiores tambien en movil.
- Un H1, metadatos propios, canonical por ruta, Article/BreadcrumbList/FAQPage validos y coherentes con contenido visible. Fecha de revision real; sin inventar datePublished.
- Retratos cargados y sin overflow horizontal en las comprobaciones realizadas. Las primeras capturas antes de completar carga de imagen no se toman como prueba de retrato roto; se comprobaron de nuevo cargados.
- 25 destinos internos comprobados por HTTP, todos 200 tras redirects legitimos. Click y confirmacion del H1 de las tres guias relacionadas. La guia antigua de Queen redirige a su guia editorial actual.
- Un intento inicial de navegar a la guia de Mauga encontro servidor no disponible y error de red. Se reinicio con un artefacto aislado; se repitio el click normal y se confirmo destino y H1 sin errores. No se oculto el incidente ni se atribuyo a un bug de contenido sin evidencia.
- Sin errores de consola en la comprobacion recuperada. Las rutas seguian noindex, fuera del sitemap y sin publicidad antes del registro.
- CLI de navegador: apertura y errores comprobados sin fallos en el build revisado.
- Guards unitarios propios para heridas/overhealth, Overrun/Overdrive y clasificacion de perks/Downpour. No se aprueba por longitud ni por pertenecer a una lista.

## Versiones autorizadas

- Junker Queen: `f2b5b89765b1942317dcfd66136f7ec3b44642c94d52aad9c9c1ba2ab8dd1835`.
- Mauga: `02a9f9359ee0d9c62ad2c04d06b1b0f79bf5dd156f46e89ae92de0a75ee7e188`.
- Hazard: `944b18adb28926acd3ee3dcdce678a00ca554830aa863be73d50e5f1cb8a1434`.

Registro manual, ligado a estas versiones; una edicion posterior invalida la aprobacion. Se permite indexacion individual, no anuncios ni aprobacion global del sitio.

## Verificacion final

- `npm.cmd run verify`: lint correcto, 272 unitarios pasados, build correcto y 598 E2E pasados sin retries (7.1 minutos de navegador).
- `npx.cmd tsc --noEmit --incremental false` y `git diff --check`: exit 0. Los avisos de conversion LF/CRLF no son errores de diff.
- Build final `Ydv04bk5mIvtJJo9mQ7dd`, conservado en `.next-editorial-built-preview/queen-mauga-hazard-final-2026-10-03`, puerto 3012.
- Navegador interno confirma index, follow en las tres rutas, un H1 y ausencia de anuncios. Catalogo desktop/movil: 28 destinos, sin overflow; ItemList comprobado por E2E. Se inspeccionaron tambien cards y ejemplos inferiores de Hazard en movil y capturas completas/viewport de Playwright.
- Evidencias conservadas en `reports/verification-junker-queen-mauga-hazard-2026-10-03`; last-run registra passed, sin pruebas fallidas.
- Rastreo `reports/adsense-local-2026-10-03-queen-mauga-hazard-final.json`: 330 HTTP 200, 97 URLs en sitemap, 98 respuestas indexables incluidas variantes canonical y 232 noindex. 159 rutas de manifiesto cubiertas, sin rutas descubiertas pendientes. Las tres revisiones tienen metadatos y schema sin avisos automaticos.
- Persisten dos avisos de extension de hubs, /news y /counters. No se introduce relleno para alcanzar un numero de palabras. Ningun par supera el umbral de similitud; esto no certifica los textos pendientes.
- Quedan 10 fichas clasificadas como genericas y revisiones antiguas por recertificar. El contenido noindex tambien forma parte de la experiencia publica y necesita revision.
- El log local registra StripeAuthenticationError al consultar estado de cuentas. No se han realizado compras, transferencias o cambios de onboarding. Los guards de acceso anonimo pasan, pero no certifican una operacion de pago real.

Legal, CMP certificado, contenido restante y comprobacion desplegada siguen pendientes; el objetivo global permanece activo. No se ha hecho push, desplegado, activado anuncios ni enviado otra solicitud de AdSense.

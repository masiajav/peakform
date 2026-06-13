# Guía para editar contenido sin IA

Esta guía explica cómo añadir o modificar contenido en Replaid Lab sin depender de un asistente de IA. Está pensada para cambios editoriales normales: textos de la home, páginas de héroes, guías, noticias, patch notes, SEO básico y revisión antes de publicar.

## Regla principal

Antes de tocar nada, decide qué tipo de cambio vas a hacer:

| Cambio | Dónde se hace normalmente |
| --- | --- |
| Texto de la home | `src/app/page.tsx` |
| Navegación pública | `src/components/layout/PublicNav.tsx` |
| Página de héroe especial, como Shion | `src/app/heroes/[hero]/page.tsx` |
| Lista/rol de héroes | `src/lib/overwatch-counters.ts` |
| Héroes usados por sitemap/topics | `src/lib/content.ts` |
| Política de indexación/anuncios | `src/lib/indexing-policy.ts` |
| Guías, noticias y patch notes desde admin | `/admin/content` en la web |
| Sitemap | `src/app/sitemap.ts` |
| Páginas legales/confianza | `src/app/about`, `src/app/contact`, `src/app/privacy`, `src/app/editorial-methodology`, `src/app/legal` |

Si el cambio es solo editorial, evita tocar componentes de checkout, auth, Stripe, Supabase o middleware.

## Cómo levantar la web en local

```bash
npm install
npm run dev
```

Abre:

```text
http://localhost:3000
```

Si necesitas verla desde otro dispositivo de la red local:

```bash
npm run dev -- --hostname 0.0.0.0 --port 3001
```

Y abre:

```text
http://TU_IP_LOCAL:3001
```

Ejemplo usado en desarrollo:

```text
http://192.168.1.34:3001
```

Importante: no ejecutes `npm run build` mientras `npm run dev` está sirviendo la misma carpeta `.next`. Si ocurre que la web local se ve blanca o sin estilos, para el servidor, borra `.next` y vuelve a levantar `npm run dev`.

## Comprobaciones antes de guardar cambios

Ejecuta siempre:

```bash
npm run lint
npm run build
```

Warnings conocidos pueden existir, pero no debe haber errores. Después abre en navegador las rutas que has tocado.

Checklist visual:

- La página no se ve en blanco.
- El tema oscuro carga bien.
- No hay textos cortados en móvil.
- No hay mojibake ni texto mal codificado.
- Las tildes y la ñ están bien: `daño`, `página`, `guía`, `héroe`, `acción`, `ejecución`.
- Los botones importantes llevan a una URL real.
- No hay placeholders tipo "pendiente", "lorem ipsum" o bloques vacíos.

## Cómo editar textos de la home

Archivo principal:

```text
src/app/page.tsx
```

Busca el texto visible que quieres cambiar. Por ejemplo:

```tsx
<h1>
  GUÍAS DE OVERWATCH,
  <span>HÉROES Y CONSEJOS</span>
  PARA MEJORAR
</h1>
```

Consejos:

- Cambia solo el texto entre etiquetas, no la estructura si no hace falta.
- Mantén los enlaces internos con rutas existentes.
- Si añades una sección nueva, usa un `<section>` con un título claro.
- No metas anuncios manuales en páginas de baja calidad.

## Cómo añadir o modificar un héroe

Los héroes base viven en:

```text
src/lib/overwatch-counters.ts
```

Para añadir un héroe al hub:

1. Añádelo a `heroSeeds`.
2. Usa uno de estos roles: `tank`, `dps`, `support`.
3. Añade una entrada en `counterMatrix` si quieres que tenga counters básicos.

Ejemplo:

```ts
['Shion', 'dps'],
```

Y:

```ts
shion: ['winston', 'dva', 'sombra', 'cassidy'],
```

Si el héroe también debe estar disponible para rutas/topic helpers, añádelo en:

```text
src/lib/content.ts
```

Lista:

```ts
export const DEFAULT_HEROES = [
  ...
  'shion',
]
```

## Cómo editar una página especial de héroe

Archivo:

```text
src/app/heroes/[hero]/page.tsx
```

Este archivo renderiza páginas de héroe. Shion tiene una sección especial porque todavía está en seguimiento.

Busca:

```ts
const shionFacts = [...]
const shionAbilities = [...]
const shionPerks = [...]
```

Puedes cambiar los textos ahí. Mantén el contenido original, útil y revisado. Si usas una fuente externa, reescribe con tus palabras y enlaza la fuente.

No copies párrafos completos de wikis, notas oficiales o páginas de terceros.

## Cuándo indexar una página

La política vive en:

```text
src/lib/indexing-policy.ts
```

Estados prácticos:

| Estado | Uso |
| --- | --- |
| `index + ads` | Páginas fuertes, originales y completas |
| `index + no ads` | Páginas útiles, pero todavía no suficientemente fuertes para anuncios |
| `noindex + no ads` | Páginas finas, placeholders, búsquedas internas, contenido temporal o en seguimiento |

Para AdSense, es mejor tener menos URLs buenas que muchas páginas programáticas flojas.

Shion, mientras esté en seguimiento, debe seguir:

- visible para usuarios;
- `noindex, follow`;
- fuera del sitemap;
- sin anuncios.

Cuando tenga guía definitiva, datos oficiales completos, matchups probados y contenido editorial suficiente, se puede valorar pasarla a indexable.

## Cómo añadir contenido desde el panel admin

Ruta:

```text
/admin/content
```

Desde ahí se gestionan:

- guías;
- noticias;
- patch notes.

Campos importantes:

| Campo | Para qué sirve |
| --- | --- |
| `title` | Título visible |
| `slug` | URL, sin espacios ni tildes |
| `excerpt` | Resumen corto |
| `seo_title` | Título para Google |
| `seo_description` | Descripción para Google |
| `body` | Contenido principal en Markdown |
| `author` | Autor o fuente editorial |
| `hero`, `role`, `map`, `tags` | Relación con hubs internos |
| `published` | Publica o mantiene en borrador |

Reglas:

- El slug no debe cambiarse después de publicar salvo que añadas redirect.
- El body debe aportar valor propio, no solo embeber un vídeo.
- Las guías pilar deberían tener al menos 900-1400 palabras útiles.
- Las noticias cortas pueden existir, pero no deberían mostrar anuncios si son finas.
- Los patch notes deben resumir, enlazar a Blizzard y no copiar la nota completa.

## Cómo escribir contenido que no parezca de baja calidad

Cada página importante debería responder:

- ¿Para quién es esta página?
- ¿Qué problema concreto resuelve?
- ¿Qué debe hacer el jugador en partida?
- ¿Qué errores debe evitar?
- ¿Qué enlaces internos ayudan a seguir aprendiendo?
- ¿Qué fuente se ha usado si hay datos externos?

Evita:

- listas genéricas sin explicación;
- copiar texto de otras webs;
- traducir literalmente una wiki;
- páginas con solo vídeo embebido;
- repetir la misma plantilla en decenas de URLs;
- publicar contenido "por cubrir keyword" sin utilidad real.

## Revisión de acentos y ñ

Antes de publicar, busca textos sin acentos en las páginas tocadas.

Ejemplo en PowerShell:

```powershell
rg -n "dano|pagina|guia|heroe|accion|ejecucion|municion|curacion|angulos|rapidas" src/app src/lib
```

Ojo: algunos resultados pueden ser slugs o rutas, como:

```text
guia-video-overwatch
/heroes/[hero]
```

Eso no es texto visible. Lo que hay que corregir son frases mostradas al usuario.

Correcto:

- daño
- página
- guía
- héroe
- acción
- ejecución
- munición
- curación
- ángulos
- rápidas

Incorrecto:

- dano
- pagina
- guia
- heroe
- accion
- ejecucion
- municion
- curacion
- angulos
- rapidas

## SEO básico antes de publicar

Para páginas públicas importantes:

- Title único.
- Description clara.
- Canonical correcto usando helpers de `src/lib/seo.ts`.
- Enlaces internos hacia hubs relevantes.
- Si no es contenido fuerte, mejor `noindex, follow`.
- Si no es apto para AdSense, no debe mostrar anuncios.
- Si entra en sitemap, debe tener valor editorial propio.

No añadas una URL al sitemap solo porque existe. Añádela cuando merezca competir en Google.

## Cómo revisar el sitemap

Ruta local:

```text
http://localhost:3000/sitemap.xml
```

O con IP local:

```text
http://192.168.1.34:3001/sitemap.xml
```

Comprueba:

- No aparecen páginas en seguimiento como Shion si siguen en `noindex`.
- No aparecen búsquedas internas con `?q=`.
- No aparecen páginas vacías o programáticas sin contenido propio.

## Cómo hacer un commit seguro

Antes:

```bash
git status --short
git diff --stat
npm run lint
npm run build
```

Luego:

```bash
git add src docs README.md
git commit -m "Describe el cambio"
git push origin main
```

No subas:

- logs locales;
- `.next`;
- archivos `.pid`;
- capturas temporales;
- scripts de prueba creados solo para levantar el servidor;
- imágenes descargadas si no se usan realmente en producción.

## Qué hacer si algo se rompe

Si la web se ve blanca en local:

1. Para `npm run dev`.
2. Borra `.next`.
3. Levanta otra vez `npm run dev`.
4. Recarga la página.

Si una ruta da 404:

- Revisa que el archivo exista en `src/app`.
- Revisa que el slug esté en los datos si depende de `DEFAULT_HEROES` o `COUNTER_HEROES`.
- Revisa si la página hace `notFound()` por política de calidad.

Si una página aparece sin estilos:

- Comprueba que el CSS responde 200.
- Evita mezclar `npm run build` con `npm run dev` al mismo tiempo.

Si el build falla:

- Lee el primer error real, no solo los warnings.
- Revisa TypeScript.
- Revisa imports y nombres de variables.
- Revisa que no hayas usado una ruta mal escapada como `src/app/heroes/[hero]` en PowerShell sin `-LiteralPath`.

## Regla final antes de publicar

Una página debe poder defenderse sola:

- texto cuidado;
- utilidad real;
- fuente cuando haga falta;
- enlaces internos;
- sin errores visuales;
- sin anuncios si todavía es fina;
- sin indexar si todavía está incompleta.

Si no cumple eso, puede existir para usuarios, pero no debería competir en Google todavía.

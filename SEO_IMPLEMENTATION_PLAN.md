# SEO Implementation Plan - Replaid Lab

## Objetivo

Convertir Replaid Lab en una hemeroteca de referencia de Overwatch para publico hispanohablante, con el marketplace de expertos como CTA secundaria y monetizacion contextual.

## Estado Actual

Ya implementado en el repo:

- Next.js App Router con metadata global en `src/app/layout.tsx`.
- Helpers SEO centralizados en `src/lib/seo.ts`.
- Canonicales absolutos con `NEXT_PUBLIC_SITE_URL`.
- Sitemap dinamico en `src/app/sitemap.ts`.
- Robots en `src/app/robots.ts`.
- JSON-LD en articulos y perfiles mediante `src/components/content/JsonLd.tsx`.
- Rutas publicas indexables para:
  - `/guides`
  - `/guides/[slug]`
  - `/news`
  - `/news/[slug]`
  - `/patch-notes/[slug]`
  - `/heroes/[hero]`
  - `/roles/[role]`
  - `/maps/[map]`
  - `/experts`
  - `/experts/[id]`
- Gestion admin de guias, noticias y patch notes en `/admin/content`.
- Campos SEO y monetizacion en `guides` y `announcements`.
- Seed inicial de guias de Overwatch en `supabase/migrations/20260505_zz_seed_initial_overwatch_guides.sql`.

## Prioridades Pendientes

1. Corregir mojibake visible en la UI
   - Buscar textos tipo `GuÃ­a`, `anÃ¡lisis`, flechas rotas y simbolos corruptos.
   - Revisar landing, navegacion, login, expertos, pedidos, emails, legal y formularios.
   - Mantener encoding UTF-8 real en los archivos modificados.

2. Completar SEO tecnico global
   - Anadir JSON-LD global de `Organization` y `WebSite`.
   - Incluir `SearchAction` si se implementa busqueda real.
   - Anadir favicon, iconos y OG image real en `public/`.
   - Verificar `robots.txt` y `sitemap.xml` contra URLs de produccion.

3. Fortalecer paginas topic
   - Heroes, roles y mapas deben aportar contenido util aunque no haya articulos relacionados.
   - Cada pagina debe tener H1 unico, intro, enlaces internos, articulos relacionados y CTA contextual.
   - Anadir FAQs cuando el tema tenga busquedas recurrentes.

4. Mejorar rendimiento de paginas publicas
   - Revisar uso de imagenes y migrar a `next/image` cuando aplique.
   - Evitar consultas dinamicas innecesarias en contenido indexable.
   - Considerar cache/ISR para listados publicos si encaja con Supabase.
   - Medir home, `/guides`, una guia, `/heroes/ana`, `/experts` y un perfil.

5. Consolidar estrategia editorial
   - Publicar 2-3 contenidos semanales.
   - Priorizar clusters: heroes, roles, mapas, counters, composiciones, patch notes, tier lists y VOD review.
   - Cada articulo debe definir keyword principal, intencion, autor, fecha, enlaces internos y CTA.

## Recomendacion Para La Home / Landing

La home no debe ser estrictamente una landing de contratacion ni una portada generica de blog. Para maximizar trafico organico sin perder claridad comercial, usar una home hibrida:

- Primer pantallazo enfocado en la propuesta principal: coaching y analisis de replays de Overwatch en espanol.
- Despues del hero, presentar Replaid Lab como portal/hemeroteca de Overwatch para hispanohablantes.
- Peso recomendado: 60% autoridad editorial/portal Overwatch y 40% contratacion de expertos.
- La home debe distribuir autoridad hacia las paginas que realmente captaran trafico: heroes, roles, mapas, counters, tier lists, patch notes y guias.
- La contratacion debe aparecer como siguiente paso natural: "cuando una guia no basta, sube tu replay y recibe feedback personalizado".

Estructura recomendada para la home:

1. Hero comercial claro
   - H1 sugerido: "Coaching y analisis de replays de Overwatch en espanol".
   - CTA principal: ver expertos / subir replay.
   - CTA secundario: explorar guias.

2. Busqueda o entrada a la hemeroteca
   - Accesos a guias, heroes, roles, mapas, meta y patch notes.
   - Si se implementa buscador interno, hacerlo visible pronto.

3. Clusters SEO destacados
   - Guias por rol.
   - Guias por heroe.
   - Mapas.
   - Tier lists / meta.
   - Counters.
   - Noticias y patch notes.

4. Puente hacia contratacion
   - Explicar que las guias ayudan a entender el juego, pero un experto analiza errores concretos del replay del usuario.
   - Enlazar a expertos filtrados por rol cuando sea posible.

5. Expertos destacados y prueba social
   - Mostrar expertos activos, rango, rol, valoraciones y precio desde.
   - Mantener copy orientado a confianza: jugadores verificados, feedback humano, entrega clara.

## Criterios De Aceptacion

- `npm run build` pasa.
- `npm run lint` pasa o las excepciones quedan documentadas.
- `/robots.txt` bloquea paneles privados y permite contenido publico.
- `/sitemap.xml` incluye las rutas publicas relevantes.
- Paginas indexables tienen title, description, H1, canonical y contenido renderizado.
- No quedan textos corruptos visibles en rutas principales.
- JSON-LD valida con herramientas de Google.
- Objetivo Core Web Vitals: LCP menor a 2.5s, INP menor a 200ms y CLS bajo.

## Comandos Recomendados

```bash
git status --short
npm run lint
npm run build
```

## Notas Operativas

- Mercado: espanol global, no solo Espana.
- Prioridad: trafico organico con conversion secundaria a expertos.
- No revertir cambios existentes sin confirmacion.
- Documentar nuevas variables de entorno en `.env.example` y README cuando se anadan.

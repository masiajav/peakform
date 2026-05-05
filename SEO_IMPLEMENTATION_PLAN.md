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
- Iconos, manifest y OG image en `public/`.
- JSON-LD global de `Organization` y `WebSite`.
- `SearchAction` global apuntando a `/guides?q=...`.
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
- Busqueda y filtros en `/guides` por texto, rol, heroe, categoria y orden.
- Paginas topic con guia rapida, enlaces internos, articulos relacionados, noticias, CTA a expertos, espacio patrocinado y FAQs con JSON-LD.
- Home hibrida: propuesta de coaching + entrada a la hemeroteca y clusters SEO.
- Campos SEO y monetizacion en `guides` y `announcements`.
- Seed inicial de guias de Overwatch en `supabase/migrations/20260505_zz_seed_initial_overwatch_guides.sql`.

## Prioridades Pendientes

1. Corregir mojibake visible en la UI
   - Buscar textos tipo `GuÃ­a`, `anÃ¡lisis`, flechas rotas y simbolos corruptos.
   - Revisar landing, navegacion, login, expertos, pedidos, emails, legal y formularios.
   - Mantener encoding UTF-8 real en los archivos modificados.

2. Validar SEO tecnico global
   - Verificar `robots.txt` y `sitemap.xml` contra URLs de produccion.
   - Validar JSON-LD global, articulos, breadcrumbs, FAQs y perfiles con herramientas de Google.
   - Confirmar que `NEXT_PUBLIC_SITE_URL` apunta al dominio final antes de deploy.

3. Refinar paginas topic
   - Completar contenido unico especifico para los heroes/mapas prioritarios, no solo plantillas genericas.
   - Anadir mas enlaces internos segun crezca el inventario de guias.
   - Revisar que FAQs y copy no compitan entre paginas demasiado parecidas.

4. Mejorar rendimiento de paginas publicas
   - Revisar uso de imagenes y migrar a `next/image` cuando aplique.
   - Evitar consultas dinamicas innecesarias en contenido indexable.
   - Considerar cache/ISR para listados publicos si encaja con Supabase.
   - Medir home, `/guides`, una guia, `/heroes/ana`, `/experts` y un perfil.

5. Consolidar estrategia editorial
   - Publicar 2-3 contenidos semanales.
   - Priorizar clusters: heroes, roles, mapas, counters, composiciones, patch notes, tier lists y VOD review.
   - Cada articulo debe definir keyword principal, intencion, autor, fecha, enlaces internos y CTA.

## Home / Landing Implementada

La home ya sigue el enfoque hibrido recomendado: no es estrictamente una landing de contratacion ni una portada generica de blog. Combina propuesta comercial, entrada a la hemeroteca y enlaces a clusters SEO.

Debe mantenerse este equilibrio:

- Primer pantallazo enfocado en coaching y analisis de replays de Overwatch en espanol.
- Seccion de hemeroteca para guias, heroes, roles, mapas, meta y patch notes.
- Peso aproximado: 60% autoridad editorial/portal Overwatch y 40% contratacion de expertos.
- La home debe distribuir autoridad hacia paginas que captaran trafico: heroes, roles, mapas, counters, tier lists, patch notes y guias.
- La contratacion debe aparecer como siguiente paso natural: "cuando una guia no basta, sube tu replay y recibe feedback personalizado".

Siguiente mejora recomendada: conectar el buscador de `/guides` desde la home si se decide hacerlo visible en primer nivel.

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

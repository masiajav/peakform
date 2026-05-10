# Replaid Lab

Marketplace y hemeroteca SEO de Overwatch para el publico hispanohablante. La app combina contenido indexable, perfiles de expertos, pagos con Stripe Connect y un flujo protegido para enviar y entregar reviews de replays.

## Estado Actual

- App web en Next.js 14 App Router, React 18 y TypeScript.
- Supabase para Auth, Postgres, RLS, Storage de avatares y clientes SSR.
- Stripe Checkout + Stripe Connect para cobrar al jugador y transferir al experto con comision de plataforma.
- Resend para emails transaccionales.
- Biblioteca editorial con guias, noticias, patch notes, paginas por heroe, rol y mapa.
- Home hibrida: propuesta comercial de coaching + entradas a la hemeroteca.
- SEO tecnico con canonicales, sitemap, robots, JSON-LD global, iconos, manifest y OG image.
- Paneles protegidos para usuario, experto y admin.
- Gestion admin de expertos, pedidos, guias y anuncios.

## Requisitos

- Node.js 18 o superior.
- npm.
- Proyecto de Supabase.
- Cuenta de Stripe con Connect activado.
- API key de Resend si quieres enviar emails.
- Stripe CLI para probar webhooks en local.

`ANTHROPIC_API_KEY` esta reservado para drafts de IA, pero el flujo de entrega actual es manual desde el panel de experto.

## Instalacion

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

## Variables De Entorno

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Produccion
NEXT_PUBLIC_APP_URL=https://www.replaidlab.com
NEXT_PUBLIC_SITE_URL=https://www.replaidlab.com

RESEND_API_KEY=
ANTHROPIC_API_KEY=
```

Notas:

- `NEXT_PUBLIC_APP_URL` se usa para redirects y enlaces internos en emails.
- `NEXT_PUBLIC_SITE_URL` se usa para canonicales, Open Graph y URLs absolutas SEO.
- En produccion, ambas deben apuntar al host canonico `https://www.replaidlab.com`, que es el host publico al que redirige Vercel.
- `SUPABASE_SERVICE_ROLE_KEY` solo debe usarse en servidor. Nunca la expongas como `NEXT_PUBLIC_*`.

## Scripts

```bash
npm run dev      # servidor local
npm run build    # build de produccion
npm run start    # servir el build
npm run lint     # lint de Next.js
```

## Vercel

El repo incluye `vercel.json` con un `ignoreCommand` que ejecuta `scripts/vercel-ignore-build.mjs`.

Vercel cancelara el build cuando el diff solo toque documentacion o archivos de ejemplo:

- `README.md`
- `SEO_IMPLEMENTATION_PLAN.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `LICENSE`
- `.env.example`
- `docs/**`

Si cambia cualquier archivo de aplicacion, configuracion de build, dependencias, assets publicos, migraciones o el propio script de Vercel, el build continuara. El primer push que introduce `vercel.json` tambien deberia construir porque cambia configuracion de despliegue.

Nota: Vercel puede seguir creando una entrada de deployment en estado `CANCELED`; lo que se evita es el build/deploy de la aplicacion cuando el cambio es solo documental.

## Supabase

Para una base nueva:

1. Crea un proyecto en Supabase.
2. En `Authentication > URL Configuration`, anade `http://localhost:3000/**` como redirect local.
3. Ejecuta `supabase-schema.sql` en el SQL Editor para crear el esquema base, RLS, funciones, politicas y bucket `avatars`.
4. Ejecuta las migraciones de `supabase/migrations` en orden cronologico si la base no las tiene aplicadas:
   - `20260502_content_tables.sql`
   - `20260503_expert_stripe_connect.sql`
   - `20260505_seo_monetization_content.sql`
   - `20260505_zz_seed_initial_overwatch_guides.sql`

Tablas principales:

- `profiles`: perfil y rol del usuario (`user`, `expert`, `admin`).
- `experts`: perfiles publicos, precios, Stripe Connect, trial reviews y estado de aprobacion.
- `orders`: pedidos, importes, replay, estado, deadlines y datos de Stripe.
- `reviews`: entrega del experto, timestamps, roadmap, rating y comentario.
- `followup_messages`: mensajes de seguimiento asociados a pedidos.
- `guides`: articulos largos de la hemeroteca.
- `announcements`: noticias y patch notes.

Storage:

- Bucket publico `avatars`.
- Las politicas permiten leer avatares publicos y que cada usuario gestione archivos bajo su carpeta.

## Stripe

El checkout exige que el experto tenga `stripe_account_id`.

Flujo principal:

1. El usuario elige un experto y tier en `/experts/[id]`.
2. `POST /api/checkout` crea una sesion de Stripe Checkout.
3. Stripe cobra el total al jugador.
4. `application_fee_amount` retiene la comision de plataforma.
5. `transfer_data.destination` envia el importe base a la cuenta Connect del experto.
6. `POST /api/webhooks/stripe` recibe `checkout.session.completed` y crea el pedido en Supabase.

Para probar webhooks en local:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copia el `whsec_...` resultante en `STRIPE_WEBHOOK_SECRET`.

Stripe Connect:

- `POST /api/stripe/connect/onboard` crea o reutiliza la cuenta Connect del experto.
- `/stripe/connect/return` confirma el retorno del onboarding.
- `/stripe/connect/refresh` permite regenerar el enlace si expira.

Reembolsos:

- `POST /api/orders/[id]/refund` permite solicitar reembolso solo para pedidos `trial` pagados y marcados como reembolsables por el experto.

## Rutas Principales

Publicas:

- `/`: landing y entrada al marketplace.
- `/experts`: listado de expertos activos.
- `/experts/[id]`: perfil de experto y selector de tiers.
- `/guides`, `/guides/[slug]`: guias SEO.
- `/guides?q=...`: busqueda y filtros por rol, heroe, categoria y orden.
- `/news`, `/news/[slug]`: noticias.
- `/patch-notes/[slug]`: patch notes.
- `/heroes/[hero]`, `/roles/[role]`, `/maps/[map]`: archivos por topic.
- `/legal`: terminos, reembolsos y privacidad.
- `/robots.txt`, `/sitemap.xml`: SEO tecnico.

Protegidas por sesion:

- `/dashboard`: pedidos del usuario.
- `/dashboard/review/[id]`: lectura y valoracion de una review entregada.
- `/orders/[id]/submit`: envio del replay tras pagar.
- `/profile`: edicion del perfil y configuracion de experto.
- `/expert/dashboard`: pedidos asignados al experto.
- `/expert/orders/[id]`: entrega de la review.
- `/admin`: panel admin.
- `/admin/experts`: aprobacion y gestion de expertos.
- `/admin/orders`: supervision de pedidos.
- `/admin/content`: gestion de guias, noticias y patch notes.

El middleware protege `/dashboard`, `/expert` y `/admin`; las rutas admin requieren `profiles.role = 'admin'`.

## Contenido Y SEO

La capa SEO vive principalmente en:

- `src/lib/seo.ts`: nombre de sitio, URL base, canonicales, Open Graph y helpers.
- `src/lib/content.ts`: tipos editoriales, slugs, labels, excerpts y rutas.
- `src/app/layout.tsx`: metadata global, iconos, manifest, Open Graph, `Organization`, `WebSite` y `SearchAction`.
- `src/app/sitemap.ts`: sitemap dinamico para paginas publicas.
- `src/app/robots.ts`: reglas para crawlers.
- `src/components/content/*`: render de articulos, JSON-LD, CTAs, filtros y bloques patrocinados.
- `public/favicon.svg`, `public/icon.svg`, `public/apple-icon.svg`, `public/og-image.svg` y `public/site.webmanifest`: assets de marca/SEO.

Las tablas `guides` y `announcements` soportan:

- `seo_title`, `seo_description`, `excerpt`, `author`.
- Topic fields: `hero`, `role`, `map`, `tags`.
- `content_type`: `guide`, `news` o `patch_note`.
- Campos patrocinados: `sponsor_label`, `sponsor_title`, `sponsor_body`, `sponsor_url`, `sponsor_cta`.

Las paginas topic (`/heroes/[hero]`, `/roles/[role]`, `/maps/[map]`) renderizan una guia rapida, articulos relacionados, noticias/patch notes, FAQs con JSON-LD, enlaces internos, CTA a expertos y espacio patrocinado etiquetado.

## Flujo De Usuario

1. El usuario inicia sesion en `/login`.
2. Explora expertos o contenido publico.
3. Compra un tier o trial con Stripe Checkout.
4. El webhook crea el pedido con estado `paid`.
5. El usuario envia replay, rol, areas de foco y notas.
6. El pedido pasa a `in_review`.
7. El experto entrega resumen, errores, positivos, plan de accion, timestamps y roadmap.
8. El pedido pasa a `delivered` y se envia email de aviso.
9. El usuario lee la review y puede valorarla.

## Flujo De Experto

1. Solicita acceso en `/apply`.
2. Admin revisa y aprueba en `/admin/experts`.
3. El experto completa su perfil y precios en `/profile`.
4. Conecta Stripe desde `/expert/dashboard`.
5. Recibe pedidos pagados y entrega reviews desde `/expert/orders/[id]`.

## Estructura

```text
src/
  app/                  Rutas App Router, paginas y API routes
  app/api/              Checkout, webhooks, perfil, admin, entregas y reembolsos
  components/content/   Render editorial, filtros, CTAs, JSON-LD y patrocinio
  components/layout/    Navegacion principal
  components/ui/        Componentes UI compartidos
  lib/                  Supabase, SEO, contenido y email
  types/                Tipos de dominio, tiers y helpers de precio
supabase/
  migrations/           Migraciones SQL incrementales y seed editorial
supabase-schema.sql     Esquema base ejecutable desde SQL Editor
```

## Convenciones De Producto

- Marca actual: Replaid Lab.
- Idioma del producto: espanol.
- Moneda: EUR.
- Comision de plataforma: 20% sobre el precio base del experto.
- Tiers: `starter`, `pro`, `deep_dive` y `trial`.
- El experto fija precios base; el jugador paga precio base + comision.
- Estilo visual: fondo oscuro, acento `#ff6b2b`, titulares con Bebas Neue y cuerpo con DM Sans.
- La interfaz mantiene `border-radius: 0` globalmente.

## Verificacion Antes De Entregar Cambios

```bash
git status --short
npm run lint
npm run build
```

Tambien conviene probar manualmente:

- `/`, `/experts`, `/guides`, una guia y un perfil de experto.
- Busqueda y filtros en `/guides`.
- Una pagina topic, por ejemplo `/heroes/ana`, `/roles/support` o `/maps/kings-row`.
- Login y redireccion de rutas protegidas.
- Checkout local con Stripe CLI escuchando el webhook.
- Creacion/edicion de contenido desde `/admin/content`.

## Pendientes Conocidos

- Hay textos con mojibake visible en algunos archivos (`GuÃ...`, `Â`, `â...`). Esta deuda esta descrita en `SEO_IMPLEMENTATION_PLAN.md`.
- Queda pendiente validar JSON-LD con herramientas externas y medir Core Web Vitals en entorno real.

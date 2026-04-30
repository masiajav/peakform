# PeakForm — Setup Guide

## Requisitos previos
- Node.js v18+ (tienes v24 ✓)
- Cuenta en Supabase (tienes ✓)
- Cuenta en Stripe (tienes ✓)
- Cuenta en Vercel (pendiente — se crea gratis en vercel.com)

---

## Paso 1 — Instalar dependencias

```bash
cd peakform
npm install
```

---

## Paso 2 — Configurar Supabase

### 2a. Crear el proyecto en Supabase
1. Ve a https://supabase.com/dashboard
2. Crea un nuevo proyecto (nombre: `peakform`, región: `eu-west-2` London o `eu-central-1` Frankfurt)
3. Espera ~2 min a que se inicialice

### 2b. Ejecutar el schema de base de datos
1. En Supabase Dashboard → **SQL Editor**
2. Pega el contenido de `supabase-schema.sql`
3. Haz clic en **Run**

### 2c. Obtener las credenciales
1. Ve a **Project Settings → API**
2. Copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (solo server-side, nunca exponer al cliente)

### 2d. Configurar Auth (magic link)
1. Ve a **Authentication → URL Configuration**
2. Añade `http://localhost:3000/**` en **Redirect URLs**
3. (Para producción, añadirás `https://tudominio.com/**`)

---

## Paso 3 — Configurar Stripe

1. Ve a https://dashboard.stripe.com/apikeys
2. Copia:
   - **Secret key** → `STRIPE_SECRET_KEY`
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Instala la [Stripe CLI](https://stripe.com/docs/stripe-cli) y reenvía webhooks en local:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Copia el `whsec_...` que aparece → `STRIPE_WEBHOOK_SECRET`

---

## Paso 4 — Variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con los valores reales de los pasos 2 y 3.

---

## Paso 5 — Arrancar en local

```bash
npm run dev
```

Abre http://localhost:3000 — deberías ver la pantalla de login de PeakForm.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── login/          → Pantalla de login (GitHub OAuth + magic link)
│   ├── dashboard/      → Dashboard del usuario (lista de pedidos + banners)
│   ├── experts/        → Listado de expertos y página de detalle con TierSelector
│   ├── orders/
│   │   └── [id]/submit → Formulario de envío de replay (tras pagar)
│   ├── expert/         → Dashboard del experto (Fase 3)
│   ├── admin/          → Panel de administración (Fase 4)
│   └── api/
│       ├── auth/       → Callback de autenticación con redirect por rol
│       ├── checkout/   → Crea sesión de Stripe Checkout
│       └── webhooks/
│           └── stripe/ → Recibe checkout.session.completed → crea order en BD
├── components/
│   ├── ui/             → Badge
│   └── layout/         → AppNav
├── lib/
│   └── supabase/       → Clientes server/client
└── types/              → Tipos TypeScript + TIER_CONFIG + calculateTotal
```

---

## Fases de implementación

- **✅ Fase 1** — Fundación: Next.js + Supabase + Auth (GitHub OAuth) + tipos
- **✅ Fase 2** — Flujo de compra: listado/detalle de expertos + Stripe Checkout + webhook → orden en BD + formulario de replay
- **⬜ Fase 3** — Flujo de review: dashboard experto + Claude API drafts
- **⬜ Fase 4** — Admin panel + registro de expertos + landing

---

## Notas de diseño
- **Sin border-radius en ningún sitio** (`border-radius: 0 !important` en globals.css)
- **Bebas Neue** solo para headings, stats, botones y labels
- **DM Sans** para todo el cuerpo de texto
- Acento: `#ff6b2b` (naranja PeakForm)
- Fondo: `#0a0a0a`

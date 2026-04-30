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
3. El webhook secret (`STRIPE_WEBHOOK_SECRET`) lo obtendrás en la Fase 2 cuando configuremos los webhooks

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
│   ├── login/          → Pantalla de login (magic link)
│   ├── dashboard/      → Dashboard del usuario (sus pedidos)
│   ├── expert/         → Dashboard del experto
│   ├── admin/          → Panel de administración
│   └── api/
│       ├── auth/       → Callback de autenticación
│       ├── orders/     → Crear pedidos (Fase 2)
│       ├── experts/    → Registro de expertos
│       ├── reviews/    → Entregar reviews (Fase 3)
│       └── webhooks/   → Webhook de Stripe (Fase 2)
├── components/
│   ├── ui/             → Badge, Button, etc.
│   ├── layout/         → AppNav, Sidebar
│   ├── expert/         → Componentes del flujo experto
│   ├── user/           → Componentes del flujo usuario
│   └── admin/          → Componentes del panel admin
├── lib/
│   └── supabase/       → Clientes server/client
├── hooks/              → Custom hooks de React
└── types/              → Tipos TypeScript + TIER_CONFIG
```

---

## Fases de implementación

- **✅ Fase 1** — Fundación: Next.js + Supabase + Auth + tipos
- **⬜ Fase 2** — Flujo de compra: Stripe + pedidos + dashboard usuario
- **⬜ Fase 3** — Flujo de review: dashboard experto + Claude API drafts
- **⬜ Fase 4** — Admin panel + registro de expertos + landing

---

## Notas de diseño
- **Sin border-radius en ningún sitio** (`border-radius: 0 !important` en globals.css)
- **Bebas Neue** solo para headings, stats, botones y labels
- **DM Sans** para todo el cuerpo de texto
- Acento: `#ff6b2b` (naranja PeakForm)
- Fondo: `#0a0a0a`

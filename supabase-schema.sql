-- ============================================================
-- PEAKFORM — Schema de base de datos para Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

-- Extensiones necesarias
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

create type user_role as enum ('user', 'expert', 'admin');
create type expert_status as enum ('pending', 'active', 'suspended');
create type order_status as enum ('pending_payment', 'paid', 'in_review', 'delivered', 'disputed');
create type order_tier as enum ('starter', 'pro', 'deep_dive');
create type player_role as enum ('tank', 'dps', 'support', 'flex');

-- ============================================================
-- PROFILES (extiende auth.users de Supabase)
-- ============================================================

create table profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  role        user_role not null default 'user',
  display_name text,
  avatar_url  text,
  battletag   text,                        -- NombreJugador#1234
  created_at  timestamptz default now()
);

-- Trigger: crear perfil automáticamente al registrarse
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, role, display_name)
  values (new.id, 'user', new.raw_user_meta_data->>'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- EXPERTS (perfil público del experto)
-- ============================================================

create table experts (
  id            uuid default uuid_generate_v4() primary key,
  user_id       uuid references profiles(id) on delete cascade unique not null,
  status        expert_status not null default 'pending',
  display_name  text not null,
  battletag     text not null,             -- verificado con Battle.net
  peak_sr       integer not null default 0, -- deprecado (OW2 ya no expone SR numérico)
  peak_rank     text not null,             -- 'Top 500', 'Champion 1', 'Grandmaster 3', 'Master 5', etc.
  pro_experience text,                     -- experiencia en ligas/torneos competitivos oficiales
  main_role     player_role not null,
  bio           text,
  specialties   text[],                    -- array de tags
  avatar_url    text,

  -- Precios base (en céntimos de euro, sin comisión)
  price_starter   integer not null default 900,   -- 9€
  price_pro       integer not null default 1700,  -- 17€
  price_deep_dive integer not null default 3000,  -- 30€

  -- Stats calculadas
  total_reviews   integer default 0,
  avg_rating      numeric(3,2) default 0,
  avg_delivery_hours numeric(5,1) default 0,

  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ============================================================
-- ORDERS (pedidos de review)
-- ============================================================

create table orders (
  id              uuid default uuid_generate_v4() primary key,
  user_id         uuid references profiles(id) not null,
  expert_id       uuid references experts(id) not null,
  status          order_status not null default 'pending_payment',
  tier            order_tier not null,

  -- Importes en céntimos
  amount_base     integer not null,   -- precio del experto
  amount_commission integer not null, -- 15% de comisión
  amount_total    integer not null,   -- base + comisión

  -- Contexto del replay (enviado por el usuario)
  replay_url      text,               -- enlace a replay.gg o fichero
  replay_file_path text,              -- path en Supabase Storage
  player_role     player_role,
  focus_areas     text[],             -- ['Posicionamiento', 'Mecánicas de Ana', ...]
  user_notes      text,               -- contexto adicional del usuario

  -- Stripe
  stripe_session_id   text unique,
  stripe_payment_intent text,

  -- Timestamps de proceso
  paid_at         timestamptz,
  delivered_at    timestamptz,
  deadline_at     timestamptz,        -- calculado al pagar según tier

  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ============================================================
-- REVIEWS (contenido de la review entregada)
-- ============================================================

create table reviews (
  id          uuid default uuid_generate_v4() primary key,
  order_id    uuid references orders(id) on delete cascade unique not null,
  expert_id   uuid references experts(id) not null,
  user_id     uuid references profiles(id) not null,

  -- Contenido
  summary     text,                   -- resumen ejecutivo
  errors      text,                   -- errores identificados
  positives   text,                   -- puntos fuertes
  action_plan text,                   -- plan de mejora

  -- Timestamps de vídeo (solo tier Pro y Deep Dive)
  timestamps  jsonb default '[]',     -- [{time: "1:23", label: "Error de posición", type: "error"}]

  -- Para Deep Dive: análisis cruzado de 3 replays
  cross_analysis text,
  roadmap        text,

  -- Draft generado por IA (visible solo para el experto)
  ai_draft    jsonb,

  -- Valoración del usuario
  rating      integer check (rating between 1 and 5),
  rating_comment text,

  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ============================================================
-- FOLLOW-UP QUESTIONS (preguntas de seguimiento)
-- ============================================================

create table followup_messages (
  id          uuid default uuid_generate_v4() primary key,
  order_id    uuid references orders(id) on delete cascade not null,
  sender_id   uuid references profiles(id) not null,
  message     text not null,
  created_at  timestamptz default now()
);

-- ============================================================
-- FUNCIONES HELPER
-- ============================================================

-- Calcular comisión del 15%
create or replace function calculate_commission(base_amount integer)
returns integer language sql immutable as $$
  select round(base_amount * 0.15)::integer;
$$;

-- Calcular deadline según tier
create or replace function calculate_deadline(tier order_tier)
returns interval language sql immutable as $$
  select case tier
    when 'starter'   then interval '48 hours'
    when 'pro'       then interval '24 hours'
    when 'deep_dive' then interval '72 hours'
  end;
$$;

-- Trigger: actualizar updated_at automáticamente
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger experts_updated_at before update on experts
  for each row execute procedure update_updated_at();
create trigger orders_updated_at before update on orders
  for each row execute procedure update_updated_at();
create trigger reviews_updated_at before update on reviews
  for each row execute procedure update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table profiles           enable row level security;
alter table experts            enable row level security;
alter table orders             enable row level security;
alter table reviews            enable row level security;
alter table followup_messages  enable row level security;

-- PROFILES
create policy "Perfil propio visible" on profiles
  for select using (auth.uid() = id);
create policy "Perfil propio editable" on profiles
  for update using (auth.uid() = id);

-- EXPERTS: perfil público para listados, edición solo propia
create policy "Expertos activos públicos" on experts
  for select using (status = 'active');
create policy "Experto ve su propio perfil" on experts
  for select using (user_id = auth.uid());
create policy "Experto edita su perfil" on experts
  for update using (user_id = auth.uid());
create policy "Cualquiera puede solicitar ser experto" on experts
  for insert with check (user_id = auth.uid());

-- ORDERS: usuario ve sus pedidos, experto ve los suyos
create policy "Usuario ve sus pedidos" on orders
  for select using (user_id = auth.uid());
create policy "Experto ve pedidos asignados" on orders
  for select using (
    expert_id in (select id from experts where user_id = auth.uid())
  );
create policy "Usuario crea pedido" on orders
  for insert with check (user_id = auth.uid());

-- REVIEWS
create policy "Usuario ve su review" on reviews
  for select using (user_id = auth.uid());
create policy "Experto ve y edita sus reviews" on reviews
  for all using (
    expert_id in (select id from experts where user_id = auth.uid())
  );

-- FOLLOWUP MESSAGES
create policy "Participantes ven mensajes" on followup_messages
  for select using (
    order_id in (
      select id from orders
      where user_id = auth.uid()
         or expert_id in (select id from experts where user_id = auth.uid())
    )
  );
create policy "Participantes envían mensajes" on followup_messages
  for insert with check (sender_id = auth.uid());

-- ============================================================
-- DATOS DE EJEMPLO (para desarrollo)
-- ============================================================

-- NOTA: Ejecutar solo en entorno de desarrollo.
-- Los UUIDs de auth.users deben existir previamente.
-- Crea primero usuarios en Supabase Auth, luego descomenta esto.

/*
insert into experts (user_id, display_name, battletag, peak_sr, peak_rank, main_role, bio, specialties, status)
values
  ('UUID_DEL_EXPERTO_1', 'KingAna_EU', 'KingAna#2891', 4800, 'Top 500', 'support',
   'Jugador activo en Top 500 desde Season 5. Especializado en Support.',
   ARRAY['Posicionamiento', 'Mecánicas de Ana', 'Rotaciones support'],
   'active'),
  ('UUID_DEL_EXPERTO_2', 'FlexCoach', 'FlexCoach#1234', 4200, 'Grandmaster', 'flex',
   'Ex-competitivo. Especializado en análisis de replays.',
   ARRAY['Macro', 'Toma de decisiones', 'Gestión de ultimates'],
   'active');
*/

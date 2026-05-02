-- Announcements: short news posts written by admin
create table if not exists announcements (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  body        text not null,
  published   boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table announcements enable row level security;

create policy "public read published announcements"
  on announcements for select
  using (published = true);

-- Guides: long-form markdown articles written by admin
create table if not exists guides (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  body        text not null,
  category    text,
  published   boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table guides enable row level security;

create policy "public read published guides"
  on guides for select
  using (published = true);

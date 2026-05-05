-- SEO + monetization fields for the public content library.

create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

alter table guides
  add column if not exists excerpt text,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists author text,
  add column if not exists updated_at timestamptz default now(),
  add column if not exists hero text,
  add column if not exists role text,
  add column if not exists map text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists cover_image text,
  add column if not exists content_type text not null default 'guide',
  add column if not exists sponsor_label text,
  add column if not exists sponsor_title text,
  add column if not exists sponsor_body text,
  add column if not exists sponsor_url text,
  add column if not exists sponsor_cta text;

alter table announcements
  add column if not exists slug text,
  add column if not exists excerpt text,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists author text,
  add column if not exists updated_at timestamptz default now(),
  add column if not exists hero text,
  add column if not exists role text,
  add column if not exists map text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists cover_image text,
  add column if not exists content_type text not null default 'news',
  add column if not exists sponsor_label text,
  add column if not exists sponsor_title text,
  add column if not exists sponsor_body text,
  add column if not exists sponsor_url text,
  add column if not exists sponsor_cta text;

alter table experts
  add column if not exists slug text;

update announcements
set slug = lower(
  regexp_replace(
    regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'),
    '(^-|-$)',
    '',
    'g'
  )
) || '-' || left(id::text, 8)
where slug is null or slug = '';

update experts
set slug = lower(
  regexp_replace(
    regexp_replace(display_name, '[^a-zA-Z0-9]+', '-', 'g'),
    '(^-|-$)',
    '',
    'g'
  )
) || '-' || left(id::text, 8)
where slug is null or slug = '';

alter table announcements alter column slug set not null;

create unique index if not exists guides_slug_unique_idx on guides(slug);
create unique index if not exists announcements_slug_unique_idx on announcements(slug);
create unique index if not exists experts_slug_unique_idx on experts(slug);

create index if not exists guides_public_topic_idx on guides(published, content_type, role, hero, map);
create index if not exists announcements_public_topic_idx on announcements(published, content_type, role, hero, map);
create index if not exists guides_tags_gin_idx on guides using gin(tags);
create index if not exists announcements_tags_gin_idx on announcements using gin(tags);

drop trigger if exists guides_updated_at on guides;
create trigger guides_updated_at
  before update on guides
  for each row execute procedure update_updated_at();

drop trigger if exists announcements_updated_at on announcements;
create trigger announcements_updated_at
  before update on announcements
  for each row execute procedure update_updated_at();

create or replace function calculate_commission(base_amount integer)
returns integer language sql immutable as $$
  select round(base_amount * 0.20)::integer;
$$;

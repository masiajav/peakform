alter table announcements
  add column if not exists source_name text,
  add column if not exists source_url text,
  add column if not exists source_id text,
  add column if not exists source_published_at timestamptz,
  add column if not exists auto_imported boolean not null default false;

create unique index if not exists announcements_source_unique_idx
  on announcements(source_name, source_id)
  where source_name is not null and source_id is not null;

create index if not exists announcements_source_published_idx
  on announcements(content_type, published, source_published_at desc);

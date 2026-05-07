alter table experts add column if not exists discord_handle text;
alter table experts add column if not exists tier_starter_enabled boolean not null default true;
alter table experts add column if not exists tier_pro_enabled boolean not null default true;
alter table experts add column if not exists tier_deep_dive_enabled boolean not null default true;

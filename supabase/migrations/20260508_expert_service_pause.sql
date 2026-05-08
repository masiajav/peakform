alter table public.experts
  add column if not exists service_paused boolean not null default false,
  add column if not exists service_paused_at timestamptz,
  add column if not exists service_pause_reason text;

create index if not exists experts_status_service_paused_idx
  on public.experts (status, service_paused);

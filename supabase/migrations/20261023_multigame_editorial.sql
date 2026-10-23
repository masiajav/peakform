begin;
alter table public.guides add column if not exists game text not null default 'overwatch' check (game in ('overwatch','deadlock'));
alter table public.announcements add column if not exists game text not null default 'overwatch' check (game in ('overwatch','deadlock'));
alter table public.guides drop constraint if exists guides_slug_key;
alter table public.announcements drop constraint if exists announcements_slug_key;
create unique index if not exists guides_game_slug_key on public.guides(game,slug);
create unique index if not exists announcements_game_slug_key on public.announcements(game,slug);

create table if not exists public.editorial_pages (
 id uuid primary key default gen_random_uuid(), game text not null check(game in ('overwatch','deadlock')),
 path text not null unique, kind text not null check(kind in ('hero','counter','build','guide','news','patch_note','map','team_comp')),
 payload jsonb not null, version text not null, evidence jsonb,
 status text not null default 'staged' check(status in ('staged','published')),
 previous_revision uuid, published_at timestamptz, updated_at timestamptz not null default now(),
 check(payload->>'game'=game and payload->>'path'=path and payload->>'kind'=kind),
 check((game='deadlock' and path like '/deadlock/%') or (game='overwatch' and path not like '/deadlock/%'))
);
create table if not exists public.editorial_revisions (
 id uuid primary key default gen_random_uuid(), page_id uuid not null references public.editorial_pages(id),
 payload jsonb not null, version text not null, evidence jsonb not null, created_at timestamptz not null default now()
);
create table if not exists public.editorial_candidates (
 id uuid primary key default gen_random_uuid(), game text not null check(game in ('overwatch','deadlock')),
 path text not null, kind text not null, payload jsonb not null, version text not null,
 base_version text, evidence jsonb, created_at timestamptz not null default now(),
 unique(path,version), check(payload->>'game'=game and payload->>'path'=path and payload->>'kind'=kind)
);
create table if not exists public.editorial_runs (
 id uuid primary key default gen_random_uuid(), started_at timestamptz not null default now(), completed_at timestamptz,
 status text not null default 'running' check(status in ('running','complete','failed')),
 summary jsonb not null default '{}', cursor_at timestamptz
);
alter table public.editorial_pages enable row level security;
alter table public.editorial_revisions enable row level security;
alter table public.editorial_runs enable row level security;
alter table public.editorial_candidates enable row level security;
-- Only server-side service_role accesses these tables, including previews.
revoke all on public.editorial_pages,public.editorial_revisions,public.editorial_runs,public.editorial_candidates from anon,authenticated;
grant all on public.editorial_pages,public.editorial_revisions,public.editorial_runs,public.editorial_candidates to service_role;

create or replace function public.publish_editorial_revision(p_page_id uuid,p_version text,p_evidence jsonb)
returns uuid language plpgsql security invoker set search_path=public as $$
declare p public.editorial_pages; c public.editorial_candidates; revision_id uuid;
begin
 select * into strict c from public.editorial_candidates where id=p_page_id for update;
 if c.version is distinct from p_version or p_evidence->>'version' is distinct from p_version or p_evidence->>'reviewer' is distinct from 'codex-automated'
   or coalesce((p_evidence->'checks'->>'facts')::boolean,false)=false
   or coalesce((p_evidence->'checks'->>'sources')::boolean,false)=false
   or coalesce((p_evidence->'checks'->>'links')::boolean,false)=false
   or coalesce((p_evidence->'checks'->>'desktop')::boolean,false)=false
   or coalesce((p_evidence->'checks'->>'mobile')::boolean,false)=false
   or coalesce((p_evidence->'checks'->>'originality')::boolean,false)=false
   or length(coalesce(p_evidence->>'report',''))=0 then raise exception 'Review does not match revision'; end if;
 perform pg_advisory_xact_lock(hashtext(c.path));
 select * into p from public.editorial_pages where path=c.path for update;
 if found and p.version=c.version and p.status='published' then return p.id; end if;
 if p.version is distinct from c.base_version then raise exception 'Published version changed; stage again'; end if;
 if p.id is null then
  insert into public.editorial_pages(game,path,kind,payload,version) values(c.game,c.path,c.kind,c.payload,c.version) returning * into p;
 end if;
 select id into revision_id from public.editorial_revisions where page_id=p.id order by created_at desc limit 1;
 update public.editorial_pages set payload=c.payload,version=c.version,status='published',evidence=p_evidence,previous_revision=revision_id,published_at=coalesce(published_at,now()),updated_at=now() where id=p.id;
 insert into public.editorial_revisions(page_id,payload,version,evidence) values(p.id,c.payload,c.version,p_evidence);
 return p.id;
end $$;
revoke all on function public.publish_editorial_revision(uuid,text,jsonb) from public,anon,authenticated;
grant execute on function public.publish_editorial_revision(uuid,text,jsonb) to service_role;
create or replace function public.restore_editorial_revision(p_page_id uuid,p_expected_version text)
returns void language plpgsql security invoker set search_path=public as $$
declare p public.editorial_pages; r public.editorial_revisions;
begin
 select * into strict p from public.editorial_pages where id=p_page_id for update;
 if p.version is distinct from p_expected_version then raise exception 'Version changed'; end if;
 if p.previous_revision is null then update public.editorial_pages set status='staged',updated_at=now() where id=p.id;
 else
  select * into strict r from public.editorial_revisions where id=p.previous_revision and page_id=p.id;
  update public.editorial_pages set payload=r.payload,version=r.version,evidence=r.evidence,previous_revision=null,updated_at=now() where id=p.id;
 end if;
end $$;
revoke all on function public.restore_editorial_revision(uuid,text) from public,anon,authenticated;
grant execute on function public.restore_editorial_revision(uuid,text) to service_role;
commit;

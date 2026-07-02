alter table announcements
  add column if not exists source_sections text[];

comment on column announcements.source_sections is
  'Section headings detected in the official source for editorial triage.';

update announcements
set published = false
where content_type = 'patch_note'
  and auto_imported = true
  and published = true
  and not (coalesce(tags, array[]::text[]) @> array['editorial-review-complete']::text[]);

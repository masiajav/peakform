# Overwatch landing news and daily-update audit

## Requested change

Keep actual news and patches directly after the Overwatch introduction. Do not
fill that space with recently revised evergreen guides. Preserve the guide
discovery widgets in their own hubs, all existing routes and their indexing.

The landing variant now excludes every kind except news and patch_note even
if a future caller accidentally supplies guides. It sorts and displays actual
publication dates, not the date of a guide correction. Inline hub variants
retain revision dates, search and hero filters. Empty news does not fall back
to guides. The header has a normal news link and wraps at narrow widths.

The Season 5 feature remains, labelled as the current season rather than the
latest update. Its introduction no longer presents the October 13 hotfix as
the newest patch. No news article, publication timestamp or schema was changed.

## Daily-update findings

Read the configured heartbeat and queried editorial_runs in Supabase without
writes. It is ACTIVE at 20:00 Europe/Madrid, using the desktop Codex session.
It requires the machine and app to be available; it is not an always-on server
worker. The October 27 scheduled turn completed, independently visible in the
task history and the database: 19:00:39Z to 19:08:21Z (20:00–20:08 local).
It published no changes because it found no sufficiently supported novelty.

No October 26 run is recorded. The earlier October 27 catch-up explicitly
recovered the interval from the last completed October 25 cursor and updated
the Abrams and Dynamo builds. Do not claim flawless daily punctuality or
invent the reason for the missing execution. The supplied site screenshot
shows article revision dates, not evidence of a scheduler run.

The temporary AdSense restriction is still active: update existing articles,
no new routes, at most two updates per game and no publication quota. This
audit does not alter the schedule, task prompt, publication policy or ads.

Separately, vercel.json schedules a patch importer at 06:00 UTC. Its handler
creates unpublished drafts. No server scheduler logs were inspected, so the
successful editorial heartbeat does not certify every server-cron invocation.

The actual Spanish Blizzard patch index returned HTTP 200 on October 27 and
the existing parser found October 20, October 13 and October 6 in that order.
The October 20 editorial article is published with valid exact-version
evidence. Its actual editorial publication date is October 24, distinct from
the official patch's October 20 date. No artificial freshness was introduced.

## Verification

Isolated snapshot of published base adbbe60 plus exactly five scoped files;
unrelated map drafts, map tests and tsconfig changes were excluded, not reverted.
Node 24.22.1; clean lint, 697 unit tests across 91 files, successful production
build, and 27 browser tests at 1440, 390 and 320px, one worker, no retries.
The browser run covers news-only placement, publication dates, navigation,
canonical/H1, previous event dates, overflow and absence of ads. Read the actual
local landing in IAB and inspected desktop/mobile/narrow viewport captures.

Earlier checks exposed sandbox-only temp/cache and localhost permission errors;
the full verification was rerun with the patched absolute Node runtime and
permitted localhost access. Preserve those failed logs rather than treating
them as passing application checks. An English-index parser probe was not a
successful check; the real importer uses the Spanish index and that check passed.

The inspection and preview were initially left local. The user subsequently
authorized commit and push of this news-only landing change and its tests.
No dependency installation, database publication, automation mutation, payment
or expert change is included. Evidence is local in
reports/news-home-2026-10-27/. The preview uses a separate build on port 3028.

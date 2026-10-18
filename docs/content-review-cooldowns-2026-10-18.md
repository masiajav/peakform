# Cooldown guide: conditional decisions instead of prohibitions

## Existing route and observed content

Read the actual old guide before rewriting. It prescribed saving Suzu for
anti/ultimate/burst, treated damage against a small amount of lost health as
automatically bad, recommended no Sleep in poke and no Dash without a reset,
and introduced fixed five-second/ten-match review rules. Some caveats elsewhere
contradicted those rules. Internal links had generic labels and the body did
not separate decision, execution, known information and hindsight clearly.

The existing URL is /guides/como-revisar-cooldowns-overwatch. A fresh local HTTP
read of its BlogPosting confirmed datePublished
2026-06-21T12:10:02.805891+02:00 and dateModified
2026-06-28T18:39:29.578534+02:00. Preserve the real June 21 publication day;
October 18 is the actual revision, not a new publication date.

## Changes and boundaries

- Repository-owned article at the same URL, using the existing Evergreen
  renderer, navigation, FAQ, correction link and Article CTA. No second URL,
  database write, account action, redirect or ad activation.
- Compare using and holding a cooldown, not only deaths. Distinguish a failed
  shot from a reasonable decision and a later bad position from a previous
  useful ability. Read the player's own camera before using other perspectives.
- Separate Suzu before a lethal crossing from a low-pressure safe heal;
  Sleep as an actual response from saving indefinitely for a possible Blade;
  Matrix resource/orientation from Boosters' arrival and pursuit; Dash with a
  playable landing from an entry depending on an elimination reset.
- Optional Swift Cuts, normal-versus-Stadium differences and the actual HUD
  replace invented universal timers. Overtime and missing information are
  explicit exceptions, not a promise to win every situation.
- Link existing hero/map pages and the existing free VOD notebook. The
  example review note is hypothetical, not invented personal/client testimony.
- Discovered cards and editorial metadata use the same repository title,
  answer, description and review date, preserving DB identity, category, role
  and original created_at. Reading-time text reflects the current article.
  Draft rows remain undiscoverable; no blanket approval follows a static slug.
- The curated evergreen card list is unchanged: no extra duplicate overview
  card is added alongside the existing database discovery card. The guide hub
  has a real changed excerpt, so its lastmod is updated; other unrelated dates
  are not renewed.

## Primary research

Official indexed normal-hero results were inspected. Direct retrieval of the
Kiriko hero page returned 403; its indexed ability descriptions were available.
Do not imply full direct retrieval or use the adjacent Stadium powers and old
experimental/Community Crafted patch results as normal ranked abilities.
No historical numerical cooldown/damage value is copied into the advice.

- https://overwatch.blizzard.com/en-gb/heroes/genji/
- https://overwatch.blizzard.com/en-us/heroes/ana/
- https://overwatch.blizzard.com/en-gb/heroes/dva/
- https://overwatch.blizzard.com/en-gb/heroes/kiriko/
- https://overwatch.blizzard.com/en-us/heroes/winston/

The public article has no artificial sources, SEO or internal editorial-process
section. It adds specific player decisions rather than filling a word quota.

## Verification in progress

The unapproved draft remains noindex/no ads. New fixture tests cover current
card metadata, immutable stored dates, published=false, the body and visible
schemas without a database call, and edit-invalidation/no-ad behaviour. One
initial assertion matched the new heading's explicit negation of a rigid rule;
removed that false positive and retained an assertion for the real contextual
exception. All 506 unit tests and lint pass. Isolated build, full rendered
reading, desktop/mobile screenshots, all main links, search-to-article-to-free
notebook navigation, exact-version approval and final regression remain pending.

The prior Cassidy composition/guide recommendation batch remains local and
untouched. No commit, push, deployment, AdSense request or serving activation
is included. This document does not certify the rest of the site or Google
acceptance; other legacy guides and production/account checks remain open.

The draft build passes. Read the complete rendered main and all six already
visible FAQ answers in the internal browser. Clarified an ambiguous Matrix
recharge reference, a grouped enemy crossing and the replay timestamp before
the final draft. The first readonly helper timed out looking for FAQ details;
this renderer uses visible article cards. Target its actual FAQ section/cards,
retain the six-answer schema/visible-text checks and rerun. Do not change the
public FAQ implementation just to satisfy the helper's incorrect assumption.

The next helper run reached the search card and exposed another test assumption:
that card displays guideEditorial.description, not its quickAnswer excerpt.
The unit fixture confirms both values are updated; check the actual visible
description in navigation tests. No runtime UI change is needed for that check.

The helper then clicked the correct card but read the URL before Next's client
navigation completed. Wait for the expected URL and the actual notebook region,
not a fixed sleep. The registered browser tests already use web-first URL/region
assertions. After these helper fixes the final draft passes all three viewports,
all main links, matching schemas, search-card navigation and the free notebook,
with 131 unchanged sitemap URLs and no errors. No assertions are removed to
accept an empty card/FAQ or a failed navigation.

Actually viewed 1440/390/320px headers, 390px Kiriko and comparison-method
sections, and a desktop FAQ card. Read the complete article/FAQ in the internal
browser and reread the changed Matrix and unused-cooldown passages after the
final prose correction. Manually followed search -> article -> notebook without
entering or changing any user notes. Temporary preview server/tab are closed.

Only then, readonly inspection returned
cfa12b13de240651d2df7b8f38dba18677de41efd8f24199895774390bf7c158.
Approve that exact version, indexable/no ads, with October 18 review date.
All previous approval hashes are preserved. Final approved build, exact sitemap
comparison, seeded inventory and full regression remain pending.

## Approved local checks

The approved isolated build succeeds. The readonly helper passes again, with
the same three rendered article snapshots as the reviewed draft and no errors.
Exact URL-set comparison adds only the existing cooldown URL to the previous
131 sitemap entries; its lastmod is October 18. No other route is removed.
The seeded audit covers 331 paths and 160 prerendered public paths, with an
empty remaining queue: 132 indexable, 199 noindex. The same word-count
heuristics for /counters and the functional Arcade remain; no padding is added.
No strongest-similarity pair is reported, which is not proof of site quality.

Full verify has passed clean lint, all 506 unit tests in 60 files and the
approved production build. The complete browser suite is running; application
source is frozen. Temporary audit preview is stopped after its successful
checks. Final regression result will be recorded only after the live process
finishes. No approval guarantee, live financial test or production/CMP/account
readiness is inferred from these local checks.

## Next observed content problem

While the regression runs, read both complete public VOD articles in the
internal browser on the test server, without reading/changing notebook notes.
The legacy /guides/como-mejorar-en-overwatch-revisando-vod repeats the same
entry-level intent as /guides/review-vod-overwatch-espanol but still exposes
"CTA" and "Enlaces internos" headings and generic related-link labels. It
also prescribes only lost fights, fixed ten-match corrections and rigid Suzu,
Deflect/Roll/mobility rules. The current notebook article already covers the
useful review method, context, practical examples and preparation for a coach
more carefully. Evaluate consolidation with working old links rather than
creating another near-identical long article. Neither route is changed in
this cooldown batch. This reading is evidence of remaining work, not a claim
that the whole-site objective is complete.

## Final regression

`npm.cmd run verify` completed with exit 0 on October 18: clean lint,
506 unit tests in 60 files, the isolated verification production build, the
separate E2E production build, and 822 desktop/mobile browser tests passed
in 12.9 minutes. The eight existing mobile keyboard/fullscreen gameplay cases
are intentionally skipped; no new skip or retry was added. This full run also
covers the previously local Cassidy composition and expert recommendation
changes, including the corrected visible-price comparison on both projects.
No runtime source changed during this successful run. Temporary previews and
review tabs are closed; no commit, push or deployment is included.

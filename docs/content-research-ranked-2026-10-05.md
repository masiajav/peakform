# Seven ranked guides: revision in progress, 5 October 2026

The previous goal turn yielded authoritative preparation and read-only date
evidence, not a completed publication review. This batch changes the seven
existing ranked guide models, their metadata and sitemap publication gate.
It does not alter payments, accounts, public route names or the database.

## Original date evidence

A read-only Supabase query selected slug, title, created_at, updated_at and
published for the seven published ranked records. All seven have created_at
2026-06-21T10:10:02.805891+00:00 and updated_at
2026-06-28T16:39:29.578534+00:00. No credential was printed, no row was changed.
The site convention uses the original row creation date as datePublished;
the exact first public deployment timestamp is not independently established.
There is no evidence supporting the old common date of 10 May. The repository
model first appears in commit 5bfcd1c dated 6 September. June 21 is preserved
from the original records; October 5 describes this actual textual revision.

## Primary references and limits

- https://overwatch.blizzard.com/en-us/heroes/ana/
- https://overwatch.blizzard.com/en-gb/heroes/genji/
- https://overwatch.blizzard.com/en-gb/heroes/cassidy/?mobile-app=true&theme=false
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2024/06/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2023/05/

Official search-cached content was available where direct hero page requests
returned 403. No successful direct request or in-game interaction test is
claimed. Older patch notes support interactions, not current numerical balance.
June 2024 distinguishes Sleep cleansing from applied Earthshatter knockdown
and restores Flashbang with Hinder, not its former full stun. Existing individual
hero research for D.Va, Winston and Cassidy also distinguishes normal ranked
kit from Stadium and Community Crafted event modifications.

## Editorial work

Ana: follow-up after Sleep/anti, conditional use of both cooldowns, Nano with
reach and follow-up, a Gibraltar rotation example. Kiriko: ofuda travel without
a mandatory kunai cadence, correct Suzu limits, teleport destination and play
after Suzu at King's Row. Genji: actual allied pressure rather than a fixed
delay, escape without a reset, Deflect direction, second Dash decision at Dorado.
Cassidy: real Flashbang/Roll limits, ammo and follow-up, distinguish mechanical
misses from exposure, change between angle and peel at Midtown.
Reinhardt: second angles before lowering barrier, Charge cancellation, Shatter
protection versus cleanse, a King's Row retreat. D.Va: one allied Tank in 5v5,
Matrix projectiles versus rays/ground effects, pilot safety/overtime, preserving
height after expelling a DPS. Winston: jump distance does not alter cooldown,
specific bubble sightlines rather than all healing, Primal displacement result,
an exit planned before a Numbani dive. Examples are hypothetical, not personal
experience or measurements made in game.

At the preparation stage the seven guides had no exact-version approval and
remained noindex/follow without ads. Their later individual reading, mobile/
desktop checks and manual registration are recorded in
content-review-ranked-guides-2026-10-05.md. Final lint, 350 unit tests, build
and 710 Playwright cases passed with zero retries (11.5 minutes). Neither
length, this preparation document nor a successful build approves an article.

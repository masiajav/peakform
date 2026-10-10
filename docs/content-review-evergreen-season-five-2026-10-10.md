# Evergreen guide review, 10 October 2026

Private release evidence, not a public source or process block. Reviewer: Codex.
Public author and publisher remain Replaid Lab. No invented personal testing,
ranking data, win rates or guaranteed outcomes.

## Individual decisions

| Route | Specific editorial review |
| --- | --- |
| `/guides/como-mejorar-en-overwatch` | Separates aim from position, explains first-death limitations and cooldown opportunity cost, gives role-specific examples and conditional two-Tank protection. |
| `/guides/como-subir-de-rango-overwatch` | Pool alternatives, readiness before engage, advantage management, overtime exceptions and a practical review routine without promised rank gains. |
| `/guides/mejores-heroes-overwatch` | Selection by map and execution, current Support roles for Sombra/Doctrine, no fabricated tier ranking or future-tense D.Mon claims. |
| `/guides/counters-overwatch-guia-completa` | Zarya beam/Matrix limits, Ana's remaining help after Sleep, current Sombra kit, peel without chasing and ultimate/time trade-offs. |
| `/guides/composiciones-overwatch-5v5-6v6` | Three explicit 1/2/2 examples and two explicit 2/2/2 examples, replacements with real trade-offs, current Sombra/Doctrine Support slots. Not Stadium or open-queue rules. |
| `/guides/review-vod-overwatch-espanol` | Replay versus recorded perspective, available-information bias, ability cost, overtime, working materials and expert-specific service limits. |

All six complete rendered articles and their 27 visible FAQ answers were read
in the internal browser. Header screenshots were inspected at 1440x1000 and
390x844, plus related links/FAQ at mobile size. No blank page, white background,
overlapping text or clipped heading was found. One common renderer now gives
the answer before the introduction and uses fixed responsive heading sizes.
The previous June/August publication dates are preserved; modification is
10 October, not a fresh invented publication date.

## Accuracy checks

Primary references consulted, not copied as public source blocks:

- [October patch notes](https://overwatch.blizzard.com/en-us/news/patch-notes/retail/): direct access returned 403. The search-indexed official October 6 extract confirmed Sombra's Support role, removal of normal Hack and Weaken reducing enemy damage/healing output. No claim of successful direct retrieval.
- [Season 5 announcement](https://news.blizzard.com/en-us/article/24303008/feed-your-hunger-in-reign-of-talon-season-5-a-grim-doctrine): indexed official announcement confirms Doctrine's arrival and Support role.
- [Ana](https://overwatch.blizzard.com/en-us/heroes/ana/), [D.Va](https://overwatch.blizzard.com/en-us/heroes/dva/), [Kiriko](https://overwatch.blizzard.com/fr-fr/heroes/kiriko/): official indexed hero material and the previously documented individual hero/composition reviews informed the kit checks. No Stadium Powers or optional perks are silently treated as base abilities.
- [Official replay introduction](https://news.blizzard.com/en-us/article/23000187/introducing-overwatch-replays-see-your-past-games-from-new-perspectives) and [August notes](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/08/): replays can reset with patches, but not every hotfix resets them. Advice says updates *can* invalidate a replay, not that all updates do.
- Existing expert page/service flow was inspected for the request context. No universal delivery duration, price or rank guarantee is promised.

Tactical examples are conditional analysis, not measured meta claims. Sombra
does not disable heroes with normal Hack; EMP is explicitly distinguished.
Weaken is not described as reduced incoming healing. Matrix is not beam or
melee immunity. A spent Suzu does not guarantee the next dive.

## Approval boundary and pre-approval verification

`reports/evergreen-release.mjs` independently checked twelve desktop/mobile
views: HTTP 200, single H1, unique titles/descriptions, canonical, valid
BlogPosting/Breadcrumb/FAQ JSON-LD, exact visible FAQ correspondence, historical
publication dates and actual modification, functioning internal links, dark
background, no horizontal overflow, no console/page/asset errors and no ad
execution or slots.

Before reviews were registered, all six routes were `noindex, follow` and absent
from the sitemap (112 URLs). Existing sitemap membership was otherwise unchanged.
Evidence: ignored `reports/evergreen-season-five/local-review.json` and screenshots.
Targeted unit tests passed (19); lint and isolated verification build passed.

The new gate requires exact-version review plus metadata, dates and structure.
A database row or a known slug cannot approve these static articles. Ads remain
blocked even for approved articles. The review-version inspector is read-only.
No build process generates or renews review approval. Existing reviews for
other articles are unchanged.

Final full-suite, final sitemap comparison and production verification are
recorded below only after they complete. This evidence is not a claim of Google
approval, certified CMP setup, fiscal completeness or authenticated checkout.

## Final local review

After registering the six exact-version reviews, the independent release check
passed all twelve views again. Content, metadata, visible FAQ and schema matched
the manually reviewed pre-approval version. All six are now `index, follow`, but
remain in `index_no_ads`. Each sitemap date is the actual 10 October revision.

The final sitemap has 118 URLs, with exactly the same membership as the previous
D.Va/Winston release: no added routes, removed routes or database overrides.
Evidence: ignored `reports/evergreen-season-five/local-final.json`.

The full local inventory found 330 public documents: 118 indexable and 212
`noindex`. The six guides had no audit issues; no high-similarity pairs were
reported. The sole pre-existing heuristic warning concerns the `/counters` hub
being shorter than the audit's generic threshold. That threshold is not a Google
minimum and is not a reason to pad the hub. Evidence: ignored
`reports/evergreen-season-five/audit-local-final.json`.

The internal browser also confirmed real navigation from `/guides` to the
counter guide and then `/counters/sombra`. The updated home summaries and all
five listing cards were visually inspected at desktop and mobile sizes without
clipping, white backgrounds or overlaps. The React check found server-only
rendering, stable list keys, semantic headings/dates and no new client dependency.

Production still needs its separate post-deploy check; local results alone do
not demonstrate what the public domain serves.

`npm.cmd run verify` completed successfully: uncached lint, 408 unit tests across
48 files, isolated verification build (193 routes), and 760 desktop/mobile
Playwright tests. The browser suite took 9.9 minutes. Navigation produced some
server-side `ResponseAborted` warnings, but no test failed; these warnings are not
described as proof of a production fault or silently converted into test failures.
Authenticated Stripe checkout was not exercised, and local expert-status reads
still reported the previously known Stripe authentication issue. No payment or
onboarding implementation was changed in this release.

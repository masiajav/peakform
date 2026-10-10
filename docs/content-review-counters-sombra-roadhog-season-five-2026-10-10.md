# Individual counter reviews: Sombra and Roadhog, Season 5

Review date: 2026-10-10. Reviewer: Codex. Public author: Replaid Lab.

## Scope and factual checks

Only `/counters/sombra` and `/counters/roadhog` receive new publication
approval. Each was read in full and revised individually. These are tactical
examples, not claims of personal playtesting, win rates or a solved meta.

Official material checked: the October 6 retail patch, current Sombra and
Roadhog hero pages and Orisa's Fortify description. Some direct official
requests returned HTTP 403; indexed official extracts were available. No
access restriction was bypassed. Older Spanish Sombra extracts still showing
the DPS kit were not used for the current ability facts.

- https://overwatch.blizzard.com/en-us/news/patch-notes/retail/
- https://overwatch.blizzard.com/en-gb/heroes/sombra/
- https://overwatch.blizzard.com/en-us/heroes/roadhog/
- https://overwatch.blizzard.com/en-us/heroes/orisa/

Sombra: Support launch status, three-second Cyberspace, 50% output reduction
distinguished from silence and received antiheal, two Hotfix charges, retained
EMP hack/barrier destruction and conditional, mutually exclusive perk choices.
Roadhog: two-burst weapon, frontal two-second absorption before explosive
return, six/seven-second base hook by format, optional ultimate hook perk and
antiheal not erasing Breather damage reduction. Fortify protects Orisa from
control, not her exposed teammates. No undocumented beam/absorption matchup
or Stadium interaction was introduced.

Each article has four distinct threats, timing windows, adaptation by role,
three map situations, common errors, a VOD checklist, three FAQs and its own
conclusion. Related composition links were added. The optional counter
conclusion leaves other articles without that field unchanged.

## Checks actually completed before registration

- Lint without cache: passed.
- Unit suite: 392 tests passed before registration changes.
- Isolated `.next-verify` build: 193 routes generated, exit 0.
- Independent local review: four desktop/mobile views, 114 sitemap URLs,
  zero page, console or same-site HTTP errors.
- Main links returned 200; portraits decoded; one H1, unique metadata,
  canonical, actual review date and Article/FAQ content agreed.
- Both routes were still `noindex, follow` at this initial check.
- In-app browser: read full articles, opened all FAQ answers, inspected
  desktop FAQ/conclusion and mobile headers, timing/FAQ/conclusion layouts.
  No white screen, horizontal overflow, missing portrait or clipped text.
- No ad slots, placeholders or advertising execution loaded.

Local evidence: `reports/counters-sombra-roadhog-season-five/local-review.json`
and its four full-page screenshots. Final release checks are recorded below
after they finish; initial checks do not claim deployment success.

## Final local comparison and crawl

The independent final check passed four views. Text, metadata, schema and
links match the initially reviewed pages exactly. Robots are now indexable;
the sitemap adds only these two counters, from 114 to 116 URLs, with no
removals and the real October 10 revision date.

The inventory/manifests crawl finished all 330 documents: 116 indexable and
214 noindex, no remaining queue, no high-similarity pairs. Its single issue
is the counters hub below a generic word-count heuristic, not a Google
minimum or a reason to pad it. These are automated checks, not blanket
editorial certification. Evidence: `local-final.json` and
`audit-local-final.json` in the same local report folder.

The crawl's local server again logged Stripe authentication warnings when
reading expert payment status with the existing local credentials. No
credential was changed and no charge was attempted. Anonymous-route tests
do not constitute an authenticated checkout test.

## Publication decision and limits

`npm run verify` finished with exit 0: lint without cache, 393 unit tests
in 46 files, isolated 193-route build and all 754 desktop/mobile Playwright
tests (9.6 minutes). Both counter conclusions and metadata are tested for
review invalidation after an unreviewed edit. No served article or runtime
code changed after these checks.

Register only the exact two content hashes with individual review evidence.
The intended result is `index, follow`, sitemap inclusion and no ads. Any
subsequent article change requires another review; no other records are
renewed. Existing public routes remain accessible.

This batch does not certify all remaining editorial pages, authenticated
checkout, certified CMP configuration, tax identity details or AdSense
approval. Advertising remains disabled and the user handles the review.

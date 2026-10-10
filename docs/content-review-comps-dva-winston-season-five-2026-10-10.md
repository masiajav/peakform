# Individual composition reviews: D.Va and Winston

Review date: 2026-10-10. Reviewer: Codex. Public author: Replaid Lab.

## Scope and factual checks

Only `/team-comps/dva` and `/team-comps/winston` receive new approval.
Both existing articles were read in full and individually rewritten. Routes
and useful sections remain; no historical publication date was invented.

Official material checked: current D.Va and Winston hero descriptions and
the October 6 retail patch. Indexed official extracts were available; some
direct requests returned 403. No access restriction was bypassed.

- https://overwatch.blizzard.com/en-us/heroes/dva/
- https://overwatch.blizzard.com/en-us/heroes/winston/
- https://overwatch.blizzard.com/en-us/news/patch-notes/retail/

The old Sombra DPS lineups and substitutions were removed. Current Support
substitutions explain lost protection or cleanse rather than preserving the
old hack plan. D.Va's frontal projectile protection is not beam or melee
immunity. Winston's optional Revitalizing Barrier healing is explicitly a
major perk, not base kit healing. No Stadium power is imported into ranked.

These are tactical examples, not personal playtesting, win-rate evidence,
a solved meta or guaranteed eliminations. D.Va focuses on height control,
Matrix allocation and returning to protect Supports. Winston focuses on
DPS preparation, healing sightlines, bubble placement and conditional
second entries. Sharing a plausible 6v6 lineup does not duplicate prose.
Each article has three teams with tradeoffs, three distinct ranked examples,
VOD questions, five FAQs, a quick answer and its own conclusion.

## Checks completed before registration

- Unit suite: 393 tests passed before approval changes.
- Isolated `.next-verify` build: 193 routes, exit 0.
- Independent local review: four desktop/mobile views, 116 sitemap URLs,
  zero page, console or same-site HTTP errors.
- Both routes were still `noindex, follow`; neither was in the sitemap.
- Main internal links returned 200 and portraits decoded. Metadata,
  canonical, one H1, actual review date, Article and visible FAQ agreed.
- In-app browser: full articles read, all ten FAQs opened and read,
  cross-navigation between articles tested. Desktop header/FAQ/conclusion
  and mobile header/lineup/VOD/FAQ layouts inspected without white screen,
  horizontal overflow, missing portrait or clipped text.
- No ad slots, placeholders or advertising execution appeared.

Local evidence: `reports/dva-winston-compositions/local-review.json` and
its four full-page screenshots. Final checks are recorded below only after
completion. Registration binds the exact content versions; edits require a
new review and no other approval records are renewed.

## Final local comparison and crawl

The final independent check passed four views. Text, metadata, schema and
links exactly match the initially reviewed versions. Robots are now indexable;
the sitemap adds only the two reviewed compositions, from 116 to 118 URLs,
with no removals and the October 10 revision date.

The inventory/manifests crawl finished all 330 documents: 118 indexable and
212 noindex, no remaining queue and no high-similarity pairs. Both revised
articles have no automated issues. The one existing heuristic finding is
the counters hub below a generic word count, not a Google minimum and not
a reason to pad it. Evidence: `local-final.json` and `audit-local-final.json`
in the same report folder. This crawl does not approve other articles.

The local server logged the existing Stripe authentication warnings while
reading expert payment status. No credential or payment code changed and
no charge was attempted. Anonymous access tests do not prove a checkout.

## Release verification

`npm run verify` finished with exit 0: lint without cache, 398 unit tests
in 47 files, isolated 193-route build and all 758 desktop/mobile browser
tests (9.8 minutes). A metadata test that still listed these newly reviewed
compositions as pending was updated; unreviewed Shion and Cassidy
compositions retain negative indexing assertions. The final full run passed.

The new tests validate role counts, optional healing, Matrix limits,
conditional repeat entries, matching FAQs/schema, links and review
invalidation after unapproved advice, lineup or metadata changes. No served
content or runtime code changed after the final verification build.

## Limits

These two pages do not certify the remaining editorial backlog, authenticated
checkout, fiscal details, certified CMP configuration or AdSense approval.
Ads remain disabled; the user handles the external review.

Next editorial priority identified during this batch: the independently
routed evergreen counter guide still contains an old Sombra/Hack example in
`evergreen-guides.ts`, and the evergreen composition guide needs a current
roles/timing review. This batch does not change or certify either guide.

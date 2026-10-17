# Winston and Cassidy counter review

Both existing counter routes still described a Season 3/July review. Neither
had an exact-version approval or a known publication date. Preserve the routes
and omit an invented datePublished. The expert-service changes are documented
separately; these article approvals do not certify payment readiness.

## Individual corrections

- Winston: distinguish spending Jump Pack from dropping off an existing
  height; do not promise an immediate fixed no-escape window. Explain which
  side of the bubble cuts Ana's healing and why helping a Support is not the
  same as chasing the Tank. Matrix is not protection from Tesla's primary.
  Normal optional Minor/Major choices are distinct from Stadium powers.
  Gibraltar, Numbani and Lijiang examples have different problems and choices.
- Cassidy: Roll reloads rather than leaving an empty weapon; critical hits
  can accelerate its recovery. Hinder is not the former full stun. Bang Bang,
  Giddy Up and the alternative Major choices change the read without giving
  every Cassidy every perk. Deadeye protection depends on the firing line,
  not a guarantee from simply choosing a barrier Tank. Circuit Royal,
  King's Row and Midtown examples cover range, a supported retreat and a
  necessary crossing, not three interchangeable dive examples.
- Each article contains six conditional matchup choices, adaptation by role,
  five specific replay questions, five FAQs and a distinct conclusion. Examples
  are hypothetical advice, not invented client reviews or personal playtests.
- Internal-browser reading found and corrected ambiguous Cassidy pronouns,
  a barrier apparently belonging to Cassidy and awkward perk/ability headings.
  Do not treat a successful build as a substitute for reading the article.

## Primary research inspected on October 17

Direct requests for Blizzard's hero/live pages returned 403. Official indexed
hero results and indexed patch notes were available. Do not claim successful
direct retrieval or treat an unrelated experimental/Community Crafted change
as the current ranked kit.

- https://overwatch.blizzard.com/en-gb/heroes/winston/
- https://overwatch.blizzard.com/es-es/heroes/winston/
- https://overwatch.blizzard.com/en-gb/heroes/cassidy/
- https://overwatch.blizzard.com/en-gb/heroes/cassidy/?mobile-app=true&theme=false
- https://overwatch.blizzard.com/en-gb/heroes/dva/
- https://overwatch.blizzard.com/en-us/heroes/brigitte/
- https://overwatch.blizzard.com/en-us/heroes/ana/?mobile-app=true&theme=false
- https://overwatch.blizzard.com/en-gb/heroes/bastion/
- https://overwatch.blizzard.com/en-gb/heroes/genji/
- https://overwatch.blizzard.com/en-us/news/patch-notes/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2024/06/

The October 13 indexed hotfix agrees with the existing news article; this
batch does not invent Winston/Cassidy-specific October balance changes.
The historical June 2024 note establishes the Flashbang/Hinder distinction,
not current numerical durations or damage. No historical number is copied.
The public pages do not add an artificial sources/process/SEO section.

## Preapproval checks

Clean lint, 490 unit tests and an isolated production build passed before the
final manual prose polish. One initial new unit assertion differed only in
capitalisation of an existing sentence; the assertion was corrected without
weakening the normal-Hack distinction. No runtime game change was needed.

Read both complete rendered main articles in the internal browser, including
expanded Winston FAQ. The readonly six-view helper checks canonical, a single
H1, current date, Article/Breadcrumb/FAQ agreement, every main internal link,
decoded portraits, dark background, no horizontal overflow, and no ad code.

An initial helper URL-set comparison failed because homepage canonical and
sitemap used equivalent origin spellings with/without trailing slash. Both
sets now use URL.href normalisation; exact set comparison is retained. No
runtime canonical/sitemap code was changed to appease that check.

The first preapproval run passed six views with 128 sitemap entries. After
the final prose polish, the six-view run passed again with the same sitemap
and no errors. Read the changed Cassidy passages and expanded all five of
its FAQ answers in the internal browser. Actually inspected both desktop
headers, both 390px headers, both expanded desktop FAQ captures and both
390px VOD sections. The automated 320px checks also passed; no claim that
every captured scroll position was manually inspected.

Only after those checks, readonly version inspection returned:
- /counters/winston: e16e1f8d088977335ab2e5b79408820e18d710451a703c8744e9d60f64100b14
- /counters/cassidy: 9d3ac971b6de50b228dedc0c45f3c8a5697e5f6741cf01da59e7e75e64a1cac8

Manual records approve only these versions, indexable without advertisements.
The first verify attempt correctly rejected two newly registered paths missing
from the test's explicit approved-path list. Added only those two paths to that
list; retained the exact-list, evidence-file and post-edit invalidation checks.
The next run passed clean lint and all 490 unit tests, then completed the
isolated approved production build.

The full browser run completed with 809 passed, eight existing mobile keyboard
game skips and three failed tests. Two failures were the same independently
maintained counter expectation on desktop/mobile: it still listed Winston and
Cassidy as noindex. Added only these two reviewed counters. The third test had
a 55-second bounded gameplay loop within Playwright's default 30-second limit.
Its test-specific limit is now 90 seconds, allowing engine startup and that
observation without changing gameplay or any assertions. A rebuilt
`npx playwright test --last-failed` run passed all three cases, including the
actual objective/upgrade game check. No application source changed between
the full run and this targeted rerun. This is not a claim that the original
`npm run verify` invocation exited successfully.

## Approved local release checks

The readonly six-view helper passes again after approval: 130 sitemap entries,
no errors, the same six rendered article snapshots as the reviewed drafts.
Only /counters/winston and /counters/cassidy are added to the previous 128-URL
set, with October 17 lastmod. No existing URL is removed or redirected.
Report: reports/winston-cassidy-counters-2026-10-17/approved.json.

Final seeded inventory: 331 public paths, 130 indexable and 201 noindex,
159 prerendered public paths and an empty remaining queue. Same two existing
word-count heuristics; no strongest-similarity pair. These measurements do
not certify the whole site or exclude noindex pages from AdSense inspection.
Report: reports/winston-cassidy-counters-2026-10-17/inventory-final.json.

No Google acceptance, fiscal/legal completeness, real Stripe payment or
certified CMP readiness is inferred. No push, deployment, ad activation or
review request is made. Temporary audit preview and browser tab are closed.

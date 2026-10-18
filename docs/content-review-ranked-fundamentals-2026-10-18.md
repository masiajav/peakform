# Tank, ultimate and swap guide revisions - October 18, 2026

## Observed problems and intended boundaries

The full legacy pages were read in the internal browser during the VOD
consolidation review. Tank prescribed constant Support vision, compulsory
speed and a fixed training count. Ultimates mixed useful economy advice with
fixed response rules and vague defensive limits. Swapping prescribed waits
and repeated failed fights even when a limitation was already clear. All three
contained generic links or duplicate sales CTAs. Their original publication
days were June 21 for Tank and June 28 for ultimates/swapping; preserve those.

Keep the same three routes, store records and identity. Repository-owned
articles use the existing renderer, metadata, dates, correction link, visible
FAQ and one CTA. No new URL, redirect, database write, payment/account change,
ad activation, personal anecdote or rank guarantee. Other local batches remain
untouched. New models stay noindex/no ads until each exact revision has been
read and checked; a former database publication/review does not approve them.

## Specific revisions

- Tank: choose a useful destination, distinguish forced resources from usable
  pressure, check a jump's landing and follow-up, allow a brief covered vision
  break, choose peel responsibilities and adapt to the objective/clock. Real
  hero/map decisions rather than the instruction to always force and leave.
- Ultimates: available participants, seen versus assumed defenses, Nano without
  compulsory Blade, a useful Kitsune route, limited protection versus an entire
  combo, complementary resources, overtime and opportunities not taken. No
  universal cooldown/ultimate timers or invented damage values.
- Swap: name the blocked job, allow an early justified change, check whether a
  positional adjustment is possible, compare D.Va's access against a close beam
  exchange, value a viable ultimate use and the help lost when changing. Read
  actual mode/HUD rules rather than importing a retention percentage or Stadium
  rule. Compare before/after without pretending a won fight proves the choice.

All authorship remains Replaid Lab. Links go to current hero/map pages, the
composition guide and the already working free VOD notebook. Card summaries
come from the same model while stored IDs, categories, roles and creation dates
remain intact. The existing curated five-guide overview is not duplicated.

## Research limits

Checked Google's content/experience policy again. It asks for distinct value
and useful navigation, not a 500-word quota. The supplied publisher-policy URL
again returned an internal retrieval error; do not claim a fresh full reading.
Official indexed Ana/Winston/D.Va ability material was consulted for broad
weapon/ability distinctions; direct GB hero requests returned 403. Historical
patch results and Stadium power lists were not used as current normal rules.
The Kiriko launch design article supports the distinction between active use
and hoarding but is not evidence for present numeric balance. No such values
were copied into these articles. Primary references used for this limited check:

- https://support.google.com/adsense/answer/10015918
- https://overwatch.blizzard.com/en-us/heroes/ana/
- https://overwatch.blizzard.com/en-us/heroes/winston/
- https://overwatch.blizzard.com/en-us/heroes/dva/
- https://overwatch.blizzard.com/en-us/news/23841483/

## Safeguards and verification in progress

Publication guards and the public crawler now recognise literal `CTA` and
`Enlaces internos` headings, including rendered inline markup, without treating
every ordinary mention of those words as an instruction. Static article checks
include section and FAQ headings. This is necessary protection, not an approval
based only on a regex. Existing private-route exclusions and all ad gates remain.

New tests cover history, SSR content/schema, immutable discovered cards,
draft records, edit invalidation, distinct decisions and heading checks. The
first new swap test incorrectly looked for lowercase `el reloj` despite the
actual heading being `El reloj`; corrected that test assumption without changing
the article to satisfy it. A related-card E2E case must now use the still-dynamic
Support guide because the swap page is a static article; it still compares the
actual recommended article's title and description.

No commit, push, deployment or AdSense review request is part of this batch.
Final reading, desktop/mobile review, exact-version approvals and complete
regression evidence remain pending. The full-site/production goal is not complete.

## Read and checked exact drafts

Read the complete three rendered main bodies and all six FAQs on each in the
internal browser. Replaced abstract Tank wording, clarified the difference
between absorbing an incoming grenade and cleansing anti afterwards, removed
an unjustified "only one problem" claim, and made several headings more direct.
Also clarified that an observed Sleep may have recovered by the time of entry.
These are prose/decision corrections, not numeric balance changes.

After the final polish, rebuilt and checked all three at 1440, 390 and 320px:
HTTP 200, one H1, real publication/review dates, canonical, noindex, matching
six visible FAQ answers, all main links 200, dark background, no overflow, no
ad slots/scripts and no page/console errors. All nine passed; sitemap remained
132 until approval. Inspected desktop and narrow screenshots, reread the final
changed paragraphs and verified mobile search-to-Tank-to-free-notebook in IAB
without changing any notes. Related Ana card exists in the still-dynamic
Support page. Temporary tab/viewport and owned preview are closed/reset.

The new audit fixture initially tried to read detailed pages from the CLI's
summary stdout. It now reads the generated full JSON report, as the existing
fixtures do. All 528 unit tests pass. No application change was made to satisfy
that incorrect fixture assumption.

Individually recorded versions after reading and visual/link checks:

- Tank: `d72e3e7af1bab046d7e2f074ed84bd1b405e86a1c05413845411d48a31043667`
- Ultimates: `a2993da2bad2136fdf84020731a4713a59e3176e5e95abceaeb3b0f0778da79d`
- Swap: `fa9954c99cc99f0c97801ba48db70459bb035b1cea26d02a4ed4375851769ad7`

These approvals restore only those existing URLs to index/follow without ads;
do not renew other articles. Approved rendering, full inventory and complete
regression remain to verify after this registry change.

## Approved rendering and inventory

The approved production preview passed all nine desktop/390px/320px checks:
200 responses, index/follow, correct canonicals, original publication dates,
October 18 revision, six matching visible FAQs, working internal links, dark
layout without horizontal overflow, no advertising and no browser errors.
All nine main bodies exactly match the individually read final draft bodies.
Search-to-article-to-notebook navigation also passed for all three articles.

The seeded public audit reached 331 paths and all 163 public prerenders, with
no remaining queue. Sitemap membership changed from 132 to 135 only by adding
these three existing guides. The raw indexable count includes two followed
redirect aliases, not two additional unique destination pages. Its only two
warnings remain the word-count heuristic for the counter hub and the playable
game; no filler was added to satisfy that heuristic. No strong text-similarity
pair was detected, which is not proof of full-site editorial readiness.

## Regression discrepancy and correction

The first full verification passed lint, all 528 unit tests and both builds,
then the related-guide recommendation assertion failed: Ana's card displayed
its SEO title instead of its separate article title. Stopped only the verified
owned verification process tree after recording that failure. This incomplete
invocation is not a successful full verification.

The central metadata helper now recognises repository-owned ranked articles
and returns their actual title, SEO title and description independently. A
unit regression covers every ranked model, stale stored metadata, discovered
cards and preservation of the original record. The browser assertion remains
unchanged. Another assertion confirms discovered body paragraphs use real
newlines; the original implementation was already correct and was not changed.
All 529 unit tests pass. A fresh complete standard verification is running,
without concurrent previews, crawls or runtime source edits.

The next run found two older public-SEO cases still assuming one `article`
element and noindex on the now individually approved ultimate/swap routes.
Their actual strict-locator failures were inspected. These pages intentionally
have the article body and six FAQ articles. The tests now inspect the entire
visible `main` (including FAQs) and require exact index/follow. Existing checks
for internal notes and ad slots remain. Stopped that owned verification tree
before this test-only correction; this invocation also is not reported green.
A fresh complete verification runs with those corrected expectations.

## Final standard verification

On October 18, the final complete `npm.cmd run verify` exited 0: clean lint,
529 unit tests in 62 files, both separate production builds and 842 successful
desktop/mobile browser cases in 10.6 minutes. Eight pre-existing mobile
keyboard/fullscreen game cases remain skipped. Two workers, zero retries and
all existing assertions are retained, with the explicit adaptations above.
No runtime source changed during this successful run. The earlier interrupted
invocations remain documented and are not counted as successful full runs.

This verifies the combined local Cassidy composition, public expert-price
consistency, cooldown article, two guide consolidations, search/related cards,
the three revised fundamentals and internal-heading guards. It does not prove
production deployment, real Stripe payment readiness, a certified CMP or Google
approval. No ad activation or review submission was performed. The user asked
to finish the pending commit; commit only the owned reviewed files, preserving
the unrelated local logs/scripts/assets. No push is implied by that commit.

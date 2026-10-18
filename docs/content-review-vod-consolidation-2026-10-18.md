# VOD guide consolidation - October 18, 2026

## Problem and decision

The complete legacy `/guides/como-mejorar-en-overwatch-revisando-vod`
article was read in the internal browser during the cooldown review. It
still exposed `CTA` and `Enlaces internos`, generic link labels, fixed
ten-match exercises and unconditional ability rules. Its useful intent
(choose a match, understand a decision, identify an error and practise a
correction) duplicates the already reviewed
`/guides/review-vod-overwatch-espanol`.

The existing destination covers that method with perspective/information,
comparable fights, cooldown costs, the clock, preparation for an expert and
an editable/exportable free notebook. It also allows reviewing victories,
unused abilities and exceptions rather than only lost fights/first deaths.
There is no distinct missing user question that warrants another long
article repeating the method.

Consolidate with one permanent redirect, not an empty notice, another copied
article or an irrelevant home redirect. Keep every old incoming link working.
Do not delete or rewrite the database row, id, June 21 publication or June 28
review history. The destination keeps its own August 29 publication and
October 17 review: consolidation does not pretend it was published in June
or reviewed again today. Its exact-version approval is not renewed.

## Implementation boundaries

- Next configuration permanently redirects the old route directly to the
  current article. The lightweight guide policy also knows the target for
  discovery, sitemap exclusion, ad blocking and the dynamic route fallback.
- Do not mass-edit existing reviewed hero/map/counter links or their hashes:
  the single redirect keeps their contextual VOD links useful.
- Exclude the legacy card and publication-intent slug. The old route remains
  outside the sitemap; the destination appears once and remains indexable
  without ads under its existing review.
- Free-text searches also include curated repository guide cards, which
  would otherwise disappear when filters hide the foundations section.
  Deduplicate by slug, use actual copy/dates and keep hero/role/map/category
  constraints. Sort new combined search results consistently with the chosen
  title/date/reading-time order. No database write or extra request.
- No changes to payments, account configuration, private areas, ad serving,
  consent, credentials or legal information. No push/deployment/review request.

## Policy references checked

- https://support.google.com/adsense/answer/10015918
  explicitly recommends expanding or consolidating substantially similar
  pages and ensuring navigation leads to useful, relevant content.
- https://developers.google.com/search/docs/crawling-indexing/301-redirects
  documents server-side permanent redirects (including 308).
- https://support.google.com/webmasters/answer/9044175
  is the manual-actions report; the AdSense rejection alone does not prove a
  Search Console manual action. The supplied publisher-policies URL returned
  an internal retrieval error this turn; it was not treated as freshly read.

## Verification in progress

Lint is clean and all 509 unit tests in 61 files passed. A new card test first
incorrectly looked for a heading in the reading-time body, which contains
paragraphs, not headings. It now checks the actual paragraph from the model.
This was a test assumption, not an article change. Browser tests will verify
the actual 308, query/fragment preservation, canonical, dates/schema, visible
notebook, filtered search, absent old headings, sitemap and advertising.
Final build/browser evidence will be recorded below after execution.

## Rendered and inventory evidence

The verification production build passes. In an owned internal-browser tab,
the old URL with a query and `#cuaderno-vod` lands on the existing article with
both preserved. Read the complete destination and visible FAQs again. The
search's real card shows the model's description and original August date;
clicking it opens the correct article and notebook. No notes were entered or
modified. The header screenshot is dark and legible with no overlaps.

The full readonly inventory, seeded with the previous 331 paths and all 160
prerendered public pages, completed with no remaining queue. The exact sitemap
URL set is unchanged at 132. The old path is recorded as redirected to the
correct canonical, HTTP 200 after following, one H1, five JSON-LD blocks and
no technical issues. The inventory's raw `indexable: 133` includes that alias
after following the redirect; it does not mean a 133rd indexable page was
added. The only two warnings remain the existing word-count heuristic on the
counter directory and the game; do not pad functional pages to satisfy it.
Report: `reports/vod-consolidation/inventory-final.json` (local ignored file).

Readonly public HTTP checks also confirmed production home, sitemap and
ads.txt return 200. Production still has 128 sitemap URLs, not the local 132.
Home has the AdSense account verification meta but no ad script tags or ad
`ins`; ads.txt has a Google DIRECT publisher record. An initial quoting error
prevented the shell check from running; the corrected requests completed.
These checks neither deploy local changes nor establish consent/account or
production payment readiness. The full browser regression is still running.

For a usable mobile visual check rather than relying on an unreadably reduced
full-page capture, opened a second owned internal-browser tab at 390 x 844 on
the E2E server. The old notebook anchor lands at the actual notebook; its
heading, icon controls, role selectors, inputs and example disclosure fit.
Viewed the search header and scrolled to its canonical article card: readable
text, no overlapping controls and no horizontal clipping observed. Closed both
owned tabs and reset the temporary viewport. The separate 3013 preview was
stopped only after checking its PID and exact command; the live E2E server was
left alone. Preview status reads still report the existing local Stripe
authentication error, not a tested production checkout outcome.

## Next observed priorities (no runtime edits during regression)

Read the remaining complete legacy pages in the internal browser:

- `/guides/como-elegir-composicion-dive-poke-brawl` still lists Sombra as a
  DPS in dive and anti-dive and exposes `Enlaces internos` with generic links.
  This is an actual stale role error, not a stylistic preference. Compare its
  useful content against the current 5v5/6v6 composition article and consider
  proper consolidation before adding more repetitive prose. Highest priority.
- `/guides/como-mejorar-como-tank-overwatch` mixes useful space/engage advice
  with rigid no-Support-vision/no-speed rules, a fixed seven-match exercise,
  generic link labels and two sales CTAs. Preserve its June publication;
  evaluate the real Tank teaching intent separately from a hero directory.
- `/guides/como-usar-ultimates-overwatch` needs a contextual revision, not a
  duplicate: fixed "wait for Sleep"/assigned defensive rules and the shorthand
  "Suzu against Graviton" need more precise limits and an actual example.
- `/guides/cuando-cambiar-de-heroe-overwatch` was also read fully. Its useful
  question is distinct; improve fixed five/ten-second and multiple-fight rules
  (an obvious current constraint can justify changing immediately), examples
  and duplicate CTAs rather than creating another article about swapping.

Related cards on these pages still print legacy `excerpt` values containing
"enlaces internos" despite their article metadata being cleaner. That is a
separate observed rendering issue in the dynamic guide's related-card block;
using the current editorial summary should be tested, not hidden with noindex.
The automatic publication/audit internal-heading checks also omit literal
`CTA` and `Enlaces internos`; add focused protection when addressing that batch.

The full-site goal is not complete: remaining legacy articles, production
configuration and account/CMP readiness still require independent evidence.
No local test promises Google approval.

## First complete regression

Before the additional composition consolidation, `npm.cmd run verify`
completed with exit 0: lint, 509 unit tests in 61 files, both isolated builds,
and 824 desktop/mobile browser tests passed in 10.9 minutes. The eight existing
mobile game skips are unchanged. No runtime source changed during that run.
The composition/category follow-up below must be verified again; this result
does not certify changes made after the run.

## Composition follow-up in the same working batch

After that run terminated successfully, compared the full rendered current
composition article against the legacy version. It already covers dive,
poke, brawl/rush, peel, map/ranked adjustments, team responsibilities and 5v5
versus 6v6 with working related hero/team links. It explicitly describes
Sombra/Doctrine as Supports and the limits of Weaken. Consolidated the old
composition route into that existing article with the same one-hop 308 and
policy/discovery exclusion. No database deletion, mass link rewrite, new
article, sitemap addition or content/date/approval change at the destination.

Curated search cards now distinguish VOD review and composition categories,
and a text search can find them within the matching category, not the wrong
one. Hero/role/map constraints still exclude these general articles. Related
cards in the dynamic guide renderer use the same `guideEditorial` title and
description as the main card/metadata instead of old excerpts containing
"enlaces internos". This does not approve the underlying legacy articles.

All 511 unit tests pass; new browser cases cover the composition redirect,
correct roles, visible content/schema/history, category-to-article navigation
and the observed related-card issue. Another complete verification follows
these runtime changes; the earlier 824-browser result is only the earlier run.

The second production build passes. In the internal browser, the old
composition URL now reaches the expected article. At 390 x 844, the actual
Composiciones-filtered search card opens that article with a legible header
and quick answer. The swap guide's related card now reads the clean ultimate
title/description. Closed the temporary tab, reset the viewport and stopped
the owned preview after verifying PID/command again. No notes/account actions.

The final inventory (`inventory-composition-final.json` in the same report
directory) covers 331 paths and all 160 public prerenders with no remaining
queue. Both aliases resolve to their correct canonical, have no technical
issues and remain outside the sitemap. Exact sitemap comparison again shows
zero additions/removals (132 URLs). The raw indexable count of 134 includes
the two followed aliases; it is not growth in independent indexed pages.
The same two existing word-count heuristics remain, with no new technical
warning. Neither destination content hash/review/date was changed.

## Second regression: terminal worker failure, not a passing run

The expanded `verify` invocation completed lint, 511 unit tests and both
builds, but exited 1: 827 browser tests passed, eight existing game cases
skipped, and the desktop Ana composition worker exited unexpectedly with
code 3221226505. The report contains no failed page assertion or Ana trace;
the same Ana case passed in the preceding complete run and on mobile in this
run. All newly added cases passed. Do not relabel this invocation green.

No runtime/test expectation or retry setting is changed to hide the failure.
First rerun the recorded last-failed case alone with one worker as diagnosis,
then run the complete standard two-worker verification without concurrent
preview servers, crawls or browser tabs. Resource contention is a possibility,
not an established cause. Final evidence remains pending.

The isolated recorded failure passed unchanged (one test, 28.6 seconds including
its fresh E2E build). Started another complete `verify` using the unchanged
standard configuration (two workers, zero retries). No temporary preview,
inventory crawler, browser tab or runtime source edit is running alongside it.

## Final standard regression

The final complete `npm.cmd run verify` finished with exit 0 on October 18:
clean lint, all 511 unit tests in 61 files, both isolated production builds,
and 828 browser tests passed in 10.7 minutes. The same eight pre-existing mobile
keyboard/fullscreen game tests are skipped. Standard two workers and zero
retries are unchanged; no new skip or weaker assertion was introduced. Ana
passed in this full run and the earlier worker failure did not recur. Its
underlying native-process cause remains unproven; retain the failed run above
rather than claiming that it never happened.

This run covers the exact final runtime sources, including both consolidations,
matching-category search, corrected related summaries, cooldown article, prior
Cassidy composition and public expert prices. No source was edited during it.
Temporary browser tabs/previews are closed and the viewport reset. No commit,
push, deployment, account action, ad activation or review submission is included.

The next content work is the three individually read legacy articles about
Tank, ultimates and hero swapping, plus the observed gaps in internal-heading
checks. The old composition role error is now resolved by the documented
consolidation. The whole-site readiness/production/account audit is not complete
and no Google approval guarantee follows from this successful local regression.

# Cassidy composition and guide recommendation review

## Observed gaps

The existing Cassidy composition still showed a July/Season 3 review. Its map
descriptions and examples did not explain the rotations well enough to choose
between its three teams. Deadeye supposedly forced space without checking
whether an opponent actually needed that line. No publication date is known;
do not invent one. This is an update to the existing route, not a new article.

The guide detail route also still advertised Starter's base price in its
expert recommendations. Other public cards already used the real active
standard offer total. Reuse that helper here, selecting its existing fields
in both role-filtered and general queries. Do not change checkout, tiers,
commission, connected accounts or database values. No live payment is needed
to check a public recommendation and its matching public profile total.

## Article decisions

- Separate two role-queue 5v5 lineups from a two-Tank 6v6 example. They are
  conditional suggestions, not a claim about a guaranteed winning meta.
- Reinhardt/Mei: check the approach, the Support's line and the wall that may
  obstruct Cassidy's shot or Reinhardt's healing. Speed does not fix separation.
- Sigma/Ashe: a separate long-range line and nearby peel, with a trade-off
  between Brigitte and Kiriko rather than interchangeable Support names.
- Reinhardt/Zarya: decide who needs Projected Barrier; do not assume Cassidy
  always gets it or import two Tanks into 5v5.
- Distinguish optional normal Minor/Major perks from simultaneous upgrades or
  Stadium powers. Do not copy experimental, Classic or Community Crafted notes.
- Use distinct hypothetical King’s Row, Circuit Royal and Midtown examples.
  No personal matches, client results, win rates or firsthand tests are invented.
- Preserve title/URL, add a direct answer and VOD questions, and replace the
  artificial automatic Deadeye reward with its actual resource trade-off.

## Research inspected

Official indexed hero results were inspected on October 17. Search results also
returned unrelated experimental/Classic/Community Crafted changes; those are
not evidence for normal ranked. No historical damage/duration number is reused.

- https://overwatch.blizzard.com/en-gb/heroes/cassidy/
- https://overwatch.blizzard.com/en-us/heroes/sigma
- https://overwatch.blizzard.com/en-gb/heroes/lucio/?mobile-app=true&theme=wiki
- https://overwatch.blizzard.com/en-us/heroes/mei/
- https://overwatch.blizzard.com/en-gb/heroes/zarya/

Policy references were reread. They call for useful original content, accurate
navigation and a usable experience, not a fixed word-count quota. The AdSense
rejection is not proof of a Search Console manual action. Public pages do not
receive a sources/process/SEO block to inflate their content.

- https://support.google.com/adsense/answer/10015918
- https://support.google.com/publisherpolicies/answer/11035931
- https://support.google.com/webmasters/answer/9044175#thin-content

## Verification in progress

The article remains noindex/no ads until its rendered version is reviewed.
499 unit tests and lint pass. The initial production build caught an overly
broad Expert callback annotation for the partial recommendation query. Removed
that annotation and use the query's inferred selected shape; no cast to a full
profile, extra database columns or any type suppression is required.

Remaining: successful isolated build, rendered article reading, desktop/mobile
screenshots, all main links and images, matching FAQ/Article/Breadcrumb data,
guide recommendation/profile totals, individual approval only after review,
then the final regression and exact sitemap comparison. No approval or Google
acceptance is inferred from writing this file.

The corrected isolated build passes. Read the complete rendered article and
expanded all five FAQs in the internal browser; clarified a Support reference,
a heading and an ambiguous Cassidy pronoun before final review. The initial
readonly helper correctly failed its recommendation assertion on the cooldown
guide: that guide is Flex and has no active matching expert cards. The actual
empty state is not a query error. Use the observed DPS guide with its active
recommendations for the guide-to-profile price check, retaining an explicit
nonempty assertion; synthetic unit tests cover both query branches and empty
recommendations. Do not weaken the assertion to accept zero cards vacuously.

The cooldown guide itself still contains overly rigid advice about saving
abilities. Its word count/noindex status is not an editorial pass; this remains
an explicit next content-review candidate, not work completed by this batch.

The final draft six-view helper passes with 130 unchanged sitemap URLs and no
errors. Its second initial failure was a locator assumption: the recommendation
label is a styled div, not an h2. Select its actual exact visible label and keep
the nonempty card assertion. No runtime content was altered to appease it.
Guide/profile totals match, including a real internal-browser click from the
DPS guide to DazedReox: Starter EUR 10.80 including commission. No checkout or
purchase control was submitted. Reviewed both complete article/FAQ and final
changed passages in the internal browser. Actually viewed the 1440/390/320px
headers, 390px lineup and VOD, desktop expanded FAQ and 320px recommendation
capture. The tall lineup element capture includes the normal sticky nav during
scroll; it is not evidence of a broken full document layout.

Only after that reading/link/image/visual check, readonly inspection returned
83b4e1f72e77772573b41a3b19f3f8e67c2a3710d594ef00e7bcd4bfb98c1af4
for /team-comps/cassidy. Register only that exact version, indexable/no ads.
Other article approvals are unchanged. Independent expected-route tests add
only Cassidy and retain unapproved Ashe/Domina and edit-invalidation checks.
Final approved rebuild, sitemap comparison and complete regression are pending.

## Approved local checks

The approved production build succeeds, and the readonly helper again passes
six views without errors. Its three article snapshots exactly match the final
draft. Sitemap comparison adds only the existing /team-comps/cassidy URL with
October 17 lastmod: 130 to 131, no removed routes. The seeded inventory covers
331 paths and 159 prerendered public paths, with an empty remaining queue;
131 indexable, 200 noindex. Only the existing word-count heuristics for the
counter hub and the functional Arcade remain, not evidence to pad either page.
No strongest-similarity pair is reported; that is not a whole-site certificate.

The first full-run desktop guide-price test compared innerText (with a visible
line break) with textContent (adjacent block text with no inserted line break).
Both displayed Starter EUR 10.80 and the same commission. Use innerText for
both sides, retaining the exact amount/tier/commission comparison. This is a
test-only correction; the application was not changed during verification.
The manual guide-to-profile comparison and readonly helper already passed.
The completed full run recorded 816 passed, eight existing mobile keyboard-game
skips and the same price-comparison failure on desktop/mobile. Playwright had
loaded the original test for that run. A fresh rebuilt
`npx playwright test --last-failed` passed both corrected comparisons in 43.5s.
No application source changed between those runs. The original verify command
exited 1 and is not represented as a successful invocation. Lint, all 499 unit
tests and both isolated production builds passed. The gameplay objective check
also passed in the full run, with its previously corrected observation timeout.
Final targeted verification completed on October 18; the article's October 17
review date remains the real editorial review, not an automatically bumped date.

Temporary preview server and internal-browser tab are closed. Local Stripe
status reads still report an authentication error with the local configuration;
this batch does not fix or certify real payment/account readiness. No push,
deployment, review request or ad activation is included. The whole-site goal
remains open, including the content candidate identified above and actual
production/CMP/account checks. No AdSense approval guarantee is made.

Subsequent combined verification on October 18, including the cooldown revision,
completed `npm.cmd run verify` with exit 0: clean lint, 506 unit tests, both
isolated production builds and 822 desktop/mobile E2E tests passed, with the
same eight existing mobile keyboard/fullscreen game skips. This includes the
corrected guide/profile visible-price checks on both projects. The earlier
failed invocation remains part of the history above; it is not relabelled.
See content-review-cooldowns-2026-10-18.md for the final combined evidence.

# Ana counter: individual Season 5 review

## Scope and baseline

Reviewed on 12 October 2026 against main at `350c5f8`. Only the existing
`/counters/ana` article changes. The base getter, not a shadowed legacy article,
still showed Season 3 and a normal-Hack example for Sombra. Publication remains
28 June 2026; the review date is not substituted for publication.

No marketplace, payment, auth, database, environment or ad-serving changes.
No new public URL. Counters remain ad-free even when individually indexable.

## Research and editorial decisions

Primary official pages inspected through indexed retrieval on 12 October:

- https://overwatch.blizzard.com/en-us/heroes/ana/
- https://overwatch.blizzard.com/en-us/news/patch-notes/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/10/
- https://overwatch.blizzard.com/en-us/heroes/genji/
- https://overwatch.blizzard.com/en-gb/heroes/kiriko/

Direct retrieval of the Ana/October pages previously returned 403. A fresh
direct D.Va hero fetch returned an internal retrieval error, not verified page
access. No experimental or Stadium notes are used as current ranked mechanics.

The article distinguishes the selected Local Anesthetic Minor impact effect
from normal single-target Sleep, Speed Serum as its alternative, and the two
Major choices Biotic Bounce and Headhunter. It does not grant all perks at once
or invent projectile radii, cooldowns or kill breakpoints. Sombra now fills a
Support slot; Weaken reduces Ana's own output, not incoming heals or ability
access. Matrix/Deflect are projectile responses before impact, not cleanses
after a grenade explosion. Suzu use depends on danger and available cover.

Three hypothetical scenarios use Gibraltar high ground and peel, the first
King's Row choke and Esperanca robot cover. They are not claimed personal
matches or guaranteed eliminations. Five replay questions distinguish routes,
follow-up, cooldown timing and an ally's escape; the conclusion asks the reader
to inspect the next fight rather than blaming the enemy pick.

## Actual preapproval checks

- Lint clean; isolated build generated 193 routes.
- Initial unit run: 423 pass, one new assertion used `no` where the reviewed
  sentence said `ni`. Corrected the literal expectation without changing the
  mechanic. Second run: all 424 unit tests in 51 files passed.
- Independent desktop 1440px/mobile 390px helper: HTTP 200, single H1, canonical,
  matching Article/FAQ/Breadcrumb schemas and known publication date. All six
  threat cards, five expanded FAQ answers and five VOD questions read.
- Every main internal link responded 200; portrait decoded; no console/network
  errors, ads, white background or horizontal overflow. Full rendered text read
  in the internal browser, Sleep FAQ expanded and Sombra Support link followed.
- Desktop/mobile viewport screenshots plus mobile VOD and desktop expanded FAQ
  inspected for legibility, spacing and fit. No clipped text or overlap found.
- Before approval: `noindex, follow`, sitemap 124 with no differences from the
  prior production list. Evidence: `reports/ana-season-five/local-review.json`
  and sibling screenshots. Reports are ignored local QA artifacts.

Approval is pinned only after these checks to
`d1c2469332abe583ec17187a4fcc2f141efdc98ea45b1a9a1fee8839fd60d7db`.
The gate rejects any later change until it is reviewed again. Registry presence
or passing tests does not establish Google's acceptance or global site quality.

Final indexed build, complete regression suite and deployment checks follow.

## Final local and complete regression results

The approved rebuild and independent helper passed: two viewports, sitemap
125, no errors, exact text/metadata/schema/link agreement with the preapproval
page. `/counters/ana` is the only addition to the prior 124-entry sitemap and
its lastmod is 12 October. The approved desktop full-page and mobile expanded
FAQ captures were also inspected; fixed navigation can appear in an element
screenshot spanning more than the viewport, so those captures are not used to
claim that every scroll position was tested.

Inventory covers the same 330 paths and 158 prerendered public routes, with an
empty remaining queue: 125 indexable, 205 noindex. The existing hub word-count
heuristic is the only flagged issue; no strongest similarity pairs. These are
discovery heuristics, not proof that all pages meet an editorial standard.

`npm.cmd run verify` completed with exit code 0: clean lint, 424 unit tests in
51 files, isolated build with 193 routes, and all 770 desktop/mobile browser
tests passed without retries in 9.9 minutes. Four new browser cases cover Ana.
Passed report and last-run JSON archived at
`reports/verification-ana-counter-season-five-2026-10-12`.

The anonymous expert reads during the inventory logged StripeAuthenticationError
in this local environment; no checkout or money movement was attempted. The
suite proves anonymous route/API restrictions, not live authenticated payment
success. Actual CMP configuration, legal fiscal completeness and Google's
account-side approval remain unverified. No ad execution or review submission.

Next individual counter candidate: Reinhardt. Its existing base article still
uses a July review date and Season 3 label; it is not approved by this batch.
Other unfinished pages remain accessible and require their own review.

## Published release evidence

Commit 0a60edd18280b6ccadb78a9be550709af0690054 was pushed to main. Its GitHub
Vercel commit status reached success; authenticated deployment logs were not
available. Actual public production was checked separately with the readonly
helper: two viewports, 125 sitemap entries, no errors, and exact agreement
with approved local text, metadata, schemas and links. Every main internal
link returned 200, the portrait decoded, FAQ matched visible text and no
ads executed. Production desktop/mobile header captures were inspected.

Internal-browser production read, expanded anti/Tank FAQ and actual
hero-counter-composition navigation passed, with empty error logs. Reports
are in reports/ana-season-five/production.json and associated captures.

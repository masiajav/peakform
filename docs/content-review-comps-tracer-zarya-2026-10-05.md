# Individual composition review: Tracer and Zarya

Reviewed on 5 October 2026. Public author and publisher: Replaid Lab.
Preparation and primary-reference limits are recorded in
content-research-comps-tracer-zarya-2026-10-05.md. No in-game testing,
personal coaching experience or win-rate evidence is claimed.

## Tracer

Read the entire rendered main in the internal browser at port 3019 and
opened all six FAQ answers. Reviewed every proposed team and substitution.
Removed the fixed two-second engage rule and automatic Blink restoration
after Recall. The article now relates an entry to actual pressure, reachable
targets and a safe return, with hypothetical examples in Numbani, Oasis
University and Gibraltar. Winston and D.Va together are explicitly 6v6.
The Sombra substitution is replaced with Echo without asserting the upcoming
Support rework is already playable. Five VOD questions and a distinct closing
recommendation are present. No paragraph from the corresponding hero intro
is reused.

## Zarya

Read the entire rendered main and all six opened FAQ answers separately.
Removed manual bubble cancellation and the implication that blocked poke
cannot build energy. Saving an ally can justify a barrier without energy;
using both resources is conditional, not universally forbidden. Three team
examples separate one-Tank 5v5 from Reinhardt/Zarya 6v6 without inventing
cooldown numbers. Midtown, King's Row and Eichenwalde examples distinguish
crossing, healing lines and Grav follow-up. Suzu use does not guarantee a win.
Five VOD questions and a distinct closing recommendation are present.

## Technical and visual evidence before manual approval

356 unit tests passed, including invalid dates, blank sections, invalid role
counts, duplicate heroes, wrong team sizes and duplicated paragraphs even
under synthetic approval. The first build exposed a shared type-name clash
between hero composition cards and full team lineups; it was fixed with a
typed narrowing check rather than weakening validation. The isolated build
then completed with TypeScript validation.

Eight targeted Playwright desktop/mobile cases passed: the two compositions
and Legal/Privacy. Composition checks cover one H1, unique metadata, canonical,
Article/FAQ content parity, real modification date, no invented publication
date, loaded portraits, all main internal links HTTP 200, opened FAQ, real
navigation to the hero page, no console errors or ads, and no overflow.

Screenshots in reports/tracer-zarya-compositions were inspected for the
headers, lineups, examples, VOD block and FAQ. The scoped renderer retains a
square 200px/160px portrait, answer-first mobile order, readable secondary
text and keyboard focus. Native details remain server-rendered; no database,
payment, route or environment interface was changed for these articles.

reports/tracer-zarya-compositions/accessibility-first-pass.json records zero
WCAG 2 A/AA and 2.1 AA axe violations in both composition mains on desktop
and mobile, with all six FAQ answers open. This report also honestly records
Legal/Privacy contrast and link-style failures. Both were corrected with
scoped styles and checked again. accessibility.json records eight final main
checks (four routes on two viewports), all HTTP 200, no overflow and zero axe
violations; six FAQ answers are open on each composition. This is main-area
automated checking, not a claim of complete accessibility or legal compliance.

Only these two exact model versions may receive manual registry entries.
The other eight original compositions and the 44 earlier rewritten ones are
not approved by this review. Existing publication intent permits these two
to enter the sitemap after registration; advertising remains disabled.

## Dates and remaining verification

Both dateModified values reflect the real rewrite on 5 October. The original
datePublished is still unknown and omitted, not inferred from a git commit.
The final post-registration and metadata-fix crawl is recorded in
reports/adsense-local-2026-10-05-comps-trust-robots-final.json: 330 HTTP 200 responses,
106 sitemap URLs, 107 indexable responses including a canonical variant and
223 noindex responses. Only /team-comps/tracer and /team-comps/zarya are added
relative to the previous final crawl; none are removed. Both trust documents
and compositions have no reported page issues. Low word-count flags on the
counters/news hubs are heuristic warnings, not Google's rejection reason or
a minimum-word policy. Automated similarity results do not certify every page.

The 3020 preview was checked in the internal browser. Home loads with
its dark layout and portraits, and the CLI browser reports no page errors.
Legal and Privacy's updated identity and paragraph-link styles were checked
again. Server rendering, native FAQ controls and scoped CSS avoid new client
state, effects or third-party scripts for this batch. The final 3021 preview
was checked again after the robots correction. The composition explicitly
renders index/follow, its portrait loads and there is no overflow. Repeated
axe verification on 3021 retains eight clean main-area checks in the final
accessibility.json. Metadata changes do not alter the reviewed article models.

The first full regression passed lint, 356 unit tests and the isolated build,
but browser verification found 10 failures among 718 cases. The route omitted
explicit robots on approved compositions (implicit indexing is not a noindex
directive), and one test's independent approved-route list was stale. Added
the explicit index/follow metadata using the existing counter/hero pattern,
corrected that exact two-route expectation and added route-metadata unit tests
covering approved, unreviewed and unknown heroes. No check was removed.
First-pass evidence is preserved in
reports/verification-comps-tracer-zarya-trust-first-pass-2026-10-05.
The corrected full npm run verify completed successfully: lint without cache,
359 unit tests in 41 files, isolated production build and TypeScript, and all
718 Playwright desktop/mobile cases passed with zero retries (10.5 minutes).
Evidence is archived in
reports/verification-comps-tracer-zarya-trust-2026-10-05. No test was skipped
to obtain that result. Occasional server ResponseAborted logs occurred during
navigation; browser error assertions passed, not a claim of silent server logs.
This document does not certify production, all-page originality, payments,
legal compliance, configured consent or AdSense acceptance.

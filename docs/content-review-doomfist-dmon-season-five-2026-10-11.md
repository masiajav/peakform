# Doomfist and D.Mon review, 11 October 2026

Private editorial evidence. Public author/publisher: Replaid Lab. This file is
not a public source block, approval guarantee or invented first-hand test.

## Scope and current state

Four existing routes, previously accessible with `noindex, follow`:

- `/counters/doomfist`
- `/team-comps/doomfist`
- `/counters/dmon`
- `/team-comps/dmon`

The approved release before this batch is commit `6a553b9`, with 118 sitemap
URLs. No new public route, database change, payment change or ad activation is
part of this batch. Original publication dates for these four articles are not
known and are not fabricated. Modification is the actual 11 October review.

## Individual editorial work

| Article | Review decisions |
| --- | --- |
| Doomfist counter | Prepare help before landing; distinguish optional Power Matrix's opening projectile absorption from normal frontal Block; current Sombra Support output reduction versus preserved ultimate EMP; retreat without chasing; five concrete VOD questions and a specific conclusion. |
| Doomfist composition | Compare Ana's and the DPS's view of the destination; preserve Genji's exit rather than promise a reset; discuss losing Suzu on a Sombra Support substitution; explicit 6v6 role slots and Matrix limits; review the difference between first impact and first allied shot. |
| D.Mon counter | Horizontal mobility and high-ground access; optional fuel efficiency; barrier repair versus mech healing; Surging Strike lifesteal versus all sword damage; existing overhealth versus antiheal; deny follow-up after Limit Break instead of treating the slash as the whole threat. |
| D.Mon composition | Route/corner everyone can reach, Mei wall and allied sightlines, Cassidy's follow-up to Limit Break, perk alternatives rather than four simultaneous effects, two-Tank example restricted to 6v6, specific review of a DPS camera and fuel at arrival. |

Existing useful matchup cards, map examples, routes and checklists are retained.
Each article has five FAQs, five VOD questions, its own conclusion and contextual
links to its paired counter/composition page. No measured meta, personal gameplay
claim or rank guarantee is added.

## Primary research and limits

- [Current Doomfist hero page](https://overwatch.blizzard.com/en-us/heroes/doomfist/): official search-indexed material, crawled two days before the review, describes frontal Block, empowerment, Rocket Punch wall impact and Power Matrix as a major with 0.8 seconds of projectile absorption. Aftershock is the other major, not an automatically stacked effect.
- [Current D.Mon hero page](https://overwatch.blizzard.com/en-us/heroes/dmon/): official indexed material describes horizontal fuel-based Propulsors, frontal Power Barrier, Limit Break overhealth and damage amplification, and the separate minor/major alternatives. Barrier repair and Surging Strike lifesteal are kept separate.
- [Current retail patch notes](https://overwatch.blizzard.com/en-us/news/patch-notes/retail/): October 6 indexed official material confirms Season 5. Doomfist hit-volume changes are not converted into a claimed win rate or a guaranteed easier matchup.
- The already researched and published [Season 5 Sombra counter](https://www.replaidlab.com/counters/sombra) and its private research record distinguish output reduction, removal of normal hero Hack and retained EMP hack. No new fictional silence, cleanse or antiheal effect is introduced.

Direct retrieval of both hero pages and the retail notes returned 403. Research
used the indexed official extracts plus the documented earlier kit checks, not
a claim of successful direct retrieval. Tactical examples are conditional
analysis; they do not establish measured competitive performance.

## Verification record

Initial lint and 413 unit tests passed. The first build caught a real model error:
`vodQuestions` had been added to counter data but was not defined or rendered in
the counter contract. It was corrected by adding an optional field and a
conditional section using the existing composition-page pattern. Other counters
without that field retain their layout. A fresh build and browser checks are
required after this repair; no earlier green unit result substitutes for them.

No exact-version approval is recorded until the complete rendered articles,
visible FAQs, links, images and desktop/mobile presentation have been checked.
Final results will be appended only when verified. Advertising remains disabled.

The repaired build passed with 193 routes. The independent pre-approval browser
check passed for eight desktop/mobile views: 200 responses, complete rendered
articles and 20 matching visible FAQs, decoded images, working internal links,
valid schema and no console errors, ads or horizontal overflow. All four complete
rendered texts were read individually. The eight first-view screenshots and four
mobile VOD sections were inspected. The sitemap remained unchanged at 118 URLs
before approval. The navigation helper was fixed to wait for actual URL changes;
that test race did not require an application change.

Only these four exact content versions are now recorded for publication. Final
suite results and production agreement remain required before release.

The final independent local check also passed eight views with zero errors.
It compared the entire rendered text, metadata, article schema and links with
the pre-approval report: the content did not change when indexing was enabled.
Actual navigation from the counter hub to Doomfist, its composition and back
passed. All four mobile FAQ sections were captured and read; their questions
and answers match the visible content and FAQPage schema.

The full local inventory retains the same 330 public paths: 122 indexable and
208 noindex. Exactly the four reviewed existing URLs enter the sitemap with
11 October lastmod; no previous sitemap URL disappears. There are no unmatched
build paths or duplicate-paragraph similarity alerts. The sole automated
warning remains the counter hub's less-than-500-word heuristic. This is not a
Google minimum or an excuse to add padding to a useful directory.

React review: the optional VOD section remains server-rendered, uses the existing
styles, semantic ordered-list markup and stable question keys. It adds no client
state, effect, network request or hydration dependency. Existing counter pages
without VOD questions retain their previous layout and are covered by the suite.

Advertising remains off. This batch is not proof of Google approval, a certified
CMP installation or a successful authenticated real-money checkout. The existing
consent-readiness document records the account-side checks still outstanding.

The internal-browser connector is unavailable in this continuation. No successful
internal-browser interaction is claimed for this batch; visual review used the
actual local Playwright captures and complete rendered text instead. Closing the
owned local server exposed the already known StripeAuthenticationError during
expert-status reads. This is recorded as an unresolved local integration check,
not hidden behind passing anonymous-access or content tests.

The first complete verification command failed: lint, 415 unit tests and both
isolated builds passed, but the browser run finished with 681 passing cases and
79 failures after its 3011 server stopped listening. The first failed case was
a mobile Baptiste internal-link request with ECONNRESET; subsequent cases could
not connect. This happened near termination of the separate owned 3013 preview,
but the causal link is not established. No assertion, timeout, retry setting or
application code is weakened. The first-run test results and HTML report are
preserved under ignored `reports/doomfist-dmon-season-five/first-run-*` before
repeating the entire command with no concurrent owned preview server.

Remaining editorial priority: the existing Shion counter still describes an
explicitly archived pre-Season-5 Sombra Hack matchup and a Season-3 patch. Its
paired composition also needs a current individual review. Both retain noindex,
working routes and no advertising; this batch does not approve them indirectly.
Noindex alone is not a substitute for improving their public usefulness.

The official [AdSense rejection guidance](https://support.google.com/adsense/answer/81904?hl=es)
was retrieved again on 11 October. It states that review can cover all site
pages and prioritises useful original content, finished pages and working
navigation. Our noindex or ad-exclusion flags are not an exemption from that
site-level review. The [publisher policies](https://support.google.com/adsense/answer/10502938?hl=es)
were also checked; this is not an account decision or a legal certification.

## Final verification before publication

The second `npm.cmd run verify` completed with exit code 0: uncached lint, 415
unit tests in 49 files, isolated verification build with 193 routes, and all 760
desktop/mobile Playwright tests. The browser run took 11.7 minutes. No runtime
code, assertion, timeout or retry setting changed between the interrupted-server
run and the successful repetition. ResponseAborted warnings still occur during
navigation; they are not concealed or confused with the earlier connection loss.

The independent final local report retains eight views, 122 sitemap entries and
zero errors with exact pre-approval content agreement. Publication must include
only the reviewed application/test/documentation files, not builds, environments,
screenshots, logs or first-run traces. After deployment, require matching article
text, metadata, schemas, FAQs, links and sitemap on the public domain before
describing this batch as published. No AdSense review or ad activation is performed.

The Vercel app connector returned UNAUTHORIZED/re-authentication required for
project inspection. Release status will be checked through the already working
GitHub integration and independent public-domain verification, not presented as
a successful authenticated Vercel MCP inspection.

## Published result

Committed and pushed on main as `5f839d6ad222393c75197cb6f40154bb02e3c1d1`.
The GitHub Vercel check reported success for deployment
`https://vercel.com/masiajavs-projects/peakform/BKC8tSi4BCAByai4jiPK99CQFMHB`.
The independent public-domain browser check then completed with exit code 0:
eight desktop/mobile views, 122 sitemap entries and no errors. Full article text,
metadata, schemas, links and sitemap matched the final local report exactly.
Production mobile Doomfist and desktop D.Mon screenshots were also inspected.
No advertising or account-side AdSense action was performed.

# Map review: Neon Junction and honest publication history

## Boundaries

Read the complete existing Neon Junction model and the map renderer. Preserve
its URL, H1, image, mode and both five-player teams. The current map catalogue
contains 30 maps and 60 five-player teams; structured inspection found no
unknown/duplicated heroes or incorrect role counts. Do not invent a Sombra
lineup regression or replace correct teams to manufacture an improvement.

The renderer incorrectly used every map's review date as its publication
date. Revisions could therefore masquerade as new publication. Accept an
explicit optional publication date, but omit datePublished when that history
is unknown. Do not infer article publication from the map's launch, a Git
commit or the oldest available review date. Keep the other 29 model dates.
Make the visible review date a semantic time element without layout changes.

## Individual editorial changes

Neon Junction contained grammatical errors, interchangeable advice and rules
requiring a side angle before touching, a forced pick change after capture
and a fixed ultimate-spending pattern. Rewrite around the actual objective,
the train/platform, the bend approaching the second point, available healing,
who escorts and how the clock changes a final contest. Keep the analysis
conditional, not a guaranteed strategy or a claimed personal playtest.
Link directly to the existing composition guide and free VOD notebook, while
retaining the relevant historical Season 3 page with an accurate label.

## Primary research and limits

- https://overwatch.blizzard.com/en-us/news/24293050/
- https://overwatch.blizzard.com/en-us/news/24271881/
- https://overwatch.blizzard.com/de-de/news/24271881/
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag

Direct English page retrieval returned errors/403. Indexed official material
was available, including the developer AMA's train, platform/second-section
sightline and incline/bend discussion. The official season announcement
confirms Hybrid, Tokyo, ANDROMEDA III and Zuiko-za. This is not a successful
full direct-page fetch or a live in-game inspection. Do not rely on community
posts or our own site's indexed copy as independent confirmation.

Use those map facts sparingly. The decisions and hypothetical ranked examples
are our analysis, not a quotation of Blizzard's recommended composition.
Do not publish exact train timings, payload-speed values, win rates or claims
that June launch balance is a new October patch. No public source/process
block or SEO terminology is added to the guide.

Google's Article documentation distinguishes first publication from later
modification and describes these properties as recommended when applicable.
That supports keeping known review history without inventing a first date;
it is not a promise of a rich result or approval.

## Verification pending

Unit tests cover all 30 rendered schemas and visible review dates, a fixture
with known publication history, all 60 valid teams, preserved Neon lineups,
distinct tactical route content and unchanged dates on the other maps.
Browser tests cover all map schemas/sitemap dates and Neon desktop/mobile
content, metadata, images, visible FAQ, navigation, overflow and no ads.
Rendered reading, exact-version recording, inventory comparison and the full
regression suite still remain. No commit, push or ad activation is included.

The version-bound public map gate is not claimed complete by this content
review or its tests. Other maps must be individually reviewed before wiring
all existing map URLs to that enforcement; do not silently deindex the family
or create review records from the slug list.

## First preview and correction

The initial 582 unit tests and preview build passed. The first browser helper
timed out waiting for an explicit robots meta tag: the existing indexable map
branch intentionally omits it. This is not a successful browser pass and is
not proof the page was noindex. Corrected the new checks to inspect both HTML
robots/googlebot directives and the response header, rejecting noindex,
nofollow or none. No production policy was changed to satisfy the helper.

Read the complete rendered article and five FAQs in IAB. Polished three
phrases and added a specific conclusion about the second-point curve instead
of ending at generic related links. The final changed text and built version
must still be read and checked; the first capture is not evidence of the
later source. No exact-version review record has been added yet.

## Individually read final revision

Read the complete rebuilt article and its five visible FAQs in IAB, including
the final changed paragraphs and its own conclusion. The final browser helper
passed at 1440, 390 and 320px: complete model text, correct title/description/
canonical, no blocking robots directives in HTML or headers, semantic review
date, FAQ/schema agreement, decoded images, dark theme, no overflow, no ads
and no browser errors. All 12 distinct main-link destinations returned 200.
Followed the real notebook fragment in IAB without editing or deleting notes.
Inspected desktop and narrow route screenshots. The helper also checked all
30 map schemas retain dateModified and omit unknown first-publication dates.

Register only `/maps/neon-junction` at version
`f01bfee108ed7ce22e22a9793ad94a0e7011871776507707e8f990bc26d75067`.
Changed copy or dates invalidate that record. No other map is individually
approved or re-dated. The map route/sitemap still use the existing policy,
so this preparatory record is not yet public enforcement of version-bound
map approval. Complete the other individual reviews before that integration;
do not mistake this record for a review of the whole family.

React review: the shared renderer remains a server component with no added
hooks, effects, network calls, client bundle or mutable request state. The
optional conclusion uses explicit conditional rendering, and the time element
preserves existing layout and visible labels. Original stable list keys remain.

Full standard regression and complete inventory comparison remain next.

## Regression exposed stale map sitemap dates

The first complete standard verification exited 1: lint, 583 unit tests and
both builds passed; browser results were 874 passes, eight existing mobile
game skips and two failures of the new all-map date test. Both Neon content
and notebook-navigation cases passed in both projects. These are not all-green
regression results. Saved the failed Playwright results and HTML separately.

The sitemap's static July 4 catalogue dates were selected before map article
dates. The new focused unit test independently reproduced the error on
Antarctic Peninsula: July 4 emitted, July 19 in the rendered model. Change
only that fallback priority so map dates come first, preserving route lists,
other content dates and existing data. Do not replace dates with today's date
or relax the expected values. Existing July 19 reviews now remain July 19;
only the actually edited Neon model receives October 19. A fresh full standard
verification must cover this correction before any publication claim.

## Corrected full verification and final inventory

The fresh standard verification exited 0: clean lint, 584 unit tests in 67
files, both isolated builds and 876 browser passes, with eight existing mobile
game skips. Two workers and zero retries remain unchanged. The first failed
results above remain preserved. Some server ResponseAborted messages were
logged; a passing browser suite does not establish an error-free server log.

The rebuilt final preview passed all three widths, all 12 distinct main-link
destinations and all 30 map schema/sitemap-date checks. Complete Neon text
matches the individually read revision. The final seeded crawl covers the
same 331 paths and 163 prerenders, all final responses 200, with an empty
queue. Sitemap membership is unchanged at 141; compared metadata differs only
in the intended Neon title and description. The same two functional-page
word-count warnings remain. Those Neon-only results predate the combined
release authorization. See `content-review-april-patches-2026-10-19.md` for
the later explicitly authorized, independently verified release candidate.

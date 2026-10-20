# Published legacy content inventory

## Read-only discovery

The earlier 331-path crawl was not a complete inventory of database-backed
public content. Query only published guides, published announcements and active
expert public identifiers, using the existing backend configuration without
printing credentials, fetching drafts, or reading orders/payment tables.

The current database contains 104 published guides, eight published
announcements and six active expert identifiers. Thirty-eight paths were absent
from the prior crawl: 30 guides, three news entries and five April patch notes.
The new seeded crawl discovers 370 paths including the patch hub linked from
those archives. Sitemap membership remains 141. This broader discovery changes
the next editorial priority; it is not proof all those records are useful.

## Confirmed findings

- Three published news records returned 404. A direct reproduction of the
  exact page query returned PostgreSQL error 42703: the source_name column
  does not exist in the current legacy announcement schema. These records
  have content_type news, not null; a null-filter explanation was not correct.
- Five April patch-note pages return 200/noindex and have the same generic
  introduction with only date/link differences. Read April 14 in IAB: it
  explains keeping a reference and links Blizzard, without actual changes or
  ranked analysis. It also exposes the kind of internal process language the
  user asked to remove. These are not useful reviewed patch articles.
- Several newly discovered guide variants are brief and overlap existing
  hero pages. Not every short video companion is automatically low quality;
  inspect the actual video, purpose and overlap before rewriting or choosing
  a valid existing destination. The Season 2 tier-list archive needs explicit
  historical context, not a claim that it is current.

The raw 19 warnings include identical 404-page boilerplate and old patch
scaffolding, not 19 independent completed editorial verdicts. The automatic
331-path "no strongest similarity" observation did not cover these paths.

## Scoped technical correction

Use the existing ANNOUNCEMENT_REVIEW_COLUMNS policy, already used by the news
hub and sitemap, instead of an explicit list of optional absent source fields.
No schema migration or database record is changed. maybeSingle distinguishes
a genuinely missing row from a backend error; the latter throws a generic
load error rather than being mislabeled as 404. A focused regression reproduced
three failures before correction; the same behaviors now pass, including
canonical metadata and noindex for a real unreviewed row.

Restore access without granting these records editorial approval or ads. The
three legacy entries must still stay out of the sitemap. Their content needs
separate individual review; an HTTP 200 is not an AdSense quality certificate.

The maps hub also no longer claims a complete catalogue or complete reviews
for every map. Its existing 30 guides, cards and links are preserved. No empty
Grimsvotn article is created to justify the old completeness wording.

## Verification boundaries

The two-map source state already passed lint, 589 unit tests, both builds and
884 browser cases, with eight existing skips, after one interrupted run whose
test server stopped listening. That pass predates the news/hub correction.
Five focused legacy-news/hub tests now pass; the expanded source still requires
its own complete regression, rendered reading and updated 370-path inventory.
At this inventory stage all changes remained local; no release or advertising
activation had been authorized.

## Restored content exposed a second H1

The first expanded run passed lint, 594 unit tests and both builds. The new
browser test confirmed Hello and the holiday entry returned 200, but the
navigation announcement failed the unchanged one-H1 requirement: its Markdown
body has another title. This is a real content-rendering issue, not a reason
to loosen the assertion. Cancelled the identity-checked runner PID 33220 after
the failure was established and saved its artifacts as expanded-failed-results.
This interrupted run is not a complete passing regression.

A separate renderer test reproduced two H1s for both NewsArticle and Article.
Map imported Markdown H1s to H2 while preserving all text and the page's own
header H1. The mapping is module-constant, uses the existing ReactMarkdown
API and adds no hooks, client fetch, mutable request state or new bundle.
React.cache still deduplicates the server news read; both the public slug and
published/type filters remain intact. No database content or dates are edited.
The corrected expanded source needs another unchanged complete verification.

The first corrected attempt passed clean lint and all 596 unit tests in 71
files plus the preview build, but stopped before browser execution because
port 3011 remained occupied after the prior cancelled run. It is not a browser
pass. The listener was identified as the owned Next start PID 17244, created
at 17:11:24 with this workspace and port in its command. Stopped that exact
old verification process, not arbitrary Node processes. Kept reuseExistingServer
false, two workers, zero retries and every assertion unchanged. The fresh
expanded-final run is now the verification target.

## Expanded run result and concrete follow-up

That expanded-final run terminated with 891 browser passes, eight existing
skips and one failure: an Ana composition worker exited at 0ms before running
the case (Windows exit code 3221226505). No trace establishes its root cause.
A separate unchanged 24-case desktop/mobile run, including Ana and the new
map/news cases, passed. This is not a complete green global run.

The three restored announcements were read in full in the internal browser.
They are genuine dated project notices, not empty test fixtures. Their existing
content remains readable and noindex. Twelve preview checks at 1440, 390 and
320px and all 32 distinct internal destinations passed. Reading the captures
revealed low-contrast publication metadata and catalogue counts: computed
contrast was 1.91:1. A focused regression reproduced that failure before the
targeted text-color changes. The later current-source suite includes the
contrast assertions without lowering their 4.5:1 threshold.

The expanded pre-patch-rewrite inventory is
`reports/maps-kings-row-lijiang-2026-10-19/inventory-expanded-final.json`:
370 paths, 141 sitemap entries, all final HTTP responses 200, 16 heuristic
warnings and an empty discovery queue. Its 91 noindex guide paths resolve to
74 destinations plus 17 aliases. These replace the earlier guide counts,
not the requirement to review actual content and video intent individually.

The patch hub's old query was a second legacy-schema failure: ordering by
source_published_at, absent on this database, produced an apparent empty
catalogue. Ordering the backend by existing created_at and sorting optional
source dates only in memory restores it without a migration. Real query
errors now throw a load error instead of claiming no articles exist.

Five exact known patch stubs now have individually researched local archive
replacements. Any body edit, draft state, different type or current approved
database review bypasses the replacement. The source records are not modified.
No new public route, review approval, sitemap entry or ad permission is added.

Direct published-record reading also confirmed repeated generic bodies in
Ana's habits guide and the Cassidy/Genji video variants, and an obsolete
Magnetic Grenade recommendation in Cassidy's short text variant. These are
next editorial work, not implicitly completed by the patch rewrite.

The post-archive crawl (inventory-april-final.json) covers the same 370 paths,
has an empty queue, no non-200 final responses and the same exact 141 sitemap
members. Eleven warnings remain; the five patch-stub similarity warnings have
gone. No paths or detector thresholds were removed to obtain that change.

All nine remaining high-similarity guide records were inspected read-only:
Ana habits and the Cassidy, D.Va, Genji, Kiriko, Reinhardt, Tracer, Winston and
Zarya video variants. Each has a 124-word source body beginning with the same
hero-substitution template. Each preserves an actual video ID and URL; stored
video dates range from 2020 to 2025, but at this discovery stage those dates had
not been independently verified on YouTube. Do not describe these as watched/current videos or remove
them during consolidation. Work next on specific own explanations or a valid
existing destination that actually preserves and contextualizes the video.

The combined patch/contrast source passed clean lint, 610 unit tests and both
builds. Its full browser run finished with 911 passes, eight existing skips
and one worker termination before the Anran mobile case executed (0ms,
3221226505). All newly added cases passed on desktop and mobile. A separate
fresh-build diagnostic repeated the unchanged Anran case five times per
project, two workers and zero retries: ten passes. This is not a replacement
for a passing global run; keep the failed run and the unresolved runner issue
visible. No publication had been performed at that point.

The user subsequently authorized the maps/news/contrast/April batch. Its exact
staged source passed a complete isolated `npm run verify`: 610 unit tests, both
builds, 912 browser passes and eight existing skips. The prior failure remains
recorded above. New video work is not included. Exact scope and verification
boundaries are in `content-review-april-patches-2026-10-19.md`.

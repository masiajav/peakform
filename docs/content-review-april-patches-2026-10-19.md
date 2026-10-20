# April patch archive review - October 19, 2026

## User value and scope

Replace five public, near-identical filler entries with distinct historical
summaries. Keep all five URLs, the existing records' creation dates, their
noindex/follow state and the hub. No new routes, database writes, migration,
automatic publication, sitemap expansion or advertising activation.

The old April 1 entry incorrectly framed the patch as relevant to ranked;
the actual announcement concerned Underwatch, a temporary April Fools Arcade
mode. Other stubs said a patch existed without describing its changes. The
old official links pointed at the current feed, not April's stable archive.

## Primary research actually read

On October 19 opened the selected internal browser on:
https://overwatch.blizzard.com/es-es/news/patch-notes/live/2026/04/

The browser rendered the official month selector as April 2026 and all five
dated entries. Direct web-tool retrieval of the other locale returned 403;
that failed fetch is not research evidence. Read the actual visible official
sections, including the Underwatch introduction and the April 17/23/28 changes.
Do not claim direct gameplay testing, a complete patch translation or any
current hero statistics based on these historical notes.

- April 1: temporary 5v5 Underwatch in Arcade through April 13, perks disabled,
  special hero kits. Distinguish event clips from competitive play.
- April 14: Season 2: Cuspide, Sierra and Grand Mesa through May 4; Ana grenade
  14 to 12 seconds, Kiriko teleport 35 to 30m, Mercy base-kit change, Antarctic
  rework, Ramattra and Lijiang Night Market in Stadium.
- April 17: Sierra projectiles 7 to 9, drone 30 to 80 HP and speed 20 to 22,
  Medical Drones major perk 75 to 100 healing, ultimate cost +30%. Interpretation
  explicitly does not equate cost +30% with time-to-ultimate +30%.
- April 23: Roadhog hook 8 to 7 seconds, Sombra's revealed movement penalty
  adjustment, Vendetta total health 250 to 275, Mizuki return-blocking fix,
  separate Stadium builds and fixes. Explicit historical DPS context for Sombra.
- April 28: replay codes deleted, scoreboard/jump and Ramattra volume fixes,
  Emre 4v4 event April 28-May 11. Not presented as a new hero-balance patch.

Own analysis applies those facts to concrete review decisions: crossing after
a missed hook, differentiating perk progress, checking a drone escape, reading
the ultimate meter and identifying the mode before comparing old clips. No
personal play experience or guaranteed ranked result is invented. Dates and
expired events are clear from the beginning rather than passed off as news.

## Implementation safeguards

The pure display resolver checks the exact SHA-256 of each observed legacy
body. A changed body, draft, non-patch row, different slug or current approved
database version is left untouched. It never changes the source row and does
not create a review token. Rendered metadata and the hub use the same resolved
content; the first publication is retained, review date is shown separately.
The official link goes to the stable actual month read in the browser, not an
unverified day fragment. Publication and review dates are distinct in Article
schema. Canonical paths are unchanged.

The existing legacy patch hub incorrectly orders the database by an absent
source_published_at column. Fetch in created_at order and sort optional source
dates in memory. Distinguish query failure from a genuinely empty catalogue.
The detail route uses maybeSingle, a generic load error and React.cache for
per-request deduplication. Public published/type filters remain in place.
All content and resolution stay on the server; no new client state or bundle.

## Regressions and rendered review

Before changing runtime code, a five-case regression reproduced four failures:
the incorrect ranked teaser, generic metadata, empty catalogue on the legacy
schema and swallowed query errors. The genuine missing-row case already
passed. All five now pass unchanged. Additional tests cover all five bodies,
preservation of first publication and later edits, and no indexing/ad approval.

Read all five complete rendered bodies and hub in the internal browser after
the production-mode preview build. Followed the actual April 14-to-17 link.
The separate preview script passed 18 checks at 1440, 390 and 320px and 13
distinct internal destinations. No overflow, console/page errors, ad slots or
ad-serving scripts were observed. Canonicals, one H1, original dates, explicit
review dates, historical answers and Article JSON-LD matched. Full screenshots
and text snapshots are under the ignored April report prefix.
All five articles were visually inspected in desktop and mobile captures,
along with the catalogue in both layouts. The separate
legacy-news/hub preview check also passed all 12 viewports and 32 internal
destinations with the metadata contrast correction in this build.

A new expanded crawl of the same 370 paths has no non-200 final response and
the exact same 141 sitemap members. Warnings decreased from 16 to 11: all five
patch-stub similarity warnings disappeared without changing the detector or
removing paths. This is corroboration, not a quality verdict or a word target.
The remaining warnings identify nine generic video guides and the two existing
word-count heuristics for the counter hub and playable game. Records and
comparison are in inventory-april-final.json and inventory-expanded-final.json.

Clean lint, 610 unit tests in 73 files and both builds passed. The full
current-source command terminated with exit 1: 911 browser passes, eight
existing skips and one Anran mobile case whose worker exited at 0ms before
execution (Windows code 3221226505, signal null). All new patch and contrast
cases passed in both projects. The complete run is not green.

Preserved its last-run and HTML report before a separate diagnostic run. With
the same source, two workers and zero retries, the actual Anran case passed
five times per project: ten passes. No assertion or parallelism was weakened.
This does not replace the failed global result or prove the root cause fixed.
No matching Node/Chrome application event or local Node crash dump was found.
A later memory snapshot showed free memory but cannot exclude an earlier
resource condition. Do not diagnose buffer corruption, OOM or a Node bug from
the exit code alone. Microsoft's fail-fast documentation describes the code
as a termination category, not a diagnosis:
https://learn.microsoft.com/en-us/cpp/intrinsics/fastfail?view=msvc-170

Logs: verify-april-archives.log and verify-april-anran-repeat.log. At that point,
the changes remained local and unpublished: a failed global command did not
satisfy the conditional release request. Those results do not establish
site-wide readiness or guarantee Google approval.

## Authorized isolated release verification

The user explicitly authorized the three reviewed maps, three restored news
routes, contrast corrections and five April summaries, conditional on complete
verification. New video-consolidation work is excluded from this release.

Materialized the exact 30-file staged candidate from Git's index into an
ignored source snapshot. Its tree is
`c9afe5c5332d86a71df37c4b16e9dbdc43642bc1`. The snapshot reused the installed
dependencies and inherited the existing environment without copying or
printing secret files. A comparison confirmed all 30 staged files matched.

The standard `npm run verify` exited 0 on that snapshot: clean lint, 610 unit
tests in 73 files, both production-mode builds, 912 browser passes in 11.4
minutes and eight existing mobile game skips. Two workers and zero retries
were retained. Anran passed in both projects within this complete run. The
earlier failed run and diagnostic remain evidence; a fresh pass does not prove
the unexplained native worker termination was fixed. ResponseAborted messages
were also observed, so the server log is not described as error-free.

Only documentation of these results is amended after the tested snapshot;
runtime and test source remain unchanged. The release log, final rendered-text
comparison, screenshots and deployment checks are kept separately under
`reports/approved-maps-news-patches-2026-10-19/`. Ads remain disabled. This
release neither renews approval for unreviewed pages nor completes the wider
editorial objective.

On October 20, revalidated that HEAD and origin/main still referenced the
composition release, the index retained the tested tree, and the isolated
runtime source was unchanged. Restarted only the stopped local preview. The
additional check passed 39 views across 1440, 390 and 320px, all 61 distinct
internal destinations and the same exact 141 sitemap members. Complete rendered
text matches the individually read drafts. Metadata, schemas, dates, decoded
images, one H1, dark background, no overflow and no advertising were checked.
The three maps' new 320px screenshots were also visually inspected.

The first auxiliary comparison script incorrectly required an explicit robots
meta tag on default-indexable pages. Its failure log is retained. The corrected
check accepts absence only for indexable pages, also checks response headers
for noindex, and still requires noindex/follow on the news and patch archives.
This was a helper correction, not a runtime or assertion-threshold change.

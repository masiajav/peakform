# Individual review: Reinhardt and D.Va counters, Season 5

Baseline: main at 0a60edd. Existing routes remain unchanged; neither base
article had a known publication date. Do not invent datePublished from a
previous review date. Both had July review dates and a Season 3 label.

## Problems corrected individually

- Reinhardt: distinguish a covered rotation from an isolated Charge; account
  for cancellation, allied follow-up and the route after the rush. Removing
  Shatter does not remove the danger of the other four enemies. Five-person
  knockdowns are not the only meaningful ultimate outcome.
- D.Va: Zarya's primary does not need to wait for Matrix. Distinguish primary
  beams from absorbible secondary projectiles. The prior example silently
  combined two Tanks; the replacement explicitly identifies role queue 5v5
  and the different second-Tank situation in 6v6. An enemy Matrix pause is
  not evidence of an empty resource meter; Boosters do not immobilize D.Va.
- Separate normal optional Minor/Major choices from Stadium powers. Explain
  the pilot, Eject and Call Mech without promising a free elimination.
- Each article has three different named-map hypothetical situations, five
  replay questions, five visible FAQs and its own conclusion. These are
  tactical recommendations, not claims of personal in-game testing.

## Primary research checked on 12 October

- https://overwatch.blizzard.com/en-us/news/patch-notes/
  Retail October 6 launch: Season 5, A Grim Doctrine. No invented individual
  D.Va/Reinhardt balance nerfs; review label identifies the current patch.
- https://overwatch.blizzard.com/en-gb/heroes/reinhardt/?mobile-app=true&theme=dark
  Normal kit and current Minor/Major choices. Shield Slam is a Major in the
  hero listing, despite an older April note calling it Minor. Do not copy
  Stadium powers or historical numerical values into ranked advice.
- https://overwatch.blizzard.com/en-gb/heroes/dva/?referer=pikicast
  Frontal projectile absorption, pilot abilities, Bunny Power, Extended
  Boosters, Shield System and Precision Fusion. Shield recovery is not
  healing all health or the team. No automatic resets from Stadium.
- https://overwatch.blizzard.com/en-us/heroes/echo/
  Beam damage is stronger below half health; no experimental resource-meter
  version or mode-specific changes imported into this article.
- https://overwatch.blizzard.com/en-us/heroes/orisa/
  Fortify, Javelin control and optional replacement of Spin by a barrier.
- https://overwatch.blizzard.com/en-us/heroes/brigitte/
  Melee/Whip Shot, Repair Pack and Rally differentiated from normal Bash.
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2024/06/
  Indexed official June 20 entry removes Suzu cleansing hard knockdowns,
  distinguishing Earthshatter from Sleep. A subsequent direct find failed;
  this is indexed official evidence, not a successful full-page retrieval.
  Existing current Kiriko review also separates cleanse from invulnerability.

Search results for June community/experimental modes and the October 2024
Pummel change were not treated as current ranked mechanics. This batch does
not assert whether current Pummel passes Reinhardt's barrier.

## Manual and automated preapproval review

Clean lint and 430 unit tests in 52 files passed. Isolated .next-verify build
completed with 193 routes. No runtime source or payment/auth code changed.

Read both complete rendered main articles in the internal browser, expanded
and read all ten FAQ answers, followed the D.Va composition link and checked
browser error logs (empty). Independently decoded portraits, checked all main
internal links for HTTP 200, one H1, canonical, matching Article description,
modified date, omitted unknown publication date, breadcrumbs and five FAQ
answers matching visible text. No ad execution, white body or horizontal
overflow in the four 1440/390 views.

Actually inspected desktop/mobile header captures, both mobile VOD sections
and both expanded desktop FAQ captures. Other saved captures do not imply
that every possible viewport or scroll position was manually inspected.

Readonly helper reports/reinhardt-dva-season-five-release.mjs exited 0:
four views, sitemap baseline 125 unchanged, errors empty. Both were still
noindex during review. Evidence in reports/reinhardt-dva-season-five.

Only after this review, readonly version inspection returned:
- /counters/reinhardt: 77b717769878f6165ab5f40dc3b0346a7bcb36a87a95742a820b45ac8c6351ca
- /counters/dva: dc6893495bcf3e5f7c6ba6020e4d09136ca14c123044b036dc5a0ee26873fd68

Manual records approve only those revisions, indexable with no ads. Later
changes require a new review. Full regression and final release checks follow.
No Google approval, legal fiscal completeness, certified CMP configuration or
real authenticated payment success is inferred from this editorial review.

## Final approved local build

Rebuilt the isolated output after manual approval. Readonly helper exit 0:
four views, 127 sitemap entries, errors empty, exact agreement of rendered
text, metadata, Article data and main links with the preapproval captures.
Only these two existing routes were added to the previous 125-entry sitemap;
both use their real October 12 modification date. No route was deleted.
Internal-browser hero-to-counter navigation and index, follow were checked.

Complete seeded inventory: 330 paths, 158 prerendered public routes, empty
remaining queue, 127 indexable and 203 noindex. One existing hub word-count
heuristic, no strongest similarity pairs. These heuristics do not certify all
public pages or claim that noindex prevents an AdSense reviewer seeing them.

## Regression diagnosis

Initial full verify: lint, 430 unit tests and both isolated builds passed;
777 of 778 browser cases passed. The existing Roadhog video guide failed its
sequential bounding-box assertion. Initial report and trace are preserved in
reports/verification-reinhardt-dva-initial-failure-2026-10-12.

Controlled web-font delay confirmed a layout shift: context bottom changed
from 717.21875 to 685.71875 and video top from 759.71875 to 728.21875.
Both simultaneous snapshots retained a 42.5px gap; this run did not reproduce
a negative mixed-frame gap. The failure screenshot did not show overlap.
The test now waits for fonts and measures both rectangles in one DOM snapshot,
retaining the strict context-bottom <= video-top check. No page CSS was changed.
Focused Roadhog desktop/mobile tests passed (2 cases, 30.1s).
The entire suite must still pass before publication.

## Final regression result

After the measurement correction, npm.cmd run verify exited 0: clean lint,
430 unit tests in 52 files, isolated .next-verify and .next-e2e production
builds, and all 778 desktop/mobile Playwright cases passed (10.4 minutes).
The final .last-run.json records status passed and no failed tests. Report
archived separately under
reports/verification-reinhardt-dva-counters-season-five-2026-10-12.
Original failed-run evidence was not overwritten. The final suite includes
Season 5, anonymous marketplace access guards and legal/privacy presentation;
it does not establish that an authenticated live payment succeeds.

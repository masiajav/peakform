# Season 5 news: October 13 hotfix

Reviewed on October 15, 2026, from baseline 9b0efe4. The original plan for this
batch was Winston/Cassidy counters; research uncovered a newer official hotfix,
so the already-published season article takes priority. Neither counter was
edited or approved. No new URL, database write or advertising change.

## Official evidence

Official monthly live notes, retrieved through the search index on October 15:
https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/10/
https://overwatch.blizzard.com/es-es/news/patch-notes/live/

The direct monthly fetch returned an internal retrieval error; indexed official
English and Spanish results agree on all five heroes. Do not claim that a direct
fetch succeeded or use third-party balance claims as confirmation.

## Changes

- Add the actual October 13 numerical changes for Doctrine, Sombra, Roadhog,
  Kiriko and D.Mon, distinguishing damage, healing, ability duration, cooldown,
  health and armour. Do not conflate the central Scrap Gun projectile with total
  weapon damage, or D.Mon armour with total life.
- Add conditional ranked advice rather than a fabricated win rate or tier list.
- Keep the September 12 publication date, existing URL and launch/trial history.
  Modified date is October 15, not the earlier date the patch shipped.
- Align description, NewsArticle, visible date, FAQ, home/news excerpt and the
  two actually changed sitemap dates. Preserve every existing sitemap URL.
- Official patch link is integrated naturally in the news text; no public
  description of SEO, internal research or editorial workflow.

The standalone hero guides retain their real previous review dates. This news
update does not automatically renew their version-bound reviews or assert a
complete hotfix review of every related guide, counter or composition.

## Verification

Lint and 430 unit tests in 52 files passed, and the isolated .next-verify build
completed with 193 routes. React review: static server-rendered text only,
no new dependency, client state, data fetch, hook or hydration boundary; the
new section has a labelled region and a native anchor with scroll offset.

Readonly local release helper passed six views (1440/390 across article,
home and news), zero page/console errors, image decoding and main internal
links HTTP 200. Twelve visible FAQ entries match JSON-LD; publication history
is retained. The initial sitemap helper compared 119 dated entries and found
only the two intended modification dates different. Its regular expression
excluded entries without lastmod; this is not a complete URL-set comparison.
The helper now uses DOMParser for all entries and must be rerun before release.
The helper initially assumed an explicit robots tag; these pages use default
index/follow. The check was corrected to reject noindex/nofollow without
changing page policy. A separate helper navigation read was corrected to await
the destination URL after clicking; no runtime navigation code was changed.

Read rendered article and the new section in the internal browser, clicked
the anchor and checked page error logs (empty). Actually inspected both saved
desktop/mobile balance screenshots. The browser automation service separately
logged Statsig network errors to its own endpoint; these were not errors of
the Replaid Lab page, and no security protection was bypassed.

Pending full desktop/mobile regression and production comparison.
Account approval and certified consent configuration are separate outstanding
items; this editorial update does not enable advertising or complete the goal.

## User-directed stop

On October 15 the user confirmed AdSense is still under review and redirected
work to on-demand news/patch commits. Stopped the owned full-verify process tree
during desktop tests (last delivered progress: case 211), not after a completed
suite. Lint, 430 unit tests and isolated builds had passed, but the full command
was interrupted and exited 1. No claim of full regression success.

All application and test edits remain local, unstaged and uncommitted. No push,
deployment, AdSense request or account change was made. Finish the structured
sitemap check and full browser suite when the user next requests this release.

## Commit requested and verification completed

The user subsequently requested finishing this commit. No push was requested.
Clean lint and 430 unit tests (52 files) passed again. Both isolated builds
completed in the current checkout, which also contains unrelated Arcade work
(194 routes). That work and its navigation/configuration edits are excluded
from the hotfix commit, not reverted or certified by this review.

The corrected XML DOMParser helper passed six local views with 127 complete
sitemap entries, the same URL set as production, and only the intended article
and news dates changed. Article text, dates, metadata, twelve FAQs, images,
internal navigation, absence of ads and page error logs all passed. Actual
desktop balance and mobile home captures were inspected again.

Ran every tracked E2E spec plus the new hotfix spec, explicitly selecting
25 files so the separate untracked Arcade spec remains outside this batch.
All 782 desktop/mobile cases passed in 10.5 minutes; command exit 0.
The final .last-run.json records passed and no failed tests. Evidence archived
under reports/verification-season-five-hotfix-2026-10-15. This replaces the
earlier interrupted run as the regression result, without claiming that the
interrupted command had succeeded or that Arcade was fully tested.

Only the four application files, three E2E specs and this review document
belong to the commit. No production comparison, deploy, push, AdSense change
or automatic continuation of the site-wide goal is part of this request.

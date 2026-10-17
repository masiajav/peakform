# Rejection response: evidence and work in progress

The user supplied a new AdSense low-value-content rejection. The screenshot
states another request is unavailable until October 24, 2026. It does not
establish a Search Console manual action or identify particular failing URLs.
No AdSense, Google account, advertising or financial setting was changed.

## Current production baseline

Read the three official references supplied by the user on October 17:
- https://support.google.com/adsense/answer/10015918
- https://support.google.com/webmasters/answer/9044175#thin-content
- https://support.google.com/publisherpolicies/answer/11035931

They emphasise unique user value, navigation, genuine services, and avoiding
copied, repeated or doorway content. No numeric word threshold is a Google
acceptance criterion. A green automated report does not prove acceptance.

Merged the current origin/main without conflicts, preserving the existing
hotfix commit and the user-created untracked files. Current remote changes
concern the Arcade game, not this editorial batch.

Production audit used the previous complete public inventory as seed:
331 public paths, 128 sitemap/indexable URLs and 203 noindex, empty crawl
queue. Two word-count heuristics concern /counters and /arcade/oversvivors;
a functional game must not be judged solely by its surrounding word count.
No strongest-similarity pairs were detected; this does not certify originality
or substitute for reading pages. Report:
reports/adsense-rejection-2026-10-17/production-baseline.json.

Readonly model inspection found individual editorial counter and composition
models for all 54 heroes. Many still lack current exact-version approvals.
Do not delete or approve them just because an older fallback exists in code.

## First substantive improvement

Add a usable local VOD notebook to the existing review guide, not another URL.
It supports up to three moments, information/decision/alternative observations,
a practice task, restoration and plain-text export. No note submission, new API,
database table, login or advertising. Three clearly fictional practice cases
are individually written for Support, Tank and DPS; they are not claimed to
be real client reviews or personal competitive experience.

Retain the entire article and original publication date. Bind the new feature
version to the editorial model; the old approval is invalid until actual QA.
The VOD page is not silently approved by adding a component.

Remove visible EVERGREEN labels from the home and replace an overconfident
service promise. Surface the existing VOD URL in featured learning links and
the guide hub, without adding sitemap volume.

## Notebook verification

The first browser run found changing accessible field names caused by implicit
labels around selects and controlled textareas. Explicit label/control IDs
fixed this without weakening the exact-label assertions. The targeted rerun
passed all eight desktop/mobile cases, including a real text-file download,
reload restoration, role choices, corrupt storage and blocked storage.

Reviewed the filled desktop/mobile captures in reports/vod-notebook. The
responsive fields remain contained and the dark theme is present. A subsequent
polish avoids creating an empty draft on first visit and preserves accents in
the downloaded text. The full regression run must cover this final version.

Only the VOD guide receives the new exact-version editorial record. No other
pending page is approved. Privacy receives its own review date so the legal
page is not falsely marked as changed.

## Completion requirements still open

Full site-wide editorial
review, real CMP/account readiness and actual production release are not
proved by this first batch. Google approval cannot be guaranteed.

## Final verification before commit

- `npm run verify` completed successfully: lint clean, 458 unit tests,
  isolated production build and 800 browser tests passed. Eight keyboard-game
  cases are intentionally skipped in the mobile project; no new skip was added.
- The final notebook flow passes on desktop and mobile, including the empty
  first visit and accented downloaded text. Existing evergreen checks confirm
  one H1, canonical, description, visible dates, matching BlogPosting/FAQ,
  retained article content, no horizontal overflow and no advertising code.
- The internal browser renders the completed guide with the dark theme,
  notebook controls, publication/review dates and the retained article.
- Final local inventory, seeded from production and the isolated build:
  331 public paths, 128 indexable/sitemap URLs, 203 noindex, empty crawl queue.
  No sitemap URL was added or removed. The VOD guide is 200, index/follow,
  with its existing canonical. The same two baseline word-count heuristics
  remain; they are not new failures or Google acceptance thresholds.
  Evidence: reports/adsense-rejection-2026-10-17/local-final.json.
- The audit preview logged Stripe authentication errors when reading expert
  account status with the local configuration. This batch does not change
  Stripe, and the tests do not prove real payments or connected-account
  readiness. No transaction, credential or account setting was changed.
- Temporary audit servers and the temporary internal-browser tab were closed.
  No push, deployment, AdSense activation or review submission was performed.

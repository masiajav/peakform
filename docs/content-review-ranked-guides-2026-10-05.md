# Ranked guides: individual editorial review, 5 October 2026

This is a local editorial decision, not Google approval or confirmation of a
production deployment. Public routes, database rows, discovery links and the
marketplace remain intact. All seven guides are explicitly ineligible for ads.

## Date and research evidence

See content-research-ranked-2026-10-05.md for the read-only original guide row
dates and primary references. Publication uses the site's original row creation
date, 21 June 2026; the exact first deployment timestamp is not independently
established. Revision is 5 October, when these texts were actually rewritten.
The previous unsupported common May date has been removed. Older patch notes
support qualitative interactions, not current numerical balance. Examples are
hypothetical ranked situations, not invented personal experience.

## Individual decisions

Every article below was read completely in the rendered main, including its
four opened FAQ answers. Each header, map example, VOD/checklist and FAQ layout
was inspected individually in desktop and mobile screenshots. The new Cassidy
FAQ was reread and visually checked on both sizes in the internal browser on
the later build, with keyboard focus and Enter activation.

- Ana: approved. Sleep buys a retreat or coordinated follow-up; anti requires
  allied pressure; both cooldowns can be necessary for survival. Nano considers
  reach, cover and the recipient's available resources. Gibraltar illustrates
  moving before losing healing sightlines. No guaranteed rank improvement.
- Kiriko: approved. Ofuda travel and incoming damage determine kunai timing,
  not an obligatory two-kunai cycle. Suzu can cleanse Sleep/anti and protect
  before impact, but does not remove an applied Earthshatter knockdown. King's
  Row illustrates the teleport decision after spending Suzu.
- Genji: approved. Actual allied pressure determines entry; Dash does not have
  a reset until the elimination happens. Deflect direction and beam limits are
  explicit. The Dorado example weighs a second chase against keeping height
  and helping the team move payload. Blade is not a promised team wipe.
- Cassidy: approved. Flashbang applies Hinder rather than the old full stun;
  ammo and follow-up still matter. Roll reduces damage, not invulnerability or
  vertical escape. Midtown illustrates changing from angle to peel and back.
  The duplicated proximity FAQ was replaced with a distinct Flashbang answer.
- Reinhardt: approved. A corner is not safe if another angle still has vision;
  regenerating shield requires coverage first. Charge cancellation has a planned
  end, and Shatter needs follow-up. King's Row illustrates conceding a corner
  before losing both armour and shield, rather than charging back into isolation.
- D.Va: approved. The example is normal 5v5, not two allied Tanks. Matrix stops
  incoming projectiles, not Coalescence or Earthshatter; necessary continuous
  coverage is not prohibited. Gibraltar illustrates keeping height after
  displacing Soldier. Pilot, interrupted re-mech and overtime risks are explicit.
- Winston: approved. Jump distance does not change cooldown. Bubble cuts a
  specific sightline, not all enemy healing. Numbani illustrates an exit planned
  before landing and avoiding an extended chase. Primal is judged by displacement
  and objective control, not survival alone or invented ultimate economy.

## Rendered verification before registration

The first combined run passed 322 public tests but failed all 14 new ranked
checks because their expected title separator was wrong (` | ` instead of the
existing layout's ` - `). Those reports remain archived under
reports/verification-ranked-first-pass-2026-10-05. No failing check was deleted.

After correcting the expectation and improving the header, the focused ranked
run passed all 14 desktop/mobile cases with zero retries. It checked actual
navigation to heroes and back, every internal main link responding 200, portraits
loading, one H1, exact metadata/canonical/robots, visible dates, matching FAQ and
BlogPosting schema, sitemap exclusion while reviews were pending, no clipped
text or horizontal overflow, no browser errors and no executable ads/placeholders.

Manual inspection found the original mobile portrait pushed the useful answer
below the first screen, and the desktop portrait stretched. Scoped styles now
put the answer first, keep a square 200px/160px portrait, improve secondary-text
contrast and retain visible keyboard focus. No shared global CSS was changed
for this batch. The renderer remains a server component with native details.

reports/ranked-guides/accessibility-and-paragraphs.json records 14 separate
rendered main checks: HTTP 200, four FAQ answers opened per page, zero axe
WCAG 2 A/AA and 2.1 AA violations. Exact full paragraph comparison found no
copied introduction/body paragraph in the corresponding hero model. This is
only a duplicate detector, not proof that all content on the site is original.
The later Cassidy FAQ change does not invalidate the other six results; its
final build and internal-browser reading were checked separately.

Seven model revisions are manually pinned in static-editorial-reviews.ts only
after the above individual reading and visual checks. Registry approval is not
generated by builds, length, known slugs or this document. The shared ranked gate
is used by metadata and both sitemap paths, so a stale published database body
cannot approve the different repository article or overwrite its revision date.

## Final regression status

After registration, npm run verify completed successfully: lint without cache,
350 unit tests across 38 files, isolated production build and 710 Playwright
desktop/mobile cases with zero retries (11.5 minutes). Reports are preserved
in reports/verification-ranked-guides-2026-10-05. No failing test was removed.
git diff --check also passed; line-ending warnings were not whitespace errors.

The final crawl in reports/adsense-local-2026-10-05-ranked-final.json checked
330 documents, all HTTP 200, with no remaining build-manifest paths. It found
104 sitemap URLs, 105 indexable responses (including canonical variants) and
225 noindex. Compared with the hero-index baseline, no sitemap URL was added
or removed. All seven ranked pages are index/follow, in the sitemap and have
no crawler issue. The two hub-length warnings are diagnostic heuristics, not
Google requirements or proof of the rejection reason.

reports/ranked-guides/accessibility-final.json rechecks the final approved
build, including Cassidy's last FAQ edit: fourteen main checks, four open FAQ
answers each, zero WCAG 2 A/AA or 2.1 AA axe violations. The internal browser
also shows the final Ana build at port 3018, without new console errors.
This does not certify the unreviewed maps, roles, compositions, other guides,
all-page originality, production deployment or authenticated payments.

At batch closure the user provided the legal owner and authorised address;
their integration belongs to the next trust-page change, not these tests.
A configured certified CMP, authenticated marketplace/payment verification,
production rollout and Search Console remain separate unfinished work.
The overall AdSense-readiness goal stays active.

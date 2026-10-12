# Shion counter and composition review - 11 October 2026

## Scope and initial evidence

Starting release: `5f839d6ad222393c75197cb6f40154bb02e3c1d1`, with 122 sitemap
entries. The two existing routes are `/counters/shion` and `/team-comps/shion`.
Both remain accessible but unapproved until the individual rendered review.
No new routes, database changes, payment changes, environment changes or ad
activation are part of this batch.

The counter still names normal Hack as a Sombra response and explicitly calls
its advice an archive of the former DPS kit. Both articles describe Season 3
as their reviewed patch. The current Shion hero page already describes Survival
Instinct and the released Sombra Support kit, so these related articles disagree.
The counter's known original publication date of 28 June is retained; the
composition has no established publication date and will not receive one.

## Research

Official indexed English Shion hero details retrieved on 11 October confirm
Evade's brief overhealth, dismount/launch Joyride, three advances of Satsuriku
Spree and the current perks. The 6 October retail notes confirm replacement of
Rapid Reload by Survival Instinct. The August archive distinguishes ground
launch detection from riding damage, and July distinguishes recovery after
Execution from an ability cooldown. Localised older hero extracts still mention
Rapid Reload and are not used as the current perk reference.

- https://overwatch.blizzard.com/en-us/heroes/shion/
- https://overwatch.blizzard.com/en-us/news/patch-notes/retail/
- https://overwatch.blizzard.com/en-us/news/patch-notes/url/null/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/08/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/7/
- https://overwatch.blizzard.com/en-gb/heroes/sombra/

Direct hero and retail retrieval returned an error; the indexed official
extracts, crawl dates and relevant changes were checked instead. Sombra's
Support kit uses Hotfix and Cyberspace; Weaken reduces the affected hero's own
damage/healing output, not incoming healing or all ability use. EMP still hacks.
No win-rate estimate, new balance change or measured optimal lineup is inferred.

## Individual editorial decisions

Counter: keep six distinct responses, explain what each protects and when it
can act. Separate Evade's temporary health from invulnerability, antiheal from
already granted overhealth, and Sombra's current zone from old normal Hack.
Explain optional Minor/Major choices without granting every perk simultaneously.
Use Neon Junction and Esperanca examples with the objective and ally cameras,
not a fabricated successful match. Add five concrete replay questions and a
specific closing decision.

Composition: keep the existing three valid 5v5/6v6 teams, but rewrite each plan
around ally sightlines, landing position, ammo and the return route. Distinguish
Sombra Support substitutions from Kiriko's cleanse, Matrix from collective
invulnerability, speed from a safe destination, and two Tanks from 5v5 role
queue. Add five composition-specific replay questions and a separate conclusion.

Approval, verification and publication remain unproven at this point and will
be recorded only after the actual checks. Advertising stays off. This work does
not establish Google approval, certified CMP configuration, or a real checkout.

The first independent local browser check exposed a misleading related link:
the shared hero-link policy rewrites the unavailable Sombra hero detail to a
guide filter. The two new links and the Sombra threat instead point to the
already reviewed Sombra counter, where the Support kit is actually explained.
No shared routing policy is widened to expose an unfinished hero page. The
helper initially failed on this link expectation; no passed report was created.

## Individual rendered review

After the related-link correction, the independent local browser helper passed
with four views (1440px and 390px), 122 sitemap entries and no errors. Each route
returned 200, had one H1, correct canonical and unique metadata, Article,
BreadcrumbList and five visible matching FAQ answers. The counter retained its
28 June publication date; the composition omitted an unknown publication date.
Both carried the actual 11 October revision. Internal links returned 200, images
decoded, backgrounds stayed dark and no horizontal overflow or ad loader/slot
appeared. The real click path was hero -> counter -> composition -> counter.

Both complete rendered articles were read in the internal browser. The Evade FAQ
was expanded, the composition link clicked, and its Kiriko/Sombra FAQ expanded;
the updated accessibility state and screenshot confirmed the answer. Console
error logs were empty. The four desktop/mobile viewport captures and each
mobile VOD and expanded-FAQ capture were inspected independently. Element FAQ
captures can include the fixed navigation overlay; the actual internal-browser
viewport was also checked instead of claiming the cropped capture was unobscured.

The existing candidate slugs are unchanged. Only now are the two exact article
versions recorded as approved. Future content, metadata or link edits invalidate
approval; this is not an automatic approval by slug, word count or test length.
Final build, whole-site tests and public-domain publication are still pending.

## Final local checks before the whole suite

420 unit tests in 50 files passed. The isolated build generated the same 193
routes. With the exact reviews installed, the independent helper passed again:
four views, 124 sitemap entries, no errors, and complete article/metadata/schema/
link agreement with the pre-approval rendered report. Only the two existing
Shion URLs enter the sitemap, each with 11 October lastmod; none of the prior
122 entries disappears.

The seeded inventory audit covers the same 330 public paths and 158 prerendered
build paths, with no missing build paths. There are 124 indexable and 206 noindex
routes. No strong paragraph-similarity alert appears. The single automated issue
is still the counter hub's less-than-500-word heuristic; this is not a Google
word-count minimum and does not justify directory padding. Classification labels
from this script are heuristics, not individual human editorial approvals.

The owned 3013 preview was stopped before starting full verification, keeping
development/preview, verification build and Playwright artifacts separate. No
user process or build directory is reset. Account-side CMP, legal fiscal data
and real payment verification are not completed by this editorial batch.

## Verification resumed on 12 October

The 11 October full-suite handle was missing when execution resumed. No final
result existed: the report still belonged to the prior release, while the
partial test artifacts stopped at 10:53 on 11 October. No 3011/3013 listener or
matching Playwright/preview process remained. That run is interrupted, not a
passed regression. A new complete `npm.cmd run verify` was started only after
these terminal-state checks, with unchanged application content and assertions.

The repeated lint, 420 unit tests in 50 files, and isolated 193-route build have
passed. The 766-case desktop/mobile regression is still running; its final
result and deployment are not yet proven. `git fetch origin` confirmed that
HEAD and origin/main have no divergence before this release.

The next existing article to review is `/counters/ana`. Its current getter still
returns the base article with the Season 3 label and a normal-Hack example for
Sombra. The indexed official Ana hero page and October archive were inspected
on 12 October: Local Anesthetic replaces Groggy, and the new Sleep impact effect
must not be confused with a Stadium power or removal of normal Sleep. Direct
retrieval of both official pages returned 403; this is recorded rather than
describing those fetches as successful. No Ana approval or content edit is made
while the current full-suite build/server is live.

- https://overwatch.blizzard.com/en-us/heroes/ana/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/10/

Google's rejection guidance was rechecked on 12 October: its review can cover
all site pages, not just the submitted URL. Noindex is therefore not treated as
an exemption for unfinished public articles. The actual certified-CMP setup,
authorised fiscal identifier and authenticated marketplace verification remain
separate unproven requirements; this batch does not activate ads or submit an
account-side review request.

- https://support.google.com/adsense/answer/81904?hl=es
- https://support.google.com/adsense/answer/13554116?hl=es

## Complete regression result

The replacement `npm.cmd run verify` finished with exit code 0 on 12 October.
Lint was clean, all 420 unit tests in 50 files passed, and the isolated build
generated 193 routes. All 766 desktop/mobile browser cases passed without
retries in 10.2 minutes, including the six new Shion cases. The passed report
and last-run result are archived at
`reports/verification-shion-season-five-2026-10-12` rather than replacing the
interrupted run with an assumed success.

This suite covers anonymous private-route restrictions and editorial public
navigation. It does not establish authenticated checkout, account-side CMP
configuration, legal completeness or approval by Google. Publication and
post-deployment agreement with the reviewed local pages are checked next.

## Published release proof

Published as `350c5f8c77d13b557cb7c43b94e1777e20620437`. GitHub's Vercel commit
status became success for deployment `HY8eyakj3vTqnEakDR77oQ1pXnLr`. Authenticated
Vercel tooling remained unavailable; this is a commit-status signal, not access
to deployment logs. Independent production checks completed with four viewport
cases, sitemap 124, no errors, and exact agreement with the approved local main
text, metadata, Article, FAQ and internal links. The two Shion routes were the
only sitemap additions to the prior 122-entry release.

Four production viewport screenshots were inspected. In the internal browser,
the Evade FAQ and the Kiriko/Sombra composition FAQ were opened and the
counter-to-composition link followed; no console errors. Production evidence:
`reports/shion-season-five/production.json`. No ads or Google account actions.

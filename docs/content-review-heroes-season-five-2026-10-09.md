# Hero updates for Season 5, 9 October 2026

Reviewed individually: `/heroes/shion`, `/heroes/ana`, `/heroes/genji` and `/heroes/dmon`. Preserve original publication dates, routes, videos and map examples. Replaid Lab remains the author; no personal gameplay or rank claim is added.

Primary cross-check: Blizzard's 6 October live patch notes and the current official Ana hero page. The live page rejects some direct automated requests; indexed official extracts and Blizzard's Announcements post corroborate the changes. Do not use Stadium or Experimental values as the ordinary ranked kit.

- https://overwatch.blizzard.com/en-us/news/patch-notes/live/
- https://overwatch.blizzard.com/en-us/heroes/ana/
- https://us.forums.blizzard.com/en/overwatch/t/overwatch-retail-patch-notes-%E2%80%93-october-6-2026/1041373/1

Shion: replace Rapid Reload with Survival Instinct, distinguish overhealth duration from amount and ammunition, and retain June/July/August history. Advice now considers preparing ammunition before the flank, rather than relying on a removed reload perk.

Ana: replace Groggy with Local Anesthetic, distinguish impact from waking, and do not turn the nearby slow into an area Sleep. Retain concrete Gibraltar/King's Row positioning and add a specific VOD conclusion.

Genji: date the Dash/Blade adjustment, distinguish base damage and swing speed from guaranteed breakpoints, and keep target access, armor and defensive help in the combo advice. No guaranteed Nanoblade kill is asserted.

D.Mon and Shion: Sombra is now Support. Cyberspace reduces the affected enemy's own damage/healing output, not healing received. Normal hero Hack was removed; EMP remains distinct. D.Mon's September adjustment history is not falsely presented as a new October buff.

Read all four rendered articles in the internal browser. Opened the changed FAQ disclosures there and exercised the section anchors. Separate headless desktop 1440x1000 and mobile 390x844 checks opened every FAQ, scrolled and decoded all article images, checked one H1, canonical, valid FAQ JSON and horizontal overflow. Unique internal destinations returned 200: Shion 19, Ana 14, Genji 14, D.Mon 21. No ad script/slot or browser console error observed. Screenshots under `reports/season5-guides/` were inspected; these are ignored local artifacts.

The preview correctly remained noindex until the explicit version-bound records were renewed after review. Only these four records are renewed. This does not approve older Sombra/Roadhog analyses or other pending content.

Pick Lab: query variants keep the base canonical and become noindex/follow; the base remains index/follow. No client-state rewrite or ad activation. Manual counter-mode navigation revealed a second outdated roster in the shared overlay data; Sombra moves to Support and Doctrine becomes selectable. Preserve recommendation mechanics and existing counter weights in this narrow roster change; matchup scoring still needs a separate editorial review. Overlay tests passed. No new measured win-rate or official style ranking is claimed.

Final release verification is recorded after the fresh full suite, not inferred from this preview. These checks do not establish authenticated payment success, CMP readiness or AdSense approval.

Release checks, completed 10 October after the 9 October content review:

- Uncached lint passed; 390 unit tests in 46 files passed.
- Isolated production build passed with 193 routes; Playwright rebuilt its own artifacts before browser checks.
- The complete 742-test desktop/mobile run passed 740 tests. Both failures were the same obsolete human-readable 4 October expectation for D.Mon, while its visible date and Article dateModified correctly showed 9 October. Updated that expectation and reran the two affected tests on a fresh build: both passed. No runtime code changed during the suite.
- Shared overlay tests: four passed. Pick Lab base/query metadata and current Support roster passed on both viewports.
- Uncached lint passed again after the test correction; version hashes still match the four reviewed articles.
- Before deployment, production sitemap contains 110 URLs. Compare it after deployment: no URL should be added or removed by this batch; only the four reviewed hero dates should change.

This is a scoped release, not completion of the site-wide editorial audit. Older Sombra/Roadhog advice and Pick Lab matchup weights still require review. Keep ad execution off while the user handles the AdSense review.

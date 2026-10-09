# Season 5 update, 9 October 2026

Scope: existing launch news URL, home, news and hero directories, Doctrine's hero article, current Sombra role, and labelled pre-rework archives. No new public route, payment change or advertising activation.

Primary evidence: https://news.blizzard.com/en-us/article/24303008/feed-your-hunger-in-reign-of-talon-season-5-a-grim-doctrine ; https://overwatch.blizzard.com/en-us/news/patch-notes/live/ ; current hero pages for Doctrine, Sombra and Roadhog on overwatch.blizzard.com.

Some Overwatch pages return HTTP 403 to direct automated fetches. Official indexed extracts supplied the kit and patch cross-check; this is not an in-game test. The Blizzard News announcement was accessible in full. Community Crafted and Stadium changes were not treated as the ordinary ranked kit.

Season 5 started on 6 October. Preserve the news publication date of 12 September and record the actual 9 October revision. Separate Doctrine's current movement, drones and Transfusion from the September trial. No barrier penetration, win-rate tier or personal gameplay experience is invented.

Sombra belongs in Support. Her old Hack/Virus analyses remain labelled archives, without current index approval. The generic builder filters candidate pools by current role. Compositions with the old DPS slot display a warning and are not silently converted to a new strategy. Doctrine and Roadhog pre-launch proposals are labelled as archives too.

The news covers Grímsvötn, event dates and Unvaulted Passes. Event powers are not ranked abilities. The BlizzCon voucher is explicitly expired. Past seasons retain their URLs.

Read the complete Doctrine article in the internal browser. All eight FAQ disclosures opened correctly. Desktop 1440x1000 and mobile 390x844 captures checked: one H1, no horizontal overflow, all images loaded after scrolling. Its 17 internal destinations returned 200. The season news's three internal destinations returned 200; its three images loaded after scrolling at both sizes. No ad loader or ad element observed. Captures: `reports/season5-*` (local artifacts).

Final `npm.cmd run verify` passed: lint with no warnings/errors, 383 unit tests in 45 files, the isolated production verification build, and all 740 desktop/mobile Playwright tests. An earlier run exposed the unchanged hub sitemap dates and a case-sensitive home heading assertion; both were corrected and the full suite rerun on a fresh build. These checks do not prove authenticated checkout or Google approval. AdSense review mode remains on; approval is not asserted.

Compared the fresh local sitemap against the production baseline: 109 to 110 URLs. Only `/heroes/doctrine` and the individually reviewed `/team-comps/reinhardt` are added; the obsolete `/counters/sombra` is removed. Heroes, news, the season article and both reviewed articles have the actual 9 October lastmod. No old route is deleted.

Follow-up scope, not claimed complete in this release: contrast Shion's changed Minor perk, Ana's replaced Minor perk and Genji's launch balance with their individual hero articles; replace the older Sombra/Roadhog guide analyses and remaining pre-release matchup wording. A working browser regression does not establish that every older gameplay recommendation is current.

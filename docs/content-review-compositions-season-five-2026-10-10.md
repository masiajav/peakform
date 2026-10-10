# Sombra and Roadhog compositions: Season 5, 10 October 2026

Scope: replace the two pre-rework composition archives at their existing routes. No database, payments, authentication, ad environment or other hero publication approvals are changed.

## Accuracy and useful decisions

Cross-checked the October 6 retail update, current hero pages and season announcement. Direct hero-page requests return 403 in automated research; indexed official excerpts corroborate the current abilities and perks. Community posts are not treated as balance evidence.

- https://overwatch.blizzard.com/en-us/news/patch-notes/pc%20/
- https://overwatch.blizzard.com/en-us/news/patch-notes/retail/
- https://overwatch.blizzard.com/en-gb/heroes/sombra/
- https://overwatch.blizzard.com/en-us/heroes/roadhog/
- https://overwatch.blizzard.com/en-us/news/24303008/feed-your-hunger-in-reign-of-talon-season-5-a-grim-doctrine/

Sombra now fills a Support slot in all three proposals. Rebuilt the lineups and the division of healing, dive follow-up and peel; they are not the old DPS lists with a different heading. Advice distinguishes Hotfix from unlimited sustain, Weaken output reduction from anti-healing or silence, ordinary object hacking from EMP, and optional Life Hack from the base ultimate. The two-Tank example explicitly belongs to role-queue 6v6. Map examples cover Numbani, Midtown and Gibraltar.

Roadhog retains useful hook-follow-up advice but includes the two-burst weapon and directional Trash Compactor. Plans distinguish a short coordinated crossing from full team protection, stagger Sigma's defense rather than spend everything on the same shot, and give a retreat when antiheal or multiple angles make healing insufficient. Breather and Lamp are not cleanses; Here, Piggy Piggy is conditional on perk selection. King's Row, Dorado and Ilios examples explain different failures and adjustments.

Lineups are reasoned starting points, not measured meta rankings, win-rate claims or personal playtest reports. Each article has its own quick answer, opening, role responsibilities, examples, VOD questions, FAQ and conclusion. Existing video guides and current counter articles remain linked; no false original publication date is introduced. Replaid Lab is the public author.

## Observed review evidence

Read both rendered articles in the internal browser. Reviewed headers, lineup descriptions and opened the Cyberspace and Trash Compactor FAQ disclosures at desktop and 390x844; restored the viewport. Dark background, readable text, decoded portraits and no horizontal overflow were observed. The existing compact reviewed composition layout is reused without CSS changes.

Independent local browser checks passed on four route/viewport combinations. Verified one H1, title/description/canonical, dateModified matching the visible date, Article and FAQPage matching visible content, three complete composition cards, all main internal links returning 200, decoded images, no console/page errors and no ad execution. Evidence is in ignored local artifacts under reports/season-five-compositions/local-review.json. Sitemap baseline is 110 URLs, with both unapproved compositions absent.

Unit tests pass for the updated article dates, valid role counts, current kits, perk distinctions and distinct paragraphs. Preliminary lint and isolated production build also passed. These observations support registering only the two exact reviewed content hashes for index/no-ads publication. Any later content change must invalidate this approval.

## Release checks

Before release, rerun the full verification suite after registering publication intent. Compare the final local pages to the reviewed rendering; sitemap must add only these two existing URLs, with their actual October 10 revision date. Verify the deployed exact commit separately, not from a successful push. Release reports are recorded under reports/season-five-compositions.

Final isolated local rendering checks passed after registering the two approvals. The article text, metadata, structured data and internal links match the manually reviewed version exactly. Only robots and sitemap eligibility changed: 112 sitemap URLs, with precisely Sombra and Roadhog compositions added and no removals. An independent inventory crawl using the previous production inventory plus the current build manifest visited 330 documents with an empty remaining queue: 112 indexable and 218 noindex. No high-similarity pairs were flagged at the configured shingle threshold. Its sole heuristic issue is the 408-word counters hub below a generic 500-word cutoff; this is not evidence of a Google word-count requirement and does not justify padding the hub. The inventory is technical evidence, not certification that every public article has been reviewed.

Final verification ran lint without cache, 392 unit tests in 46 files, the isolated production build (193 routes) and the entire 746-case desktop/mobile suite. The full browser run finished with 745 passes and one failure: Shion's embedded YouTube player emitted its own compute-pressure permission warning. The retained trace identifies youtube-nocookie.com's player script, not an application error. Aligned the hero test with the existing guide test's exact-message, exact-origin exception; application errors and resource failures remain checked. A fresh isolated build and rerun of all hero-page and Season 5 browser tests then passed all 34 cases on desktop/mobile. Lint passed again after this test-only correction. No serving code changed after the full build or manual review.

This evidence covers these two articles, not the remaining site-wide audit, authenticated checkout, CMP readiness or Google's AdSense decision. Ads remain disabled during review.

# Version-bound publication checks for map articles

## Scope

The thirty map routes and hub links remain available. Catalogue membership is
not editorial approval. The shared map decision now checks the current article
against its exact-version review, then validates its dates, metadata, route
decisions, teams, hero roles, FAQ, links and repeated paragraphs. A slug or word
count alone cannot approve it. No advertising eligibility is granted.

Only six models currently have individual review records: Neon Junction,
King's Row, Lijiang Tower, Dorado, Blizzard World and Nepal. The latter three
remain a locally pending content lot; their original review evidence and dates
are preserved. None of the remaining twenty-four receives a synthetic review.

Pending maps render the same content at the same URL, with `noindex, follow`,
and are omitted from the sitemap. The hub still links all thirty. This is an
interim publication safeguard, not a substitute for rewriting and reviewing
the remaining articles, nor proof of site-wide AdSense readiness.

## Regression coverage

Synthetic approvals exist only in the isolated unit-test registry. The tests
reject changed copy, metadata or dates; missing reviews and content; unknown
slugs; incomplete decisions; invalid or duplicate lineups; impossible dates;
protocol-relative links; repeated paragraphs; and internal drafting labels.

Sitemap tests explicitly enumerate the six reviewed articles and check their
actual revision dates. Browser checks retain HTTP 200 and date/schema checks
for all thirty routes, exercise hub navigation to an unreviewed article, and
check its canonical, full content, images, mobile width and absence of ads.

The new isolated snapshot starts from published commit 8ab50f4, using the
patched Node 24.22.1 runtime and the already committed dependencies. Evidence:
`reports/map-publication-gate-2026-10-23/`. The fresh complete command exited 0:
lint clean, 632 unit tests across 77 files, both production builds, and 952
browser passes with eight pre-existing mobile-game skips, two workers and no
retries. Earlier October 20 results are not substituted for this policy run.

The rebuilt custom check passed 24 views at 1440, 390 and 320 pixels, all thirty
map responses, twenty-nine internal destinations, image decoding, actual robots
and schema, no overflow and no ad markup. A seeded inventory retains all 373
known paths with final HTTP 200 and an empty queue. Its exact sitemap comparison
removes only the twenty-four pending map URLs: 141 entries become 117. Other
families' metadata is unchanged. The three revised descriptions naturally also
change the map hub's word count. The two existing automated content-length
warnings are unchanged; they are not a complete editorial diagnosis.

Inspected the unchanged Circuit Royal route through actual hub navigation in
the internal browser, plus desktop and narrow rebuilt map captures. The three
articles' full text and FAQ review remains documented in the October 20 lot.
No page or console errors appeared in the custom map check. Local expert
inventory requests log Stripe authentication failures; browser regression also
logs aborted responses. Do not claim clean server logs or live payment success.

No payment, marketplace, authentication, database or account configuration is
changed. After seeing the explicit twenty-four-map indexing impact, the user
authorized commit and push to main after verification. This release is limited
to Dorado, Blizzard World, Nepal and their publication safeguards. The next
Circuit Royal/Havana/Rialto test draft is excluded. Advertising stays disabled.

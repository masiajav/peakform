# Expert service presentation review

## Observed problems

- Directory, home and topic cards always advertised the Starter base price,
  even when Starter was disabled. The actual checkout adds a platform fee.
- A database error could look like a launch announcement or empty search.
- The directory's 320px minimum grid track overflowed a 320px viewport after
  page padding. Expert names and price rows also needed wrapping constraints.
- The directory promised a complete-match analysis and verified experts without
  establishing that every offer had that scope or verification.
- Profile Offer schema used Starter and InStock without considering disabled
  offers or the existing Stripe status check.
- Profile breadcrumbs and secondary details inherited #404040 on dark surfaces:
  1.78:1 contrast on #141414. This is a readability problem, not proof of the
  cause of Google's rejection.

## Changes and boundaries

`lowestStandardOffer` selects the lowest enabled standard tier and reuses the
existing checkout commission calculation, including its rounding. Legacy tier
flags have the same default as checkout. Invalid stored amounts are not rendered
as prices. Conditional one-time trials are not the universal advertised price.

The shared server-rendered price summary is used in the directory, home,
topic archive and profile. It labels the tier and included platform commission.
Paused/no-offer/trial-only states are distinct. It does not claim that a linked
Stripe account is ready to accept a payment.

Profile Offer schema is emitted only for an active standard offer and a confirmed
ready account. Its price is the same total shown visibly. Unknown account status
does not become an InStock claim. Existing checkout logic, connected-account
handling, authorisation, refunds, prices, database records and credentials are
unchanged. No financial transaction was attempted.

The directory distinguishes errors from genuine empty/filter states, offers a
full-page retry, explains offer-specific scope and links to the free VOD notebook.
Visible FAQ and FAQPage share the same answers. A main landmark is present in
the directory and detail page. Brighter secondary text is scoped to expert
pages and price summaries, rather than changing the site's global palette.

## Verification

- Lint is clean and all 485 unit tests pass, including 27 new fixture tests for
  amounts, disabled/paused offers, conditional trials, query errors, metadata,
  matching FAQ and ready/unknown/domestic/foreign account Offer schema.
- Isolated production build succeeds. The final E2E build also covers the
  subsequent native retry-link correction; no source is edited during builds.
- The first broad browser run passed 370 desktop/mobile tests covering public
  SEO, navigation, footer, private access and the VOD notebook. This predates
  the final scoped contrast change; the focused final run is recorded below.
- Internal browser inspection of the actual directory and Ivajpro profile
  confirms the same Starter total, with base price and commission still
  separated in the selector. No buying/login control was submitted.
- Local inventory after the service-content changes: 331 paths, 128 sitemap
  and indexable URLs, 203 noindex; no added or removed sitemap paths and no
  remaining crawl queue. All six public expert profiles remain accessible,
  noindex/follow and absent from the sitemap.
  Report: reports/adsense-rejection-2026-10-17/expert-directory-final.json.
- Screenshot evidence: reports/expert-directory; 1440, 390 and 320px layouts.
  Final viewport captures and a computed-text-contrast assertion are included.
- Final browser rerun after the contrast/landmark/retry-link corrections:
  all 28 desktop/mobile tests passed (directory, public navigation and private
  access). The final E2E production build succeeds. Directory paragraph and
  price-summary text meets the tested 4.5:1 contrast threshold on its surfaces.
  Reviewed the final 320px and 1440px viewport captures directly.
- Final combined verification with the counter batch passed lint, 490 unit
  tests and both isolated production builds. The full browser run recorded
  809 passed, eight existing mobile keyboard-game skips and three failures:
  two stale counter publication expectations and a game observation whose
  55-second bound exceeded the default 30-second test limit. Correcting those
  test-only issues and rebuilding passed all three targeted reruns. No
  application source changed after the full run; its original failure is not
  represented as a successful verify invocation.
- This is local work; no push or deployment is included. Temporary preview servers and the
  internal-browser review tab were stopped/closed after verification.

## Still outside this batch

The audit preview still reports Stripe authentication errors with local
configuration. Synthetic status tests are not proof that production accounts
or real payments work. Neither production configuration nor CMP/AdSense account
readiness is certified by these changes. No publisher settings, index approvals,
ads.txt, ad activation, deployment or new review request is changed here.

The full site quality objective remains open. These fixes remove concrete
misleading service and usability behaviour; they do not guarantee AdSense
approval and do not replace the pending editorial work on other public pages.

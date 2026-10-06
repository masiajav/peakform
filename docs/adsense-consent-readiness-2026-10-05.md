# Consent readiness: preparation, not activation

Checked on 5 October 2026. No AdSense account setting or production advertising
was changed. This document does not identify consent as the demonstrated cause
of the reported low-value-content rejection; content review remains separate.

## Current implementation

Ownership verification is a server-rendered account meta tag. The advertising
loader requires approval, CMP readiness, a valid publisher ID, an eligible
editorial destination and review mode disabled. Review mode blocks execution
even when the test environment sets the other prerequisites to true. The flag
is a guard, not a configured or certified consent platform.

Legal/Privacy remain without ad execution. Do not activate advertising simply
to make a consent dialog appear during this editorial review.

## Account work still needed

Google's Privacy & messaging European regulations messages are one certified
option; a currently certified third-party CMP is another. No provider has been
selected or verified for this account in this batch. Before enabling serving,
inspect the actual message, domain, privacy URL, languages, vendor disclosures
and rejection/preferences/revocation paths. Consent must not be inferred from
closing a notice or from a ready flag.

If Google's option is selected, its documented creation flow starts in
AdSense > Privacy & messaging > European regulations. Select the correct site,
review Spanish messaging and the privacy URL, and check the refusal and options
controls before publication. Account changes and publication are not completed
by writing this checklist.

## Production verification required before readiness

- Fresh visitor, accept, reject, manage options and return visit behave correctly.
- A visitor can subsequently change their preferences.
- Inspect actual consent signals and ad/network activity; a screenshot is not
  enough. Test required regions and failure/timeout paths.
- Privacy and data-processing disclosures match the installed provider.
- Legal/Privacy do not host consent-requiring tags or a Funding Choices message.
- Advertising remains excluded from private pages, searches, hubs, incomplete
  editorial pages and expert profiles.
- Auto Ads and placements remain off during review; no empty placeholders.

These checks are pending in the real account and production environment. Local
tests of suppression do not replace them or guarantee approval/legal compliance.

## Primary references

- Certified options and region requirements:
  https://support.google.com/adsense/answer/13554116?hl=en
- Message creation:
  https://support.google.com/adsense/answer/10960768?hl=en
- Message structure and changing choices:
  https://support.google.com/adsense/answer/10961068?hl=en
- Privacy-page tag exclusions:
  https://support.google.com/adsense/answer/10961370?hl=en
- Original, relevant content and account rejection:
  https://support.google.com/adsense/answer/81904?hl=en

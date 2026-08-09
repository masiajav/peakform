# Replaid Coach: Minimal PC Collector + Web Analysis Plan

## Executive Summary

Replaid Coach should use a **hybrid architecture**:

- A minimal Windows/Overwolf app installed on the player's PC.
- The main Replaid Lab web app as the analysis, history, SEO, and user value surface.

The installed app is only a trusted collector. It detects Overwatch, listens to official/approved events, builds a post-match payload, uploads it to the user's Replaid account, and opens the web report.

The web app is the product. It turns match data into feedback, trends, goals, and guide recommendations.

This replaces the previous idea of a full local coach app. It is safer, easier to iterate, better for traffic, and cleaner from a compliance point of view.

The first public version should be **free and useful**. Monetization is not part of the MVP and should not shape the initial user experience.

## Implementation Reset Decision

The existing coach overlay prototype should not be used as the foundation for this new approach.

Recommended action:

- Remove or archive the current live-overlay implementation.
- Start from a clean collector + web analysis architecture.
- Reuse only small, safe pieces if helpful:
  - event type definitions,
  - GEP adapter learnings,
  - compliance notes,
  - post-match analysis test ideas.
- Do not reuse the current live `OverlayPanel` as product UI.
- Do not keep live recommendation flows in the public app.

Reason:

- The current implementation was built around an overlay/tactical-coach mental model.
- The new product is a minimal collector plus web report system.
- Starting clean will reduce compliance risk, simplify the app, and avoid carrying live-coaching assumptions into v1.

Migration rule:

If a file/component exists mainly to show live tips during a match, delete it or move it to archived/internal research before starting the v1 implementation.

## Product Principle

**Replaid Collector captures. Replaid Web Coach analyzes.**

The collector should stay small and boring:

- No live coaching.
- No tactical overlay.
- No in-match swap advice.
- No in-match ultimate advice.
- No in-match threat callouts.
- No memory reading, packet sniffing, client hooks, OCR during match, or input automation.

The web app should own:

- Post-match analysis.
- Match history.
- Trends.
- Player goals.
- Guide recommendations.
- Shareable/SEO-friendly content surfaces where appropriate.

## Why This Is Better

### Benefits

- Drives traffic and retention to Replaid Lab.
- Keeps the installed app minimal and easier to audit.
- Reduces compliance risk by avoiding live tactical assistance.
- Lets analysis improve server-side without requiring collector updates.
- Gives users automation without requiring manual forms.
- Creates a strong account-based product loop.
- Builds trust before any monetization decision.

### Tradeoffs

- Requires account login and sync.
- Requires secure ingestion API.
- Requires clear privacy controls.
- Still depends on official Overwolf GEP availability.
- Some stats may be unavailable if Overwolf/Blizzard do not expose them.

## User Flow

1. User creates a Replaid Lab account.
2. User installs Replaid Collector on Windows.
3. User signs into the collector or links it with a one-time device code.
4. User launches Overwatch.
5. Collector detects match activity using official Overwolf APIs.
6. Collector records allowed event/stat data locally during the match.
7. Collector shows no live tactical advice.
8. Match ends.
9. Collector uploads normalized match data to Replaid Web.
10. Web creates the analysis report.
11. Collector opens the report URL or sends a desktop notification.
12. User reviews feedback on Replaid Lab.

## Compliance Position

Public v1 must be **post-match only**.

Do not ship live recommendations unless Overwolf/Blizzard explicitly approve them in writing.

Important context:

- Prior Overwatch third-party apps such as Visor/Pursuit were reportedly challenged because they affected competitive integrity during live matches.
- Using Overwolf does not automatically approve every live coaching feature.
- The public app must be designed so the installed collector never provides live tactical advice.

Allowed:

- Official Overwolf Game Events Provider data.
- Local event capture.
- Upload after match end.
- Web-based post-match feedback.
- Confidence/limitations when data is missing.

Blocked until approval:

- Live swap recommendations.
- Live ultimate recommendations.
- Live fight-state calls.
- Live enemy threat callouts.
- Any tactical prompt shown while the match is active.

Not allowed:

- Memory reading.
- Process hooking.
- Packet capture or network interception.
- Client modification.
- OCR during match to infer stats.
- Input automation.
- Claims about exact enemy cooldowns/ultimates unless officially exposed.

## Data Sources

### Primary Source: Overwolf GEP

Use only official Overwolf Game Events Provider features for Overwatch:

- `game_info`
- `match_info`
- `kill`
- `assist`
- `death`
- `roster`

These may support:

- player identity / local player flag,
- hero name,
- hero role,
- team,
- kills,
- deaths,
- assists,
- damage,
- healed,
- mitigated,
- roster details,
- match metadata.

The implementation must verify which fields are actually available in current Overwatch before promising them in product copy.

### Avoid As Core Sources

- Unofficial scraped APIs.
- Public profile scraping.
- OCR from live gameplay.
- User-filled forms as the primary flow.

Manual input can exist later as a fallback, but the core product should be automatic.

## Architecture

```text
Overwatch
  -> Overwolf GEP
    -> Replaid Collector
      -> Normalized Match Payload
        -> Replaid Web API
          -> Post-Match Analyzer
            -> Match Report Page
            -> Player History
            -> Trends / Goals / Guide Links
```

## Collector Responsibilities

The collector should do as little as possible:

- Detect Overwatch.
- Register official GEP features.
- Track match lifecycle.
- Normalize events/stats.
- Buffer current match locally.
- Upload completed match payload.
- Retry failed uploads.
- Open report URL after successful upload.
- Show simple status only:
  - connected,
  - collecting,
  - match uploaded,
  - upload failed,
  - data unavailable.

The collector should not:

- analyze complex performance,
- generate coaching advice,
- show tactical live UI,
- require a full dashboard,
- own long-term history beyond local retry queue.

## Web Responsibilities

The web app should do the useful work:

- Authenticate user.
- Receive match payloads.
- Store match history.
- Run analysis.
- Generate report pages.
- Show trends over time.
- Link insights to guides.
- Recommend replay review/coaching when patterns repeat.
- Provide privacy/export/delete controls.

Suggested routes:

- `/coach`
- `/coach/matches`
- `/coach/matches/[id]`
- `/coach/settings/devices`

## Authentication And Device Linking

Recommended v1 flow:

1. User logs into Replaid Web.
2. User opens `/coach/settings/devices`.
3. Web generates a short-lived device code.
4. Collector asks for the code.
5. Collector exchanges code for a device token.
6. Collector stores token locally.
7. Collector uploads future matches with that token.

Security requirements:

- Device token scoped only to match upload.
- Token revocable from web settings.
- No service role key in collector.
- Upload API validates user/device ownership.
- User can delete synced match data.

## Data Model

### Collector Payload

```ts
export interface CollectorMatchPayload {
  schemaVersion: 1;
  deviceId: string;
  localMatchId: string;
  startedAt: string;
  endedAt: string;
  providerStatus: "ready" | "limited" | "error";
  game: "overwatch";
  map?: string | null;
  mode?: string | null;
  localPlayer?: {
    battlenetTag?: string | null;
    playerName?: string | null;
    heroName?: string | null;
    heroRole?: string | null;
  };
  roster?: CollectorRosterPlayer[];
  totals?: {
    kills?: number | null;
    deaths?: number | null;
    assists?: number | null;
    damage?: number | null;
    healed?: number | null;
    mitigated?: number | null;
  };
  events: CollectorMatchEvent[];
  limitations: string[];
}
```

### Match Event

```ts
export interface CollectorMatchEvent {
  id: string;
  type: "kill" | "assist" | "death" | "roster" | "match_info" | "game_info";
  timestamp: string;
  actor?: string | null;
  target?: string | null;
  heroName?: string | null;
  team?: "ally" | "enemy" | "unknown";
  rawShapeVersion?: string;
}
```

### Web Analysis Output

```ts
export interface MatchAnalysisReport {
  id: string;
  userId: string;
  matchId: string;
  summary: string;
  strengths: string[];
  leaks: string[];
  trainingGoal: string;
  keyMoments: string[];
  metrics: {
    deathsPer10?: number | null;
    killParticipationSignals?: number | null;
    firstDeathSignals?: number | null;
    resetOpportunities?: number | null;
  };
  confidence: number;
  limitations: string[];
  guideLinks: Array<{
    title: string;
    href: string;
    reason: string;
  }>;
}
```

## Backend/API Plan

### New API Endpoints

- `POST /api/coach/device-code`
  - Creates short-lived linking code for logged-in user.

- `POST /api/coach/device-link`
  - Collector exchanges code for upload token.

- `POST /api/coach/matches`
  - Collector uploads completed match payload.

- `GET /api/coach/matches`
  - Web lists user's match history.

- `GET /api/coach/matches/[id]`
  - Web fetches one report.

- `DELETE /api/coach/matches/[id]`
  - User deletes a synced match.

### Database Tables

Suggested Supabase tables:

- `coach_devices`
  - user/device relationship.

- `coach_device_codes`
  - short-lived linking codes.

- `coach_matches`
  - raw normalized payload + metadata.

- `coach_match_reports`
  - generated analysis output.

RLS:

- Users can read/delete only their own matches.
- Collector upload token maps to one user/device.
- No public read access to private match data.

## Analysis Engine

The first web analyzer should be deterministic.

Inputs:

- Uploaded match payload.
- User role/hero if available.
- Roster/stat totals if available.
- Historical user trends if available.

Outputs:

- Match summary.
- Strengths.
- Leaks.
- Training goal.
- Confidence.
- Data limitations.
- Guide links.

Example:

```json
{
  "summary": "Your biggest leak was dying after fights were already down two teammates.",
  "strengths": ["You were involved in early winning fights when your team got first pick."],
  "leaks": ["You stayed too long in at least two likely lost fights."],
  "trainingGoal": "Next match, reset faster after losing two teammates without a trade.",
  "confidence": 0.74,
  "limitations": ["Ultimate usage was not available from official events."]
}
```

## Web UX

### `/coach`

Dashboard:

- Latest match report.
- Current training goal.
- Recent trend cards.
- Device connection status.
- CTA to install collector.

### `/coach/matches`

History:

- date/time,
- hero/role,
- map/mode,
- key metric,
- training goal,
- report link.

### `/coach/matches/[id]`

Report:

- scorecard summary,
- key insights,
- fight timeline,
- data confidence,
- limitations,
- recommended guides,
- optional future CTA areas kept out of v1.

### `/coach/settings/devices`

Device management:

- linked devices,
- create device code,
- revoke device,
- privacy/export/delete links.

## Collector UX

Small local app/window:

- Logged out: asks for device code.
- Connected: "Ready to collect post-match stats."
- In match: "Collecting match data. Live tips disabled."
- Match ended: "Uploading report..."
- Uploaded: "Report ready - Open in Replaid."
- Error: "Could not upload. Will retry."

No tactical advice appears during match.

## Roadmap

### Phase 0: Validate Data And Compliance

Goal: confirm what can be collected safely.

Tasks:

- Verify current Overwolf Overwatch GEP fields.
- Confirm whether damage/healed/mitigated are reliable.
- Confirm match lifecycle signals.
- Remove unnecessary permissions.
- Keep live tips disabled.
- Document data limitations.

Exit criteria:

- Collector can see official events in debug.
- Public collector UI shows no live coaching.
- We know which stats are reliable for v1.

### Phase 1: Local Collector Prototype

Goal: capture and normalize completed match payloads.

Tasks:

- Implement collector shell.
- Implement GEP adapter.
- Implement match timeline buffer.
- Implement completed match payload builder.
- Implement local retry queue.
- Add debug simulator.

Exit criteria:

- Simulated match produces valid payload.
- Real match produces payload when GEP works.
- Payload contains limitations when data is missing.

### Phase 2: Web Ingestion And Reports

Goal: sync matches to Replaid Web and show reports.

Tasks:

- Add device linking.
- Add upload endpoint.
- Add database tables/RLS.
- Add deterministic analyzer.
- Add `/coach/matches/[id]` report page.

Exit criteria:

- User links collector.
- Collector uploads completed match.
- Web displays generated report.

### Phase 3: History, Trends, And Retention

Goal: make the web product sticky.

Tasks:

- Match history.
- Trend detection.
- Rolling training goals.
- Per-hero/per-role summaries.
- Guide recommendations.
- Email/notification summary after sessions.

Exit criteria:

- User can see progression across sessions.
- Repeated leaks produce stronger goals.
- Reports link into Replaid content.

### Phase 4: Optional Growth And Monetization Exploration

Goal: explore monetization only after the free product is useful, trusted, and compliant.

Tasks:

- Measure retention and repeated usage of free reports.
- Identify which insights users actually revisit.
- Explore optional expert review or replay review entry points.
- Explore premium advanced trends only if they do not weaken the free product.
- Keep the default post-match report free.

Exit criteria:

- Free product has clear value without payment.
- Monetization does not require live coaching.
- Any paid feature is additive, not necessary for basic feedback.

### Phase 5: Live Features Only If Approved

Goal: revisit live coaching only with explicit approval.

Tasks:

- Prepare compliance packet.
- Ask Overwolf/Blizzard specifically about live tactical recommendations.
- If approved, ship smallest possible feature behind kill switch.
- If not approved, keep app post-match only.

Exit criteria:

- Written decision exists.
- No live feature ships without approval.

## Test Plan

### Collector Unit Tests

- GEP event normalization.
- Match start/end lifecycle.
- Payload builder.
- Missing data limitations.
- Retry queue behavior.
- Compliance gate: live tips disabled.

### Web Unit Tests

- Device code creation/expiration.
- Device link token validation.
- Match upload validation.
- Analyzer output from sample payloads.
- User ownership checks.
- Report generation.

### Integration Tests

- Device linking:
  - web creates code,
  - collector links,
  - token can upload.

- Match upload:
  - collector sends payload,
  - DB stores match,
  - report is generated,
  - user can view report.

- Privacy:
  - user cannot access another user's match.
  - revoked device cannot upload.

### Manual QA

- Install/open collector.
- Link account.
- Launch Overwatch.
- Confirm no live tips.
- Finish match.
- Confirm upload.
- Open report in web.
- Revoke device.
- Confirm collector can no longer upload.

### Suggested Commands

```bash
npm.cmd run overlay:typecheck
npm.cmd run overlay:test
npm.cmd run overlay:build
npm.cmd run lint
npm.cmd run build
git diff --check
```

Add backend/web tests once implemented:

```bash
npm.cmd run test
```

## Acceptance Criteria For MVP

- User can install collector.
- User can link collector to Replaid account.
- User does not fill in match forms.
- Collector captures official allowed data.
- Collector uploads only after match completion.
- Web generates post-match feedback.
- Web stores match history.
- Public collector never shows tactical live advice.
- User can revoke device and delete match data.
- Core post-match feedback is free.
- All tests pass.

## Open Questions

- Does current Overwatch GEP reliably expose match end?
- Are damage/healed/mitigated reliable in current Overwatch?
- Can local player identity be mapped safely and consistently?
- Should collector upload raw normalized events or only aggregate stats?
- Should debug mode be excluded from public builds?
- What is the exact Overwolf review path for this collector?

## Suggested First Implementation Ticket

Title: Implement free minimal collector-to-web post-match sync MVP

Scope:

- Create/restore collector package under `apps/replaid-coach-overlay`.
- Keep live tips disabled.
- Implement match payload builder.
- Add device linking API in Replaid Web.
- Add match upload API.
- Add Supabase tables/RLS for devices and matches.
- Add deterministic web analyzer.
- Add `/coach/matches/[id]` report page.
- Add tests for collector payload, upload auth, report generation, and compliance gate.
- Keep the full first report free.

Out of scope:

- Live coaching.
- OCR.
- Scraping.
- AI-generated advice.
- Premium monetization.
- Public release.

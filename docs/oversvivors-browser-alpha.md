# Oversvivors browser alpha

The public route `/arcade/oversvivors` embeds a free, unofficial Overwatch
survival fangame. It has five playable heroes, two arenas, ten-minute browser
runs, victory/defeat summaries, immediate retry and optional endless continuation.
It requires no account, payment or installation. Gameplay uses keyboard/mouse;
the public page is responsive but this release has no touch controls.

## Heroes and run loop

Tracer, Mei, Widowmaker, Cassidy and Junkrat have new directional fan-art sprites,
portraits and recognisable ability names throughout selection, combat and results.
Mei's Cryo-Freeze immobilises, protects and heals her and can be cancelled with
Shift. Her icicle volley reaches 360 pixels. Widowmaker's eight-second Infra-Sight
marks enemies and empowers sniper shots. The solo-survival kits are adaptations,
not exact copies of Overwatch combat rules.

The old Spectra/Glacier/Viper/Ranger/Scramble identifiers remain the scene and save
keys. Both old and canonical names resolve to the same records and medals. Source
details are in `docs/overwatch-heroes.md` in the game repository. The menus and
host page identify the game as unofficial and attribute the characters to Blizzard.

- WASD/arrows move; Shift and E use abilities; Q uses the kill-charged ultimate.
  Primary fire is automatic except Widowmaker, who aims and holds the left button.
- XP queues every earned upgrade choice. Cards show their ability family and
  unique/stack limits; 1/2/3 select and R rerolls eligible fresh alternatives.
  Level 6 and every fifth level offer an eligible legendary. Escape opens the
  pause menu and scrollable build journal.
- Optional control points open after 25 seconds, then every 90 seconds. Hold an
  uncontested point for eight seconds to earn healing, XP, ultimate charge and
  an XP magnet. Occupied expired points enter overtime. Recharging health packs
  and healing after five damage-free seconds provide additional sustain.
- There are 30 permanent local mastery medals: each hero/arena pair awards
  Survivor for victory, Control for three captures in one run and Boss Hunter
  for defeating both bosses in one run. Different medals can be earned in separate
  runs. They grant no combat power. Selection shows progress; results show new
  medals, records and the run's remaining goals.
- Normal enemy movement growth is capped; swift elites remain faster. Volatile
  elite deaths warn before exploding. Foundry points and packs avoid heat vents.
  Two bosses, ranged enemies, elites and arena hazards still require dodging.
- Losing focus pauses combat and requires manual resume. Fullscreen has a visible
  exit, preserves the session and also offers a separate-tab option.

## Integration and performance

The React route loads no engine until Play. The same-origin iframe loads static
HTML, WebAssembly and PCK files from `/games/oversvivors/`. Audio settings,
records, builds and medals use local IndexedDB; there is no server API, shared
leaderboard or account synchronisation. Clearing browser data clears progress.
No cross-origin isolation headers or service worker are required. Loader errors
are surfaced in the player.

Both arenas batch ground geometry into a cached coloured mesh, with coverage
calculated from the actual camera and viewport. Props, fog and collisions remain
independent. Enemy, XP-orb and floating-text caps bound runtime object counts.
Read-only browser observations expose run state and performance for verification.

## Rebuilding

Game source: `https://github.com/masiajav/2d-game`, branch `master`.
The packaged source revision, dirty flag, sizes and SHA-256 checksums are recorded
in `public/games/oversvivors/build.json`.

1. Install Godot 4.6.2 and its standard web export templates.
2. Run `tools/export_web.ps1` in the game repository, setting `GODOT4` if needed.
   It imports resources, loads all 63 runtime scripts and entry scenes in a real
   preflight, and rejects engine errors even when Godot exits zero.
3. Here, run `node scripts/sync-oversvivors.mjs C:\path\to\game-repo`.
4. Build and verify Replaid Lab. Deployment uses the checked-in static output and
   does not need Godot or new environment variables.

Debug scenes, build output and raw art sources are excluded from the PCK. Runtime
hero art uses 16-frame 64px-cell atlases per hero. Built-in ImageGen created the
fan art; exact prompts/raw sheets are preserved in the game repository under
`art-source/ow-canonical/README.md`. Cover provenance is in `assets/menu/README.md`.

## Verification

Start a production-mode site, then run:

```powershell
$env:ARCADE_BASE_URL = 'http://127.0.0.1:3088'
npx playwright test --config=playwright.arcade.config.ts
```

Ten checks cover the public page on desktop/mobile plus desktop gameplay:
five named heroes across both arenas, current animated assets, movement,
abilities, pause/build journal/resume, fullscreen exit, focus pause, persisted
audio, natural XP upgrades, early full health, health packs and control points.
Eight mobile gameplay cases are explicitly skipped because controls require
keyboard/mouse. Fourteen native Godot smoke scenes cover maps, combat, upgrades,
boss sequencing, run outcomes, medals/save compatibility, mesh coverage and 112
nonempty actor frames. The identity scene also fires Mei's real projectile at a
target 300 pixels away and checks damage and slow.

For a real-time long run, using only keyboard/mouse inputs and read-only state:

```powershell
$env:ARCADE_PLAYTEST_HERO = 'Tracer'
$env:ARCADE_PLAYTEST_MAP = 'Ruined Moonlit Forest'
node scripts/playtest-oversvivors.mjs
```

Reports and screenshots are saved under ignored `reports/oversvivors-playtests/`.
The script records errors, outcome, frame samples and exact medal persistence
after reload. It does not alter health, XP, enemy stats or time. The source
repository also includes a deterministic ten-minute native input simulation.
Deaths in that simulation are balance observations, not successful victories.

A complete browser run on the cached-mesh source `7e3a4b7` reached victory at
10:00, earned two medals and retained both after reload without console errors.
Median software-WebGL frame rate after 90 seconds rose from 21 to 36 FPS versus
the prior individual-ground-draw build on this test machine (10th percentile
18 to 27). These are software-rendered test measurements, not device benchmarks.
The direct-identity build also has native ten-minute Widowmaker victories in both
arenas. Release checks must match the current manifest; older run evidence does
not establish new mechanics automatically. Safari and physical mobile devices
have not been verified.

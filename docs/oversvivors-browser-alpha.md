# Oversvivors browser alpha

The public route `/arcade/oversvivors` embeds the single-threaded Godot game from
`/games/oversvivors/index.html`. It requires no login or server API. The WebAssembly
engine is loaded only after the user presses Play; the React route stays small.
The iframe and host share an origin so Godot can persist settings and records in
IndexedDB. No cross-origin isolation headers or service worker are required.

## Source and rebuilding

Game repository: `https://github.com/masiajav/2d-game`, branch
`codex/oversvivors-web`. The source revision and SHA-256 checksums for every
packaged file are in `public/games/oversvivors/build.json`.

1. Install Godot 4.6.2 and its standard web export templates.
2. Run `tools/export_web.ps1` in the game repository (set `GODOT4` if necessary).
3. In this repository run `node scripts/sync-oversvivors.mjs C:\path\to\game-repo`.
4. Rebuild and verify Replaid Lab normally.

The packager validates the WebAssembly signature and HTML shell, copies only the
required runtime files, copies the cover art, and records whether the game source
was dirty. Exported output is checked in here so deployment does not need Godot.
The game's build output, documentation, and debug scenes are excluded from its
resource pack.

The illustration was created with built-in ImageGen. The exact prompt and asset
provenance are in the game repository's `assets/menu/README.md`.

## Player behavior

- Five existing heroes and two maps; browser runs last ten minutes, then allow
  endless continuation. Desktop runs remain thirty minutes.
- Keyboard and mouse. The page is responsive, but this alpha has no touch controls.
- Escape pauses/resumes. Losing focus pauses combat and requires manual resume.
- Fullscreen requires a player gesture. An exit button remains visible inside
  the fullscreen player; returning to the page preserves the game session.
  The host also offers a separate-tab link.
- Runtime failure is displayed by the game loader and reflected in the host.
- Audio settings and run records are stored locally in the browser; there is no
  account synchronization or shared leaderboard.

## Verification

Start the site, then run:

```powershell
$env:ARCADE_BASE_URL = 'http://127.0.0.1:3083'
npx playwright test --config=playwright.arcade.config.ts
```

The dedicated config runs software WebGL in Chromium for reproducible CI checks.
It covers the responsive public page without downloading the engine, all five
hero selections across both maps, keyboard movement, ability input, pause/resume,
focus-loss pause and persisted audio settings. Mobile checks cover the public
page; gameplay explicitly requires desktop controls.

Additional native Godot scenes cover map collisions, signature upgrades, audio
during pause, boss sequencing and victory/endless/defeat records.

This is a playable alpha with a first visual pass: new menu art, portrait cards,
closer camera, unit shadows/player marker, a clearer HUD and quieter forest floor.
Ranger, Viper and Scramble now have four-direction walking atlases and new
selection portraits. All six regular enemies and both bosses have new walking
strips. The 80 new frames are checked for nonempty silhouettes, clipping and
idle/walk/facing transitions in the source game's art smoke test. Raw generated
art stays in the source repository and is excluded from the resource pack.
Late-run performance and Safari should still be checked on real devices before
treating this alpha as a finished release.

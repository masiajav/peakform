import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceRepo = path.resolve(process.argv[2] || '../oversvivors-web')
const source = path.join(sourceRepo, 'build', 'web')
const target = path.join(root, 'public', 'games', 'oversvivors')
const files = ['index.html', 'index.js', 'index.wasm', 'index.pck', 'index.audio.worklet.js', 'index.audio.position.worklet.js', 'index.icon.png', 'index.apple-touch-icon.png']
const wasm = await readFile(path.join(source, 'index.wasm'))
if (wasm.subarray(0, 4).toString('hex') !== '0061736d') throw new Error('Invalid WebAssembly build')
const html = await readFile(path.join(source, 'index.html'), 'utf8')
if (!html.includes("source: 'oversvivors'") || html.includes('$GODOT_')) throw new Error('Missing or unexpanded web shell')
const assets = {}
for (const name of files) {
  const data = await readFile(path.join(source, name))
  if (!data.length) throw new Error(`Empty asset: ${name}`)
  assets[name] = { bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') }
}
const revision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: sourceRepo, encoding: 'utf8' }).trim()
const dirty = execFileSync('git', ['status', '--porcelain'], { cwd: sourceRepo, encoding: 'utf8' }).trim().length > 0
await mkdir(target, { recursive: true })
for (const name of files) await copyFile(path.join(source, name), path.join(target, name))
await writeFile(path.join(target, 'build.json'), JSON.stringify({ name: 'Oversvivors', engine: '4.6.2', source: 'https://github.com/masiajav/2d-game', revision, dirty, assets }, null, 2) + '\n')
await mkdir(path.join(root, 'public', 'arcade', 'oversvivors'), { recursive: true })
await copyFile(path.join(sourceRepo, 'assets', 'menu', 'moonlit_ruins.webp'), path.join(root, 'public', 'arcade', 'oversvivors', 'cover.webp'))
console.log(`Packaged ${files.length} assets (${(Object.values(assets).reduce((sum, asset) => sum + asset.bytes, 0) / 1048576).toFixed(1)} MiB) from ${revision}${dirty ? ' + local changes' : ''}`)

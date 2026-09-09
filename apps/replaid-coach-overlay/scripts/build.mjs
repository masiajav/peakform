import { cp, mkdir, readFile, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = resolve(appRoot, '..', '..')
const sourceDir = join(appRoot, 'src')
const outputDir = join(appRoot, 'dist')

const requiredFiles = [
  'manifest.json',
  'background.html',
  'overlay.html',
  'debug.html',
  'background.js',
  'overlay.js',
  'debug.js',
  'styles.css',
  'icon.png',
]

await rm(outputDir, { force: true, recursive: true })
await mkdir(outputDir, { recursive: true })
await cp(sourceDir, outputDir, { recursive: true })
await mkdir(join(outputDir, 'assets'), { recursive: true })
await cp(join(repoRoot, 'public', 'heroes'), join(outputDir, 'assets', 'heroes'), {
  recursive: true,
})

const manifest = JSON.parse(await readFile(join(outputDir, 'manifest.json'), 'utf8'))
const windows = manifest?.data?.windows ?? {}

for (const file of requiredFiles) {
  await readFile(join(outputDir, file))
}

for (const [name, windowConfig] of Object.entries(windows)) {
  if (!windowConfig.file) {
    throw new Error(`Window "${name}" is missing a file entry in manifest.json`)
  }

  await readFile(join(outputDir, windowConfig.file))
}

console.log(`Built Replaid Coach Overlay at ${outputDir}`)

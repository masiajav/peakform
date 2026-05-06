import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const root = process.cwd()
const source = resolve(root, 'apps/replaid-coach-overlay/manifest.json')
const destination = resolve(root, 'apps/replaid-coach-overlay/dist/manifest.json')

await mkdir(dirname(destination), { recursive: true })
await copyFile(source, destination)

console.log('Copied Overwolf manifest to apps/replaid-coach-overlay/dist/manifest.json')

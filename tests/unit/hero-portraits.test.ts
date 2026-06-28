import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { HERO_PORTRAITS } from '@/lib/overwatch-hero-portraits'

describe('hero portrait inventory', () => {
  it('points every local portrait at a real public asset', () => {
    const missing = Object.entries(HERO_PORTRAITS)
      .filter(([, source]) => source.startsWith('/'))
      .filter(([, source]) => !fs.existsSync(path.join(process.cwd(), 'public', source)))
      .map(([slug]) => slug)

    expect(missing).toEqual([])
  })
})

import { afterEach, describe, expect, it, vi } from 'vitest'
import fs from 'node:fs'
import { editorialImageValid, safeDeadlockMapImage } from '@/lib/deadlock-map-contract'
import { checkEditorialMapMedia } from '../../scripts/check-editorial-map-media.mjs'
import diagrams from '../../content/deadlock/diagram-assets.json'

const asset = diagrams.assets[0]
const image = { src: asset.path, alt: 'Intercambio de Celeste desde cobertura', width: asset.width, height: asset.height }
afterEach(() => vi.unstubAllGlobals())

describe('registered editorial diagrams', () => {
  it('allows a hashed section diagram without widening map layer paths', () => {
    expect(editorialImageValid(image)).toBe(true)
    expect(safeDeadlockMapImage(image.src)).toBe(false)
    for (const src of ['https://example.com/image.svg', '/deadlock/diagrams/../../secret-123456abcdef.svg', '/deadlock/diagrams/celeste.svg']) {
      expect(editorialImageValid({ ...image, src })).toBe(false)
    }
  })

  it('requires both registration and identical public bytes', async () => {
    const fetch = vi.fn(async () => new Response(fs.readFileSync('public' + asset.path)))
    vi.stubGlobal('fetch', fetch)
    const article = { sections: [{ image }] }
    await expect(checkEditorialMapMedia(article, 'https://example.com')).resolves.toContain('full SHA-256')
    expect(fetch).toHaveBeenCalledTimes(1)
    await expect(checkEditorialMapMedia({ sections: [{ image: { ...image, src: '/deadlock/diagrams/unknown-123456abcdef.svg' } }] }, 'https://example.com')).rejects.toThrow('Unregistered')
    expect(fetch).toHaveBeenCalledTimes(1)
    fetch.mockImplementation(async () => new Response('changed public bytes'))
    await expect(checkEditorialMapMedia(article, 'https://example.com')).rejects.toThrow('Public editorial image differs')
  })
})

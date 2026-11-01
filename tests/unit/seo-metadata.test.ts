import { describe, expect, it } from 'vitest'
import { buildMetadata } from '@/lib/seo'

const page = { title: 'Guía de Overwatch', description: 'Una guía práctica.', path: '/guides/example' }

describe('shared page metadata', () => {
  it('leaves robots inherited so Next preserves global image and snippet preview permissions', () => {
    const metadata = buildMetadata(page)
    expect(Object.hasOwn(metadata, 'robots')).toBe(false)
    expect(metadata.alternates?.canonical).toBe('https://www.replaidlab.com/guides/example')
  })

  it('retains an explicit noindex instead of replacing it with global index settings', () => {
    const robots = { index: false, follow: true }
    expect(buildMetadata({ ...page, robots }).robots).toEqual(robots)
  })
})

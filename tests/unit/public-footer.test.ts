import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

const navigation = vi.hoisted(() => ({ path: '/' }))
vi.mock('next/navigation', () => ({ usePathname: () => navigation.path }))

import PublicFooter from '@/components/layout/PublicFooter'

describe('public footer boundaries', () => {
  it('does not render on private route roots or their descendants', () => {
    for (const prefix of ['/admin', '/apply', '/auth', '/dashboard', '/expert', '/login', '/orders', '/profile', '/stripe']) {
      for (const path of [prefix, `${prefix}/example`]) {
        navigation.path = path
        expect(renderToStaticMarkup(createElement(PublicFooter)), path).toBe('')
      }
    }
  })

  it('preserves public pages with similar names and editorial pages', () => {
    for (const path of ['/', '/experts', '/experts/coach', '/heroes/ana', '/counters/sombra', '/privacy', '/legal']) {
      navigation.path = path
      expect(renderToStaticMarkup(createElement(PublicFooter)), path).toContain('class="public-footer"')
    }
  })

  it('keeps every trust link and identifies its navigation', () => {
    navigation.path = '/'
    const html = renderToStaticMarkup(createElement(PublicFooter))
    expect(html).toContain('aria-label="Confianza y contacto"')
    for (const href of ['/about', '/contact', '/editorial-methodology', '/privacy', '/legal']) {
      expect(html).toContain(`href="${href}"`)
    }
    expect(html).not.toContain('adsbygoogle')
  })
})

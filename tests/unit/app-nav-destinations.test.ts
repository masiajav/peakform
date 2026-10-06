import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }))
vi.mock('@/lib/supabase/client', () => ({ createClient: () => ({ auth: { signOut: vi.fn() } }) }))
import AppNav from '@/components/layout/AppNav'

describe('app navigation destinations', () => {
  it('preserves public links and private panel destinations for every role', () => {
    for (const [role, panel] of [['user', '/dashboard'], ['expert', '/expert/dashboard'], ['admin', '/admin']] as const) {
      const html = renderToStaticMarkup(createElement(AppNav, { role, displayName: 'Test' }))
      for (const href of ['/', '/guides', '/pick-lab', '/team-comps', '/news', '/experts', panel]) {
        expect(html, `${role}: ${href}`).toContain(`href="${href}"`)
      }
      expect(html).toContain('Abrir menu de usuario')
      expect(html).not.toContain('adsbygoogle')
    }
  })
})

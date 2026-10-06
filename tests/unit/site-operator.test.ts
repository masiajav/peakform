import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))

import LegalPage from '@/app/legal/page'
import PrivacyPage from '@/app/privacy/page'
import { SITE_OPERATOR, TRUST_REVIEW_DATE } from '@/lib/site-operator'

describe('authorised public operator identification', () => {
  for (const [name, Component] of [['Legal', LegalPage], ['Privacidad', PrivacyPage]] as const) {
    it(`${name} shows the authorised legal identity, address and contact`, () => {
      const html = renderToStaticMarkup(createElement(Component))
      expect(html).toContain(SITE_OPERATOR.name)
      expect(html).toContain(SITE_OPERATOR.address)
      expect(html).toContain(SITE_OPERATOR.publicName)
      expect(html).toContain(`href="mailto:${SITE_OPERATOR.email}"`)
      expect(html).toContain(`dateTime="${TRUST_REVIEW_DATE}"`)
      expect(html).not.toMatch(/adsbygoogle|ins class="ad/)
    })
  }

  it('identifies the privacy controller without calling the site legally certified', () => {
    const html = renderToStaticMarkup(createElement(PrivacyPage))
    expect(html).toContain('Responsable del tratamiento')
    expect(html).toContain('certificada por Google e integrada con el TCF')
    expect(html).not.toMatch(/cumplimiento garantizado|100% legal|cuenta aprobada/)
  })
})

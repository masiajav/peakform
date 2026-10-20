import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it, vi } from 'vitest'

vi.mock('@/lib/supabase/server', () => ({ createClient: async () => ({ auth: { getUser: async () => ({ data: { user: null } }) } }) }))
vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))
import AnnouncementArticlePage from '@/components/content/AnnouncementArticlePage'

it.each(['NewsArticle', 'Article'] as const)('%s preserves imported heading text but only gives the page header an H1', async schemaType => {
  const article = {
    id: 'heading-fixture', slug: 'heading-fixture', title: 'Título del artículo',
    body: '# Título conservado del cuerpo\n\nTexto original.\n\n## Una sección\n\nOtro párrafo.',
    published: true, content_type: schemaType === 'Article' ? 'patch_note' : 'news',
    created_at: '2026-05-01T12:00:00Z', updated_at: '2026-05-01T12:00:00Z',
  }
  const html = renderToStaticMarkup(await AnnouncementArticlePage({ article, sectionLabel: 'Noticias', sectionHref: '/news', schemaType }))
  expect(html.match(/<h1\b/g)).toHaveLength(1)
  expect(html).toContain('<h2>Título conservado del cuerpo</h2>')
  expect(html).toContain('<h2>Una sección</h2>')
  expect(html).toContain('Texto original.')
  expect(html).toContain('Otro párrafo.')
  expect(html).toContain('class="announcement-meta" style="font-size:12px;color:var(--text2)')
  expect(html).toContain('<time dateTime="2026-05-01T12:00:00Z">')
  expect(html).not.toContain('adsbygoogle')
})

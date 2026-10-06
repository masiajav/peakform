import { reviewedGuideRevisions } from '../../src/lib/reviewed-guide-revisions'
import { editorialReviewTags } from '../../src/lib/editorial-review'

// A varied article fixture tests the gate, not the truth of a published patch.
const revision = reviewedGuideRevisions['mauga-guia-video-overwatch']
const sourceUrl = 'https://overwatch.blizzard.com/es-es/news/patch-notes/live/2026/09/#patch-2026-09-30'

const patch = {
  slug: 'notas-parche-overwatch-2026-09-30',
  title: 'Cambios de Overwatch: qué revisar en ranked',
  author: 'Replaid Lab',
  body: `${revision.body}\n\n[Nota oficial de Blizzard](${sourceUrl})`,
  excerpt: revision.quickAnswer,
  seo_title: 'Cambios de Overwatch: qué revisar en ranked',
  seo_description: revision.description,
  content_type: 'patch_note',
  source_url: sourceUrl,
  source_published_at: '2026-09-30T12:00:00.000Z',
  tags: ['editorial-review-complete'],
  published: true,
  created_at: '2026-09-30T12:00:00.000Z',
  updated_at: '2026-10-02T12:00:00.000Z',
}

export const reviewedPatchFixture = { ...patch, tags: editorialReviewTags(patch, 'admin-fixture', '2026-10-02T12:00:00.000Z') }
export const completeReviewChecks = { specific: true, accurate: true, links: true, visual: true }

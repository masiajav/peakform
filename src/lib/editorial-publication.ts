import { announcementPublicationIssues, guidePublicationIssues } from './indexing-policy'
import {
  editorialReviewTags, hasCurrentEditorialReview, isCompleteEditorialReview,
  retainedEditorialReviewTags, type EditorialReviewContent,
} from './editorial-review'

type PublicationContent = EditorialReviewContent & {
  published?: boolean | null
  created_at?: string | null
  updated_at?: string | null
}

export function prepareEditorialPublication(
  kind: 'guide' | 'announcement',
  current: PublicationContent | null,
  updated: PublicationContent,
  review: unknown,
  reviewerId: string,
  publishing: boolean,
) {
  const candidate = { ...updated, tags: retainedEditorialReviewTags(current, updated) }
  const issues: string[] = []
  if (publishing) issues.push(...(kind === 'guide' ? guidePublicationIssues(candidate) : announcementPublicationIssues(candidate)))
  if (review !== undefined) {
    if (!isCompleteEditorialReview(review)) issues.push('Completa las cuatro comprobaciones de la revisión editorial')
    else {
      issues.push(...(kind === 'guide' ? guidePublicationIssues(candidate) : announcementPublicationIssues(candidate)))
      if (!issues.length) candidate.tags = editorialReviewTags(candidate, reviewerId, new Date().toISOString())
    }
  }
  if (publishing && !hasCurrentEditorialReview(candidate)) issues.push('Abre la edición y aprueba la revisión de esta versión antes de publicarla')
  return { tags: candidate.tags, issues }
}

export function editorialInputIssues(body: unknown) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return ['El contenido enviado no es válido']
  const input = body as Record<string, unknown>
  const issues: string[] = []
  for (const [key, value] of Object.entries(input)) {
    if (key === 'editorial_review') continue
    if (key === 'published') {
      if (typeof value !== 'boolean') issues.push('El estado de publicación debe ser verdadero o falso')
    } else if (key === 'tags') {
      if (typeof value !== 'string' && value !== null && !(Array.isArray(value) && value.every(tag => typeof tag === 'string'))) issues.push('Las etiquetas deben ser texto o una lista de textos')
    } else if (value !== null && typeof value !== 'string') issues.push(`El campo ${key} debe ser texto`)
  }
  return issues
}

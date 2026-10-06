'use client'

import { useState } from 'react'
import { EDITORIAL_REVIEW_CHECKS, isCompleteEditorialReview, type EditorialReviewChecks } from '@/lib/editorial-review'

export function useEditorialReviewState(form: object, scope: string | null) {
  const snapshot = JSON.stringify([scope, form])
  const [review, setReview] = useState<{ snapshot: string; checks: Partial<EditorialReviewChecks> } | null>(null)
  const checks = review?.snapshot === snapshot ? review.checks : {}
  return {
    checks,
    approval: isCompleteEditorialReview(checks) ? checks : undefined,
    setCheck: (key: keyof EditorialReviewChecks, value: boolean) => setReview({ snapshot, checks: { ...checks, [key]: value } }),
    resetReview: () => setReview(null),
  }
}

export default function EditorialReviewChecklist({ checks, onChange }: {
  checks: Partial<EditorialReviewChecks>
  onChange: (key: keyof EditorialReviewChecks, value: boolean) => void
}) {
  return (
    <fieldset style={{ minWidth: 0, margin: 0, padding: 16, border: '1px solid var(--border)', display: 'grid', gap: 12 }}>
      <legend style={{ padding: '0 8px', color: 'var(--accent)' }}>Revisión de esta versión</legend>
      {EDITORIAL_REVIEW_CHECKS.map(check => (
        <label key={check.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, lineHeight: 1.6, color: 'var(--text2)' }}>
          <input type="checkbox" checked={checks[check.key] === true} onChange={event => onChange(check.key, event.target.checked)} style={{ width: 16, height: 16, flex: '0 0 16px', marginTop: 3, accentColor: 'var(--accent)' }} />
          <span>{check.label}</span>
        </label>
      ))}
    </fieldset>
  )
}

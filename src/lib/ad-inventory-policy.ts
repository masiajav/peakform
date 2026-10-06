// A route is only a possible placement, never an editorial approval. The
// server must explicitly pass its version-checked quality decision to a slot.
export function isPathAdEligible(path: string, editorialApproval = false) {
  if (!editorialApproval || path.includes('?') || path.includes('#')) return false
  return /^\/(?:guides|news|patch-notes)\/[a-z0-9-]+$/.test(path)
}

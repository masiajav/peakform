import { isPathAdEligible } from './ad-inventory-policy'
import { editorialVersion, type EditorialArticle } from './editorial-record'
import { editorialPublicationIssues } from './editorial-publication-checks'

// published must come from editorial-store, which checks evidence for the
// exact version. The candidate/preview object alone can never grant approval.
export function isReviewedGameArticleAdEligible(article: EditorialArticle, published: readonly EditorialArticle[], preview = false) {
  if (preview || !isPathAdEligible(article.path, true) || editorialPublicationIssues(article).length) return false
  return published.some(current => current.game === article.game && current.path === article.path
    && editorialVersion(current) === editorialVersion(article))
}

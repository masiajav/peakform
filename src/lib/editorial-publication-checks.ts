import type { EditorialArticle } from './editorial-record.ts'

function normalized(value: string) {
  return value.normalize('NFKC').replace(/\s+/g, ' ').trim().toLocaleLowerCase('es')
}

// New publication checks are intentionally separate from evidenceMatches:
// tightening future publication must not remove an existing public article.
export function editorialPublicationIssues(article: EditorialArticle): string[] {
  const issues: string[] = []
  const paragraphs = [article.intro, ...article.sections.flatMap(section => section.body)]
    .map(normalized).filter(Boolean)
  if (new Set(paragraphs).size !== paragraphs.length) issues.push('El artículo repite párrafos completos')
  const questions = (article.faq ?? []).map(faq => normalized(faq.question))
  const answers = (article.faq ?? []).map(faq => normalized(faq.answer))
  if (new Set(questions).size !== questions.length) issues.push('Hay preguntas frecuentes repetidas')
  if (new Set(answers).size !== answers.length) issues.push('Hay respuestas FAQ repetidas')
  if (answers.some(answer => paragraphs.includes(answer))) issues.push('Una respuesta FAQ copia un párrafo del artículo')
  return issues
}

export function editorialInternalLinks(article: EditorialArticle): string[] {
  const markdown = [article.intro, ...article.sections.flatMap(section => [...section.body, ...(section.bullets ?? []), ...(section.table?.rows.flat() ?? [])]), ...(article.faq ?? []).map(faq => faq.answer)]
  return [...new Set([
    ...(article.related ?? []).map(link => link.href),
    ...markdown.flatMap(text => [...text.matchAll(/\]\((\/[^\s)]+)\)/g)].map(match => match[1])),
  ])]
}

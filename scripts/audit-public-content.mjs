import { writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { mkdir } from 'node:fs/promises'

const baseUrl = (process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3001').replace(/\/$/, '')
const outputPath = process.env.AUDIT_OUTPUT || ''
const maximumPages = Number(process.env.AUDIT_MAX_PAGES || 400)

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`)
if (!sitemapResponse.ok) throw new Error(`No se pudo leer el sitemap: ${sitemapResponse.status}`)

const sitemapXml = await sitemapResponse.text()
const sitemapPaths = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map(match => toPath(match[1]))
  .filter(Boolean)

const queue = [...new Set(sitemapPaths)]
const seen = new Set()
const pages = []

while (queue.length && pages.length < maximumPages) {
  const path = queue.shift()
  if (!path || seen.has(path) || isPrivatePath(path)) continue
  seen.add(path)

  const response = await fetch(`${baseUrl}${path}`, { redirect: 'follow' })
  const html = await response.text()
  const mainHtml = firstMatch(html, /<main\b[^>]*>([\s\S]*?)<\/main>/i) || html
  const text = visibleText(mainHtml)
  const words = text.split(/\s+/).filter(Boolean)
  const title = decode(firstMatch(html, /<title>([\s\S]*?)<\/title>/i))
  const description = decode(metaContent(html, 'description'))
  const canonical = decode(firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i) || firstMatch(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i))
  const robots = decode(metaContent(html, 'robots'))
  const h1s = [...mainHtml.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(match => visibleText(match[1]))
  const images = [...mainHtml.matchAll(/<img\b[^>]*>/gi)].map(match => ({
    src: attr(match[0], 'src'),
    alt: attr(match[0], 'alt'),
  }))
  const links = [...mainHtml.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(match => decode(match[1]))
  const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  const jsonLdErrors = jsonLd.flatMap(match => {
    try { JSON.parse(decode(match[1])); return [] } catch { return ['JSON-LD no válido'] }
  })
  const internalLinks = links.filter(link => link.startsWith('/')).map(link => link.split('#')[0]).filter(Boolean)

  for (const link of internalLinks) {
    if (!seen.has(link) && !queue.includes(link) && !isPrivatePath(link)) queue.push(link)
  }

  const issues = [
    ...(!response.ok ? [`HTTP ${response.status}`] : []),
    ...(!title ? ['Sin title'] : []),
    ...(description.length < 80 ? ['Description demasiado corta'] : []),
    ...(!canonical ? ['Sin canonical'] : []),
    ...(h1s.length !== 1 ? [`H1: ${h1s.length}`] : []),
    ...(!robots.includes('noindex') && words.length < minimumUsefulWords(path) ? [`Indexable con menos de ${minimumUsefulWords(path)} palabras útiles`] : []),
    ...(images.some(image => !image.alt) ? ['Imágenes sin alt'] : []),
    ...jsonLdErrors,
    ...(/\b(?:title seo|meta description|keywords principales|página pilar|pagina pilar|indexable|sitemap|tráfico orgánico|trafico organico)\b/i.test(text) ? ['Texto interno visible'] : []),
    ...(/Ã|Â|â€|ï¿½/.test(text) ? ['Posible mojibake'] : []),
  ]

  pages.push({
    path,
    inSitemap: sitemapPaths.includes(path),
    status: response.status,
    title,
    description,
    canonical,
    robots: robots || 'index,follow (por defecto)',
    h1: h1s[0] || '',
    h1Count: h1s.length,
    wordCount: words.length,
    imageCount: images.length,
    internalLinkCount: new Set(internalLinks).size,
    jsonLdCount: jsonLd.length,
    issues,
    classification: classify({ path, response, robots, words, issues }),
    shingles: [...shingles(text)],
  })
}

const similarities = []
for (let left = 0; left < pages.length; left += 1) {
  for (let right = left + 1; right < pages.length; right += 1) {
    const score = jaccard(pages[left].shingles, pages[right].shingles)
    if (score >= 0.36) similarities.push({ left: pages[left].path, right: pages[right].path, score: Number(score.toFixed(3)) })
  }
}

for (const pair of similarities) {
  for (const path of [pair.left, pair.right]) {
    const page = pages.find(item => item.path === path)
    if (page && !page.issues.includes('Similitud editorial alta')) {
      page.issues.push('Similitud editorial alta')
      if (page.classification === 'terminada') page.classification = 'demasiado similar'
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  totals: {
    discovered: pages.length,
    sitemap: pages.filter(page => page.inSitemap).length,
    indexable: pages.filter(page => !page.robots.includes('noindex')).length,
    noindex: pages.filter(page => page.robots.includes('noindex')).length,
    withIssues: pages.filter(page => page.issues.length).length,
  },
  classifications: Object.fromEntries([...new Set(pages.map(page => page.classification))].map(name => [name, pages.filter(page => page.classification === name).length])),
  similarities: similarities.sort((a, b) => b.score - a.score),
  pages: pages.map(({ shingles: _, ...page }) => page),
}

const rendered = `${JSON.stringify(report, null, 2)}\n`
if (outputPath) {
  const target = resolve(outputPath)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, rendered, 'utf8')
  console.log(`Auditoría escrita en ${target}`)
}
console.log(JSON.stringify({ totals: report.totals, classifications: report.classifications, strongestSimilarities: report.similarities.slice(0, 10) }, null, 2))

if (pages.some(page => page.inSitemap && page.issues.some(issue => ['Sin title', 'Sin canonical', 'Texto interno visible', 'Posible mojibake'].includes(issue)))) process.exitCode = 1

function classify({ path, response, robots, words, issues }) {
  if (!response.ok || !issues.length && words.length < 80) return 'incompleta'
  if (issues.includes('Texto interno visible') || issues.includes('Posible mojibake')) return 'necesita revisión de lenguaje'
  if (robots.includes('noindex')) return words.length >= 650 ? 'pendiente de revisión' : 'demasiado genérica'
  if (words.length < minimumUsefulWords(path)) return 'incompleta'
  return issues.length ? 'necesita revisión' : 'terminada'
}

function shingles(text) {
  const tokens = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9ñ]+/g, ' ').trim().split(/\s+/)
  const values = new Set()
  for (let index = 0; index <= tokens.length - 7; index += 1) values.add(tokens.slice(index, index + 7).join(' '))
  return values
}

function jaccard(left, right) {
  if (!left.size || !right.size) return 0
  let shared = 0
  for (const value of left) if (right.has(value)) shared += 1
  return shared / (left.size + right.size - shared)
}

function visibleText(html) {
  return decode(html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim())
}

function metaContent(html, name) {
  return firstMatch(html, new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)`, 'i')) || firstMatch(html, new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, 'i'))
}

function firstMatch(value, regex) { return value.match(regex)?.[1] || '' }
function attr(tag, name) { return decode(firstMatch(tag, new RegExp(`${name}=["']([^"']*)`, 'i'))) }
function decode(value = '') { return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>') }
function toPath(value) { try { const url = new URL(decode(value)); return `${url.pathname}${url.search}` } catch { return '' } }
function isPrivatePath(path) { return /^\/(?:admin|apply|auth|dashboard|expert|login|orders|profile|stripe)(?:\/|$)/.test(path) }
function minimumUsefulWords(path) { return ['/about', '/contact', '/privacy', '/legal', '/editorial-methodology'].includes(path) ? 100 : 500 }

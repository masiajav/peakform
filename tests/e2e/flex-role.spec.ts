import { expect, test } from '@playwright/test'
import { flexRoleGuide as guide } from '../../src/lib/flex-role-guide'

test('flex offers a specific guide, usable pools and matching metadata without ads', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  expect((await page.goto(guide.path))?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toHaveText(guide.h1)
  await expect(page).toHaveTitle(new RegExp(guide.seoTitle))
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', guide.seoDescription)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com${guide.path}`)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
  await expect(page.locator('.seo-pillar-meta time')).toHaveAttribute('datetime', guide.schemaDate)
  await expect(page.locator('.seo-pillar-meta time')).toHaveText(guide.updatedAt)
  for (const section of guide.sections) {
    await expect(page.locator(`#${section.id} h2`)).toHaveText(section.title)
    for (const paragraph of section.paragraphs) await expect(page.locator(`#${section.id}`)).toContainText(paragraph)
  }
  await expect(page.locator('main')).not.toContainText('Todavía no hemos publicado')
  await expect(page.locator('main')).not.toContainText('No hay noticias etiquetadas')
  await expect(page.locator('main img')).toHaveCount(6)
  await expect.poll(() => page.locator('main img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
  for (const href of Array.from(new Set(await page.locator('main a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')!))))) {
    expect((await request.get(href)).status(), href).toBe(200)
  }
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
  const articles = schemas.filter(item => item['@type'] === 'Article')
  expect(articles).toHaveLength(1)
  expect(articles[0]).toMatchObject({ headline: guide.seoTitle, description: guide.seoDescription, dateModified: guide.schemaDate, author: { '@type': 'Organization', name: 'Replaid Lab' } })
  expect(articles[0]).not.toHaveProperty('datePublished')
  const faq = schemas.find(item => item['@type'] === 'FAQPage')
  expect(faq.mainEntity).toHaveLength(guide.faqs.length)
  for (const item of guide.faqs) {
    const details = page.locator('details').filter({ hasText: item.question })
    await details.locator('summary').click()
    await expect(details.locator('p')).toHaveText(item.answer)
    expect(faq.mainEntity).toContainEqual({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })
  }
  await expect(page.locator('ins.adsbygoogle, .ad-slot, #adsense-script')).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain('/roles/flex</loc>')
  expect(errors).toEqual([])
  await page.screenshot({ path: `reports/flex-role/flex-${test.info().project.name}.png`, fullPage: true })
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: `reports/flex-role/flex-${test.info().project.name}-viewport.png` })
  await page.getByRole('link', { name: 'Guía de Ana', exact: true }).click()
  await expect(page).toHaveURL(/\/heroes\/ana$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('Doctrine counter advice reflects the reviewed launch rather than the archived trial', async ({ page, request }) => {
  await page.goto('/counters/doctrine')
  await expect(page.getByRole('heading', { name: 'Los counters más útiles contra Doctrine', exact: true })).toBeVisible()
  await expect(page.locator('main')).toContainText('ya está disponible desde el 6 de octubre')
  await expect(page.locator('main')).not.toContainText('conserva el kit del trial de septiembre')
  await expect(page.locator('main')).toContainText('EJEMPLOS DE RANKED')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  expect(await (await request.get('/sitemap.xml')).text()).toContain('/counters/doctrine</loc>')
})

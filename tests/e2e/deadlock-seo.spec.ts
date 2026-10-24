import { expect, test } from '@playwright/test'

test('the landing identifies Deadlock and searches by an English hero name', async ({ page }) => {
  await page.goto('/deadlock')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Deadlock')
  await page.getByLabel('¿Con quién juegas?').fill('Haze')
  await page.getByRole('button', { name: 'Buscar héroe' }).click()
  await expect(page).toHaveURL(/\/deadlock\/heroes\?q=Haze$/)
  const result = page.locator('.dl-roster-card')
  await expect(result).toHaveCount(1)
  await expect(result).toContainText('Bruma')
  await result.click()
  await expect(page).toHaveURL(/\/deadlock\/heroes\/haze$/)
  await expect(page).toHaveTitle(/Bruma \(Haze\) en Deadlock/)
})

test('filtered searches are noindex with the clean section as canonical', async ({ page }) => {
  for (const query of ['Haze', 'nonexistent-hero', '', 'Haze&q=Bruma']) {
    await page.goto(`/deadlock/heroes?q=${query}`)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex.*follow/)
    await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute('content', /noindex.*follow/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/deadlock/heroes')
  }
  await page.goto('/deadlock/heroes')
  await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute('content', /noindex/)
  await expect(page.locator('.dl-roster-card')).toHaveCount(44)
})

test('structured breadcrumbs and collections agree with the visible hero list', async ({ page }) => {
  await page.goto('/deadlock/heroes')
  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(elements => elements.map(element => JSON.parse(element.textContent || '{}')))
  const crumbs = schemas.find(schema => schema['@type'] === 'BreadcrumbList')
  const collection = schemas.find(schema => schema['@type'] === 'CollectionPage')
  expect(crumbs.itemListElement.map((item: {name:string}) => item.name)).toEqual(['Replaid Lab', 'Deadlock', 'Héroes'])
  expect(collection.mainEntity.numberOfItems).toBe(44)
  expect(collection.mainEntity.itemListElement.map((item: {url:string}) => new URL(item.url).pathname)).toEqual(await page.locator('.dl-roster-card').evaluateAll(elements => elements.map(element => element.getAttribute('href'))))
  await page.locator('.dl-roster-card[href="/deadlock/heroes/haze"]').click()
  await expect(page).toHaveURL(/\/deadlock\/heroes\/haze$/)
  await expect(page.getByRole('heading', {level:1})).toContainText('Bruma')
  const articleSchemas = await page.locator('script[type="application/ld+json"]').evaluateAll(elements => elements.map(element => JSON.parse(element.textContent || '{}')))
  expect(articleSchemas.find(schema => schema['@type'] === 'BreadcrumbList').itemListElement.at(-1).item).toBe('https://www.replaidlab.com/deadlock/heroes/haze')
  expect(articleSchemas.find(schema => schema['@type'] === 'Article').mainEntityOfPage).toBe('https://www.replaidlab.com/deadlock/heroes/haze')
})

test('sharing uses a reachable Deadlock image with enough space for a large card', async ({ page }) => {
  await page.goto('/deadlock')
  const image = page.locator('meta[property="og:image"]')
  await expect(image).toHaveAttribute('content', /\/deadlock\/deadlock-social\.png$/)
  const dimensions = await page.evaluate(async () => {
    const url = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
    const image = new Image(); image.src = new URL(url!).pathname
    await image.decode(); return { width: image.naturalWidth, height: image.naturalHeight }
  })
  expect(dimensions).toEqual({ width: 1200, height: 630 })
})

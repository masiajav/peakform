import { expect, test, type APIRequestContext, type Page } from '@playwright/test'
import { reviewedAnaHero as ana } from '../../src/lib/reviewed-hero-ana'
import { reviewedKirikoHero as kiriko } from '../../src/lib/reviewed-hero-kiriko'
import { reviewedGenjiHero as genji } from '../../src/lib/reviewed-hero-genji'
import { reviewedReinhardtHero as reinhardt } from '../../src/lib/reviewed-hero-reinhardt'
import { reviewedDvaHero as dva } from '../../src/lib/reviewed-hero-dva'
import { reviewedWinstonHero as winston } from '../../src/lib/reviewed-hero-winston'
import { reviewedCassidyHero as cassidy } from '../../src/lib/reviewed-hero-cassidy'
import { reviewedTracerHero as tracer } from '../../src/lib/reviewed-hero-tracer'
import { reviewedZaryaHero as zarya } from '../../src/lib/reviewed-hero-zarya'
import { reviewedShionHero as shion } from '../../src/lib/reviewed-hero-shion'
import { reviewedDmonHero as dmon } from '../../src/lib/reviewed-hero-dmon'
import { reviewedDoctrineHero as doctrine } from '../../src/lib/reviewed-hero-doctrine'
import { PUBLIC_HERO_PAGE_SLUGS } from '../../src/lib/topic-links'

const publicSearchMetadata: Record<string, { title: string; description: string }> = {
  dva: {
    title: 'D.Va en Overwatch: habilidades y cómo jugar',
    description: 'Guía de D.Va en Overwatch: cómo usar Matrix, tomar alturas con Boosters y proteger a tus compañeros. Habilidades, counters y qué hacer sin el mech.',
  },
  shion: {
    title: 'Shion en Overwatch: habilidades, perks y cómo jugar',
    description: 'Cómo jugar a Shion en Overwatch: combina Execution, Joyride y Evade para preparar el flanco y salir con cobertura. Habilidades y perks Minor y Major.',
  },
  dmon: {
    title: 'D.Mon en Overwatch: counters, habilidades y perks',
    description: 'Conoce cómo responder a Ana, Zarya y Reaper con D.Mon en Overwatch. Guía de habilidades, perks y cruces con Beast sin agotar barrera y combustible.',
  },
  doctrine: {
    title: 'Doctrine en Overwatch: habilidades, perks y cómo jugar',
    description: 'Cómo jugar a Doctrine en Overwatch: elige qué potenciar con Imbuir, cura con Cetro eterno y apoya con Drones vigorizantes. Habilidades y perks Minor y Major.',
  },
}

const editorialHeroRevisions = {
  dmon: {
    hero: dmon,
    firstRevision: '2026-11-04',
    practiceHref: '/guides/como-revisar-cooldowns-overwatch',
    patchFacts: [/125\s*% de robo de salud/, /al menos 0,25 segundos desplegada/],
    faqFacts: [
      { question: '¿Propulsors permite subir como los Boosters de D.Va?', answer: /desplazarte en horizontal/ },
      { question: '¿D.Mon con D.Va es una composición de 5v5?', answer: /único puesto de Tank.*6v6/ },
    ],
  },
  doctrine: {
    hero: doctrine,
    firstRevision: '2026-11-08',
    practiceHref: '/guides/como-mejorar-como-support-overwatch',
    patchFacts: [/Impulso velado pasa de 8 a 10 segundos de recarga/, /Imbuir de 8 a 9/, /su sanación de 120 a 110/],
    faqFacts: [
      { question: '¿Sigue abierto el trial de Doctrine?', answer: /12 al 14 de septiembre de 2026 y ya terminó/ },
      { question: '¿El disparo imbuido atraviesa barreras?', answer: /no permite afirmar aquí que atraviese barreras/ },
    ],
  },
}

type EditorialHeroRevision = typeof editorialHeroRevisions[keyof typeof editorialHeroRevisions]

async function expectPublishedEditorialHero(
  page: Page,
  request: APIRequestContext,
  revision: EditorialHeroRevision,
) {
  const { hero, firstRevision, practiceHref, patchFacts, faqFacts } = revision
  const path = '/heroes/' + hero.slug
  const canonical = 'https://www.replaidlab.com' + path
  const origin = new URL(page.url()).origin
  const main = page.locator('main[data-editorial-version]')
  const heading = main.getByRole('heading', { level: 1 })
  const headline = await heading.innerText()
  expect(headline).toContain(hero.name)
  await expect(page).toHaveTitle(headline + ' - Replaid Lab')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')

  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
  const articles = schemas.filter(item => item['@type'] === 'Article')
  expect(articles).toHaveLength(1)
  const article = articles[0]
  const description = await page.locator('meta[name="description"]').getAttribute('content')
  expect(description).toBeTruthy()
  expect(article).toMatchObject({
    headline,
    description,
    url: canonical,
    mainEntityOfPage: canonical,
    datePublished: hero.publishedAt,
    dateModified: expect.any(String),
    author: { '@type': 'Organization', name: 'Replaid Lab' },
    publisher: { '@type': 'Organization', name: 'Replaid Lab' },
  })
  expect(Date.parse(article.dateModified)).toBeGreaterThanOrEqual(Date.parse(firstRevision))
  const visibleDate = new Date(article.dateModified).toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })
  await expect(main.locator('.game-meta')).toContainText('Actualizado el ' + visibleDate)
  const sitemap = await (await request.get('/sitemap.xml')).text()
  const entries = sitemap.match(/<url>[\s\S]*?<\/url>/g)?.filter(entry => entry.includes(`<loc>${canonical}</loc>`))
  expect(entries).toHaveLength(1)
  expect(entries?.[0]).toContain(`<lastmod>${new Date(article.dateModified).toISOString()}</lastmod>`)

  await expect(main.getByRole('navigation', { name: 'Ruta de navegación' }).getByRole('link', { name: 'Héroes', exact: true })).toHaveAttribute('href', '/heroes')
  const changes = main.locator('section').filter({ has: page.getByRole('heading', { name: 'Cambios del 3 de noviembre de 2026', exact: true }) })
  await expect(changes).toBeVisible()
  for (const fact of patchFacts) await expect(changes).toContainText(fact)
  const portrait = main.getByRole('img', { name: hero.name, exact: true })
  await expect(portrait).toBeVisible()
  await expect.poll(() => portrait.evaluate(element => {
    const image = element as HTMLImageElement
    return image.complete && image.naturalWidth > 0
  })).toBe(true)

  await expect(main.getByRole('heading', { name: 'Preguntas frecuentes', exact: true })).toBeVisible()
  for (const faq of faqFacts) {
    const question = main.locator('.game-faq').filter({ has: page.getByText(faq.question, { exact: true }) })
    await question.locator('summary').click()
    await expect(question.locator('p')).toBeVisible()
    await expect(question.locator('p')).toContainText(faq.answer)
  }
  const citations = await main.locator('.game-sources a').evaluateAll(links => links.map(link => link.getAttribute('href')))
  expect(citations.length).toBeGreaterThan(0)
  expect(article.citation).toEqual(citations)
  for (const href of new Set(await main.locator('a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')!)))) {
    expect((await request.get(href)).status(), href).toBe(200)
  }
  await expect(page.locator('ins.adsbygoogle, .ad-slot, #adsense-script, script[src*="adsbygoogle"]')).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)

  const screenshotPrefix = 'reports/reviewed-heroes/' + hero.slug + '-' + test.info().project.name
  await page.screenshot({ path: screenshotPrefix + '-full.png', fullPage: true })
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: screenshotPrefix + '-viewport.png' })
  const abilities = main.getByRole('navigation', { name: 'En este artículo' }).getByRole('link', { name: 'Cómo usar las habilidades', exact: true })
  const abilityHref = await abilities.getAttribute('href')
  expect(abilityHref).toMatch(/^#apartado-\d+$/)
  const abilityUrl = new URL(path + abilityHref, origin).href
  await abilities.click()
  await expect(page).toHaveURL(abilityUrl)
  await expect(main.getByRole('heading', { name: 'Cómo usar las habilidades', exact: true })).toBeInViewport()

  const related = main.getByRole('navigation', { name: 'Guías relacionadas' })
  if (hero.abilityKit) {
    await related.locator(`a[href="${hero.abilityKit.src}"]`).click()
    await expect(page).toHaveURL(new URL(hero.abilityKit.src, origin).href)
    await expect.poll(() => page.locator('img').evaluate(element => {
      const image = element as HTMLImageElement
      return { loaded: image.complete, width: image.naturalWidth, height: image.naturalHeight }
    })).toEqual({ loaded: true, width: hero.abilityKit.width, height: hero.abilityKit.height })
    await page.goBack()
    await expect(page).toHaveURL(abilityUrl)
  }
  await related.locator(`a[href="${practiceHref}"]`).click()
  await expect(page).toHaveURL(new URL(practiceHref, origin).href)
  await expect(page.locator('h1')).toBeVisible()
  await page.goBack()
  await expect(page).toHaveURL(abilityUrl)
  await expect(heading).toHaveText(headline)
}

for (const hero of [ana, kiriko, genji, reinhardt, dva, winston, cassidy, tracer, zarya, shion, dmon, doctrine]) {
  test(hero.name + ' presents the individually revised article and matching dates, schema and FAQ', async ({ page, request }) => {
    const path = '/heroes/' + hero.slug
    const canonical = 'https://www.replaidlab.com' + path
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      const isVideoPermissionWarning = message.text() === 'Permissions policy violation: compute-pressure is not allowed in this document.'
        && /^https:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\//.test(message.location().url)
      if (message.type() === 'error' && !isVideoPermissionWarning) errors.push(message.text())
    })
    expect((await page.goto(path))?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    const origin = new URL(page.url()).origin
    const editorialRevision = editorialHeroRevisions[hero.slug as keyof typeof editorialHeroRevisions]
    if (editorialRevision && await page.locator('main[data-editorial-version]').count()) {
      await expectPublishedEditorialHero(page, request, editorialRevision)
      expect(errors).toEqual([])
      return
    }
    await expect(page.locator('h1')).toHaveText(hero.h1)
    const searchMetadata = publicSearchMetadata[hero.slug]
    await expect(page).toHaveTitle((searchMetadata?.title ?? hero.seoTitle) + ' - Replaid Lab')
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', searchMetadata?.description ?? hero.seoDescription)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', hero.analysisStatus === 'trial' ? 'noindex, follow' : 'index, follow')
    await expect(page.locator('main time').nth(0)).toHaveAttribute('datetime', hero.publishedAt!)
    await expect(page.locator('main time').nth(1)).toHaveAttribute('datetime', hero.schemaDate!)
    await expect(page.locator('main time').nth(1)).toHaveText(hero.updatedAt)
    const main = page.locator('main')
    for (const paragraph of [...hero.intro, ...hero.headerTips!, ...hero.rankedPlan, ...hero.mistakes, ...hero.counterplay, ...hero.vodReview, ...hero.checklist]) await expect(main).toContainText(paragraph)
    for (const item of [...hero.quickAnswers!, ...hero.facts, ...hero.sections, ...hero.abilities, ...hero.perks!, ...hero.counters, ...hero.compositions, ...(hero.balanceReview || [])]) {
      await expect(main).toContainText(item.title)
      await expect(main).toContainText(item.body)
    }
    await expect(main).toContainText(hero.perksIntro!)
    if (hero.conclusion) await expect(main).toContainText(hero.conclusion)
    if (hero.video) {
      await expect(main.locator('iframe')).toHaveCount(1)
      await expect(main.locator('iframe')).toHaveAttribute('title', hero.video.title)
      await expect(main.locator('iframe')).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/' + hero.video.id)
      await expect(main.locator('#video')).toContainText(hero.video.description)
      await expect(main.locator('#video')).toContainText(hero.video.channel!)
      await expect(main.locator('#video a')).toHaveAttribute('href', 'https://youtu.be/' + hero.video.id)
      await page.getByRole('link', { name: 'Balance', exact: true }).click()
      await expect(page).toHaveURL(/#balance$/)
      await expect(page.locator('#balance h2')).toBeInViewport()
      await page.getByRole('link', { name: 'Vídeo', exact: true }).click()
      await expect(page).toHaveURL(/#video$/)
      await expect(page.locator('#video h2')).toBeInViewport()
      const dimensions = await main.locator('.guide-video-frame').evaluate(element => {
        const frame = element.getBoundingClientRect()
        const iframe = element.querySelector('iframe')!.getBoundingClientRect()
        return { frameRatio: frame.width / frame.height, widthDiff: frame.width - iframe.width, heightDiff: frame.height - iframe.height }
      })
      expect(dimensions.frameRatio).toBeCloseTo(16 / 9, 1)
      expect(dimensions.widthDiff).toBeLessThanOrEqual(3)
      expect(dimensions.heightDiff).toBeLessThanOrEqual(3)
    }
    await expect(main).not.toContainText('Para jugar contra Ana: respeta')
    await expect(main.locator('img')).toHaveCount(hero.abilityKit ? 2 : 1)
    if (hero.abilityKit) {
      await page.getByRole('link', { name: 'Habilidades', exact: true }).click()
      await expect(page).toHaveURL(/#habilidades$/)
      const kit = main.locator('#habilidades figure')
      await expect(kit.locator('img')).toHaveAttribute('alt', hero.abilityKit.alt)
      await expect(kit.locator('img')).toHaveAttribute('width', String(hero.abilityKit.width))
      await expect(kit.locator('img')).toHaveAttribute('height', String(hero.abilityKit.height))
      await expect(kit.locator('figcaption')).toContainText(hero.abilityKit.caption)
      await kit.locator('a').click()
      await expect(page).toHaveURL(new URL(hero.abilityKit.src, origin).href)
      await expect.poll(() => page.locator('img').evaluate(image => ({ loaded: (image as HTMLImageElement).complete, width: (image as HTMLImageElement).naturalWidth, height: (image as HTMLImageElement).naturalHeight }))).toEqual({ loaded: true, width: hero.abilityKit.width, height: hero.abilityKit.height })
      await page.goBack()
      await expect(page).toHaveURL(new URL(path + '#habilidades', origin).href)
      await expect(page.locator('h1')).toHaveText(hero.h1)
    }
    await expect.poll(() => main.locator('img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
    const articles = schemas.filter(item => item['@type'] === 'Article')
    expect(articles).toHaveLength(1)
    expect(articles[0]).toMatchObject({ headline: hero.seoTitle, description: hero.seoDescription, datePublished: hero.publishedAt, dateModified: hero.schemaDate, author: { '@type': 'Organization', name: 'Replaid Lab' }, publisher: { '@type': 'Organization', name: 'Replaid Lab' } })
    const breadcrumbs = schemas.find(item => item['@type'] === 'BreadcrumbList')
    expect(breadcrumbs.itemListElement[1]).toMatchObject({ name: hero.name, item: canonical })
    const faq = schemas.find(item => item['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(hero.faqs.length)
    for (const item of hero.faqs) {
      const details = main.locator('details').filter({ hasText: item.question })
      await details.locator('summary').click()
      await expect(details.locator('p')).toHaveText(item.answer)
      expect(faq.mainEntity).toContainEqual({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })
    }
    await expect(page.locator('ins.adsbygoogle, .ad-slot, #adsense-script, script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    for (const href of Array.from(new Set(await main.locator('a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')!))))) expect((await request.get(href)).status(), href).toBe(200)
    const sitemap = await (await request.get('/sitemap.xml')).text()
    const entry = sitemap.match(/<url>[\s\S]*?<\/url>/g)?.find(item => item.includes('<loc>' + canonical + '</loc>'))
    if (hero.analysisStatus === 'trial') {
      expect(entry).toBeUndefined()
      await expect(main).toContainText('Amenazas que conviene comprobar al lanzamiento')
      await expect(main).toContainText('Habilidades de Doctrine mostradas en el trial')
      await expect(main).not.toContainText('GUÍA DE RANKED')
      await expect(main).not.toContainText('Presión de Talon')
    } else {
      expect(entry).toContain('<lastmod>' + hero.schemaDate + 'T00:00:00.000Z</lastmod>')
    }
    expect(errors).toEqual([])
    const screenshotPrefix = 'reports/reviewed-heroes/' + hero.slug + '-' + test.info().project.name
    await page.screenshot({ path: screenshotPrefix + '-full.png', fullPage: true })
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({ path: screenshotPrefix + '-viewport.png' })
    await page.getByRole('link', { name: 'Habilidades', exact: true }).click()
    await expect(page).toHaveURL(/#habilidades$/)
    await expect(page.locator('#habilidades h2')).toBeInViewport()
    await page.getByRole('link', { name: hero.links[0].label, exact: true }).click()
    await expect(page).toHaveURL(new URL(hero.links[0].href, origin).href)
    await expect(page.locator('h1')).toBeVisible()
    await page.goBack()
    await expect(page).toHaveURL(new URL(path + '#habilidades', origin).href)
    await expect(page.locator('h1')).toHaveText(hero.h1)
  })
}

for (const slug of PUBLIC_HERO_PAGE_SLUGS.filter(slug => !['ana', 'kiriko', 'genji', 'reinhardt', 'dva', 'winston', 'cassidy', 'tracer', 'zarya', 'shion', 'dmon', 'doctrine'].includes(slug))) {
  test(slug + ' remains accessible and linked without publishing the trial kit for search', async ({ page, request }) => {
    await page.goto('/heroes')
    await expect(page.locator('main a[href="/heroes/' + slug + '"]').first()).toBeAttached()
    expect((await page.goto('/heroes/' + slug))?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('main')).not.toBeEmpty()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    await expect(page.locator('ins.adsbygoogle, .ad-slot, #adsense-script')).toHaveCount(0)
    expect(await (await request.get('/sitemap.xml')).text()).not.toContain('/heroes/' + slug + '</loc>')
  })
}

import { expect, test } from '@playwright/test'
import { rankedHeroGuides } from '../../src/lib/ranked-hero-guides'
import redirects from '../../src/lib/legacy-hero-guide-redirects.json'
import { hasCurrentStaticEditorialReview } from '../../src/lib/static-editorial-review'

test('all consolidated hero paths redirect directly, including the older Ana alias', async ({ request }) => {
  for (const [source,target] of Object.entries(redirects)) {
    const response = await request.get(`/guides/${source}`, {maxRedirects:0})
    expect(response.status(),source).toBe(308)
    expect(response.headers().location,source).toBe(`/guides/${target}`)
    const destination = await request.get(`/guides/${target}`,{maxRedirects:0})
    expect(destination.status(),target).toBe(200)
  }
})

for (const guide of rankedHeroGuides.filter(item=>item.video)) {
  test(`${guide.heroSlug} keeps the original video, attribution and practical context in one ranked article`, async ({ page,request }) => {
    const errors: string[] = []
    const externalWarnings: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      const externalPermissionWarning = message.text() === 'Permissions policy violation: compute-pressure is not allowed in this document.'
        && /^https:\/\/www\.youtube-nocookie\.com\/s\/player\//.test(message.location().url)
      if (externalPermissionWarning) externalWarnings.push(message.text())
      else if(message.type()==='error') errors.push(message.text())
    })
    const path = `/guides/${guide.slug}`
    expect((await page.goto(path))?.status()).toBe(200)
    const video = guide.video!
    const section = page.locator('.ranked-guide-video')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(section.getByRole('heading',{level:2})).toBeVisible()
    await expect(section).toContainText(video.context)
    await expect(section.locator('iframe')).toHaveAttribute('src',`https://www.youtube-nocookie.com/embed/${video.id}`)
    await expect(section.locator('iframe')).toHaveAttribute('title',video.title)
    await expect(section.locator('iframe')).not.toHaveAttribute('allow',/compute-pressure/)
    await section.locator('iframe').scrollIntoViewIfNeeded()
    await expect(page.frameLocator('iframe').getByRole('button',{name:/^(?:Reproducir vídeo|Play(?: video)?)$/i})).toBeVisible({timeout:20000})
    await expect(section.locator('.guide-video-meta')).toContainText(video.channel)
    for(const point of video.practice) {
      await expect(section).toContainText(point.body)
      await expect(section.locator(`a[href="https://www.youtube.com/watch?v=${video.id}&t=${point.seconds}s"]`)).toHaveCount(1)
    }
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value=>JSON.parse(value))
    expect(schemas.find(item=>item['@type']==='VideoObject')).toMatchObject({name:video.title,description:video.context,uploadDate:video.publishedAt,author:{name:video.channel}})
    expect(schemas.find(item=>item['@type']==='VideoObject')).not.toHaveProperty('contentUrl')
    expect(schemas.find(item=>item['@type']==='BlogPosting')).toMatchObject({datePublished:'2026-06-21',dateModified:'2026-10-20',author:{name:'Replaid Lab'}})
    const approved = hasCurrentStaticEditorialReview(path,guide)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content',`${approved?'index':'noindex'}, follow`)
    await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false)
    const sitemap = await (await request.get('/sitemap.xml')).text()
    for(const source of Object.keys(redirects)) expect(sitemap).not.toContain(`/guides/${source}</loc>`)
    expect(errors).toEqual([])
    for (const warning of externalWarnings) test.info().annotations.push({type:'YouTube permission warning',description:warning})
  })
}

test('the preserved Winston video is explicitly humor, not the ranked tutorial', async ({ page }) => {
  await page.goto('/guides/winston-guia-video-overwatch')
  await expect(page.locator('h1')).toContainText('es humor')
  await expect(page.locator('.guide-video-context')).toContainText('no lo tomes como una guía')
  await expect(page.locator('.guide-video-meta')).not.toContainText('VÍDEO GUÍA')
  await expect(page.locator('iframe')).toHaveAttribute('src','https://www.youtube-nocookie.com/embed/QduGAeDb1tM')
  await page.locator('.guide-body a[href="/guides/como-jugar-winston-ranked-overwatch"]').first().click()
  await expect(page.locator('h1')).toContainText('Cómo jugar Winston')
  await expect(page.locator('.ranked-guide-video')).toHaveCount(0)
})

for (const [slug,id,channel,date] of [
  ['tracer-presion-lateral-sin-morir-gratis','SRGJ7xZoZZ0','Awkward','2025-09-01'],
  ['zarya-guia-overwatch-burbujas-energia','ssWnCfolWa0','LeonDrummer','2022-10-14'],
]) {
  test(`${slug} preserves the actual source video and its original date`, async ({ page }) => {
    expect((await page.goto(`/guides/${slug}`))?.status()).toBe(200)
    await expect(page.locator('iframe')).toHaveAttribute('src',`https://www.youtube-nocookie.com/embed/${id}`)
    await expect(page.locator('.guide-video-meta')).toContainText(channel)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, follow')
    const schemas=(await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value=>JSON.parse(value))
    expect(schemas.find(item=>item['@type']==='VideoObject')).toMatchObject({uploadDate:date,publisher:{name:channel}})
    expect(schemas.find(item=>item['@type']==='BlogPosting')).toMatchObject({dateModified:'2026-10-20',author:{name:'Replaid Lab'}})
    await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
  })
}

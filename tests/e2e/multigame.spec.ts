import {test,expect} from '@playwright/test'

test('a slow game selection shows loading until its content arrives', async ({page}) => {
 await page.goto('/')
 let releaseRequest!: () => void
 const destinationReady = new Promise<void>(resolve => { releaseRequest = resolve })
 await page.route(url => url.pathname === '/deadlock', async route => {
   await destinationReady
   await route.continue()
 })
 const navigation = page.locator('main').getByRole('link', {name: /Entrar en Deadlock/}).click()
 try {
   await expect(page.locator('[data-page-loading]')).toBeVisible()
 } finally {
   releaseRequest()
   await navigation
 }
 await expect(page.getByRole('heading', {level: 1})).toContainText('Deadlock')
 await expect(page.locator('[data-page-loading]')).toHaveCount(0)
})

test('the homepage takes readers directly to the tools used in both examples', async ({page, request}) => {
 const response = await page.goto('/')
 expect(response?.status()).toBe(200)
 const practice = page.getByRole('region', {name: 'Qué practicar en tu próxima partida'})
 await expect(practice.getByRole('heading', {level: 3})).toHaveCount(2)
 for (const link of await practice.getByRole('link').all()) {
   const href = (await link.getAttribute('href'))!
   expect((await request.get(href.split('#')[0])).status(), href).toBe(200)
 }
 await practice.getByRole('link', {name: 'Abrir el cuaderno de repeticiones'}).click()
 await expect(page.locator('#cuaderno-vod')).toBeVisible()
})

test('choose a game, explore Deadlock and return to Overwatch',async({page})=>{
 await page.goto('/');await expect(page.getByRole('heading',{level:1})).toContainText('Tu juego');await page.locator('main a[href="/deadlock"]').click();await expect(page).toHaveURL(/\/deadlock$/)
 await page.getByRole('link',{name:'Encuentra tu héroe'}).click();await expect(page).toHaveURL(/\/deadlock\/heroes$/);await page.getByLabel('Buscar en héroes').fill('Haze');await page.getByRole('button',{name:'Buscar',exact:true}).click();await expect(page.locator('.game-content-card')).toHaveCount(1)
 await page.locator('.game-content-card').click();await expect(page.getByRole('heading',{level:1})).toContainText('Bruma');await page.getByRole('link',{name:'Build de Bruma',exact:true}).click();await expect(page.getByRole('heading',{level:1})).toContainText('Build de Bruma')
 await page.locator('.game-switch').getByRole('link',{name:'Overwatch',exact:true}).click();await expect(page).toHaveURL(/\/overwatch$/);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',/\/overwatch$/)
})
test('Deadlock sections and sitemap contain the reviewed launch',async({request})=>{
 for(const route of ['heroes','guides','counters','builds','news','patch-notes']){const r=await request.get(`/deadlock/${route}`);expect(r.ok()).toBeTruthy();expect(await r.text()).not.toContain('application error')}
 const xml=await(await request.get('/sitemap.xml')).text();expect(xml).toContain('/deadlock/heroes/haze');expect(xml).toContain('/overwatch');expect(xml).not.toContain('/editorial-preview/')
 const missing = await request.get('/deadlock/heroes/this-hero-does-not-exist')
 expect(missing.status()).toBe(404)
 expect(await missing.text()).toContain('NO HEMOS ENCONTRADO ESTA PÁGINA')
 const preview = await request.get('/editorial-preview/seed-0')
 expect(preview.status()).toBe(404)
 const hero = await request.get('/deadlock/heroes/haze')
 const main = (await hero.text()).match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
 expect(main).toMatch(/<h1>[^<]*Bruma/i)
})

test('find a released hero by English alias and open its published guide',async({page})=>{
 await page.goto('/deadlock/heroes?q=Violet')
 const guide = page.locator('.game-content-card[href="/deadlock/heroes/violet"]')
 await expect(guide).toHaveCount(1)
 await expect(guide).toContainText('Violeta')
 await expect(page.getByText('No hay artículos que coincidan.',{exact:false})).toHaveCount(0)
 await guide.click()
 await expect(page.getByRole('heading',{level:1})).toContainText('Violeta')
 await expect(page.locator('main[data-editorial-version]')).toBeVisible()
 await expect(page.locator('.deadlock-ability-card')).toHaveCount(4)
})

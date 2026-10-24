import {test,expect} from '@playwright/test'
test('choose a game, explore Deadlock and return to Overwatch',async({page})=>{
 await page.goto('/');await expect(page.getByRole('heading',{level:1})).toContainText('Tu juego');await page.locator('main a[href="/deadlock"]').click();await expect(page).toHaveURL(/\/deadlock$/)
 await page.getByRole('link',{name:'Encuentra tu héroe'}).click();await page.getByLabel('Buscar en héroes').fill('Haze');await page.getByRole('button',{name:'Buscar',exact:true}).click();await expect(page.locator('.game-content-card')).toHaveCount(1)
 await page.locator('.game-content-card').click();await expect(page.getByRole('heading',{level:1})).toContainText('Bruma');await page.getByRole('link',{name:'Build de Bruma',exact:true}).click();await expect(page.getByRole('heading',{level:1})).toContainText('Build de Bruma')
 await page.locator('.game-switch').getByRole('link',{name:'Overwatch',exact:true}).click();await expect(page).toHaveURL(/\/overwatch$/);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',/\/overwatch$/)
})
test('Deadlock sections and sitemap contain the reviewed launch',async({request})=>{
 for(const route of ['heroes','guides','counters','builds','news','patch-notes']){const r=await request.get(`/deadlock/${route}`);expect(r.ok()).toBeTruthy();expect(await r.text()).not.toContain('application error')}
 const xml=await(await request.get('/sitemap.xml')).text();expect(xml).toContain('/deadlock/heroes/haze');expect(xml).toContain('/overwatch');expect(xml).not.toContain('/editorial-preview/')
 const bad=await request.get('/deadlock/heroes/ana');expect(bad.status()).toBe(404);const preview=await request.get('/editorial-preview/seed-0');expect(preview.status()).toBe(404)
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

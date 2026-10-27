import {expect,test} from '@playwright/test'
// Runs against an actual review-mode deployment, independently of slot fixtures.
test('review mode retains verification without executing ads across article templates',async({page})=>{
 const requests:string[]=[];
 page.on('request',request=>{if(/googlesyndication\.com|doubleclick\.net/.test(request.url()))requests.push(request.url())});
 for(const route of ['/guides/como-mejorar-en-overwatch','/guides/como-jugar-ana-ranked-overwatch','/guides/dive-composicion-overwatch-entrar-sin-regalar','/news/nueva-navegacion-y-herramientas-para-mejorar-en-overwatch','/deadlock/builds/haze','/deadlock/builds/abrams','/deadlock/guides/economia-almas']){
  expect((await page.goto(route))?.status(),route).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('meta[name="google-adsense-account"]')).toHaveAttribute('content',/^ca-pub-\d{16}$/);
  await expect(page.locator('.ad-slot,ins.adsbygoogle,#adsense-script')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route).toBe(true);
 }
 expect(requests).toEqual([]);
 await page.screenshot({path:'reports/adsense-2026-10-27/review-'+test.info().project.name+'.png',fullPage:true});
});

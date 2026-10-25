import {expect,test} from '@playwright/test'
const path='/deadlock/maps/la-ciudad'
const region=(page:import('@playwright/test').Page)=>page.getByRole('region',{name:'Explorar el mapa de Deadlock',exact:true})
async function pointGesture(page:import('@playwright/test').Page,point:import('@playwright/test').Locator,mobile:boolean,click=false){
 await region(page).getByRole('region',{name:'Plano ampliable; usa las flechas para desplazarte',exact:true}).scrollIntoViewIfNeeded()
 await point.scrollIntoViewIfNeeded()
 const box=await point.boundingBox();expect(box).not.toBeNull()
 const x=box!.x+box!.width/2,y=box!.y+box!.height/2
 if(mobile)await page.touchscreen.tap(x,y);else if(click)await page.mouse.click(x,y);else await page.mouse.move(x,y)
}

test('hover explains a marker, remains readable and Escape dismisses it',async({page,isMobile})=>{
 await page.goto(path);const atlas=region(page),point=atlas.locator('[data-map-point="guardians-0"]'),tip=atlas.getByRole('tooltip')
 await pointGesture(page,point,isMobile)
 await expect(tip).toBeVisible();await expect(tip).toContainText('Guardián');await expect(tip).toContainText('primera defensa')
 await expect(point).toHaveAttribute('aria-describedby',await tip.getAttribute('id') as string)
 if(!isMobile){await tip.hover();await page.waitForTimeout(250);await expect(tip).toBeVisible()}
 await page.keyboard.press('Escape');await expect(tip).toHaveCount(0)
 if(!isMobile){await pointGesture(page,point,false);await expect(tip).toBeVisible();await page.keyboard.press('Escape');const box=await point.boundingBox();await page.mouse.move(box!.x+box!.width/2+1,box!.y+box!.height/2);await expect(tip).toHaveCount(0)}
})

test('touch or click pins the explanation and supports close and outside dismissal',async({page,isMobile})=>{
 await page.goto(path);const atlas=region(page),point=atlas.locator('[data-map-point="midboss-0"]'),tip=atlas.getByRole('tooltip')
 await pointGesture(page,point,isMobile,true)
 await expect(atlas.locator('[data-map-bubble]')).toHaveAttribute('data-pinned','true');await expect(tip).toContainText('Rejuvenecedor')
 await atlas.getByRole('button',{name:'Cerrar explicación del mapa'}).click();await expect(tip).toHaveCount(0)
 await pointGesture(page,point,isMobile,true)
 await expect(tip).toBeVisible();await atlas.getByRole('heading',{name:'La ciudad de Deadlock',exact:true}).click();await expect(tip).toHaveCount(0)
})

test('keyboard traverses points without hundreds of tab stops',async({page})=>{
 await page.goto(path);const atlas=region(page),points=atlas.locator('[data-map-group="guardians"] [data-map-point]'),tip=atlas.getByRole('tooltip')
 await points.first().focus();await expect(tip).toBeVisible()
 await points.first().press('ArrowRight');await expect(points.nth(1)).toBeFocused();await expect(atlas.locator('[data-map-group="guardians"] [tabindex="0"]')).toHaveCount(1)
 await points.nth(1).press('End');await expect(points.last()).toBeFocused();await expect(tip).toContainText('Zafiro')
 await page.keyboard.press('Escape');await expect(tip).toHaveCount(0);await expect(points.last()).toBeFocused()
 await page.keyboard.press('Tab');await expect(atlas.locator('[data-map-point="walkers-0"]')).toBeFocused()
 await page.keyboard.press('Enter');await expect(atlas.locator('[data-map-bubble]')).toHaveAttribute('data-pinned','true')
})

test('every legend group explains its points and bubbles stay within the map',async({page,isMobile})=>{
 test.setTimeout(60000)
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto(path);const atlas=region(page),select=atlas.getByLabel('Qué significa cada elemento',{exact:true}),tip=atlas.getByRole('tooltip')
 const options=await select.locator('option').evaluateAll(elements=>elements.map(e=>({id:(e as HTMLOptionElement).value,label:e.textContent!})))
 expect(options.length).toBeGreaterThan(20)
 for(const option of options){
  await atlas.getByRole('button',{name:'Limpiar',exact:true}).click();await select.selectOption(option.id)
  const point=atlas.locator(`[data-map-group="${option.id}"] [data-map-point]`).first()
  await pointGesture(page,point,isMobile)
  await expect(tip).toBeVisible();await expect(tip).toContainText(option.label)
  expect((await tip.innerText()).length).toBeGreaterThan(option.label.length+20)
  const bubble=await atlas.locator('[data-map-bubble]').boundingBox(),frame=await atlas.locator('[data-map-stage]').boundingBox()
  expect(bubble!.x).toBeGreaterThanOrEqual(frame!.x-1);expect(bubble!.x+bubble!.width).toBeLessThanOrEqual(frame!.x+frame!.width+1)
  expect(bubble!.y).toBeGreaterThanOrEqual(frame!.y-1);expect(bubble!.y+bubble!.height).toBeLessThanOrEqual(frame!.y+frame!.height+1)
 }
 expect(errors).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true)
})

test('zoomed and rotated markers and lanes keep upright explanations',async({page,isMobile})=>{
 await page.goto(path);const atlas=region(page),tip=atlas.getByRole('tooltip')
 await atlas.getByRole('button',{name:'Zafiro abajo',exact:true}).click()
 await atlas.getByRole('button',{name:'Acercar mapa',exact:true}).click();await atlas.getByRole('button',{name:'Acercar mapa',exact:true}).click()
 const base=atlas.locator('[data-map-point="bases-0"]');await pointGesture(page,base,isMobile)
 await expect(tip).toBeVisible();await expect(tip).toContainText('Base · Ámbar');expect(await tip.evaluate(e=>getComputedStyle(e).transform)).toBe('none')
 await atlas.getByRole('button',{name:'Túneles centrales',exact:true}).click();await expect(tip).toHaveCount(0)
 await atlas.getByRole('button',{name:'Restablecer mapa',exact:true}).click()
 const lane=atlas.getByRole('button',{name:'Tirolina de Broadway',exact:true});await lane.focus();await expect(tip).toContainText('línea discontinua')
 await atlas.getByLabel('Mostrar las tres tirolinas',{exact:true}).uncheck();await expect(tip).toHaveCount(0)
})

test('the pointer and touch explain all three zipline routes',async({page,isMobile})=>{
 await page.goto(path);const atlas=region(page),tip=atlas.getByRole('tooltip'),viewport=atlas.getByRole('region',{name:'Plano ampliable; usa las flechas para desplazarte',exact:true})
 await atlas.getByRole('button',{name:'Limpiar',exact:true}).click()
 for(const name of ['Broadway','Greenwich','York']){
  await viewport.scrollIntoViewIfNeeded()
  const lane=atlas.locator(`[data-map-lane="${name}"]`),point=await lane.evaluate(el=>{const points=(el as SVGPolylineElement).points,p=points.getItem(Math.floor(points.length*.3));return{x:p.x/1000,y:p.y/1000}}),rect=await atlas.locator('[data-map-canvas]').boundingBox()
  const x=rect!.x+point.x*rect!.width,y=rect!.y+point.y*rect!.height
  if(isMobile)await page.touchscreen.tap(x,y);else await page.mouse.move(x,y)
  await expect(tip).toContainText(`Tirolina de ${name}`);await expect(tip).toContainText('línea discontinua')
  await atlas.getByRole('button',{name:'Cerrar explicación del mapa'}).click()
 }
})

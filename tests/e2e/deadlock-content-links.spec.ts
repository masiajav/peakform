import {expect,test} from '@playwright/test'

test('hero, build and counters links appear before the long guide',async({page})=>{
  await page.goto('/deadlock/heroes/haze')
  const links=page.getByRole('navigation',{name:'Sigue aprendiendo',exact:true})
  await expect(links.getByRole('link',{name:'Build de Bruma',exact:true})).toHaveAttribute('href','/deadlock/builds/haze')
  await expect(links.getByRole('link',{name:'Counters de Bruma',exact:true})).toHaveAttribute('href','/deadlock/counters/haze')
  expect(await links.evaluate(el=>Boolean(el.compareDocumentPosition(document.querySelector('.deadlock-ability-kit')!)&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true)
  await links.getByRole('link',{name:'Counters de Bruma',exact:true}).click()
  await expect(page).toHaveURL(/\/deadlock\/counters\/haze$/)
  const mo=page.locator('.game-data-table').getByRole('link',{name:'Mo y Krill',exact:true})
  await expect(mo).toHaveAttribute('href','/deadlock/heroes/mo-krill')
  await mo.click()
  await expect(page.getByRole('heading',{level:1})).toContainText('Mo y Krill')
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true)
})

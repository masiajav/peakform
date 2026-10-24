import {expect, test} from '@playwright/test'
import {previewSignature} from '../../src/lib/editorial-preview-token'

function buildPath() {
  const id = process.env.BUILD_IMPORT_PREVIEW_ID
  if (!id) return '/deadlock/builds/abrams'
  const expires = String(Date.now() + 300000)
  return `/editorial-preview/${id}?expires=${expires}&token=${previewSignature(id, expires, process.env.SUPABASE_SERVICE_ROLE_KEY ?? '')}`
}

test('copies the real build number and shows the matching hero and purchases', async ({page, context}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto(buildPath())
  const card = page.getByRole('region', {name:'Build importable de Abrams'})
  await expect(card).toBeVisible()
  await expect(card.getByLabel('Código de build', {exact:true})).toHaveValue('830770')
  await expect(card.locator('img')).toHaveCount(4)
  await page.waitForFunction(() => [...document.querySelectorAll('[data-build-code] img')].every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))
  await card.getByRole('button', {name:'Copiar código', exact:true}).click()
  await expect(card.getByRole('status')).toHaveText('Código copiado. Ya puedes pegarlo en el juego.')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('830770')
  await expect(page.locator('.game-sources')).toHaveCount(0)
  const structured = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(structured.join('')).not.toMatch(/lockcodex|deadlockbible|deadlock-api|"citation"/i)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
})

test('keeps the code selectable when clipboard access is denied', async ({page}) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {configurable:true,value:{writeText:async () => {throw new DOMException('Denied', 'NotAllowedError')}}}))
  await page.goto(buildPath())
  const card = page.getByRole('region', {name:'Build importable de Abrams'})
  await card.getByRole('button', {name:'Copiar código', exact:true}).click()
  await expect(card.getByRole('status')).toHaveText('Seleccionado. Copia el número con el menú de tu dispositivo.')
  const input = card.getByLabel('Código de build', {exact:true})
  await expect(input).toBeFocused()
  expect(await input.evaluate(element => (element as HTMLInputElement).value.slice((element as HTMLInputElement).selectionStart!, (element as HTMLInputElement).selectionEnd!))).toBe('830770')
})

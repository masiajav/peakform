import { execFile } from 'node:child_process'
import { createServer } from 'node:http'
import { promisify } from 'node:util'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

const execFileAsync = promisify(execFile)

test('linked binary resources are checked separately, never parsed as editorial pages', async () => {
  let resourceInSitemap = false
  let resourceStatus = 200
  const server = createServer((request, response) => {
    const origin = `http://${request.headers.host}`
    if (request.url === '/sitemap.xml') {
      response.writeHead(200, { 'Content-Type': 'application/xml' }).end(`<urlset><url><loc>${origin}/about</loc></url>${resourceInSitemap ? `<url><loc>${origin}/heroes/kit.png</loc></url>` : ''}</urlset>`)
      return
    }
    if (request.url === '/heroes/kit.png') {
      response.writeHead(resourceStatus, { 'Content-Type': 'image/png' }).end(Buffer.from([137, 80, 78, 71, 0, 255]))
      return
    }
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(`<html><head><title>Replaid Lab</title><meta name="description" content="Una explicación de Replaid Lab con información para visitantes y acceso al kit del personaje."><link rel="canonical" href="${origin}/about"></head><body><main><h1>Replaid Lab</h1><p>${'Información útil. '.repeat(60)}</p><a href="/heroes/kit.png">Ver kit ampliado</a></main></body></html>`)
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  try {
    const address = server.address()
    if (!address || typeof address === 'string') throw new Error('No audit fixture port')
    const { stdout } = await execFileAsync(process.execPath, ['scripts/audit-public-content.mjs'], {
      env: { ...process.env, AUDIT_BASE_URL: `http://127.0.0.1:${address.port}`, AUDIT_OUTPUT: '', AUDIT_SEED_FILE: '', AUDIT_BUILD_MANIFEST: '' },
    })
    const report = JSON.parse(stdout)
    expect(report.totals).toMatchObject({ discovered: 1, sitemap: 1, withIssues: 0 })
    expect(report.resources).toEqual([{ path: '/heroes/kit.png', status: 200, contentType: 'image/png', inSitemap: false, issues: [] }])
    const run = () => execFileAsync(process.execPath, ['scripts/audit-public-content.mjs'], {
      env: { ...process.env, AUDIT_BASE_URL: `http://127.0.0.1:${address.port}`, AUDIT_OUTPUT: '', AUDIT_SEED_FILE: '', AUDIT_BUILD_MANIFEST: '' },
    })
    resourceInSitemap = true
    await expect(run()).rejects.toMatchObject({ code: 1, stdout: expect.stringContaining('Recurso no HTML en sitemap de paginas') })
    resourceInSitemap = false
    resourceStatus = 404
    await expect(run()).rejects.toMatchObject({ code: 1, stdout: expect.stringContaining('HTTP 404') })
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
  }
})

test('build inventory finds unlinked articles, excludes private routes and reports unfinished coverage', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'replaid-audit-build-'))
  const requests: string[] = []
  const server = createServer((request, response) => {
    requests.push(request.url || '')
    const origin = `http://${request.headers.host}`
    if (request.url === '/sitemap.xml') {
      response.end(`<urlset><url><loc>${origin}/about</loc></url></urlset>`)
      return
    }
    response.end(`<html><head><title>Información de Overwatch</title><meta name="description" content="Consejos de Overwatch para elegir una ruta, coordinar el equipo y revisar decisiones de partida con ejemplos concretos."><meta name="robots" content="noindex,follow"><link rel="canonical" href="${origin}${request.url?.split('?')[0]}"></head><body><main><h1>Contenido de Overwatch</h1><p>${'Consejos de partida. '.repeat(60)}</p><a href="//external.example/path">Externo</a></main></body></html>`)
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  try {
    const address = server.address()
    if (!address || typeof address === 'string') throw new Error('No audit fixture port')
    const manifest = join(temp, 'prerender-manifest.json')
    const seed = join(temp, 'seed.json')
    const output = join(temp, 'audit.json')
    await writeFile(manifest, JSON.stringify({ routes: {
      '/counters/unlinked': { dataRoute: '/counters/unlinked.rsc' },
      '/team-comps/unlinked': { dataRoute: '/team-comps/unlinked.rsc' },
      '/dashboard': { dataRoute: '/dashboard.rsc' },
      '/api/checkout': { dataRoute: '/api/checkout.rsc' },
      '/robots.txt': { dataRoute: null },
      '/_not-found': { dataRoute: '/_not-found.rsc' },
    }, dynamicRoutes: { '/guides/[slug]': {}, '/dashboard/[id]': {} } }))
    await writeFile(seed, JSON.stringify(['/guides?hero=ana', '/experts/complete-profile']))
    const env = { ...process.env, AUDIT_BASE_URL: `http://127.0.0.1:${address.port}`, AUDIT_OUTPUT: output, AUDIT_SEED_FILE: seed, AUDIT_BUILD_MANIFEST: manifest }
    await execFileAsync(process.execPath, ['scripts/audit-public-content.mjs'], { env: { ...env, AUDIT_MAX_PAGES: '10' } })
    const report = JSON.parse(await readFile(output, 'utf8'))
    expect(report.pages).toHaveLength(5)
    expect(report.coverage).toMatchObject({ buildRoutes: 2, remainingPaths: [], dynamicRoutes: ['/guides/[slug]'] })
    expect(report.pages.find((page: { path: string }) => page.path === '/counters/unlinked')).toMatchObject({ fromBuildManifest: true, inSitemap: false, kind: 'article', classification: 'demasiado genérica' })
    expect(report.pages.find((page: { path: string }) => page.path === '/guides?hero=ana')).toMatchObject({ kind: 'filter', classification: 'filtro pendiente de revisión funcional' })
    expect(report.pages.find((page: { path: string }) => page.path === '/experts/complete-profile')).toMatchObject({ kind: 'profile', classification: 'perfil pendiente de revisión' })
    expect(requests).not.toContain('/dashboard')
    expect(requests).not.toContain('/api/checkout')
    expect(requests).not.toContain('/_not-found')
    expect(requests).not.toContain('//external.example/path')
    await execFileAsync(process.execPath, ['scripts/audit-public-content.mjs'], { env: { ...env, AUDIT_MAX_PAGES: '2' } })
    const limited = JSON.parse(await readFile(output, 'utf8'))
    expect(limited.coverage.remainingPaths).toEqual(['/experts/complete-profile', '/counters/unlinked', '/team-comps/unlinked'])
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
    await rm(temp, { recursive: true, force: true })
  }
})

test('the public audit detects repeated content and never certifies editorial quality', async () => {
  const shared = Array.from({ length: 110 }, (_, index) =>
    `Decisión ${index}: juega cerca de cobertura y conserva una salida para responder a la presión rival.`,
  ).join(' ')
  const unrelated = Array.from({ length: 110 }, (_, index) =>
    `Ejemplo ${index}: compara las rutas del mapa y coordina el avance antes de disputar el objetivo.`,
  ).join(' ')

  const articles: Record<string, string> = {
    '/original': `<h1>Guía original</h1><p>${shared}</p>`,
    '/duplicate': `<h1>Otra guía</h1><p>${shared}</p><p>Una conclusión diferente.</p>`,
    '/distinct': `<h1>Rutas del mapa</h1><p>${unrelated}</p>`,
    '/original?sort=newest': `<h1>Guía original</h1><p>${shared}</p>`,
    '/article': `<h1>Rutas del mapa</h1><p>${unrelated}</p>`,
    '/hub': `<h1>Guías disponibles</h1><article><p>${unrelated}</p></article>`,
  }
  const server = createServer((request, response) => {
    const origin = `http://${request.headers.host}`
    if (request.url === '/sitemap.xml') {
      response.end(`<urlset>${Object.keys(articles).filter(path => path !== '/article').map(path => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`)
      return
    }
    const content = articles[request.url || '']
    if (!content) {
      response.writeHead(404).end('Not found')
      return
    }
    const canonical = ['/article', '/hub'].includes(request.url || '') ? '/distinct' : request.url?.split('?')[0]
    const tag = request.url === '/article' ? 'article' : request.url === '/hub' ? 'section' : 'main'
    response.end(`<html><head><title>Guía práctica de Overwatch</title><meta name="description" content="Consejos para tomar mejores decisiones durante tus partidas de Overwatch, con ejemplos concretos de posicionamiento y recursos."><link rel="canonical" href="${origin}${canonical}"></head><body><header><nav>${shared}<a href="/article">Otra guía</a></nav></header><${tag}>${content}</${tag}><footer>${shared}</footer></body></html>`)
  })

  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  try {
    const address = server.address()
    if (!address || typeof address === 'string') throw new Error('No audit fixture port')
    const { stdout } = await execFileAsync(process.execPath, ['scripts/audit-public-content.mjs'], {
      env: {
        ...process.env,
        AUDIT_BASE_URL: `http://127.0.0.1:${address.port}`,
        AUDIT_OUTPUT: '',
        AUDIT_MAX_PAGES: '6',
        AUDIT_SEED_FILE: '',
        AUDIT_BUILD_MANIFEST: '',
      },
    })
    const report = JSON.parse(stdout)
    expect(report.totals.discovered).toBe(6)
    expect(report.totals.sitemap).toBe(5)
    expect(report.strongestSimilarities).toHaveLength(2)
    expect(report.strongestSimilarities[0]).toMatchObject({ left: '/original', right: '/duplicate' })
    expect(report.strongestSimilarities[0].score).toBeGreaterThan(0.95)
    expect(report.totals.withIssues).toBe(3)
    expect(report.classifications['demasiado similar']).toBe(3)
    expect(report.classifications['requiere revisión editorial']).toBe(3)
    expect(report.strongestSimilarities).not.toContainEqual(expect.objectContaining({ left: '/original', right: '/original?sort=newest' }))
    expect(report.classifications).not.toHaveProperty('terminada')
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
  }
})

test('the audit rechecks old public routes even after removal from navigation', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'replaid-audit-'))
  const requests: string[] = []
  const server = createServer((request, response) => {
    requests.push(request.url || '')
    const origin = `http://${request.headers.host}`
    if (request.url === '/sitemap.xml') {
      response.end(`<urlset><url><loc>${origin}/</loc></url></urlset>`)
      return
    }
    if (request.url === '/old-video') {
      response.writeHead(308, { Location: '/reviewed-guide' }).end()
      return
    }
    response.end(`<html><head><title>Guía disponible</title><meta name="description" content="Una guía con información propia para aprender a jugar Overwatch y revisar las decisiones que tomas en cada pelea."><link rel="canonical" href="${origin}/reviewed-guide"></head><body><main><h1>Guía revisada</h1><p>Contenido útil.</p></main></body></html>`)
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  try {
    const seed = join(temp, 'previous.json')
    const output = join(temp, 'audit.json')
    await writeFile(seed, JSON.stringify({ pages: [{ path: '/old-video' }, { path: '/api/checkout' }, { path: '//external.example' }, { path: '/dashboard?review=1' }, { path: '/login?next=/dashboard' }, { path: '/%61pi/checkout' }] }))
    const address = server.address()
    if (!address || typeof address === 'string') throw new Error('No audit fixture port')
    await execFileAsync(process.execPath, ['scripts/audit-public-content.mjs'], {
      env: { ...process.env, AUDIT_BASE_URL: `http://127.0.0.1:${address.port}`, AUDIT_SEED_FILE: seed, AUDIT_OUTPUT: output, AUDIT_MAX_PAGES: '10', AUDIT_BUILD_MANIFEST: '' },
    })
    const report = JSON.parse(await readFile(output, 'utf8'))
    expect(report.pages).toHaveLength(2)
    expect(report.pages.find((page: { path: string }) => page.path === '/old-video')).toMatchObject({ status: 200, redirected: true, resolvedPath: '/reviewed-guide', inSitemap: false })
    expect(requests).not.toContain('/api/checkout')
    expect(requests).not.toContain('//external.example')
    expect(requests).not.toContain('/dashboard?review=1')
    expect(requests).not.toContain('/login?next=/dashboard')
    expect(requests).not.toContain('/%61pi/checkout')
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
    await rm(temp, { recursive: true, force: true })
  }
})

test('the audit distinguishes a missing alt attribute from a decorative image', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'replaid-audit-alt-'))
  const images: Record<string, string> = {
    '/about': '<img src="/hero.png" alt=""><span>Hero name</span>',
    '/privacy': '<img src="/hero.png" alt="Hanzo">',
    '/legal': '<img src="/hero.png" data-alt="not an alt">',
  }
  const server = createServer((request, response) => {
    const origin = `http://${request.headers.host}`
    if (request.url === '/sitemap.xml') {
      response.end(`<urlset>${Object.keys(images).map(path => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`)
      return
    }
    response.end(`<html><head><title>Información de Replaid Lab</title><meta name="description" content="Información sobre Replaid Lab y sus servicios, con una explicación clara y completa para quienes visitan el proyecto."><link rel="canonical" href="${origin}${request.url}"></head><body><main><h1>Información</h1>${images[request.url || '']}<p>${'Información del proyecto. '.repeat(50)}</p></main></body></html>`)
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  try {
    const address = server.address()
    if (!address || typeof address === 'string') throw new Error('No audit fixture port')
    const output = join(temp, 'audit.json')
    await execFileAsync(process.execPath, ['scripts/audit-public-content.mjs'], {
      env: { ...process.env, AUDIT_BASE_URL: `http://127.0.0.1:${address.port}`, AUDIT_OUTPUT: output, AUDIT_SEED_FILE: '', AUDIT_MAX_PAGES: '3', AUDIT_BUILD_MANIFEST: '' },
    })
    const report = JSON.parse(await readFile(output, 'utf8'))
    const decorative = report.pages.find((page: { path: string }) => page.path === '/about')
    const descriptive = report.pages.find((page: { path: string }) => page.path === '/privacy')
    const missing = report.pages.find((page: { path: string }) => page.path === '/legal')
    expect(decorative).toMatchObject({ missingAltCount: 0, emptyAltCount: 1 })
    expect(descriptive).toMatchObject({ missingAltCount: 0, emptyAltCount: 0 })
    expect(missing).toMatchObject({ missingAltCount: 1 })
    expect(decorative.issues).not.toContain('Imágenes sin atributo alt')
    expect(descriptive.issues).not.toContain('Imágenes sin atributo alt')
    expect(missing.issues).toContain('Imágenes sin atributo alt')
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
    await rm(temp, { recursive: true, force: true })
  }
})

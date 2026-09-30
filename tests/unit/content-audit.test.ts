import { execFile } from 'node:child_process'
import { createServer } from 'node:http'
import { promisify } from 'node:util'
import { expect, test } from 'vitest'

const execFileAsync = promisify(execFile)

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

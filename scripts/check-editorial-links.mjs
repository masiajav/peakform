// Verify the public destinations rendered in the preview, not just source URLs.
export async function checkEditorialLinks(hrefs, base, request = fetch) {
  const origin = new URL(base).origin
  const urls = [...new Set(hrefs.filter(href => typeof href === 'string' && href.startsWith('/') && !href.startsWith('//'))
    .map(href => new URL(href, origin)).filter(url => url.origin === origin && !/^\/(?:api|admin|auth|dashboard|orders|profile|expert|editorial-preview)(?:\/|$)/.test(url.pathname))
    .map(url => { url.hash = ''; return url.href }))]
  for (const url of urls) {
    const response = await request(url, { signal: AbortSignal.timeout(20000), redirect: 'follow' })
    await response.body?.cancel()
    if (!response.ok || new URL(response.url || url).origin !== origin) throw Error(`Internal link unavailable or redirected off site: ${url} (${response.status})`)
  }
  return `Verified ${urls.length} distinct public internal destinations.`
}

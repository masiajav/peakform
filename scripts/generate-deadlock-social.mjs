import sharp from 'sharp'

const canvas = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="glow"><stop stop-color="#4d6134"/><stop offset="1" stop-color="#11170d"/></radialGradient></defs><path fill="#0a0b09" d="M0 0h1200v630H0z"/><path fill="url(#glow)" d="M630 0h570v630H630z"/><path stroke="#465238" d="M40 40h1120v550H40z"/><path fill="#c5d99b" d="M40 40h5v550h-5z"/></svg>`)
const portraits = await Promise.all([
  ['abrams', 600, 140, 280, 440], ['infernus', 900, 140, 270, 440], ['haze', 745, 108, 340, 472],
].map(async ([slug, left, top, width, height]) => ({ input: await sharp(`public/deadlock/${slug}.webp`).resize(width, height, { fit: 'contain', background: '#00000000' }).png().toBuffer(), left, top })))
const type = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><text x="85" y="110" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#ff6b2b">REPLAID LAB</text><text x="80" y="280" font-family="Arial,sans-serif" font-size="100" font-weight="900" letter-spacing="-5" fill="#efeee7">DEADLOCK</text><text x="85" y="360" font-family="Arial,sans-serif" font-size="62" font-weight="700" fill="#c5d99b">EN ESPAÑOL</text><text x="85" y="440" font-family="Arial,sans-serif" font-size="24" fill="#c0c4b6">Héroes · Builds · Counters · Mapa</text><path stroke="#455238" d="M85 493h480"/><text x="85" y="540" font-family="Arial,sans-serif" font-size="21" fill="#a5af95">replaidlab.com/deadlock</text></svg>`)
await sharp(canvas).composite([...portraits, { input: type, left: 0, top: 0 }]).png().toFile('public/deadlock/deadlock-social.png')
console.log('Created Deadlock social image: 1200 × 630')

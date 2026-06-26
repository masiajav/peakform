import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = path.join(root, 'content', 'pillars')
const dryRun = process.argv.includes('--dry-run')

const guideDetails = {
  '01_como_mejorar_overwatch_revisando_vod.md': {
    category: 'Revisión de VOD', tags: ['overwatch', 'vod', 'ranked', 'mejora'], role: 'flex',
  },
  '04_como_jugar_ana_ranked.md': {
    category: 'Guía de héroe', tags: ['overwatch', 'ana', 'support', 'ranked'], hero: 'ana', role: 'support',
  },
  '05_como_jugar_cassidy_ranked.md': {
    category: 'Guía de héroe', tags: ['overwatch', 'cassidy', 'dps', 'ranked'], hero: 'cassidy', role: 'dps',
  },
  '06_como_jugar_genji_ranked.md': {
    category: 'Guía de héroe', tags: ['overwatch', 'genji', 'dps', 'ranked'], hero: 'genji', role: 'dps',
  },
  '07_como_jugar_kiriko_ranked.md': {
    category: 'Guía de héroe', tags: ['overwatch', 'kiriko', 'support', 'ranked'], hero: 'kiriko', role: 'support',
  },
  '08_como_jugar_reinhardt_ranked.md': {
    category: 'Guía de héroe', tags: ['overwatch', 'reinhardt', 'tank', 'ranked'], hero: 'reinhardt', role: 'tank',
  },
  '09_como_jugar_dva_ranked.md': {
    category: 'Guía de héroe', tags: ['overwatch', 'dva', 'tank', 'ranked'], hero: 'dva', role: 'tank',
  },
  '10_como_jugar_winston_ranked.md': {
    category: 'Guía de héroe', tags: ['overwatch', 'winston', 'tank', 'ranked'], hero: 'winston', role: 'tank',
  },
  '11_como_mejorar_como_tank.md': {
    category: 'Guía de rol', tags: ['overwatch', 'tank', 'ranked', 'mejora'], role: 'tank',
  },
  '12_como_mejorar_como_dps.md': {
    category: 'Guía de rol', tags: ['overwatch', 'dps', 'ranked', 'mejora'], role: 'dps',
  },
  '13_como_mejorar_como_support.md': {
    category: 'Guía de rol', tags: ['overwatch', 'support', 'ranked', 'mejora'], role: 'support',
  },
  '14_como_revisar_cooldowns_overwatch.md': {
    category: 'Fundamentos', tags: ['overwatch', 'cooldowns', 'vod', 'ranked'], role: 'flex',
  },
  '15_como_elegir_composicion_dive_poke_brawl.md': {
    category: 'Composiciones', tags: ['overwatch', 'dive', 'poke', 'brawl', 'ranked'], role: 'flex',
  },
}

const editorialExtensions = {
  '11_como_mejorar_como_tank.md': `
## Qué entrenar como Tank durante una semana

No intentes arreglar todas las decisiones de Tank a la vez. Durante siete partidas, elige una sola pregunta: “¿He creado una posición mejor para mi equipo antes de pedir recursos?”. Después de cada derrota, revisa el primer momento en que avanzaste. Si no había cobertura para tu equipo, si tus supports no podían verte o si no habías forzado ningún cooldown rival, la entrada era demasiado cara.

En mapas cerrados, practica entrar con una esquina como objetivo, no con una baja como objetivo. En mapas abiertos, practica conservar una ruta de vuelta y no perseguir al rival hasta perder la línea de visión de tus supports. Si juegas Winston o D.Va, anota cuántas veces sales sin movilidad; si juegas Reinhardt, Ramattra o Junker Queen, anota cuántas veces tu equipo queda detrás de ti cuando empieza la pelea.

La mejora se nota cuando dejas de pedir curación para sobrevivir a entradas malas. Un Tank útil no absorbe daño por orgullo: fuerza atención, guarda recursos para la segunda ventana y permite que el resto del equipo juegue con espacio.
`,
  '12_como_mejorar_como_dps.md': `
## Un plan simple para mejorar como DPS

Elige un mapa y juega cinco partidas con una sola regla: antes de disparar, identifica tu cobertura y tu salida. Si tu ángulo no te permite volver a una esquina, no es un ángulo de presión; es una apuesta. Al terminar, revisa las muertes que sufriste lejos del equipo. Clasifícalas en tres grupos: ruta previsible, cooldown gastado sin salida o persecución innecesaria.

También conviene medir el daño por la reacción que provoca, no por el número final. Pregúntate si hiciste gastar una habilidad defensiva, si obligaste a un support a mirar hacia ti o si tu presión permitió que el Tank avanzara. Cuando la respuesta es no, cambia el ángulo, espera a que el rival mire al frente o coordina tu entrada con el engage del equipo.

En ranked, una eliminación limpia vale más que varios segundos disparando a un Tank protegido. No necesitas jugar perfecto: necesitas dejar de ofrecer al rival duelos cómodos y repetir las jugadas que realmente abren una pelea.\n\nAl final de la sesión, conserva un ejemplo de buen ángulo y uno de muerte evitable. Compararlos te da una referencia concreta para la siguiente partida.
`,
  '13_como_mejorar_como_support.md': `
## Una rutina útil para Support

Durante varias partidas, revisa siempre el mismo instante: los diez segundos antes de tu primera muerte. Mira dónde estabas, qué cobertura tenías, si tu movilidad seguía disponible y qué amenaza rival podía llegar a ti. Esta revisión suele revelar más que comparar números de curación, porque una Support muerta no puede sostener ninguna pelea.

Antes de usar un cooldown grande, nombra mentalmente qué amenaza estás respondiendo. Suzu, Lamp, Sleep, boop o movilidad no deberían salir por ansiedad. Si el rival todavía no ha mostrado su engage, guarda el recurso y busca una posición desde la que puedas curar sin exponerte. Cuando el peligro llegue, tu equipo tendrá una respuesta real.

La meta no es curar menos ni buscar daño porque sí. La meta es alternar curación, presión y supervivencia según la pelea. Si sobrevives al primer engage y conservas un recurso importante, tendrás más opciones de convertir una pelea larga que una Support que gasta todo al principio.\n\nCuando termines, guarda una pelea en la que sobreviviste con un cooldown disponible. Ese momento te mostrará qué decisión merece repetir en la siguiente sesión.
`,
  '14_como_revisar_cooldowns_overwatch.md': `
## Cómo convertir la revisión en una decisión mejor

Después de la partida, elige dos usos de tu cooldown más importante: uno que funcionó y otro que te dejó sin respuesta. No te limites a marcar acierto o fallo. Escribe qué amenaza había, qué información tenías y qué alternativa era posible. Con tres revisiones ya aparecen patrones: usar movilidad para entrar sin salida, lanzar una defensiva antes de ver la ultimate rival o gastar control en un objetivo que no podía morir.

En la siguiente sesión no persigas una estadística. Ponte una regla corta, como esperar medio segundo antes de usar el recurso o jugar una esquina más atrás. Esa regla es más fácil de aplicar y de medir que intentar “usar mejor los cooldowns” de forma abstracta.
`,
}
const linkLabels = {
  '/heroes/ana': 'Guía de Ana',
  '/heroes/cassidy': 'Guía de Cassidy',
  '/heroes/dva': 'Guía de D.Va',
  '/heroes/genji': 'Guía de Genji',
  '/heroes/kiriko': 'Guía de Kiriko',
  '/heroes/reinhardt': 'Guía de Reinhardt',
  '/heroes/shion': 'Guía de Shion',
  '/heroes/winston': 'Guía de Winston',
  '/counters/ana': 'Counters de Ana',
  '/counters/cassidy': 'Counters de Cassidy',
  '/counters/dva': 'Counters de D.Va',
  '/counters/reinhardt': 'Counters de Reinhardt',
  '/counters/shion': 'Counters de Shion',
  '/counters/winston': 'Counters de Winston',
  '/team-comps/ana': 'Composiciones con Ana',
  '/team-comps/cassidy': 'Composiciones con Cassidy',
  '/team-comps/dva': 'Composiciones con D.Va',
  '/team-comps/reinhardt': 'Composiciones con Reinhardt',
  '/team-comps/shion': 'Composiciones con Shion',
  '/team-comps/winston': 'Composiciones con Winston',
  '/roles/dps': 'Guías de DPS',
  '/roles/tank': 'Guías de Tank',
  '/guides/como-mejorar-en-overwatch': 'Cómo mejorar en Overwatch',
  '/guides/como-mejorar-en-overwatch-revisando-vod': 'Cómo revisar una VOD',
  '/guides/como-revisar-cooldowns-overwatch': 'Cómo revisar cooldowns',
  '/overwatch-temporada-3-into-the-tigers-den': 'Guía de la temporada 3',
}

function valueAfterHeading(markdown, heading) {
  const match = markdown.match(new RegExp(`^${heading}\\s*\\r?\\n\\s*([^\\r\\n]+)`, 'm'))
  if (!match) throw new Error(`Missing ${heading}`)
  return match[1].trim()
}

function firstValueAfterHeading(markdown, headings) {
  for (const heading of headings) {
    const match = markdown.match(new RegExp(`^${heading}\\s*\\r?\\n\\s*([^\\r\\n]+)`, 'm'))
    if (match) return match[1].trim()
  }
  throw new Error(`Missing one of ${headings.join(', ')}`)
}

function optionalValueAfterHeading(markdown, heading) {
  const match = markdown.match(new RegExp(`^${heading}\\s*\\r?\\n\\s*([^\\r\\n]+)`, 'm'))
  return match ? match[1].trim() : null
}

function parseGuide(markdown, filename) {
  const details = guideDetails[filename]
  if (!details) return null

  const url = firstValueAfterHeading(markdown, ['## URL recomendada', '## URL']).replaceAll('`', '')
  const slug = url.split('/').pop()
  const seoTitle = valueAfterHeading(markdown, '## Title SEO')
  const seoDescription = valueAfterHeading(markdown, '## Meta description')
  const declaredH1 = optionalValueAfterHeading(markdown, '## H1')
  const titleMatch = declaredH1
    ? { 0: `# ${declaredH1}`, 1: declaredH1, index: markdown.indexOf(`# ${declaredH1}`) }
    : markdown.match(/^# (?!Pieza )(.*)$/m)
  if (!titleMatch || titleMatch.index === -1) throw new Error(`Missing public H1 in ${filename}`)

  const title = titleMatch[1].trim()
  const afterH1 = markdown.slice(titleMatch.index + titleMatch[0].length).trim()
  const bodyBeforeNotes = afterH1.split(/^## Notas para Codex$/m)[0].trim()
  const body = [bodyBeforeNotes, editorialExtensions[filename]].filter(Boolean).join('\n\n')
    .replace(/^## Enlaces internos recomendados$/gm, '## Lecturas relacionadas')
    .replace(/^## CTA recomendado$/gm, '## Revisa tu partida con criterio')
    .replace(/- `([^`]+)`/g, (_, href) => `- [${linkLabels[href] || 'Ver contenido relacionado'}](${href})`)
    .replace(/\*\*Botón:\*\* Ver expertos de Overwatch/g, '[Ver expertos de Overwatch](/experts)')
    .replace(/\*\*Botón:\*\* Ver guía de Shion en YouTube/g, '[Ver guía de Shion en YouTube](https://youtu.be/9abTdz8uD3g)')

  const extendedDescription = seoDescription + ' Incluye consejos prácticos, errores frecuentes, checklist de VOD y enlaces internos para tomar mejores decisiones en partidas competitivas.'

  return {
    title,
    slug,
    body,
    excerpt: extendedDescription,
    seo_title: seoTitle,
    seo_description: extendedDescription,
    author: 'Replaid Lab',
    published: true,
    content_type: 'guide',
    ...details,
  }
}

async function loadEnv() {
  const raw = await fs.readFile(path.join(root, '.env.local'), 'utf8')
  return Object.fromEntries(raw.split(/\r?\n/)
    .filter(line => line && !line.startsWith('#'))
    .map(line => {
      const separator = line.indexOf('=')
      return [line.slice(0, separator), line.slice(separator + 1).replace(/^['"]|['"]$/g, '')]
    }))
}

async function main() {
  const files = await fs.readdir(contentDir)
  const guides = []

  for (const filename of files) {
    if (!guideDetails[filename]) continue
    const markdown = await fs.readFile(path.join(contentDir, filename), 'utf8')
    const guide = parseGuide(markdown, filename)
    if (guide) guides.push(guide)
  }

  if (guides.length !== Object.keys(guideDetails).length) {
    throw new Error(`Expected ${Object.keys(guideDetails).length} guides, found ${guides.length}`)
  }

  console.table(guides.map(guide => ({ slug: guide.slug, words: guide.body.split(/\s+/).filter(Boolean).length })))
  if (dryRun) return

  const env = await loadEnv()
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables')
  }

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
  const { error } = await supabase.from('guides').upsert(guides, { onConflict: 'slug' })
  if (error) throw error

  console.log(`Imported ${guides.length} pillar guides.`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})

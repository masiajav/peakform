import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'node:fs'

if (existsSync('.env.local')) {
  const envFile = readFileSync('.env.local', 'utf8')
  for (const line of envFile.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!match) continue
    const [, key, rawValue] = match
    if (process.env[key]) continue
    process.env[key] = rawValue.replace(/^['"]|['"]$/g, '')
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
}

const customTitles = {
  ana: ['Ana en Overwatch: granadas, Nano y posicionamiento', 'Como jugar Ana en Overwatch: granadas, Nano y posicionamiento'],
  genji: ['Genji en Overwatch: dives, resets y Dragonblade', 'Como jugar Genji en Overwatch: guia, counters y Dragonblade'],
  tracer: ['Tracer en Overwatch: flancos, Pulse Bomb y duelos', 'Como jugar Tracer en Overwatch: flancos, recalls y counters'],
  kiriko: ['Kiriko en Overwatch: Suzu, Kunai y Kitsune Rush', 'Como jugar Kiriko en Overwatch: Suzu, Kunai y posicionamiento'],
  dva: ['D.Va en Overwatch: Matrix, peel y control de high ground', 'Como jugar D.Va en Overwatch: Matrix, peel y counters'],
  reinhardt: ['Reinhardt en Overwatch: engages, escudo y Fire Strike', 'Como jugar Reinhardt en Overwatch: engages, escudo y matchups'],
  widowmaker: ['Widowmaker en Overwatch: lineas, rotaciones y picks', 'Como jugar Widowmaker en Overwatch: aim, lineas y counters'],
  mercy: ['Mercy en Overwatch: pocket, resurrect y supervivencia', 'Como jugar Mercy en Overwatch: pocket, Guardian Angel y resurrect'],
}

function labelFromSlug(slug) {
  if (slug === 'dva') return 'D.Va'
  if (slug === 'soldier-76') return 'Soldier-76'
  return slug.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
}

function titleFor(hero, role) {
  if (customTitles[hero]) return customTitles[hero][0]
  const label = labelFromSlug(hero)
  if (role === 'tank') return `${label} en Overwatch: espacio, recursos y matchups`
  if (role === 'support') return `${label} en Overwatch: utilidad, posicionamiento y peel`
  return `${label} en Overwatch: duelos, presion y counters`
}

function seoTitleFor(hero, role) {
  if (customTitles[hero]) return customTitles[hero][1]
  const label = labelFromSlug(hero)
  if (role === 'tank') return `Como jugar ${label} en Overwatch: counters, espacio y consejos`
  if (role === 'support') return `Como jugar ${label} en Overwatch: posicionamiento, cooldowns y counters`
  return `Como jugar ${label} en Overwatch: guia, counters y mecanicas`
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})

const { data: guides, error: fetchError } = await supabase
  .from('guides')
  .select('id, hero, role, slug')
  .not('hero', 'is', null)
  .like('slug', '%-guia-video-overwatch')

if (fetchError) throw fetchError

let updated = 0
for (const guide of guides ?? []) {
  const { error } = await supabase
    .from('guides')
    .update({
      title: titleFor(guide.hero, guide.role),
      seo_title: seoTitleFor(guide.hero, guide.role),
      updated_at: new Date().toISOString(),
    })
    .eq('id', guide.id)

  if (error) throw error
  updated += 1
}

console.log(`Updated ${updated} hero video guide titles`)

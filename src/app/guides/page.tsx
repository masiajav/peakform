import type { Metadata } from 'next'
import { Fragment } from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import AppNav from '@/components/layout/AppNav'
import Link from 'next/link'
import AdSlot from '@/components/content/AdSlot'
import { articleDescription, ROLE_LABELS, topicLabel } from '@/lib/content'
import { REPLAID_DISCORD_URL } from '@/lib/community'
import { buildMetadata, readingTime } from '@/lib/seo'
import GuideFilters from '@/components/content/GuideFilters'

export const metadata: Metadata = buildMetadata({
  title: 'Guías de Overwatch',
  description: 'Guías, consejos y fundamentos de Overwatch por rol, héroe y mapa para mejorar tus partidas.',
  path: '/guides',
})

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: { role?: string; hero?: string; map?: string; category?: string; q?: string; sort?: string }
}) {
  const filters = {
    role: cleanParam(searchParams.role),
    hero: cleanParam(searchParams.hero),
    map: cleanParam(searchParams.map),
    category: cleanParam(searchParams.category),
    q: cleanParam(searchParams.q),
    sort: cleanParam(searchParams.sort),
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('role, display_name, avatar_url').eq('id', user.id).single()
    profile = data
  }

  const admin = createAdminClient()
  const filterOptionsQuery = admin
    .from('guides')
    .select('category, role, hero, map')
    .eq('published', true)

  let query = admin
    .from('guides')
    .select('*')
    .eq('published', true)

  if (filters.role) query = query.eq('role', filters.role)
  if (filters.hero) query = query.eq('hero', filters.hero)
  if (filters.map) query = query.eq('map', filters.map)
  if (filters.category) query = query.eq('category', filters.category)

  if (filters.sort === 'oldest') query = query.order('created_at', { ascending: true })
  else if (filters.sort === 'title') query = query.order('title', { ascending: true })
  else query = query.order('created_at', { ascending: false })

  const [{ data: guides }, { data: filterOptions }] = await Promise.all([query, filterOptionsQuery])
  const searchedGuides = filterBySearch(guides ?? [], filters.q)
  const sortedGuides = filters.sort === 'read'
    ? [...searchedGuides].sort((a: any, b: any) => readingTime(a.body) - readingTime(b.body))
    : searchedGuides

  const categories = Array.from(new Set(sortedGuides.map((g: any) => g.category).filter(Boolean))) as string[]
  const filterCategories = Array.from(new Set((filterOptions ?? []).map((g: any) => g.category).filter(Boolean)))
    .sort()
    .map(value => ({ value, label: value }))
  const filterHeroes = Array.from(new Set((filterOptions ?? []).map((g: any) => g.hero).filter(Boolean)))
    .sort()
    .map(value => ({ value, label: topicLabel(value) }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {user ? (
        <AppNav role={profile?.role ?? 'user'} displayName={profile?.display_name || user.email} avatarUrl={profile?.avatar_url} />
      ) : (
        <nav style={{
          height: 52, background: 'var(--bg)', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20,
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3 }}>REPLAID LAB</span>
          </Link>
          <div style={{ flex: 1 }} />
          <Link href="/counters" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Counters</Link>
          <Link href="/news" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Noticias</Link>
          <Link href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
          <a href={REPLAID_DISCORD_URL} target="_blank" rel="noopener noreferrer" className="hide-mobile" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>Discord</a>
          <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
        </nav>
      )}

      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 24px 80px' }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '28px',
          marginBottom: 28,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
                HEMEROTECA
              </div>
              <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 42, letterSpacing: 1, color: 'var(--text)', margin: '0 0 12px' }}>
                GUÍAS Y CONSEJOS
              </h1>
              <p style={{ fontSize: 14, color: 'var(--text2)', margin: 0, lineHeight: 1.6, maxWidth: 680 }}>
                Filtra por rol, héroe o mapa y ordena los artículos para encontrar antes lo que necesitas revisar.
              </p>
            </div>

            <GuideFilters
              initial={{
                q: filters.q,
                sort: filters.sort,
                role: filters.role,
                hero: filters.hero,
                category: filters.category,
              }}
              roles={[
                { value: 'tank', label: 'Tank' },
                { value: 'dps', label: 'DPS' },
                { value: 'support', label: 'Support' },
                { value: 'flex', label: 'Flex' },
              ]}
              heroes={filterHeroes}
              categories={filterCategories}
            />
          </div>
        </div>

        <AdSlot variant="leaderboard" slot="guides-top-leaderboard" />

        {categories.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {categories.map(cat => (
              <span key={cat} style={{
                fontSize: 11, letterSpacing: 1, fontFamily: 'Bebas Neue, sans-serif',
                color: 'var(--text2)', border: '1px solid var(--border)', padding: '3px 10px',
              }}>
                {cat}
              </span>
            ))}
          </div>
        )}

        {sortedGuides.length === 0 ? (
          <EmptyGuides />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {sortedGuides.map((g: any, index: number) => (
              <Fragment key={g.id}>
                {index > 0 && index % 9 === 0 && (
                  <AdSlot
                    variant="inline"
                    slot={`guides-grid-${index}`}
                    style={{ gridColumn: '1 / -1', margin: 0 }}
                  />
                )}
                <Link href={`/guides/${g.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '22px 24px', height: '100%' }}>
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 10 }}>
                      {g.video_id && <Tag label="Video" accent />}
                      {g.category && <Tag label={g.category} accent />}
                      {g.role && <Tag label={ROLE_LABELS[g.role as keyof typeof ROLE_LABELS] || g.role} />}
                      {g.hero && <Tag label={topicLabel(g.hero)} />}
                      {g.map && <Tag label={topicLabel(g.map)} />}
                    </div>
                    <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: 0.5, color: 'var(--text)', margin: '0 0 10px', lineHeight: 1.2 }}>
                      {g.title}
                    </h2>
                    <p style={{ fontSize: 13, color: 'var(--text2)', margin: '0 0 16px', lineHeight: 1.5 }}>
                      {articleDescription(g)}
                    </p>
                    <div style={{ fontSize: 11, color: 'var(--text3)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span>{new Date(g.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      <span>{g.video_id ? `video${g.video_channel ? ` de ${g.video_channel}` : ''}` : `${readingTime(g.body)} min de lectura`}</span>
                    </div>
                  </article>
                </Link>
              </Fragment>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function cleanParam(value?: string) {
  if (!value || value === 'all' || value === 'latest') return undefined
  return value
}

function filterBySearch(guides: any[], query?: string) {
  const term = normalizeSearchText(query)
  if (!term) return guides

  return guides.filter(guide => {
    const haystack = normalizeSearchText([
      guide.title,
      guide.excerpt,
      guide.seo_description,
      guide.body,
      guide.category,
      guide.hero,
      guide.role,
      guide.map,
      guide.video_title,
      guide.video_channel,
    ].filter(Boolean).join(' '))

    return haystack.includes(term)
  })
}

function normalizeSearchText(value?: string) {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function EmptyGuides() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '28px' }}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 1, marginBottom: 8 }}>
        AÚN NO HAY GUÍAS PUBLICADAS
      </div>
      <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>
        Mientras llenas la hemeroteca, estos accesos ya dejan clara la estructura que tendrá el contenido.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
        <EmptyLink href="/roles/support" title="Por rol" text="Tank, DPS y Support" />
        <EmptyLink href="/heroes/ana" title="Por héroe" text="Counters, errores y consejos" />
        <EmptyLink href="/maps/kings-row" title="Por mapa" text="Setups, rutas y composiciones" />
      </div>
    </div>
  )
}

function EmptyLink({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{ border: '1px solid var(--border2)', background: 'var(--surface2)', padding: '16px' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 16, letterSpacing: 1, marginBottom: 4 }}>{title}</div>
        <div style={{ color: 'var(--text2)', fontSize: 12 }}>{text}</div>
      </div>
    </Link>
  )
}

function Tag({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <span style={{
      fontSize: 10,
      letterSpacing: 1.3,
      color: accent ? 'var(--accent)' : 'var(--text3)',
      fontFamily: 'Bebas Neue, sans-serif',
    }}>
      {label.toUpperCase()}
    </span>
  )
}

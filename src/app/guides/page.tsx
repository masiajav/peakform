import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import AppNav from '@/components/layout/AppNav'
import Link from 'next/link'
import { articleDescription, ROLE_LABELS, topicLabel } from '@/lib/content'
import { buildMetadata, readingTime } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Guias de Overwatch',
  description: 'Guias, consejos y fundamentos de Overwatch por rol, heroe y mapa para mejorar tus partidas.',
  path: '/guides',
})

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: { role?: string; hero?: string; map?: string; q?: string; sort?: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('role, display_name, avatar_url').eq('id', user.id).single()
    profile = data
  }

  const admin = createAdminClient()
  let query = admin
    .from('guides')
    .select('*')
    .eq('published', true)

  if (searchParams.role) query = query.eq('role', searchParams.role)
  if (searchParams.hero) query = query.eq('hero', searchParams.hero)
  if (searchParams.map) query = query.eq('map', searchParams.map)
  if (searchParams.q) {
    const term = searchParams.q.replace(/[%_,]/g, '').trim()
    if (term) query = query.or(`title.ilike.%${term}%,excerpt.ilike.%${term}%,body.ilike.%${term}%`)
  }

  if (searchParams.sort === 'oldest') query = query.order('created_at', { ascending: true })
  else if (searchParams.sort === 'title') query = query.order('title', { ascending: true })
  else query = query.order('created_at', { ascending: false })

  const { data: guides } = await query
  const sortedGuides = searchParams.sort === 'read'
    ? [...(guides ?? [])].sort((a: any, b: any) => readingTime(a.body) - readingTime(b.body))
    : guides ?? []

  const categories = Array.from(new Set(sortedGuides.map((g: any) => g.category).filter(Boolean))) as string[]
  const activeFilter = searchParams.role || searchParams.hero || searchParams.map || searchParams.q || searchParams.sort

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
          <Link href="/news" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Noticias</Link>
          <Link href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
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
                GUIAS Y CONSEJOS
              </h1>
              <p style={{ fontSize: 14, color: 'var(--text2)', margin: 0, lineHeight: 1.6, maxWidth: 680 }}>
                Filtra por rol, heroe o mapa y ordena los articulos para encontrar antes lo que necesitas revisar.
              </p>
            </div>

            <form action="/guides" style={{ display: 'grid', gap: 10 }}>
              <input name="q" defaultValue={searchParams.q || ''} placeholder="Buscar: aim, Ana, posicionamiento..." style={{ height: 38 }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 112px', gap: 10 }}>
                <select name="sort" defaultValue={searchParams.sort || 'latest'} style={{ height: 38 }}>
                  <option value="latest">Recientes</option>
                  <option value="oldest">Antiguas</option>
                  <option value="title">Titulo A-Z</option>
                  <option value="read">Lectura corta</option>
                </select>
                <button type="submit" className="btn btn-primary btn-sm" style={{ height: 38 }}>ORDENAR</button>
              </div>
            </form>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
            <Filter href="/guides" label="Todas" accent={!activeFilter} />
            <Filter href="/roles/tank" label="Tank" />
            <Filter href="/roles/dps" label="DPS" />
            <Filter href="/roles/support" label="Support" />
            <Filter href="/heroes/ana" label="Ana" />
            <Filter href="/heroes/tracer" label="Tracer" />
            <Filter href="/maps/kings-row" label="King's Row" />
            {activeFilter && <Filter href="/guides" label="Limpiar" accent />}
          </div>
        </div>

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
            {sortedGuides.map((g: any) => (
              <Link key={g.id} href={`/guides/${g.slug}`} style={{ textDecoration: 'none' }}>
                <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '22px 24px', height: '100%' }}>
                  <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 10 }}>
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
                    <span>{readingTime(g.body)} min de lectura</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function Filter({ href, label, accent = false }: { href: string; label: string; accent?: boolean }) {
  return (
    <Link href={href} style={{
      fontSize: 12,
      color: accent ? 'var(--accent)' : 'var(--text2)',
      background: 'var(--surface)',
      border: `1px solid ${accent ? 'rgba(255,107,43,0.35)' : 'var(--border)'}`,
      padding: '5px 12px',
      textDecoration: 'none',
    }}>
      {label}
    </Link>
  )
}

function EmptyGuides() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '28px' }}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 1, marginBottom: 8 }}>
        AUN NO HAY GUIAS PUBLICADAS
      </div>
      <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>
        Mientras llenas la hemeroteca, estos accesos ya dejan clara la estructura que tendra el contenido.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
        <EmptyLink href="/roles/support" title="Por rol" text="Tank, DPS y Support" />
        <EmptyLink href="/heroes/ana" title="Por heroe" text="Counters, errores y consejos" />
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

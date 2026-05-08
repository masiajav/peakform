import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import JsonLd from '@/components/content/JsonLd'
import AdSlot from '@/components/content/AdSlot'
import { announcementPath, articleDescription, ROLE_LABELS, topicLabel } from '@/lib/content'
import { REPLAID_DISCORD_URL } from '@/lib/community'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import { formatPrice } from '@/types'

export const metadata: Metadata = buildMetadata({
  title: 'Guías de Overwatch, vídeos y consejos para mejorar',
  description: 'Aprende Overwatch con guías por héroe, rol y mapa, vídeos actualizados, counters, composiciones y análisis de partidas.',
  path: '/',
})

const featuredHeroes = ['ana', 'genji', 'tracer', 'kiriko', 'reinhardt', 'juno']
const roleLinks = [
  { href: '/roles/tank', label: 'Tank', text: 'Espacio, recursos y engages.' },
  { href: '/roles/dps', label: 'DPS', text: 'Ángulos, picks y presión útil.' },
  { href: '/roles/support', label: 'Support', text: 'Sustain, utilidad y supervivencia.' },
]

const clusters = [
  {
    title: 'Guías por héroe',
    text: 'Encuentra vídeos, counters y errores comunes para cada héroe.',
    href: '/guides?category=Video+gu%C3%ADa',
  },
  {
    title: 'Cómo mejorar en Overwatch',
    text: 'Fundamentos para revisar tus partidas sin depender solo de mecánicas.',
    href: '/guides?q=fundamentos',
  },
  {
    title: 'Counters y composiciones',
    text: 'Lectura de matchups, brawl, poke, dive y cambios de héroe.',
    href: '/team-comps',
  },
  {
    title: 'Vídeos actualizados',
    text: 'Guías en vídeo priorizadas por actualidad y utilidad real.',
    href: '/guides?sort=latest',
  },
]

export default async function RootPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profileRole: string | null = null
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    profileRole = profile?.role ?? 'user'
  }

  const admin = createAdminClient()
  const [{ data: featuredGuides }, { data: videoGuides }, { data: experts }, { data: latestNews }] = await Promise.all([
    admin
      .from('guides')
      .select('id, title, slug, excerpt, body, category, hero, role, video_id, video_channel, created_at, seo_description')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(6),
    admin
      .from('guides')
      .select('id, title, slug, excerpt, body, hero, role, video_id, video_title, video_channel, video_published_at, seo_description')
      .eq('published', true)
      .not('video_id', 'is', null)
      .gte('video_published_at', '2025-01-01')
      .order('video_published_at', { ascending: false })
      .limit(6),
    admin
      .from('experts')
      .select('id, slug, display_name, peak_rank, main_role, specialties, avg_rating, total_reviews, price_starter')
      .eq('status', 'active')
      .eq('service_paused', false)
      .order('avg_rating', { ascending: false })
      .limit(3),
    admin
      .from('announcements')
      .select('id, title, slug, body, excerpt, content_type, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3),
  ])

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Guías destacadas de Overwatch',
    itemListElement: (featuredGuides ?? []).map((guide: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      url: absoluteUrl(`/guides/${guide.slug}`),
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={itemListJsonLd} />
      <TopNav user={user} profileRole={profileRole} />

      <main>
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px 36px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(280px, 0.85fr)', gap: 32, alignItems: 'center' }} className="home-hero-grid">
            <div>
              <div className="eyebrow">HEMEROTECA DE OVERWATCH</div>
              <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(46px, 8vw, 82px)', lineHeight: 0.94, letterSpacing: 1.5, margin: '0 0 22px', color: 'var(--text)' }}>
                GUÍAS DE OVERWATCH,<br />
                <span style={{ color: 'var(--accent)' }}>VÍDEOS Y CONSEJOS</span><br />
                PARA MEJORAR
              </h1>
              <p style={{ color: 'var(--text2)', fontSize: 17, lineHeight: 1.65, maxWidth: 610, margin: '0 0 28px' }}>
                Encuentra guías por héroe, rol o problema concreto. Primero aprende el patrón; después, si lo necesitas, pide a un experto que revise tu VOD.
              </p>
              <form action="/guides" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 10, maxWidth: 620 }} className="home-search">
                <input name="q" placeholder="Buscar Genji, counters, support, 6v6..." aria-label="Buscar guías de Overwatch" />
                <button className="btn btn-primary" type="submit">BUSCAR GUÍAS</button>
              </form>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>ACCESOS RÁPIDOS</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}>
                {featuredHeroes.map(hero => (
                  <Link key={hero} href={`/heroes/${hero}`} className="quick-link">
                    {topicLabel(hero)}
                  </Link>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border)', marginTop: 16, paddingTop: 16, display: 'grid', gap: 8 }}>
                {roleLinks.map(role => (
                  <Link key={role.href} href={role.href} className="role-link">
                    <span>{role.label}</span>
                    <small>{role.text}</small>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
          <AdSlot variant="leaderboard" slot="home-top-leaderboard" />
        </section>

        <Section title="Guías populares" kicker="SEO HUB" href="/guides" linkLabel="Ver todas">
          <CardGrid>
            {(featuredGuides ?? []).map((guide: any) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </CardGrid>
        </Section>

        <Section title="Vídeos actualizados" kicker="2025+" href="/guides?sort=latest" linkLabel="Explorar vídeos">
          <CardGrid>
            {(videoGuides ?? []).map((guide: any) => (
              <GuideCard key={guide.id} guide={guide} compactMeta />
            ))}
          </CardGrid>
        </Section>

        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
          <AdSlot variant="leaderboard" slot="home-mid-leaderboard" />
        </section>

        <Section title="Aprende por intención" kicker="CLUSTERS" href="/guides" linkLabel="Abrir hemeroteca">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14 }}>
            {clusters.map(cluster => (
              <Link key={cluster.title} href={cluster.href} style={{ textDecoration: 'none' }}>
                <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20, minHeight: 160 }}>
                  <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 24, letterSpacing: 0.8, margin: '0 0 10px' }}>{cluster.title}</h3>
                  <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{cluster.text}</p>
                </article>
              </Link>
            ))}
          </div>
        </Section>

        {experts && experts.length > 0 && (
          <Section title="Feedback personalizado" kicker="SIGUIENTE PASO" href="/experts" linkLabel="Ver expertos">
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, letterSpacing: 1, color: 'var(--text)', margin: '0 0 8px' }}>
                ¿Quieres que un experto revise tus errores?
              </h3>
              <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.65, margin: 0, maxWidth: 720 }}>
                Las guías te dan el marco. Una review de VOD te dice exactamente qué repetir, qué dejar de hacer y qué entrenar en tus próximas partidas.
              </p>
            </div>
            <CardGrid>
              {experts.map((expert: any) => (
                <Link key={expert.id} href={`/experts/${expert.slug || expert.id}`} style={{ textDecoration: 'none' }}>
                  <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20, height: '100%' }}>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.7 }}>{expert.display_name}</div>
                    <div style={{ color: 'var(--accent)', fontSize: 12, marginTop: 4 }}>{expert.peak_rank} · {ROLE_LABELS[expert.main_role as keyof typeof ROLE_LABELS] || expert.main_role}</div>
                    <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.5, minHeight: 38 }}>
                      {(expert.specialties ?? []).slice(0, 3).join(' · ') || 'Review personalizada de partidas'}
                    </p>
                    <div style={{ color: 'var(--text2)', fontSize: 13 }}>
                      Desde <span style={{ color: 'var(--text)' }}>{formatPrice(expert.price_starter)}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </CardGrid>
          </Section>
        )}

        {latestNews && latestNews.length > 0 && (
          <Section title="Actualidad" kicker="NOTICIAS" href="/news" linkLabel="Ver noticias">
            <div style={{ display: 'grid', gap: 12 }}>
              {latestNews.map((item: any) => (
                <Link key={item.id} href={announcementPath(item)} style={{ textDecoration: 'none' }}>
                  <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px 20px' }}>
                    <div style={{ color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.2, fontSize: 11, marginBottom: 6 }}>
                      {new Date(item.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                    <h3 style={{ color: 'var(--text)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 21, letterSpacing: 0.7, margin: '0 0 6px' }}>{item.title}</h3>
                    <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{item.excerpt || item.body?.slice(0, 150)}</p>
                  </article>
                </Link>
              ))}
            </div>
          </Section>
        )}
      </main>

      <Footer />
    </div>
  )
}

function TopNav({ user, profileRole }: { user: any; profileRole: string | null }) {
  return (
    <nav style={{ height: 52, background: 'var(--bg)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20, position: 'sticky', top: 0, zIndex: 100 }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3 }}>REPLAID LAB</span>
      </Link>
      <div style={{ flex: 1 }} />
      <Link href="/guides" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guías</Link>
      <Link href="/counters" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Counters</Link>
      <Link href="/team-comps" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Composiciones</Link>
      <Link href="/news" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Noticias</Link>
      <Link href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
      <a href={REPLAID_DISCORD_URL} target="_blank" rel="noopener noreferrer" className="hide-mobile" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>Discord</a>
      {user ? (
        <Link href={profileRole === 'admin' ? '/admin' : profileRole === 'expert' ? '/expert/dashboard' : '/dashboard'} className="btn btn-primary btn-sm">
          MI PANEL
        </Link>
      ) : (
        <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
      )}
    </nav>
  )
}

function Section({ title, kicker, href, linkLabel, children }: { title: string; kicker: string; href: string; linkLabel: string; children: ReactNode }) {
  return (
    <section style={{ maxWidth: 1120, margin: '0 auto', padding: '52px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end', marginBottom: 24 }}>
        <div>
          <div className="eyebrow">{kicker}</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 38, letterSpacing: 1, margin: 0 }}>{title}</h2>
        </div>
        <Link href={href} style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 13 }}>{linkLabel} →</Link>
      </div>
      {children}
    </section>
  )
}

function CardGrid({ children }: { children: ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>{children}</div>
}

function GuideCard({ guide, compactMeta = false }: { guide: any; compactMeta?: boolean }) {
  return (
    <Link href={`/guides/${guide.slug}`} style={{ textDecoration: 'none' }}>
      <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20, height: '100%' }}>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 10 }}>
          {guide.video_id && <Tag label="Video" accent />}
          {guide.role && <Tag label={ROLE_LABELS[guide.role as keyof typeof ROLE_LABELS] || guide.role} />}
          {guide.hero && <Tag label={topicLabel(guide.hero)} />}
        </div>
        <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.7, lineHeight: 1.15, margin: '0 0 10px' }}>{guide.title}</h3>
        <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.5, margin: '0 0 14px' }}>{articleDescription(guide)}</p>
        <div style={{ color: 'var(--text3)', fontSize: 11 }}>
          {compactMeta && guide.video_published_at
            ? `Vídeo ${new Date(guide.video_published_at).getFullYear()}`
            : new Date(guide.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
          {guide.video_channel ? ` · ${guide.video_channel}` : ''}
        </div>
      </article>
    </Link>
  )
}

function Tag({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <span style={{ fontSize: 10, letterSpacing: 1.3, color: accent ? 'var(--accent)' : 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif' }}>
      {label.toUpperCase()}
    </span>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
      <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--accent)', letterSpacing: 2 }}>REPLAID LAB</span>
      <div className="footer-links" style={{ display: 'flex', gap: 24 }}>
        <Link href="/guides" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Guías</Link>
        <Link href="/counters" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Counters</Link>
        <Link href="/team-comps" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Composiciones</Link>
        <Link href="/news" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Noticias</Link>
        <Link href="/experts" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Expertos</Link>
        <a href={REPLAID_DISCORD_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}>Discord</a>
        <Link href="/legal" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Legal</Link>
      </div>
      <span style={{ fontSize: 12, color: 'var(--text3)' }}>© 2026 Replaid Lab</span>
    </footer>
  )
}

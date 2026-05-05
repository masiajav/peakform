import { createAdminClient } from '@/lib/supabase/admin'
import { announcementPath, articleDescription, guidePath, ROLE_LABELS, topicLabel, type ContentRole } from '@/lib/content'
import JsonLd from './JsonLd'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'
import Link from 'next/link'
import { formatPrice } from '@/types'

export default async function TopicArchivePage({
  kind,
  slug,
  title,
  description,
}: {
  kind: 'hero' | 'role' | 'map'
  slug: string
  title: string
  description: string
}) {
  const admin = createAdminClient()

  const guideQuery = admin
    .from('guides')
    .select('id, title, slug, excerpt, body, category, hero, role, map, created_at')
    .eq('published', true)
    .eq(kind, slug)
    .order('created_at', { ascending: false })
    .limit(12)

  const newsQuery = admin
    .from('announcements')
    .select('id, title, slug, excerpt, body, content_type, hero, role, map, created_at')
    .eq('published', true)
    .eq(kind, slug)
    .order('created_at', { ascending: false })
    .limit(6)

  const expertsQuery = kind === 'role'
    ? admin
        .from('experts')
        .select('id, slug, display_name, peak_rank, main_role, avg_rating, total_reviews, price_starter')
        .eq('status', 'active')
        .eq('main_role', slug)
        .order('avg_rating', { ascending: false })
        .limit(6)
    : admin
        .from('experts')
        .select('id, slug, display_name, peak_rank, main_role, avg_rating, total_reviews, price_starter')
        .eq('status', 'active')
        .order('avg_rating', { ascending: false })
        .limit(3)

  const [{ data: guides }, { data: news }, { data: experts }] = await Promise.all([guideQuery, newsQuery, expertsQuery])

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: absoluteUrl(`/${kind === 'role' ? 'roles' : kind === 'hero' ? 'heroes' : 'maps'}/${slug}`),
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={collectionJsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 24px 88px' }}>
        <header style={{ marginBottom: 40, maxWidth: 760 }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>
            HEMEROTECA OVERWATCH
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(38px, 7vw, 68px)', letterSpacing: 1, lineHeight: 0.98, margin: '0 0 16px' }}>
            {title}
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            {description}
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 28, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
            <Section title="Guias y consejos">
              {!guides || guides.length === 0 ? (
                <EmptyCopy text="Todavia no hay guias publicadas para este tema." />
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
                  {guides.map((guide: any) => (
                    <ArticleCard key={guide.id} href={guidePath(guide.slug)} title={guide.title} body={guide.excerpt || guide.body} meta={guide.category || labelForTopic(guide)} />
                  ))}
                </div>
              )}
            </Section>

            <Section title="Noticias y patch notes">
              {!news || news.length === 0 ? (
                <EmptyCopy text="No hay noticias etiquetadas todavia." />
              ) : (
                <div style={{ display: 'grid', gap: 10 }}>
                  {news.map((item: any) => (
                    <ArticleCard key={item.id} href={announcementPath(item)} title={item.title} body={item.excerpt || item.body} meta={item.content_type === 'patch_note' ? 'Patch note' : 'Noticia'} compact />
                  ))}
                </div>
              )}
            </Section>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 12, letterSpacing: 1.5, marginBottom: 10 }}>
                REVISA TU PARTIDA
              </div>
              <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: '0 0 14px' }}>
                Usa esta hemeroteca como base y recibe feedback aplicado a tus propias decisiones en partida.
              </p>
              <Link href={kind === 'role' ? `/experts?role=${slug}` : '/experts'} className="btn btn-primary btn-sm">VER EXPERTOS</Link>
            </div>

            {experts && experts.length > 0 && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px' }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 16, letterSpacing: 1, marginBottom: 12 }}>
                  EXPERTOS DESTACADOS
                </div>
                <div style={{ display: 'grid', gap: 12 }}>
                  {experts.map((expert: any) => (
                    <Link key={expert.id} href={`/experts/${expert.slug || expert.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                        <div style={{ color: 'var(--text)', fontSize: 13, fontWeight: 600 }}>{expert.display_name}</div>
                        <div style={{ color: 'var(--text3)', fontSize: 11, marginTop: 3 }}>
                          {expert.peak_rank} · desde {formatPrice(expert.price_starter)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,107,43,0.25)', padding: '18px' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 10, letterSpacing: 1.5, marginBottom: 8 }}>
                PATROCINIO DISPONIBLE
              </div>
              <p style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.55, margin: 0 }}>
                Espacio nativo para herramientas, hardware o recursos utiles para jugadores de Overwatch. Siempre etiquetado.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function PublicNav() {
  return (
    <nav style={{
      height: 52, background: 'var(--bg)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20,
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3, textDecoration: 'none' }}>
        REPLAID LAB
      </Link>
      <div style={{ flex: 1 }} />
      <Link href="/guides" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guias</Link>
      <Link href="/news" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Noticias</Link>
      <Link href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
      <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
    </nav>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: 1, color: 'var(--text)', margin: '0 0 16px' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function ArticleCard({ href, title, body, meta, compact = false }: { href: string; title: string; body: string; meta?: string; compact?: boolean }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <article style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: compact ? '16px 18px' : '20px', height: '100%' }}>
        {meta && (
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 10, letterSpacing: 1.5, marginBottom: 8 }}>
            {meta.toUpperCase()}
          </div>
        )}
        <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: compact ? 18 : 20, letterSpacing: 0.5, margin: '0 0 8px', lineHeight: 1.15 }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.55, margin: 0 }}>
          {body.replace(/[#*_`]/g, '').slice(0, compact ? 150 : 120).trim()}...
        </p>
      </article>
    </Link>
  )
}

function EmptyCopy({ text }: { text: string }) {
  return <p style={{ color: 'var(--text3)', fontSize: 14, margin: 0 }}>{text}</p>
}

function labelForTopic(item: any) {
  if (item.role) return ROLE_LABELS[item.role as ContentRole]
  if (item.hero) return topicLabel(item.hero)
  if (item.map) return topicLabel(item.map)
  return 'Guia'
}

import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import AppNav from '@/components/layout/AppNav'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import JsonLd from '@/components/content/JsonLd'
import SponsoredBlock from '@/components/content/SponsoredBlock'
import ArticleCta from '@/components/content/ArticleCta'
import { articleDescription, guidePath, ROLE_LABELS, topicLabel, type GuideContent } from '@/lib/content'
import { absoluteUrl, buildMetadata, readingTime, SITE_NAME } from '@/lib/seo'
import { formatPrice } from '@/types'

async function fetchGuide(slug: string) {
  const admin = createAdminClient()
  const { data } = await admin
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  return data as GuideContent | null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = await fetchGuide(params.slug)
  if (!guide) return {}

  return buildMetadata({
    title: guide.seo_title || guide.title,
    description: articleDescription(guide),
    path: guidePath(guide.slug),
    image: guide.cover_image,
    type: 'article',
  })
}

export default async function GuideDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('role, display_name, avatar_url').eq('id', user.id).single()
    profile = data
  }

  const guide = await fetchGuide(params.slug)
  if (!guide) notFound()

  const admin = createAdminClient()
  let relatedQuery = admin
    .from('guides')
    .select('id, title, slug, excerpt, body, category, hero, role, map, created_at')
    .eq('published', true)
    .neq('slug', guide.slug)
    .limit(3)

  if (guide.hero) relatedQuery = relatedQuery.eq('hero', guide.hero)
  else if (guide.role) relatedQuery = relatedQuery.eq('role', guide.role)
  else if (guide.map) relatedQuery = relatedQuery.eq('map', guide.map)
  else if (guide.category) relatedQuery = relatedQuery.eq('category', guide.category)

  const [{ data: related }, { data: experts }] = await Promise.all([
    relatedQuery,
    guide.role
      ? admin
          .from('experts')
          .select('id, slug, display_name, peak_rank, main_role, avg_rating, total_reviews, price_starter')
          .eq('status', 'active')
          .eq('main_role', guide.role)
          .order('avg_rating', { ascending: false })
          .limit(3)
      : admin
          .from('experts')
          .select('id, slug, display_name, peak_rank, main_role, avg_rating, total_reviews, price_starter')
          .eq('status', 'active')
          .order('avg_rating', { ascending: false })
          .limit(3),
  ])

  const readMinutes = readingTime(guide.body)
  const description = articleDescription(guide)
  const author = guide.author || SITE_NAME
  const publishedDate = guide.created_at
  const updatedDate = guide.updated_at || guide.created_at

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: guide.title,
    description,
    image: guide.cover_image ? [absoluteUrl(guide.cover_image)] : undefined,
    datePublished: publishedDate,
    dateModified: updatedDate,
    author: { '@type': 'Organization', name: author },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: absoluteUrl(guidePath(guide.slug)),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Guias', item: absoluteUrl('/guides') },
      { '@type': 'ListItem', position: 2, name: guide.title, item: absoluteUrl(guidePath(guide.slug)) },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

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
          <Link href="/guides" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guias</Link>
          <Link href="/experts" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
        </nav>
      )}

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 80px' }}>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 32, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/guides" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Guias</Link>
          <span>›</span>
          <span>{guide.title}</span>
        </div>

        <header style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            {guide.category && <Topic href="/guides" label={guide.category} accent />}
            {guide.role && <Topic href={`/roles/${guide.role}`} label={ROLE_LABELS[guide.role]} />}
            {guide.hero && <Topic href={`/heroes/${guide.hero}`} label={topicLabel(guide.hero)} />}
            {guide.map && <Topic href={`/maps/${guide.map}`} label={topicLabel(guide.map)} />}
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: 1, color: 'var(--text)', margin: '0 0 16px', lineHeight: 1.05 }}>
            {guide.title}
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: '0 0 18px' }}>
            {description}
          </p>
          <div style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span>{new Date(guide.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            <span>{readMinutes} min de lectura</span>
            <span>{author}</span>
          </div>
        </header>

        <div className="guide-body">
          <ReactMarkdown>{guide.body}</ReactMarkdown>
        </div>

        <SponsoredBlock item={guide} />
        <ArticleCta role={guide.role} hero={guide.hero ? topicLabel(guide.hero) : null} />

        {experts && experts.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <SectionTitle>EXPERTOS RECOMENDADOS</SectionTitle>
            <div style={{ display: 'grid', gap: 10 }}>
              {experts.map((expert: any) => (
                <Link key={expert.id} href={`/experts/${expert.slug || expert.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center' }}>
                    <div>
                      <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: 14 }}>{expert.display_name}</div>
                      <div style={{ color: 'var(--accent)', fontSize: 12, marginTop: 3 }}>{expert.peak_rank} · {ROLE_LABELS[expert.main_role as keyof typeof ROLE_LABELS] || expert.main_role}</div>
                    </div>
                    <div style={{ color: 'var(--text2)', fontSize: 13, whiteSpace: 'nowrap' }}>
                      desde <span style={{ color: 'var(--text)' }}>{formatPrice(expert.price_starter)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {related && related.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <SectionTitle>LECTURAS RELACIONADAS</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {related.map((item: any) => (
                <Link key={item.id} href={`/guides/${item.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '16px', height: '100%' }}>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 17, letterSpacing: 0.5, lineHeight: 1.2, marginBottom: 8 }}>
                      {item.title}
                    </div>
                    <p style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.5, margin: 0 }}>
                      {item.excerpt || item.body?.slice(0, 110)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}

function Topic({ href, label, accent = false }: { href: string; label: string; accent?: boolean }) {
  return (
    <Link href={href} style={{
      fontSize: 10,
      letterSpacing: 1.5,
      color: accent ? 'var(--accent)' : 'var(--text2)',
      fontFamily: 'Bebas Neue, sans-serif',
      border: `1px solid ${accent ? 'rgba(255,107,43,0.35)' : 'var(--border)'}`,
      padding: '3px 9px',
      textDecoration: 'none',
    }}>
      {label.toUpperCase()}
    </Link>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text2)', fontSize: 14, letterSpacing: 2, marginBottom: 14 }}>
      {children}
    </div>
  )
}

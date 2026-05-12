import { createClient } from '@/lib/supabase/server'
import AppNav from '@/components/layout/AppNav'
import PublicNav from '@/components/layout/PublicNav'
import ArticleCta from '@/components/content/ArticleCta'
import JsonLd from '@/components/content/JsonLd'
import SponsoredBlock from '@/components/content/SponsoredBlock'
import { announcementPath, articleDescription, ROLE_LABELS, topicLabel, type AnnouncementContent } from '@/lib/content'
import { absoluteUrl, readingTime, SITE_NAME } from '@/lib/seo'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default async function AnnouncementArticlePage({
  article,
  sectionLabel,
  sectionHref,
  schemaType,
}: {
  article: AnnouncementContent
  sectionLabel: string
  sectionHref: string
  schemaType: 'NewsArticle' | 'Article'
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('role, display_name, avatar_url').eq('id', user.id).single()
    profile = data
  }

  const description = articleDescription(article)
  const author = article.author || SITE_NAME
  const path = announcementPath(article)
  const readMinutes = readingTime(article.body)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: article.title,
    description,
    image: article.cover_image ? [absoluteUrl(article.cover_image)] : undefined,
    datePublished: article.created_at,
    dateModified: article.updated_at || article.created_at,
    author: { '@type': 'Organization', name: author },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: absoluteUrl(path),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: sectionLabel, item: absoluteUrl(sectionHref) },
      { '@type': 'ListItem', position: 2, name: article.title, item: absoluteUrl(path) },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PublicNav
        ctaHref={user ? profile?.role === 'admin' ? '/admin' : profile?.role === 'expert' ? '/expert/dashboard' : '/dashboard' : '/login'}
        ctaLabel={user ? 'MI PANEL' : 'ENTRAR'}
      />
      {false && (user ? (
        <AppNav role={profile?.role ?? 'user'} displayName={profile?.display_name || user?.email} avatarUrl={profile?.avatar_url} />
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
          <Link href="/guides" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guías</Link>
          <Link href="/news" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Noticias</Link>
          <Link href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
        </nav>
      ))}

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 80px' }}>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 32, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href={sectionHref} style={{ color: 'var(--text3)', textDecoration: 'none' }}>{sectionLabel}</Link>
          <span>›</span>
          <span>{article.title}</span>
        </div>

        <header style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            {article.content_type === 'patch_note' && <Topic href="/patch-notes" label="Patch notes" accent />}
            {article.role && <Topic href={`/roles/${article.role}`} label={ROLE_LABELS[article.role]} />}
            {article.hero && <Topic href={`/heroes/${article.hero}`} label={topicLabel(article.hero)} />}
            {article.map && <Topic href={`/maps/${article.map}`} label={topicLabel(article.map)} />}
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: 1, color: 'var(--text)', margin: '0 0 16px', lineHeight: 1.05 }}>
            {article.title}
          </h1>
          <div style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span>{new Date(article.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            <span>{readMinutes} min de lectura</span>
            <span>{author}</span>
          </div>
        </header>

        <div className="guide-body">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>

        <SponsoredBlock item={article} />
        <ArticleCta role={article.role} hero={article.hero ? topicLabel(article.hero) : null} />
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

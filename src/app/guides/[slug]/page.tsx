import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import AppNav from '@/components/layout/AppNav'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default async function GuideDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('role, display_name, avatar_url').eq('id', user.id).single()
    profile = data
  }

  const admin = createAdminClient()
  const { data: guide } = await admin
    .from('guides')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!guide) notFound()

  const wordCount = guide.body.split(' ').length
  const readMinutes = Math.max(1, Math.round(wordCount / 200))

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
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3 }}>PEAKFORM</span>
          </Link>
          <div style={{ flex: 1 }} />
          <Link href="/guides" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guías</Link>
          <Link href="/experts" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
        </nav>
      )}

      <article style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 32, display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/guides" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Guías</Link>
          <span>›</span>
          <span>{guide.title}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          {guide.category && (
            <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 12 }}>
              {guide.category.toUpperCase()}
            </div>
          )}
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', letterSpacing: 1, color: 'var(--text)', margin: '0 0 16px', lineHeight: 1.1 }}>
            {guide.title}
          </h1>
          <div style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 16 }}>
            <span>{new Date(guide.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            <span>{readMinutes} min de lectura</span>
          </div>
        </div>

        {/* Body */}
        <div className="guide-body">
          <ReactMarkdown>{guide.body}</ReactMarkdown>
        </div>

        {/* Footer CTA */}
        <div style={{
          marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 20 }}>
            ¿Quieres aplicar estos consejos con un experto que revise tu gameplay en directo?
          </p>
          <Link href="/experts" className="btn btn-primary">VER EXPERTOS →</Link>
        </div>

      </article>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--accent)', letterSpacing: 2 }}>PEAKFORM</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/guides" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Guías</Link>
          <Link href="/experts" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/legal" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Legal</Link>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>© 2026 PeakForm</span>
      </footer>

    </div>
  )
}

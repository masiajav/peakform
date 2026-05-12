import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { createAdminClient } from '@/lib/supabase/admin'
import { announcementPath, articleDescription } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildMetadata({
  title: 'Patch notes de Overwatch',
  description: 'Últimas notas de parche de Overwatch importadas desde Blizzard y resumidas por Replaid Lab.',
  path: '/patch-notes',
})

export default async function PatchNotesPage() {
  noStore()

  const admin = createAdminClient()
  const { data: notes } = await admin
    .from('announcements')
    .select('*')
    .eq('published', true)
    .eq('content_type', 'patch_note')
    .order('created_at', { ascending: false })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <PublicNav />

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px 88px' }}>
        <header style={{ marginBottom: 40 }}>
          <div className="eyebrow">OVERWATCH</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 7vw, 68px)', letterSpacing: 0, color: 'var(--text)', margin: '0 0 12px', lineHeight: 0.98 }}>
            PATCH NOTES
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.65, margin: 0, maxWidth: 720 }}>
            Cambios oficiales publicados por Blizzard, organizados en Replaid Lab con resumen propio y enlace a la fuente original.
          </p>
        </header>

        {!notes || notes.length === 0 ? (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24 }}>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Todavía no hay patch notes importadas. La sincronización automática añadirá nuevas entradas cuando detecte cambios oficiales.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {notes.map((note: any) => (
              <Link key={note.id} href={announcementPath(note)} style={{ textDecoration: 'none' }}>
                <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '22px 24px' }}>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, letterSpacing: 0, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif' }}>
                      PATCH NOTE
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>
                      {new Date(note.source_published_at || note.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                    {note.auto_imported && (
                      <span style={{ fontSize: 11, color: 'var(--text3)' }}>
                        Blizzard
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: 0, color: 'var(--text)', margin: '0 0 10px' }}>
                    {note.title}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>
                    {articleDescription(note)}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

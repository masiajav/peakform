import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { createAdminClient } from '@/lib/supabase/admin'
import { announcementPath, articleDescription, type AnnouncementContent } from '@/lib/content'
import { resolveLegacyPatchArchive } from '@/lib/legacy-patch-archives'
import { buildMetadata } from '@/lib/seo'
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildMetadata({
  title: 'Patch notes de Overwatch',
  description: 'Resúmenes de parches de Overwatch por fecha: cambios de héroes, correcciones y eventos, con los modos de juego y su contexto histórico.',
  path: '/patch-notes',
  robots: { index: false, follow: true },
})

export default async function PatchNotesPage() {
  noStore()

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('announcements')
    .select('*')
    .eq('published', true)
    .eq('content_type', 'patch_note')
    .order('created_at', { ascending: false })

  if (error) throw new Error('No se han podido cargar las notas del parche')
  const notes = ((data || []) as AnnouncementContent[])
    .map(resolveLegacyPatchArchive)
    .sort((a, b) => Date.parse(b.source_published_at || b.created_at) - Date.parse(a.source_published_at || a.created_at))

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
            Consulta qué cambió en cada actualización. La fecha de cada nota corresponde a su parche; los eventos y las cifras antiguas no describen necesariamente el juego actual.
          </p>
        </header>

        {!notes || notes.length === 0 ? (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24 }}>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Todavía no hay notas publicadas. Puedes consultar las <a href="https://overwatch.blizzard.com/es-es/news/patch-notes/">patch notes oficiales de Overwatch</a>.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {notes.map(note => (
              <Link key={note.id} href={announcementPath(note)} style={{ textDecoration: 'none' }}>
                <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '22px 24px' }}>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, letterSpacing: 0, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif' }}>
                      PATCH NOTE
                    </span>
                    <time dateTime={note.source_published_at || note.created_at} style={{ fontSize: 11, color: 'var(--text2)' }}>
                      {new Date(note.source_published_at || note.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </time>
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

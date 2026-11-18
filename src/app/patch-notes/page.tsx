import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { createAdminClient } from '@/lib/supabase/admin'
import { announcementPath, articleDescription, type AnnouncementContent } from '@/lib/content'
import { resolveLegacyPatchArchive } from '@/lib/legacy-patch-archives'
import { publishedOverwatchPatches } from '@/lib/editorial-store'
import { buildMetadata } from '@/lib/seo'
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const patches = await publishedOverwatchPatches()
  return buildMetadata({
    title: 'Patch notes de Overwatch en español | Últimos parches',
    description: 'Consulta los últimos parches de Overwatch en español. Qué cambió en los héroes, qué modos se vieron afectados y cuándo se aplicó cada ajuste.',
    path: '/patch-notes',
    robots: { index: patches.length > 0, follow: true },
  })
}

const dateFormat = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
})

export default async function PatchNotesPage() {
  noStore()

  const admin = createAdminClient()
  const [patches, { data, error }] = await Promise.all([
    publishedOverwatchPatches(),
    admin.from('announcements').select('*')
      .eq('game', 'overwatch').eq('published', true).eq('content_type', 'patch_note')
      .order('created_at', { ascending: false }),
  ])
  if (error && !patches.length) throw new Error('No se han podido cargar las notas del parche')
  const currentPaths = new Set(patches.map(patch => patch.path))
  const archive = ((data ?? []) as AnnouncementContent[])
    .map(resolveLegacyPatchArchive)
    .filter(note => !currentPaths.has(announcementPath(note)))
    .sort((a, b) => Date.parse(b.source_published_at || b.created_at) - Date.parse(a.source_published_at || a.created_at))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <PublicNav />

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px 88px' }}>
        <header style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 7vw, 68px)', letterSpacing: 0, color: 'var(--text)', margin: '0 0 12px', lineHeight: 0.98 }}>
            Patch notes de Overwatch
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.65, margin: 0, maxWidth: 720 }}>
            Encuentra los cambios de balance, los hotfixes y las correcciones por fecha de publicación.
            Abre cada nota para ver a qué héroes y modos de juego afecta.
          </p>
        </header>

        {patches.length > 0 && (
          <section aria-labelledby="latest-patches" style={{ marginBottom: 36 }}>
            <h2 id="latest-patches" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, margin: '0 0 14px' }}>Últimos parches</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {patches.map(patch => (
                <PatchCard key={patch.path} href={patch.path} title={patch.title} date={patch.publishedAt} description={patch.description} />
              ))}
            </div>
          </section>
        )}

        {archive.length > 0 && (
          <section aria-labelledby="patch-archive">
            <h2 id="patch-archive" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, margin: '0 0 8px' }}>Archivo de parches</h2>
            <p style={{ fontSize: 14, color: 'var(--text2)', margin: '0 0 16px' }}>
              Las reglas y cifras de estas notas corresponden a la versión indicada en cada artículo.
            </p>
            <div style={{ display: 'grid', gap: 16 }}>
              {archive.map(note => (
                <PatchCard key={note.id} href={announcementPath(note)} title={note.title} date={note.source_published_at || note.created_at} description={articleDescription(note)} />
              ))}
            </div>
          </section>
        )}

        {!patches.length && !archive.length && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24 }}>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Todavía no hay notas publicadas. Puedes consultar las <a href="https://overwatch.blizzard.com/es-es/news/patch-notes/">patch notes oficiales de Overwatch</a>.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

function PatchCard({ href, title, date, description }: { href: string; title: string; date: string; description: string }) {
  return (
    <Link href={href} aria-label={title} style={{ textDecoration: 'none' }}>
      <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '22px 24px' }}>
        <time dateTime={date} style={{ fontSize: 12, color: 'var(--text2)' }}>{dateFormat.format(new Date(date))}</time>
        <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, color: 'var(--text)', margin: '6px 0 8px' }}>{title}</h3>
        <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>{description}</p>
      </article>
    </Link>
  )
}

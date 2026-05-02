import { createAdminClient } from '@/lib/supabase/admin'
import AnnouncementManager from './AnnouncementManager'
import GuideManager from './GuideManager'

export default async function ContentPage() {
  const admin = createAdminClient()

  const [{ data: announcements }, { data: guides }] = await Promise.all([
    admin.from('announcements').select('*').order('created_at', { ascending: false }),
    admin.from('guides').select('*').order('created_at', { ascending: false }),
  ])

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--yellow)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 6 }}>
          ADMINISTRACIÓN
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, letterSpacing: 1, color: 'var(--text)', margin: 0 }}>
          CONTENIDO
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <AnnouncementManager initialAnnouncements={announcements ?? []} />
        <GuideManager initialGuides={guides ?? []} />
      </div>
    </div>
  )
}

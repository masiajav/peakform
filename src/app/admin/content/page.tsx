import { createAdminClient } from '@/lib/supabase/admin'
import AnnouncementManager from './AnnouncementManager'
import GuideManager from './GuideManager'

export default async function ContentPage({searchParams}:{searchParams:Promise<{game?:string}>}) {
  const params=await searchParams
  const game=params.game === 'deadlock' ? 'deadlock' : 'overwatch'
  const admin = createAdminClient()

  const [{ data: announcements }, { data: guides }] = await Promise.all([
    admin.from('announcements').select('*').eq('game',game).order('created_at', { ascending: false }),
    admin.from('guides').select('*').eq('game',game).order('created_at', { ascending: false }),
  ])

  const {data:runs}=await admin.from('editorial_runs').select('id,started_at,status,summary').order('started_at',{ascending:false}).limit(8)
  const {data:pages}=await admin.from('editorial_pages').select('path,status,updated_at').eq('game',game).order('updated_at',{ascending:false})
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
        <form method="get" style={{marginBottom:24}}><label>Juego <select name="game" defaultValue={game}><option value="overwatch">Overwatch</option><option value="deadlock">Deadlock</option></select></label> <button type="submit" className="btn btn-secondary">Mostrar</button></form>
        <section><h2>Publicaciones automáticas</h2>{(pages??[]).map(p=><p key={p.path}><a href={p.path}>{p.path}</a> · {p.status} · {p.updated_at.slice(0,10)}</p>)}</section>
        <section><h2>Últimas ejecuciones</h2>{(runs??[]).map(r=><p key={r.id}>{r.started_at.slice(0,16)} · {r.status} · {JSON.stringify(r.summary)}</p>)}</section>
        {game === 'overwatch' && <><AnnouncementManager game={game} initialAnnouncements={announcements ?? []} /><GuideManager game={game} initialGuides={guides ?? []} /></>}
      </div>
    </div>
  )
}

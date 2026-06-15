import { createAdminClient } from '@/lib/supabase/admin'
import { announcementPath, guidePath } from '@/lib/content'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { TEAM_COMP_HEROES } from '@/lib/overwatch-team-comps'
import {
  PILLAR_COUNTER_SLUGS,
  PILLAR_HERO_SLUGS,
  PILLAR_TEAM_COMP_SLUGS,
  TRUST_ROUTES,
  UPCOMING_HERO_SLUGS,
  announcementQualityDecision,
  guideQualityDecision,
  isPathAdEligible,
  topicQualityDecision,
  type PageQualityDecision,
} from '@/lib/indexing-policy'

type AuditRow = {
  url: string
  type: string
  title: string
  decision: PageQualityDecision
}

export default async function QualityAuditPage() {
  const supabase = createAdminClient()
  const [{ data: guides }, { data: announcements }] = await Promise.all([
    supabase
      .from('guides')
      .select('title, slug, body, excerpt, seo_description, category, content_type, published, updated_at, created_at')
      .eq('published', true),
    supabase
      .from('announcements')
      .select('title, slug, body, excerpt, seo_description, content_type, published, updated_at, created_at')
      .eq('published', true),
  ])

  const staticRows: AuditRow[] = [
    '/',
    '/guides',
    '/heroes',
    '/counters',
    '/team-comps',
    '/news',
    '/patch-notes',
    '/overwatch-temporada-3-into-the-tigers-den',
    ...TRUST_ROUTES,
  ].map(path => ({
    url: path,
    type: 'static',
    title: path === '/' ? 'Home' : path,
    decision: {
      status: isPathAdEligible(path) ? 'index_ads' : 'index_no_ads',
      indexable: true,
      adsAllowed: isPathAdEligible(path),
      reason: isPathAdEligible(path) ? 'Ruta estatica apta para anuncios' : 'Ruta estatica indexable sin anuncios',
    },
  }))

  const guideRows: AuditRow[] = (guides ?? []).map((guide: any) => ({
    url: guidePath(guide.slug),
    type: 'guide',
    title: guide.title,
    decision: guideQualityDecision(guide),
  }))

  const announcementRows: AuditRow[] = (announcements ?? []).map((item: any) => ({
    url: announcementPath(item),
    type: item.content_type === 'patch_note' ? 'patch_note' : 'news',
    title: item.title,
    decision: announcementQualityDecision(item),
  }))

  const heroRows: AuditRow[] = [
    ...COUNTER_HEROES.map(hero => ({
      url: `/heroes/${hero.slug}`,
      type: 'hero',
      title: hero.name,
      decision: topicQualityDecision('hero', hero.slug),
    })),
    ...UPCOMING_HERO_SLUGS.map(slug => ({
      url: `/heroes/${slug}`,
      type: 'hero_pre_release',
      title: slug.toUpperCase(),
      decision: topicQualityDecision('hero', slug),
    })),
  ]

  const counterRows: AuditRow[] = COUNTER_HEROES.map(hero => ({
    url: `/counters/${hero.slug}`,
    type: 'counter',
    title: hero.name,
    decision: topicQualityDecision('counter', hero.slug),
  }))

  const teamCompRows: AuditRow[] = TEAM_COMP_HEROES.map(hero => ({
    url: `/team-comps/${hero.slug}`,
    type: 'team_comp',
    title: hero.name,
    decision: topicQualityDecision('team_comp', hero.slug),
  }))

  const rows = [...staticRows, ...guideRows, ...announcementRows, ...heroRows, ...counterRows, ...teamCompRows]
  const totals = {
    indexAds: rows.filter(row => row.decision.status === 'index_ads').length,
    indexNoAds: rows.filter(row => row.decision.status === 'index_no_ads').length,
    noindex: rows.filter(row => row.decision.status === 'noindex_no_ads').length,
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--yellow)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 6 }}>
          ADSENSE Y SEARCH
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, letterSpacing: 1, color: 'var(--text)', margin: 0 }}>
          AUDITORIA DE CALIDAD
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, maxWidth: 760 }}>
          Este reporte muestra qué URLs pueden indexarse, cuáles pueden mostrar anuncios y cuáles quedan fuera hasta tener más contenido editorial propio.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        <Metric label="INDEX + ADS" value={totals.indexAds} color="var(--green)" />
        <Metric label="INDEX + NO ADS" value={totals.indexNoAds} color="var(--yellow)" />
        <Metric label="NOINDEX + NO ADS" value={totals.noindex} color="var(--text3)" />
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 920 }}>
          <thead>
            <tr style={{ color: 'var(--text3)', fontSize: 11, letterSpacing: 1.2, fontFamily: 'Bebas Neue, sans-serif', textAlign: 'left' }}>
              <th style={cellHeader}>URL</th>
              <th style={cellHeader}>TIPO</th>
              <th style={cellHeader}>ESTADO</th>
              <th style={cellHeader}>INDEX</th>
              <th style={cellHeader}>ADS</th>
              <th style={cellHeader}>PALABRAS</th>
              <th style={cellHeader}>MOTIVO</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={`${row.type}:${row.url}`} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={cellBody}>
                  <a href={row.url} style={{ color: 'var(--text)', textDecoration: 'none' }}>{row.url}</a>
                  <div style={{ color: 'var(--text3)', fontSize: 11, marginTop: 3 }}>{row.title}</div>
                </td>
                <td style={cellBody}>{row.type}</td>
                <td style={{ ...cellBody, color: statusColor(row.decision.status), fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 0.8 }}>
                  {row.decision.status}
                </td>
                <td style={cellBody}>{row.decision.indexable ? 'Si' : 'No'}</td>
                <td style={cellBody}>{row.decision.adsAllowed ? 'Si' : 'No'}</td>
                <td style={cellBody}>{row.decision.wordCount ?? '-'}</td>
                <td style={{ ...cellBody, color: 'var(--text2)', maxWidth: 340 }}>{row.decision.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 18, color: 'var(--text3)', fontSize: 12 }}>
        Pilares actuales: héroes {PILLAR_HERO_SLUGS.length}, counters {PILLAR_COUNTER_SLUGS.length}, composiciones {PILLAR_TEAM_COMP_SLUGS.length}. SHION queda como héroe pilar indexable sin anuncios hasta completar la guía definitiva.
      </div>
    </div>
  )
}

function Metric({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px 20px' }}>
      <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color, letterSpacing: 1 }}>
        {value}
      </div>
    </div>
  )
}

function statusColor(status: PageQualityDecision['status']) {
  if (status === 'index_ads') return 'var(--green)'
  if (status === 'index_no_ads') return 'var(--yellow)'
  return 'var(--text3)'
}

const cellHeader = {
  padding: '12px 14px',
  borderBottom: '1px solid var(--border)',
} as const

const cellBody = {
  padding: '12px 14px',
  color: 'var(--text2)',
  fontSize: 12,
  verticalAlign: 'top',
} as const

import Image from 'next/image'
import Link from 'next/link'
import JsonLd from './JsonLd'
import SeoFaq from './SeoFaq'
import PublicNav from '@/components/layout/PublicNav'
import type { MapPillar } from '@/lib/overwatch-maps'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'

const ROLE_LABELS = { tank: 'Tank', dps: 'DPS', support: 'Support' } as const

export default function MapPillarPage({ map }: { map: MapPillar }) {
  const pageUrl = absoluteUrl(`/maps/${map.slug}`)
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: map.seoTitle,
    description: map.seoDescription,
    url: pageUrl,
    inLanguage: 'es',
    dateModified: map.updatedAtIso,
    publisher: { '@type': 'Organization', name: SITE_NAME },
    about: {
      '@type': 'VideoGame',
      name: 'Overwatch',
    },
    contentLocation: { '@type': 'Place', name: map.name },
  }
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: map.seoTitle,
    description: map.seoDescription,
    image: absoluteUrl(map.image),
    url: pageUrl,
    inLanguage: 'es',
    datePublished: map.updatedAtIso,
    dateModified: map.updatedAtIso,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    about: [
      { '@type': 'VideoGame', name: 'Overwatch' },
      { '@type': 'Place', name: map.name },
    ],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Mapas', item: absoluteUrl('/maps') },
      { '@type': 'ListItem', position: 2, name: map.name, item: pageUrl },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PublicNav />

      <main className="map-pillar-page">
        <div className="map-breadcrumb">
          <Link href="/maps">Mapas</Link><span>/</span><span>{map.name}</span>
        </div>

        <header className="map-pillar-hero">
          <Image
            src={map.image}
            alt={map.imageAlt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1180px"
            className="map-pillar-hero-image"
          />
          <div className="map-pillar-hero-shade" />
          <div className="map-pillar-hero-copy">
            <div className="eyebrow">GUÍA DE MAPA · {map.mode.toUpperCase()}</div>
            <h1>{map.name}</h1>
            <p>{map.seoDescription}</p>
          </div>
        </header>

        <div className="map-meta-strip">
          <Meta label="Modo" value={map.mode} />
          <Meta label="Localización" value={map.location} />
          <Meta label="Última revisión" value={map.updatedAt} />
        </div>

        <section className="map-copy-intro">
          {map.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section className="map-section">
          <div className="eyebrow">LECTURA RÁPIDA</div>
          <h2>Qué decide una partida en {map.name}</h2>
          <div className="map-card-grid three">
            {map.quickRead.map(item => <InfoCard key={item.title} {...item} />)}
          </div>
        </section>

        <section className="map-section">
          <div className="eyebrow">RECORRIDO</div>
          <h2>Cómo jugar cada fase</h2>
          <div className="map-phase-list">
            {map.phases.map((phase, index) => (
              <article key={phase.name} className="map-phase">
                <div className="map-phase-number">0{index + 1}</div>
                <div className="map-phase-content">
                  <h3>{phase.name}</h3>
                  <div className="map-phase-columns">
                    <div><strong>ATAQUE</strong><p>{phase.attack}</p></div>
                    <div><strong>DEFENSA</strong><p>{phase.defense}</p></div>
                  </div>
                  <div className="map-vod-note"><strong>EN LA VOD</strong><span>{phase.vodReview}</span></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="map-section map-two-column">
          <div>
            <div className="eyebrow">ATAQUE</div>
            <h2>Plan para avanzar</h2>
            <DecisionList items={map.attackPlan} />
          </div>
          <div>
            <div className="eyebrow">DEFENSA</div>
            <h2>Plan para frenar</h2>
            <DecisionList items={map.defensePlan} />
          </div>
        </section>

        <section className="map-section">
          <div className="eyebrow">HÉROES</div>
          <h2>Picks que encajan bien</h2>
          <p className="map-section-lead">No son picks obligatorios. Son héroes con herramientas útiles para la geometría y el ritmo del mapa.</p>
          <div className="map-hero-grid">
            {map.heroPicks.map(hero => (
              <Link key={hero.slug} href={`/heroes/${hero.slug}`} className="map-hero-pick">
                <div><strong>{hero.name}</strong><span>{ROLE_LABELS[hero.role]}</span></div>
                <p>{hero.reason}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="map-section">
          <div className="eyebrow">COMPOSICIONES</div>
          <h2>Dos planes de equipo</h2>
          <div className="map-composition-grid">
            {map.compositions.map(composition => (
              <article key={composition.name} className="map-composition">
                <h3>{composition.name}</h3>
                <div className="map-lineup">{composition.lineup.map(hero => <span key={hero}>{hero}</span>)}</div>
                <strong>PLAN</strong><p>{composition.plan}</p>
                <strong>PUNTO DÉBIL</strong><p>{composition.weakness}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="map-section map-two-column">
          <div>
            <div className="eyebrow">ERRORES</div>
            <h2>Lo que más cuesta partidas</h2>
            <ul className="map-checklist danger">{map.mistakes.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <div className="eyebrow">REVISIÓN</div>
            <h2>Checklist para tu VOD</h2>
            <ul className="map-checklist">{map.vodChecklist.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <SeoFaq items={map.faq} title={`Preguntas sobre ${map.name}`} />

        <section className="map-related">
          <div><div className="eyebrow">SIGUIENTE PASO</div><h2>Contenido relacionado</h2></div>
          <div>{map.relatedLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
        </section>
      </main>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return <div><span>{label}</span><strong>{value}</strong></div>
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return <article className="map-info-card"><h3>{title}</h3><p>{body}</p></article>
}

function DecisionList({ items }: { items: { title: string; body: string }[] }) {
  return <div className="map-decision-list">{items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { getMapsByMode, MAP_CATALOG, MAP_MODE_ORDER } from '@/lib/overwatch-map-catalog'
import { MAP_PILLARS } from '@/lib/overwatch-maps'
import { absoluteUrl, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Mapas de Overwatch: rutas, composiciones y consejos',
  description: 'Guías de mapas de Overwatch en español: ataque, defensa, rutas, héroes, composiciones, errores frecuentes y checklist para revisar tus partidas.',
  path: '/maps',
})

export default function MapsPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Guías de mapas de Overwatch',
    itemListElement: MAP_PILLARS.map((map, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: map.name,
      url: absoluteUrl(`/maps/${map.slug}`),
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={itemListJsonLd} />
      <PublicNav />
      <main className="maps-hub">
        <header className="maps-hub-header">
          <div className="eyebrow">GUÍAS DE OVERWATCH</div>
          <h1>MAPAS DE OVERWATCH</h1>
          <p>Consulta todos los mapas principales de Overwatch por modo. Las guías completas explican dónde pelear, cuándo rotar y qué revisar después de una derrota.</p>
        </header>

        <section className="maps-hub-grid" aria-label="Mapas con guía completa">
          {MAP_PILLARS.map((map, index) => (
            <Link key={map.slug} href={`/maps/${map.slug}`} className="map-hub-card">
              <article>
                <div className="map-hub-image">
                  <Image src={map.image} alt={map.imageAlt} fill priority={index === 0} sizes="(max-width: 760px) 100vw, 560px" />
                </div>
                <div className="map-hub-card-copy">
                  <span>{map.mode} · {map.location}</span>
                  <h2>{map.name}</h2>
                  <p>{map.seoDescription}</p>
                  <strong>ABRIR GUÍA →</strong>
                </div>
              </article>
            </Link>
          ))}
        </section>

        <section className="map-catalog-section" aria-labelledby="map-catalog-title">
          <div className="map-catalog-heading">
            <div>
              <div className="eyebrow">CATÁLOGO COMPLETO</div>
              <h2 id="map-catalog-title">Todos los mapas por modo</h2>
            </div>
            <span>{MAP_PILLARS.length} guías completas · {MAP_CATALOG.length} mapas</span>
          </div>

          <div className="map-catalog-groups">
            {MAP_MODE_ORDER.map(mode => {
              const maps = getMapsByMode(mode)

              return (
                <section key={mode} className="map-catalog-group" aria-labelledby={`map-mode-${mode}`}>
                  <header>
                    <h3 id={`map-mode-${mode}`}>{mode}</h3>
                    <span>{maps.length}</span>
                  </header>
                  <div className="map-catalog-list">
                    {maps.map(map => {
                      const ready = MAP_PILLARS.some(pillar => pillar.slug === map.slug)
                      const content = (
                        <>
                          <div><strong>{map.name}</strong><span>{map.location}</span></div>
                          <small>{ready ? 'GUÍA COMPLETA →' : 'EN PREPARACIÓN'}</small>
                        </>
                      )

                      return ready
                        ? <Link key={map.slug} href={`/maps/${map.slug}`} className="map-catalog-item is-ready">{content}</Link>
                        : <div key={map.slug} className="map-catalog-item">{content}</div>
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        </section>

        <section className="maps-hub-method">
          <div><div className="eyebrow">CÓMO USARLAS</div><h2>Del mapa a una decisión concreta</h2></div>
          <div className="map-card-grid three">
            <article><strong>01</strong><h3>Identifica la fase</h3><p>No revises toda la partida a la vez. Empieza por el punto o tramo donde el equipo dejó de controlar espacio.</p></article>
            <article><strong>02</strong><h3>Define cómo ganar la pelea</h3><p>Comprueba si tu composición quería cerrar distancia, mantener líneas de visión o hacer dive sobre una zona concreta.</p></article>
            <article><strong>03</strong><h3>Revisa la VOD</h3><p>Anota posición, recursos y salida antes de valorar la puntería. El mapa suele explicar errores que parecían mecánicos.</p></article>
          </div>
        </section>
      </main>
    </div>
  )
}

import Link from 'next/link'
import AdSlot from './AdSlot'
import ArticleCta from './ArticleCta'
import JsonLd from './JsonLd'
import SeoFaq from './SeoFaq'
import type { EvergreenGuide } from '@/lib/evergreen-guides'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'

type EvergreenGuideArticleProps = {
  guide: EvergreenGuide
}

export default function EvergreenGuideArticle({ guide }: EvergreenGuideArticleProps) {
  const pageUrl = absoluteUrl(`/guides/${guide.slug}`)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: guide.seoTitle,
    description: guide.seoDescription,
    datePublished: guide.publishedAtIso,
    dateModified: guide.modifiedAtIso,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: pageUrl,
    inLanguage: 'es',
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Guías', item: absoluteUrl('/guides') },
      { '@type': 'ListItem', position: 2, name: guide.title, item: pageUrl },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <main className="guide-detail-main" style={{ maxWidth: 920, margin: '0 auto', padding: '56px 24px 88px' }}>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/guides" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Guías</Link>
          <span>/</span>
          <span>{guide.title}</span>
        </div>

        <header style={{ marginBottom: 34 }}>
          <div className="eyebrow">{guide.kicker.toUpperCase()}</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 7vw, 70px)', lineHeight: 0.96, letterSpacing: 1, margin: '0 0 18px' }}>
            {guide.h1}
          </h1>
          <div style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.72, display: 'grid', gap: 12, maxWidth: 820 }}>
            {guide.intro.map(paragraph => (
              <p key={paragraph} style={{ margin: 0 }}>{paragraph}</p>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', color: 'var(--text3)', fontSize: 12, marginTop: 18 }}>
            <span>Replaid Lab</span>
            <span>Actualizada: {guide.updatedAt}</span>
            <span>Guía evergreen</span>
          </div>
        </header>

        <section className="guide-video-summary">
          <div>RESPUESTA RÁPIDA</div>
          <p>{guide.quickAnswer}</p>
        </section>

        <AdSlot variant="inline" slot="guide-after-summary" allowAds />

        <article className="guide-body">
          {guide.sections.map(section => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <h2>Checklist antes de jugar</h2>
          <ul>
            {guide.checklist.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>Rutas relacionadas</h2>
          <p>
            Usa esta guía como punto de partida y baja después al problema concreto: héroes, counters, composiciones, VOD o revisión con experto.
          </p>
          <div className="guide-cluster-links" style={{ marginBottom: 28 }}>
            {guide.links.map(link => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </div>
        </article>

        <SeoFaq items={guide.faqs} title="Preguntas frecuentes" />
        <ArticleCta />
      </main>
    </div>
  )
}

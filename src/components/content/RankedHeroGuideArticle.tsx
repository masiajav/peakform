import Image from 'next/image'
import Link from 'next/link'
import JsonLd from './JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import type { RankedHeroGuide } from '@/lib/ranked-hero-guides'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'

export default function RankedHeroGuideArticle({ guide }: { guide: RankedHeroGuide }) {
  const path = `/guides/${guide.slug}`
  const pageUrl = absoluteUrl(path)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: guide.title,
      description: guide.seoDescription,
      image: absoluteUrl(`/heroes/${guide.heroSlug}.png`),
      datePublished: guide.publishedAt,
      dateModified: guide.modifiedAt,
      author: { '@type': 'Organization', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: pageUrl,
      inLanguage: 'es',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Guías', item: absoluteUrl('/guides') },
        { '@type': 'ListItem', position: 2, name: guide.heroName, item: absoluteUrl(`/heroes/${guide.heroSlug}`) },
        { '@type': 'ListItem', position: 3, name: guide.title, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={jsonLd} />
      <PublicNav />
      <main className="seo-pillar-page">
        <nav className="seo-pillar-breadcrumb" aria-label="Migas de pan">
          <Link href="/guides">Guías</Link><span>/</span><Link href={`/heroes/${guide.heroSlug}`}>{guide.heroName}</Link><span>/</span><span>Ranked</span>
        </nav>

        <header className="seo-pillar-hero">
          <div>
            <div className="eyebrow">GUÍA DE {guide.roleLabel.toUpperCase()} · RANKED</div>
            <h1>{guide.title}</h1>
            <div className="seo-pillar-intro">{guide.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="seo-pillar-meta">
              <span>Por Replaid Lab</span>
              <span>Última revisión: {guide.updatedAt}</span>
              <Link href="/contact" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Comunicar una corrección</Link>
            </div>
          </div>
          <div className="seo-pillar-portrait">
            <Image src={`/heroes/${guide.heroSlug}.png`} alt={`${guide.heroName} en Overwatch`} fill priority sizes="(max-width: 760px) 100vw, 360px" />
          </div>
        </header>

        <section className="seo-pillar-section">
          <div className="eyebrow">RESPUESTA RÁPIDA</div>
          <h2>La idea que debe ordenar tu partida</h2>
          <div className="seo-pillar-intro"><p>{guide.quickAnswer}</p></div>
        </section>

        {guide.sections.map((section, index) => (
          <section className="seo-pillar-section" key={section.title}>
            <div className="eyebrow">{String(index + 1).padStart(2, '0')} · FUNDAMENTO</div>
            <h2>{section.title}</h2>
            <div className="seo-pillar-intro">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
            {section.points && <ul className="seo-pillar-checklist compact" style={{ marginTop: 22 }}>{section.points.map(point => <li key={point}>{point}</li>)}</ul>}
          </section>
        ))}

        <section className="seo-pillar-section seo-pillar-two-column">
          <div>
            <div className="eyebrow">REVISIÓN DE VOD</div>
            <h2>Cinco preguntas para tu replay</h2>
            <ol className="seo-pillar-steps">{guide.vodQuestions.map(question => <li key={question}>{question}</li>)}</ol>
          </div>
          <div>
            <div className="eyebrow">ANTES DE LA COLA</div>
            <h2>Checklist de {guide.heroName}</h2>
            <ul className="seo-pillar-checklist">{guide.checklist.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="seo-pillar-section">
          <div className="eyebrow">DUDAS HABITUALES</div>
          <h2>Preguntas sobre {guide.heroName}</h2>
          <div className="seo-pillar-faq">{guide.faqs.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </section>

        <section className="seo-pillar-related">
          <div>
            <div className="eyebrow">SIGUE MEJORANDO</div>
            <h2>Continúa por el problema que tengas</h2>
            <p style={{ color: 'var(--text2)', maxWidth: 620, lineHeight: 1.7 }}>La siguiente lectura depende de lo que haya fallado: matchup, composición, cooldowns o fundamentos del rol.</p>
          </div>
          <div className="seo-pillar-related-links">{guide.links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
        </section>
      </main>
    </div>
  )
}

import JsonLd from './JsonLd'

export type SeoFaqItem = {
  question: string
  answer: string
}

type SeoFaqProps = {
  items: SeoFaqItem[]
  title?: string
}

export default function SeoFaq({ items, title = 'Preguntas frecuentes' }: SeoFaqProps) {
  if (items.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section style={{ marginTop: 36 }}>
      <JsonLd data={jsonLd} />
      <div className="eyebrow">FAQ</div>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 30, letterSpacing: 1, margin: '0 0 14px' }}>
        {title}
      </h2>
      <div style={{ display: 'grid', gap: 10 }}>
        {items.map(item => (
          <article key={item.question} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 18 }}>
            <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 20, letterSpacing: 0.7, margin: '0 0 7px' }}>
              {item.question}
            </h3>
            <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

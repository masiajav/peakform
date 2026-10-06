import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/content/JsonLd'
import ReviewedHeroPillarPage from '@/components/content/ReviewedHeroPillarPage'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'
import { isPillarCounterSlug, isPillarTeamCompSlug, robotsForQuality, topicQualityDecision } from '@/lib/indexing-policy'
import { getHeroPillar, type HeroPillar } from '@/lib/hero-pillars'
import { getHeroPortrait } from '@/lib/overwatch-hero-portraits'
import { safeTopicHref } from '@/lib/topic-links'


export async function generateMetadata(props: { params: Promise<{ hero: string }> }): Promise<Metadata> {
  const params = await props.params;
  const quality = topicQualityDecision('hero', params.hero)
  const pillar = getHeroPillar(params.hero)

  if (pillar) {
    return buildMetadata({
      title: heroCtrTitle(pillar),
      description: heroCtrDescription(pillar),
      path: `/heroes/${params.hero}`,
      image: getHeroPortrait(params.hero) || undefined,
      robots: robotsForQuality(quality) ?? { index: true, follow: true },
    })
  }

  return {}
}

export default async function HeroPage(props: { params: Promise<{ hero: string }> }) {
  const params = await props.params;
  const pillar = getHeroPillar(params.hero)

  if (pillar) {
    return pillar.schemaDate && pillar.headerTips && pillar.quickAnswers
      ? <ReviewedHeroPillarPage pillar={pillar} />
      : <HeroPillarPage pillar={pillar} />
  }

  notFound()
}

function HeroPillarPage({ pillar }: { pillar: HeroPillar }) {
  const image = getHeroPortrait(pillar.slug)
  const pageUrl = absoluteUrl(`/heroes/${pillar.slug}`)
  const quickAnswers = buildHeroQuickAnswers(pillar)
  const headerTips = buildHeroHeaderTips(pillar)
  const counterHref = isPillarCounterSlug(pillar.slug) ? `/counters/${pillar.slug}` : '/counters'
  const teamCompHref = isPillarTeamCompSlug(pillar.slug) ? `/team-comps/${pillar.slug}` : '/team-comps'
  const abilityKitImage = pillar.slug === 'dmon' ? '/heroes/dmon-ability-kit.png' : null
  const isDoctrine = pillar.slug === 'doctrine'
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: heroCtrTitle(pillar),
    description: heroCtrDescription(pillar),
    image: image ? absoluteUrl(image) : undefined,
    url: pageUrl,
    datePublished: isDoctrine ? '2026-09-12' : pillar.slug === 'dmon' ? '2026-08-06' : '2026-06-26',
    dateModified: isDoctrine || pillar.slug === 'dmon' ? '2026-10-01' : '2026-07-24',
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: pageUrl,
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Héroes', item: absoluteUrl('/heroes') },
      { '@type': 'ListItem', position: 2, name: pillar.name, item: pageUrl },
    ],
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pillar.faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 24px 88px' }}>
        <div style={{ marginBottom: 28, fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/heroes" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Héroes</Link>
          <span>/</span>
          <span>{pillar.name}</span>
        </div>

        <header style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(280px, 0.75fr)', gap: 24, alignItems: 'center', marginBottom: 28 }} className="home-hero-grid">
          <div>
            <div className="eyebrow">{pillar.role.toUpperCase()} · GUÍA DE RANKED</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 8vw, 78px)', letterSpacing: 1, lineHeight: 0.95, margin: '0 0 16px' }}>
              {pillar.h1}
            </h1>
            <div style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.75, display: 'grid', gap: 12, marginBottom: 18, maxWidth: 800 }}>
              {pillar.intro.map(paragraph => (
                <p key={paragraph} style={{ margin: 0 }}>{paragraph}</p>
              ))}
            </div>
            <div style={{ display: 'grid', gap: 10, margin: '0 0 18px', maxWidth: 800 }}>
              {headerTips.map(item => (
                <div key={item} style={{ display: 'grid', gridTemplateColumns: '18px minmax(0, 1fr)', gap: 9, alignItems: 'start', color: 'var(--text2)', fontSize: 13, lineHeight: 1.55 }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 17, lineHeight: 1 }}>-</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <MetaPill label="Actualizado" value={pillar.updatedAt} />
              <MetaPill label="Rol" value={pillar.role} />
              <MetaPill label="Autor" value="Replaid Lab" />
              <Link href="/contact" style={{ color: 'var(--text3)', fontSize: 12, alignSelf: 'center' }}>Comunicar una corrección</Link>
            </div>
          </div>

          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div
              style={{
                position: 'relative',
                height: 330,
                background:
                  'radial-gradient(circle at 50% 20%, rgba(255, 92, 37, 0.16), transparent 42%), linear-gradient(180deg, var(--surface2), var(--bg))',
              }}
            >
              {image ? (
                <Image
                  src={image}
                  alt={`${pillar.name} en Overwatch`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  style={{ boxSizing: 'border-box', objectFit: 'contain', objectPosition: 'center bottom', padding: 24 }}
                />
              ) : (
                <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 84 }}>
                  {pillar.name.slice(0, 1)}
                </div>
              )}
            </div>
            <div style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
              {pillar.facts.map(fact => (
                <div key={fact.title}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.3 }}>{fact.title}</div>
                  <div style={{ color: 'var(--text)', fontSize: 13, lineHeight: 1.45 }}>{fact.body}</div>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <section style={{ ...sectionStyle, borderColor: 'rgba(255, 92, 42, 0.45)', background: 'linear-gradient(135deg, rgba(255, 92, 42, 0.10), var(--surface) 42%)' }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>EN CORTO</div>
          <h2 style={headingStyle}>{pillar.name} en 30 segundos: lo importante</h2>
          <div style={cardGridStyle}>
            {quickAnswers.map(item => (
              <article key={item.title} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.8, margin: '0 0 8px' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{item.body}</p>
              </article>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            <Link href={counterHref} className="btn btn-primary btn-sm">VER COUNTERS</Link>
            <Link href={teamCompHref} className="btn btn-secondary btn-sm">VER COMPS</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RESUMEN</div>
          <h2 style={headingStyle}>{pillar.kicker}</h2>
          <div style={cardGridStyle}>
            {pillar.facts.map(fact => (
              <StatusCard key={fact.title} title={fact.title} body={fact.body} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PLAN DE JUEGO</div>
          <h2 style={headingStyle}>Cómo jugar {pillar.name} en ranked</h2>
          <NumberedList items={pillar.rankedPlan} />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>CLAVES</div>
          <h2 style={headingStyle}>Decisiones que marcan la diferencia</h2>
          <div style={cardGridStyle}>
            {pillar.sections.map(section => (
              <StatusCard key={section.title} title={section.title} body={section.body} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>KIT</div>
          <h2 style={headingStyle}>Habilidades de {pillar.name}</h2>
          {abilityKitImage && (
            <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--surface2)', border: '1px solid var(--border2)', marginBottom: 16, overflow: 'hidden' }}>
              <Image
                src={abilityKitImage}
                alt="Kit de habilidades y perks de D.Mon en Overwatch"
                fill
                sizes="(max-width: 768px) 100vw, 1120px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          <div style={cardGridStyle}>
            {pillar.abilities.map(ability => (
              <StatusCard key={ability.title} title={ability.title} body={ability.body} />
            ))}
          </div>
        </section>

        {pillar.perks && (
          <section style={sectionStyle}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>PERKS</div>
            <h2 style={headingStyle}>Perks de {pillar.name}</h2>
            <div style={cardGridStyle}>
              {pillar.perks.map(perk => (
                <StatusCard key={perk.title} title={perk.title} body={perk.body} />
              ))}
            </div>
          </section>
        )}

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>ERRORES COMUNES</div>
          <h2 style={headingStyle}>Errores que debes evitar con {pillar.name}</h2>
          <TextChecklist items={pillar.mistakes} />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>COUNTERS</div>
          <h2 style={headingStyle}>Counters y amenazas contra {pillar.name}</h2>
          <div style={cardGridStyle}>
            {pillar.counters.map(counter => (
              <StatusCard key={counter.title} title={counter.title} body={counter.body} badge="Amenaza" />
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href={counterHref} className="btn btn-primary btn-sm">VER COUNTERS DE {pillar.name.toUpperCase()}</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Cómo jugar contra sus counters</h2>
          <TextChecklist items={pillar.counterplay} />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>COMPOSICIONES</div>
          <h2 style={headingStyle}>Composiciones buenas con {pillar.name}</h2>
          <div style={cardGridStyle}>
            {pillar.compositions.map(comp => (
              <StatusCard key={comp.title} title={comp.title} body={comp.body} />
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href={teamCompHref} className="btn btn-secondary btn-sm">VER COMPOSICIONES</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>VOD REVIEW</div>
          <h2 style={headingStyle}>Qué revisar en tu VOD como {pillar.name}</h2>
          <NumberedList items={pillar.vodReview} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
            <Link href="/guides/como-mejorar-en-overwatch-revisando-vod" className="btn btn-secondary btn-sm">CÓMO REVISAR UNA VOD</Link>
            <Link href="/experts" className="btn btn-primary btn-sm">VER EXPERTOS</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>CHECKLIST</div>
          <h2 style={headingStyle}>Checklist rápido antes de ranked</h2>
          <TextChecklist items={pillar.checklist} />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PREGUNTAS RÁPIDAS</div>
          <h2 style={headingStyle}>FAQ de {pillar.name}</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {pillar.faqs.map(item => (
              <article key={item.question} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.8, margin: '0 0 8px' }}>
                  {item.question}
                </h3>
                <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>SIGUIENTE PASO</div>
          <h2 style={headingStyle}>Más contenido relacionado con {pillar.name}</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {pillar.links.map(link => (
              <Link key={link.href} href={safeTopicHref(link.href)} className={link.href === '/experts' ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}>
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}


function StatusCard({ title, body, badge }: { title: string; body: string; badge?: string }) {
  return (
    <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16, minHeight: 154 }}>
      {badge && (
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.4, marginBottom: 8 }}>
          {badge.toUpperCase()}
        </div>
      )}
      <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.8, margin: '0 0 8px' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{body}</p>
    </article>
  )
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {items.map((item, index) => (
        <div key={item} style={{ display: 'grid', gridTemplateColumns: '34px minmax(0, 1fr)', gap: 12, alignItems: 'start' }}>
          <span style={{ border: '1px solid var(--border2)', background: 'var(--surface2)', color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, display: 'grid', placeItems: 'center', minHeight: 34 }}>
            {index + 1}
          </span>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.75, margin: 0 }}>{item}</p>
        </div>
      ))}
    </div>
  )
}

function TextChecklist({ items }: { items: string[] }) {
  return (
    <div style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, display: 'grid', gap: 10 }}>
      {items.map(item => (
        <div key={item} style={{ display: 'grid', gridTemplateColumns: '22px minmax(0, 1fr)', gap: 10 }}>
          <span style={{ color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18 }}>-</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '9px 12px' }}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 10, letterSpacing: 1.3 }}>{label}</div>
      <div style={{ color: 'var(--text)', fontSize: 12 }}>{value}</div>
    </div>
  )
}

function heroCtrTitle(pillar: HeroPillar) {
  return pillar.seoTitle
}

function heroCtrDescription(pillar: HeroPillar) {
  return pillar.seoDescription
}

function buildHeroHeaderTips(pillar: HeroPillar) {
  const firstCounter = pillar.counters[0]?.title
  const firstComp = pillar.compositions[0]?.title

  if (pillar.slug === 'tracer') {
    return [
      'Para jugar Tracer: entra cuando tu equipo ya esté presionando, no cuando el rival todavía puede girarse gratis.',
      'Para frenarla: no la persigas por tilt; protege la backline, limpia rutas y castiga cuando gaste Recall.',
      'Mejor contexto: dive o presión lateral doble. Si cada uno entra a un timing distinto, Tracer se queda haciendo ruido sin convertir nada.',
    ]
  }

  if (pillar.slug === 'zarya') {
    return [
      'Para jugar Zarya: usa burbujas para negar una amenaza concreta, no para ver si alguien te dispara.',
      'Para jugar contra ella: no le cargues gratis. Espera burbujas, kitea y fuerza peleas donde no pueda tocarte cómoda.',
      'Mejor contexto: brawl y rush. Si la pelea ocurre en campo abierto o contra mucha verticalidad, Zarya sufre bastante más.',
    ]
  }

  if (pillar.slug === 'dmon') {
    return [
      'Para jugar D.Mon: pruébala como Tank primero y como personaje nuevo después. Lo importante será crear espacio sin regalar todos los recursos de Beast.',
      'Para jugar contra ella: empieza por respuestas anti-tank claras como Zarya, Symmetra, Reaper, Ana o Zenyatta mientras se entiende el kit real.',
      'Mejor contexto inicial: brawl, rush o peleas de esquina. Si el mapa exige mucho poke largo, habrá que ver si su movilidad compensa.',
    ]
  }

  if (pillar.slug === 'doctrine') {
    return [
      'Para jugar Doctrine: decide antes de usar Imbuir si necesitas mejorar el disparo, volar con Impulso velado o recibir el efecto de los drones.',
      'Para jugar contra él: divide la presión y fuerza Impulso velado antes de comprometer el dive. Sin movilidad tiene menos margen para alternar entre curar y defenderse.',
      'Mejor contexto inicial: ángulos de media distancia desde los que pueda ver a aliados y enemigos, con un compañero capaz de aprovechar la velocidad de ataque de los drones.',
    ]
  }

  return [
    `Para jugar ${pillar.name}: busca valor con timing, no por inercia ni por ego.`,
    firstCounter
      ? `Para jugar contra ${pillar.name}: respeta a ${firstCounter} y cambia ritmo antes de cambiar de pick.`
      : `Para jugar contra ${pillar.name}: revisa qué cooldown rival te corta el plan antes de entrar.`,
    firstComp
      ? `Mejor contexto: ${firstComp}; peor si tu equipo no puede seguir tu ventana.`
      : 'Mejor contexto: una comp que pueda seguir tu ventana y no te deje solo.',
  ]
}

function buildHeroQuickAnswers(pillar: HeroPillar) {
  const firstCounter = pillar.counters[0]?.title
  const firstComp = pillar.compositions[0]?.title
  const firstMistake = pillar.mistakes[0]

  if (pillar.slug === 'tracer') {
    return [
      {
        title: 'Si vas a jugar Tracer',
        body: 'Piensa en presión, no en persecución. Entra por una ruta con salida, fuerza un cooldown y vuelve a desaparecer antes de quedarte sin blinks.',
      },
      {
        title: 'Si la tienes enfrente',
        body: 'No hace falta correr detrás de ella. Juega cerca de tu support vulnerable, guarda una respuesta para cuando gaste Recall y no le des duelos largos gratis.',
      },
      {
        title: 'Cuándo se siente fuerte',
        body: 'Cuando tu equipo ya está tocando la frontline y Tracer puede entrar por el lateral. Si entra sola antes que todos, normalmente solo fuerza Recall y se va.',
      },
    ]
  }

  if (pillar.slug === 'zarya') {
    return [
      {
        title: 'Si vas a jugar Zarya',
        body: 'No busques energía por ego. Guarda burbujas para el momento en que el rival se compromete y pelea cerca de esquinas para no gastar todo solo por cruzar.',
      },
      {
        title: 'Si la tienes enfrente',
        body: 'Deja de disparar burbujas por reflejo. Kitea, juega a rango o desde verticalidad y castígala cuando ya no tenga recursos para sostener el avance.',
      },
      {
        title: 'Cuándo se siente fuerte',
        body: 'Cuando la pelea ocurre en corto, su equipo entra junto y las burbujas convierten el focus rival en energía. En abierto o contra flyers, pierde mucha comodidad.',
      },
    ]
  }

  if (pillar.slug === 'dmon') {
    return [
      {
        title: 'Si vas a jugar D.Mon',
        body: 'No entres a ranked solo por hype. Primero entiende cómo Beast crea espacio, qué recurso te salva cuando te focusean y cuándo tu equipo puede seguir tu engage.',
      },
      {
        title: 'Si la tienes enfrente',
        body: 'No cambies por reflejo, pero prueba respuestas anti-tank sólidas: beams, anti-heal, Discord, control y héroes que castiguen entradas lineales.',
      },
      {
        title: 'Fecha y rol',
        body: 'D.Mon ya está disponible desde el 11 de agosto de 2026 como Tank. Su kit base mezcla Plasma Saber, Power Barrier, Propulsors, Surging Strike, Fusion Repeater, Limit Break y el ciclo de piloto con Eject y Call Mech.',
      },
    ]
  }

  if (pillar.slug === 'doctrine') {
    return [
      {
        title: 'Si vas a jugar Doctrine',
        body: 'Piensa como Support antes que como duelista. Colócate donde puedas curar y presionar sin cruzarte, y cambia de objetivo en cuanto la pelea pida otra prioridad.',
      },
      {
        title: 'Si lo tienes enfrente',
        body: 'No le regales un ángulo cómodo. Divide la presión, fuerza cambios de aim y castiga cuando asome demasiado para hacer daño.',
      },
      {
        title: 'Estado del héroe',
        body: 'El hero trial empezó el 12 de septiembre y el lanzamiento completo llegará con Season 5. Su kit gira alrededor de Cetro eterno, Imbuir, Impulso velado, Drones vigorizantes y Liberación.',
      },
    ]
  }

  return [
    {
      title: `Si vas a jugar ${pillar.name}`,
      body: `No juegues en autopilot. Decide antes de la pelea qué recurso quieres forzar y cómo sales si no aparece una baja. ${firstMistake ? `Si tu error habitual es "${firstMistake.toLowerCase()}", empieza corrigiendo eso.` : ''}`,
    },
    {
      title: `Si juegas contra ${pillar.name}`,
      body: firstCounter
        ? `${firstCounter} suele ser una de las respuestas más molestas, pero el counter no gana solo. Lo importante es negarle su ventana buena y castigarlo cuando gaste recursos.`
        : 'No hace falta cambiar por reflejo. Primero mira si puedes ajustar distancia, cobertura, timing o cooldowns antes de abandonar tu pick.',
    },
    {
      title: 'Qué equipo le ayuda',
      body: firstComp
        ? `${firstComp} es un buen punto de partida porque le da una forma clara de entrar o sostener la pelea. Si la comp no acompaña, el héroe se siente mucho más forzado.`
        : 'Funciona mejor cuando el equipo entiende su ventana y puede jugar alrededor de ella. Si cada uno entra a un ritmo distinto, el pick pierde mucho valor.',
    },
  ]
}

const sectionStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  padding: 24,
  marginBottom: 22,
} as const

const headingStyle = {
  fontFamily: 'Bebas Neue, sans-serif',
  color: 'var(--text)',
  fontSize: 32,
  letterSpacing: 1,
  margin: '0 0 14px',
} as const

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 12,
} as const

const copyGridStyle = {
  color: 'var(--text2)',
  fontSize: 15,
  lineHeight: 1.8,
  display: 'grid',
  gap: 12,
} as const

import { articleDescription, ROLE_LABELS, topicLabel, type GuideContent } from './content'

type GuideEditorial = {
  title: string
  seoTitle: string
  description: string
}

const HERO_FOCUS: Record<string, { title: string; seoTitle: string; description: string }> = {
  ana: {
    title: 'Ana en Overwatch: granadas, Sleep y Nano con intención',
    seoTitle: 'Cómo jugar Ana en Overwatch: granada, Sleep, Nano y posicionamiento',
    description: 'Guía de Ana en Overwatch centrada en posicionamiento, uso real de granada, Sleep defensivo/ofensivo, Nano y errores que revisar en VOD.',
  },
  genji: {
    title: 'Genji en Overwatch: timing de dive, resets y Dragonblade',
    seoTitle: 'Cómo jugar Genji en Overwatch: combos, counters, resets y Dragonblade',
    description: 'Aprende cuándo entrar con Genji, cómo forzar cooldowns antes de usar Blade, qué counters respetar y cómo revisar muertes tempranas.',
  },
  anran: {
    title: 'Anran en Overwatch: presión, rutas y peleas a tu favor',
    seoTitle: 'Cómo jugar Anran en Overwatch: rutas, presión, counters y consejos',
    description: 'Guía de Anran para convertir movilidad y presión en ventajas reales: cuándo entrar, cuándo cortar el engage y qué revisar si mueres pronto.',
  },
  ashe: {
    title: 'Ashe en Overwatch: líneas largas, dinamita y B.O.B. con valor',
    seoTitle: 'Cómo jugar Ashe en Overwatch: mira, dinamita, B.O.B. y posicionamiento',
    description: 'Guía de Ashe para jugar rangos largos, usar dinamita para abrir peleas, colocar B.O.B. con intención y sobrevivir a dives rivales.',
  },
  baptiste: {
    title: 'Baptiste en Overwatch: Lamp, ventanas y daño entre curas',
    seoTitle: 'Cómo jugar Baptiste en Overwatch: Immortality Field, matriz y posicionamiento',
    description: 'Guía de Baptiste centrada en usar Lamp tarde pero a tiempo, alternar daño y curación, buscar high ground y sacar valor de Amplification Matrix.',
  },
  bastion: {
    title: 'Bastion en Overwatch: ventanas de daño y cobertura real',
    seoTitle: 'Cómo jugar Bastion en Overwatch: configuración, cobertura, counters y consejos',
    description: 'Guía de Bastion para elegir cuándo transformarte, jugar cerca de cobertura, castigar tanks expuestos y no quedar vendido tras gastar tu presión.',
  },
  brigitte: {
    title: 'Brigitte en Overwatch: peel, inspire y control anti-dive',
    seoTitle: 'Cómo jugar Brigitte en Overwatch: Inspire, packs, peel, Rally y counters',
    description: 'Guía de Brigitte para proteger backline, mantener Inspire activo, usar packs con prioridad y frenar dive sin perseguir peleas malas.',
  },
  tracer: {
    title: 'Tracer en Overwatch: presión lateral, Recall y Pulse Bomb',
    seoTitle: 'Cómo jugar Tracer en Overwatch: flancos, Recall, Pulse Bomb y counters',
    description: 'Guía de Tracer para crear presión sin morir gratis: rutas laterales, gestión de blinks, Recall, duelos y objetivos prioritarios.',
  },
  domina: {
    title: 'Domina en Overwatch: control frontal y castigo de engages',
    seoTitle: 'Cómo jugar Domina en Overwatch: espacio, presión, counters y consejos',
    description: 'Guía de Domina para sostener espacio sin regalar vida, identificar cuándo avanzar y convertir recursos defensivos en peleas ganadas.',
  },
  doomfist: {
    title: 'Doomfist en Overwatch: engages, Power Block y salidas limpias',
    seoTitle: 'Cómo jugar Doomfist en Overwatch: combos, Power Block, dive y counters',
    description: 'Guía de Doomfist para entrar con cooldowns claros, cargar Power Block con sentido, aislar objetivos y escapar antes de que el rival te encierre.',
  },
  echo: {
    title: 'Echo en Overwatch: vuelo, burst y Duplicate con plan',
    seoTitle: 'Cómo jugar Echo en Overwatch: vuelo, sticky bombs, beam, Duplicate y counters',
    description: 'Guía de Echo para usar ángulos verticales, confirmar kills con beam, duplicar objetivos útiles y evitar hitscans cuando no tienes cobertura.',
  },
  emre: {
    title: 'Emre en Overwatch: control de rango y presión sostenida',
    seoTitle: 'Cómo jugar Emre en Overwatch: rango, habilidades, counters y consejos',
    description: 'Guía de Emre para jugar alrededor de sus ventanas de presión, elegir duelos favorables y revisar si estás forzando peleas sin información.',
  },
  freja: {
    title: 'Freja en Overwatch: picks rápidos y rutas de salida',
    seoTitle: 'Cómo jugar Freja en Overwatch: movilidad, picks, counters y consejos',
    description: 'Guía de Freja para buscar eliminaciones sin aislarte del equipo, preparar rutas de escape y decidir cuándo cambiar de ángulo.',
  },
  hanzo: {
    title: 'Hanzo en Overwatch: sightlines, Storm Arrows y Dragonstrike',
    seoTitle: 'Cómo jugar Hanzo en Overwatch: puntería, Storm Arrows, sonic y counters',
    description: 'Guía de Hanzo para controlar líneas de visión, usar Sonic Arrow para ganar información y convertir Storm Arrows en castigo real.',
  },
  hazard: {
    title: 'Hazard en Overwatch: presión cuerpo a cuerpo y muros útiles',
    seoTitle: 'Cómo jugar Hazard en Overwatch: engages, muro, movilidad y counters',
    description: 'Guía de Hazard para entrar cuando el rival ya gastó recursos, separar objetivos con muro y evitar engages que dejan a tu equipo sin seguimiento.',
  },
  illari: {
    title: 'Illari en Overwatch: pylon, ángulos y Captive Sun',
    seoTitle: 'Cómo jugar Illari en Overwatch: pylon, daño, ultimate y posicionamiento',
    description: 'Guía de Illari para colocar el pylon donde dure, aportar daño desde ángulos seguros y usar Captive Sun cuando tu equipo pueda rematar.',
  },
  'jetpack-cat': {
    title: 'Jetpack Cat en Overwatch: altura, peel y tempo vertical',
    seoTitle: 'Cómo jugar Jetpack Cat en Overwatch: movilidad vertical, utilidad y counters',
    description: 'Guía de Jetpack Cat para sacar valor de la altura, proteger a aliados vulnerables y no gastar movilidad antes de que empiece la amenaza.',
  },
  'junker-queen': {
    title: 'Junker Queen en Overwatch: heridas, shout y peleas cortas',
    seoTitle: 'Cómo jugar Junker Queen en Overwatch: wounds, shout, Rampage y counters',
    description: 'Guía de Junker Queen para acelerar engages, mantener heridas activas, cortar curación con Rampage y evitar poke cuando no puedes cerrar distancia.',
  },
  junkrat: {
    title: 'Junkrat en Overwatch: spam inteligente, trampas y RIP-Tire',
    seoTitle: 'Cómo jugar Junkrat en Overwatch: minas, trampas, Tire y mejores mapas',
    description: 'Guía de Junkrat para controlar chokes, usar minas como movilidad o burst, colocar trampas con intención y buscar ultimates difíciles de leer.',
  },
  juno: {
    title: 'Juno en Overwatch: velocidad, órbitas y utilidad constante',
    seoTitle: 'Cómo jugar Juno en Overwatch: movilidad, velocidad, ultimate y posicionamiento',
    description: 'Guía de Juno para alternar curación y presión, acelerar rotaciones, reposicionarte antes del dive y usar ultimate con seguimiento del equipo.',
  },
  kiriko: {
    title: 'Kiriko en Overwatch: Suzu, kunais y rotaciones seguras',
    seoTitle: 'Cómo jugar Kiriko en Overwatch: Suzu, TP, kunais y posicionamiento',
    description: 'Guía de Kiriko con foco en Suzu, Swift Step, presión con kunais, Kitsune Rush y decisiones para sobrevivir contra dive.',
  },
  lifeweaver: {
    title: 'Lifeweaver en Overwatch: Life Grip, plataforma y tempo defensivo',
    seoTitle: 'Cómo jugar Lifeweaver en Overwatch: Life Grip, plataforma, árbol y posicionamiento',
    description: 'Guía de Lifeweaver para salvar sin cortar jugadas buenas, usar plataforma como herramienta de mapa y sostener peleas largas con Tree of Life.',
  },
  lucio: {
    title: 'Lúcio en Overwatch: speed, boops y engages con ritmo',
    seoTitle: 'Cómo jugar Lúcio en Overwatch: speed boost, wall ride, boop y Beat',
    description: 'Guía de Lúcio para acelerar entradas, sobrevivir con wall ride, boopear amenazas clave y usar Sound Barrier antes de que la pelea se rompa.',
  },
  mauga: {
    title: 'Mauga en Overwatch: presión frontal y Cardiac con cabeza',
    seoTitle: 'Cómo jugar Mauga en Overwatch: Cardiac Overdrive, daño, counters y consejos',
    description: 'Guía de Mauga para elegir cuándo caminar hacia delante, no depender solo de curación y forzar recursos rivales antes de comprometerte.',
  },
  mei: {
    title: 'Mei en Overwatch: muros que aíslan y Blizzard con seguimiento',
    seoTitle: 'Cómo jugar Mei en Overwatch: muro, Cryo-Freeze, Blizzard y counters',
    description: 'Guía de Mei para cortar tanks, proteger rotaciones, usar Cryo sin perder tempo y lanzar Blizzard cuando el rival no pueda escapar gratis.',
  },
  mizuki: {
    title: 'Mizuki en Overwatch: supervivencia, utilidad y presión segura',
    seoTitle: 'Cómo jugar Mizuki en Overwatch: habilidades, posicionamiento, counters y consejos',
    description: 'Guía de Mizuki para mantener líneas seguras, aportar utilidad antes de gastar recursos defensivos y revisar cuándo te expones de más.',
  },
  reinhardt: {
    title: 'Reinhardt en Overwatch: esquinas, escudo y engages limpios',
    seoTitle: 'Cómo jugar Reinhardt en Overwatch: escudo, Fire Strike, engages y matchups',
    description: 'Guía de Reinhardt para aprender a cruzar chokes, jugar esquinas, no gastar escudo en vacío y buscar Earthshatter con ventaja.',
  },
  moira: {
    title: 'Moira en Overwatch: recursos, orbes y Coalescence a tempo',
    seoTitle: 'Cómo jugar Moira en Overwatch: recursos, Fade, orbes y Coalescence',
    description: 'Guía de Moira para no quedarte sin recursos, usar Fade como seguro real, alternar daño y curación y lanzar Coalescence para iniciar o sostener.',
  },
  orisa: {
    title: 'Orisa en Overwatch: fortify, javelin y control de espacio',
    seoTitle: 'Cómo jugar Orisa en Overwatch: Fortify, Javelin Spin, Terra Surge y counters',
    description: 'Guía de Orisa para aguantar sin inmolarte, cortar engages con javelin, rotar entre coberturas y castigar tanks que entran sin recursos.',
  },
  pharah: {
    title: 'Pharah en Overwatch: altura, rockets y Barrage sin regalarte',
    seoTitle: 'Cómo jugar Pharah en Overwatch: vuelo, rockets, Barrage y counters hitscan',
    description: 'Guía de Pharah para jugar alrededor de coberturas verticales, presionar supports, medir hitscans y usar Barrage cuando el rival no pueda borrarte.',
  },
  ramattra: {
    title: 'Ramattra en Overwatch: poke, Nemesis y Annihilation',
    seoTitle: 'Cómo jugar Ramattra en Overwatch: forma Nemesis, shield, ultimate y counters',
    description: 'Guía de Ramattra para alternar poke y brawl, entrar en Nemesis con ventaja, proteger rotaciones y usar Annihilation con recursos del equipo.',
  },
  reaper: {
    title: 'Reaper en Overwatch: flancos cortos y Death Blossom con setup',
    seoTitle: 'Cómo jugar Reaper en Overwatch: flancos, Wraith, Blossom y counters',
    description: 'Guía de Reaper para acercarte sin enseñar la ruta, forzar cooldowns antes de entrar y no gastar Wraith como si fuera parte del engage.',
  },
  roadhog: {
    title: 'Roadhog en Overwatch: hook, esquinas y supervivencia real',
    seoTitle: 'Cómo jugar Roadhog en Overwatch: hook, Take a Breather, ultimate y counters',
    description: 'Guía de Roadhog para jugar esquinas, buscar hooks con seguimiento, no alimentar ultimates y sobrevivir sin depender de curación constante.',
  },
  sigma: {
    title: 'Sigma en Overwatch: poke, escudo flexible y control de ángulos',
    seoTitle: 'Cómo jugar Sigma en Overwatch: barrera, grasp, Accretion y counters',
    description: 'Guía de Sigma para controlar sightlines, alternar barrera y Grasp, castigar engages con roca y usar Flux cuando el equipo pueda rematar.',
  },
  dva: {
    title: 'D.Va en Overwatch: Matrix, peel y control de high ground',
    seoTitle: 'Cómo jugar D.Va en Overwatch: Defense Matrix, peel, high ground y counters',
    description: 'Guía de D.Va para usar Matrix con intención, proteger backline, disputar altura, castigar off-angles y elegir bien tus engages.',
  },
  winston: {
    title: 'Winston en Overwatch: dive, burbuja y salidas con vida',
    seoTitle: 'Cómo jugar Winston en Overwatch: dive, burbuja, objetivos y counters',
    description: 'Guía de Winston para entrar con timing, aislar objetivos, usar burbuja como recurso de pelea y salir antes de regalar la vida.',
  },
  mercy: {
    title: 'Mercy en Overwatch: pocket, movimiento y Resurrect seguro',
    seoTitle: 'Cómo jugar Mercy en Overwatch: pocket, Guardian Angel, Resurrect y supervivencia',
    description: 'Guía de Mercy para decidir a quién potenciar, cuándo resucitar, cómo moverte sin quedar expuesta y qué revisar en tus muertes.',
  },
  cassidy: {
    title: 'Cassidy en Overwatch: rango medio, cobertura y castigo a flankers',
    seoTitle: 'Cómo jugar Cassidy en Overwatch: duelos, granada, cobertura y counters',
    description: 'Guía de Cassidy para jugar rango medio con cobertura, castigar movilidad rival, gestionar granada y aportar valor constante.',
  },
  sojourn: {
    title: 'Sojourn en Overwatch: railgun, slides y picks de tempo',
    seoTitle: 'Cómo jugar Sojourn en Overwatch: railgun, slide, Overclock y counters',
    description: 'Guía de Sojourn para cargar rail con intención, tomar ángulos que puedas abandonar y usar Overclock cuando el rival ya no tenga cobertura cómoda.',
  },
  'soldier-76': {
    title: 'Soldier 76 en Overwatch: off-angles, biotic field y Visor',
    seoTitle: 'Cómo jugar Soldier 76 en Overwatch: tracking, sprint, Biotic Field y visor',
    description: 'Guía de Soldier 76 para jugar ángulos sostenidos, reposicionarte con sprint, usar Biotic Field sin quedarte estático y maximizar Tactical Visor.',
  },
  sombra: {
    title: 'Sombra en Overwatch: hacks útiles e invisibilidad con timing',
    seoTitle: 'Cómo jugar Sombra en Overwatch: hack, virus, EMP, flancos y counters',
    description: 'Guía de Sombra para elegir objetivos, entrar cuando tu equipo presiona, no revelar rutas gratis y usar EMP con seguimiento real.',
  },
  symmetra: {
    title: 'Symmetra en Overwatch: teleporter, beam y control de zona',
    seoTitle: 'Cómo jugar Symmetra en Overwatch: torretas, teleporter, beam y mapas',
    description: 'Guía de Symmetra para preparar rotaciones, cargar beam sin regalar posición, colocar torretas con propósito y decidir cuándo el mapa te favorece.',
  },
  torbjorn: {
    title: 'Torbjörn en Overwatch: torreta, sobrecarga y zonas incómodas',
    seoTitle: 'Cómo jugar Torbjörn en Overwatch: torreta, Overload, Molten Core y counters',
    description: 'Guía de Torbjörn para colocar torretas que den información, controlar flancos, pelear con Overload y usar Molten Core para cortar rutas.',
  },
  vendetta: {
    title: 'Vendetta en Overwatch: duelos calculados y presión de snowball',
    seoTitle: 'Cómo jugar Vendetta en Overwatch: duelos, movilidad, counters y consejos',
    description: 'Guía de Vendetta para escoger peleas con ventaja, no perseguir kills imposibles y convertir una primera baja en control de mapa.',
  },
  venture: {
    title: 'Venture en Overwatch: engages bajo tierra y burst seguro',
    seoTitle: 'Cómo jugar Venture en Overwatch: Drill Dash, Burrow, combos y counters',
    description: 'Guía de Venture para preparar engages desde cobertura, usar Burrow como entrada o salida y castigar objetivos aislados sin perder tempo.',
  },
  widowmaker: {
    title: 'Widowmaker en Overwatch: sightlines, grapple y picks limpios',
    seoTitle: 'Cómo jugar Widowmaker en Overwatch: puntería, grapple, posiciones y counters',
    description: 'Guía de Widowmaker para elegir líneas de visión, rotar después de cada pick, sobrevivir al dive y generar presión sin exponerte de más.',
  },
  zarya: {
    title: 'Zarya en Overwatch: energía, burbujas y tempo de pelea',
    seoTitle: 'Cómo jugar Zarya en Overwatch: energía, burbujas, Graviton y counters',
    description: 'Guía de Zarya para ganar energía sin regalar burbujas, proteger engages, mantener presión y usar Graviton con seguimiento real.',
  },
  'wrecking-ball': {
    title: 'Wrecking Ball en Overwatch: setups, slam y presión sin morir',
    seoTitle: 'Cómo jugar Wrecking Ball en Overwatch: grapples, slam, mines y counters',
    description: 'Guía de Wrecking Ball para preparar engages desde fuera de visión, forzar cooldowns, cortar supports y salir antes de alimentar al rival.',
  },
  wuyang: {
    title: 'Wuyang en Overwatch: utilidad flexible y peleas largas',
    seoTitle: 'Cómo jugar Wuyang en Overwatch: habilidades, posicionamiento, utilidad y counters',
    description: 'Guía de Wuyang para sostener peleas con buena posición, usar recursos antes de que el equipo colapse y aportar presión sin perder línea segura.',
  },
  zenyatta: {
    title: 'Zenyatta en Overwatch: Discord, daño y Transcendence',
    seoTitle: 'Cómo jugar Zenyatta en Overwatch: Discord Orb, volleys, Transcendence y counters',
    description: 'Guía de Zenyatta para jugar líneas seguras, priorizar Discord, cargar volleys con información y guardar Transcendence para amenazas reales.',
  },
  sierra: {
    title: 'Sierra en Overwatch: habilidades, drone y ventanas de impacto',
    seoTitle: 'Cómo jugar Sierra en Overwatch: habilidades, perks, drone y consejos',
    description: 'Guía de Sierra con foco en Anchor Drone, Tracking Shot, Tremor Charge, perks y decisiones para convertir presión en bajas.',
  },
}

const ROLE_FOCUS: Record<string, { suffix: string; seoSuffix: string; description: string }> = {
  tank: {
    suffix: 'espacio, recursos y matchups',
    seoSuffix: 'espacio, cooldowns, counters y consejos',
    description: 'Guía de {hero} en Overwatch para crear espacio, gestionar recursos defensivos, elegir engages y revisar errores de posicionamiento.',
  },
  dps: {
    suffix: 'duelos, ángulos y presión útil',
    seoSuffix: 'mecánicas, counters, ángulos y consejos',
    description: 'Guía de {hero} en Overwatch para jugar mejores ángulos, elegir duelos, sincronizar presión y revisar decisiones de daño útil.',
  },
  support: {
    suffix: 'utilidad, supervivencia y peel',
    seoSuffix: 'posicionamiento, cooldowns, peel y consejos',
    description: 'Guía de {hero} en Overwatch para sobrevivir más, usar cooldowns con intención, aportar utilidad y revisar errores de soporte.',
  },
}

export function guideEditorial(guide: GuideContent): GuideEditorial {
  if (guide.hero && isHeroVideoGuide(guide)) {
    const heroName = topicLabel(guide.hero)
    const custom = HERO_FOCUS[guide.hero]
    if (custom) return custom

    const roleFocus = guide.role ? ROLE_FOCUS[guide.role] : null
    if (roleFocus) {
      return {
        title: `${heroName} en Overwatch: ${roleFocus.suffix}`,
        seoTitle: `Cómo jugar ${heroName} en Overwatch: ${roleFocus.seoSuffix}`,
        description: roleFocus.description.replace('{hero}', heroName),
      }
    }
  }

  const genericHeroGuide =
    guide.title.trim().match(/^gu[ií]a de (.+) en overwatch$/i) ||
    guide.seo_title?.trim().match(/^gu[ií]a de (.+) en overwatch$/i)
  const genericHeroName = genericHeroGuide?.[1]
  const isGenericHeroGuide = Boolean(
    genericHeroName &&
    !/(tank|dps|support|composici[oó]n|rush|brawl|flyers|poke)/i.test(genericHeroName.trim()),
  )

  if (isGenericHeroGuide) {
    const heroName = guide.hero ? topicLabel(guide.hero) : genericHeroName!.trim()
    const roleLabel = guide.role ? ROLE_LABELS[guide.role].toLowerCase() : 'héroe'

    return {
      title: `Fundamentos de ${heroName} en Overwatch: plan de pelea y errores comunes`,
      seoTitle: `Fundamentos de ${heroName} en Overwatch: cómo aportar más en cada pelea`,
      description: `Guía base de ${heroName} para revisar decisiones de ${roleLabel}, entender cuándo tomar espacio o presión y detectar errores repetidos en tus VODs.`,
    }
  }

  return {
    title: guide.seo_title || guide.title,
    seoTitle: guide.seo_title || guide.title,
    description: articleDescription(guide),
  }
}

export function guideCardMeta(guide: GuideContent) {
  const editorial = guideEditorial(guide)
  return {
    ...editorial,
    roleLabel: guide.role ? ROLE_LABELS[guide.role] : null,
  }
}

function isHeroVideoGuide(guide: GuideContent) {
  return Boolean(guide.slug?.endsWith('-guia-video-overwatch') || guide.category?.toLowerCase().includes('video'))
}

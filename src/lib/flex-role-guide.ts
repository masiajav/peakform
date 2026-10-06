export const flexRoleGuide = {
  path: '/roles/flex',
  updatedAt: '3 de octubre de 2026',
  schemaDate: '2026-10-03',
  seoTitle: 'Flex en Overwatch: amplía tu hero pool sin cambiar a ciegas',
  seoDescription: 'Cómo jugar flex en Overwatch: preparar alternativas por rol, distinguir un mal pick de un mal engage y decidir cuándo cambiar de héroe. Ejemplos y VOD.',
  h1: 'Jugar flex en Overwatch: cambia con un motivo, no por cada muerte',
  intro: [
    'Jugar flex no consiste en escoger un héroe distinto cada vez que pierdes una pelea. Consiste en tener una alternativa que conoces y saber qué problema puede resolver. Empieza con un pick habitual y otro que aporte una opción diferente: llegar a una altura, presionar desde más lejos o ayudar mejor frente al dive. El cambio debe permitir un plan que puedas ejecutar con tu equipo.',
    'Flex describe esa capacidad de adaptación, no un cuarto rol junto a Tank, DPS y Support. En una partida con roles asignados, cambiar de héroe sigue siendo una decisión dentro de tu rol. Si juegas varios roles entre partidas, prepara un hero pool para cada uno; saber usar Ana no sustituye aprender cómo iniciar una pelea con Winston.',
  ],
  summary: ['Prepara una alternativa que sepas jugar, no una respuesta para cada héroe rival.', 'Comprueba qué te impide aportar: ruta, alcance, ayuda o uso de recursos.', 'Dale al nuevo pick una pelea con el equipo completo.', 'Revisa qué mejoró después del cambio, no solo si acabaste ganando.'],
  pools: [
    {
      role: 'Tank', href: '/roles/tank',
      heroes: [{ slug: 'winston', name: 'Winston' }, { slug: 'reinhardt', name: 'Reinhardt' }],
      body: 'Winston ofrece acceso a alturas y entradas con salto; Reinhardt propone presión cercana acompañando el cruce del grupo. Es un ejemplo de alternativas, no una pareja obligatoria. Elegir por la altura o por una esquina solo tiene sentido si los compañeros pueden seguir el plan.',
      question: '¿Necesito disputar una altura o avanzar con el grupo?',
    },
    {
      role: 'DPS', href: '/roles/dps',
      heroes: [{ slug: 'cassidy', name: 'Cassidy' }, { slug: 'genji', name: 'Genji' }],
      body: 'Cassidy permite disputar una línea de tiro próxima al frente; Genji añade acceso vertical y otro timing de entrada. Cambiar entre ellos no arregla asomarte solo. Antes mira si necesitas una segunda ruta o si tu posición actual ya ofrece un objetivo al que no estás apuntando.',
      question: '¿Me falta una línea de tiro útil o una ruta para alcanzar la amenaza?',
    },
    {
      role: 'Support', href: '/roles/support',
      heroes: [{ slug: 'ana', name: 'Ana' }, { slug: 'kiriko', name: 'Kiriko' }],
      body: 'Ana ayuda desde una línea preparada; Kiriko puede recolocarse con Swift Step y responder con Suzu. Que Kiriko tenga teleport no garantiza una llegada segura. Elige según la posición que necesita tu equipo y la amenaza a la que tendrás que responder, no porque una muerte parezca demostrar que Ana no sirve.',
      question: '¿Puedo sostener esta posición o necesito recolocarme y responder a otra amenaza?',
    },
  ],
  sections: [
    {
      id: 'antes-de-cambiar', title: 'Antes de cambiar, mira una pelea completa',
      paragraphs: [
        'Si Winston muere después de saltar mientras sus DPS siguen en spawn, esa pelea no demuestra que falte otro Tank. Si Cassidy no alcanza a nadie desde el suelo en Gibraltar, sí hay un problema de posición que conviene revisar. Aun así, quizá pueda subir con el equipo en vez de cambiar inmediatamente. Separa lo que el kit no permite de lo que todavía no has intentado con una ruta razonable.',
        'Busca un momento con los compañeros vivos, recursos disponibles y una entrada reconocible. Comprueba quién puede verte y a quién puedes presionar. Si varias peleas comparables se rompen por la misma limitación, tendrás un motivo mucho más claro para elegir otra herramienta. No hace falta aguantar toda la partida para demostrar paciencia, ni cambiar por reflejo para demostrar flexibilidad.',
      ],
    },
    {
      id: 'dos-picks', title: 'Dos picks útiles valen más que seis cambios improvisados',
      paragraphs: [
        'Con tu alternativa deberías reconocer una posición inicial, el recurso que necesitas conservar y una salida cuando el rival responde. Si no sabes esas tres cosas, es fácil cambiar a un héroe que parece adecuado y pasar las siguientes peleas aprendiendo sus controles. Practícalo en sesiones en las que puedas centrarte en él antes de usarlo como respuesta urgente.',
        'No necesitas completar el roster para aportar. Añade un héroe cuando identifiques una situación que tus picks actuales cubren mal y quieras entrenarla. Un segundo DPS puede darte acceso a una altura; otro Support puede responder mejor a una amenaza sobre tu compañero. La incorporación tiene un motivo concreto y puedes comprobar después si lo cumple.',
      ],
    },
    {
      id: 'cambio-y-equipo', title: 'El nuevo pick cambia también lo que necesita el equipo',
      paragraphs: [
        'Si cambias de Reinhardt a Winston, no sigas pidiendo que los cinco caminen detrás de ti como en la pelea anterior. Prepara el destino del salto y mira qué DPS puede presionar allí. Si cambias de Genji a Cassidy, busca una línea de tiro desde la que aportar antes del contacto, en vez de repetir la misma ruta profunda sin la movilidad que tenías.',
        'Comunica una intención sencilla: «voy a disputar esa altura» o «me quedo cerca para ayudar contra Tracer». Eso permite ajustar posiciones aunque nadie responda por voz. Cambiar el retrato sin cambiar el plan suele mantener el mismo problema con cooldowns distintos.',
      ],
    },
    {
      id: 'ultimate', title: 'Tener la ultimate cerca no decide por sí solo',
      paragraphs: [
        'Antes de quedarte solo por la carga, mira si puedes usarla en una pelea que el equipo tenga opciones de jugar. Una Blade casi lista no resuelve que entres después de perder a tus supports. Por otro lado, cambiar justo cuando dispones de una oportunidad clara puede abandonar una herramienta útil sin haberla valorado.',
        'No uses un porcentaje fijo como norma universal. Compara lo que puedes hacer en la siguiente pelea con lo que aportaría el otro héroe. La pregunta es qué plan puedes ejecutar ahora, no cuánto costó llenar la barra. Si mantienes el pick, concreta qué recurso rival o qué posición necesitas para usar la ultimate.',
      ],
    },
    {
      id: 'mapas', title: 'El mapa te da pistas, no una orden de cambiar',
      paragraphs: [
        'En Gibraltar, que el rival controle una plataforma no obliga a todos a elegir movilidad. Puedes necesitar un jugador que la dispute y otro que tenga tiro al mismo contacto. Si los dos DPS buscan entradas profundas mientras Ana pierde todas las líneas, podréis llegar a la plataforma, pero ella no podrá ayudaros.',
        'En King’s Row, un cruce cercano puede favorecer un avance de grupo, pero cada tramo ofrece coberturas y alturas diferentes. Mira la siguiente esquina y los laterales que el rival ya está usando. El héroe apropiado para capturar una zona no tiene por qué ser la única opción para defender todo el recorrido después.',
      ],
    },
    {
      id: 'vod', title: 'Revisa qué cambió después del swap',
      paragraphs: [
        'Elige la última pelea antes del cambio y la primera en la que el nuevo pick jugó con el equipo completo. Anota la limitación que querías resolver. Después comprueba si llegaste a la altura, mantuviste ayuda o pudiste contestar la entrada que antes te costaba. Ganar la pelea no prueba por sí solo que el swap la causara: quizá el rival entró con menos jugadores o gastó mal una ultimate.',
        'Si el problema siguió igual, mira la decisión que repetiste. Un off-angle sin salida seguirá siendo peligroso con otro DPS; curar desde un sitio sin visión seguirá llegando tarde con otro Support. Entrena una alternativa junto con el plan que la hace útil. Flex no es borrar lo aprendido con tu main, sino tener otra forma de responder cuando la situación realmente cambia.',
      ],
    },
  ],
  checklist: ['¿Qué limitación quiero resolver?', '¿Sé una posición y una salida con el nuevo héroe?', '¿Mis compañeros pueden seguir el nuevo plan?', '¿La ultimate actual ofrece una oportunidad real?', '¿Probé el cambio con el equipo completo?', '¿Qué mejoró de forma observable en el replay?'],
  faqs: [
    { question: '¿Flex es un rol propio en Overwatch?', answer: 'No es un cuarto rol junto a Tank, DPS y Support. Aquí se refiere a saber adaptar tus picks. Con roles asignados, el cambio de héroe ocurre dentro de tu rol; jugar varios roles entre partidas requiere aprender las responsabilidades de cada uno.' },
    { question: '¿Cuántos héroes debería aprender para jugar flex?', answer: 'Puedes empezar con uno habitual y una alternativa que aporte una opción diferente. No hay una cantidad que garantice resultados. Amplía el pool cuando reconozcas una situación que quieras cubrir y tengas tiempo para entrenar ese plan.' },
    { question: '¿Tengo que cambiar siempre que el rival elige un counter?', answer: 'No. Primero revisa ruta, cobertura, ayuda y timing. Cambia si el enfrentamiento o el mapa sigue impidiendo tu trabajo aun después de adaptar esas decisiones, y si conoces una alternativa que pueda resolverlo.' },
  ],
  links: [
    { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Decidir cuándo merece la pena cambiar' },
    { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Comparar peleas en una VOD' },
    { href: '/maps/watchpoint-gibraltar', label: 'Rutas y alturas en Gibraltar' },
    { href: '/maps/kings-row', label: 'Preparar los cruces de King’s Row' },
    { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Entender qué recurso faltó antes del swap' },
    { href: '/experts', label: 'Pedir ayuda para revisar una decisión' },
  ],
}

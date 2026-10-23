export type RankedGuideVideo = {
  id: string
  title: string
  channel: string
  language: string
  publishedAt: string
  context: string
  practice: { title: string; seconds: number; body: string }[]
}

// Individually checked original videos, not a hero-name substitution template.
export const RANKED_GUIDE_VIDEOS: Readonly<Record<string, RankedGuideVideo>> = {
  'como-jugar-ana-ranked-overwatch': {
    id: '7DrtWksik9I', title: 'The Only Ana Guide You Need', channel: 'Awkward', language: 'en', publishedAt: '2025-06-23T07:00:10-07:00',
    context: 'Vídeo de Awkward de junio de 2025. Sus capítulos de cobertura, off-angles y cooldowns sirven para revisar decisiones; no son una lista de estadísticas o perks del parche actual.',
    practice: [
      { title: 'Cobertura y línea de visión', seconds: 81, body: 'Pausa antes de una rotación y busca una esquina desde la que puedas curar el siguiente avance. Si solo ves al Tank cuando sale de cobertura, tu posición llega tarde aunque hayas acertado los disparos anteriores.' },
      { title: 'Un ángulo que puedas abandonar', seconds: 141, body: 'Comprueba cuánto debes separarte para ver al objetivo y cómo volverías si aparece un flanker. Abrir otro ángulo no exige alejarte hasta perder de vista a tus aliados.' },
      { title: 'Qué consigue cada cooldown', seconds: 215, body: 'En tu replay, anota si Sleep dio tiempo para retirarte y si alguien pudo aprovechar el anti. Contar impactos sin mirar la continuación oculta granadas que no cambiaron la pelea.' },
    ],
  },
  'como-jugar-kiriko-ranked-overwatch': {
    id: 'hgHc2YZY3WE', title: 'Kiriko Positioning Guide: How to Position in EVERY Situation', channel: 'bozo', language: 'en', publishedAt: '2025-02-11T09:00:50-08:00',
    context: 'La explicación de bozo, publicada en febrero de 2025, se centra en dónde colocarse con Kiriko. Usa los ejemplos para valorar cobertura, riesgo y salida; comprueba en el juego el alcance de teletransporte y los perks de tu versión.',
    practice: [
      { title: 'Asomarte sin enseñar todo el cuerpo', seconds: 104, body: 'Antes de salir por una esquina, identifica cuántos enemigos pueden verte a la vez. Un off-angle útil permite presionar a alguien sin ofrecer un duelo simultáneo al resto del equipo.' },
      { title: 'Cuándo cerrar el ángulo', seconds: 388, body: 'Mira si el aliado que va a recibir el engage ya necesita tu atención. Llegar tarde a curarlo para insistir en otro kunai puede costar más que la presión que estabas creando.' },
      { title: 'Atraer atención y volver', seconds: 641, body: 'Elige al compañero al que volverías antes de buscar el duelo. Tener Swift Step disponible no basta si ese aliado ya no está a tu alcance o su posición también está perdida.' },
    ],
  },
  'como-jugar-genji-ranked-overwatch': {
    id: 'PpqRqH0M9sk', title: 'How To Play Genji So Well it Feels Like CHEATING', channel: 'Awkward', language: 'en', publishedAt: '2025-06-01T09:17:06-07:00',
    context: 'Este vídeo de Awkward es de junio de 2025. La comparación útil con tu partida está en el timing de Dash, Deflect y Blade, no en esperar las mismas bajas ni copiar los valores de un parche anterior.',
    practice: [
      { title: 'Dash con una salida prevista', seconds: 30, body: 'Detén tu VOD antes del Dash y decide dónde acabarías si no hubiera reset. Si esa posición te deja entre varios enemigos, necesitas una ventaja más clara que ver a alguien tocado.' },
      { title: 'Deflect contra una amenaza concreta', seconds: 83, body: 'Separa el daño que esperabas bloquear del que podía seguir entrando desde otro ángulo. Gastar Deflect no sustituye acercarte a una pared ni elegir una ruta de retirada.' },
      { title: 'Preparar Dragonblade', seconds: 151, body: 'Comprueba qué control, protección o escape seguía disponible al sacar la espada. Una Blade sin bajas puede haber forzado recursos; otra puede haberse gastado cuando tus aliados ni siquiera podían entrar.' },
    ],
  },
  'como-jugar-cassidy-ranked-overwatch': {
    id: 'CS-hiY9EysU', title: 'Educational Unranked To GM CASSIDY (93% Winrate)', channel: 'Awkward', language: 'en', publishedAt: '2025-10-11T11:00:10-07:00',
    context: 'Serie de partidas de Awkward publicada en octubre de 2025. El 93 % del título corresponde a esa serie del autor: no es una expectativa de resultados para quien vea el vídeo. Fíjate en las decisiones entre disparos, no solo en su puntería.',
    practice: [
      { title: 'El principio antes del duelo', seconds: 0, body: 'Busca una esquina desde la que disparar y retirarte sin depender de Roll. Si cada intercambio exige gastar el escape para seguir vivo, revisa la posición antes de culpar a la precisión.' },
      { title: 'Seguir una pelea completa', seconds: 260, body: 'Anota cuándo puede mantener presión y cuándo deja de disparar para recolocarse. Caminar detrás de un objetivo que ya ha salido de tu rango útil puede regalar el siguiente ángulo al rival.' },
      { title: 'Elegir desde dónde disputar Control', seconds: 743, body: 'Compara tu entrada al punto con la posición de tus Supports. Disparar desde fuera puede ayudar al engage; quedarte lejos cuando el equipo ya está peleando dentro puede dejarlo sin tu presión.' },
    ],
  },
  'como-jugar-reinhardt-ranked-overwatch': {
    id: 'WV8V7UMqyAg', title: 'Guía básica: Reinhardt | Overwatch 2', channel: 'LeonDrummer', language: 'es', publishedAt: '2022-10-17T06:00:18-07:00',
    context: 'Introducción de LeonDrummer publicada en octubre de 2022, al comienzo de Overwatch 2. Puede ayudarte a visualizar los movimientos, pero las cifras de barrera, daño y cooldowns de entonces no deben tomarse como las actuales.',
    practice: [
      { title: 'Antes de empezar: decide el recorrido', seconds: 0, body: 'Elige qué esquina necesitas alcanzar antes de levantar el escudo. Aguantar en el centro de una calle sin acercarte a cobertura puede gastar la barrera sin abrir paso al equipo.' },
      { title: 'Embestida y punto de llegada', seconds: 105, body: 'En tu partida, mira qué hay detrás del objetivo y qué ocurriría si esquivara la carga. Acertar un pin no arregla acabar fuera de la visión de tus Supports.' },
      { title: 'Cerrar la distancia con el equipo', seconds: 170, body: 'Comprueba si tus compañeros podían cruzar mientras avanzabas. Si solo tú has llegado a distancia de martillo, la jugada aún no se ha convertido en una entrada conjunta.' },
    ],
  },
  'como-jugar-dva-ranked-overwatch': {
    id: 'h6ITrTAqIUM', title: 'D.VA for Dummies (Guide & Tips from a GM/4500 Player)', channel: 'yeatle', language: 'en', publishedAt: '2020-11-03T09:00:08-08:00',
    context: 'El vídeo de yeatle es de noviembre de 2020 y pertenece al Overwatch original. No muestra el balance ni los perks actuales. Úsalo para observar la orientación de Matrix y la elección de objetivos, no para copiar cifras ni el reparto de tareas entre dos Tanks.',
    practice: [
      { title: 'Qué estás cubriendo con Matrix', seconds: 5, body: 'Identifica el disparo o la trayectoria que quieres interceptar y la posición del aliado al que proteges. Mirar de frente al Tank rival no ayuda si la amenaza llega por un lateral.' },
      { title: 'Elegir qué posición disputar', seconds: 84, body: 'Antes de volar a una altura, comprueba si puedes presionar desde allí y volver a cobertura. Llegar primero no compensa quedarte sin meca antes de que tus DPS puedan acompañarte.' },
      { title: 'El duelo contra Zarya', seconds: 218, body: 'Revisa cuándo seguías dentro de su alcance después de gastar la movilidad. Usa el mapa para cambiar de posición; Matrix no debe ser tu respuesta al rayo que ya te está alcanzando.' },
    ],
  },
}

import type { CounterHero } from './overwatch-counters'

export const HERO_ABILITY_NAMES: Record<string, string[]> = {
  ana: ['Rifle biótico', 'Dardo sedante', 'Granada biótica', 'Nanoestimulantes'],
  anran: ['Abanicos Zhuque', 'Atizar el fuego', 'Llama danzante', 'Carga infernal', 'Ascenso bermellón', 'Renacimiento bermellón', 'Ignición'],
  ashe: ['Víbora', 'Recortada', 'Dinamita', 'BOB'],
  baptiste: ['Lanzagranadas biótico', 'Energía regeneradora', 'Campo de inmortalidad', 'Matriz amplificadora', 'Exobotas'],
  bastion: ['Modo asalto', 'Modo reconocimiento', 'Granada táctica A-36', 'Reconfiguración', 'Modo artillería'],
  brigitte: ['Mangual mecánico', 'Kit de reparación', 'Lanzamiento de mangual', 'Escudo barrera', 'Carga con escudo', 'Formación', 'Inspiración'],
  cassidy: ['Pacificador', 'Evasión', 'Sin perdón'],
  dva: ['Cañones de fusión', 'Pistola de luz', 'Impulsores', 'Matriz de defensa', 'Micromisiles', 'Autodestrucción', 'Meca', '¡Eyección!'],
  domina: ['Cañón de fotones', 'Matriz de barrera', 'Repulsores sónicos', 'Carga de cristal', 'Panóptico'],
  doomfist: ['Cañón de mano', 'Puño cohete', 'Golpe sísmico', 'Bloqueo de poder', 'Meteoro'],
  echo: ['Disparo triple', 'Bombas lapa', 'Vuelo', 'Haz enfocado', 'Duplicado', 'Planeo'],
  emre: ['Rifle de ráfaga sintética', 'Granada cibernética', 'Protocolo de anulación', 'Vitales alterados'],
  freja: ['Disparo de boleadora', 'Desplazamiento veloz', 'Apuntado', 'Corriente ascendente'],
  genji: ['Shuriken', 'Desvío', 'Corte veloz', 'Hoja del dragón', 'Ciberagilidad'],
  hanzo: ['Arco de tormenta', 'Tormenta de flechas', 'Flecha sónica', 'Agilidad de dragón', 'Ataque del dragón', 'Escalada'],
  hazard: ['Lanzaespinas', 'Protección de púas', 'Salto violento', 'Muro afilado', 'Aguacero', 'Brinco'],
  illari: ['Rifle solar', 'Sol cautivo', 'Helioterapia', 'Erupción'],
  'jetpack-cat': ['Patiproyectiles bióticos', 'Vuelo frenético', 'Línea de vida', 'Ronroneo', 'Gata secuestradora'],
  'junker-queen': ['Escopeta', 'Grito de mando', 'Matanza', 'Masacre', 'Subidón de adrenalina'],
  junkrat: ['Lanzagranadas', 'Mina de conmoción', 'Cepo', 'Rueda explosiva', 'Caos total'],
  juno: ['Mediarma', 'Torpedos de púlsar', 'Rayo orbital', 'Hiperanillo', 'Impulso de planeo', 'Cubrebotas marciano'],
  kiriko: ['Ofuda de sanación', 'Kunái', 'Paso ligero', 'Suzu de protección', 'Marcha del kitsune'],
  lifeweaver: ['Brote sanador', 'Salva espinosa', 'Plataforma petaloide', 'Paso regenerador', 'Agarre vital', 'Árbol de vida'],
  lucio: ['Amplificador sónico', 'Cambio de pista', 'Subidón', 'Onda sonora', 'Barrera de sonido', 'Trotamuros'],
  mauga: ['Arrollar', 'Sobreestimulación cardíaca', 'Berserker', 'Mano a mano'],
  mei: ['Pistola endotérmica', 'Criónica', 'Muro de hielo', 'Ventisca'],
  mercy: ['Bastón caduceo', 'Pistola caducea', 'Ángel de la guarda', 'Resurrección', 'Descenso angélico', 'Valkiria'],
  mizuki: ['Guja espiritual', 'Sanación Kasa', 'Cadena vinculante', 'Regreso Katashiro', 'Santuario Kekkai', 'Aura reparadora'],
  moira: ['Rayo biótico', 'Orbe biótico', 'Evanescencia', 'Coalescencia'],
  orisa: ['Ametralladora de fusión aumentada', 'Jabalina de energía', 'Fortificación', 'Girojabalina', 'Terraluvión'],
  pharah: ['Lanzacohetes', 'Impulso', 'Propulsores', 'Disparo de conmoción', 'Bombardeo', 'Planeador'],
  ramattra: ['Acelerador de vacío', 'Barrera de vacío', 'Aporrear', 'Vórtice voraz', 'Aniquilación'],
  reaper: ['Escopetas infernales', 'Paso de las tinieblas', 'Forma espectral', 'Espiral de muerte', 'Siega'],
  reinhardt: ['Martillo a reacción', 'Embestida', 'Onda de fuego', 'Campo protector', 'Seísmo'],
  roadhog: ['Chatarrera', 'Garfio', 'Inhalador', 'Juego sucio'],
  sierra: ['Rifle hélice', 'Disparo rastreador', 'Carga sísmica', 'Dron de anclaje', 'Abrecaminos'],
  sigma: ['Hiperesferas', 'Agarre cinético', 'Acreción', 'Barrera experimental', 'Flujo gravitacional'],
  sojourn: ['Cañón de riel', 'Maniobra evasiva', 'Disparo inmovilizador', 'Supercarga'],
  'soldier-76': ['Rifle de pulsos pesado', 'Sprint', 'Campo biótico', 'Cohetes hélice', 'Visor táctico'],
  sombra: ['Subfusil', 'Hackeo', 'Baliza de translocación', 'Virus', 'PEM'],
  symmetra: ['Proyector de fotones', 'Torreta centinela', 'Teletransportador', 'Barrera de fotones'],
  torbjorn: ['Remachadora', 'Martillo de forja', 'Desplegar torreta', 'Sobrecarga', 'Fusión nuclear'],
  tracer: ['Pistolas de pulsos', 'Traslación', 'Regresión', 'Bomba de pulsos'],
  vendetta: ['Colmillo palatino', 'Postura de protección', 'Espiral de tajos', 'Corte volador', 'Corte proyectado', 'Partemundos'],
  venture: ['Excavación inteligente', 'Perforación', 'Enterrarse', 'Impacto tectónico'],
  widowmaker: ['Beso de la viuda', 'Gancho', 'Mina venenosa', 'Infravisión'],
  winston: ['Cañón tesla', 'Salto potenciado', 'Campo de fuerza', 'Rabia primigenia'],
  'wrecking-ball': ['Cañones cuádruples', 'Gancho garra', 'Bola arrolladora', 'Impacto demoledor', 'Escudo adaptable', 'Campo de minas'],
  wuyang: ['Bastón de Xuanwu', 'Flujo restaurativo', 'Torrente impetuoso', 'Estallido de marea', 'Ola guardiana'],
  zarya: ['Cañón de partículas', 'Barrera de partículas', 'Barrera proyectada', 'Bomba de gravedad', 'Energía'],
  zenyatta: ['Orbe de destrucción', 'Orbe de discordia', 'Orbe de armonía', 'Trascendencia', 'Patada veloz'],
}

export function getHeroAbilityNames(slug: string) {
  return HERO_ABILITY_NAMES[slug] ?? []
}

export function buildHeroAbilityOverview(hero: CounterHero) {
  const abilities = getHeroAbilityNames(hero.slug)
  if (abilities.length === 0) {
    return `${hero.name} tiene un kit de ${hero.role} que conviene aprender por ventanas de valor, posicionamiento y recursos clave.`
  }

  const core = abilities.slice(0, 2).join(' y ')
  const tools = abilities.slice(2, 5).join(', ')
  const closing = abilities.slice(5).join(', ')

  if (closing) {
    return `${hero.name} se entiende desde ${core}. Después aparecen herramientas como ${tools} y recursos extra como ${closing}, que definen su ritmo en pelea.`
  }

  if (tools) {
    return `${hero.name} se entiende desde ${core}. Sus otras herramientas principales son ${tools}, que marcan cuándo puede presionar, sobrevivir o cerrar una pelea.`
  }

  return `${hero.name} se entiende desde ${core}: aprende qué amenaza crea, cuándo usar sus recursos y cuándo cambiar de posición.`
}

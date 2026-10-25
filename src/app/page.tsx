import Image from 'next/image'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'
export const metadata = buildMetadata({
  title: 'Overwatch y Deadlock en español: elige tu juego',
  description: 'Guías de Overwatch y Deadlock en español. Consulta habilidades, mapas, counters y builds y elige el juego que quieres aprender.',
  path: '/',
})
export default function Page() {
  return <><PublicNav /><main className="game-selector">
    <p className="eyebrow">REPLAID LAB</p>
    <h1>Tu juego.<br /><span>Tus guías.</span></h1>
    <p className="game-lead">Busca a tu héroe, consulta sus counters o aprende lo que te falta para tu próxima partida.</p>
    <div className="game-choice-grid">
      <Link href="/overwatch" className="game-choice choice-overwatch">
        <div className="game-choice-art" aria-hidden="true"><Image src="/heroes/tracer.png" alt="" width={220} height={220} /><span>OW</span></div>
        <div className="game-choice-copy"><span className="eyebrow">01 / OVERWATCH</span><h2>Overwatch</h2>
          <p>Habilidades, counters, composiciones y mapas. Busca la guía del héroe con el que juegas.</p>
          <span className="game-choice-tags">HÉROES · GUÍAS · PICK LAB</span><strong>Entrar en Overwatch ↗</strong>
        </div>
      </Link>
      <Link href="/deadlock" className="game-choice choice-deadlock">
        <div className="game-choice-art" aria-hidden="true"><Image src="/deadlock/abrams.webp" alt="" width={170} height={220} /><span>DL</span></div>
        <div className="game-choice-copy"><span className="eyebrow">02 / DEADLOCK</span><h2>Deadlock</h2>
          <p>Habilidades en español e inglés, builds con código para importar y un mapa para encontrar objetivos, tiendas y campamentos.</p>
          <span className="game-choice-tags">HÉROES · BUILDS · COUNTERS</span><strong>Entrar en Deadlock ↗</strong>
        </div>
      </Link>
    </div>
    <p className="game-selector-note">Elige un juego para ver sus héroes, guías y novedades.</p>
  </main></>
}

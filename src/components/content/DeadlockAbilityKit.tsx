import Image from 'next/image'
import { deadlockAbilitySection, type DeadlockHeroMedia } from '@/lib/deadlock-media'

export default function DeadlockAbilityKit({ hero, sections }: { hero: DeadlockHeroMedia; sections: { title: string; body: string[] }[] }) {
  return <section className="deadlock-ability-kit" aria-label={`Habilidades de ${hero.name}`}>
    <h2>Habilidades de {hero.name}</h2>
    <div className="deadlock-ability-grid">{hero.abilities.map(ability => {
      const index = deadlockAbilitySection(ability, sections)
      const content = <>
        <span className="deadlock-ability-slot" aria-hidden="true">{ability.slot}</span>
        <Image src={ability.icon} alt="" width={72} height={72} unoptimized />
        <strong>{ability.name}</strong>
        {ability.englishName !== ability.name && <span className="deadlock-ability-alias">{ability.englishName}</span>}
      </>
      return index === undefined
        ? <div className="deadlock-ability-card" key={ability.id}>{content}</div>
        : <a className="deadlock-ability-card" key={ability.id} href={`#apartado-${index}`} aria-label={`${ability.slot}. ${ability.name}: ver explicación`}>{content}</a>
    })}</div>
  </section>
}

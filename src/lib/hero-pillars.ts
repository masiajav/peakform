import { reviewedAnaHero } from './reviewed-hero-ana'
import { reviewedKirikoHero } from './reviewed-hero-kiriko'
import { reviewedGenjiHero } from './reviewed-hero-genji'
import { reviewedReinhardtHero } from './reviewed-hero-reinhardt'
import { reviewedDvaHero } from './reviewed-hero-dva'
import { reviewedWinstonHero } from './reviewed-hero-winston'
import { reviewedCassidyHero } from './reviewed-hero-cassidy'
import { reviewedTracerHero } from './reviewed-hero-tracer'
import { reviewedZaryaHero } from './reviewed-hero-zarya'
import { reviewedShionHero } from './reviewed-hero-shion'
import { reviewedDmonHero } from './reviewed-hero-dmon'
import { reviewedDoctrineHero } from './reviewed-hero-doctrine'

export type HeroPillarCard = {
  title: string
  body: string
}

export type HeroPillarLink = {
  href: string
  label: string
}

export type HeroPillar = {
  slug: 'ana' | 'kiriko' | 'genji' | 'reinhardt' | 'dmon' | 'doctrine' | 'dva' | 'winston' | 'cassidy' | 'tracer' | 'zarya' | 'shion'
  name: string
  role: 'Tank' | 'Support' | 'DPS'
  roleSlug: 'tank' | 'support' | 'dps'
  updatedAt: string
  analysisStatus?: 'trial'
  publishedAt?: string
  schemaDate?: string
  headerTips?: string[]
  quickAnswers?: HeroPillarCard[]
  perksIntro?: string
  conclusion?: string
  balanceReview?: HeroPillarCard[]
  abilityKit?: { src: string; alt: string; width: number; height: number; caption: string }
  video?: { id: string; title: string; description: string; channel?: string; language?: string }
  seoTitle: string
  seoDescription: string
  h1: string
  kicker: string
  intro: string[]
  facts: HeroPillarCard[]
  rankedPlan: string[]
  sections: HeroPillarCard[]
  abilities: HeroPillarCard[]
  perks?: HeroPillarCard[]
  mistakes: string[]
  counters: HeroPillarCard[]
  counterplay: string[]
  compositions: HeroPillarCard[]
  vodReview: string[]
  checklist: string[]
  faqs: Array<{ question: string; answer: string }>
  links: HeroPillarLink[]
}

export const HERO_PILLARS: Record<string, HeroPillar> = {
  shion: reviewedShionHero,
  ana: reviewedAnaHero,
  kiriko: reviewedKirikoHero,
  genji: reviewedGenjiHero,
  reinhardt: reviewedReinhardtHero,
  dva: reviewedDvaHero,
  winston: reviewedWinstonHero,
  cassidy: reviewedCassidyHero,
  tracer: reviewedTracerHero,
  doctrine: reviewedDoctrineHero,
  dmon: reviewedDmonHero,
  zarya: reviewedZaryaHero,
}

export function getHeroPillar(slug: string) {
  return HERO_PILLARS[slug] ?? null
}

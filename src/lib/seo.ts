import type { Metadata } from 'next'

export const SITE_NAME = 'Replaid Lab'
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.replaidlab.com'
export const SITE_URL = configuredSiteUrl
  .replace(/\/$/, '')
  .replace(/^https?:\/\/replaidlab\.com$/i, 'https://www.replaidlab.com')
export const DEFAULT_OG_IMAGE = '/og-image.svg'

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[#>*_~\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function buildExcerpt(value: string, maxLength = 156) {
  const clean = stripMarkdown(value)
  if (clean.length <= maxLength) return clean
  return `${clean.slice(0, maxLength - 1).trim()}…`
}

export function readingTime(value: string) {
  const words = stripMarkdown(value).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}: {
  title: string
  description: string
  path: string
  image?: string | null
  type?: 'website' | 'article'
}): Metadata {
  const url = absoluteUrl(path)
  const imagePath = image || DEFAULT_OG_IMAGE
  const images = [{ url: absoluteUrl(imagePath), alt: title }]

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images,
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(imagePath)],
    },
  }
}

'use client'

/* eslint-disable @next/next/no-img-element */

import { useState, type CSSProperties } from 'react'
import Image from 'next/image'

type HeroPortraitImageProps = {
  src: string | null
  name: string
  fallbackClassName?: string
  priority?: boolean
  sizes: string
  imageStyle?: CSSProperties
}

export default function HeroPortraitImage({
  src,
  name,
  fallbackClassName,
  priority = false,
  sizes,
  imageStyle,
}: HeroPortraitImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <div className={fallbackClassName}>{name.slice(0, 1)}</div>
  }

  const isRemote = src.startsWith('http')

  if (isRemote) {
    return (
      <img
        src={src}
        alt={name}
        loading={priority ? 'eager' : 'lazy'}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          ...imageStyle,
        }}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      priority={priority}
      sizes={sizes}
      style={imageStyle}
      onError={() => setFailed(true)}
    />
  )
}

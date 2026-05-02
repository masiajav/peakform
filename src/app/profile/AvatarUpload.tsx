'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

interface AvatarUploadProps {
  userId: string
  currentUrl: string | null
  displayName: string
  subtitle?: React.ReactNode
}

export default function AvatarUpload({ userId, currentUrl, displayName, subtitle }: AvatarUploadProps) {
  const [url, setUrl]           = useState(currentUrl)
  const [hovered, setHovered]   = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''

    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen no puede superar 2 MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes')
      return
    }

    setUploading(true)
    setError(null)

    const ext  = file.name.split('.').pop() ?? 'jpg'
    const path = `${userId}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type })

    if (uploadError) {
      setError('Error al subir la imagen')
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(path)

    const cacheBustedUrl = `${publicUrl}?t=${Date.now()}`

    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatar_url: cacheBustedUrl }),
    })

    if (!res.ok) {
      setError('Error al guardar la imagen')
    } else {
      setUrl(cacheBustedUrl)
    }

    setUploading(false)
  }

  const initial = (displayName || '?')[0].toUpperCase()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 72, height: 72,
          background: 'var(--surface3)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: uploading ? 'default' : 'pointer',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {url ? (
          <img src={url} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: 'var(--text2)' }}>
            {initial}
          </span>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: (hovered || uploading) ? 1 : 0,
          transition: 'opacity 0.15s',
          fontSize: 11, color: '#fff',
          letterSpacing: 1.5,
          fontFamily: 'Bebas Neue, sans-serif',
          pointerEvents: 'none',
        }}>
          {uploading ? 'SUBIENDO...' : 'CAMBIAR'}
        </div>
      </div>

      <div>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: 0.5, color: 'var(--text)' }}>
          {displayName}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>
            {subtitle}
          </div>
        )}
        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: subtitle ? 2 : 4 }}>
          JPG, PNG o GIF · Máx. 2 MB
        </div>
        {error && (
          <div style={{ fontSize: 12, color: 'var(--danger)', marginTop: 4 }}>{error}</div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  )
}

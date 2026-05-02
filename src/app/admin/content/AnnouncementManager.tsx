'use client'

import { useState } from 'react'

interface Announcement {
  id: string
  title: string
  body: string
  published: boolean
  created_at: string
}

export default function AnnouncementManager({ initialAnnouncements }: { initialAnnouncements: Announcement[] }) {
  const [items, setItems] = useState(initialAnnouncements)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const res = await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, published: false }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setSaving(false); return }
    setItems([data, ...items])
    setTitle('')
    setBody('')
    setSaving(false)
  }

  async function togglePublished(item: Announcement) {
    const res = await fetch(`/api/admin/announcements/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !item.published }),
    })
    if (res.ok) {
      const updated = await res.json()
      setItems(items.map(i => i.id === item.id ? updated : i))
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este anuncio?')) return
    const res = await fetch(`/api/admin/announcements/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(items.filter(i => i.id !== id))
  }

  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 20 }}>
        NOTICIAS Y ANUNCIOS
      </div>

      {/* Create form */}
      <form onSubmit={handleCreate} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif' }}>
          NUEVO ANUNCIO
        </div>
        {error && (
          <div style={{ fontSize: 13, color: 'var(--danger)', background: 'rgba(255,68,68,0.06)', border: '1px solid rgba(255,68,68,0.2)', padding: '10px 14px' }}>
            {error}
          </div>
        )}
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título del anuncio"
          required
        />
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Contenido del anuncio..."
          rows={4}
          required
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={saving} className="btn btn-primary btn-sm">
            {saving ? 'GUARDANDO...' : 'CREAR ANUNCIO'}
          </button>
        </div>
      </form>

      {/* List */}
      {items.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--text3)' }}>No hay anuncios todavía.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map(item => (
            <div key={item.id} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 16,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{item.title}</span>
                  <span style={{
                    fontSize: 10, letterSpacing: 1, fontFamily: 'Bebas Neue, sans-serif',
                    color: item.published ? 'var(--green)' : 'var(--text3)',
                    border: `1px solid ${item.published ? 'var(--green)' : 'var(--border)'}`,
                    padding: '1px 6px',
                  }}>
                    {item.published ? 'PUBLICADO' : 'BORRADOR'}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                  {item.body.length > 120 ? item.body.slice(0, 120) + '…' : item.body}
                </p>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6 }}>
                  {new Date(item.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => togglePublished(item)}
                  className="btn btn-secondary btn-sm"
                >
                  {item.published ? 'Ocultar' : 'Publicar'}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ fontSize: 12, color: 'var(--danger)', background: 'transparent', border: '1px solid rgba(255,68,68,0.3)', padding: '4px 10px', cursor: 'pointer' }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

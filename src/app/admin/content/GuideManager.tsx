'use client'

import { useState } from 'react'

interface Guide {
  id: string
  title: string
  slug: string
  body: string
  category: string | null
  published: boolean
  created_at: string
}

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
}

export default function GuideManager({ initialGuides }: { initialGuides: Guide[] }) {
  const [items, setItems] = useState(initialGuides)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleTitleChange(val: string) {
    setTitle(val)
    setSlug(toSlug(val))
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const res = await fetch('/api/admin/guides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, body, category: category || null, published: false }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setSaving(false); return }
    setItems([data, ...items])
    setTitle('')
    setSlug('')
    setBody('')
    setCategory('')
    setSaving(false)
  }

  async function togglePublished(item: Guide) {
    const res = await fetch(`/api/admin/guides/${item.id}`, {
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
    if (!confirm('¿Eliminar esta guía?')) return
    const res = await fetch(`/api/admin/guides/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(items.filter(i => i.id !== id))
  }

  return (
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 48 }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--green)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 20 }}>
        GUÍAS Y CONSEJOS
      </div>

      {/* Create form */}
      <form onSubmit={handleCreate} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif' }}>
          NUEVA GUÍA
        </div>
        {error && (
          <div style={{ fontSize: 13, color: 'var(--danger)', background: 'rgba(255,68,68,0.06)', border: '1px solid rgba(255,68,68,0.2)', padding: '10px 14px' }}>
            {error}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>TÍTULO *</div>
            <input
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Cómo mejorar tu posicionamiento como Support"
              required
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>SLUG * (URL)</div>
            <input
              value={slug}
              onChange={e => setSlug(e.target.value)}
              placeholder="como-mejorar-posicionamiento-support"
              required
            />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>CATEGORÍA (opcional)</div>
          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Posicionamiento · Mecánicas · Mentalidad · General"
          />
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>CONTENIDO (Markdown) *</div>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder={'# Título\n\nEscribe tu guía en Markdown...\n\n## Sección 1\n\nContenido...'}
            rows={10}
            required
            style={{ fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={saving} className="btn btn-primary btn-sm">
            {saving ? 'GUARDANDO...' : 'CREAR GUÍA'}
          </button>
        </div>
      </form>

      {/* List */}
      {items.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--text3)' }}>No hay guías todavía.</p>
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
                  {item.category && (
                    <span style={{ fontSize: 11, color: 'var(--text3)', background: 'var(--surface2)', border: '1px solid var(--border2)', padding: '1px 8px' }}>
                      {item.category}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>
                  /guides/{item.slug}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                  {new Date(item.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                  {' · '}{item.body.split(' ').length} palabras
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <a
                  href={`/guides/${item.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 12, color: 'var(--text2)', background: 'transparent', border: '1px solid var(--border)', padding: '4px 10px', textDecoration: 'none', display: 'inline-block' }}
                >
                  Ver
                </a>
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

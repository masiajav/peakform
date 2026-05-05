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
  role?: string | null
  hero?: string | null
  map?: string | null
}

function toSlug(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
}

export default function GuideManager({ initialGuides }: { initialGuides: Guide[] }) {
  const [items, setItems] = useState(initialGuides)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    body: '',
    category: '',
    excerpt: '',
    seo_title: '',
    seo_description: '',
    author: '',
    role: '',
    hero: '',
    map: '',
    tags: '',
    sponsor_title: '',
    sponsor_body: '',
    sponsor_url: '',
    sponsor_cta: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function setField(key: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [key]: value, ...(key === 'title' ? { slug: toSlug(value) } : {}) }))
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const res = await fetch('/api/admin/guides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, published: false }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setSaving(false); return }
    setItems([data, ...items])
    setForm({
      title: '',
      slug: '',
      body: '',
      category: '',
      excerpt: '',
      seo_title: '',
      seo_description: '',
      author: '',
      role: '',
      hero: '',
      map: '',
      tags: '',
      sponsor_title: '',
      sponsor_body: '',
      sponsor_url: '',
      sponsor_cta: '',
    })
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
    if (!confirm('Eliminar esta guia?')) return
    const res = await fetch(`/api/admin/guides/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(items.filter(i => i.id !== id))
  }

  return (
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 48 }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--green)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 20 }}>
        GUIAS Y CONSEJOS
      </div>

      <form onSubmit={handleCreate} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif' }}>
          NUEVA GUIA
        </div>
        {error && (
          <div style={{ fontSize: 13, color: 'var(--danger)', background: 'rgba(255,68,68,0.06)', border: '1px solid rgba(255,68,68,0.2)', padding: '10px 14px' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="TITULO *" value={form.title} onChange={v => setField('title', v)} placeholder="Como mejorar tu posicionamiento como Support" required />
          <Field label="SLUG *" value={form.slug} onChange={v => setField('slug', v)} placeholder="posicionamiento-support-overwatch" required />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="CATEGORIA" value={form.category} onChange={v => setField('category', v)} placeholder="Posicionamiento" />
          <Field label="AUTOR" value={form.author} onChange={v => setField('author', v)} placeholder="Replaid Lab" />
        </div>

        <Textarea label="EXTRACTO" value={form.excerpt} onChange={v => setField('excerpt', v)} placeholder="Resumen corto para listados y snippets" rows={2} />
        <Field label="SEO TITLE" value={form.seo_title} onChange={v => setField('seo_title', v)} placeholder="Titulo optimizado para busqueda" />
        <Field label="SEO DESCRIPTION" value={form.seo_description} onChange={v => setField('seo_description', v)} placeholder="Descripcion de 140-160 caracteres" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>ROL</div>
            <select value={form.role} onChange={e => setField('role', e.target.value)}>
              <option value="">Sin rol</option>
              <option value="tank">Tank</option>
              <option value="dps">DPS</option>
              <option value="support">Support</option>
              <option value="flex">Flex</option>
            </select>
          </div>
          <Field label="HEROE" value={form.hero} onChange={v => setField('hero', v)} placeholder="ana" />
          <Field label="MAPA" value={form.map} onChange={v => setField('map', v)} placeholder="kings-row" />
          <Field label="TAGS" value={form.tags} onChange={v => setField('tags', v)} placeholder="macro, aim" />
        </div>

        <Textarea label="CONTENIDO MARKDOWN *" value={form.body} onChange={v => setField('body', v)} placeholder={'# Titulo\n\nEscribe tu guia en Markdown...'} rows={10} required monospace />

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="PATROCINIO TITULO" value={form.sponsor_title} onChange={v => setField('sponsor_title', v)} placeholder="Recurso recomendado" />
          <Field label="PATROCINIO CTA" value={form.sponsor_cta} onChange={v => setField('sponsor_cta', v)} placeholder="Ver recurso" />
          <Field label="PATROCINIO URL" value={form.sponsor_url} onChange={v => setField('sponsor_url', v)} placeholder="https://..." />
          <Field label="PATROCINIO TEXTO" value={form.sponsor_body} onChange={v => setField('sponsor_body', v)} placeholder="Texto corto y etiquetado" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={saving} className="btn btn-primary btn-sm">
            {saving ? 'GUARDANDO...' : 'CREAR GUIA'}
          </button>
        </div>
      </form>

      {items.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--text3)' }}>No hay guias todavia.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map(item => (
            <div key={item.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{item.title}</span>
                  <span style={{ fontSize: 10, letterSpacing: 1, fontFamily: 'Bebas Neue, sans-serif', color: item.published ? 'var(--green)' : 'var(--text3)', border: `1px solid ${item.published ? 'var(--green)' : 'var(--border)'}`, padding: '1px 6px' }}>
                    {item.published ? 'PUBLICADO' : 'BORRADOR'}
                  </span>
                  {item.category && <span style={{ fontSize: 11, color: 'var(--text3)', background: 'var(--surface2)', border: '1px solid var(--border2)', padding: '1px 8px' }}>{item.category}</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>/guides/{item.slug}</div>
                {(item.role || item.hero || item.map) && (
                  <div style={{ fontSize: 11, color: 'var(--accent)', marginBottom: 4 }}>
                    {[item.role, item.hero, item.map].filter(Boolean).join(' · ')}
                  </div>
                )}
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                  {new Date(item.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                  {' · '}{item.body.split(' ').length} palabras
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <a href={`/guides/${item.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--text2)', background: 'transparent', border: '1px solid var(--border)', padding: '4px 10px', textDecoration: 'none', display: 'inline-block' }}>Ver</a>
                <button onClick={() => togglePublished(item)} className="btn btn-secondary btn-sm">{item.published ? 'Ocultar' : 'Publicar'}</button>
                <button onClick={() => handleDelete(item.id)} style={{ fontSize: 12, color: 'var(--danger)', background: 'transparent', border: '1px solid rgba(255,68,68,0.3)', padding: '4px 10px', cursor: 'pointer' }}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange, placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>{label}</div>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required} />
    </div>
  )
}

function Textarea({ label, value, onChange, placeholder, rows, required = false, monospace = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; rows: number; required?: boolean; monospace?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>{label}</div>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} required={required} style={monospace ? { fontFamily: 'monospace', fontSize: 13 } : undefined} />
    </div>
  )
}

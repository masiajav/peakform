'use client'

import { useState } from 'react'

interface Announcement {
  id: string
  title: string
  slug: string
  body: string
  published: boolean
  created_at: string
  content_type?: string | null
  excerpt?: string | null
  seo_title?: string | null
  seo_description?: string | null
  author?: string | null
  role?: string | null
  hero?: string | null
  map?: string | null
  tags?: string[] | null
  sponsor_title?: string | null
  sponsor_body?: string | null
  sponsor_url?: string | null
  sponsor_cta?: string | null
}

function toSlug(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
}

const emptyForm = {
  title: '',
  slug: '',
  body: '',
  content_type: 'news',
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
}

function formFromAnnouncement(item: Announcement) {
  return {
    title: item.title || '',
    slug: item.slug || '',
    body: item.body || '',
    content_type: item.content_type || 'news',
    excerpt: item.excerpt || '',
    seo_title: item.seo_title || '',
    seo_description: item.seo_description || '',
    author: item.author || '',
    role: item.role || '',
    hero: item.hero || '',
    map: item.map || '',
    tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
    sponsor_title: item.sponsor_title || '',
    sponsor_body: item.sponsor_body || '',
    sponsor_url: item.sponsor_url || '',
    sponsor_cta: item.sponsor_cta || '',
  }
}

export default function AnnouncementManager({ initialAnnouncements }: { initialAnnouncements: Announcement[] }) {
  const [items, setItems] = useState(initialAnnouncements)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function setField(key: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [key]: value, ...(key === 'title' ? { slug: toSlug(value) } : {}) }))
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const res = await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, published: false }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setSaving(false); return }
    setItems([data, ...items])
    setForm(emptyForm)
    setSaving(false)
  }

  function startEdit(item: Announcement) {
    setError(null)
    setEditingId(item.id)
    setEditForm(formFromAnnouncement(item))
  }

  function cancelEdit() {
    setEditingId(null)
    setEditForm(emptyForm)
  }

  async function handleUpdate(e: React.FormEvent, id: string) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const res = await fetch(`/api/admin/announcements/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setSaving(false); return }
    setItems(items.map(i => i.id === id ? data : i))
    cancelEdit()
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
    if (!confirm('Eliminar este anuncio?')) return
    const res = await fetch(`/api/admin/announcements/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(items.filter(i => i.id !== id))
  }

  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 20 }}>
        NOTICIAS Y PATCH NOTES
      </div>

      <form onSubmit={handleCreate} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif' }}>
          NUEVA ENTRADA
        </div>
        {error && <div style={{ fontSize: 13, color: 'var(--danger)', background: 'rgba(255,68,68,0.06)', border: '1px solid rgba(255,68,68,0.2)', padding: '10px 14px' }}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 160px', gap: 14 }}>
          <Field label="TITULO *" value={form.title} onChange={v => setField('title', v)} placeholder="Cambios de balance de la temporada" required />
          <Field label="SLUG" value={form.slug} onChange={v => setField('slug', v)} placeholder="cambios-balance-temporada" />
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>TIPO</div>
            <select value={form.content_type} onChange={e => setField('content_type', e.target.value)}>
              <option value="news">Noticia</option>
              <option value="patch_note">Patch note</option>
            </select>
          </div>
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
          <Field label="TAGS" value={form.tags} onChange={v => setField('tags', v)} placeholder="temporada, balance" />
        </div>

        <Textarea label="CONTENIDO *" value={form.body} onChange={v => setField('body', v)} placeholder="Contenido de la entrada..." rows={6} required />

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="PATROCINIO TITULO" value={form.sponsor_title} onChange={v => setField('sponsor_title', v)} placeholder="Recurso recomendado" />
          <Field label="PATROCINIO CTA" value={form.sponsor_cta} onChange={v => setField('sponsor_cta', v)} placeholder="Ver recurso" />
          <Field label="PATROCINIO URL" value={form.sponsor_url} onChange={v => setField('sponsor_url', v)} placeholder="https://..." />
          <Field label="PATROCINIO TEXTO" value={form.sponsor_body} onChange={v => setField('sponsor_body', v)} placeholder="Texto corto y etiquetado" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={saving} className="btn btn-primary btn-sm">
            {saving ? 'GUARDANDO...' : 'CREAR ENTRADA'}
          </button>
        </div>
      </form>

      {items.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--text3)' }}>No hay anuncios todavía.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map(item => (
            <div key={item.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{item.title}</span>
                  <span style={{ fontSize: 10, letterSpacing: 1, fontFamily: 'Bebas Neue, sans-serif', color: item.published ? 'var(--green)' : 'var(--text3)', border: `1px solid ${item.published ? 'var(--green)' : 'var(--border)'}`, padding: '1px 6px' }}>
                    {item.published ? 'PUBLICADO' : 'BORRADOR'}
                  </span>
                  <span style={{ fontSize: 10, letterSpacing: 1, fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)' }}>
                    {item.content_type === 'patch_note' ? 'PATCH' : 'NEWS'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>
                  /{item.content_type === 'patch_note' ? 'patch-notes' : 'news'}/{item.slug}
                </div>
                {(item.role || item.hero || item.map) && (
                  <div style={{ fontSize: 11, color: 'var(--accent)', marginBottom: 4 }}>
                    {[item.role, item.hero, item.map].filter(Boolean).join(' · ')}
                  </div>
                )}
                <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                  {item.body.length > 120 ? item.body.slice(0, 120) + '...' : item.body}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => startEdit(item)} className="btn btn-secondary btn-sm">Editar</button>
                <button onClick={() => togglePublished(item)} className="btn btn-secondary btn-sm">{item.published ? 'Ocultar' : 'Publicar'}</button>
                <button onClick={() => handleDelete(item.id)} style={{ fontSize: 12, color: 'var(--danger)', background: 'transparent', border: '1px solid rgba(255,68,68,0.3)', padding: '4px 10px', cursor: 'pointer' }}>Eliminar</button>
              </div>
              {editingId === item.id && (
                <form onSubmit={e => handleUpdate(e, item.id)} style={{ marginTop: 18, flexBasis: '100%', background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 18, display: 'grid', gap: 14 }}>
                  <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif' }}>EDITANDO ENTRADA</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 160px', gap: 14 }}>
                    <Field label="TITULO *" value={editForm.title} onChange={v => setEditForm(prev => ({ ...prev, title: v }))} required />
                    <Field label="SLUG" value={editForm.slug} onChange={v => setEditForm(prev => ({ ...prev, slug: v }))} />
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>TIPO</div>
                      <select value={editForm.content_type} onChange={e => setEditForm(prev => ({ ...prev, content_type: e.target.value }))}>
                        <option value="news">Noticia</option>
                        <option value="patch_note">Patch note</option>
                      </select>
                    </div>
                  </div>
                  <Textarea label="EXTRACTO" value={editForm.excerpt} onChange={v => setEditForm(prev => ({ ...prev, excerpt: v }))} rows={2} />
                  <Field label="SEO TITLE" value={editForm.seo_title} onChange={v => setEditForm(prev => ({ ...prev, seo_title: v }))} />
                  <Field label="SEO DESCRIPTION" value={editForm.seo_description} onChange={v => setEditForm(prev => ({ ...prev, seo_description: v }))} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>ROL</div>
                      <select value={editForm.role} onChange={e => setEditForm(prev => ({ ...prev, role: e.target.value }))}>
                        <option value="">Sin rol</option>
                        <option value="tank">Tank</option>
                        <option value="dps">DPS</option>
                        <option value="support">Support</option>
                        <option value="flex">Flex</option>
                      </select>
                    </div>
                    <Field label="HEROE" value={editForm.hero} onChange={v => setEditForm(prev => ({ ...prev, hero: v }))} />
                    <Field label="MAPA" value={editForm.map} onChange={v => setEditForm(prev => ({ ...prev, map: v }))} />
                    <Field label="TAGS" value={editForm.tags} onChange={v => setEditForm(prev => ({ ...prev, tags: v }))} />
                  </div>
                  <Textarea label="CONTENIDO *" value={editForm.body} onChange={v => setEditForm(prev => ({ ...prev, body: v }))} rows={8} required />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <Field label="PATROCINIO TITULO" value={editForm.sponsor_title} onChange={v => setEditForm(prev => ({ ...prev, sponsor_title: v }))} />
                    <Field label="PATROCINIO CTA" value={editForm.sponsor_cta} onChange={v => setEditForm(prev => ({ ...prev, sponsor_cta: v }))} />
                    <Field label="PATROCINIO URL" value={editForm.sponsor_url} onChange={v => setEditForm(prev => ({ ...prev, sponsor_url: v }))} />
                    <Field label="PATROCINIO TEXTO" value={editForm.sponsor_body} onChange={v => setEditForm(prev => ({ ...prev, sponsor_body: v }))} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button type="button" onClick={cancelEdit} className="btn btn-secondary btn-sm">Cancelar</button>
                    <button type="submit" disabled={saving} className="btn btn-primary btn-sm">{saving ? 'GUARDANDO...' : 'Guardar cambios'}</button>
                  </div>
                </form>
              )}
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

function Textarea({ label, value, onChange, placeholder, rows, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; rows: number; required?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>{label}</div>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} required={required} />
    </div>
  )
}

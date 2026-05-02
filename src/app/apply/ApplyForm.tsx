'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TIER_OPTIONS = ['Champion', 'Grandmaster', 'Master', 'Diamond']
const DIVISION_OPTIONS = ['1', '2', '3', '4', '5']

const ROLE_OPTIONS = [
  { value: 'tank',    label: 'Tank' },
  { value: 'dps',     label: 'DPS' },
  { value: 'support', label: 'Support' },
  { value: 'flex',    label: 'Flex' },
]

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif' }}>
          {label}
        </div>
        {hint && <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>{hint}</div>}
      </div>
      {children}
    </div>
  )
}

export default function ApplyForm() {
  const router = useRouter()

  const [displayName,   setDisplayName]   = useState('')
  const [battletag,     setBattletag]     = useState('')
  const [peakTier,      setPeakTier]      = useState('Grandmaster')
  const [peakDivision,  setPeakDivision]  = useState('3')
  const [mainRole,      setMainRole]      = useState('support')
  const [bio,           setBio]           = useState('')
  const [specialties,   setSpecialties]   = useState('')
  const [isPro,         setIsPro]         = useState(false)
  const [proExperience, setProExperience] = useState('')
  const [priceStarter,  setPriceStarter]  = useState('9')
  const [pricePro,      setPricePro]      = useState('17')
  const [priceDeepDive, setPriceDeepDive] = useState('30')
  const [descStarter,   setDescStarter]   = useState('')
  const [descPro,       setDescPro]       = useState('')
  const [descDeepDive,  setDescDeepDive]  = useState('')

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const peakRank = `${peakTier} ${peakDivision}`

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!displayName.trim() || !battletag.trim()) {
      setError('Rellena todos los campos obligatorios')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name:    displayName.trim(),
          battletag:       battletag.trim(),
          peak_rank:       peakRank,
          peak_sr:         0,
          main_role:       mainRole,
          bio:             bio.trim() || null,
          specialties:     specialties.split(',').map(s => s.trim()).filter(Boolean),
          pro_experience:  isPro ? proExperience.trim() || null : null,
          price_starter:   Math.round(parseFloat(priceStarter) * 100),
          price_pro:       Math.round(parseFloat(pricePro) * 100),
          price_deep_dive: Math.round(parseFloat(priceDeepDive) * 100),
          description_starter:   descStarter.trim()   || null,
          description_pro:       descPro.trim()        || null,
          description_deep_dive: descDeepDive.trim()   || null,
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Error al enviar la solicitud')
      }
      router.push('/dashboard?applied=1')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {error && (
        <div style={{
          background: 'rgba(255,68,68,0.06)', border: '1px solid rgba(255,68,68,0.2)',
          padding: '12px 16px', fontSize: 13, color: 'var(--danger)',
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Field label="NOMBRE DE PERFIL *" hint="Nombre público que verán los jugadores">
          <input
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder="KingAna_EU"
            required
          />
        </Field>

        <Field label="BATTLETAG *" hint="Formato: Jugador#1234">
          <input
            value={battletag}
            onChange={e => setBattletag(e.target.value)}
            placeholder="Jugador#1234"
            required
          />
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        <Field label="RANGO PEAK *">
          <select value={peakTier} onChange={e => setPeakTier(e.target.value)}>
            {TIER_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        <Field label="DIVISIÓN *" hint="5 = más bajo · 1 = más alto">
          <select value={peakDivision} onChange={e => setPeakDivision(e.target.value)}>
            {DIVISION_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>

        <Field label="ROL PRINCIPAL *">
          <select value={mainRole} onChange={e => setMainRole(e.target.value)}>
            {ROLE_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </Field>
      </div>

      <Field label="BIO" hint="Cuéntale a los jugadores tu experiencia (opcional)">
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          rows={4}
          placeholder="Jugador activo Champion o Grandmaster 1. Especializado en Support y análisis de posicionamiento..."
        />
      </Field>

      <Field label="ESPECIALIDADES" hint="Separa con comas: Posicionamiento, Mecánicas de Ana, Gestión de ultimates...">
        <input
          value={specialties}
          onChange={e => setSpecialties(e.target.value)}
          placeholder="Posicionamiento, Mecánicas de Ana, Rotaciones support"
        />
      </Field>

      {/* Experiencia competitiva */}
      <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 14 }}>
          EXPERIENCIA COMPETITIVA OFICIAL
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: isPro ? 16 : 0 }}>
          <input
            type="checkbox"
            checked={isPro}
            onChange={e => setIsPro(e.target.checked)}
            style={{ width: 16, height: 16, accentColor: 'var(--accent)', cursor: 'pointer' }}
          />
          <span style={{ fontSize: 13, color: 'var(--text2)' }}>
            He competido en ligas o torneos oficiales de Overwatch
          </span>
        </label>

        {isPro && (
          <Field label="DETALLES" hint="Equipo, temporada, liga o torneo (opcional)">
            <textarea
              value={proExperience}
              onChange={e => setProExperience(e.target.value)}
              rows={3}
              placeholder="Ej: Jugué en la Overwatch Contenders EU Season 3 con Team X. También participé en el Open Division 2023."
            />
          </Field>
        )}
      </div>

      {/* Pricing */}
      <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 6 }}>
          PRECIOS BASE (€) *
        </div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 14 }}>
          Tú cobras íntegro el precio que fijes. Replaid Lab añade un 20% extra que paga el jugador por encima de tu precio.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {([
            { label: 'STARTER (48h)',    price: priceStarter,  setPrice: setPriceStarter,  desc: descStarter,  setDesc: setDescStarter,  min: 2, max: 50  },
            { label: 'PRO (24h)',        price: pricePro,      setPrice: setPricePro,      desc: descPro,      setDesc: setDescPro,      min: 5, max: 100 },
            { label: 'DEEP DIVE (72h)',  price: priceDeepDive, setPrice: setPriceDeepDive, desc: descDeepDive, setDesc: setDescDeepDive, min: 8, max: 200 },
          ] as const).map(({ label, price, setPrice, desc, setDesc, min, max }) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16, alignItems: 'start' }}>
              <Field label={label}>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  min={min}
                  max={max}
                  step={0.5}
                  required
                />
              </Field>
              <Field label="QUÉ INCLUYE (opcional)" hint="Describe lo que ofreces en este tier">
                <textarea
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  rows={2}
                  placeholder="Ej: Análisis escrito de tu replay + corrección de posicionamiento y mecánicas..."
                  style={{ resize: 'vertical' }}
                />
              </Field>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.2)',
        padding: '12px 16px', fontSize: 13, color: 'var(--yellow)',
      }}>
        Tu solicitud quedará en estado <strong>pendiente</strong> hasta que el equipo de Replaid Lab la revise y apruebe. Recibirás acceso al panel de experto en 24-48h.
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
          {loading ? 'ENVIANDO...' : 'ENVIAR SOLICITUD →'}
        </button>
      </div>

    </form>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TIER_OPTIONS = ['Top 500', 'Champion', 'Grandmaster', 'Master', 'Diamond']
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

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const hasDivision = peakTier !== 'Top 500'
  const peakRank = hasDivision ? `${peakTier} ${peakDivision}` : 'Top 500'

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

      <div style={{ display: 'grid', gridTemplateColumns: hasDivision ? '1fr 1fr 1fr' : '1fr 1fr', gap: 20 }}>
        <Field label="RANGO PEAK *">
          <select value={peakTier} onChange={e => setPeakTier(e.target.value)}>
            {TIER_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        {hasDivision && (
          <Field label="DIVISIÓN *" hint="5 = más bajo · 1 = más alto">
            <select value={peakDivision} onChange={e => setPeakDivision(e.target.value)}>
              {DIVISION_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
        )}

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
          placeholder="Jugador activo en Top 500 desde Season 5. Especializado en Support y análisis de posicionamiento..."
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
          PeakForm añade un 15% de comisión al precio que el jugador paga. Tú recibes el precio base.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          <Field label="STARTER (48h · 1 pregunta)">
            <input
              type="number"
              value={priceStarter}
              onChange={e => setPriceStarter(e.target.value)}
              min={5}
              max={50}
              step={0.5}
              required
            />
          </Field>
          <Field label="PRO (24h · 3 preguntas · timestamps)">
            <input
              type="number"
              value={pricePro}
              onChange={e => setPricePro(e.target.value)}
              min={10}
              max={100}
              step={0.5}
              required
            />
          </Field>
          <Field label="DEEP DIVE (72h · 3 replays · hoja de ruta)">
            <input
              type="number"
              value={priceDeepDive}
              onChange={e => setPriceDeepDive(e.target.value)}
              min={20}
              max={200}
              step={0.5}
              required
            />
          </Field>
        </div>
      </div>

      <div style={{
        background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.2)',
        padding: '12px 16px', fontSize: 13, color: 'var(--yellow)',
      }}>
        Tu solicitud quedará en estado <strong>pendiente</strong> hasta que el equipo de PeakForm la revise y apruebe. Recibirás acceso al panel de experto en 24-48h.
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
          {loading ? 'ENVIANDO...' : 'ENVIAR SOLICITUD →'}
        </button>
      </div>

    </form>
  )
}

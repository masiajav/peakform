'use client'

import { useState } from 'react'

interface ProfileFormProps {
  displayName: string
  battletag:   string | null
  isExpert:    boolean
  bio:         string | null
  discordHandle: string | null
  specialties: string[]
  priceStarter:        number
  pricePro:            number
  priceDeepDive:       number
  descriptionStarter:   string | null
  descriptionPro:       string | null
  descriptionDeepDive:  string | null
  trialEnabled:        boolean
  trialPrice:          number | null
  trialRefundable:     boolean
  trialDeadlineHours:  number
}

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

export default function ProfileForm({
  displayName: initialName,
  battletag:   initialBattletag,
  isExpert,
  bio:         initialBio,
  discordHandle: initialDiscordHandle,
  specialties: initialSpecialties,
  priceStarter:       initialStarter,
  pricePro:           initialPro,
  priceDeepDive:      initialDeepDive,
  descriptionStarter:   initialDescStarter,
  descriptionPro:       initialDescPro,
  descriptionDeepDive:  initialDescDeepDive,
  trialEnabled:       initialTrialEnabled,
  trialPrice:         initialTrialPrice,
  trialRefundable:    initialTrialRefundable,
  trialDeadlineHours: initialTrialDeadlineHours,
}: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(initialName)
  const [battletag,   setBattletag]   = useState(initialBattletag ?? '')
  const [bio,         setBio]         = useState(initialBio ?? '')
  const [discordHandle, setDiscordHandle] = useState(initialDiscordHandle ?? '')
  const [specialties, setSpecialties] = useState(initialSpecialties.join(', '))
  const [priceStarter,  setPriceStarter]  = useState((initialStarter  / 100).toFixed(0))
  const [pricePro,      setPricePro]      = useState((initialPro       / 100).toFixed(0))
  const [priceDeepDive, setPriceDeepDive] = useState((initialDeepDive  / 100).toFixed(0))
  const [descStarter,   setDescStarter]   = useState(initialDescStarter  ?? '')
  const [descPro,       setDescPro]       = useState(initialDescPro       ?? '')
  const [descDeepDive,  setDescDeepDive]  = useState(initialDescDeepDive  ?? '')
  const [trialEnabled,       setTrialEnabled]       = useState(initialTrialEnabled)
  const [trialPrice,         setTrialPrice]         = useState(((initialTrialPrice ?? 500) / 100).toFixed(0))
  const [trialRefundable,    setTrialRefundable]    = useState(initialTrialRefundable)
  const [trialDeadlineHours, setTrialDeadlineHours] = useState(String(initialTrialDeadlineHours))

  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError(null)

    const profileRes = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ display_name: displayName, battletag }),
    })
    if (!profileRes.ok) {
      const d = await profileRes.json()
      setError(d.error || 'Error al guardar el perfil')
      setSaving(false)
      return
    }

    if (isExpert) {
      const expertRes = await fetch('/api/expert/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio,
          discord_handle: discordHandle.trim() || null,
          specialties,
          price_starter:         priceStarter,
          price_pro:             pricePro,
          price_deep_dive:       priceDeepDive,
          description_starter:   descStarter.trim()   || null,
          description_pro:       descPro.trim()        || null,
          description_deep_dive: descDeepDive.trim()   || null,
          trial_enabled:         trialEnabled,
          trial_price:           trialEnabled ? trialPrice : null,
          trial_refundable:      trialEnabled ? trialRefundable : false,
          trial_deadline_hours:  trialEnabled ? trialDeadlineHours : 48,
        }),
      })
      if (!expertRes.ok) {
        const d = await expertRes.json()
        setError(d.error || 'Error al guardar el perfil de experto')
        setSaving(false)
        return
      }
    }

    setSaved(true)
    setSaving(false)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 16 }}>
          INFORMACION BASICA
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Field label="NOMBRE PUBLICO *" hint="Nombre que veran otros usuarios">
            <input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="KingAna_EU"
              required
            />
          </Field>
          <Field label="BATTLETAG" hint="Formato: Jugador#1234">
            <input
              value={battletag}
              onChange={e => setBattletag(e.target.value)}
              placeholder="Jugador#1234"
            />
          </Field>
        </div>
      </div>

      {isExpert && (
        <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 16 }}>
            PERFIL DE EXPERTO
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Field label="BIO" hint="Descripcion que veran los jugadores en tu perfil">
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={4}
                placeholder="Cuentale a los jugadores tu experiencia y estilo de analisis..."
              />
            </Field>

            <Field label="DISCORD PERSONAL" hint="Opcional. Se muestra en tu perfil publico de experto. Ej: ivajpro o ivajpro#1234">
              <input
                value={discordHandle}
                onChange={e => setDiscordHandle(e.target.value)}
                placeholder="ivajpro"
              />
            </Field>

            <Field label="ESPECIALIDADES" hint="Separa con comas: Posicionamiento, Mecanicas de Ana...">
              <input
                value={specialties}
                onChange={e => setSpecialties(e.target.value)}
                placeholder="Posicionamiento, Mecanicas de Ana, Gestion de ultimates"
              />
            </Field>

            <div>
              <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 6 }}>
                PRECIOS Y DESCRIPCION DE TIERS
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16 }}>
                Tu cobras integro el precio que fijes. El jugador paga ese precio mas un 20% de comision de plataforma.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {([
                  { label: 'STARTER (7 dias)',   price: priceStarter,  setPrice: setPriceStarter,  desc: descStarter,  setDesc: setDescStarter,  min: 2, max: 50  },
                  { label: 'PRO (7 dias)',       price: pricePro,      setPrice: setPricePro,      desc: descPro,      setDesc: setDescPro,      min: 5, max: 100 },
                  { label: 'DEEP DIVE (7 dias)', price: priceDeepDive, setPrice: setPriceDeepDive, desc: descDeepDive, setDesc: setDescDeepDive, min: 8, max: 200 },
                ] as const).map(({ label, price, setPrice, desc, setDesc, min, max }) => (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16, alignItems: 'start' }}>
                    <Field label={label}>
                      <input
                        type="number" value={price}
                        onChange={e => setPrice(e.target.value)}
                        min={min} max={max} step={0.5} required
                      />
                    </Field>
                    <Field label="QUE INCLUYE (opcional)" hint="Descripcion que veran los jugadores">
                      <textarea
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        rows={2}
                        placeholder="Ej: Analisis escrito de tu replay con feedback de posicionamiento y mecanicas..."
                        style={{ resize: 'vertical' }}
                      />
                    </Field>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif' }}>
                    ANALISIS DE PRUEBA
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>
                    Ofrece un analisis a precio reducido para que el jugador te conozca.
                  </div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={trialEnabled}
                    onChange={e => setTrialEnabled(e.target.checked)}
                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>Activar</span>
                </label>
              </div>

              {trialEnabled && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <Field label="PRECIO BASE (EUR)" hint="Minimo 2 EUR">
                      <input
                        type="number"
                        value={trialPrice}
                        onChange={e => setTrialPrice(e.target.value)}
                        min={2} max={50} step={0.5} required
                      />
                    </Field>
                    <Field label="PLAZO DE ENTREGA (horas)" hint="Entre 24 y 168h">
                      <input
                        type="number"
                        value={trialDeadlineHours}
                        onChange={e => setTrialDeadlineHours(e.target.value)}
                        min={24} max={168} step={1} required
                      />
                    </Field>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={trialRefundable}
                      onChange={e => setTrialRefundable(e.target.checked)}
                      style={{ width: 16, height: 16, cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ fontSize: 13, color: 'var(--text2)' }}>Reembolso garantizado</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>
                        El jugador puede pedir reembolso en los 7 dias siguientes a la entrega.
                      </div>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={{ background: 'rgba(255,68,68,0.06)', border: '1px solid rgba(255,68,68,0.2)', padding: '12px 16px', fontSize: 13, color: 'var(--danger)' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16 }}>
        {saved && (
          <span style={{ fontSize: 13, color: 'var(--green)' }}>Cambios guardados</span>
        )}
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
        </button>
      </div>
    </form>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'

type Option = {
  value: string
  label: string
}

export default function GuideFilters({
  initial,
  roles,
  heroes,
  categories,
}: {
  initial: {
    q?: string
    sort?: string
    role?: string
    hero?: string
    category?: string
  }
  roles: Option[]
  heroes: Option[]
  categories: Option[]
}) {
  const [search, setSearch] = useState(initial.q || '')

  const hasFilters = Boolean(initial.q || initial.sort || initial.role || initial.hero || initial.category)

  return (
    <form action="/guides" className="guide-filter-panel">
      <div className="guide-filter-search">
        <input
          name="q"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Buscar por concepto, héroe o problema..."
          aria-label="Buscar guías"
        />
        <button type="submit" className="btn btn-primary btn-sm">
          BUSCAR
        </button>
      </div>

      <div className="guide-filter-grid">
        <FilterSelect name="role" label="Rol" value={initial.role || 'all'} options={roles} />
        <FilterSelect name="hero" label="Héroe" value={initial.hero || 'all'} options={heroes} />
        <FilterSelect name="category" label="Categoría" value={initial.category || 'all'} options={categories} />
        <FilterSelect
          name="sort"
          label="Orden"
          value={initial.sort || 'latest'}
          options={[
            { value: 'latest', label: 'Recientes' },
            { value: 'oldest', label: 'Antiguas' },
            { value: 'title', label: 'Titulo A-Z' },
            { value: 'read', label: 'Lectura corta' },
          ]}
        />
      </div>

      <div className="guide-filter-footer">
        <span>Filtra sin salir de la hemeroteca</span>
        {hasFilters && (
          <Link href="/guides" className="guide-filter-clear">
            Limpiar filtros
          </Link>
        )}
      </div>
    </form>
  )
}

function FilterSelect({
  name,
  label,
  value,
  options,
}: {
  name: string
  label: string
  value: string
  options: Option[]
}) {
  return (
    <label className="guide-filter-field">
      <span>{label}</span>
      <select
        aria-label={label}
        name={name}
        defaultValue={value}
        onChange={event => event.currentTarget.form?.requestSubmit()}
      >
        <option value="all">Todos</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

'use client'

import { useState, useMemo, useCallback } from 'react'
import type { Role, TaskCategory, FormatType } from '@/lib/types'

export interface SkillFilterState {
  search: string
  role: string
  taskCategory: string
  quality: string
  formatType: string
  sourcePlatform: string
}

const EMPTY_FILTERS: SkillFilterState = {
  search: '',
  role: '',
  taskCategory: '',
  quality: '',
  formatType: '',
  sourcePlatform: '',
}

type SkillFiltersProps = Readonly<{
  roles: Role[]
  taskCategories: TaskCategory[]
  formatTypes: FormatType[]
  sourcePlatforms: string[]
  filters: SkillFilterState
  onFiltersChange: (filters: SkillFilterState) => void
  resultCount: number
  totalCount: number
}>

const selectBase =
  'appearance-none bg-navy-light border border-navy-muted text-offwhite text-xs rounded px-3 py-2 pr-7 focus:outline-none focus:border-accent transition-colors cursor-pointer'

export function SkillFilters({
  roles,
  taskCategories,
  formatTypes,
  sourcePlatforms,
  filters,
  onFiltersChange,
  resultCount,
  totalCount,
}: SkillFiltersProps) {
  const hasActiveFilters = useMemo(
    () => Object.values(filters).some(v => v !== ''),
    [filters],
  )

  const update = useCallback(
    (key: keyof SkillFilterState, value: string) => {
      onFiltersChange({ ...filters, [key]: value })
    },
    [filters, onFiltersChange],
  )

  const clearAll = useCallback(() => {
    onFiltersChange(EMPTY_FILTERS)
  }, [onFiltersChange])

  // Group task categories by layer
  const categoriesByLayer = useMemo(() => {
    const grouped: Record<string, TaskCategory[]> = {}
    for (const cat of taskCategories) {
      if (!grouped[cat.layer]) grouped[cat.layer] = []
      grouped[cat.layer].push(cat)
    }
    return grouped
  }, [taskCategories])

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-muted pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={filters.search}
          onChange={e => update('search', e.target.value)}
          placeholder="Search skills by name or description..."
          className="w-full bg-navy-light border border-navy-muted text-offwhite text-sm rounded pl-10 pr-4 py-2.5 placeholder:text-body-muted focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Role */}
        <div className="relative">
          <select
            value={filters.role}
            onChange={e => update('role', e.target.value)}
            className={selectBase}
          >
            <option value="">All Roles</option>
            {roles.map(r => (
              <option key={r.slug} value={r.slug}>
                {r.display_name}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>

        {/* Task Category (grouped by layer) */}
        <div className="relative">
          <select
            value={filters.taskCategory}
            onChange={e => update('taskCategory', e.target.value)}
            className={selectBase}
          >
            <option value="">All Categories</option>
            {Object.entries(categoriesByLayer).map(([layer, cats]) => (
              <optgroup key={layer} label={layer}>
                {cats.map(c => (
                  <option key={c.slug} value={c.slug}>
                    {c.display_name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <ChevronIcon />
        </div>

        {/* Quality */}
        <div className="relative">
          <select
            value={filters.quality}
            onChange={e => update('quality', e.target.value)}
            className={selectBase}
          >
            <option value="">All Quality</option>
            <option value="3">Production-ready</option>
            <option value="2">Usable</option>
            <option value="1">Concept</option>
          </select>
          <ChevronIcon />
        </div>

        {/* Format Type */}
        <div className="relative">
          <select
            value={filters.formatType}
            onChange={e => update('formatType', e.target.value)}
            className={selectBase}
          >
            <option value="">All Formats</option>
            {formatTypes.map(f => (
              <option key={f.slug} value={f.slug}>
                {f.display_name}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>

        {/* Source Platform */}
        <div className="relative">
          <select
            value={filters.sourcePlatform}
            onChange={e => update('sourcePlatform', e.target.value)}
            className={selectBase}
          >
            <option value="">All Sources</option>
            {sourcePlatforms.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>

        {/* Clear all */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-accent hover:text-offwhite transition-colors underline underline-offset-2"
          >
            Clear all
          </button>
        )}

        {/* Result count */}
        <span className="ml-auto text-xs text-body-muted tabular-nums">
          Showing{' '}
          <span className="text-offwhite font-medium">{resultCount}</span> of{' '}
          {totalCount} skills
        </span>
      </div>
    </div>
  )
}

function ChevronIcon() {
  return (
    <svg
      className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-body-muted pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export { EMPTY_FILTERS }

'use client'

import { useState, useMemo, useCallback } from 'react'
import type { Skill, Role, TaskCategory, FormatType } from '@/lib/types'
import { TASK_CATEGORIES, FORMAT_TYPES } from '@/lib/constants'
import { QualityBadge } from './QualityBadge'
import { RolePill } from './RolePill'
import { SkillFilters, EMPTY_FILTERS, type SkillFilterState } from './SkillFilters'

type SortKey = 'skill_name' | 'task_category' | 'format_type' | 'quality_rating'
type SortDir = 'asc' | 'desc'

type SkillTableProps = Readonly<{
  skills: Skill[]
  roles: Role[]
  taskCategories: TaskCategory[]
  formatTypes: FormatType[]
  initialFilters?: Partial<SkillFilterState>
}>

function getCategoryDisplayName(slug: string): string {
  return TASK_CATEGORIES.find(c => c.slug === slug)?.display_name ?? slug
}

function getFormatDisplayName(slug: string): string {
  return FORMAT_TYPES.find(f => f.slug === slug)?.display_name ?? slug
}

export function SkillTable({
  skills,
  roles,
  taskCategories,
  formatTypes,
  initialFilters,
}: SkillTableProps) {
  const [filters, setFilters] = useState<SkillFilterState>(() => ({
    ...EMPTY_FILTERS,
    ...initialFilters,
  }))
  const [sortKey, setSortKey] = useState<SortKey>('skill_name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  // Derive unique source platforms from the data
  const sourcePlatforms = useMemo(() => {
    const set = new Set(skills.map(s => s.source_platform))
    return Array.from(set).sort()
  }, [skills])

  // Filter
  const filtered = useMemo(() => {
    return skills.filter(s => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (
          !s.skill_name.toLowerCase().includes(q) &&
          !s.description.toLowerCase().includes(q)
        )
          return false
      }
      if (filters.role && !s.roles.includes(filters.role)) return false
      if (filters.taskCategory && s.task_category !== filters.taskCategory) return false
      if (filters.quality && s.quality_rating !== Number(filters.quality)) return false
      if (filters.formatType && s.format_type !== filters.formatType) return false
      if (filters.sourcePlatform && s.source_platform !== filters.sourcePlatform) return false
      return true
    })
  }, [skills, filters])

  // Sort
  const sorted = useMemo(() => {
    const arr = [...filtered]
    arr.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'skill_name':
          cmp = a.skill_name.localeCompare(b.skill_name)
          break
        case 'task_category':
          cmp = getCategoryDisplayName(a.task_category).localeCompare(
            getCategoryDisplayName(b.task_category),
          )
          break
        case 'format_type':
          cmp = getFormatDisplayName(a.format_type).localeCompare(
            getFormatDisplayName(b.format_type),
          )
          break
        case 'quality_rating':
          cmp = a.quality_rating - b.quality_rating
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return arr
  }, [filtered, sortKey, sortDir])

  const handleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) {
        setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortKey(key)
        setSortDir('asc')
      }
    },
    [sortKey],
  )

  const toggleExpand = useCallback((id: number) => {
    setExpandedId(prev => (prev === id ? null : id))
  }, [])

  return (
    <div className="space-y-6">
      <SkillFilters
        roles={roles}
        taskCategories={taskCategories}
        formatTypes={formatTypes}
        sourcePlatforms={sourcePlatforms}
        filters={filters}
        onFiltersChange={setFilters}
        resultCount={sorted.length}
        totalCount={skills.length}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-navy-muted/40">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy-muted/50">
              <SortableHeader
                label="Skill"
                sortKey="skill_name"
                currentKey={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
                className="w-[22%]"
              />
              <SortableHeader
                label="Category"
                sortKey="task_category"
                currentKey={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
                className="w-[16%]"
              />
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-body-muted font-medium w-[26%]">
                Roles
              </th>
              <SortableHeader
                label="Format"
                sortKey="format_type"
                currentKey={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
                className="w-[16%]"
              />
              <SortableHeader
                label="Quality"
                sortKey="quality_rating"
                currentKey={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
                className="w-[12%]"
              />
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-body-muted font-medium w-[8%]">
                Source
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-16 text-body-muted text-sm">
                  No skills match the current filters.
                </td>
              </tr>
            )}
            {sorted.map((skill, idx) => (
              <SkillRow
                key={skill.id}
                skill={skill}
                index={idx}
                isExpanded={expandedId === skill.id}
                onToggle={toggleExpand}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── Sortable header cell ─── */

function SortableHeader({
  label,
  sortKey,
  currentKey,
  currentDir,
  onSort,
  className = '',
}: {
  label: string
  sortKey: SortKey
  currentKey: SortKey
  currentDir: SortDir
  onSort: (key: SortKey) => void
  className?: string
}) {
  const active = sortKey === currentKey
  return (
    <th
      onClick={() => onSort(sortKey)}
      className={`text-left px-4 py-3 text-[11px] uppercase tracking-wider font-medium cursor-pointer select-none transition-colors hover:text-offwhite ${
        active ? 'text-offwhite' : 'text-body-muted'
      } ${className}`}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {active && (
          <svg
            className={`w-3 h-3 transition-transform ${currentDir === 'desc' ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        )}
      </span>
    </th>
  )
}

/* ─── Skill row ─── */

function SkillRow({
  skill,
  index,
  isExpanded,
  onToggle,
}: {
  skill: Skill
  index: number
  isExpanded: boolean
  onToggle: (id: number) => void
}) {
  const stripeBg = index % 2 === 1 ? 'bg-navy-light/30' : ''

  return (
    <>
      <tr
        onClick={() => onToggle(skill.id)}
        className={`${stripeBg} hover:bg-navy-light cursor-pointer transition-colors group`}
      >
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <svg
              className={`w-3 h-3 text-body-muted flex-shrink-0 transition-transform ${
                isExpanded ? 'rotate-90' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-offwhite font-medium">{skill.skill_name}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-body-muted text-xs">
          {getCategoryDisplayName(skill.task_category)}
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {skill.roles.slice(0, 3).map(r => (
              <RolePill key={r} slug={r} />
            ))}
            {skill.roles.length > 3 && (
              <span className="text-[11px] text-body-muted px-1.5 py-0.5">
                +{skill.roles.length - 3}
              </span>
            )}
          </div>
        </td>
        <td className="px-4 py-3 text-body-muted text-xs">
          {getFormatDisplayName(skill.format_type)}
        </td>
        <td className="px-4 py-3">
          <QualityBadge rating={skill.quality_rating} />
        </td>
        <td className="px-4 py-3">
          {skill.source_link && (
            <a
              href={skill.source_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-body-muted hover:text-accent transition-colors"
              title={skill.source_platform}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          )}
        </td>
      </tr>

      {/* Expanded detail row */}
      {isExpanded && (
        <tr className="bg-navy-light">
          <td colSpan={6} className="px-4 py-0">
            <div className="border-l-2 border-accent pl-5 py-4 ml-1">
              <p className="text-sm text-body-muted leading-relaxed max-w-3xl">
                {skill.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-body-muted">
                <span>
                  Platform:{' '}
                  <span className="text-offwhite">{skill.source_platform}</span>
                </span>
                {skill.roles.length > 3 && (
                  <span className="flex items-center gap-1">
                    All roles:{' '}
                    <span className="flex flex-wrap gap-1">
                      {skill.roles.map(r => (
                        <RolePill key={r} slug={r} />
                      ))}
                    </span>
                  </span>
                )}
                {skill.source_link && (
                  <a
                    href={skill.source_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-offwhite underline underline-offset-2 transition-colors"
                  >
                    View source
                  </a>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

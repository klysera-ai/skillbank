'use client'

import { useMemo } from 'react'
import type { Role, Skill, TaskCategory } from '@/lib/types'
import { COLORS } from '@/lib/constants'

type HeatmapProps = Readonly<{
  roles: Role[]
  taskCategories: TaskCategory[]
  skills: Skill[]
}>

type CountMatrix = Record<string, Record<string, number>>

function hexToRgb(hex: string): string {
  const cleaned = hex.replace('#', '')
  const value = parseInt(cleaned, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  return `${r}, ${g}, ${b}`
}

function withAlpha(hex: string, alpha: number): string {
  return `rgba(${hexToRgb(hex)}, ${alpha})`
}

function getIntensity(count: number, maxCount: number): number {
  if (count === 0) return 0
  const ratio = count / maxCount
  if (ratio <= 0.34) return 0.3
  if (ratio <= 0.67) return 0.5
  return 0.8
}

export function Heatmap({
  roles,
  taskCategories,
  skills,
}: HeatmapProps): React.ReactElement {
  const { matrix, maxCount } = useMemo(() => {
    const counts: CountMatrix = {}
    for (const role of roles) {
      counts[role.slug] = {}
      for (const category of taskCategories) {
        counts[role.slug][category.slug] = 0
      }
    }

    for (const skill of skills) {
      for (const role of skill.roles) {
        if (!counts[role]) continue
        counts[role][skill.task_category] =
          (counts[role][skill.task_category] ?? 0) + 1
      }
    }

    const allCounts = Object.values(counts).flatMap((row) => Object.values(row))
    const max = Math.max(1, ...allCounts)
    return { matrix: counts, maxCount: max }
  }, [roles, taskCategories, skills])

  const gridTemplateColumns = `160px repeat(${taskCategories.length}, minmax(52px, 1fr))`

  return (
    <div className="overflow-x-auto rounded-lg border border-navy-muted bg-navy-light/20 p-4">
      <div className="min-w-[980px]">
        <div
          className="grid gap-px bg-navy-muted/40"
          style={{ gridTemplateColumns }}
        >
          <div className="h-16 bg-navy-light/40" />
          {taskCategories.map((category) => (
            <div
              key={category.slug}
              className="h-16 bg-navy-light/40 flex items-end justify-start px-2 pb-2"
            >
              <span
                className="text-[10px] uppercase tracking-[0.1em] text-body-muted origin-left -rotate-45 whitespace-nowrap"
                style={{ color: COLORS.layer[category.layer] }}
              >
                {category.display_name}
              </span>
            </div>
          ))}

          {roles.map((role) => (
            <div key={role.slug} className="contents">
              <div className="bg-navy-light/40 px-3 py-2 text-xs text-body-muted font-medium">
                {role.display_name}
              </div>
              {taskCategories.map((category) => {
                const count = matrix[role.slug]?.[category.slug] ?? 0
                const intensity = getIntensity(count, maxCount)
                const baseColor =
                  count === 0
                    ? withAlpha(COLORS.navyMuted, 0.3)
                    : withAlpha(COLORS.layer[category.layer], intensity)

                return (
                  <div
                    key={`${role.slug}-${category.slug}`}
                    className="h-9 transition-colors"
                    style={{ backgroundColor: baseColor }}
                    title={`Role: ${role.display_name}, Category: ${category.display_name}, Skills: ${count}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

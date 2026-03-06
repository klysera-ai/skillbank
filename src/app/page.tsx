export const dynamic = 'force-dynamic'

import Link from 'next/link'

import { PageContainer } from '@/components/layout/PageContainer'
import { StatCard } from '@/components/metrics/StatCard'
import { ProgressRing } from '@/components/metrics/ProgressRing'
import { QualityDistribution } from '@/components/metrics/QualityDistribution'
import { WeeklyGrowthChart } from '@/components/metrics/WeeklyGrowthChart'

import { getAllSkills, getAllTaskCategories, getLatestSyncDate } from '@/lib/queries'
import { COLORS, QUALITY_LABELS, TASK_CATEGORIES } from '@/lib/constants'

export default async function Home() {
  const [skills, categories, lastSync] = await Promise.all([
    getAllSkills(),
    getAllTaskCategories(),
    getLatestSyncDate(),
  ])

  // ── Metric computations ──────────────────────────

  const totalSkills = skills.length

  const rolesWithSkills = new Set(skills.flatMap((s) => s.roles))
  const rolesCovered = rolesWithSkills.size

  const categoriesWithSkills = new Set(skills.map((s) => s.task_category))
  const categoriesActive = categoriesWithSkills.size

  const avgQuality =
    totalSkills > 0
      ? (skills.reduce((sum, s) => sum + s.quality_rating, 0) / totalSkills).toFixed(1)
      : '0.0'

  // ── Phase counts ─────────────────────────────────

  const phaseTarget = 60
  const phase1Count = skills.filter((s) => s.phase === 1).length
  const phase2Count = skills.filter((s) => s.phase === 2).length
  const phase3Count = skills.filter((s) => s.phase === 3).length

  // ── Quality distribution ─────────────────────────

  const qualityData = ([1, 2, 3] as const).map((level) => ({
    level,
    label: QUALITY_LABELS[level],
    count: skills.filter((s) => s.quality_rating === level).length,
    color: COLORS.quality[level],
  }))

  // ── Weekly growth (cumulative by date) ───────────

  const dateMap = new Map<string, number>()
  for (const skill of skills) {
    const day = skill.created_at.slice(0, 10)
    dateMap.set(day, (dateMap.get(day) ?? 0) + 1)
  }
  const sortedDates = [...dateMap.keys()].sort()
  let cumulative = 0
  const growthData = sortedDates.map((date) => {
    cumulative += dateMap.get(date)!
    const formatted = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
    return { date: formatted, count: cumulative }
  })

  // ── Taxonomy layer data ──────────────────────────

  const layers = ['Build', 'Operate', 'Quality', 'Support'] as const
  const layerData = layers.map((layer) => {
    const layerCategories = categories.filter((c) => c.layer === layer)
    const categoryDetails = layerCategories.map((cat) => {
      const count = skills.filter((s) => s.task_category === cat.slug).length
      return { name: cat.display_name, count }
    })
    const totalCount = categoryDetails.reduce((sum, c) => sum + c.count, 0)
    return { layer, totalCount, categories: categoryDetails, color: COLORS.layer[layer] }
  })

  // ── Format last sync ─────────────────────────────

  const formattedSync = lastSync
    ? new Date(lastSync).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Not synced'

  return (
    <PageContainer>
      {/* ── Hero ──────────────────────────────── */}
      <section className="pb-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-body-muted">
          Klysera
        </p>
        <h1 className="mt-2 font-display text-4xl text-offwhite sm:text-6xl lg:text-7xl">
          Skill Bank
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-body-muted">
          A curated catalog of AI-native engineering skills, mapped from tasks to roles.
        </p>
        <p className="mt-3 text-[11px] tracking-wide text-body-muted">
          Last updated: {formattedSync}
        </p>
        <div className="mt-8 h-px bg-navy-light" />
      </section>

      {/* ── Metric Strip ─────────────────────── */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard value={totalSkills} label="Total Skills" />
        <StatCard value={rolesCovered} label="Roles Covered" suffix=" / 10" />
        <StatCard value={categoriesActive} label="Categories Active" suffix=" / 15" />
        <StatCard value={avgQuality} label="Avg Quality" />
      </section>

      {/* ── Phase Progress ────────────────────── */}
      <section className="mt-16">
        <h2 className="font-display text-2xl text-offwhite">Phase Progress</h2>
        <div className="mt-8 flex flex-wrap items-start justify-center gap-12 lg:justify-start">
          <ProgressRing label="Phase 1" current={phase1Count} target={phaseTarget} />
          <ProgressRing label="Phase 2" current={phase2Count} target={phaseTarget} />
          <ProgressRing label="Phase 3" current={phase3Count} target={phaseTarget} />
        </div>
      </section>

      {/* ── Quality Distribution ──────────────── */}
      <section className="mt-16">
        <h2 className="font-display text-2xl text-offwhite">Quality Distribution</h2>
        <div className="mt-6">
          <QualityDistribution data={qualityData} />
        </div>
      </section>

      {/* ── Growth ────────────────────────────── */}
      <section className="mt-16">
        <h2 className="font-display text-2xl text-offwhite">Growth</h2>
        <div className="mt-6">
          <WeeklyGrowthChart data={growthData} />
        </div>
      </section>

      {/* ── Taxonomy Preview ──────────────────── */}
      <section className="mt-16">
        <h2 className="font-display text-2xl text-offwhite">Taxonomy</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {layerData.map(({ layer, totalCount, categories: cats, color }) => (
            <div
              key={layer}
              className="rounded-lg border border-navy-muted bg-navy-light p-6"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl text-offwhite">{layer}</h3>
                <span
                  className="text-xs font-medium tabular-nums"
                  style={{ color }}
                >
                  {totalCount} skill{totalCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div
                className="mt-1 h-0.5 w-8 rounded-full"
                style={{ backgroundColor: color }}
              />
              <ul className="mt-4 space-y-1.5">
                {cats.map((cat) => (
                  <li
                    key={cat.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-body-muted">{cat.name}</span>
                    <span className="tabular-nums text-offwhite">{cat.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/taxonomy"
            className="text-xs uppercase tracking-[0.15em] text-accent transition-colors hover:text-offwhite"
          >
            View full taxonomy
          </Link>
        </div>
      </section>
    </PageContainer>
  )
}

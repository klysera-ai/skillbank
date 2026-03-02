import { notFound } from 'next/navigation'

import { PageContainer } from '@/components/layout/PageContainer'
import { StatCard } from '@/components/metrics/StatCard'
import { QualityBadge } from '@/components/skills/QualityBadge'
import { RoleCoverageChart } from '@/components/roles/RoleCoverageChart'
import { RoleGapList } from '@/components/roles/RoleGapList'
import {
  getAllRoles,
  getAllTaskCategories,
  getAllFormatTypes,
  getSkillsByRole,
} from '@/lib/queries'

type RolePageProps = Readonly<{
  params: Promise<{ slug: string }>
}>

export async function generateStaticParams() {
  const roles = await getAllRoles()
  return roles.map((role) => ({ slug: role.slug }))
}

export default async function RoleDetailPage({ params }: RolePageProps) {
  const { slug } = await params
  const [roles, taskCategories, formatTypes, roleSkills] = await Promise.all([
    getAllRoles(),
    getAllTaskCategories(),
    getAllFormatTypes(),
    getSkillsByRole(slug),
  ])

  const role = roles.find((r) => r.slug === slug)
  if (!role) notFound()

  const qualityCounts = {
    1: roleSkills.filter((skill) => skill.quality_rating === 1).length,
    2: roleSkills.filter((skill) => skill.quality_rating === 2).length,
    3: roleSkills.filter((skill) => skill.quality_rating === 3).length,
  }

  const skillCountByCategory: Record<string, number> = {}
  for (const skill of roleSkills) {
    skillCountByCategory[skill.task_category] =
      (skillCountByCategory[skill.task_category] ?? 0) + 1
  }

  const gaps = taskCategories
    .filter((category) => (skillCountByCategory[category.slug] ?? 0) === 0)
    .map((category) => ({
      category_name: category.display_name,
      layer: category.layer,
    }))

  const categoryNameBySlug = new Map(
    taskCategories.map((cat) => [cat.slug, cat.display_name]),
  )
  const formatNameBySlug = new Map(
    formatTypes.map((format) => [format.slug, format.display_name]),
  )

  const sortedSkills = [...roleSkills].sort((a, b) =>
    a.skill_name.localeCompare(b.skill_name),
  )

  return (
    <PageContainer>
      <header className="mb-10">
        <div className="flex flex-wrap items-end gap-3">
          <h1 className="font-display text-4xl text-offwhite tracking-tight">
            {role.display_name}
          </h1>
          <span className="rounded-full bg-offwhite/10 px-2.5 py-0.5 text-[11px] font-medium text-offwhite">
            {role.cluster_name}
          </span>
          <span className="rounded-full bg-offwhite/5 px-2.5 py-0.5 text-[11px] font-medium text-body-muted">
            Phase {role.phase}
          </span>
        </div>
        <p className="mt-2 text-body-muted text-base">
          Skill coverage, quality distribution, and category gaps for this role.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard value={roleSkills.length} label="Total Skills" />
        <StatCard value={qualityCounts[3]} label="Production-ready" />
        <StatCard value={qualityCounts[2]} label="Usable" />
        <StatCard value={qualityCounts[1]} label="Concept" />
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl text-offwhite">Category Coverage</h2>
        <div className="mt-6">
          <RoleCoverageChart
            categories={taskCategories}
            skillCountByCategory={skillCountByCategory}
          />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-offwhite">Skills</h2>
          <span className="text-xs uppercase tracking-[0.15em] text-body-muted">
            {sortedSkills.length} total
          </span>
        </div>
        <div className="mt-6 overflow-x-auto rounded-lg border border-navy-muted/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-muted/50">
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-body-muted font-medium">
                  Skill
                </th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-body-muted font-medium">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-body-muted font-medium">
                  Format
                </th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-body-muted font-medium">
                  Quality
                </th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-body-muted font-medium">
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedSkills.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-14 text-body-muted text-sm"
                  >
                    No skills are cataloged for this role yet.
                  </td>
                </tr>
              )}
              {sortedSkills.map((skill, index) => (
                <tr
                  key={skill.id}
                  className={index % 2 === 1 ? 'bg-navy-light/30' : ''}
                >
                  <td className="px-4 py-3 text-offwhite font-medium">
                    {skill.skill_name}
                  </td>
                  <td className="px-4 py-3 text-body-muted text-xs">
                    {categoryNameBySlug.get(skill.task_category) ??
                      skill.task_category}
                  </td>
                  <td className="px-4 py-3 text-body-muted text-xs">
                    {formatNameBySlug.get(skill.format_type) ?? skill.format_type}
                  </td>
                  <td className="px-4 py-3">
                    <QualityBadge rating={skill.quality_rating} />
                  </td>
                  <td className="px-4 py-3">
                    {skill.source_link ? (
                      <a
                        href={skill.source_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-muted hover:text-accent transition-colors"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-body-muted text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl text-offwhite">Coverage Gaps</h2>
        <p className="mt-2 text-sm text-body-muted">
          Categories with zero cataloged skills for this role.
        </p>
        <div className="mt-6">
          <RoleGapList gaps={gaps} />
        </div>
      </section>
    </PageContainer>
  )
}

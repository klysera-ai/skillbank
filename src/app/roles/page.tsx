import { PageContainer } from '@/components/layout/PageContainer'
import { RoleCard } from '@/components/roles/RoleCard'
import { getAllRoles, getAllSkills, getAllTaskCategories } from '@/lib/queries'

export const metadata = {
  title: 'Roles | Klysera Skill Bank',
  description: 'Explore skill coverage by role and cluster.',
}

const CLUSTERS = ['AI Cluster', 'Product Cluster', 'Cloud Cluster'] as const

export default async function RolesPage() {
  const [roles, skills, taskCategories] = await Promise.all([
    getAllRoles(),
    getAllSkills(),
    getAllTaskCategories(),
  ])

  const categoryNameBySlug = new Map(
    taskCategories.map((cat) => [cat.slug, cat.display_name]),
  )

  const skillCountByRole = new Map<string, number>()
  const topCategoriesByRole = new Map<string, string[]>()

  for (const role of roles) {
    const roleSkills = skills.filter((skill) => skill.roles.includes(role.slug))
    skillCountByRole.set(role.slug, roleSkills.length)

    const counts: Record<string, number> = {}
    for (const skill of roleSkills) {
      counts[skill.task_category] = (counts[skill.task_category] ?? 0) + 1
    }

    const topCategories = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([slug]) => categoryNameBySlug.get(slug) ?? slug)

    topCategoriesByRole.set(role.slug, topCategories)
  }

  return (
    <PageContainer>
      <header className="mb-10">
        <h1 className="font-display text-4xl text-offwhite tracking-tight">Roles</h1>
        <p className="mt-2 text-body-muted text-base">
          Coverage snapshots across AI, Product, and Cloud clusters.
        </p>
      </header>

      <div className="space-y-12">
        {CLUSTERS.map((cluster) => {
          const clusterRoles = roles.filter((role) => role.cluster_name === cluster)
          if (clusterRoles.length === 0) return null

          return (
            <section key={cluster}>
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl text-offwhite">{cluster}</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-body-muted">
                  {clusterRoles.length} roles
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {clusterRoles.map((role) => (
                  <RoleCard
                    key={role.slug}
                    role={role}
                    skillCount={skillCountByRole.get(role.slug) ?? 0}
                    topCategories={topCategoriesByRole.get(role.slug) ?? []}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </PageContainer>
  )
}

import { PageContainer } from '@/components/layout/PageContainer'
import { TaxonomyGrid } from '@/components/taxonomy/TaxonomyGrid'
import { FormatTypeBar } from '@/components/taxonomy/FormatTypeBar'
import { Heatmap } from '@/components/taxonomy/Heatmap'
import {
  getAllSkills,
  getAllTaskCategories,
  getAllFormatTypes,
  getAllRoles,
} from '@/lib/queries'

export const metadata = {
  title: 'Taxonomy | Klysera Skill Bank',
  description: 'Explore the task taxonomy, format distribution, and role coverage matrix.',
}

export default async function TaxonomyPage() {
  const [skills, taskCategories, formatTypes, roles] = await Promise.all([
    getAllSkills(),
    getAllTaskCategories(),
    getAllFormatTypes(),
    getAllRoles(),
  ])

  const formatData = formatTypes.map((format) => ({
    name: format.display_name,
    count: skills.filter((skill) => skill.format_type === format.slug).length,
  }))

  return (
    <PageContainer>
      <header className="mb-10">
        <h1 className="font-display text-4xl text-offwhite tracking-tight">Taxonomy</h1>
        <p className="mt-2 text-body-muted text-base">
          Explore the task layers, formats, and role coverage across the catalog.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="font-display text-2xl text-offwhite">Layers</h2>
        <TaxonomyGrid skills={skills} taskCategories={taskCategories} />
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl text-offwhite">Format Types</h2>
        <div className="mt-6">
          <FormatTypeBar data={formatData} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl text-offwhite">Coverage Matrix</h2>
        <p className="mt-2 text-sm text-body-muted">
          Role-to-category coverage across the 4 taxonomy layers.
        </p>
        <div className="mt-6">
          <Heatmap roles={roles} taskCategories={taskCategories} skills={skills} />
        </div>
      </section>
    </PageContainer>
  )
}

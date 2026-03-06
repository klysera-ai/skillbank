export const dynamic = 'force-dynamic'

import { getAllSkills, getAllRoles, getAllTaskCategories, getAllFormatTypes } from '@/lib/queries'
import { PageContainer } from '@/components/layout/PageContainer'
import { SkillTable } from '@/components/skills/SkillTable'

export const metadata = {
  title: 'Skills | Klysera Skill Bank',
  description: 'Browse and filter the complete AI skill catalog.',
}

type SkillsPageProps = Readonly<{
  searchParams?: { category?: string }
}>

export default async function SkillsPage({ searchParams }: SkillsPageProps) {
  const [skills, roles, taskCategories, formatTypes] = await Promise.all([
    getAllSkills(),
    getAllRoles(),
    getAllTaskCategories(),
    getAllFormatTypes(),
  ])

  const initialCategory =
    typeof searchParams?.category === 'string' ? searchParams.category : ''

  return (
    <PageContainer>
      <header className="mb-10">
        <h1 className="font-display text-4xl text-offwhite tracking-tight">Skills</h1>
        <p className="mt-2 text-body-muted text-base">
          Browse and filter the complete skill catalog
        </p>
      </header>

      <SkillTable
        skills={skills}
        roles={roles}
        taskCategories={taskCategories}
        formatTypes={formatTypes}
        initialFilters={initialCategory ? { taskCategory: initialCategory } : undefined}
      />
    </PageContainer>
  )
}

import { COLORS } from "@/lib/constants"
import type { Skill, TaskCategory } from "@/lib/types"
import { LayerCard } from "./LayerCard"

type TaxonomyGridProps = Readonly<{
  skills: Skill[]
  taskCategories: TaskCategory[]
}>

const LAYERS = ["Build", "Operate", "Quality", "Support"] as const

export function TaxonomyGrid({ skills, taskCategories }: TaxonomyGridProps): React.ReactElement {
  // Count skills per category
  const countsByCategory: Record<string, number> = {}
  for (const skill of skills) {
    const cat = skill.task_category
    countsByCategory[cat] = (countsByCategory[cat] || 0) + 1
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {LAYERS.map((layer) => {
        const layerCategories = taskCategories
          .filter((tc) => tc.layer === layer)
          .map((tc) => ({
            display_name: tc.display_name,
            slug: tc.slug,
            count: countsByCategory[tc.slug] || 0,
          }))

        return (
          <LayerCard
            key={layer}
            layerName={layer}
            categories={layerCategories}
            color={COLORS.layer[layer]}
          />
        )
      })}
    </div>
  )
}

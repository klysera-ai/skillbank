import Link from "next/link"

type CategoryItem = {
  display_name: string
  slug: string
  count: number
}

type LayerCardProps = Readonly<{
  layerName: string
  categories: CategoryItem[]
  color: string
}>

export function LayerCard({ layerName, categories, color }: LayerCardProps): React.ReactElement {
  return (
    <div className="relative overflow-hidden rounded-lg border border-navy-muted bg-navy-light">
      {/* Top accent bar */}
      <div className="h-[2px]" style={{ backgroundColor: color }} />

      <div className="px-6 py-6">
        <h3
          className="font-display text-xl"
          style={{ color }}
        >
          {layerName}
        </h3>

        <ul className="mt-5 space-y-2.5">
          {categories.map((cat) => (
            <li key={cat.slug} className="flex items-center justify-between">
              <Link
                href={`/skills?category=${cat.slug}`}
                className={`text-sm transition-colors duration-200 ${
                  cat.count > 0
                    ? "text-offwhite hover:underline"
                    : "text-body-muted/50 pointer-events-none"
                }`}
              >
                {cat.display_name}
              </Link>
              <span
                className={`inline-flex min-w-[28px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  cat.count > 0
                    ? "text-offwhite"
                    : "text-body-muted/40 bg-navy-muted/40"
                }`}
                style={
                  cat.count > 0
                    ? { backgroundColor: `${color}20`, color }
                    : undefined
                }
              >
                {cat.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

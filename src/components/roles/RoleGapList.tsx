type Gap = {
  category_name: string
  layer: string
}

type RoleGapListProps = Readonly<{
  gaps: Gap[]
}>

const LAYER_BADGE_STYLES: Record<string, string> = {
  Build: 'bg-blue-500/15 text-blue-400',
  Operate: 'bg-purple-500/15 text-purple-400',
  Quality: 'bg-emerald-500/15 text-emerald-400',
  Support: 'bg-amber-500/15 text-amber-400',
}

export function RoleGapList({ gaps }: RoleGapListProps) {
  if (gaps.length === 0) {
    return (
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-5 py-4">
        <p className="text-sm text-emerald-400">
          Full coverage across all task categories.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {gaps.map((gap) => (
        <div
          key={gap.category_name}
          className="flex items-center gap-3 border-l-2 border-body-muted/30 py-2.5 pl-4"
        >
          <span className="text-sm text-offwhite/80">{gap.category_name}</span>
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium leading-tight ${
              LAYER_BADGE_STYLES[gap.layer] ?? 'bg-offwhite/10 text-offwhite'
            }`}
          >
            {gap.layer}
          </span>
          <span className="ml-auto text-xs text-body-muted">No skills cataloged</span>
        </div>
      ))}
    </div>
  )
}

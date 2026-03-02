import Link from 'next/link'
import type { Role } from '@/lib/types'

type RoleCardProps = Readonly<{
  role: Role
  skillCount: number
  topCategories: string[]
}>

const CLUSTER_STYLES: Record<string, string> = {
  'AI Cluster': 'bg-blue-500/15 text-blue-400',
  'Product Cluster': 'bg-purple-500/15 text-purple-400',
  'Cloud Cluster': 'bg-emerald-500/15 text-emerald-400',
}

const PHASE_STYLES: Record<number, string> = {
  1: 'bg-offwhite/10 text-offwhite',
  2: 'bg-offwhite/5 text-body-muted',
  3: 'bg-offwhite/5 text-body-muted',
}

export function RoleCard({ role, skillCount, topCategories }: RoleCardProps) {
  const isEmpty = skillCount === 0

  return (
    <Link
      href={`/roles/${role.slug}`}
      className={`group block rounded-lg border bg-navy-light p-6 transition-all duration-200 ${
        isEmpty
          ? 'border-navy-muted/50 opacity-60'
          : 'border-navy-muted hover:border-body-muted/40'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl text-offwhite group-hover:text-accent transition-colors duration-200">
          {role.display_name}
        </h3>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium leading-tight ${
            CLUSTER_STYLES[role.cluster_name] ?? 'bg-offwhite/10 text-offwhite'
          }`}
        >
          {role.cluster_name}
        </span>
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium leading-tight ${
            PHASE_STYLES[role.phase]
          }`}
        >
          Phase {role.phase}
        </span>
      </div>

      <div className="mt-6">
        {isEmpty ? (
          <p className="font-display text-2xl text-body-muted">Coming soon</p>
        ) : (
          <>
            <p className="font-display text-4xl text-offwhite">{skillCount}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-body-muted">
              {skillCount === 1 ? 'skill' : 'skills'} cataloged
            </p>
          </>
        )}
      </div>

      {topCategories.length > 0 && (
        <div className="mt-4 border-t border-navy-muted pt-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-body-muted mb-1.5">
            Top categories
          </p>
          {topCategories.map((cat) => (
            <p key={cat} className="text-xs text-body-muted leading-relaxed">
              {cat}
            </p>
          ))}
        </div>
      )}
    </Link>
  )
}

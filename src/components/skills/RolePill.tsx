import { ROLES } from '@/lib/constants'

type RolePillProps = Readonly<{
  slug: string
}>

export function RolePill({ slug }: RolePillProps) {
  const role = ROLES.find(r => r.slug === slug)
  const label = role?.display_name ?? slug

  return (
    <span className="inline-block bg-navy-light text-body-muted text-xs px-2 py-0.5 rounded whitespace-nowrap">
      {label}
    </span>
  )
}

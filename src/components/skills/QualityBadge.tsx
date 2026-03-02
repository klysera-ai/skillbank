import { QUALITY_LABELS } from '@/lib/constants'

const QUALITY_STYLES: Record<number, string> = {
  3: 'bg-green-500/15 text-green-400',
  2: 'bg-amber-500/15 text-amber-400',
  1: 'bg-red-500/15 text-red-400',
}

type QualityBadgeProps = Readonly<{
  rating: 1 | 2 | 3
}>

export function QualityBadge({ rating }: QualityBadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium leading-tight ${QUALITY_STYLES[rating]}`}
    >
      {QUALITY_LABELS[rating]}
    </span>
  )
}

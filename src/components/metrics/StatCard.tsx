type StatCardProps = Readonly<{
  value: string | number
  label: string
  suffix?: string
}>

export function StatCard({ value, label, suffix }: StatCardProps): React.ReactElement {
  return (
    <div className="rounded-lg border border-navy-muted bg-navy-light px-6 py-8">
      <p className="font-display text-5xl text-offwhite">
        {value}
        {suffix && (
          <span className="text-2xl text-body-muted">{suffix}</span>
        )}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-body-muted">
        {label}
      </p>
    </div>
  )
}

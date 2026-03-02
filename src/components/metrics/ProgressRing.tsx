type ProgressRingProps = Readonly<{
  label: string
  current: number
  target: number
}>

export function ProgressRing({ label, current, target }: ProgressRingProps): React.ReactElement {
  const percentage = Math.min(Math.round((current / target) * 100), 100)
  const radius = 54
  const stroke = 6
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="140" height="140" viewBox="0 0 120 120" className="-rotate-90">
        {/* Track */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="var(--navy-muted)"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      {/* Center text overlay */}
      <div className="relative -mt-[108px] mb-[28px] flex flex-col items-center">
        <span className="font-display text-2xl text-offwhite">{percentage}%</span>
        <span className="text-[10px] uppercase tracking-[0.15em] text-body-muted">
          {current} / {target}
        </span>
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-body-muted">{label}</p>
    </div>
  )
}

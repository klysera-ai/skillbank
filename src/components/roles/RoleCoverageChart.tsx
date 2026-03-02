'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
  ReferenceLine,
} from 'recharts'
import { COLORS } from '@/lib/constants'
import type { TaskCategory } from '@/lib/types'

type CategoryData = {
  name: string
  displayName: string
  count: number
  layer: string
}

type RoleCoverageChartProps = Readonly<{
  categories: TaskCategory[]
  skillCountByCategory: Record<string, number>
}>

function getLayerColor(layer: string): string {
  return COLORS.layer[layer] ?? COLORS.accent
}

export function RoleCoverageChart({
  categories,
  skillCountByCategory,
}: RoleCoverageChartProps) {
  const data: CategoryData[] = categories.map((cat) => ({
    name: cat.slug,
    displayName: cat.display_name,
    count: skillCountByCategory[cat.slug] ?? 0,
    layer: cat.layer,
  }))

  const maxCount = Math.max(...data.map((d) => d.count), 1)

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, bottom: 72, left: 0 }}
          barCategoryGap="20%"
        >
          <CartesianGrid
            stroke="var(--navy-light)"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="displayName"
            tick={({ x, y, payload }) => (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={10}
                  textAnchor="end"
                  fill="var(--body-muted)"
                  fontSize={10}
                  transform="rotate(-45)"
                >
                  {payload.value.length > 18
                    ? payload.value.slice(0, 16) + '...'
                    : payload.value}
                </text>
              </g>
            )}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis
            tick={{ fill: 'var(--body-muted)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            domain={[0, maxCount + 1]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--navy-light)',
              border: '1px solid var(--navy-muted)',
              borderRadius: 8,
              color: 'var(--offwhite)',
              fontSize: 12,
            }}
            labelStyle={{ color: 'var(--body-muted)' }}
            formatter={(value: number | undefined) => [
              `${value ?? 0} skill${value === 1 ? '' : 's'}`,
              'Skills',
            ]}
          />
          {data.map((entry) =>
            entry.count === 0 ? (
              <ReferenceLine
                key={entry.name}
                x={entry.displayName}
                stroke="var(--navy-muted)"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
            ) : null
          )}
          <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={36}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.count === 0 ? 'transparent' : getLayerColor(entry.layer)}
                stroke={entry.count === 0 ? 'var(--navy-muted)' : 'none'}
                strokeDasharray={entry.count === 0 ? '4 4' : undefined}
                strokeWidth={entry.count === 0 ? 1 : 0}
                opacity={entry.count === 0 ? 0.4 : 0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

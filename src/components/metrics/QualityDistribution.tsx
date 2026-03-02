'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts'

type QualityDistributionProps = Readonly<{
  data: { level: number; label: string; count: number; color: string }[]
}>

export function QualityDistribution({ data }: QualityDistributionProps): React.ReactElement {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 40, bottom: 0, left: 0 }}
          barCategoryGap="28%"
        >
          <CartesianGrid
            horizontal={false}
            stroke="var(--navy-light)"
            strokeDasharray="3 3"
          />
          <XAxis
            type="number"
            tick={{ fill: 'var(--body-muted)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fill: 'var(--offwhite)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={120}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={28}>
            {data.map((entry) => (
              <Cell key={entry.level} fill={entry.color} />
            ))}
            <LabelList
              dataKey="count"
              position="right"
              style={{ fill: 'var(--offwhite)', fontSize: 13, fontWeight: 500 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

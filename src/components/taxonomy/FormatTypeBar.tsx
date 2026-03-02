"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

type FormatTypeBarProps = Readonly<{
  data: { name: string; count: number }[]
}>

const SEGMENT_COLORS = [
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#10B981", // green
  "#F59E0B", // amber
  "#EF4444", // red
  "#EC4899", // pink
  "#06B6D4", // cyan
]

export function FormatTypeBar({ data }: FormatTypeBarProps): React.ReactElement {
  return (
    <div className="rounded-lg border border-navy-muted bg-navy-light p-6">
      <ResponsiveContainer width="100%" height={80}>
        <BarChart
          data={[
            data.reduce(
              (acc, item) => ({ ...acc, [item.name]: item.count }),
              {} as Record<string, number>
            ),
          ]}
          layout="vertical"
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          barSize={36}
        >
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "#0A2E54",
              border: "1px solid #132D4A",
              borderRadius: "8px",
              color: "#F0F4F8",
              fontSize: "12px",
            }}
            formatter={(value: number | undefined) => [value ?? 0, 'Count']}
          />
          {data.map((item, i) => (
            <Bar
              key={item.name}
              dataKey={item.name}
              stackId="formats"
              fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
              radius={
                i === 0
                  ? [4, 0, 0, 4]
                  : i === data.length - 1
                    ? [0, 4, 4, 0]
                    : [0, 0, 0, 0]
              }
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}
            />
            <span className="text-xs text-body-muted">
              {item.name}
            </span>
            <span className="text-xs text-offwhite font-medium">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

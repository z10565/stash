import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts'

export default function SparklineChart({ data, color = '#00C896' }) {
  const chartData = data.map((v, i) => ({ i, v }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
        <defs>
          <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#sg-${color.replace('#','')})`}
          dot={false}
          isAnimationActive={false}
        />
        <Tooltip
          contentStyle={{ display: 'none' }}
          cursor={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

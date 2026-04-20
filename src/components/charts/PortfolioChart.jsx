import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 rounded-lg border text-sm"
        style={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
      >
        <p style={{ color: '#9CA3AF' }}>{label}</p>
        <p className="font-semibold" style={{ color: '#00C896' }}>
          €{payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export default function PortfolioChart({ data }) {
  const thinned = data.filter((_, i) => i % 5 === 0 || i === data.length - 1)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00C896" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#00C896" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fill: '#6B7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval={4}
        />
        <YAxis
          tick={{ fill: '#6B7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `€${v.toLocaleString()}`}
          width={60}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#00C896"
          strokeWidth={2}
          fill="url(#portfolioGrad)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default function APYBadge({ apy, risk }) {
  const color =
    risk <= 1 ? '#00C896' :
    risk <= 2 ? '#3B82F6' :
    risk <= 3 ? '#F59E0B' :
    '#EF4444'

  const bg =
    risk <= 1 ? 'rgba(0,200,150,0.12)' :
    risk <= 2 ? 'rgba(59,130,246,0.12)' :
    risk <= 3 ? 'rgba(245,158,11,0.12)' :
    'rgba(239,68,68,0.12)'

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-bold apy-animate"
      style={{ color, backgroundColor: bg }}
    >
      {apy.toFixed(1)}% APY
    </span>
  )
}

export default function ReturnBadge({ apy, size = 'md' }) {
  const color =
    apy === null ? '#8B949E' :
    apy >= 9  ? '#FF6B35' :
    apy >= 6  ? '#F0A500' :
    apy >= 4  ? '#00D09C' : '#8B949E'

  const textSize = size === 'lg' ? '1.5rem' : size === 'sm' ? '0.875rem' : '1.125rem'

  if (apy === null) {
    return (
      <div
        className="flex flex-col items-end"
        style={{ color: '#8B949E' }}
      >
        <span className="font-bold" style={{ fontSize: textSize }}>Market</span>
        <span className="text-xs font-medium">rate</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-end">
      <span className="font-bold leading-none" style={{ color, fontSize: textSize, fontFamily: 'DM Serif Display, serif' }}>
        {apy.toFixed(1)}%
      </span>
      <span className="text-xs font-medium" style={{ color: '#8B949E' }}>p.a.</span>
    </div>
  )
}

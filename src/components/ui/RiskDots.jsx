const riskColor = (risk) => {
  if (risk <= 1) return '#00D09C'
  if (risk <= 2) return '#26E5B0'
  if (risk <= 3) return '#F0A500'
  if (risk <= 4) return '#FF6B78'
  return '#FF4757'
}

export default function RiskDots({ risk, max = 5, size = 8 }) {
  const color = riskColor(risk)
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: i < risk ? color : '#30363D',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}

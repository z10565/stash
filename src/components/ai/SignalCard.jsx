const SIGNAL_STYLES = {
  HOLD:    { bg: 'rgba(240,165,0,0.08)',   text: '#F0A500', border: 'rgba(240,165,0,0.3)' },
  BUY:     { bg: 'rgba(0,208,156,0.08)',   text: '#00C896', border: 'rgba(0,200,150,0.3)' },
  CAUTION: { bg: 'rgba(255,71,87,0.08)',   text: '#FF4757', border: 'rgba(255,71,87,0.3)' },
  WAIT:    { bg: 'rgba(139,148,158,0.08)', text: '#8B949E', border: 'rgba(139,148,158,0.3)' },
}

export default function SignalCard({ signal }) {
  const s = SIGNAL_STYLES[signal.signal] ?? SIGNAL_STYLES.WAIT

  return (
    <div className="rounded-2xl border p-5 flex flex-col gap-3" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-bold text-white text-sm">{signal.asset}</p>
        <span
          className="text-xs font-black px-2.5 py-1 rounded-full border"
          style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}
        >
          {signal.signal}
        </span>
      </div>

      {/* Verdict */}
      <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
        {signal.verdict}
      </p>

      {/* Confidence */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: '#6B7280' }}>
          <span>Confidence</span>
          <span className="font-semibold" style={{ color: s.text }}>{signal.confidence}%</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ backgroundColor: '#1F2937' }}>
          <div
            className="h-1.5 rounded-full"
            style={{ width: `${signal.confidence}%`, backgroundColor: s.text, transition: 'width 0.6s ease' }}
          />
        </div>
      </div>

      {/* Source tags */}
      <div className="flex flex-wrap gap-1.5">
        {signal.sources.map(src => (
          <span key={src} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#1F2937', color: '#6B7280' }}>
            {src}
          </span>
        ))}
      </div>

      {/* Timestamp */}
      <p className="text-xs" style={{ color: '#374151' }}>Updated 2 hours ago</p>
    </div>
  )
}

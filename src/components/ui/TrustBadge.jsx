import { Shield } from 'lucide-react'

const BADGES = {
  FCMC:   { label: 'FCMC Latvia',         color: '#00D09C' },
  LB:     { label: 'Bank of Lithuania',   color: '#26E5B0' },
  FKTK:   { label: 'FKTK Latvia',         color: '#00D09C' },
  CySEC:  { label: 'CySEC Cyprus',        color: '#F0A500' },
  EP:     { label: 'Eesti Pank',          color: '#26E5B0' },
  MiFID2: { label: 'MiFID II',            color: '#00D09C' },
}

export default function TrustBadge({ code, label: customLabel }) {
  const cfg = BADGES[code] || { label: customLabel || code, color: '#8B949E' }
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
      style={{
        backgroundColor: 'rgba(0,208,156,0.08)',
        color: cfg.color,
        border: '1px solid rgba(0,208,156,0.2)',
      }}
    >
      <Shield size={10} />
      {cfg.label}
    </span>
  )
}

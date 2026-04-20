import { ArrowRight, BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import TrustBadge from './TrustBadge'
import ProtectionBadge from './ProtectionBadge'

const TYPE_COLORS = {
  'P2P':          { bg: 'rgba(255,107,53,0.12)',  color: '#FF6B35' },
  'ETF':          { bg: 'rgba(0,208,156,0.12)',   color: '#00D09C' },
  'Stocks':       { bg: 'rgba(38,229,176,0.12)',  color: '#26E5B0' },
  'Real Estate':  { bg: 'rgba(240,165,0,0.12)',   color: '#F0A500' },
  'Term Deposit': { bg: 'rgba(139,148,158,0.12)', color: '#8B949E' },
  'Money Market': { bg: 'rgba(0,208,156,0.08)',   color: '#00D09C' },
}

function TypeTag({ type }) {
  const { bg, color } = TYPE_COLORS[type] || { bg: '#21262D', color: '#8B949E' }
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded"
      style={{ backgroundColor: bg, color }}
    >
      {type}
    </span>
  )
}

// Logo placeholder — initials in a coloured square
function BrokerLogo({ name }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
      style={{ backgroundColor: '#21262D', color: '#00D09C', border: '1px solid #30363D' }}
    >
      {initials}
    </div>
  )
}

export default function BrokerCard({ broker }) {
  const { name, types, maxRate, minInvest, regulated, regCode, protection, description, badge } = broker

  return (
    <div
      className="rounded-xl border p-5 flex flex-col gap-4 transition-all duration-200"
      style={{ backgroundColor: '#161B22', borderColor: '#21262D' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#30363D'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#21262D'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <BrokerLogo name={name} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-bold text-white text-sm">{name}</span>
            <BadgeCheck size={14} color="#00D09C" />
            {badge && (
              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: 'rgba(0,208,156,0.15)', color: '#00D09C' }}
              >
                {badge}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {types.map(t => <TypeTag key={t} type={t} />)}
          </div>
        </div>
        {maxRate && (
          <div className="text-right flex-shrink-0">
            <p className="text-xl font-bold" style={{ color: '#00D09C', fontFamily: 'DM Serif Display, serif' }}>
              {maxRate}%
            </p>
            <p className="text-xs" style={{ color: '#8B949E' }}>up to</p>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed" style={{ color: '#8B949E' }}>{description}</p>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <TrustBadge code={regCode} />
        <ProtectionBadge type={protection} compact />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: '#21262D' }}>
        <span className="text-xs" style={{ color: '#8B949E' }}>
          From <strong className="text-white">€{minInvest.toLocaleString()}</strong>
        </span>
        <Link
          to="/marketplace"
          className="flex items-center gap-1 text-xs font-semibold transition-colors"
          style={{ color: '#00D09C' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#26E5B0')}
          onMouseLeave={e => (e.currentTarget.style.color = '#00D09C')}
        >
          View products <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  )
}

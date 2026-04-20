import { Link } from 'react-router-dom'
import { BadgeCheck, Clock, TrendingUp } from 'lucide-react'
import RiskDots from './RiskDots'
import ReturnBadge from './ReturnBadge'
import ProtectionBadge from './ProtectionBadge'

const CATEGORY_COLORS = {
  'P2P Loans':     { color: '#FF6B35', bg: 'rgba(255,107,53,0.12)' },
  'ETFs':          { color: '#00D09C', bg: 'rgba(0,208,156,0.12)' },
  'Real Estate':   { color: '#F0A500', bg: 'rgba(240,165,0,0.12)' },
  'Bonds':         { color: '#8B949E', bg: 'rgba(139,148,158,0.10)' },
  'Term Deposits': { color: '#26E5B0', bg: 'rgba(38,229,176,0.10)' },
}

function CategoryTag({ category }) {
  const { color, bg } = CATEGORY_COLORS[category] || { color: '#8B949E', bg: '#21262D' }
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: bg, color }}>
      {category}
    </span>
  )
}

export default function ProductCard({ product, onInvest }) {
  const { broker, name, category, apy, risk, term, minInvest, protection, description } = product

  return (
    <div
      className="rounded-xl border p-5 flex flex-col gap-4 transition-all duration-200 cursor-pointer"
      style={{ backgroundColor: '#161B22', borderColor: '#21262D' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#00D09C'
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,208,156,0.2), 0 4px 24px rgba(0,208,156,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#21262D'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
            <CategoryTag category={category} />
          </div>
          <h3 className="text-white font-semibold text-sm leading-snug mb-0.5">{name}</h3>
          <div className="flex items-center gap-1 text-xs" style={{ color: '#8B949E' }}>
            <BadgeCheck size={11} color="#00D09C" />
            <span>{broker}</span>
          </div>
        </div>
        <ReturnBadge apy={apy} />
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed" style={{ color: '#8B949E' }}>{description}</p>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p style={{ color: '#8B949E' }} className="mb-1">Risk</p>
          <RiskDots risk={risk} />
        </div>
        <div>
          <p style={{ color: '#8B949E' }} className="mb-1 flex items-center gap-1">
            <Clock size={10} /> Term
          </p>
          <p className="text-white font-medium">{term}</p>
        </div>
        <div>
          <p style={{ color: '#8B949E' }} className="mb-1">Minimum</p>
          <p className="text-white font-medium">€{minInvest.toLocaleString()}</p>
        </div>
      </div>

      {/* Protection */}
      <ProtectionBadge type={protection} compact />

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onInvest && onInvest(product)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all"
          style={{ backgroundColor: '#00D09C', color: '#0D1117' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00D09C')}
        >
          <TrendingUp size={12} /> Invest now
        </button>
        <Link
          to="/how-it-works"
          className="px-4 py-2 rounded-lg text-xs font-medium border transition-all"
          style={{ borderColor: '#21262D', color: '#8B949E', backgroundColor: 'transparent' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#30363D'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#21262D'; e.currentTarget.style.color = '#8B949E' }}
        >
          Learn more
        </Link>
      </div>
    </div>
  )
}

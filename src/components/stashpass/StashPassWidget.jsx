import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { STASH_PASS } from '../../data/mockData'
import StashPassCard from './StashPassCard'

const TIER_COLOR = {
  silver:   '#C0C0C0',
  gold:     '#D4AF37',
  platinum: '#E5E4E2',
}

export default function StashPassWidget({ loading = false }) {
  const tier        = STASH_PASS.currentTier
  const tierLabel   = STASH_PASS.tiers[tier].label
  const color       = TIER_COLOR[tier]
  const topBenefits = STASH_PASS.benefits[tier].slice(0, 2)

  const nextTier  = tier === 'silver' ? 'gold' : 'platinum'
  const nextLabel = STASH_PASS.tiers[nextTier].label
  const nextThreshold = STASH_PASS.tiers[nextTier].threshold
  const current       = STASH_PASS.totalInvested
  const currentThreshold = STASH_PASS.tiers[tier].threshold
  const progress = Math.min(100, ((current - currentThreshold) / (nextThreshold - currentThreshold)) * 100)

  if (loading) {
    return (
      <div className="rounded-2xl border p-6" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
        <div className="skeleton h-5 w-28 mb-4" />
        <div className="skeleton h-36 w-full rounded-xl mb-4" />
        <div className="skeleton h-3 w-full mb-3" />
        <div className="skeleton h-8 w-full" />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border p-6" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          <h2 className="text-base font-bold text-white">Stash Pass</h2>
        </div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
          style={{ color, backgroundColor: `${color}18` }}
        >
          {tierLabel}
        </span>
      </div>

      {/* Mini card */}
      <div className="flex justify-center mb-4">
        <StashPassCard small />
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: '#6B7280' }}>
          <span>{tierLabel}</span>
          <span style={{ color: TIER_COLOR[nextTier] }}>€{STASH_PASS.nextTierGap.toLocaleString()} to {nextLabel}</span>
        </div>
        <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: '#1F2937' }}>
          <div
            className="h-1.5 rounded-full transition-all"
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
      </div>

      {/* Benefit chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {topBenefits.map((b, i) => (
          <span
            key={i}
            className="text-xs px-2.5 py-1 rounded-full border"
            style={{ color: '#00C896', borderColor: 'rgba(0,200,150,0.25)', backgroundColor: 'rgba(0,200,150,0.07)' }}
          >
            {b}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        to="/stash-pass"
        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold border transition-all"
        style={{ borderColor: '#1F2937', color: '#9CA3AF', backgroundColor: 'transparent' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#374151' }}
        onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.borderColor = '#1F2937' }}
      >
        View Stash Pass <ChevronRight size={14} />
      </Link>
    </div>
  )
}

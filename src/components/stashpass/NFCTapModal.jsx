import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, ExternalLink, Share2 } from 'lucide-react'
import { STASH_PASS, formatCurrency } from '../../data/mockData'
import StashPassCard from './StashPassCard'

export default function NFCTapModal({ onClose }) {
  const [glowing, setGlowing] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setGlowing(false), 1200)
    return () => clearTimeout(t)
  }, [])

  const handleShare = () => {
    const url = window.location.origin + '/stash-pass'
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {})
    }
  }

  const tier = STASH_PASS.currentTier
  const nextTierLabel = tier === 'silver' ? 'Gold' : 'Platinum'

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className={`card-tap-enter w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl border overflow-hidden${glowing ? ' nfc-glow-ring' : ''}`}
        style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#1F2937' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: '#00D09C' }} />
            <span className="font-bold text-white" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 17 }}>
              Stash Pass
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: '#6B7280' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Card */}
        <div className="flex justify-center py-5 px-5">
          <StashPassCard small />
        </div>

        {/* Portfolio summary grid */}
        <div className="px-5 pb-5">
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {[
              { label: 'Total invested',   val: formatCurrency(STASH_PASS.totalInvested) },
              { label: 'Portfolio return', val: '+€47.30 (+3.8%)', green: true },
              { label: 'Active products',  val: '2' },
              { label: 'Member since',     val: STASH_PASS.memberSince },
            ].map(({ label, val, green }) => (
              <div key={label} className="rounded-xl p-3" style={{ backgroundColor: '#1F2937' }}>
                <p className="text-xs mb-1" style={{ color: '#6B7280' }}>{label}</p>
                <p className="text-sm font-bold" style={{ color: green ? '#00C896' : '#fff' }}>{val}</p>
              </div>
            ))}
          </div>

          {/* Active benefits */}
          <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>
            Active benefits
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {STASH_PASS.benefits[tier].map((b, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full border"
                style={{ color: '#00C896', borderColor: 'rgba(0,200,150,0.3)', backgroundColor: 'rgba(0,200,150,0.08)' }}
              >
                {b}
              </span>
            ))}
          </div>

          {/* Next milestone */}
          <div className="rounded-xl p-3 mb-4 border" style={{ backgroundColor: 'rgba(212,175,55,0.07)', borderColor: 'rgba(212,175,55,0.25)' }}>
            <p className="text-xs font-semibold" style={{ color: '#D4AF37' }}>
              Next milestone — €{STASH_PASS.nextTierGap.toLocaleString()} more to {nextTierLabel}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3">
            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ backgroundColor: '#00C896', color: '#0A0E1A' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00C896')}
            >
              <ExternalLink size={14} /> View full portfolio
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold border transition-all"
              style={{ borderColor: '#374151', color: '#9CA3AF', backgroundColor: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#6B7280' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.borderColor = '#374151' }}
            >
              <Share2 size={14} /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

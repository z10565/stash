import { useState } from 'react'
import { Wifi } from 'lucide-react'
import { STASH_PASS } from '../data/mockData'
import StashPassCard from '../components/stashpass/StashPassCard'
import NFCTapModal from '../components/stashpass/NFCTapModal'
import TierBenefitsGrid from '../components/stashpass/TierBenefitsGrid'
import HowToUnlock from '../components/stashpass/HowToUnlock'

const TIER_COLOR = {
  silver:   '#C0C0C0',
  gold:     '#D4AF37',
  platinum: '#E5E4E2',
}

const PARTNERS = [
  { name: 'airBaltic',              detail: 'Flight discounts' },
  { name: 'Booking.com',            detail: 'Hotel discounts' },
  { name: 'LoungeKey',              detail: 'Airport lounge access' },
  { name: 'Stash Insurance',        detail: 'Travel insurance' },
]

export default function StashPass() {
  const [tapping,   setTapping]   = useState(false)
  const [showModal, setShowModal] = useState(false)

  const tier          = STASH_PASS.currentTier
  const tierColor     = TIER_COLOR[tier]
  const tierLabel     = STASH_PASS.tiers[tier].label
  const nextTier      = tier === 'silver' ? 'gold' : 'platinum'
  const nextLabel     = STASH_PASS.tiers[nextTier].label
  const nextThreshold = STASH_PASS.tiers[nextTier].threshold
  const currentBase   = STASH_PASS.tiers[tier].threshold
  const invested      = STASH_PASS.totalInvested
  const progress      = Math.min(100, ((invested - currentBase) / (nextThreshold - currentBase)) * 100)

  const handleNFCTap = () => {
    setTapping(true)
    setTimeout(() => {
      setTapping(false)
      setShowModal(true)
    }, 1200)
  }

  return (
    <div style={{ backgroundColor: '#0A0E1A', minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
            style={{ backgroundColor: `${tierColor}18`, color: tierColor }}
          >
            {tierLabel} member
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: 'DM Serif Display, serif' }}
          >
            Invest more.{' '}
            <span style={{ color: '#00D09C' }}>Live better.</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            Your Stash Pass unlocks real-world rewards as your portfolio grows.
          </p>
        </div>

        {/* Card + progress */}
        <div className="flex flex-col items-center gap-8">
          <StashPassCard tapping={tapping} />

          {/* Progress to next tier */}
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-between text-sm mb-2">
              <span style={{ color: tierColor }} className="font-semibold">{tierLabel}</span>
              <span style={{ color: TIER_COLOR[nextTier] }} className="font-semibold">{nextLabel}</span>
            </div>
            <div className="h-2 rounded-full w-full mb-2" style={{ backgroundColor: '#1F2937' }}>
              <div
                className="h-2 rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, backgroundColor: tierColor }}
              />
            </div>
            <p className="text-sm text-center" style={{ color: '#6B7280' }}>
              <span className="font-semibold text-white">€{STASH_PASS.nextTierGap.toLocaleString()}</span>{' '}
              more to {nextLabel}
            </p>
          </div>

          {/* NFC Tap button */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleNFCTap}
              disabled={tapping}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-sm border-2 transition-all"
              style={{
                backgroundColor: tapping ? 'rgba(0,208,156,0.08)' : 'transparent',
                borderColor: '#00D09C',
                color: '#00D09C',
              }}
              onMouseEnter={e => { if (!tapping) { e.currentTarget.style.backgroundColor = 'rgba(0,208,156,0.08)' } }}
              onMouseLeave={e => { if (!tapping) { e.currentTarget.style.backgroundColor = 'transparent' } }}
            >
              <Wifi size={18} style={{ transform: 'rotate(90deg)' }} />
              {tapping ? 'Tapping…' : 'Simulate NFC tap'}
            </button>
            <p className="text-xs" style={{ color: '#374151' }}>
              See what happens when you tap your physical card on a phone
            </p>
          </div>
        </div>
      </section>

      {/* ── Tier benefits grid ───────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #1F2937' }}>
        <TierBenefitsGrid />
      </div>

      {/* ── How to unlock ────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #1F2937' }}>
        <HowToUnlock />
      </div>

      {/* ── Partner logos ────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #1F2937' }}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-xs font-medium uppercase tracking-widest text-center mb-8" style={{ color: '#374151' }}>
            Reward partners
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PARTNERS.map(({ name, detail }) => (
              <div
                key={name}
                className="rounded-xl border px-4 py-5 flex flex-col items-center gap-2 text-center"
                style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
              >
                <p className="font-bold text-white text-sm">{name}</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>{detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── NFC Modal ────────────────────────────────────────────────────── */}
      {showModal && <NFCTapModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

import { Check, Lock, Shield, Star, Zap } from 'lucide-react'
import { STASH_PASS } from '../../data/mockData'

const TIERS = [
  {
    key: 'silver',
    Icon: Shield,
    threshold: '€500 invested',
    color: '#C0C0C0',
    borderActive: '#C0C0C0',
    bgActive: 'rgba(192,192,192,0.07)',
    fullBenefits: [
      '5% off airBaltic flights',
      'Access to all broker products',
      'Basic auto-invest',
      'Stash community access',
    ],
  },
  {
    key: 'gold',
    Icon: Star,
    threshold: '€5,000 invested',
    color: '#D4AF37',
    borderActive: '#D4AF37',
    bgActive: 'rgba(212,175,55,0.07)',
    fullBenefits: [
      '10% off airBaltic flights',
      'Free travel insurance (€500k)',
      '10% off partner hotels',
      'Priority customer support',
      'Advanced auto-invest',
      'Early access to new partners',
    ],
  },
  {
    key: 'platinum',
    Icon: Zap,
    threshold: '€25,000 invested',
    color: '#E5E4E2',
    borderActive: '#E5E4E2',
    bgActive: 'rgba(229,228,226,0.05)',
    fullBenefits: [
      '15% off airBaltic flights',
      'Airport lounge access (LoungeKey)',
      'Dedicated account manager',
      'Exclusive broker products',
      'Quarterly investor events',
      'Free premium travel insurance',
    ],
  },
]

const TIER_ORDER = ['silver', 'gold', 'platinum']

function statusFor(tierKey, currentTier) {
  const currentIdx = TIER_ORDER.indexOf(currentTier)
  const tierIdx    = TIER_ORDER.indexOf(tierKey)
  if (tierIdx < currentIdx)  return 'unlocked'
  if (tierIdx === currentIdx) return 'current'
  return 'locked'
}

export default function TierBenefitsGrid() {
  const current = STASH_PASS.currentTier

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>
          Tier benefits
        </h2>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Every euro you invest unlocks more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {TIERS.map(({ key, Icon, threshold, color, borderActive, bgActive, fullBenefits }) => {
          const status = statusFor(key, current)
          const isCurrent  = status === 'current'
          const isUnlocked = status === 'unlocked'
          const isLocked   = status === 'locked'

          return (
            <div
              key={key}
              className="rounded-2xl border p-6 flex flex-col gap-4 transition-all"
              style={{
                backgroundColor: isCurrent ? bgActive : '#111827',
                borderColor: isCurrent ? borderActive : '#1F2937',
                borderWidth: isCurrent ? 2 : 1,
                opacity: isLocked ? 0.65 : 1,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: isCurrent ? `${color}20` : '#1F2937' }}
                  >
                    <Icon size={20} color={isCurrent || isUnlocked ? color : '#374151'} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: isCurrent ? color : '#fff' }}>
                      {key}
                    </p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>{threshold}</p>
                  </div>
                </div>

                {/* Status badge */}
                {isCurrent && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,200,150,0.12)', color: '#00C896' }}>
                    Current
                  </span>
                )}
                {isUnlocked && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,200,150,0.08)', color: '#00C896' }}>
                    Unlocked
                  </span>
                )}
                {isLocked && (
                  <Lock size={14} color="#374151" />
                )}
              </div>

              {/* Benefits list */}
              <ul className="flex flex-col gap-2.5">
                {fullBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    {isLocked ? (
                      <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1F2937' }}>
                        <Lock size={8} color="#374151" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}22` }}>
                        <Check size={9} color={color} strokeWidth={3} />
                      </div>
                    )}
                    <span style={{ color: isLocked ? '#374151' : '#C9D1D9' }}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}

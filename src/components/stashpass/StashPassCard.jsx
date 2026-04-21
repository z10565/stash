import { useState } from 'react'
import { Wifi } from 'lucide-react'
import { STASH_PASS, userProfile, formatCurrency } from '../../data/mockData'

const TIER_CONFIG = {
  silver: {
    bg: 'linear-gradient(135deg, #8a8a8a 0%, #C0C0C0 40%, #e8e8e8 55%, #b0b0b0 100%)',
    textColor: '#111',
    mutedColor: '#444',
    chipBg: 'linear-gradient(135deg, #C8A000 0%, #F0D060 50%, #C8A000 100%)',
    glowClass: 'tier-glow-silver',
    shimmer: false,
  },
  gold: {
    bg: 'linear-gradient(135deg, #9a6f00 0%, #D4AF37 40%, #f0d060 55%, #b8860b 100%)',
    textColor: '#111',
    mutedColor: '#3a2a00',
    chipBg: 'linear-gradient(135deg, #888 0%, #ccc 50%, #888 100%)',
    glowClass: 'tier-glow-gold',
    shimmer: false,
  },
  platinum: {
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #222240 50%, #1a1a2e 100%)',
    textColor: '#E5E4E2',
    mutedColor: '#9E9D9B',
    chipBg: 'linear-gradient(135deg, #8a7a60 0%, #C0A060 50%, #8a7a60 100%)',
    glowClass: 'tier-glow-platinum',
    shimmer: true,
  },
}

function NFCSymbol({ color, tapping }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 32, height: 32 }}>
      {tapping && (
        <>
          <div className="nfc-ring" style={{ color }} />
          <div className="nfc-ring nfc-ring-delay" style={{ color }} />
        </>
      )}
      <Wifi size={20} color={color} style={{ opacity: 0.85, transform: 'rotate(90deg)', position: 'relative', zIndex: 1 }} />
    </div>
  )
}

export default function StashPassCard({
  tier = STASH_PASS.currentTier,
  small = false,
  tapping = false,
}) {
  const [flipped, setFlipped] = useState(false)
  const cfg = TIER_CONFIG[tier]
  const label = STASH_PASS.tiers[tier].label.toUpperCase()
  const benefits = STASH_PASS.benefits[tier]

  const cardHeight = small ? 160 : 240
  const maxWidth   = small ? 260 : 380
  const pad        = small ? '12px' : '20px'
  const fontSize   = { logo: small ? 12 : 14, badge: small ? 9 : 10, name: small ? 10 : 11, num: small ? 11 : 13, hint: 10, summaryLabel: small ? 9 : 11, summaryVal: small ? 11 : 13, benefitTag: small ? 8 : 10 }

  return (
    <div
      className={`card-flip cursor-pointer ${cfg.glowClass}`}
      style={{ width: '100%', maxWidth: maxWidth, height: cardHeight, borderRadius: 16 }}
      onClick={() => setFlipped(f => !f)}
      title="Click to flip"
    >
      <div className={`card-inner${flipped ? ' flipped' : ''}`}>

        {/* ── FRONT ── */}
        <div
          className={`card-front${cfg.shimmer ? ' card-shimmer' : ''}`}
          style={{ background: cfg.bg, borderRadius: 16, padding: pad, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: small ? 16 : 20, height: small ? 16 : 20, borderRadius: '50%', backgroundColor: cfg.textColor === '#E5E4E2' ? '#00D09C' : 'rgba(0,0,0,0.2)' }} />
              <span style={{ color: cfg.textColor, fontSize: fontSize.logo, fontFamily: 'DM Serif Display, serif', fontWeight: 700, letterSpacing: '0.02em' }}>Stash</span>
            </div>
            <span style={{ color: cfg.textColor, fontSize: fontSize.badge, fontWeight: 900, letterSpacing: '0.15em', padding: '2px 7px', borderRadius: 4, backgroundColor: cfg.textColor === '#111' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.1)' }}>
              {label}
            </span>
          </div>

          {/* Chip (desktop only) */}
          {!small && (
            <div style={{ width: 40, height: 28, borderRadius: 5, background: cfg.chipBg }} />
          )}

          {/* Bottom row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: cfg.textColor, fontSize: fontSize.name, opacity: 0.7, margin: 0 }}>
                {userProfile.name} {userProfile.lastName}
              </p>
              <p style={{ color: cfg.textColor, fontSize: fontSize.num, fontFamily: 'monospace', fontWeight: 600, letterSpacing: '0.12em', margin: '3px 0 0' }}>
                •••• {STASH_PASS.cardNumber}
              </p>
              {!small && (
                <p style={{ color: cfg.textColor, fontSize: fontSize.hint, opacity: 0.4, margin: '3px 0 0' }}>
                  Tap to view portfolio
                </p>
              )}
            </div>
            <NFCSymbol color={cfg.textColor} tapping={tapping} />
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="card-back"
          style={{ background: cfg.bg, borderRadius: 16, padding: pad, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <p style={{ color: cfg.textColor, fontSize: fontSize.summaryLabel, fontWeight: 900, letterSpacing: '0.15em', margin: '0 0 10px' }}>
              PORTFOLIO SUMMARY
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: small ? 6 : 10 }}>
              {[
                { label: 'Invested', val: formatCurrency(STASH_PASS.totalInvested) },
                { label: 'Return',   val: '+€47.30 (+3.8%)', green: true },
                { label: 'Products', val: '2 active' },
                { label: 'Since',    val: STASH_PASS.memberSince },
              ].map(({ label: lbl, val, green }) => (
                <div key={lbl}>
                  <p style={{ color: cfg.textColor, opacity: 0.6, fontSize: fontSize.summaryLabel, margin: 0 }}>{lbl}</p>
                  <p style={{ color: green ? (cfg.textColor === '#111' ? '#006644' : '#00D09C') : cfg.textColor, fontSize: fontSize.summaryVal, fontWeight: 700, margin: '2px 0 0' }}>{val}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p style={{ color: cfg.textColor, opacity: 0.6, fontSize: fontSize.benefitTag, margin: '0 0 5px' }}>Your benefits</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {benefits.slice(0, small ? 2 : 3).map((b, i) => (
                <span
                  key={i}
                  style={{
                    color: cfg.textColor,
                    fontSize: fontSize.benefitTag,
                    padding: small ? '1px 6px' : '2px 8px',
                    borderRadius: 99,
                    backgroundColor: cfg.textColor === '#111' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

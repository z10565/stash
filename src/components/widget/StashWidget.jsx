import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// ── Constants ──────────────────────────────────────────────────────────────────
const C = {
  bg:     '#161B22',
  card:   '#21262D',
  border: '#30363D',
  bg2:    '#0D1117',
  green:  '#00D09C',
  amber:  '#F0A500',
  blue:   '#3B82F6',
  muted:  '#8B949E',
  text:   '#E6EDF3',
  red:    '#FF4757',
}

const PRODUCTS = [
  { key: 'bank',  label: 'Bank deposit',       apy: 2,   color: '#8B949E', dash: [5, 4], fill: false },
  { key: 'bonds', label: 'Bonds / Term dep.',   apy: 4.5, color: '#F0A500', dash: [],     fill: true  },
  { key: 'etf',   label: 'ETFs / Index funds',  apy: 8,   color: '#3B82F6', dash: [],     fill: true  },
  { key: 'p2p',   label: 'P2P loans',           apy: 11,  color: '#00D09C', dash: [],     fill: true  },
]

const QUICK_AMOUNTS = [50, 100, 200, 500]
const QUICK_YEARS   = [5, 10, 20, 30]

// ── Math ──────────────────────────────────────────────────────────────────────
function fvMonthly(pmt, annualPct, years) {
  const r = annualPct / 100 / 12
  const n = years * 12
  if (r === 0) return pmt * n
  return pmt * ((Math.pow(1 + r, n) - 1) / r)
}
function fmt(n)  { return '€' + Math.round(n).toLocaleString('en') }
function fmtK(n) { return n >= 1000 ? '€' + (n / 1000).toFixed(0) + 'k' : fmt(n) }

// ── Chart hook ────────────────────────────────────────────────────────────────
function useChart(ref, getConfig, deps) {
  useEffect(() => {
    if (!ref.current || !window.Chart) return
    const ctx   = ref.current.getContext('2d')
    const chart = new window.Chart(ctx, getConfig())
    return () => chart.destroy()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

// ── Quick-pick button ─────────────────────────────────────────────────────────
function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all"
      style={{
        backgroundColor: active ? 'rgba(0,208,156,0.12)' : 'transparent',
        borderColor:     active ? C.green : C.border,
        color:           active ? C.green : C.muted,
      }}
    >
      {children}
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function StashWidget() {
  const [pmt,   setPmt]   = useState(200)
  const [years, setYears] = useState(10)
  const chartRef = useRef(null)

  const labels  = Array.from({ length: years + 1 }, (_, i) => i === 0 ? 'Now' : `Yr ${i}`)
  const values  = Object.fromEntries(PRODUCTS.map(p => [p.key, fvMonthly(pmt, p.apy, years)]))
  const contrib = pmt * 12 * years

  useChart(chartRef, () => ({
    type: 'line',
    data: {
      labels,
      datasets: PRODUCTS.map(p => ({
        label:              p.label,
        data:               labels.map((_, i) => Math.round(fvMonthly(pmt, p.apy, i))),
        borderColor:        p.color,
        backgroundColor:    p.fill ? p.color + '18' : 'transparent',
        fill:               p.fill,
        tension:            0.4,
        borderDash:         p.dash,
        borderWidth:        p.key === 'bank' ? 1.5 : 2,
        pointRadius:        0,
        pointHoverRadius:   4,
        pointBackgroundColor: p.color,
      })),
    },
    options: {
      responsive:          true,
      maintainAspectRatio: false,
      interaction:         { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          labels:  { color: C.muted, font: { size: 10, family: 'Inter' }, boxWidth: 10, padding: 12, usePointStyle: true },
        },
        tooltip: {
          backgroundColor: C.card,
          borderColor:     C.border,
          borderWidth:     1,
          titleColor:      C.text,
          bodyColor:       C.muted,
          padding:         10,
          callbacks:       { label: ctx => ` ${ctx.dataset.label}: ${fmt(ctx.parsed.y)}` },
        },
      },
      scales: {
        x: {
          grid:  { display: false },
          ticks: { color: C.muted, font: { size: 10 }, maxTicksLimit: 8 },
          border:{ color: C.border },
        },
        y: {
          grid:  { color: 'rgba(48,54,61,0.5)' },
          ticks: { color: C.muted, font: { size: 10 }, callback: v => fmtK(v) },
          border:{ display: false },
        },
      },
    },
  }), [pmt, years])

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ backgroundColor: C.bg, borderColor: C.card, width: '100%', maxWidth: 680 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: C.card }}>
        <span className="text-xs font-bold" style={{ color: C.green }}>Compound Interest Visualiser</span>
        <Link
          to="/onboarding"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
          style={{ backgroundColor: C.green, color: '#0D1117' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.green)}
        >
          Start investing
        </Link>
      </div>

      <div className="px-6 pt-5 pb-6">

        {/* Dynamic headline */}
        <p className="text-sm leading-snug mb-4" style={{ color: C.muted }}>
          If you invest{' '}
          <strong className="text-white">{fmt(pmt)}/month</strong>{' '}
          for <strong className="text-white">{years} year{years !== 1 ? 's' : ''}</strong>, you could have{' '}
          <strong style={{ color: C.green }}>{fmt(values.p2p)}</strong>{' '}
          instead of{' '}
          <span style={{ color: C.muted }}>{fmt(values.bank)}</span>
        </p>

        {/* Chart */}
        <div
          className="rounded-xl border mb-5 overflow-hidden"
          style={{ backgroundColor: C.bg2, borderColor: C.card, height: 210 }}
        >
          <canvas ref={chartRef} />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

          {/* Monthly amount */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium" style={{ color: C.muted }}>Monthly contribution</p>
              <span className="text-sm font-bold text-white">{fmt(pmt)}</span>
            </div>
            <input
              type="range" min={50} max={2000} step={50} value={pmt}
              onChange={e => setPmt(+e.target.value)}
              className="w-full mb-2" style={{ accentColor: C.green }}
            />
            <div className="flex gap-1.5 flex-wrap">
              {QUICK_AMOUNTS.map(a => (
                <Chip key={a} active={pmt === a} onClick={() => setPmt(a)}>€{a}</Chip>
              ))}
            </div>
          </div>

          {/* Time horizon */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium" style={{ color: C.muted }}>Time horizon</p>
              <span className="text-sm font-bold text-white">{years} yr{years !== 1 ? 's' : ''}</span>
            </div>
            <input
              type="range" min={1} max={30} step={1} value={years}
              onChange={e => setYears(+e.target.value)}
              className="w-full mb-2" style={{ accentColor: C.green }}
            />
            <div className="flex gap-1.5 flex-wrap">
              {QUICK_YEARS.map(y => (
                <Chip key={y} active={years === y} onClick={() => setYears(y)}>{y}yr</Chip>
              ))}
            </div>
          </div>

        </div>

        {/* Results grid 2×2 */}
        <div className="grid grid-cols-2 gap-3">
          {PRODUCTS.map(p => {
            const final   = values[p.key]
            const gain    = final - contrib
            const vsDep   = final - values.bank
            const isBest  = p.key === 'p2p'
            const isBank  = p.key === 'bank'

            return (
              <div
                key={p.key}
                className="rounded-xl p-4 border relative"
                style={{
                  backgroundColor: isBest ? 'rgba(0,208,156,0.06)' : C.card,
                  borderColor:     isBest ? 'rgba(0,208,156,0.3)' : C.border,
                  borderWidth:     isBest ? '1.5px' : '1px',
                }}
              >
                {isBest && (
                  <div
                    className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap"
                    style={{ backgroundColor: C.green, color: '#0D1117' }}
                  >
                    Best return ✓
                  </div>
                )}

                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                  <p className="text-xs font-semibold" style={{ color: p.color }}>{p.label}</p>
                </div>

                <p
                  className="text-xl font-bold mb-0.5 leading-none"
                  style={{ color: isBank ? C.text : p.color, fontFamily: 'DM Serif Display, serif' }}
                >
                  {fmt(final)}
                </p>

                <p className="text-xs mb-1" style={{ color: C.muted }}>
                  Contributed: {fmt(contrib)}
                </p>

                <p className="text-xs font-semibold mb-1" style={{ color: gain >= 0 ? C.green : C.red }}>
                  Gain: {gain >= 0 ? '+' : ''}{fmt(gain)}
                </p>

                {!isBank && (
                  <p className="text-xs" style={{ color: C.muted }}>
                    vs deposit: <span style={{ color: C.green }}>+{fmt(vsDep)}</span>
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-5 text-center">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all"
            style={{ backgroundColor: C.green, color: '#0D1117' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.green)}
          >
            Start growing my money <ArrowRight size={15} />
          </Link>
          <p className="text-xs mt-2" style={{ color: C.muted }}>
            EU regulated · Capital at risk · Results are projections, not guarantees
          </p>
        </div>

      </div>
    </div>
  )
}

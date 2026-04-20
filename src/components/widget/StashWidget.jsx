import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Shield, TrendingUp, Percent, ArrowRight, ArrowUpRight } from 'lucide-react'
import { RATES, MIX_COLORS } from '../../data/rates'

// ── Colours ───────────────────────────────────────────────────────────────────
const C = {
  bg:     '#161B22',
  card:   '#21262D',
  border: '#30363D',
  bg2:    '#0D1117',
  green:  '#00D09C',
  amber:  '#F0A500',
  red:    '#FF4757',
  p2p:    '#FF6B35',
  muted:  '#8B949E',
  text:   '#E6EDF3',
}

// ── Quick-pick amounts ────────────────────────────────────────────────────────
const QUICK = [1000, 5000, 10000, 25000, 50000]

// ── Math ──────────────────────────────────────────────────────────────────────
function fv(P, r, n) { return P * Math.pow(1 + r / 100, n) }
function fmt(n)       { return '€' + Math.round(n).toLocaleString('en') }
function fmtDiff(a, b) {
  const d = Math.round(b - a)
  return (d >= 0 ? '+€' : '−€') + Math.abs(d).toLocaleString('en')
}

function blendedRate(mix) {
  return (mix.p2p * RATES.p2p + mix.etf * RATES.etf + mix.bonds * RATES.bonds) / 100
}

function adjustMix(prev, key, newVal) {
  const clamped = Math.max(0, Math.min(100, Math.round(newVal)))
  const others  = ['p2p', 'etf', 'bonds'].filter(k => k !== key)
  const remaining  = 100 - clamped
  const otherTotal = prev[others[0]] + prev[others[1]]
  const next = { ...prev, [key]: clamped }
  if (otherTotal === 0) {
    next[others[0]] = Math.floor(remaining / 2)
    next[others[1]] = remaining - Math.floor(remaining / 2)
  } else {
    next[others[0]] = Math.round((prev[others[0]] / otherTotal) * remaining)
    next[others[1]] = remaining - next[others[0]]
  }
  return next
}

// ── Chart.js hook ─────────────────────────────────────────────────────────────
function useChart(ref, getConfig, deps) {
  useEffect(() => {
    if (!ref.current || !window.Chart) return
    const ctx = ref.current.getContext('2d')
    const chart = new window.Chart(ctx, getConfig())
    return () => chart.destroy()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function Progress({ page, total = 5 }) {
  return (
    <div className="flex gap-1.5 mb-5">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full transition-all duration-500"
          style={{ backgroundColor: i < page ? C.green : C.card }}
        />
      ))}
    </div>
  )
}

// ── Section label ─────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: C.green }}>
      {children}
    </p>
  )
}

// ── Headline ──────────────────────────────────────────────────────────────────
function Headline({ children }) {
  return (
    <h2
      className="text-2xl font-bold text-white leading-tight"
      style={{ fontFamily: 'DM Serif Display, serif' }}
    >
      {children}
    </h2>
  )
}

// ── Primary CTA button ────────────────────────────────────────────────────────
function PrimaryBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
      style={{ backgroundColor: C.green, color: '#0D1117' }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.green)}
    >
      {children}
    </button>
  )
}

// ── PAGE 1 — Input & Compare ──────────────────────────────────────────────────
function Page1({ amount, setAmount, years, setYears, onNext }) {
  const [raw, setRaw] = useState(String(amount))

  function handleRaw(e) {
    const v = e.target.value.replace(/[^0-9]/g, '')
    setRaw(v)
    const n = parseInt(v, 10)
    if (!isNaN(n) && n > 0) setAmount(n)
  }

  const bankFV   = fv(amount, RATES.bank,  years)
  const bondsFV  = fv(amount, 4.5,         years)
  const growthFV = fv(amount, 9.5,         years)

  const cards = [
    {
      id: 'bank',
      label: 'Your current situation',
      sub: `Bank deposit · ${RATES.bank}% p.a.`,
      value: bankFV,
      accent: C.muted,
      bg: 'rgba(139,148,158,0.06)',
      bdr: C.card,
      winner: false,
    },
    {
      id: 'bonds',
      label: 'Stash Bonds mix',
      sub: 'Low risk · 4.5% p.a.',
      value: bondsFV,
      accent: C.amber,
      bg: 'rgba(240,165,0,0.06)',
      bdr: 'rgba(240,165,0,0.25)',
      winner: false,
    },
    {
      id: 'growth',
      label: 'Stash Growth mix',
      sub: 'Higher return · 9.5% p.a.',
      value: growthFV,
      accent: C.green,
      bg: 'rgba(0,208,156,0.08)',
      bdr: C.green,
      winner: true,
    },
  ]

  return (
    <div>
      <div className="mb-5">
        <Label>Investment calculator</Label>
        <Headline>See what your money could become</Headline>
      </div>

      {/* Amount input */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2" style={{ color: C.muted }}>I want to invest</p>
        <div
          className="flex items-center px-4 py-3 rounded-xl border text-2xl font-bold"
          style={{ backgroundColor: C.bg2, borderColor: C.border }}
        >
          <span style={{ color: C.green }}>€</span>
          <input
            type="text"
            inputMode="numeric"
            value={raw}
            onChange={handleRaw}
            className="flex-1 bg-transparent outline-none text-white ml-1"
            placeholder="10,000"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-2.5">
          {QUICK.map(a => (
            <button
              key={a}
              onClick={() => { setAmount(a); setRaw(String(a)) }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
              style={{
                backgroundColor: amount === a ? 'rgba(0,208,156,0.12)' : 'transparent',
                borderColor:     amount === a ? C.green : C.border,
                color:           amount === a ? C.green : C.muted,
              }}
            >
              €{a.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Year slider */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium" style={{ color: C.muted }}>Time horizon</p>
          <span className="text-sm font-bold text-white">{years} year{years !== 1 ? 's' : ''}</span>
        </div>
        <input
          type="range" min={1} max={20} step={1} value={years}
          onChange={e => setYears(+e.target.value)}
          className="w-full"
          style={{ accentColor: C.green }}
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: C.muted }}>
          <span>1 yr</span><span>5 yrs</span><span>10 yrs</span><span>20 yrs</span>
        </div>
      </div>

      {/* Comparison cards */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {cards.map(c => (
          <div
            key={c.id}
            className="rounded-xl p-3 border relative"
            style={{ backgroundColor: c.bg, borderColor: c.bdr, borderWidth: c.winner ? '1.5px' : '1px' }}
          >
            {c.winner && (
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap"
                style={{ backgroundColor: C.green, color: '#0D1117' }}
              >
                Best ✓
              </div>
            )}
            <p className="text-xs leading-tight mb-1" style={{ color: C.muted }}>{c.label}</p>
            <p className="text-xs font-semibold mb-2" style={{ color: c.accent }}>{c.sub}</p>
            <p
              className="text-base font-bold leading-tight"
              style={{ color: c.winner ? c.accent : C.text, fontFamily: 'DM Serif Display, serif' }}
            >
              {fmt(c.value)}
            </p>
            {c.winner ? (
              <p className="text-xs mt-1" style={{ color: C.green }}>
                {fmtDiff(bankFV, growthFV)} vs bank
              </p>
            ) : (
              <p className="text-xs mt-1" style={{ color: C.muted }}>after {years} yr{years > 1 ? 's' : ''}</p>
            )}
          </div>
        ))}
      </div>

      <PrimaryBtn onClick={onNext}>
        Build my mix <ChevronRight size={16} />
      </PrimaryBtn>
    </div>
  )
}

// ── PAGE 2 — Mix Builder ──────────────────────────────────────────────────────
const MIX_ITEMS = [
  { key: 'p2p',   label: 'P2P Loans',           rate: RATES.p2p,   color: MIX_COLORS.p2p,   desc: 'Higher risk · higher reward' },
  { key: 'etf',   label: 'ETFs / Index funds',   rate: RATES.etf,   color: MIX_COLORS.etf,   desc: 'Medium risk · market returns' },
  { key: 'bonds', label: 'Bonds / Term deposits', rate: RATES.bonds, color: MIX_COLORS.bonds, desc: 'Lower risk · stable yield' },
]

function Page2({ amount, years, mix, setMix, onNext }) {
  const donutRef = useRef(null)
  const rate      = blendedRate(mix)
  const projected = fv(amount, rate, years)
  const bankFV    = fv(amount, RATES.bank, years)

  useChart(donutRef, () => ({
    type: 'doughnut',
    data: {
      labels: MIX_ITEMS.map(m => m.label),
      datasets: [{
        data: [mix.p2p, mix.etf, mix.bonds],
        backgroundColor: [MIX_COLORS.p2p, MIX_COLORS.etf, MIX_COLORS.bonds],
        borderWidth: 0,
        hoverOffset: 4,
      }],
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: C.card,
          borderColor: C.border,
          borderWidth: 1,
          titleColor: C.text,
          bodyColor: C.muted,
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` },
        },
      },
      animation: { duration: 350 },
    },
  }), [mix.p2p, mix.etf, mix.bonds])

  return (
    <div>
      <div className="mb-5">
        <Label>Step 2 of 4 — Mix builder</Label>
        <Headline>Customize your allocation</Headline>
        <p className="text-sm mt-1" style={{ color: C.muted }}>
          Drag to match your risk appetite. Sliders always total 100%.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        {MIX_ITEMS.map(({ key, label, rate: r, color, desc }) => (
          <div key={key}>
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs" style={{ color: C.muted }}>{desc}</p>
              </div>
              <div className="text-right ml-3 flex-shrink-0">
                <p className="text-lg font-bold leading-none" style={{ color, fontFamily: 'DM Serif Display, serif' }}>
                  {mix[key]}%
                </p>
                <p className="text-xs" style={{ color: C.muted }}>avg {r}%</p>
              </div>
            </div>
            <input
              type="range" min={0} max={100} step={5} value={mix[key]}
              onChange={e => setMix(prev => adjustMix(prev, key, +e.target.value))}
              className="w-full"
              style={{ accentColor: color }}
            />
          </div>
        ))}
      </div>

      {/* Blended rate + donut */}
      <div className="flex items-center gap-4 rounded-xl p-4 border mb-4" style={{ backgroundColor: C.bg2, borderColor: C.border }}>
        {/* Donut */}
        <div className="relative flex-shrink-0" style={{ width: 96, height: 96 }}>
          <canvas ref={donutRef} width={96} height={96} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs leading-none" style={{ color: C.muted }}>blend</p>
            <p className="text-base font-bold leading-tight" style={{ color: C.green, fontFamily: 'DM Serif Display, serif' }}>
              {rate.toFixed(1)}%
            </p>
          </div>
        </div>
        {/* Legend + projected */}
        <div className="flex-1">
          <div className="flex flex-col gap-1 mb-3">
            {MIX_ITEMS.map(({ key, label, color }) => (
              <div key={key} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
                  <span style={{ color: C.muted }}>{label.split(' ')[0]}</span>
                </div>
                <span className="font-semibold text-white">{mix[key]}%</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs" style={{ color: C.muted }}>After {years} yrs</p>
              <p className="text-xl font-bold" style={{ color: C.green, fontFamily: 'DM Serif Display, serif' }}>
                {fmt(projected)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: C.muted }}>vs bank</p>
              <p className="text-base font-bold" style={{ color: C.green }}>
                {fmtDiff(bankFV, projected)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <PrimaryBtn onClick={onNext}>
        See my projection <ChevronRight size={16} />
      </PrimaryBtn>
    </div>
  )
}

// ── PAGE 3 — Growth Projection Chart ─────────────────────────────────────────
function Page3({ amount, years, mix, onNext }) {
  const chartRef = useRef(null)
  const rate     = blendedRate(mix)

  const maxY  = Math.max(years, 5)
  const lbls  = Array.from({ length: maxY + 1 }, (_, i) => i === 0 ? 'Now' : `Yr ${i}`)
  const bankD = lbls.map((_, i) => Math.round(fv(amount, RATES.bank, i)))
  const stshD = lbls.map((_, i) => Math.round(fv(amount, rate, i)))

  useChart(chartRef, () => ({
    type: 'line',
    data: {
      labels: lbls,
      datasets: [
        {
          label: 'Stash',
          data: stshD,
          borderColor: C.green,
          backgroundColor: 'rgba(0,208,156,0.10)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: C.green,
          pointBorderWidth: 0,
        },
        {
          label: 'Bank',
          data: bankD,
          borderColor: C.muted,
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.3,
          pointRadius: 0,
          borderDash: [5, 4],
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          labels: { color: C.muted, font: { size: 11, family: 'Inter' }, boxWidth: 10, padding: 16 },
        },
        tooltip: {
          backgroundColor: C.card,
          borderColor: C.border,
          borderWidth: 1,
          titleColor: C.text,
          bodyColor: C.muted,
          padding: 10,
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${fmt(ctx.parsed.y)}` },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: C.muted, font: { size: 10 }, maxTicksLimit: 8 },
          border: { color: C.border },
        },
        y: {
          grid: { color: 'rgba(48,54,61,0.5)', drawBorder: false },
          ticks: {
            color: C.muted,
            font: { size: 10 },
            callback: v => '€' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v),
          },
          border: { display: false },
        },
      },
    },
  }), [amount, years, mix.p2p, mix.etf, mix.bonds])

  const finalBank = fv(amount, RATES.bank, years)
  const finalStsh = fv(amount, rate, years)

  return (
    <div>
      <div className="mb-4">
        <Label>Step 3 of 4 — Projection</Label>
        <Headline>Your growth, year by year</Headline>
      </div>

      <div
        className="rounded-xl border mb-4 overflow-hidden"
        style={{ backgroundColor: C.bg2, borderColor: C.card, height: 200 }}
      >
        <canvas ref={chartRef} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl p-4 border" style={{ backgroundColor: C.card, borderColor: C.border }}>
          <p className="text-xs mb-1" style={{ color: C.muted }}>Bank deposit</p>
          <p className="text-xl font-bold text-white" style={{ fontFamily: 'DM Serif Display, serif' }}>
            {fmt(finalBank)}
          </p>
          <p className="text-xs" style={{ color: C.muted }}>after {years} year{years > 1 ? 's' : ''}</p>
        </div>
        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: 'rgba(0,208,156,0.06)', borderColor: 'rgba(0,208,156,0.25)' }}
        >
          <p className="text-xs mb-1" style={{ color: C.green }}>Your Stash mix</p>
          <p className="text-xl font-bold" style={{ color: C.green, fontFamily: 'DM Serif Display, serif' }}>
            {fmt(finalStsh)}
          </p>
          <p className="text-xs font-semibold" style={{ color: C.green }}>
            {fmtDiff(finalBank, finalStsh)} more
          </p>
        </div>
      </div>

      <PrimaryBtn onClick={onNext}>
        Get my personalised plan <ChevronRight size={16} />
      </PrimaryBtn>
    </div>
  )
}

// ── PAGE 4 — Summary & Your Plan ─────────────────────────────────────────────
const STEPS = [
  { n: '01', title: 'Create your free Stash account', sub: '2 min · KYC online' },
  { n: '02', title: 'Complete your investor profile',  sub: 'Risk quiz · 3 min' },
  { n: '03', title: 'Browse matched products',          sub: 'From 12 broker partners' },
  { n: '04', title: 'Invest from €10',                  sub: 'Manual or auto-invest' },
]

const SPOTLIGHT = [
  { name: 'Mintos',   product: 'EU Loan Portfolio',  rate: '11%',  type: 'P2P' },
  { name: 'Paysera',  product: 'All-World ETF',       rate: '8.2%', type: 'ETF' },
  { name: 'Lande',    product: 'Real Estate Loans',   rate: '9%',   type: 'RE' },
]

function Page4({ amount, years, mix }) {
  const rate      = blendedRate(mix)
  const projected = fv(amount, rate, years)
  const bankFV    = fv(amount, RATES.bank, years)

  return (
    <div>
      <div className="mb-4">
        <Label>Step 4 of 4 — Your plan</Label>
        <Headline>Ready to start growing?</Headline>
      </div>

      {/* Summary box */}
      <div
        className="rounded-xl p-4 border mb-4"
        style={{ backgroundColor: 'rgba(0,208,156,0.05)', borderColor: 'rgba(0,208,156,0.2)' }}
      >
        <div className="grid grid-cols-3 gap-3 text-center mb-3">
          <div>
            <p className="text-xs" style={{ color: C.muted }}>Investing</p>
            <p className="text-lg font-bold text-white" style={{ fontFamily: 'DM Serif Display, serif' }}>
              {fmt(amount)}
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: C.muted }}>Blended rate</p>
            <p className="text-lg font-bold" style={{ color: C.green, fontFamily: 'DM Serif Display, serif' }}>
              {rate.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: C.muted }}>After {years} yrs</p>
            <p className="text-lg font-bold" style={{ color: C.green, fontFamily: 'DM Serif Display, serif' }}>
              {fmt(projected)}
            </p>
          </div>
        </div>
        <div className="pt-3 border-t text-center" style={{ borderColor: 'rgba(0,208,156,0.15)' }}>
          <p className="text-sm" style={{ color: C.green }}>
            That's <strong>{fmt(projected - bankFV)} more</strong> than a bank deposit
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3 mb-4">
        {STEPS.map(s => (
          <div key={s.n} className="flex items-start gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
              style={{ backgroundColor: 'rgba(0,208,156,0.12)', color: C.green }}
            >
              {s.n}
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">{s.title}</p>
              <p className="text-xs" style={{ color: C.muted }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Broker spotlight */}
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: C.muted }}>
          Products available for your profile
        </p>
        <div className="grid grid-cols-3 gap-2">
          {SPOTLIGHT.map(b => (
            <div
              key={b.name}
              className="rounded-lg p-3 border text-center"
              style={{ backgroundColor: C.card, borderColor: C.border }}
            >
              <p className="text-sm font-bold text-white">{b.name}</p>
              <p className="text-xs mt-0.5 leading-tight" style={{ color: C.muted }}>{b.product}</p>
              <p className="text-base font-bold mt-1" style={{ color: C.green, fontFamily: 'DM Serif Display, serif' }}>
                {b.rate}
              </p>
              <span
                className="text-xs px-1.5 py-0.5 rounded mt-1 inline-block"
                style={{ backgroundColor: '#30363D', color: C.muted }}
              >
                {b.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/onboarding"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all"
        style={{ backgroundColor: C.green, color: '#0D1117' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.green)}
      >
        Get my personalised plan <ArrowRight size={15} />
      </Link>
      <p className="text-xs text-center mt-2" style={{ color: C.muted }}>
        Free · EU regulated · Capital at risk
      </p>
    </div>
  )
}

// ── PAGE 5 — Learn ────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Is my money safe with Stash?',
    a: 'Stash is regulated under MiFID II. Your uninvested cash is ring-fenced. Investments are held by the respective broker partner — not Stash itself.',
  },
  {
    q: 'What does "capital at risk" mean?',
    a: 'Unlike bank deposits, investment returns are not guaranteed. P2P loans can default and ETF values can fall. We display risk ratings for every product to help you choose appropriately.',
  },
  {
    q: 'Can I withdraw at any time?',
    a: 'It depends on the product. ETFs and money market funds offer high liquidity. P2P loans and term deposits have fixed terms. Check each product\'s terms before investing.',
  },
  {
    q: 'How does Stash make money?',
    a: 'Brokers pay Stash a listing commission. You pay zero fees as an investor. Our interests are aligned — we only list products that pass our regulatory review.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b" style={{ borderColor: C.card }}>
      <button
        className="w-full flex items-center justify-between py-3 text-left gap-3"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-sm font-medium text-white">{q}</span>
        <span className="text-lg flex-shrink-0 font-bold" style={{ color: C.green }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p className="text-sm pb-3 leading-relaxed" style={{ color: C.muted }}>{a}</p>
      )}
    </div>
  )
}

function Page5() {
  return (
    <div>
      <div className="mb-5">
        <Label>Learn</Label>
        <Headline>How does Stash work?</Headline>
        <p className="text-sm mt-1.5" style={{ color: C.muted }}>
          Stash is a licensed EU investment marketplace. We connect you to regulated broker products — you pay zero fees.
        </p>
      </div>

      {/* Trust points */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { Icon: Shield,    label: 'MiFID II regulated',    color: C.green },
          { Icon: Percent,   label: 'Zero fees for investors', color: C.amber },
          { Icon: TrendingUp,label: '12+ broker partners',   color: MIX_COLORS.p2p },
        ].map(({ Icon, label, color }) => (
          <div
            key={label}
            className="rounded-xl p-3 border text-center"
            style={{ backgroundColor: C.card, borderColor: C.border }}
          >
            <Icon size={18} className="mx-auto mb-1.5" style={{ color }} />
            <p className="text-xs font-medium text-white leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="mb-5">
        {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
      </div>

      <Link
        to="/onboarding"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all"
        style={{ backgroundColor: C.green, color: '#0D1117' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.green)}
      >
        Start investing — it's free <ArrowUpRight size={15} />
      </Link>
      <p className="text-xs text-center mt-2" style={{ color: C.muted }}>
        EU regulated · Capital at risk · Min. €10
      </p>
    </div>
  )
}

// ── MAIN WIDGET ───────────────────────────────────────────────────────────────
export default function StashWidget({ compact = false }) {
  const [page, setPage] = useState(1)
  const [amount, setAmount] = useState(10000)
  const [years,  setYears]  = useState(5)
  const [mix,    setMix]    = useState({ p2p: 40, etf: 40, bonds: 20 })

  const goNext = () => setPage(p => Math.min(5, p + 1))
  const goPrev = () => setPage(p => Math.max(1, p - 1))

  return (
    <div
      className="rounded-2xl border relative overflow-hidden"
      style={{ backgroundColor: C.bg, borderColor: C.card, width: '100%', maxWidth: 620 }}
    >
      {/* Top nav */}
      <div
        className="flex items-center justify-between px-6 pt-5"
        style={{ borderBottom: `1px solid ${C.card}`, paddingBottom: '0.75rem' }}
      >
        {page > 1 ? (
          <button
            onClick={goPrev}
            className="flex items-center gap-1 text-xs font-medium transition-colors"
            style={{ color: C.muted }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >
            <ChevronLeft size={14} /> Back
          </button>
        ) : (
          <span className="text-xs font-bold" style={{ color: C.green }}>
            Stash Calculator
          </span>
        )}

        <div className="flex items-center gap-3">
          {page <= 3 && (
            <button
              onClick={() => setPage(5)}
              className="text-xs transition-colors"
              style={{ color: C.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >
              How it works?
            </button>
          )}
          <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: C.card, color: C.muted }}>
            {page} / 5
          </span>
        </div>
      </div>

      {/* Page content */}
      <div className="px-6 pb-6 pt-5">
        <Progress page={page} />
        {page === 1 && (
          <Page1
            amount={amount} setAmount={setAmount}
            years={years}   setYears={setYears}
            onNext={goNext}
          />
        )}
        {page === 2 && (
          <Page2
            amount={amount} years={years}
            mix={mix}       setMix={setMix}
            onNext={goNext}
          />
        )}
        {page === 3 && (
          <Page3
            amount={amount} years={years}
            mix={mix}       onNext={goNext}
          />
        )}
        {page === 4 && <Page4 amount={amount} years={years} mix={mix} />}
        {page === 5 && <Page5 />}
      </div>
    </div>
  )
}

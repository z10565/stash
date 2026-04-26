import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield, Zap, Euro, ArrowRight, Lock, CheckCircle2, TrendingUp,
  BarChart3, Users, Sparkles,
} from 'lucide-react'
import StashWidget from '../components/widget/StashWidget'
import BrokerCard from '../components/ui/BrokerCard'
import { BROKERS } from '../data/mockData'

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ target, prefix = '', suffix = '', decimals = 0, duration = 2000 }) {
  const [val, setVal] = useState(0)
  const ref     = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = (ts) => {
          const p = Math.min((ts - t0) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(+(ease * target).toFixed(decimals))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration, decimals])

  return <span ref={ref}>{prefix}{typeof val === 'number' && decimals > 0 ? val.toFixed(decimals) : val.toLocaleString()}{suffix}</span>
}

// ── Animated hero widget preview (decorative, cycles numbers) ─────────────────
function WidgetPreview() {
  const [idx, setIdx]         = useState(0)
  const [amount, setAmount]   = useState(10000)
  const [visible, setVisible] = useState(true)

  const scenarios = [
    { label: 'After 5 years at 9.5% (Stash Growth)', value: 16289, delta: '+€5,289' },
    { label: 'After 3 years at 7.2% (Stash Balanced)', value: 12354, delta: '+€2,354' },
    { label: 'After 10 years at 8% (Stash ETF mix)', value: 21589, delta: '+€11,589' },
  ]

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % scenarios.length)
        setVisible(true)
      }, 350)
    }, 3200)
    return () => clearInterval(t)
  }, [])

  const s = scenarios[idx]

  return (
    <div
      className="rounded-2xl border relative overflow-hidden select-none"
      style={{
        backgroundColor: '#161B22',
        borderColor: '#21262D',
        width: 320,
        boxShadow: '0 0 60px rgba(0,208,156,0.18), 0 0 120px rgba(0,208,156,0.06)',
      }}
    >
      {/* Mini top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#21262D' }}>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF4757' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#F0A500' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#00D09C' }} />
        </div>
        <span className="text-xs font-semibold ml-1" style={{ color: '#00D09C' }}>Stash Calculator</span>
      </div>

      <div className="p-5">
        {/* Amount */}
        <p className="text-xs mb-1" style={{ color: '#8B949E' }}>Investing</p>
        <p className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>
          €10,000
        </p>

        {/* Scenario */}
        <div
          className="rounded-xl p-4 border transition-opacity duration-300"
          style={{
            backgroundColor: 'rgba(0,208,156,0.07)',
            borderColor: 'rgba(0,208,156,0.25)',
            opacity: visible ? 1 : 0,
          }}
        >
          <p className="text-xs mb-2 leading-snug" style={{ color: '#8B949E' }}>{s.label}</p>
          <p className="text-3xl font-bold" style={{ color: '#00D09C', fontFamily: 'DM Serif Display, serif' }}>
            €{s.value.toLocaleString()}
          </p>
          <p className="text-sm font-semibold mt-1" style={{ color: '#00D09C' }}>{s.delta} vs bank</p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {scenarios.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 16 : 6, height: 6,
                backgroundColor: i === idx ? '#00D09C' : '#21262D',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── How it works step ─────────────────────────────────────────────────────────
function Step({ num, title, desc }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
        style={{ backgroundColor: 'rgba(0,208,156,0.1)', color: '#00D09C', border: '1px solid rgba(0,208,156,0.2)' }}
      >
        {num}
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: '#8B949E' }}>{desc}</p>
    </div>
  )
}

// ── Landing page ──────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div style={{ backgroundColor: '#0D1117' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 900, height: 600,
            background: 'radial-gradient(ellipse at top center, rgba(0,208,156,0.07) 0%, transparent 65%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left copy */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-8"
                style={{ borderColor: 'rgba(0,208,156,0.3)', backgroundColor: 'rgba(0,208,156,0.08)', color: '#00D09C' }}
              >
                <Shield size={12} />
                EU-regulated investment marketplace
              </div>

              {/* Headline */}
              <h1
                className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: 'DM Serif Display, serif' }}
              >
                One account.<br />
                Every broker.<br />
                <span style={{ color: '#00D09C' }}>Zero fees.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-lg" style={{ color: '#8B949E' }}>
                Stash connects you to{' '}
                <strong className="text-white">12+ licensed EU brokers</strong> —
                ETFs, bonds, P2P loans, and more.
                Start with <strong className="text-white">€10</strong>.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/onboarding"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all pulse-green"
                  style={{ backgroundColor: '#00D09C', color: '#0D1117' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00D09C')}
                >
                  Start investing
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium text-base border transition-all"
                  style={{ borderColor: '#21262D', color: '#8B949E', backgroundColor: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#30363D'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#21262D'; e.currentTarget.style.color = '#8B949E' }}
                >
                  See how it works
                </Link>
              </div>

              {/* Powered by AI strip */}
              <div className="flex flex-wrap gap-2 mt-5 justify-center lg:justify-start">
                {[
                  { label: 'Compound visualiser', to: null },
                  { label: 'Mia learning guide',  to: '/learn' },
                  { label: 'Ribbit market AI',    to: '/ribbit' },
                ].map(({ label, to }) => {
                  const Tag = to ? Link : 'span'
                  return (
                    <Tag
                      key={label}
                      {...(to ? { to } : {})}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                      style={{ borderColor: '#21262D', color: '#8B949E', backgroundColor: '#161B22' }}
                      onMouseEnter={to ? e => { e.currentTarget.style.borderColor = '#00D09C'; e.currentTarget.style.color = '#00D09C' } : undefined}
                      onMouseLeave={to ? e => { e.currentTarget.style.borderColor = '#21262D'; e.currentTarget.style.color = '#8B949E' } : undefined}
                    >
                      {label}
                    </Tag>
                  )
                })}
              </div>
            </div>

            {/* Right: floating widget preview */}
            <div className="flex-shrink-0 flex justify-center" style={{ transform: 'rotate(1.5deg)' }}>
              <WidgetPreview />
            </div>

          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────────── */}
      <div className="border-y" style={{ borderColor: '#21262D', backgroundColor: '#161B22' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: Shield,     label: 'Regulated by FKTK (Latvia)' },
              { value: '€42M',   label: 'invested on platform' },
              { value: '12',     label: 'broker partners' },
              { value: '60,000+',label: 'investors' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                {i > 0 && <div className="hidden sm:block w-px h-5" style={{ backgroundColor: '#21262D' }} />}
                {item.icon ? (
                  <>
                    <item.icon size={15} color="#00D09C" />
                    <span className="text-sm font-medium" style={{ color: '#C9D1D9' }}>{item.label}</span>
                  </>
                ) : (
                  <>
                    <span className="text-base font-bold" style={{ color: '#00D09C' }}>{item.value}</span>
                    <span className="text-sm" style={{ color: '#8B949E' }}>{item.label}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'DM Serif Display, serif' }}
          >
            How it works
          </h2>
          <p className="text-lg" style={{ color: '#8B949E' }}>
            KYC in 5 minutes. Invest in products from 12 regulated brokers. Pay nothing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {[
            {
              num: '1',
              title: 'Create your account',
              desc: 'KYC in 5 minutes, fully online. Answer 3 questions about your goals and risk appetite to get your investor profile.',
            },
            {
              num: '2',
              title: 'Browse broker products',
              desc: 'Products from 12+ licensed EU brokers, filtered to your risk profile. ETFs, P2P loans, bonds, real estate, and more.',
            },
            {
              num: '3',
              title: 'Invest from €10',
              desc: 'One-tap investing with auto-invest or manual control. Track all your products in a single Stash dashboard.',
            },
          ].map((s, i) => (
            <div key={s.num} className="relative">
              <Step {...s} />
              {i < 2 && (
                <div
                  className="hidden md:block absolute top-6 -right-5 z-10"
                  style={{ color: '#21262D' }}
                >
                  <ArrowRight size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── BROKER MARKETPLACE PREVIEW ────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: '#21262D', backgroundColor: '#161B22' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: '#00D09C' }}
              >
                Partner brokers
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white"
                style={{ fontFamily: 'DM Serif Display, serif' }}
              >
                12 regulated broker partners
              </h2>
            </div>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: '#00D09C' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#26E5B0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#00D09C')}
            >
              View all products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BROKERS.map(b => <BrokerCard key={b.id} broker={b} />)}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR WIDGET SECTION ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#00D09C' }}
          >
            Interactive calculator
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'DM Serif Display, serif' }}
          >
            See what your money could become
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#8B949E' }}>
            Customize your mix of P2P, ETFs, and bonds and see a real projection.
          </p>
        </div>

        <div className="flex justify-center">
          <StashWidget />
        </div>
      </section>

      {/* ── WHY STASH ─────────────────────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: '#21262D', backgroundColor: '#161B22' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              Why Stash?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Euro,
                title: 'No fees for investors',
                desc: 'Brokers pay Stash a listing commission. You invest and grow — you never pay. Our interests are aligned with yours.',
                stat: '0%',
                statLabel: 'investor fees',
              },
              {
                icon: Shield,
                title: 'MiFID II regulated products only',
                desc: 'Every product listed on Stash comes from a broker regulated under EU financial law. We vet every partner before listing.',
                stat: 'EU',
                statLabel: 'regulated',
              },
              {
                icon: Sparkles,
                title: 'Auto-invest across multiple brokers',
                desc: 'Set your criteria once. Stash auto-invests across your chosen brokers automatically — no manual rebalancing needed.',
                stat: '12+',
                statLabel: 'brokers',
              },
            ].map(({ icon: Icon, title, desc, stat, statLabel }) => (
              <div
                key={title}
                className="rounded-2xl border p-7 flex flex-col gap-4 transition-all duration-200"
                style={{ backgroundColor: '#0D1117', borderColor: '#21262D' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#30363D'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#21262D'}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0,208,156,0.1)' }}
                >
                  <Icon size={22} color="#00D09C" />
                </div>
                <h3 className="text-white font-bold text-lg">{title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#8B949E' }}>{desc}</p>
                <div className="pt-3 border-t" style={{ borderColor: '#21262D' }}>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: '#00D09C', fontFamily: 'DM Serif Display, serif' }}
                  >
                    {stat}
                  </span>
                  <span className="text-sm ml-2" style={{ color: '#8B949E' }}>{statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: 42,      suffix: 'M',  prefix: '€', label: 'Invested on platform', dur: 1800 },
            { value: 12,      suffix: '+',  prefix: '',  label: 'Licensed broker partners', dur: 1200 },
            { value: 60000,   suffix: '+',  prefix: '',  label: 'Active investors', dur: 2000 },
            { value: 10,      suffix: '',   prefix: '€', label: 'Minimum investment', dur: 800 },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border p-6 text-center"
              style={{ backgroundColor: '#161B22', borderColor: '#21262D' }}
            >
              <p
                className="text-4xl font-bold mb-2"
                style={{ color: '#00D09C', fontFamily: 'DM Serif Display, serif' }}
              >
                <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} duration={s.dur} />
              </p>
              <p className="text-sm" style={{ color: '#8B949E' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section
        className="border-t"
        style={{ borderColor: '#21262D', backgroundColor: '#161B22' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div
            className="rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{ backgroundColor: '#0D1117', border: '1px solid #21262D' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center top, rgba(0,208,156,0.07) 0%, transparent 60%)' }}
            />
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4 relative"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              Ready to grow your savings?
            </h2>
            <p className="text-lg mb-8 relative" style={{ color: '#8B949E' }}>
              Join 60,000+ EU investors. 5 minutes to set up. Zero fees. Cancel anytime.
            </p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all relative"
              style={{ backgroundColor: '#00D09C', color: '#0D1117' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00D09C')}
            >
              Get started — it's free
              <ArrowRight size={20} />
            </Link>
            <p className="text-xs mt-4 relative" style={{ color: '#8B949E' }}>
              EU regulated · MiFID II · Capital at risk
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

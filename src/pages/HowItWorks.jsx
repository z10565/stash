import { Link } from 'react-router-dom'
import {
  UserCheck, LayoutDashboard, Wallet, TrendingUp,
  Shield, Euro, Lock, ArrowRight, CheckCircle2, Info,
} from 'lucide-react'

// ── SVG flow diagram ──────────────────────────────────────────────────────────
function FlowDiagram() {
  const brokers = ['Mintos', 'Paysera', 'Robocash', 'Lande', 'Inbank']

  return (
    <div className="overflow-x-auto py-4">
      <svg
        viewBox="0 0 760 220"
        className="w-full max-w-3xl mx-auto"
        style={{ minWidth: 560 }}
      >
        {/* ── Investor box ── */}
        <g>
          <rect x={10} y={80} width={140} height={60} rx={12}
            fill="#161B22" stroke="#21262D" strokeWidth={1.5} />
          <text x={80} y={106} textAnchor="middle" fill="#E6EDF3" fontSize={12} fontWeight={600} fontFamily="Inter, sans-serif">
            Investor
          </text>
          <text x={80} y={124} textAnchor="middle" fill="#8B949E" fontSize={10} fontFamily="Inter, sans-serif">
            (you)
          </text>
        </g>

        {/* ── Arrow: Investor → Stash ── */}
        <g>
          <line x1={150} y1={110} x2={285} y2={110} stroke="#30363D" strokeWidth={1.5} />
          <polygon points="285,105 295,110 285,115" fill="#30363D" />
          <text x={218} y={103} textAnchor="middle" fill="#8B949E" fontSize={9} fontFamily="Inter, sans-serif">
            deposit / invest
          </text>
        </g>

        {/* ── Stash platform box ── */}
        <g>
          <rect x={295} y={68} width={170} height={84} rx={12}
            fill="rgba(0,208,156,0.08)" stroke="#00D09C" strokeWidth={1.5} />
          <text x={380} y={94} textAnchor="middle" fill="#00D09C" fontSize={11} fontWeight={700} fontFamily="DM Serif Display, serif">
            Stash Platform
          </text>
          <text x={380} y={112} textAnchor="middle" fill="#8B949E" fontSize={9} fontFamily="Inter, sans-serif">
            MiFID II regulated
          </text>
          <text x={380} y={126} textAnchor="middle" fill="#8B949E" fontSize={9} fontFamily="Inter, sans-serif">
            Zero investor fees
          </text>
          <text x={380} y={140} textAnchor="middle" fill="#8B949E" fontSize={9} fontFamily="Inter, sans-serif">
            12+ broker partners
          </text>
        </g>

        {/* ── Arrows: Stash → Brokers ── */}
        {brokers.map((b, i) => {
          const total = brokers.length
          const yStep = 180 / (total - 1)
          const by    = 20 + i * yStep
          return (
            <g key={b}>
              {/* Line from Stash to broker */}
              <line
                x1={465} y1={110}
                x2={570} y2={by + 20}
                stroke="#30363D" strokeWidth={1.5}
                strokeDasharray="4 3"
              />
              {/* Broker box */}
              <rect x={570} y={by} width={110} height={40} rx={8}
                fill="#21262D" stroke="#30363D" strokeWidth={1} />
              <text x={625} y={by + 15} textAnchor="middle" fill="#E6EDF3" fontSize={10} fontWeight={600} fontFamily="Inter, sans-serif">
                {b}
              </text>
              <text x={625} y={by + 28} textAnchor="middle" fill="#8B949E" fontSize={8.5} fontFamily="Inter, sans-serif">
                regulated broker
              </text>
            </g>
          )
        })}

        {/* ── Returns arrow back (curved) ── */}
        <g>
          <path
            d={`M 680 110 Q 750 110 750 60 Q 750 10 690 10 L 80 10 Q 20 10 20 60 L 20 80`}
            fill="none" stroke="#00D09C" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.5}
          />
          <polygon points="15,78 20,90 25,78" fill="#00D09C" opacity={0.5} />
          <text x={415} y={7} textAnchor="middle" fill="#00D09C" fontSize={9} fontFamily="Inter, sans-serif">
            returns flow back to your Stash account
          </text>
        </g>
      </svg>
    </div>
  )
}

// ── Numbered step card ────────────────────────────────────────────────────────
function StepCard({ num, icon: Icon, title, body, highlight }) {
  return (
    <div
      className="rounded-2xl border p-7 flex flex-col gap-4 transition-all duration-200"
      style={{
        backgroundColor: highlight ? 'rgba(0,208,156,0.04)' : '#161B22',
        borderColor: highlight ? 'rgba(0,208,156,0.3)' : '#21262D',
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-base font-bold"
          style={{ backgroundColor: 'rgba(0,208,156,0.12)', color: '#00D09C' }}
        >
          {num}
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#21262D' }}
        >
          <Icon size={18} color="#00D09C" />
        </div>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: '#8B949E' }}>{body}</p>
      </div>
    </div>
  )
}

// ── Trust point ───────────────────────────────────────────────────────────────
function TrustPoint({ icon: Icon, title, body }) {
  return (
    <div className="flex gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'rgba(0,208,156,0.1)' }}
      >
        <Icon size={18} color="#00D09C" />
      </div>
      <div>
        <p className="text-white font-semibold mb-1">{title}</p>
        <p className="text-sm leading-relaxed" style={{ color: '#8B949E' }}>{body}</p>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function HowItWorks() {
  return (
    <div style={{ backgroundColor: '#0D1117', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#00D09C' }}>
          How Stash works
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-6"
          style={{ fontFamily: 'DM Serif Display, serif' }}
        >
          A marketplace, not a broker
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#8B949E' }}>
          Stash vets and lists regulated EU brokers. You invest through your unified Stash account.
          Brokers pay us a commission — you pay <strong className="text-white">nothing</strong>.
        </p>
      </section>

      {/* ── FLOW DIAGRAM ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-2xl border p-8" style={{ backgroundColor: '#161B22', borderColor: '#21262D' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-center" style={{ color: '#8B949E' }}>
            How your money flows
          </p>
          <FlowDiagram />
          <div
            className="mt-6 rounded-xl p-4 border flex items-start gap-3"
            style={{ backgroundColor: 'rgba(0,208,156,0.05)', borderColor: 'rgba(0,208,156,0.2)' }}
          >
            <Info size={15} color="#00D09C" className="flex-shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed" style={{ color: '#8B949E' }}>
              <strong className="text-white">Important:</strong> Your money is held by the broker partner,
              not by Stash. Stash is the marketplace and your single interface — all products
              come from independently licensed and regulated broker partners.
            </p>
          </div>
        </div>
      </section>

      {/* ── STEP-BY-STEP ── */}
      <section className="border-t" style={{ borderColor: '#21262D', backgroundColor: '#161B22' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              Four simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StepCard
              num="01" icon={UserCheck}
              title="Create your Stash account"
              body="Register online in 2 minutes. Complete KYC (identity verification) fully digitally — no branch visits, no paper. Once verified, your account is active."
            />
            <StepCard
              num="02" icon={LayoutDashboard}
              title="Complete your investor profile"
              body="Answer 3 quick questions about your goals, time horizon, and risk appetite. We use this to surface products that match you — and to ensure MiFID II suitability."
            />
            <StepCard
              num="03" icon={TrendingUp}
              title="Browse matched broker products"
              body="Your dashboard shows products from 12+ regulated brokers, filtered to your profile. ETFs, P2P loans, real estate, bonds, and term deposits — all in one place."
              highlight
            />
            <StepCard
              num="04" icon={Wallet}
              title="Invest from €10 — manual or auto"
              body="One-tap investing from €10. Set up auto-invest rules once and let Stash handle rebalancing. Track all your broker positions in your unified Stash portfolio."
              highlight
            />
          </div>
        </div>
      </section>

      {/* ── TRUST & REGULATION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: trust points */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#00D09C' }}>
              Regulation & protection
            </p>
            <h2
              className="text-3xl font-bold text-white mb-8"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              How your money is protected
            </h2>
            <div className="flex flex-col gap-7">
              <TrustPoint
                icon={Shield}
                title="Stash is MiFID II regulated"
                body="Stash UAB is authorised and regulated as an investment firm under MiFID II. We are subject to EU financial regulation, capital requirements, and investor protection rules."
              />
              <TrustPoint
                icon={Lock}
                title="Your money stays with the broker"
                body="Uninvested funds are ring-fenced in segregated client accounts. Money invested in products is held by the respective broker — Stash never comingles client funds."
              />
              <TrustPoint
                icon={CheckCircle2}
                title="EU Investor Compensation Scheme"
                body="Eligible investors are covered by the EU Investor Compensation Scheme (ICS) for up to €20,000 per person. Some term deposits additionally have DGS coverage up to €100,000."
              />
              <TrustPoint
                icon={Euro}
                title="Brokers pay us — you pay nothing"
                body="Stash earns a listing commission from broker partners. Investors pay zero platform fees. There are no entry, exit, or management fees charged to you by Stash."
              />
            </div>
          </div>

          {/* Right: regulation box */}
          <div className="rounded-2xl border p-8" style={{ backgroundColor: '#161B22', borderColor: '#21262D' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#8B949E' }}>
              Regulatory credentials
            </p>
            <div className="flex flex-col gap-5">
              {[
                { label: 'Regulated by', value: 'FKTK Latvia (Financial and Capital Market Commission)', color: '#00D09C' },
                { label: 'Licence type', value: 'Investment firm — MiFID II', color: '#00D09C' },
                { label: 'Investor protection', value: 'EU ICS — up to €20,000', color: '#F0A500' },
                { label: 'Client money', value: 'Segregated · ring-fenced', color: '#00D09C' },
                { label: 'Broker vetting', value: 'All partners independently licensed', color: '#00D09C' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-start justify-between gap-6 pb-5 border-b last:border-0 last:pb-0" style={{ borderColor: '#21262D' }}>
                  <p className="text-sm" style={{ color: '#8B949E' }}>{label}</p>
                  <p className="text-sm font-semibold text-right" style={{ color }}>{value}</p>
                </div>
              ))}
            </div>

            <div
              className="mt-6 rounded-xl p-4 border"
              style={{ backgroundColor: 'rgba(0,208,156,0.06)', borderColor: 'rgba(0,208,156,0.2)' }}
            >
              <p className="text-xs leading-relaxed" style={{ color: '#8B949E' }}>
                <strong className="text-white">Capital at risk.</strong>{' '}
                Investments are not guaranteed. The value of your investments can fall as well as rise.
                Past performance is not a reliable indicator of future results. Please read our Key
                Information Documents (KIDs) before investing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t" style={{ borderColor: '#21262D', backgroundColor: '#161B22' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2
            className="text-3xl font-bold text-white text-center mb-12"
            style={{ fontFamily: 'DM Serif Display, serif' }}
          >
            Common questions
          </h2>
          <div className="flex flex-col gap-0">
            {[
              {
                q: 'Does Stash actually hold my investments?',
                a: 'No. Stash is the marketplace and your unified interface. When you invest in a product, your money is actually held by the respective broker partner (e.g. Mintos, Paysera, Inbank). Stash provides the account management layer on top.',
              },
              {
                q: 'What happens if a broker partner goes bust?',
                a: 'Your investments are ring-fenced at the broker level and are not Stash\'s assets. For P2P products, individual loan defaults may cause losses — that\'s what buyback guarantees and risk ratings are for. Term deposits at Inbank are covered up to €100,000 under the EU Deposit Guarantee Scheme.',
              },
              {
                q: 'Can I invest in products from multiple brokers?',
                a: 'Yes — that\'s the whole point. Your single Stash account lets you invest across multiple broker partners simultaneously. You can split your portfolio across P2P, ETFs, and bonds from different regulated brokers.',
              },
              {
                q: 'Why does Stash list some brokers and not others?',
                a: 'We apply our own regulatory and operational due diligence on top of a broker\'s existing licence. We look at track record, loan book quality, capital adequacy, and product transparency. Not every licensed broker makes the cut.',
              },
              {
                q: 'Are there any fees?',
                a: 'Stash charges investors nothing. Brokers pay Stash a listing commission. Some broker products may have underlying fees (e.g. ETF TER), which are always disclosed in the product\'s KID.',
              },
            ].map(({ q, a }, i) => (
              <details key={q} className="group border-b" style={{ borderColor: '#21262D' }}>
                <summary
                  className="flex items-center justify-between py-5 cursor-pointer list-none gap-4"
                >
                  <span className="font-semibold text-white">{q}</span>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold group-open:rotate-45 transition-transform"
                    style={{ backgroundColor: '#21262D', color: '#00D09C' }}
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed" style={{ color: '#8B949E' }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div
          className="rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{ backgroundColor: '#161B22', border: '1px solid #21262D' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center top, rgba(0,208,156,0.07) 0%, transparent 60%)' }}
          />
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4 relative"
            style={{ fontFamily: 'DM Serif Display, serif' }}
          >
            Ready to get started?
          </h2>
          <p className="text-lg mb-8 relative" style={{ color: '#8B949E' }}>
            Create your free account in 5 minutes. Browse products from 12 regulated brokers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            <Link
              to="/onboarding"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-base transition-all"
              style={{ backgroundColor: '#00D09C', color: '#0D1117' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00D09C')}
            >
              Create free account <ArrowRight size={18} />
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-base border transition-all"
              style={{ borderColor: '#21262D', color: '#8B949E' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#30363D'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#21262D'; e.currentTarget.style.color = '#8B949E' }}
            >
              Browse marketplace
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

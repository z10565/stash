import { Link } from 'react-router-dom'
import { UserPlus, TrendingUp, ChevronRight } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    Icon: UserPlus,
    title: 'Open your Stash account',
    desc: 'Sign up for free in under 3 minutes. No minimum deposit required.',
    cta: null,
  },
  {
    num: '02',
    Icon: TrendingUp,
    title: 'Invest your first €500',
    desc: 'Choose from our curated broker products. Silver tier unlocks automatically.',
    cta: null,
  },
  {
    num: '03',
    Icon: ChevronRight,
    title: 'Keep growing',
    desc: 'Reach €5,000 for Gold and €25,000 for Platinum. Perks update in real time.',
    cta: null,
  },
]

export default function HowToUnlock() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>
          How to unlock
        </h2>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Three steps to your first Stash Pass.
        </p>
      </div>

      <div className="relative">
        {/* Connector line (desktop) */}
        <div
          className="hidden sm:block absolute top-10 left-[16.66%] right-[16.66%] h-px"
          style={{ backgroundColor: '#1F2937' }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
          {STEPS.map(({ num, Icon, title, desc }, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4">
              {/* Step circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center border-2 relative"
                style={{ backgroundColor: '#111827', borderColor: '#00C896' }}
              >
                <Icon size={28} color="#00C896" />
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center"
                  style={{ backgroundColor: '#00C896', color: '#0A0E1A' }}
                >
                  {i + 1}
                </span>
              </div>

              <div>
                <p className="font-bold text-white mb-1">{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to="/onboarding"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{ backgroundColor: '#00C896', color: '#0A0E1A' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00C896')}
        >
          Get started — it's free <ChevronRight size={15} />
        </Link>
      </div>
    </section>
  )
}

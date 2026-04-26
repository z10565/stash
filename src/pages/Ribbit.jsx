import RibbitAvatar from '../components/ai/RibbitAvatar'
import SignalCard from '../components/ai/SignalCard'
import ChatInterface from '../components/ai/ChatInterface'

const RIBBIT_SYSTEM = `You are Ribbit, an AI market analyst assistant for Stash — an EU investment platform. You monitor financial news, market trends, and economic indicators to help first-time investors understand what is happening in markets and what it means for them. You speak in simple, calm, reassuring language. You never predict exact prices or guarantee returns. You explain market events in plain terms a non-expert would understand. You always remind users that past performance does not guarantee future results. Keep responses to 3-5 sentences. End with a practical takeaway the user can act on.`

const RIBBIT_GREETING = `I'm keeping an eye on markets so you don't have to. Ask me what's happening, or tap one of the signal cards to dive deeper into any asset class.`

const RIBBIT_STARTERS = [
  'Should I invest right now?',
  "What's happening in markets this week?",
  'Is it a good time to buy ETFs?',
  'Why did my portfolio drop?',
]

const MOCK_SIGNALS = [
  {
    asset:      'Global Index ETF',
    signal:     'HOLD',
    verdict:    'Markets are experiencing short-term volatility. Historical patterns suggest recovery within 2-3 months. Hold your position.',
    confidence: 74,
    sources:    ['Market data', 'Historical patterns'],
  },
  {
    asset:      'EU P2P Loans',
    signal:     'BUY',
    verdict:    'Interest rates on P2P platforms remain elevated. Good entry point for new positions with a 12-month horizon.',
    confidence: 81,
    sources:    ['Platform data', 'Rate trends'],
  },
  {
    asset:      'Government Bonds',
    signal:     'BUY',
    verdict:    'ECB rate signals suggest bond yields will remain attractive for the next quarter. Consider increasing allocation.',
    confidence: 68,
    sources:    ['ECB news', 'Rate forecasts'],
  },
  {
    asset:      'Cash / Deposit',
    signal:     'CAUTION',
    verdict:    'Inflation at 3.2% is eroding real returns on deposits. Every month of delay costs you purchasing power.',
    confidence: 92,
    sources:    ['Inflation data', 'ECB reports'],
  },
]

const HOW_IT_WORKS = [
  { title: 'Reads financial news',  desc: 'Scans hundreds of sources daily to track market-moving events.' },
  { title: 'Analyses patterns',     desc: 'Compares current conditions to historical data and economic cycles.' },
  { title: 'Plain English alerts',  desc: 'Translates complex signals into clear, actionable guidance.' },
]

export default function Ribbit() {
  return (
    <div style={{ backgroundColor: '#0A0E1A', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 text-center sm:text-left">
          <RibbitAvatar size={72} showLabel={false} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#00C896' }}>
              AI Market Analyser
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-white mb-2"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              Ribbit Market AI
            </h1>
            <p className="text-base" style={{ color: '#6B7280' }}>
              Real-time signals and plain-English market analysis for EU investors.
            </p>
            <p className="text-xs mt-1 font-semibold" style={{ color: '#00C896' }}>
              Ribbit · Market AI
            </p>
          </div>
        </div>

        {/* ── Signal cards ── */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#374151' }}>
            Current signals
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_SIGNALS.map(sig => (
              <SignalCard key={sig.asset} signal={sig} />
            ))}
          </div>
        </div>

        {/* ── Chat ── */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#374151' }}>
            Ask Ribbit
          </p>
          <ChatInterface
            systemPrompt={RIBBIT_SYSTEM}
            AvatarComponent={RibbitAvatar}
            starterPrompts={RIBBIT_STARTERS}
            placeholder="Ask Ribbit about markets…"
            assistantName="Ribbit"
            initialMessage={RIBBIT_GREETING}
          />
        </div>

        {/* ── How Ribbit works ── */}
        <div style={{ borderTop: '1px solid #1F2937' }} className="pt-8">
          <p className="text-xs font-medium uppercase tracking-widest mb-5 text-center" style={{ color: '#374151' }}>
            How Ribbit works
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map(({ title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border p-5 text-center"
                style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
              >
                <p className="font-bold text-white text-sm mb-2">{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <p className="text-xs text-center mt-6" style={{ color: '#374151' }}>
          Ribbit signals are for educational purposes only. Past performance does not guarantee future results. Capital at risk.
        </p>

      </div>
    </div>
  )
}

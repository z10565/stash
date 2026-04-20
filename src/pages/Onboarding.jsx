import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp, Shield, ChevronLeft, ChevronRight,
  Check, Zap, Clock, Target, AlertCircle, Smile,
  DollarSign, Home, Briefcase, Plane
} from 'lucide-react'
import StepIndicator from '../components/ui/StepIndicator'
import SparklineChart from '../components/charts/SparklineChart'
import { products, formatCurrency } from '../data/mockData'

// ── Bank logos ────────────────────────────────────────────────────────────────
const BANKS = [
  { id: 'seb',       name: 'SEB',       color: '#007AC1' },
  { id: 'swedbank',  name: 'Swedbank',  color: '#FF6600' },
  { id: 'citadele',  name: 'Citadele',  color: '#00529B' },
  { id: 'luminor',   name: 'Luminor',   color: '#E31837' },
]

// ── Quiz questions ────────────────────────────────────────────────────────────
const Q1_OPTIONS = [
  { id: 'under1',  label: 'Less than 1 year', icon: Zap, sub: 'Emergency fund or short goal' },
  { id: '1to3',    label: '1 – 3 years',       icon: Clock, sub: 'Medium-term saving' },
  { id: '3to7',    label: '3 – 7 years',       icon: Target, sub: 'Building wealth' },
  { id: 'over7',   label: '7+ years',           icon: TrendingUp, sub: 'Long-term investment' },
]
const Q2_OPTIONS = [
  { id: 'panic',    label: "I'd move everything to cash",  icon: AlertCircle, sub: 'Preserve at all costs' },
  { id: 'worried',  label: "I'd be worried but hold",       icon: Smile,       sub: 'Cautious investor' },
  { id: 'steady',   label: "I'd stay calm",                 icon: Shield,      sub: 'Steady builder' },
  { id: 'buymore',  label: "I'd invest more!",              icon: TrendingUp,  sub: 'Risk-tolerant' },
]
const Q3_OPTIONS = [
  { id: 'grow',     label: 'Grow my wealth',   icon: TrendingUp, sub: 'Maximise long-term returns' },
  { id: 'inflation',label: 'Beat inflation',   icon: DollarSign, sub: 'Keep purchasing power' },
  { id: 'house',    label: 'Save for a home',  icon: Home,       sub: 'Specific life goal' },
  { id: 'retire',   label: 'Retire early',     icon: Briefcase,  sub: 'Financial independence' },
  { id: 'travel',   label: 'Travel / lifestyle', icon: Plane,    sub: 'Experiences and freedom' },
]

function profileFromAnswers(a1, a2, a3) {
  if (a2 === 'buymore' || a2 === 'steady') return { type: 'Steady Builder', horizon: '3–5 years', risk: 'Moderate', returnType: 'Balanced growth' }
  if (a2 === 'worried') return { type: 'Safe Saver', horizon: '1–3 years', risk: 'Low', returnType: 'Capital preservation' }
  return { type: 'Cautious Planner', horizon: '1–2 years', risk: 'Very low', returnType: 'Stability first' }
}

// ── Amount input helper ───────────────────────────────────────────────────────
function formatEuro(n) { return '€' + Number(n || 0).toLocaleString('en-EU') }

const AMOUNT_PILLS = [10, 50, 100, 500]

// ── Shared card container ─────────────────────────────────────────────────────
function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 ${className}`}
      style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
    >
      {children}
    </div>
  )
}

// ── Step 1: Connect bank ──────────────────────────────────────────────────────
function StepBank({ selected, setSelected }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Connect your bank</h2>
        <p style={{ color: '#9CA3AF' }}>Securely connected via PSD2 open banking. Read-only access.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {BANKS.map(b => (
          <button
            key={b.id}
            onClick={() => setSelected(b.id)}
            className="rounded-xl border p-5 flex flex-col items-center gap-3 transition-all"
            style={{
              backgroundColor: selected === b.id ? 'rgba(0,200,150,0.08)' : '#0A0E1A',
              borderColor: selected === b.id ? '#00C896' : '#1F2937',
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: b.color }}
            >
              {b.name[0]}
            </div>
            <span className="text-sm font-medium text-white">{b.name}</span>
            {selected === b.id && (
              <span className="text-xs font-semibold" style={{ color: '#00C896' }}>✓ Selected</span>
            )}
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl border"
          style={{ backgroundColor: 'rgba(0,200,150,0.06)', borderColor: 'rgba(0,200,150,0.3)' }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0,200,150,0.15)' }}>
            <Shield size={16} color="#00C896" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Securely connected via PSD2</p>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>
              We can only read your balance. We never move money without your approval.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Step 2: Quiz ──────────────────────────────────────────────────────────────
function QuizCard({ question, options, selected, onSelect }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-bold text-white text-center">{question}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map(({ id, label, icon: Icon, sub }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="rounded-xl border p-4 flex items-center gap-4 text-left transition-all"
            style={{
              backgroundColor: selected === id ? 'rgba(0,200,150,0.08)' : '#0A0E1A',
              borderColor: selected === id ? '#00C896' : '#1F2937',
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: selected === id ? 'rgba(0,200,150,0.15)' : '#1F2937' }}
            >
              <Icon size={18} color={selected === id ? '#00C896' : '#6B7280'} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{sub}</p>
            </div>
            {selected === id && (
              <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#00C896' }}>
                <Check size={12} color="#0A0E1A" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepQuiz({ q1, q2, q3, setQ1, setQ2, setQ3, subStep, setSubStep }) {
  const quizzes = [
    { q: 'When might you need this money?', opts: Q1_OPTIONS, val: q1, set: setQ1 },
    { q: 'How would you feel if your balance dropped 10%?', opts: Q2_OPTIONS, val: q2, set: setQ2 },
    { q: "What's your main goal?", opts: Q3_OPTIONS, val: q3, set: setQ3 },
  ]
  const current = quizzes[subStep]

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>
          Question {subStep + 1} of {quizzes.length}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Financial Fingerprint</h2>
      </div>

      <div className="h-1 rounded-full" style={{ backgroundColor: '#1F2937' }}>
        <div className="h-1 rounded-full transition-all" style={{ backgroundColor: '#00C896', width: `${((subStep + 1) / quizzes.length) * 100}%` }} />
      </div>

      <QuizCard
        question={current.q}
        options={current.opts}
        selected={current.val}
        onSelect={current.set}
      />

      <div className="flex gap-3 pt-2">
        {subStep > 0 && (
          <button
            onClick={() => setSubStep(s => s - 1)}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm border transition-colors"
            style={{ borderColor: '#1F2937', color: '#9CA3AF' }}
          >
            <ChevronLeft size={16} /> Back
          </button>
        )}
        <button
          disabled={!current.val}
          onClick={() => { if (subStep < quizzes.length - 1) setSubStep(s => s + 1) }}
          className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-40"
          style={{ backgroundColor: '#00C896', color: '#0A0E1A' }}
        >
          {subStep < quizzes.length - 1 ? 'Next question' : 'See my profile'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ── Step 3: Profile reveal ────────────────────────────────────────────────────
function StepProfile({ profile }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 200); return () => clearTimeout(t) }, [])

  return (
    <div className="flex flex-col gap-8 items-center text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-white">Your investor profile</h2>

      <div
        className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 border-4"
          style={{ backgroundColor: 'rgba(0,200,150,0.12)', borderColor: '#00C896' }}
        >
          <TrendingUp size={40} color="#00C896" />
        </div>
        <h3 className="text-3xl font-extrabold text-white mb-1">{profile.type}</h3>
        <p className="text-sm" style={{ color: '#9CA3AF' }}>Your personalised investment persona</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {[
          { label: 'Horizon', value: profile.horizon },
          { label: 'Risk appetite', value: profile.risk },
          { label: 'Return type', value: profile.returnType },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="px-5 py-3 rounded-full border"
            style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
          >
            <span className="text-xs" style={{ color: '#6B7280' }}>{label}: </span>
            <span className="text-sm font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>

      <p className="text-sm max-w-sm" style={{ color: '#9CA3AF' }}>
        Based on your answers, we've curated 3 investment products that match your goals perfectly.
      </p>
    </div>
  )
}

// ── Step 4: Product matches ───────────────────────────────────────────────────
const MATCHED = [products[0], products[2], products[4]]

function StepProducts({ selected, setSelected }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Your matched investments</h2>
        <p style={{ color: '#9CA3AF' }}>Curated for your Steady Builder profile. Select one to continue.</p>
      </div>

      <div className="flex flex-col gap-4">
        {MATCHED.map((p, i) => {
          const projection = (1000 * Math.pow(1 + p.apy / 100, 1)).toFixed(0)
          const isSelected = selected === p.id
          const badgeMap = { 0: { label: '⭐ Best match', color: '#00C896' }, 1: { label: '🛡 Very safe', color: '#3B82F6' }, 2: { label: '🚀 Higher return', color: '#F59E0B' } }
          const badge = badgeMap[i]

          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className="rounded-xl border p-5 text-left transition-all"
              style={{
                backgroundColor: isSelected ? 'rgba(0,200,150,0.06)' : '#0A0E1A',
                borderColor: isSelected ? '#00C896' : '#1F2937',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded"
                      style={{ backgroundColor: 'rgba(0,200,150,0.12)', color: badge.color }}
                    >
                      {badge.label}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#1F2937', color: '#9CA3AF' }}>{p.type}</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm">{p.name}</h4>
                  <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{p.provider}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold" style={{ color: '#00C896' }}>{p.apy}%</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>APY</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="h-10 w-28">
                  <SparklineChart data={p.sparkline} color={i === 2 ? '#F59E0B' : '#00C896'} />
                </div>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>
                  €1,000 → <strong className="text-white">{formatCurrency(Number(projection))}</strong> in 1yr
                </p>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00C896' }}>
                    <Check size={13} color="#0A0E1A" />
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 5: First investment ──────────────────────────────────────────────────
function StepInvest({ selectedProductId, bank }) {
  const [amount, setAmount] = useState(100)
  const [customMode, setCustomMode] = useState(false)
  const [rawInput, setRawInput] = useState('100')

  const product = MATCHED.find(p => p.id === selectedProductId) || MATCHED[0]
  const projected = (amount * Math.pow(1 + product.apy / 100, 1)).toFixed(2)
  const gain = (projected - amount).toFixed(2)

  const bankName = BANKS.find(b => b.id === bank)?.name || 'Your bank'

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Make your first investment</h2>
        <p style={{ color: '#9CA3AF' }}>Into: <strong className="text-white">{product.name}</strong></p>
      </div>

      {/* Amount selector */}
      <div>
        <p className="text-sm font-medium text-white mb-3">Choose amount</p>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {AMOUNT_PILLS.map(v => (
            <button
              key={v}
              onClick={() => { setAmount(v); setCustomMode(false) }}
              className="py-2.5 rounded-lg text-sm font-semibold border transition-all"
              style={{
                backgroundColor: amount === v && !customMode ? 'rgba(0,200,150,0.12)' : '#0A0E1A',
                borderColor: amount === v && !customMode ? '#00C896' : '#1F2937',
                color: amount === v && !customMode ? '#00C896' : '#9CA3AF',
              }}
            >
              {formatCurrency(v)}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCustomMode(true)}
          className="w-full py-2.5 rounded-lg text-sm font-medium border transition-all"
          style={{
            backgroundColor: customMode ? 'rgba(0,200,150,0.06)' : '#0A0E1A',
            borderColor: customMode ? '#00C896' : '#1F2937',
            color: customMode ? '#00C896' : '#9CA3AF',
          }}
        >
          Custom amount
        </button>
        {customMode && (
          <div className="mt-2 flex items-center border rounded-lg overflow-hidden" style={{ borderColor: '#00C896', backgroundColor: '#0A0E1A' }}>
            <span className="px-3 text-sm font-semibold" style={{ color: '#00C896' }}>€</span>
            <input
              type="number"
              value={rawInput}
              min={product.minInvestment}
              onChange={e => { setRawInput(e.target.value); setAmount(Number(e.target.value) || 0) }}
              className="flex-1 bg-transparent py-2.5 pr-3 text-sm text-white outline-none"
              placeholder="Enter amount"
            />
          </div>
        )}
      </div>

      {/* Projected return */}
      <div
        className="rounded-xl p-5 border"
        style={{ backgroundColor: 'rgba(0,200,150,0.05)', borderColor: 'rgba(0,200,150,0.2)' }}
      >
        <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#6B7280' }}>1-year projection</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-extrabold text-white">{formatCurrency(Number(projected), 2)}</p>
            <p className="text-sm mt-1" style={{ color: '#00C896' }}>+{formatCurrency(Number(gain), 2)} ({product.apy}% APY)</p>
          </div>
          <div className="text-right">
            <p className="text-sm" style={{ color: '#6B7280' }}>You invest</p>
            <p className="text-xl font-bold text-white">{formatCurrency(amount)}</p>
          </div>
        </div>
      </div>

      {/* Bank confirmation */}
      <div className="flex items-center gap-3 p-4 rounded-xl border" style={{ borderColor: '#1F2937', backgroundColor: '#0A0E1A' }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1F2937' }}>
          <Shield size={18} color="#00C896" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Funding from {bankName}</p>
          <p className="text-xs" style={{ color: '#6B7280' }}>Direct debit via PSD2 · Secured by 256-bit encryption</p>
        </div>
        <Check size={18} color="#00C896" className="ml-auto flex-shrink-0" />
      </div>
    </div>
  )
}

// ── Main Onboarding component ─────────────────────────────────────────────────
export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState('right')

  // Step 1
  const [bank, setBank] = useState(null)
  // Step 2
  const [quizSubStep, setQuizSubStep] = useState(0)
  const [q1, setQ1] = useState(null)
  const [q2, setQ2] = useState(null)
  const [q3, setQ3] = useState(null)
  // Step 4
  const [selectedProduct, setSelectedProduct] = useState(null)

  const TOTAL_STEPS = 5
  const profile = profileFromAnswers(q1, q2, q3)

  const canContinue = () => {
    if (step === 0) return !!bank
    if (step === 1) return q1 && q2 && q3
    if (step === 3) return !!selectedProduct
    return true
  }

  const next = () => {
    if (step === 1 && quizSubStep < 2) { setQuizSubStep(s => s + 1); return }
    if (step === TOTAL_STEPS - 1) { navigate('/dashboard'); return }
    setDir('right')
    setStep(s => s + 1)
  }

  const back = () => {
    if (step === 1 && quizSubStep > 0) { setQuizSubStep(s => s - 1); return }
    if (step === 0) { navigate('/'); return }
    setDir('left')
    setStep(s => s - 1)
  }

  const STEPS = [
    { label: 'Bank' },
    { label: 'Quiz' },
    { label: 'Profile' },
    { label: 'Products' },
    { label: 'Invest' },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0A0E1A' }}>
      {/* Top bar */}
      <div className="border-b px-4 sm:px-6 py-4" style={{ borderColor: '#1F2937' }}>
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button onClick={back} className="p-1.5 rounded-lg transition-colors" style={{ color: '#6B7280' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <StepIndicator steps={TOTAL_STEPS} current={step} />
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={16} color="#00C896" />
            <span className="text-sm font-bold text-white">Stash</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12">
        <div className={`w-full max-w-lg slide-in-${dir}`} key={`${step}-${quizSubStep}`}>
          <Card>
            {step === 0 && <StepBank selected={bank} setSelected={setBank} />}
            {step === 1 && (
              <StepQuiz
                q1={q1} q2={q2} q3={q3}
                setQ1={setQ1} setQ2={setQ2} setQ3={setQ3}
                subStep={quizSubStep} setSubStep={setQuizSubStep}
              />
            )}
            {step === 2 && <StepProfile profile={profile} />}
            {step === 3 && <StepProducts selected={selectedProduct} setSelected={setSelectedProduct} />}
            {step === 4 && <StepInvest selectedProductId={selectedProduct} bank={bank} />}
          </Card>

          {/* Nav buttons (not shown inside quiz — it has its own) */}
          {step !== 1 && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={back}
                className="px-5 py-3 rounded-xl text-sm font-medium border transition-colors"
                style={{ borderColor: '#1F2937', color: '#9CA3AF' }}
              >
                Back
              </button>
              <button
                disabled={!canContinue()}
                onClick={next}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
                style={{ backgroundColor: '#00C896', color: '#0A0E1A' }}
              >
                {step === TOTAL_STEPS - 1 ? 'Invest now →' : 'Continue →'}
              </button>
            </div>
          )}
          {step === 1 && q1 && q2 && q3 && quizSubStep === 2 && (
            <button
              onClick={() => { setDir('right'); setStep(2) }}
              className="w-full mt-4 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ backgroundColor: '#00C896', color: '#0A0E1A' }}
            >
              See my profile →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

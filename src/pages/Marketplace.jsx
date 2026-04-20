import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, BadgeCheck, TrendingUp } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import { MARKETPLACE_PRODUCTS, userProfile } from '../data/mockData'

// ── Filter config ─────────────────────────────────────────────────────────────
const CATEGORIES = ['All', 'ETFs', 'P2P Loans', 'Real Estate', 'Bonds', 'Term Deposits']
const SORT_OPTIONS = [
  { value: 'apy_desc',  label: 'Highest return' },
  { value: 'risk_asc',  label: 'Lowest risk' },
  { value: 'min_asc',   label: 'Lowest minimum' },
]

// ── Risk slider labels ────────────────────────────────────────────────────────
const RISK_LABELS = { 1: 'Very low', 2: 'Low', 3: 'Medium', 4: 'High', 5: 'Very high' }

// ── Sidebar matched products ──────────────────────────────────────────────────
const MATCHED_IDS = [104, 111, 105]

// ── Small inline broker badge ─────────────────────────────────────────────────
function BrokerBadge({ name }) {
  return (
    <div className="flex items-center gap-1 text-xs" style={{ color: '#8B949E' }}>
      <BadgeCheck size={11} color="#00D09C" />
      {name}
    </div>
  )
}

// ── Sidebar card ──────────────────────────────────────────────────────────────
function SidebarProductCard({ product, onInvest }) {
  return (
    <div
      className="rounded-xl border p-4 transition-all duration-200"
      style={{ backgroundColor: '#161B22', borderColor: '#21262D' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#30363D')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#21262D')}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="text-sm font-semibold text-white leading-tight">{product.name}</p>
          <BrokerBadge name={product.broker} />
        </div>
        <p className="text-lg font-bold flex-shrink-0" style={{ color: '#00D09C', fontFamily: 'DM Serif Display, serif' }}>
          {product.apy}%
        </p>
      </div>
      <button
        onClick={() => onInvest(product)}
        className="w-full py-1.5 rounded-lg text-xs font-bold transition-all mt-2"
        style={{ backgroundColor: '#00D09C', color: '#0D1117' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00D09C')}
      >
        Invest now
      </button>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Marketplace() {
  const navigate       = useNavigate()
  const [query, setQ]  = useState('')
  const [cat,   setCat]  = useState('All')
  const [sort,  setSort] = useState('apy_desc')
  const [maxRisk, setMaxRisk] = useState(5)
  const [filtersOpen, setFO]  = useState(false)

  // Filter
  let filtered = MARKETPLACE_PRODUCTS.filter(p => {
    const matchCat   = cat === 'All' || p.category === cat
    const matchQuery = !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.broker.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    const matchRisk  = p.risk <= maxRisk
    return matchCat && matchQuery && matchRisk
  })

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sort === 'apy_desc') return b.apy - a.apy
    if (sort === 'risk_asc') return a.risk - b.risk
    if (sort === 'min_asc')  return a.minInvest - b.minInvest
    return 0
  })

  const apyMin = filtered.length ? Math.min(...filtered.map(p => p.apy)) : 0
  const apyMax = filtered.length ? Math.max(...filtered.map(p => p.apy)) : 0

  const matched = MARKETPLACE_PRODUCTS.filter(p => MATCHED_IDS.includes(p.id))

  function handleInvest() {
    navigate('/onboarding')
  }

  return (
    <div style={{ backgroundColor: '#0D1117', minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#00D09C' }}
          >
            EU investment marketplace
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: 'DM Serif Display, serif' }}
          >
            Browse all products
          </h1>
          <p className="text-lg" style={{ color: '#8B949E' }}>
            {MARKETPLACE_PRODUCTS.length} regulated products across {CATEGORIES.length - 1} categories.
            All MiFID II compliant.
          </p>
        </div>

        {/* ── STICKY FILTER BAR ── */}
        <div
          className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 mb-8"
          style={{ backgroundColor: 'rgba(13,17,23,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #21262D' }}
        >
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div
              className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl border"
              style={{ backgroundColor: '#161B22', borderColor: '#21262D' }}
            >
              <Search size={15} color="#8B949E" />
              <input
                type="text"
                placeholder="Search products or brokers…"
                value={query}
                onChange={e => setQ(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-600"
              />
            </div>

            {/* Category tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 md:pb-0 flex-nowrap">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className="whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all"
                  style={{
                    backgroundColor: cat === c ? 'rgba(0,208,156,0.12)' : '#161B22',
                    borderColor:     cat === c ? '#00D09C' : '#21262D',
                    color:           cat === c ? '#00D09C' : '#8B949E',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold border outline-none"
              style={{ backgroundColor: '#161B22', borderColor: '#21262D', color: '#C9D1D9' }}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Risk filter toggle (mobile) */}
            <button
              onClick={() => setFO(o => !o)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all"
              style={{
                backgroundColor: filtersOpen ? 'rgba(0,208,156,0.1)' : '#161B22',
                borderColor:     filtersOpen ? '#00D09C' : '#21262D',
                color:           filtersOpen ? '#00D09C' : '#8B949E',
              }}
            >
              <SlidersHorizontal size={13} />
              Risk {maxRisk < 5 ? `≤ ${maxRisk}` : 'all'}
            </button>
          </div>

          {/* Risk slider (expanded) */}
          {filtersOpen && (
            <div className="mt-3 pt-3 border-t flex items-center gap-4" style={{ borderColor: '#21262D' }}>
              <span className="text-xs font-medium flex-shrink-0" style={{ color: '#8B949E' }}>
                Max risk:
              </span>
              <input
                type="range" min={1} max={5} step={1} value={maxRisk}
                onChange={e => setMaxRisk(+e.target.value)}
                className="flex-1"
                style={{ accentColor: '#00D09C' }}
              />
              <span
                className="text-sm font-bold flex-shrink-0"
                style={{ color: '#00D09C', minWidth: 64 }}
              >
                {RISK_LABELS[maxRisk]}
              </span>
            </div>
          )}
        </div>

        {/* ── MAIN GRID + SIDEBAR ── */}
        <div className="flex gap-8 items-start">

          {/* Products grid (2 cols desktop) */}
          <div className="flex-1 min-w-0">
            {/* Stats row */}
            <div
              className="flex items-center gap-6 px-4 py-3 rounded-xl border mb-6 flex-wrap text-sm"
              style={{ backgroundColor: '#161B22', borderColor: '#21262D' }}
            >
              <span style={{ color: '#8B949E' }}>
                <strong className="text-white">{filtered.length}</strong> products
              </span>
              <div className="w-px h-4" style={{ backgroundColor: '#21262D' }} />
              <span style={{ color: '#8B949E' }}>
                APY:{' '}
                <strong style={{ color: '#00D09C' }}>
                  {apyMin.toFixed(1)}% – {apyMax.toFixed(1)}%
                </strong>
              </span>
              <div className="w-px h-4" style={{ backgroundColor: '#21262D' }} />
              <span style={{ color: '#8B949E' }}>All EU-regulated</span>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-semibold text-white mb-2">No products match</p>
                <p style={{ color: '#8B949E' }}>Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} onInvest={handleInvest} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar (desktop only) */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-48 flex flex-col gap-5">

            {/* Profile card */}
            <div
              className="rounded-2xl border p-5"
              style={{ backgroundColor: '#161B22', borderColor: '#21262D' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold"
                  style={{ backgroundColor: 'rgba(0,208,156,0.15)', color: '#00D09C' }}
                >
                  {userProfile.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{userProfile.name}</p>
                  <p className="text-xs" style={{ color: '#8B949E' }}>{userProfile.profileType}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span style={{ color: '#8B949E' }}>Risk score</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: i < userProfile.riskScore ? '#00D09C' : '#30363D' }}
                    />
                  ))}
                </div>
              </div>
              <div
                className="rounded-lg px-3 py-2 text-xs text-center"
                style={{ backgroundColor: 'rgba(0,208,156,0.08)', color: '#00D09C', border: '1px solid rgba(0,208,156,0.2)' }}
              >
                Profile: {userProfile.profileType}
              </div>
            </div>

            {/* Matched for you */}
            <div
              className="rounded-2xl border p-5"
              style={{ backgroundColor: '#161B22', borderColor: '#21262D' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={15} color="#00D09C" />
                <p className="text-sm font-bold text-white">Matched for you</p>
              </div>
              <div className="flex flex-col gap-3">
                {matched.map(p => (
                  <SidebarProductCard key={p.id} product={p} onInvest={handleInvest} />
                ))}
              </div>
            </div>

          </aside>
        </div>

      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { products } from '../data/mockData'
import InvestmentCard from '../components/ui/InvestmentCard'

const FILTERS = ['All', 'ETFs', 'Bonds', 'Money Market', 'P2P', 'Crowdfunding']

const TYPE_MAP = {
  'ETFs': 'ETF',
  'Bonds': 'Bonds',
  'Money Market': 'Money Market',
  'P2P': 'P2P',
  'Crowdfunding': 'Crowdfunding',
}

export default function Products() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = products.filter(p => {
    const matchType = activeFilter === 'All' || p.type === TYPE_MAP[activeFilter]
    const matchQuery = query === '' ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.provider.toLowerCase().includes(query.toLowerCase())
    return matchType && matchQuery
  })

  return (
    <div style={{ backgroundColor: '#0A0E1A', minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: '#00C896' }}>
            Matched to your profile
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Investments for EU savers
          </h1>
          <p className="text-lg" style={{ color: '#9CA3AF' }}>
            Regulated products across {FILTERS.length - 1} categories. All reviewed by our team.
          </p>
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div
            className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl border"
            style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
          >
            <Search size={16} color="#6B7280" />
            <input
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-500"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                style={{
                  backgroundColor: activeFilter === f ? 'rgba(0,200,150,0.12)' : '#111827',
                  borderColor: activeFilter === f ? '#00C896' : '#1F2937',
                  color: activeFilter === f ? '#00C896' : '#9CA3AF',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="flex items-center gap-6 px-5 py-3 rounded-xl border mb-8 flex-wrap"
          style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
        >
          <div className="text-sm">
            <span style={{ color: '#6B7280' }}>Showing </span>
            <strong className="text-white">{filtered.length}</strong>
            <span style={{ color: '#6B7280' }}> products</span>
          </div>
          <div className="w-px h-4 hidden sm:block" style={{ backgroundColor: '#1F2937' }} />
          <div className="text-sm">
            <span style={{ color: '#6B7280' }}>APY range: </span>
            <strong style={{ color: '#00C896' }}>
              {Math.min(...filtered.map(p => p.apy)).toFixed(1)}% – {Math.max(...filtered.map(p => p.apy)).toFixed(1)}%
            </strong>
          </div>
          <div className="w-px h-4 hidden sm:block" style={{ backgroundColor: '#1F2937' }} />
          <div className="text-sm" style={{ color: '#6B7280' }}>
            All products are EU-regulated
          </div>
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-semibold text-white mb-2">No products found</p>
            <p style={{ color: '#9CA3AF' }}>Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(p => (
              <InvestmentCard
                key={p.id}
                product={p}
                onInvest={() => navigate('/onboarding')}
                onLearnMore={() => {}}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div
          className="mt-16 rounded-2xl border p-8 text-center"
          style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
        >
          <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#6B7280' }}>
            Don't know where to start?
          </p>
          <h2 className="text-2xl font-bold text-white mb-3">
            Let us match you to the right products
          </h2>
          <p className="mb-6" style={{ color: '#9CA3AF' }}>
            Answer 3 questions and get a personalised portfolio in 5 minutes.
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all"
            style={{ backgroundColor: '#00C896', color: '#0A0E1A' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#00b588'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#00C896'}
          >
            Get my personalised match
          </button>
        </div>

      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp, TrendingDown, ArrowUpRight, Bell, Settings,
  Plus, ChevronRight, Activity
} from 'lucide-react'
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip
} from 'recharts'
import PortfolioChart from '../components/charts/PortfolioChart'
import {
  userProfile, portfolioHistory, holdings, holdingColors,
  transactions, formatCurrency, formatDate
} from '../data/mockData'

// ── Skeleton loader ───────────────────────────────────────────────────────────
function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />
}

// ── Metric card ───────────────────────────────────────────────────────────────
function MetricCard({ label, value, sub, subColor, loading }) {
  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
      <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>{label}</p>
      {loading ? (
        <><Skeleton className="h-8 w-32 mb-2" /><Skeleton className="h-4 w-20" /></>
      ) : (
        <>
          <p className="text-2xl font-bold text-white">{value}</p>
          {sub && <p className="text-sm mt-1 font-medium" style={{ color: subColor || '#9CA3AF' }}>{sub}</p>}
        </>
      )}
    </div>
  )
}

// ── Holdings table ────────────────────────────────────────────────────────────
function HoldingsTable({ loading }) {
  if (loading) return (
    <div className="flex flex-col gap-3">
      {[1,2,3].map(i => <Skeleton key={i} className="h-14 w-full" />)}
    </div>
  )

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr style={{ borderBottom: '1px solid #1F2937' }}>
            {['Name','Type','Invested','Current','Return','APY','Action'].map(h => (
              <th key={h} className="text-left pb-3 pr-4 text-xs font-medium uppercase tracking-wider" style={{ color: '#6B7280' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {holdings.map((h, i) => (
            <tr key={h.id} style={{ borderBottom: '1px solid #1F2937' }}>
              <td className="py-4 pr-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: holdingColors[i] }} />
                  <span className="text-white font-medium">{h.name}</span>
                </div>
              </td>
              <td className="py-4 pr-4">
                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#1F2937', color: '#9CA3AF' }}>{h.type}</span>
              </td>
              <td className="py-4 pr-4 text-white">{formatCurrency(h.invested)}</td>
              <td className="py-4 pr-4 text-white font-semibold">{formatCurrency(h.currentValue)}</td>
              <td className="py-4 pr-4">
                <span className="font-semibold" style={{ color: '#00C896' }}>
                  +{formatCurrency(h.returnAmt)} ({h.returnPct.toFixed(1)}%)
                </span>
              </td>
              <td className="py-4 pr-4">
                <span className="font-semibold" style={{ color: '#00C896' }}>{h.apy}%</span>
              </td>
              <td className="py-4">
                <Link
                  to="/products"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                  style={{ backgroundColor: '#00C896', color: '#0A0E1A' }}
                >
                  + Add
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Doughnut chart ────────────────────────────────────────────────────────────
const PieTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="px-3 py-2 rounded-lg border text-sm" style={{ backgroundColor: '#1F2937', borderColor: '#374151' }}>
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p style={{ color: '#00C896' }}>{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

function HoldingsPie({ loading }) {
  const data = holdings.map(h => ({ name: h.name, value: h.currentValue }))

  if (loading) return <Skeleton className="w-full h-48" />

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={holdingColors[i]} />
            ))}
          </Pie>
          <RTooltip content={<PieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-2 mt-2">
        {holdings.map((h, i) => (
          <div key={h.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: holdingColors[i] }} />
              <span style={{ color: '#9CA3AF' }}>{h.name.split(' ').slice(0, 2).join(' ')}</span>
            </div>
            <span className="text-white font-medium">{formatCurrency(h.currentValue)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Activity feed ─────────────────────────────────────────────────────────────
function ActivityFeed({ loading }) {
  if (loading) return (
    <div className="flex flex-col gap-3">
      {[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
    </div>
  )

  return (
    <div className="flex flex-col gap-3">
      {transactions.slice(0, 3).map(tx => (
        <div key={tx.id} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: '#1F2937' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: tx.type === 'Interest' ? 'rgba(0,200,150,0.12)' : 'rgba(59,130,246,0.12)' }}
            >
              {tx.type === 'Interest'
                ? <TrendingUp size={16} color="#00C896" />
                : <ArrowUpRight size={16} color="#3B82F6" />
              }
            </div>
            <div>
              <p className="text-sm font-medium text-white">{tx.type}</p>
              <p className="text-xs" style={{ color: '#6B7280' }}>{tx.product}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold" style={{ color: tx.type === 'Interest' ? '#00C896' : '#fff' }}>
              {tx.type === 'Interest' ? '+' : ''}{formatCurrency(tx.amount, 2)}
            </p>
            <p className="text-xs" style={{ color: '#6B7280' }}>{formatDate(tx.date)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  const positive = userProfile.change24h >= 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8" style={{ backgroundColor: '#0A0E1A' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm font-medium" style={{ color: '#6B7280' }}>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">
            Good morning, {userProfile.name} 👋
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border transition-colors" style={{ borderColor: '#1F2937', color: '#6B7280' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
          >
            <Bell size={18} />
          </button>
          <button className="p-2 rounded-lg border transition-colors" style={{ borderColor: '#1F2937', color: '#6B7280' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Hero metric + chart */}
      <div className="rounded-2xl border p-6 mb-6" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Total portfolio value</p>
            {loading ? (
              <><Skeleton className="h-10 w-40 mb-2" /><Skeleton className="h-5 w-24" /></>
            ) : (
              <>
                <p className="text-4xl font-extrabold text-white">{formatCurrency(userProfile.balance)}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {positive
                    ? <TrendingUp size={16} color="#00C896" />
                    : <TrendingDown size={16} color="#EF4444" />
                  }
                  <span className="text-sm font-semibold" style={{ color: positive ? '#00C896' : '#EF4444' }}>
                    {positive ? '+' : ''}{formatCurrency(userProfile.change24h, 2)} ({positive ? '+' : ''}{userProfile.change24hPct}%) today
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs" style={{ color: '#6B7280' }}>Total return</p>
              <p className="text-lg font-bold" style={{ color: '#00C896' }}>
                +{formatCurrency(userProfile.totalReturn, 2)}
              </p>
            </div>
            <Link
              to="/onboarding"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ backgroundColor: '#00C896', color: '#0A0E1A' }}
            >
              <Plus size={15} /> Invest
            </Link>
          </div>
        </div>
        <div className="h-48 sm:h-64">
          {loading ? <Skeleton className="w-full h-full" /> : <PortfolioChart data={portfolioHistory} />}
        </div>
      </div>

      {/* Metric pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Invested" value={formatCurrency(4200)} loading={loading} />
        <MetricCard
          label="Total return"
          value={`+${userProfile.totalReturnPct}%`}
          sub="All time"
          subColor="#00C896"
          loading={loading}
        />
        <MetricCard
          label="Idle balance"
          value={formatCurrency(userProfile.idleBalance)}
          sub="Available to invest"
          loading={loading}
        />
        <MetricCard label="Products" value="3" sub="Active" loading={loading} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Holdings table — spans 2 cols */}
        <div className="lg:col-span-2 rounded-2xl border p-6" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white">Your investments</h2>
            <Link to="/products" className="text-xs font-medium flex items-center gap-1" style={{ color: '#00C896' }}>
              Add more <ChevronRight size={13} />
            </Link>
          </div>
          <HoldingsTable loading={loading} />
        </div>

        {/* Doughnut */}
        <div className="rounded-2xl border p-6" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
          <h2 className="text-lg font-bold text-white mb-4">Allocation</h2>
          <HoldingsPie loading={loading} />
        </div>

        {/* Stash suggests */}
        <div className="rounded-2xl border p-6" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} color="#00C896" />
            <h2 className="text-lg font-bold text-white">Stash suggests</h2>
          </div>
          <div
            className="rounded-xl p-4 border"
            style={{ backgroundColor: 'rgba(0,200,150,0.06)', borderColor: 'rgba(0,200,150,0.2)' }}
          >
            <p className="text-sm font-semibold text-white mb-1">You have €380 idle</p>
            <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
              Put your idle balance to work. At 3.4% APY, that's an extra{' '}
              <strong style={{ color: '#00C896' }}>€12.92/year</strong>.
            </p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
              style={{ backgroundColor: '#00C896', color: '#0A0E1A' }}
            >
              Invest idle cash <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Recent activity */}
        <div className="lg:col-span-2 rounded-2xl border p-6" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Recent activity</h2>
            <button className="text-xs font-medium" style={{ color: '#6B7280' }}>View all</button>
          </div>
          <ActivityFeed loading={loading} />
        </div>

      </div>
    </div>
  )
}

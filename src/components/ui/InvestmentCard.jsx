import APYBadge from './APYBadge'
import SparklineChart from '../charts/SparklineChart'
import { formatCurrency } from '../../data/mockData'

const riskDots = (risk) =>
  Array.from({ length: 5 }, (_, i) => {
    const color =
      risk <= 1 ? '#00C896' :
      risk <= 2 ? '#3B82F6' :
      risk <= 3 ? '#F59E0B' : '#EF4444'
    return (
      <span
        key={i}
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: i < risk ? color : '#374151' }}
      />
    )
  })

const badgeStyle = {
  green: { bg: 'rgba(0,200,150,0.15)', color: '#00C896' },
  blue:  { bg: 'rgba(59,130,246,0.15)', color: '#60A5FA' },
  amber: { bg: 'rgba(245,158,11,0.15)', color: '#F59E0B' },
  red:   { bg: 'rgba(239,68,68,0.15)', color: '#F87171' },
}

export default function InvestmentCard({ product, onInvest, onLearnMore, compact }) {
  const { name, provider, type, apy, risk, badge, badgeColor, sparkline, minInvestment } = product
  const projection = (1000 * Math.pow(1 + apy / 100, 1)).toFixed(0)
  const bs = badgeStyle[badgeColor] || badgeStyle.blue

  return (
    <div
      className="invest-card rounded-xl border p-5 flex flex-col gap-4 transition-all duration-200 cursor-pointer"
      style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="text-xs font-medium px-2 py-0.5 rounded"
              style={{ backgroundColor: '#1F2937', color: '#9CA3AF' }}
            >
              {type}
            </span>
            {badge && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{ backgroundColor: bs.bg, color: bs.color }}
              >
                {badge}
              </span>
            )}
          </div>
          <h3 className="text-white font-semibold text-sm leading-snug">{name}</h3>
          <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{provider}</p>
        </div>
        <APYBadge apy={apy} risk={risk} />
      </div>

      {/* Sparkline */}
      {!compact && sparkline && (
        <div className="h-14">
          <SparklineChart data={sparkline} color={risk <= 2 ? '#00C896' : risk <= 3 ? '#F59E0B' : '#EF4444'} />
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="text-xs mb-0.5" style={{ color: '#6B7280' }}>€1,000 → in 1 year</p>
          <p className="text-white font-semibold">{formatCurrency(Number(projection))}</p>
        </div>
        <div className="text-right">
          <p className="text-xs mb-0.5" style={{ color: '#6B7280' }}>Risk</p>
          <div className="flex items-center gap-1 justify-end">{riskDots(risk)}</div>
        </div>
      </div>

      {/* Min investment */}
      <p className="text-xs" style={{ color: '#6B7280' }}>Min. {formatCurrency(minInvestment)}</p>

      {/* Actions */}
      {!compact && (
        <div className="flex gap-2 mt-auto pt-1">
          {onLearnMore && (
            <button
              onClick={onLearnMore}
              className="flex-1 text-sm font-medium py-2 rounded-lg border transition-colors"
              style={{ borderColor: '#1F2937', color: '#9CA3AF', backgroundColor: 'transparent' }}
              onMouseEnter={e => { e.target.style.borderColor = '#374151'; e.target.style.color = '#fff' }}
              onMouseLeave={e => { e.target.style.borderColor = '#1F2937'; e.target.style.color = '#9CA3AF' }}
            >
              Learn more
            </button>
          )}
          {onInvest && (
            <button
              onClick={() => onInvest(product)}
              className="flex-1 text-sm font-semibold py-2 rounded-lg transition-all"
              style={{ backgroundColor: '#00C896', color: '#0A0E1A' }}
              onMouseEnter={e => (e.target.style.backgroundColor = '#00b588')}
              onMouseLeave={e => (e.target.style.backgroundColor = '#00C896')}
            >
              Invest
            </button>
          )}
        </div>
      )}
    </div>
  )
}

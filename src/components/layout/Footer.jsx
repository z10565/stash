import { TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t mt-20" style={{ borderColor: '#1F2937', backgroundColor: '#0A0E1A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#00C896' }}>
                <TrendingUp size={15} color="#0A0E1A" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-lg">Stash</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#6B7280' }}>
              Smart investing for European savers. Start with as little as €10 and grow your wealth.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#6B7280' }}>Product</p>
            <div className="flex flex-col gap-2">
              {['How it works', 'Products', 'Pricing', 'Security'].map(l => (
                <a key={l} href="#" className="text-sm transition-colors" style={{ color: '#9CA3AF' }}
                  onMouseEnter={e => (e.target.style.color = '#fff')}
                  onMouseLeave={e => (e.target.style.color = '#9CA3AF')}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#6B7280' }}>Legal</p>
            <div className="flex flex-col gap-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclosures'].map(l => (
                <a key={l} href="#" className="text-sm transition-colors" style={{ color: '#9CA3AF' }}
                  onMouseEnter={e => (e.target.style.color = '#fff')}
                  onMouseLeave={e => (e.target.style.color = '#9CA3AF')}>{l}</a>
              ))}
            </div>
          </div>
        </div>

        <hr style={{ borderColor: '#1F2937' }} />

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs leading-relaxed max-w-2xl" style={{ color: '#4B5563' }}>
            <strong style={{ color: '#6B7280' }}>Regulatory disclaimer:</strong> Stash UAB is authorised and regulated by the Bank of Lithuania (licence no. LB-000XXX) as an investment firm under MiFID II. Investments carry risk. Past performance is not a reliable indicator of future results. Capital at risk. Investments are not covered by the Deposit Guarantee Scheme. Maximum compensation under the Investor Compensation Scheme is €20,000. Please read our Key Information Documents (KIDs) before investing.
          </p>
          <p className="text-xs whitespace-nowrap" style={{ color: '#4B5563' }}>© 2025 Stash UAB</p>
        </div>
      </div>
    </footer>
  )
}

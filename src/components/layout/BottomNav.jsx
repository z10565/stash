import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookOpen, PlusCircle, TrendingUp, CreditCard } from 'lucide-react'

const items = [
  { label: 'Home',   href: '/dashboard',  icon: LayoutDashboard },
  { label: 'Learn',  href: '/learn',      icon: BookOpen },
  { label: 'Invest', href: '/onboarding', icon: PlusCircle, primary: true },
  { label: 'Ribbit', href: '/ribbit',     icon: TrendingUp },
  { label: 'Pass',   href: '/stash-pass', icon: CreditCard },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t flex items-center"
      style={{ backgroundColor: '#111827', borderColor: '#1F2937', height: '64px' }}
    >
      {items.map(({ label, href, icon: Icon, primary }) => {
        const active = pathname === href
        return (
          <Link
            key={label}
            to={href}
            className="flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors"
          >
            {primary ? (
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00C896' }}>
                <Icon size={20} color="#0A0E1A" strokeWidth={2.5} />
              </div>
            ) : (
              <>
                <Icon size={20} color={active ? '#00C896' : '#6B7280'} />
                <span className="text-xs" style={{ color: active ? '#00C896' : '#6B7280' }}>{label}</span>
              </>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

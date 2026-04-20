import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

// Stash logomark — green dot + wordmark in DM Serif
function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="relative w-8 h-8 flex-shrink-0">
        {/* Green circle dot */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: '#00D09C', opacity: 0.15 }}
        />
        <div
          className="absolute inset-1.5 rounded-full"
          style={{ backgroundColor: '#00D09C' }}
        />
      </div>
      <span
        className="text-white text-xl"
        style={{ fontFamily: 'DM Serif Display, serif', letterSpacing: '-0.01em' }}
      >
        Stash
      </span>
    </Link>
  )
}

const NAV_LINKS = [
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Marketplace',  to: '/marketplace' },
  { label: 'Brokers',      to: '/marketplace' },
  { label: 'Learn',        to: '/how-it-works' },
]

export default function Navbar() {
  const [open]     = useState(false)
  const [mOpen, setMOpen] = useState(false)
  const { pathname } = useLocation()

  function isActive(to) {
    return pathname === to || (to !== '/' && pathname.startsWith(to))
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'rgba(13,17,23,0.95)',
        borderColor: '#21262D',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Logo />

        {/* Center nav — desktop */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(l => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-medium transition-colors"
              style={{ color: isActive(l.to) ? '#00D09C' : '#8B949E' }}
              onMouseEnter={e => { if (!isActive(l.to)) e.currentTarget.style.color = '#C9D1D9' }}
              onMouseLeave={e => { if (!isActive(l.to)) e.currentTarget.style.color = '#8B949E' }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right CTAs — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/dashboard"
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ color: '#8B949E' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#E6EDF3')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8B949E')}
          >
            Sign in
          </Link>
          <Link
            to="/onboarding"
            className="text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
            style={{ backgroundColor: '#00D09C', color: '#0D1117' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#26E5B0')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00D09C')}
          >
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: '#8B949E' }}
          onClick={() => setMOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {mOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mOpen && (
        <div
          className="md:hidden border-t px-4 py-5 flex flex-col gap-4"
          style={{ borderColor: '#21262D', backgroundColor: '#161B22' }}
        >
          {NAV_LINKS.map(l => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-medium"
              style={{ color: isActive(l.to) ? '#00D09C' : '#8B949E' }}
              onClick={() => setMOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <hr style={{ borderColor: '#21262D' }} />
          <Link
            to="/dashboard"
            className="text-sm font-medium"
            style={{ color: '#8B949E' }}
            onClick={() => setMOpen(false)}
          >
            Sign in
          </Link>
          <Link
            to="/onboarding"
            className="text-sm font-bold text-center py-3 rounded-xl"
            style={{ backgroundColor: '#00D09C', color: '#0D1117' }}
            onClick={() => setMOpen(false)}
          >
            Get started — free
          </Link>
        </div>
      )}
    </nav>
  )
}

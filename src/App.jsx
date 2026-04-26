import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BottomNav from './components/layout/BottomNav'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Marketplace from './pages/Marketplace'
import HowItWorks from './pages/HowItWorks'
import StashPass from './pages/StashPass'
import Learn from './pages/Learn'
import Ribbit from './pages/Ribbit'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  const { pathname } = useLocation()
  const isDashboard   = pathname === '/dashboard'
  const isOnboarding  = pathname.startsWith('/onboarding')
  const showBottomNav = ['/dashboard', '/learn', '/ribbit'].includes(pathname)

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0D1117' }}>
      <ScrollToTop />
      {!isOnboarding && <Navbar />}
      <main className={`flex-1 ${showBottomNav ? 'pb-16 md:pb-0' : ''}`}>
        <Routes>
          <Route path="/"              element={<Landing />} />
          <Route path="/marketplace"   element={<Marketplace />} />
          <Route path="/how-it-works"  element={<HowItWorks />} />
          <Route path="/onboarding"    element={<Onboarding />} />
          <Route path="/dashboard"     element={<Dashboard />} />
          <Route path="/products"      element={<Products />} />
          <Route path="/stash-pass"    element={<StashPass />} />
          <Route path="/learn"         element={<Learn />} />
          <Route path="/ribbit"        element={<Ribbit />} />
        </Routes>
      </main>
      {!isOnboarding && !isDashboard && <Footer />}
      {showBottomNav && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

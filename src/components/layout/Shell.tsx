import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { BadgePercent, Bell, Bike, CalendarClock, Compass, CreditCard, Home, MessageCircle, Moon, PanelLeftClose, PanelRightClose, Phone, Plus, Search, Settings, ShoppingBag, Sparkles, SunMoon, UserRound, Users, UtensilsCrossed, Wallet2 } from 'lucide-react'
import { useAppContext } from '../../contexts/AppContext'

const navigationItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/chats', label: 'Chats', icon: MessageCircle },
  { to: '/contacts', label: 'Contacts', icon: Users },
  { to: '/calls', label: 'Calls', icon: Phone },
  { to: '/communities', label: 'Communities', icon: Compass },
]

const serviceItems = [
  { to: '/food', label: 'Food', icon: UtensilsCrossed },
  { to: '/grocery', label: 'Grocery', icon: ShoppingBag },
  { to: '/rides', label: 'Rides', icon: Bike },
  { to: '/payments', label: 'Payments', icon: CreditCard },
  { to: '/wallet', label: 'Wallet', icon: Wallet2 },
  { to: '/offers', label: 'Offers', icon: BadgePercent },
  { to: '/bookings', label: 'Bookings', icon: CalendarClock },
  { to: '/services', label: 'More', icon: Sparkles },
]

export function Shell() {
  const location = useLocation()
  const { theme, setTheme, searchQuery, setSearchQuery, notifications, currentUser, selectedService, setSelectedService } = useAppContext()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const activeLabel = useMemo(() => {
    if (location.pathname.includes('/food')) return 'Food'
    if (location.pathname.includes('/grocery')) return 'Grocery'
    if (location.pathname.includes('/rides')) return 'Rides'
    if (location.pathname.includes('/payments')) return 'Payments'
    if (location.pathname.includes('/wallet')) return 'Wallet'
    if (location.pathname.includes('/contacts')) return 'Contacts'
    if (location.pathname.includes('/chats')) return 'Chats'
    if (location.pathname.includes('/settings')) return 'Settings'
    if (location.pathname.includes('/profile')) return 'Profile'
    return 'Home'
  }, [location.pathname])

  useEffect(() => {
    setSelectedService(activeLabel)
  }, [activeLabel, setSelectedService])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            <span>A</span>
          </div>
          <div>
            <h1>All Around</h1>
            <p>One app. Everything around you.</p>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="section-title">Navigation</div>
          {navigationItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="sidebar-section">
          <div className="section-title">Services</div>
          {serviceItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="sidebar-section footer-card">
          <div className="section-title">Quick Access</div>
          <button type="button" className="ghost-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <Moon size={16} /> : <SunMoon size={16} />}
            <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
          </button>
          <NavLink to="/settings" className="ghost-button">
            <Settings size={16} />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>

      <div className="main-panel">
        <header className="topbar">
          <div className="topbar-left">
            {isDesktop ? null : (
              <button type="button" className="icon-button" onClick={() => setMobileNavOpen((value) => !value)}>
                {mobileNavOpen ? <PanelLeftClose size={18} /> : <PanelRightClose size={18} />}
              </button>
            )}
            <div>
              <p className="eyebrow">{selectedService}</p>
              <h2>{activeLabel}</h2>
            </div>
          </div>

          <div className="topbar-actions">
            <label className="search-pill" aria-label="Global search">
              <Search size={16} />
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search All Around" />
            </label>
            <button type="button" className="icon-button secondary" aria-label="Notifications">
              <Bell size={18} />
              {notifications.filter((item) => !item.read).length > 0 ? <span className="badge">{notifications.filter((item) => !item.read).length}</span> : null}
            </button>
            <NavLink to="/profile" className="profile-pill">
              <div className="avatar-sm">{currentUser.avatar}</div>
              <span>{currentUser.name.split(' ')[0]}</span>
            </NavLink>
          </div>
        </header>

        {mobileNavOpen && !isDesktop ? (
          <div className="mobile-panel">
            {navigationItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`} onClick={() => setMobileNavOpen(false)}>
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
            {serviceItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`} onClick={() => setMobileNavOpen(false)}>
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        ) : null}

        <main className="content-area">
          <Outlet />
        </main>
      </div>

      <nav className="mobile-bottom-nav" aria-label="Bottom navigation">
        <NavLink to="/" className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}>
          <Home size={18} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/chats" className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}>
          <MessageCircle size={18} />
          <span>Chats</span>
        </NavLink>
        <button type="button" className="bottom-nav-center" aria-label="Quick actions">
          <Plus size={20} />
        </button>
        <NavLink to="/food" className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}>
          <UtensilsCrossed size={18} />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}>
          <UserRound size={18} />
          <span>Me</span>
        </NavLink>
      </nav>
    </div>
  )
}

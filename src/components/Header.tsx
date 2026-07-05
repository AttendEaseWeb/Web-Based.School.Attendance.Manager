import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [location])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (path: string) => location === path

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo">
            <img src="/logo.svg" alt="MarkIT" className="logo-img" />
          </Link>

          <nav className={`main-nav${open ? ' open' : ''}`}>
            <Link href="/" className={isActive('/') ? 'active' : ''}>Home</Link>
            <Link href="/features" className={isActive('/features') ? 'active' : ''}>Features</Link>
            <Link href="/pricing" className={isActive('/pricing') ? 'active' : ''}>Pricing</Link>
            <Link href="/manual" className={isActive('/manual') ? 'active' : ''}>User Manual</Link>

            {/* Mobile-only CTA buttons */}
            <div className="mobile-nav-ctas">
              <a href="https://app.getmarkit.app/login" className="btn btn-ghost">Log in</a>
              <a href="https://app.getmarkit.app/signup" className="btn btn-primary">Start free trial</a>
            </div>
          </nav>

          <div className="header-actions">
            <a href="https://app.getmarkit.app/login" className="btn btn-ghost">Log in</a>
            <a href="https://app.getmarkit.app/signup" className="btn btn-primary">Start free trial</a>
          </div>

          <button
            className={`nav-toggle${open ? ' open' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

import { Link } from 'wouter'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <Link href="/" className="logo">
              <img src="/logo.svg" alt="MarkIT" className="logo-img" style={{ height: '32px' }} />
            </Link>
            <p className="footer-tagline">Smart attendance tracking for teachers.</p>
          </div>

          <nav className="footer-nav">
            <div className="footer-nav-group">
              <h3>Product</h3>
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/manual">User Manual</Link>
            </div>

            <div className="footer-nav-group">
              <h3>Company</h3>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div className="footer-nav-group">
              <h3>Legal</h3>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MarkIT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

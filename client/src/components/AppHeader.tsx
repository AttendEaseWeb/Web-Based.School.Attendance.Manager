import { Link, useLocation } from 'wouter'
import { useAuth } from '../hooks/useAuth'

export default function AppHeader() {
  const { teacher, logout } = useAuth()
  const [, navigate] = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="app-header">
      <div className="container">
        <div className="app-header-inner">
          <Link href="/dashboard" className="logo">
            <img src="/logo.svg" alt="MarkIT" className="logo-img" />
          </Link>

          <nav className="app-nav">
            <Link href="/dashboard">Dashboard</Link>
          </nav>

          <div className="app-header-right">
            {teacher && (
              <span className="app-teacher-name">👋 {teacher.name}</span>
            )}
            <button className="btn btn-ghost" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

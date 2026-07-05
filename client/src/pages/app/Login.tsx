import { useState, FormEvent } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
  const { login, teacher } = useAuth()
  const [, navigate] = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (teacher) { navigate('/dashboard'); return null }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <Link href="/" className="auth-logo">
        <img src="/logo.svg" alt="MarkIT" style={{ height: 36 }} />
      </Link>

      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Log in to your teacher account</p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required placeholder="you@school.edu"
              value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
          </div>

          {error && <div className="auth-error" role="alert">{error}</div>}

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link href="/signup" className="link-accent">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}

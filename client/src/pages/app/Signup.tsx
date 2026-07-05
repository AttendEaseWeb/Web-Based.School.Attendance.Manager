import { useState, FormEvent } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuth } from '../../hooks/useAuth'

export default function Signup() {
  const { signup, teacher } = useAuth()
  const [, navigate] = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (teacher) { navigate('/dashboard'); return null }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      await signup(email, name, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Signup failed')
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
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Start tracking attendance for free</p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input id="name" type="text" required placeholder="Ms. Santos"
              value={name} onChange={e => setName(e.target.value)} disabled={loading} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required placeholder="you@school.edu"
              value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>(min 8 characters)</span></label>
            <input id="password" type="password" required placeholder="••••••••" minLength={8}
              value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
          </div>

          {error && <div className="auth-error" role="alert">{error}</div>}

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Creating account…' : 'Create free account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link href="/login" className="link-accent">Log in</Link>
        </p>
      </div>
    </div>
  )
}

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api, Teacher } from '../lib/api'

interface AuthContextValue {
  teacher: Teacher | null
  loading: boolean
  login:  (email: string, password: string) => Promise<void>
  signup: (email: string, name: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.auth.me()
      .then(d => setTeacher(d.teacher))
      .catch(() => setTeacher(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    const d = await api.auth.login({ email, password })
    setTeacher(d.teacher)
  }

  const signup = async (email: string, name: string, password: string) => {
    const d = await api.auth.signup({ email, name, password })
    setTeacher(d.teacher)
  }

  const logout = async () => {
    await api.auth.logout()
    setTeacher(null)
  }

  return (
    <AuthContext.Provider value={{ teacher, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

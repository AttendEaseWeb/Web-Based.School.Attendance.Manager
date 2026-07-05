import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import pool from '../db'
import { signToken, requireAuth, COOKIE_OPTIONS, AuthRequest } from '../middleware/auth'

const router = Router()

// POST /api/auth/signup
router.post('/signup', async (req: Request, res: Response) => {
  const { email, name, password } = req.body
  if (!email || !name || !password) {
    res.status(400).json({ error: 'email, name and password are required' })
    return
  }
  if (password.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters' })
    return
  }
  try {
    const passwordHash = await bcrypt.hash(password, 12)
    const result = await pool.query(
      'INSERT INTO teachers (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
      [email.toLowerCase().trim(), name.trim(), passwordHash]
    )
    const teacher = result.rows[0]
    const token = signToken(teacher.id)
    res.cookie('token', token, COOKIE_OPTIONS)
    res.status(201).json({ teacher })
  } catch (err: any) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'An account with that email already exists' })
    } else {
      console.error('Signup error:', err)
      res.status(500).json({ error: 'Server error' })
    }
  }
})

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ error: 'email and password are required' })
    return
  }
  try {
    const result = await pool.query(
      'SELECT id, email, name, password_hash, created_at FROM teachers WHERE email = $1',
      [email.toLowerCase().trim()]
    )
    const teacher = result.rows[0]
    if (!teacher) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }
    const valid = await bcrypt.compare(password, teacher.password_hash)
    if (!valid) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }
    const token = signToken(teacher.id)
    res.cookie('token', token, COOKIE_OPTIONS)
    res.json({ teacher: { id: teacher.id, email: teacher.email, name: teacher.name, created_at: teacher.created_at } })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/auth/logout
router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('token')
  res.json({ ok: true })
})

// GET /api/auth/me
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, created_at FROM teachers WHERE id = $1',
      [req.teacherId]
    )
    if (!result.rows[0]) {
      res.status(404).json({ error: 'Teacher not found' })
      return
    }
    res.json({ teacher: result.rows[0] })
  } catch (err) {
    console.error('Me error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router

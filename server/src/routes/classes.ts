import { Router, Response } from 'express'
import pool from '../db'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = Router()
router.use(requireAuth)

// GET /api/classes
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT c.*, COUNT(s.id)::int AS student_count
       FROM classes c
       LEFT JOIN students s ON s.class_id = c.id
       WHERE c.teacher_id = $1
       GROUP BY c.id
       ORDER BY c.created_at DESC`,
      [req.teacherId]
    )
    res.json({ classes: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/classes
router.post('/', async (req: AuthRequest, res: Response) => {
  const { name, subject, schedule } = req.body
  if (!name?.trim()) {
    res.status(400).json({ error: 'Class name is required' })
    return
  }
  try {
    const result = await pool.query(
      'INSERT INTO classes (teacher_id, name, subject, schedule) VALUES ($1,$2,$3,$4) RETURNING *',
      [req.teacherId, name.trim(), subject?.trim() || null, schedule?.trim() || null]
    )
    res.status(201).json({ class: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/classes/:id
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM classes WHERE id = $1 AND teacher_id = $2',
      [req.params.id, req.teacherId]
    )
    if (!result.rows[0]) {
      res.status(404).json({ error: 'Class not found' })
      return
    }
    res.json({ class: result.rows[0] })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// PUT /api/classes/:id
router.put('/:id', async (req: AuthRequest, res: Response) => {
  const { name, subject, schedule } = req.body
  if (!name?.trim()) {
    res.status(400).json({ error: 'Class name is required' })
    return
  }
  try {
    const result = await pool.query(
      `UPDATE classes SET name=$1, subject=$2, schedule=$3
       WHERE id=$4 AND teacher_id=$5 RETURNING *`,
      [name.trim(), subject?.trim() || null, schedule?.trim() || null, req.params.id, req.teacherId]
    )
    if (!result.rows[0]) {
      res.status(404).json({ error: 'Class not found' })
      return
    }
    res.json({ class: result.rows[0] })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/classes/:id
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    await pool.query(
      'DELETE FROM classes WHERE id=$1 AND teacher_id=$2',
      [req.params.id, req.teacherId]
    )
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router

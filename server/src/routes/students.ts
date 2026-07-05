import { Router, Response } from 'express'
import pool from '../db'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = Router()
router.use(requireAuth)

// GET /api/classes/:classId/students
router.get('/:classId/students', async (req: AuthRequest, res: Response) => {
  try {
    // Verify class belongs to teacher
    const cls = await pool.query(
      'SELECT id FROM classes WHERE id=$1 AND teacher_id=$2',
      [req.params.classId, req.teacherId]
    )
    if (!cls.rows[0]) {
      res.status(404).json({ error: 'Class not found' })
      return
    }
    const result = await pool.query(
      'SELECT * FROM students WHERE class_id=$1 ORDER BY name ASC',
      [req.params.classId]
    )
    res.json({ students: result.rows })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/classes/:classId/students
router.post('/:classId/students', async (req: AuthRequest, res: Response) => {
  const { name, student_number } = req.body
  if (!name?.trim()) {
    res.status(400).json({ error: 'Student name is required' })
    return
  }
  try {
    const cls = await pool.query(
      'SELECT id FROM classes WHERE id=$1 AND teacher_id=$2',
      [req.params.classId, req.teacherId]
    )
    if (!cls.rows[0]) {
      res.status(404).json({ error: 'Class not found' })
      return
    }
    const result = await pool.query(
      'INSERT INTO students (class_id, name, student_number) VALUES ($1,$2,$3) RETURNING *',
      [req.params.classId, name.trim(), student_number?.trim() || null]
    )
    res.status(201).json({ student: result.rows[0] })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// PUT /api/students/:id
router.put('/student/:id', async (req: AuthRequest, res: Response) => {
  const { name, student_number } = req.body
  if (!name?.trim()) {
    res.status(400).json({ error: 'Student name is required' })
    return
  }
  try {
    // Join to verify teacher ownership
    const result = await pool.query(
      `UPDATE students s SET name=$1, student_number=$2
       FROM classes c
       WHERE s.id=$3 AND s.class_id=c.id AND c.teacher_id=$4
       RETURNING s.*`,
      [name.trim(), student_number?.trim() || null, req.params.id, req.teacherId]
    )
    if (!result.rows[0]) {
      res.status(404).json({ error: 'Student not found' })
      return
    }
    res.json({ student: result.rows[0] })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/students/:id
router.delete('/student/:id', async (req: AuthRequest, res: Response) => {
  try {
    await pool.query(
      `DELETE FROM students s USING classes c
       WHERE s.id=$1 AND s.class_id=c.id AND c.teacher_id=$2`,
      [req.params.id, req.teacherId]
    )
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router

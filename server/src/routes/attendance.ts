import { Router, Response } from 'express'
import pool from '../db'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = Router()
router.use(requireAuth)

// Verify teacher owns the class
async function verifyClass(classId: string, teacherId: string): Promise<boolean> {
  const r = await pool.query('SELECT id FROM classes WHERE id=$1 AND teacher_id=$2', [classId, teacherId])
  return !!r.rows[0]
}

// GET /api/classes/:classId/attendance?date=YYYY-MM-DD
router.get('/:classId/attendance', async (req: AuthRequest, res: Response) => {
  const { date } = req.query
  if (!date) {
    res.status(400).json({ error: 'date query param required (YYYY-MM-DD)' })
    return
  }
  try {
    if (!await verifyClass(String(req.params.classId), req.teacherId!)) {
      res.status(404).json({ error: 'Class not found' })
      return
    }
    const result = await pool.query(
      `SELECT a.student_id, a.status, a.notes
       FROM attendance a
       WHERE a.class_id=$1 AND a.date=$2`,
      [req.params.classId, date]
    )
    res.json({ attendance: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/classes/:classId/attendance
// Body: { date: 'YYYY-MM-DD', records: [{student_id, status, notes?}] }
router.post('/:classId/attendance', async (req: AuthRequest, res: Response) => {
  const { date, records } = req.body
  if (!date || !Array.isArray(records)) {
    res.status(400).json({ error: 'date and records array are required' })
    return
  }
  const validStatuses = ['present', 'absent', 'late', 'excused', 'no_class']
  for (const r of records) {
    if (!r.student_id || !validStatuses.includes(r.status)) {
      res.status(400).json({ error: `Invalid record: ${JSON.stringify(r)}` })
      return
    }
  }
  try {
    if (!await verifyClass(String(req.params.classId), req.teacherId!)) {
      res.status(404).json({ error: 'Class not found' })
      return
    }
    // Upsert each record
    for (const record of records) {
      await pool.query(
        `INSERT INTO attendance (class_id, student_id, date, status, notes)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (student_id, date) DO UPDATE SET status=$4, notes=$5, marked_at=NOW()`,
        [req.params.classId, record.student_id, date, record.status, record.notes || null]
      )
    }
    res.json({ ok: true, saved: records.length })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/classes/:classId/attendance/history?from=YYYY-MM-DD&to=YYYY-MM-DD
router.get('/:classId/attendance/history', async (req: AuthRequest, res: Response) => {
  const { from, to } = req.query
  try {
    if (!await verifyClass(String(req.params.classId), req.teacherId!)) {
      res.status(404).json({ error: 'Class not found' })
      return
    }
    const fromDate = from || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    const toDate = to || new Date().toISOString().slice(0, 10)
    const result = await pool.query(
      `SELECT a.student_id, s.name AS student_name, a.date, a.status, a.notes
       FROM attendance a
       JOIN students s ON s.id = a.student_id
       WHERE a.class_id=$1 AND a.date BETWEEN $2 AND $3
       ORDER BY a.date DESC, s.name ASC`,
      [req.params.classId, fromDate, toDate]
    )
    res.json({ records: result.rows })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/classes/:classId/attendance/export.csv
router.get('/:classId/attendance/export.csv', async (req: AuthRequest, res: Response) => {
  const { from, to } = req.query
  try {
    if (!await verifyClass(String(req.params.classId), req.teacherId!)) {
      res.status(404).json({ error: 'Class not found' })
      return
    }
    const fromDate = from || new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    const toDate = to || new Date().toISOString().slice(0, 10)

    const studentsResult = await pool.query(
      'SELECT id, name FROM students WHERE class_id=$1 ORDER BY name ASC',
      [req.params.classId]
    )
    const students = studentsResult.rows

    const attendanceResult = await pool.query(
      `SELECT student_id, date::text, status FROM attendance
       WHERE class_id=$1 AND date BETWEEN $2 AND $3`,
      [req.params.classId, fromDate, toDate]
    )

    // Get unique dates
    const dateSet = new Set(attendanceResult.rows.map((r: any) => r.date as string))
    const dates = Array.from(dateSet).sort()

    // Build lookup: { studentId: { date: status } }
    const lookup: Record<string, Record<string, string>> = {}
    for (const row of attendanceResult.rows) {
      if (!lookup[row.student_id]) lookup[row.student_id] = {}
      lookup[row.student_id][row.date] = row.status
    }

    // Build CSV
    const header = ['Name', ...dates].join(',')
    const rows = students.map((s: any) => {
      const statuses = dates.map(d => lookup[s.id]?.[d] || '')
      return [s.name, ...statuses].join(',')
    })
    const csv = [header, ...rows].join('\n')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename="attendance-${toDate}.csv"`)
    res.send(csv)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router

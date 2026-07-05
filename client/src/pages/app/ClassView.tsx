import { useEffect, useState, useCallback } from 'react'
import { Link, useParams, useLocation } from 'wouter'
import AppHeader from '../../components/AppHeader'
import { api, Student, AttendanceRecord, AttendanceStatus, HistoryRecord } from '../../lib/api'

const STATUS_CONFIG: { status: AttendanceStatus; label: string; short: string; color: string; bg: string }[] = [
  { status: 'present',  label: 'Present',  short: 'P', color: 'var(--present)', bg: 'rgba(34,197,94,0.15)' },
  { status: 'absent',   label: 'Absent',   short: 'A', color: 'var(--absent)',  bg: 'rgba(239,68,68,0.15)' },
  { status: 'late',     label: 'Late',     short: 'L', color: 'var(--late)',    bg: 'rgba(245,158,11,0.15)' },
  { status: 'excused',  label: 'Excused',  short: 'E', color: 'var(--excused)', bg: 'rgba(168,85,247,0.15)' },
  { status: 'no_class', label: 'No class', short: '–', color: 'var(--no-class)', bg: 'rgba(100,116,139,0.15)' },
]

type Tab = 'mark' | 'history'

export default function ClassView() {
  const { id } = useParams<{ id: string }>()
  const [location] = useLocation()
  const searchDate = new URLSearchParams(location.split('?')[1] || '').get('date')
  const today = new Date().toISOString().slice(0, 10)
  const [date, setDate] = useState(searchDate || today)

  const [cls, setCls] = useState<{ name: string; subject: string | null } | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [marks, setMarks] = useState<Record<string, AttendanceStatus>>({})
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('mark')
  const [history, setHistory] = useState<HistoryRecord[]>([])
  const [historyLoading, setHistoryLoading] = useState(false)

  const loadClass = useCallback(async () => {
    const [clsData, studentsData] = await Promise.all([
      api.classes.get(id),
      api.students.list(id),
    ])
    setCls(clsData.class)
    setStudents(studentsData.students)
  }, [id])

  const loadAttendance = useCallback(async () => {
    try {
      const d = await api.attendance.get(id, date)
      const m: Record<string, AttendanceStatus> = {}
      d.attendance.forEach((r: AttendanceRecord) => { m[r.student_id] = r.status })
      setMarks(m)
    } catch { setMarks({}) }
  }, [id, date])

  useEffect(() => {
    setLoading(true)
    Promise.all([loadClass(), loadAttendance()]).finally(() => setLoading(false))
  }, [loadClass, loadAttendance])

  const mark = (studentId: string, status: AttendanceStatus) => {
    setSaved(false)
    setMarks(prev => ({ ...prev, [studentId]: status }))
  }

  const saveAll = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const records = students.map(s => ({
        student_id: s.id,
        status: marks[s.id] || 'absent',
      }))
      await api.attendance.save(id, { date, records })
      setSaved(true)
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  const loadHistory = async () => {
    setHistoryLoading(true)
    try {
      const d = await api.attendance.history(id)
      setHistory(d.records)
    } catch { setHistory([]) }
    finally { setHistoryLoading(false) }
  }

  const switchTab = (t: Tab) => {
    setTab(t)
    if (t === 'history' && history.length === 0) loadHistory()
  }

  // Group history by student
  const historyByStudent: Record<string, HistoryRecord[]> = {}
  history.forEach(r => {
    if (!historyByStudent[r.student_id]) historyByStudent[r.student_id] = []
    historyByStudent[r.student_id].push(r)
  })

  const markedCount = Object.keys(marks).length
  const presentCount = Object.values(marks).filter(s => s === 'present').length

  return (
    <>
      <AppHeader />
      <main className="classview-main">
        <div className="container">
          {loading ? (
            <div className="app-loading"><div className="spinner" /></div>
          ) : (
            <>
              {/* Breadcrumb */}
              <p className="breadcrumb">
                <Link href="/dashboard" className="link-accent">Dashboard</Link> / {cls?.name}
              </p>

              <div className="classview-header">
                <div>
                  <h1 className="classview-title">{cls?.name}</h1>
                  {cls?.subject && <p style={{ color: 'var(--text-muted)' }}>{cls.subject}</p>}
                </div>
                <div className="classview-header-actions">
                  <a
                    href={api.attendance.exportCsvUrl(id)}
                    className="btn btn-ghost"
                    download
                  >
                    📊 Export CSV
                  </a>
                  <Link href={`/classes/${id}/students`} className="btn btn-ghost">
                    👥 Manage students
                  </Link>
                </div>
              </div>

              {/* Tabs */}
              <div className="tabs">
                <button className={`tab${tab === 'mark' ? ' tab-active' : ''}`} onClick={() => switchTab('mark')}>
                  📝 Mark Attendance
                </button>
                <button className={`tab${tab === 'history' ? ' tab-active' : ''}`} onClick={() => switchTab('history')}>
                  📅 History
                </button>
              </div>

              {tab === 'mark' && (
                <>
                  {/* Date + summary */}
                  <div className="mark-controls">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="att-date">Date</label>
                      <input id="att-date" type="date" value={date} max={today}
                        onChange={e => setDate(e.target.value)}
                        style={{ width: 'auto', display: 'inline-block' }}
                      />
                    </div>
                    <div className="mark-stats">
                      <span className="stat-chip" style={{ color: 'var(--present)' }}>✔ {presentCount} present</span>
                      <span className="stat-chip" style={{ color: 'var(--text-muted)' }}>{markedCount}/{students.length} marked</span>
                    </div>
                  </div>

                  {students.length === 0 && (
                    <div className="empty-state">
                      <div className="empty-icon">👥</div>
                      <h2>No students yet</h2>
                      <p>Add students to this class before marking attendance.</p>
                      <Link href={`/classes/${id}/students`} className="btn btn-primary btn-lg">Add students</Link>
                    </div>
                  )}

                  {students.length > 0 && (
                    <>
                      <ul className="student-list">
                        {students.map((s, i) => {
                          const current = marks[s.id]
                          return (
                            <li key={s.id} className="student-row">
                              <div className="student-info">
                                <span className="student-index">{i + 1}</span>
                                <div>
                                  <span className="student-name">{s.name}</span>
                                  {s.student_number && (
                                    <span className="student-num">#{s.student_number}</span>
                                  )}
                                </div>
                              </div>
                              <div className="status-btns">
                                {STATUS_CONFIG.map(cfg => (
                                  <button
                                    key={cfg.status}
                                    className="status-btn"
                                    style={current === cfg.status ? {
                                      background: cfg.bg,
                                      color: cfg.color,
                                      borderColor: cfg.color,
                                    } : {}}
                                    onClick={() => mark(s.id, cfg.status)}
                                    title={cfg.label}
                                  >
                                    {cfg.short}
                                  </button>
                                ))}
                              </div>
                            </li>
                          )
                        })}
                      </ul>

                      <div className="save-bar">
                        {saved && <span className="save-ok">✅ Saved!</span>}
                        <button
                          className="btn btn-primary btn-lg"
                          onClick={saveAll}
                          disabled={saving}
                        >
                          {saving ? 'Saving…' : 'Save attendance'}
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {tab === 'history' && (
                <div className="history-section">
                  {historyLoading && <div className="app-loading"><div className="spinner" /></div>}
                  {!historyLoading && history.length === 0 && (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No attendance records yet.</p>
                  )}
                  {!historyLoading && Object.entries(historyByStudent).map(([studentId, records]) => {
                    const name = records[0].student_name
                    const totals = { present: 0, absent: 0, late: 0, excused: 0, no_class: 0 }
                    records.forEach(r => { totals[r.status]++ })
                    return (
                      <div key={studentId} className="history-student">
                        <div className="history-student-header">
                          <span className="history-student-name">{name}</span>
                          <div className="history-totals">
                            {[
                              { s: 'present', color: 'var(--present)' },
                              { s: 'absent',  color: 'var(--absent)' },
                              { s: 'late',    color: 'var(--late)' },
                            ].map(({ s, color }) => (
                              <span key={s} style={{ color, fontSize: 13, fontWeight: 600 }}>
                                {totals[s as keyof typeof totals]} {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="history-records">
                          {records.slice(0, 30).map(r => {
                            const cfg = STATUS_CONFIG.find(c => c.status === r.status)!
                            return (
                              <div key={r.date} className="history-record">
                                <span className="history-date">{r.date}</span>
                                <span className="history-badge" style={{ color: cfg.color, background: cfg.bg }}>
                                  {cfg.label}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

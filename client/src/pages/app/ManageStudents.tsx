import { useEffect, useState, FormEvent } from 'react'
import { Link, useParams } from 'wouter'
import AppHeader from '../../components/AppHeader'
import { api, Student } from '../../lib/api'

export default function ManageStudents() {
  const { id: classId } = useParams<{ id: string }>()
  const [className, setClassName] = useState('')
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Add form
  const [name, setName] = useState('')
  const [studentNumber, setStudentNumber] = useState('')
  const [adding, setAdding] = useState(false)
  const [addError, setAddError] = useState('')

  // Bulk import textarea
  const [bulkText, setBulkText] = useState('')
  const [bulkMode, setBulkMode] = useState(false)
  const [bulkAdding, setBulkAdding] = useState(false)

  const load = async () => {
    try {
      const [clsData, studentsData] = await Promise.all([
        api.classes.get(classId),
        api.students.list(classId),
      ])
      setClassName(clsData.class.name)
      setStudents(studentsData.students)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [classId])

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault()
    setAddError('')
    setAdding(true)
    try {
      const d = await api.students.create(classId, { name, student_number: studentNumber })
      setStudents(prev => [...prev, d.student].sort((a, b) => a.name.localeCompare(b.name)))
      setName(''); setStudentNumber('')
    } catch (err: any) {
      setAddError(err.message)
    } finally {
      setAdding(false)
    }
  }

  const handleBulkImport = async () => {
    const names = bulkText.split('\n').map(n => n.trim()).filter(Boolean)
    if (!names.length) return
    setBulkAdding(true)
    try {
      const added: Student[] = []
      for (const n of names) {
        const d = await api.students.create(classId, { name: n })
        added.push(d.student)
      }
      setStudents(prev => [...prev, ...added].sort((a, b) => a.name.localeCompare(b.name)))
      setBulkText('')
      setBulkMode(false)
    } catch (err: any) {
      setAddError(err.message)
    } finally {
      setBulkAdding(false)
    }
  }

  const handleDelete = async (s: Student) => {
    if (!confirm(`Remove "${s.name}" from this class?`)) return
    try {
      await api.students.delete(s.id)
      setStudents(prev => prev.filter(st => st.id !== s.id))
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <>
      <AppHeader />
      <main className="classview-main">
        <div className="container" style={{ maxWidth: 720 }}>
          {loading ? (
            <div className="app-loading"><div className="spinner" /></div>
          ) : (
            <>
              <p className="breadcrumb">
                <Link href="/dashboard" className="link-accent">Dashboard</Link>
                {' / '}
                <Link href={`/classes/${classId}`} className="link-accent">{className}</Link>
                {' / Students'}
              </p>

              <div className="classview-header">
                <h1 className="classview-title">Manage Students</h1>
                <span style={{ color: 'var(--text-muted)', fontSize: 15 }}>{students.length} students</span>
              </div>

              {error && <div className="auth-error">{error}</div>}

              {/* Add form */}
              <div className="add-student-card">
                <div className="add-student-tabs">
                  <button className={`tab${!bulkMode ? ' tab-active' : ''}`} onClick={() => setBulkMode(false)}>
                    Add one
                  </button>
                  <button className={`tab${bulkMode ? ' tab-active' : ''}`} onClick={() => setBulkMode(true)}>
                    Bulk import
                  </button>
                </div>

                {!bulkMode ? (
                  <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
                      <label htmlFor="sname">Full name *</label>
                      <input id="sname" type="text" required placeholder="Maria Santos"
                        value={name} onChange={e => setName(e.target.value)} disabled={adding} />
                    </div>
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label htmlFor="snum">Student # (optional)</label>
                      <input id="snum" type="text" placeholder="2024-0001"
                        value={studentNumber} onChange={e => setStudentNumber(e.target.value)} disabled={adding} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={adding} style={{ alignSelf: 'flex-end' }}>
                      {adding ? 'Adding…' : '+ Add'}
                    </button>
                  </form>
                ) : (
                  <div>
                    <label className="form-group" style={{ display: 'block', marginBottom: 8 }}>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>One student name per line</span>
                    </label>
                    <textarea
                      rows={6}
                      placeholder={"Maria Santos\nJohn Cruz\nAna Reyes"}
                      className="payment-form-input"
                      style={{ width: '100%', resize: 'vertical', fontFamily: 'var(--font-mono)', fontSize: 14 }}
                      value={bulkText}
                      onChange={e => setBulkText(e.target.value)}
                      disabled={bulkAdding}
                    />
                    <button className="btn btn-primary" onClick={handleBulkImport} disabled={bulkAdding || !bulkText.trim()}>
                      {bulkAdding ? 'Importing…' : `Import ${bulkText.split('\n').filter(l => l.trim()).length} students`}
                    </button>
                  </div>
                )}
                {addError && <div className="auth-error" style={{ marginTop: 8 }}>{addError}</div>}
              </div>

              {/* Student list */}
              {students.length === 0 ? (
                <div className="empty-state" style={{ padding: '40px 0' }}>
                  <div className="empty-icon">👥</div>
                  <p>No students yet. Add your first student above.</p>
                </div>
              ) : (
                <ul className="student-list" style={{ marginTop: 24 }}>
                  {students.map((s, i) => (
                    <li key={s.id} className="student-row">
                      <div className="student-info">
                        <span className="student-index">{i + 1}</span>
                        <div>
                          <span className="student-name">{s.name}</span>
                          {s.student_number && <span className="student-num">#{s.student_number}</span>}
                        </div>
                      </div>
                      <button
                        className="btn btn-ghost btn-sm btn-danger"
                        onClick={() => handleDelete(s)}
                        title="Remove student"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div style={{ marginTop: 32 }}>
                <Link href={`/classes/${classId}`} className="btn btn-ghost">
                  ← Back to attendance
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}

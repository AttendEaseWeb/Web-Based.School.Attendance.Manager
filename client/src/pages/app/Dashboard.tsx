import { useEffect, useState, FormEvent } from 'react'
import { Link } from 'wouter'
import AppHeader from '../../components/AppHeader'
import { api, Class } from '../../lib/api'

export default function Dashboard() {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // New class modal
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newSubject, setNewSubject] = useState('')
  const [newSchedule, setNewSchedule] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const load = async () => {
    try {
      const d = await api.classes.list()
      setClasses(d.classes)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()
    setSaveError('')
    setSaving(true)
    try {
      await api.classes.create({ name: newName, subject: newSubject, schedule: newSchedule })
      setShowModal(false)
      setNewName(''); setNewSubject(''); setNewSchedule('')
      load()
    } catch (err: any) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (cls: Class) => {
    if (!confirm(`Delete "${cls.name}"? All students and attendance records will be permanently deleted.`)) return
    try {
      await api.classes.delete(cls.id)
      setClasses(prev => prev.filter(c => c.id !== cls.id))
    } catch (e: any) {
      alert(e.message)
    }
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <>
      <AppHeader />
      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-top">
            <div>
              <h1 className="dashboard-title">My Classes</h1>
              <p className="dashboard-sub">{classes.length} {classes.length === 1 ? 'class' : 'classes'}</p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New class</button>
          </div>

          {loading && <div className="app-loading"><div className="spinner" /></div>}
          {error && <div className="auth-error">{error}</div>}

          {!loading && classes.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h2>No classes yet</h2>
              <p>Create your first class to start tracking attendance.</p>
              <button className="btn btn-primary btn-lg" onClick={() => setShowModal(true)}>Create a class</button>
            </div>
          )}

          <div className="class-grid">
            {classes.map(cls => (
              <div key={cls.id} className="class-card">
                <div className="class-card-top">
                  <div>
                    <h2 className="class-name">{cls.name}</h2>
                    {cls.subject && <p className="class-subject">{cls.subject}</p>}
                    {cls.schedule && <p className="class-schedule">🕐 {cls.schedule}</p>}
                  </div>
                  <div className="class-student-count">
                    <span className="count-num">{cls.student_count}</span>
                    <span className="count-label">students</span>
                  </div>
                </div>
                <div className="class-card-actions">
                  <Link href={`/classes/${cls.id}?date=${today}`} className="btn btn-primary">
                    📝 Mark today
                  </Link>
                  <Link href={`/classes/${cls.id}/students`} className="btn btn-ghost">
                    👥 Students
                  </Link>
                  <button className="btn btn-ghost btn-danger" onClick={() => handleDelete(cls)} title="Delete class">
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">New class</h2>
            <form onSubmit={handleCreate} className="auth-form">
              <div className="form-group">
                <label htmlFor="cn">Class name *</label>
                <input id="cn" type="text" required placeholder="e.g. Section A"
                  value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="cs">Subject</label>
                <input id="cs" type="text" placeholder="e.g. Mathematics"
                  value={newSubject} onChange={e => setNewSubject(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="csch">Schedule</label>
                <input id="csch" type="text" placeholder="e.g. MWF 9:00–10:00 AM"
                  value={newSchedule} onChange={e => setNewSchedule(e.target.value)} />
              </div>
              {saveError && <div className="auth-error">{saveError}</div>}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Creating…' : 'Create class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

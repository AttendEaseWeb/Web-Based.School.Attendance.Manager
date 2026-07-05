const BASE = '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data as T
}

// ── Auth ──────────────────────────────────────────────
export const api = {
  auth: {
    me:     ()                           => request<{ teacher: Teacher }>('/auth/me'),
    signup: (body: SignupBody)           => request<{ teacher: Teacher }>('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
    login:  (body: LoginBody)            => request<{ teacher: Teacher }>('/auth/login',  { method: 'POST', body: JSON.stringify(body) }),
    logout: ()                           => request<{ ok: true }>('/auth/logout', { method: 'POST' }),
  },
  classes: {
    list:   ()                           => request<{ classes: Class[] }>('/classes'),
    get:    (id: string)                 => request<{ class: Class }>(`/classes/${id}`),
    create: (body: ClassBody)            => request<{ class: Class }>('/classes', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: ClassBody)=> request<{ class: Class }>(`/classes/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (id: string)                 => request<{ ok: true }>(`/classes/${id}`, { method: 'DELETE' }),
  },
  students: {
    list:   (classId: string)            => request<{ students: Student[] }>(`/classes/${classId}/students`),
    create: (classId: string, body: StudentBody) =>
      request<{ student: Student }>(`/classes/${classId}/students`, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: StudentBody) =>
      request<{ student: Student }>(`/students/student/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (id: string)                 => request<{ ok: true }>(`/students/student/${id}`, { method: 'DELETE' }),
  },
  attendance: {
    get:    (classId: string, date: string) =>
      request<{ attendance: AttendanceRecord[] }>(`/classes/${classId}/attendance?date=${date}`),
    save:   (classId: string, body: SaveAttendanceBody) =>
      request<{ ok: true; saved: number }>(`/classes/${classId}/attendance`, { method: 'POST', body: JSON.stringify(body) }),
    history:(classId: string, from?: string, to?: string) =>
      request<{ records: HistoryRecord[] }>(`/classes/${classId}/attendance/history?from=${from ?? ''}&to=${to ?? ''}`),
    exportCsvUrl: (classId: string, from?: string, to?: string) =>
      `${BASE}/classes/${classId}/attendance/export.csv?from=${from ?? ''}&to=${to ?? ''}`,
  },
}

// ── Types ─────────────────────────────────────────────
export interface Teacher { id: string; email: string; name: string; created_at: string }
export interface Class   { id: string; teacher_id: string; name: string; subject: string | null; schedule: string | null; student_count: number; created_at: string }
export interface Student { id: string; class_id: string; name: string; student_number: string | null; created_at: string }
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused' | 'no_class'
export interface AttendanceRecord { student_id: string; status: AttendanceStatus; notes: string | null }
export interface HistoryRecord { student_id: string; student_name: string; date: string; status: AttendanceStatus; notes: string | null }

interface SignupBody  { email: string; name: string; password: string }
interface LoginBody   { email: string; password: string }
interface ClassBody   { name: string; subject?: string; schedule?: string }
interface StudentBody { name: string; student_number?: string }
interface SaveAttendanceBody { date: string; records: { student_id: string; status: AttendanceStatus; notes?: string }[] }

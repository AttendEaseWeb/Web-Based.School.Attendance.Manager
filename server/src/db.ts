import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export default pool

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS teachers (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email       TEXT UNIQUE NOT NULL,
      name        TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS classes (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      teacher_id  UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
      name        TEXT NOT NULL,
      subject     TEXT,
      schedule    TEXT,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS students (
      id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      class_id       UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
      name           TEXT NOT NULL,
      student_number TEXT,
      created_at     TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS attendance (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      class_id   UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
      student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      date       DATE NOT NULL,
      status     TEXT NOT NULL CHECK (status IN ('present','absent','late','excused','no_class')),
      notes      TEXT,
      marked_at  TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (student_id, date)
    );
  `)
  console.log('Database schema ready')
}

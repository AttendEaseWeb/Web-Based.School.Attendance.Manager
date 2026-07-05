import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { initDb } from './db'
import authRouter from './routes/auth'
import classesRouter from './routes/classes'
import studentsRouter from './routes/students'
import attendanceRouter from './routes/attendance'

const app = express()
const PORT = process.env.PORT || 3001

// CORS — allow the Vite dev server in development
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? false
    : [`http://localhost:5173`, `http://localhost:4173`],
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

// API routes
app.use('/api/auth', authRouter)
app.use('/api/classes', classesRouter)
app.use('/api/classes', studentsRouter)   // /:classId/students
app.use('/api/classes', attendanceRouter) // /:classId/attendance
app.use('/api/students', studentsRouter)  // /student/:id (edit/delete)

// Serve React SPA in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../../dist/public')
  app.use(express.static(clientDist))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

async function start() {
  try {
    await initDb()
    app.listen(PORT, () => {
      console.log(`MarkIT server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()

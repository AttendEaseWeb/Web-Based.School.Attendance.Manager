# MarkIT — Web-Based School Attendance Management System

A full-stack teacher attendance tracking application. Teachers can create classes, manage student rosters, mark daily attendance (Present / Absent / Late / Excused), view attendance history, and export records to CSV.

**GitHub:** https://github.com/AttendEaseWeb/Web-Based.School.Attendance.Manager  
**Live demo:** https://www.getmarkit.app

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript |
| Routing | Wouter |
| Backend | Express.js + TypeScript |
| Database | PostgreSQL |
| Auth | JWT (httpOnly cookies) |
| Passwords | bcrypt |
| Styling | Plain CSS (dark theme, custom properties) |
| Deployment | Render (Node.js Web Service + Managed PostgreSQL) |

---

## Features

- 🔐 **Teacher accounts** — signup / login / logout (JWT, secure cookies)
- 📋 **Classes** — create, edit, delete classes with name, subject, schedule
- 👥 **Students** — add students one by one or bulk-import from a list
- 📝 **Daily attendance marking** — Present / Absent / Late / Excused / No Class per student per date
- 📅 **Attendance history** — view per-student records grouped by date
- 📊 **CSV export** — download any class's attendance as a spreadsheet
- 🌐 **Marketing site** — public landing page, features, and pricing pages

---

## Project Structure

```
├── client/                  # React frontend (Vite)
│   ├── index.html
│   └── src/
│       ├── components/      # Header, Footer, FAQ, AppHeader
│       ├── hooks/           # useAuth (auth context)
│       ├── lib/             # api.ts (typed fetch wrapper)
│       ├── pages/
│       │   ├── app/         # Login, Signup, Dashboard, ClassView, ManageStudents
│       │   └── *.tsx        # Marketing pages (Home, Features, Pricing…)
│       ├── App.tsx          # Router — marketing vs app layout
│       └── index.css        # All styles
├── server/
│   └── src/
│       ├── db.ts            # PostgreSQL pool + schema init
│       ├── index.ts         # Express entry point
│       ├── middleware/
│       │   └── auth.ts      # JWT middleware
│       └── routes/
│           ├── auth.ts      # signup, login, logout, me
│           ├── classes.ts   # CRUD classes
│           ├── students.ts  # CRUD students
│           └── attendance.ts # mark, history, CSV export
├── .env.example
├── render.yaml              # One-click Render deployment
├── vite.config.ts
├── tsconfig.json            # Client TypeScript config
└── tsconfig.server.json     # Server TypeScript config
```

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/signup` | Create teacher account |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/auth/me` | Get current teacher |
| GET | `/api/classes` | List your classes |
| POST | `/api/classes` | Create a class |
| GET | `/api/classes/:id` | Get a class |
| PUT | `/api/classes/:id` | Update a class |
| DELETE | `/api/classes/:id` | Delete a class |
| GET | `/api/classes/:id/students` | List students |
| POST | `/api/classes/:id/students` | Add a student |
| PUT | `/api/students/student/:id` | Update a student |
| DELETE | `/api/students/student/:id` | Remove a student |
| GET | `/api/classes/:id/attendance?date=` | Get attendance for a date |
| POST | `/api/classes/:id/attendance` | Save attendance records |
| GET | `/api/classes/:id/attendance/history` | Attendance history |
| GET | `/api/classes/:id/attendance/export.csv` | Download CSV |

---

## Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL running locally

### Setup

```bash
# 1. Clone
git clone https://github.com/AttendEaseWeb/Web-Based.School.Attendance.Manager.git
cd Web-Based.School.Attendance.Manager

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your local PostgreSQL connection string and a JWT secret

# 4. Create the database
createdb markit
# (The app creates tables automatically on first run)

# 5. Start both servers
npm run dev
```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:3001  
- The Vite dev server proxies `/api` requests to the Express server automatically.

### Individual commands

```bash
npm run dev:server   # Express server only (hot-reload with tsx)
npm run dev:client   # Vite frontend only
npm run build        # Build both for production
npm start            # Start the production server
npm run typecheck    # TypeScript check (client + server)
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Random secret for signing tokens (min 32 chars) |
| `PORT` | Optional | Server port (default: 3001) |
| `NODE_ENV` | Optional | Set to `production` on Render |
| `VITE_N8N_WEBHOOK_URL` | Optional | Pricing page webhook |

---

## Deployment on Render

### One-click via Blueprint (recommended)

1. Push this repo to GitHub
2. Go to [dashboard.render.com](https://dashboard.render.com) → **New → Blueprint**
3. Connect your GitHub account → select this repository
4. Render detects `render.yaml` and creates:
   - A **Node.js Web Service** for the app
   - A **PostgreSQL database** (free tier)
   - Auto-generates a secure `JWT_SECRET`
   - Wires `DATABASE_URL` automatically
5. Click **Apply** — live in ~5 minutes

### Manual setup

1. **Create a PostgreSQL database** on Render (free tier) → copy the **Internal Database URL**
2. **Create a Web Service** → connect this repo
   - **Environment:** Node
   - **Build command:** `npm install && npm run build`
   - **Start command:** `npm start`
3. Add environment variables:
   - `DATABASE_URL` — paste the Internal Database URL
   - `JWT_SECRET` — a long random string
   - `NODE_ENV` — `production`
4. Deploy

---

## License

© 2024 MarkIT. All rights reserved.

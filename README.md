# MarkIT — Web-Based School Attendance Management System

A pixel-perfect marketing site clone of [getmarkit.app](https://www.getmarkit.app/) — a teacher attendance PWA. Built with React 18 + Vite + TypeScript using plain CSS (no Tailwind). Works as a fully client-side SPA.

**GitHub:** https://github.com/AttendEaseWeb/Web-Based.School.Attendance.Manager

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Routing | Wouter |
| Bundler | Vite 6 |
| Language | TypeScript |
| Styling | Plain CSS (custom properties, no Tailwind) |
| Fonts | Google Fonts — Inter, Plus Jakarta Sans, JetBrains Mono |
| Deployment | Render (Static Site) |

---

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, how it works, features grid, testimonial, pricing summary, FAQ, CTA |
| `/features` | Features — 9 alternating detail sections with UI mockups |
| `/pricing` | Pricing — Free vs Annual plan cards, payment email form, FAQ |
| `/manual` | User Manual |
| `/about` | About |
| `/contact` | Contact |
| `/terms` | Terms of Service |
| `/privacy` | Privacy Policy |

---

## Local Development

### Prerequisites
- Node.js 18 or later
- npm 9 or later

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/AttendEaseWeb/Web-Based.School.Attendance.Manager.git
cd Web-Based.School.Attendance.Manager

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at http://localhost:5173

---

## Environment Variables

Copy `.env.example` to `.env` and set the values:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Dev/preview server port | `5173` |
| `VITE_N8N_WEBHOOK_URL` | n8n webhook for the pricing email form | See `.env.example` |

---

## Build

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

The built files are output to `dist/`.

---

## Deployment on Render

This project includes a `render.yaml` for one-click deployment.

### Option A — Using render.yaml (recommended)

1. Push this repository to GitHub
2. Go to [dashboard.render.com](https://dashboard.render.com) → **New** → **Blueprint**
3. Connect your GitHub account and select this repository
4. Render will detect `render.yaml` and configure the service automatically
5. Click **Apply** — the site will be live in ~2 minutes

### Option B — Manual Static Site

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New** → **Static Site**
2. Connect this repository
3. Set:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Under **Redirects/Rewrites**, add a rule: `Source: /*` → `Destination: /index.html` → **Rewrite** (for SPA routing)
5. Click **Create Static Site**

---

## Project Structure

```
├── public/               # Static assets served as-is
│   ├── logo.svg
│   ├── favicon.png / .svg
│   ├── student-card-2.webp
│   └── attendance.mp4
├── src/
│   ├── components/
│   │   ├── Header.tsx    # Sticky nav with mobile hamburger menu
│   │   ├── Footer.tsx
│   │   ├── FAQ.tsx       # Accessible accordion
│   │   └── CTABanner.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   └── Stubs.tsx     # Manual, About, Contact, Terms, Privacy
│   ├── App.tsx           # Router setup
│   ├── main.tsx          # Entry point
│   └── index.css         # All styles (CSS custom properties)
├── index.html
├── vite.config.ts
├── tsconfig.json
├── render.yaml           # Render deployment config
├── .env.example          # Environment variable template
└── package.json
```

---

## License

© 2024 MarkIT. All rights reserved.

import { Link } from 'wouter'
import CTABanner from '../components/CTABanner'

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SwipeVisual = () => (
  <div className="offline-visual" style={{ textAlign: 'center', padding: '32px 24px' }}>
    <div style={{ fontSize: '80px', marginBottom: '12px' }}>👆</div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
      {[
        { label: 'Present', color: 'var(--present)', bg: 'rgba(34,197,94,0.12)' },
        { label: 'Absent',  color: 'var(--absent)',  bg: 'rgba(239,68,68,0.12)' },
        { label: 'Late',    color: 'var(--late)',    bg: 'rgba(245,158,11,0.12)' },
        { label: 'Excused', color: 'var(--excused)', bg: 'rgba(168,85,247,0.12)' },
      ].map(s => (
        <span key={s.label} style={{
          background: s.bg, color: s.color, fontWeight: 700, fontSize: '14px',
          padding: '6px 14px', borderRadius: '100px'
        }}>{s.label}</span>
      ))}
    </div>
    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '16px', maxWidth: 'none' }}>
      Swipe right = Present · Swipe left = Absent<br />Tap for more options
    </p>
  </div>
)

const OfflineVisual = () => (
  <div className="offline-visual">
    <div className="offline-badge">
      <div className="offline-dot" />
      <span>Offline mode active</span>
    </div>
    <div className="offline-queue">
      {[
        { name: 'Maria Santos',   status: 'Present', color: 'var(--present)' },
        { name: 'John Cruz',      status: 'Absent',  color: 'var(--absent)' },
        { name: 'Ana Reyes',      status: 'Late',    color: 'var(--late)' },
        { name: 'Carlos Dizon',   status: 'Present', color: 'var(--present)' },
      ].map(s => (
        <div key={s.name} className="queue-item">
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: s.color, flexShrink: 0
          }} />
          <span className="queue-name">{s.name}</span>
          <span className="queue-status" style={{ color: s.color, fontWeight: 600 }}>{s.status}</span>
        </div>
      ))}
    </div>
    <p className="offline-note">Changes will sync when you're back online ☁️</p>
  </div>
)

const CalendarVisual = () => {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const cells = [
    'P','P','A','P','P','–','–',
    'P','L','P','P','A','–','–',
    'A','P','P','P','P','–','–',
    'P','P','P','L','P','–','–',
  ]
  const colorMap: Record<string, string> = {
    P: 'cal-present', A: 'cal-absent', L: 'cal-late', '–': 'cal-none'
  }
  return (
    <div className="calendar-visual">
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontWeight: 700, marginBottom: '4px', fontSize: '15px' }}>Maria Santos — October 2024</p>
        <div className="calendar-legend" style={{ marginTop: '8px' }}>
          {[
            { label: 'Present', cls: 'badge badge-present' },
            { label: 'Absent',  cls: 'badge badge-absent' },
            { label: 'Late',    cls: 'badge badge-late' },
          ].map(b => (
            <span key={b.label} className={b.cls}>{b.label}</span>
          ))}
        </div>
      </div>
      <div className="calendar-grid cal-mt">
        {days.map(d => <div key={d} className="cal-cell cal-header">{d[0]}</div>)}
        {cells.map((c, i) => (
          <div key={i} className={`cal-cell ${colorMap[c]}`}>{c}</div>
        ))}
      </div>
    </div>
  )
}

const FlaggedVisual = () => (
  <div className="flagged-visual">
    <p className="flagged-title">⚠️ Students needing attention</p>
    <div className="flagged-list">
      {[
        { name: 'John Cruz',    sub: '4 absences this month', badge: 'absent', label: 'High Risk' },
        { name: 'Ana Reyes',   sub: '3 late arrivals',        badge: 'late',   label: 'Late Pattern' },
        { name: 'Mark Bernal', sub: '3 absences this month',  badge: 'absent', label: 'At Risk' },
      ].map(s => (
        <div key={s.name} className="flagged-item">
          <div className="flagged-info">
            <span className="flagged-name">{s.name}</span>
            <span className="flagged-sub">{s.sub}</span>
          </div>
          <span className={`badge badge-${s.badge}`}>{s.label}</span>
        </div>
      ))}
    </div>
  </div>
)

const RecitationVisual = () => (
  <div className="offline-visual">
    <p style={{ fontWeight: 700, marginBottom: '16px', fontSize: '15px', color: 'var(--text)' }}>🎤 Today's Recitation</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {[
        { name: 'Maria Santos', score: 'A', color: 'var(--present)' },
        { name: 'John Cruz',    score: 'B+',color: 'var(--accent)' },
        { name: 'Ana Reyes',   score: 'A-', color: 'var(--present)' },
        { name: 'Mark Bernal', score: 'C+', color: 'var(--late)' },
      ].map(s => (
        <div key={s.name} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', background: 'var(--surface)', borderRadius: '8px'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{s.name}</span>
          <span style={{ fontWeight: 700, color: s.color, fontSize: '16px' }}>{s.score}</span>
        </div>
      ))}
    </div>
  </div>
)

const GroupsVisual = () => (
  <div className="offline-visual">
    <p style={{ fontWeight: 700, marginBottom: '16px', fontSize: '15px', color: 'var(--text)' }}>👥 Class Groups</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[
        { group: 'Group A', members: ['Maria S.', 'John C.', 'Ana R.'] },
        { group: 'Group B', members: ['Mark B.', 'Lisa T.', 'Carlo D.'] },
        { group: 'Group C', members: ['Jenny L.', 'Ryan M.', 'Mia F.'] },
      ].map(g => (
        <div key={g.group} style={{ background: 'var(--surface)', borderRadius: '8px', padding: '12px 14px' }}>
          <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>{g.group}</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {g.members.map(m => (
              <span key={m} style={{
                fontSize: '12px', background: 'var(--border)',
                padding: '3px 10px', borderRadius: '100px', color: 'var(--text-muted)'
              }}>{m}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)

const PortalVisual = () => (
  <div className="offline-visual">
    <p style={{ fontWeight: 700, marginBottom: '16px', fontSize: '15px', color: 'var(--text)' }}>🎓 Student Portal</p>
    <div style={{ background: 'var(--surface)', borderRadius: '10px', padding: '16px' }}>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', maxWidth: 'none' }}>Logged in as: <strong style={{ color: 'var(--text)' }}>Maria Santos</strong></p>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        {[
          { label: 'Present', val: '18', color: 'var(--present)' },
          { label: 'Absent',  val: '2',  color: 'var(--absent)' },
          { label: 'Late',    val: '1',  color: 'var(--late)' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)', background: 'rgba(56,189,248,0.08)', borderRadius: '8px', padding: '10px 12px', maxWidth: 'none' }}>
        📊 Attendance rate: <strong style={{ color: 'var(--accent)' }}>90%</strong>
      </div>
    </div>
  </div>
)

const CSVVisual = () => (
  <div className="offline-visual">
    <p style={{ fontWeight: 700, marginBottom: '16px', fontSize: '15px', color: 'var(--text)' }}>📊 Export Preview</p>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', background: 'var(--surface)', borderRadius: '8px', padding: '12px', overflowX: 'auto' }}>
      <div style={{ color: 'var(--accent)', marginBottom: '6px' }}>Name,Oct 1,Oct 2,Oct 3,Oct 4</div>
      <div>Maria Santos,P,P,A,P</div>
      <div>John Cruz,P,L,P,P</div>
      <div>Ana Reyes,A,P,P,P</div>
      <div>Mark Bernal,P,P,P,L</div>
    </div>
    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px', maxWidth: 'none' }}>
      Compatible with Excel, Google Sheets, and any spreadsheet app.
    </p>
  </div>
)

const PWAVisual = () => (
  <div className="offline-visual" style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '72px', marginBottom: '16px' }}>📲</div>
    <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--text)', maxWidth: 'none' }}>Install MarkIT on any device</p>
    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', maxWidth: 'none' }}>Add to home screen from your browser — no App Store required.</p>
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {['iPhone', 'Android', 'iPad', 'Desktop'].map(d => (
        <span key={d} style={{
          fontSize: '12px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)',
          color: 'var(--accent)', padding: '4px 12px', borderRadius: '100px', fontWeight: 600
        }}>{d}</span>
      ))}
    </div>
  </div>
)

const featureDetails = [
  {
    label: 'Swipe to mark',
    title: 'Take attendance in seconds',
    desc: 'MarkIT\'s swipe-first interface lets you fly through your roster. Swipe right for present, left for absent — or tap for more options like Late and Excused.',
    features: ['Swipe right = Present, swipe left = Absent', 'Tap for Late, Excused, No Class', 'Keyboard shortcuts on desktop', 'Works with 1 hand on mobile'],
    visual: <SwipeVisual />,
    alt: false,
  },
  {
    label: 'Offline-first',
    title: 'Works even when the internet doesn\'t',
    desc: 'MarkIT is built offline-first. Mark attendance anywhere — in a basement classroom, on a school trip, or when the WiFi is down. Everything syncs automatically when you reconnect.',
    features: ['Full functionality with zero internet', 'Instant sync when back online', 'No data loss, ever', 'Works in airplane mode'],
    visual: <OfflineVisual />,
    alt: true,
  },
  {
    label: 'Calendar heatmap',
    title: 'See the whole picture at a glance',
    desc: 'Every student gets a color-coded calendar view of their attendance history. Spot patterns instantly without digging through records.',
    features: ['Per-student monthly calendar view', 'Color-coded by status', 'Instant absence pattern detection', 'Tap any day for details'],
    visual: <CalendarVisual />,
    alt: false,
  },
  {
    label: 'Absence alerts',
    title: 'Know who needs attention before it\'s too late',
    desc: 'MarkIT automatically flags students who are frequently absent or arriving late, so you can act early — not after it becomes a problem.',
    features: ['Automatic flagging based on thresholds', 'Separate alerts for absences and tardiness', 'At-a-glance risk dashboard', 'Configurable alert sensitivity'],
    visual: <FlaggedVisual />,
    alt: true,
  },
  {
    label: 'Recitation tracker',
    title: 'Track more than just attendance',
    desc: 'Log recitation scores and class participation right alongside attendance. Keep everything in one place without juggling multiple apps.',
    features: ['Score students during class', 'Grade scale customization', 'Participation history per student', 'Export recitation data with attendance'],
    visual: <RecitationVisual />,
    alt: false,
  },
  {
    label: 'Group assignments',
    title: 'Organize students into groups',
    desc: 'Create groups for collaborative activities, labs, or projects. Mark attendance by group or individually — your choice.',
    features: ['Create unlimited groups per class', 'Reuse groups across sessions', 'Group-level attendance marking', 'Flexible membership management'],
    visual: <GroupsVisual />,
    alt: true,
  },
  {
    label: 'Student portal',
    title: 'Give students visibility into their own record',
    desc: 'Share a personalized link and students can view their own attendance history. No login required on their end — just the link.',
    features: ['Shareable per-student link', 'No student account needed', 'Shows full attendance history', 'Configurable visibility settings'],
    visual: <PortalVisual />,
    alt: false,
  },
  {
    label: 'CSV export',
    title: 'Your data, your way',
    desc: 'Export any class\'s attendance records to CSV at any time. Drop them into Excel or Google Sheets and keep using the tools you already know.',
    features: ['Export any class, any date range', 'Compatible with Excel & Google Sheets', 'Includes all status types', 'Export recitation scores too'],
    visual: <CSVVisual />,
    alt: true,
  },
  {
    label: 'PWA — installable app',
    title: 'An app without the App Store',
    desc: 'MarkIT is a Progressive Web App. Install it directly from your browser onto your home screen — on iPhone, Android, iPad, or desktop — no download needed.',
    features: ['Installs from Safari, Chrome, Edge', 'Works on iPhone, Android, iPad, Desktop', 'Full-screen native feel', 'Automatic updates — always current'],
    visual: <PWAVisual />,
    alt: false,
  },
]

const alsoIncluded = [
  { icon: '🔒', title: 'Secure cloud backup', desc: 'Your data is always safe and accessible across all your devices.' },
  { icon: '🌙', title: 'Dark mode', desc: 'Easy on the eyes whether you\'re in a bright classroom or a dark auditorium.' },
  { icon: '⚡', title: 'Instant load times', desc: 'Cached for speed — opens in under a second even on slow connections.' },
  { icon: '🌍', title: 'Works in any language', desc: 'Interface adapts to your device\'s language settings.' },
  { icon: '🆓', title: 'Free updates forever', desc: 'Every new feature goes to all users — no upgrade tiers for features.' },
  { icon: '💬', title: 'Teacher support', desc: 'Real support from people who understand your classroom context.' },
]

const audiences = [
  { icon: '🏫', title: 'K–12 teachers', desc: 'Track daily attendance across multiple homeroom or subject classes.' },
  { icon: '🏛️', title: 'College instructors', desc: 'Manage large lecture classes with fast bulk marking and CSV export.' },
  { icon: '🎨', title: 'Tutors & coaches', desc: 'Track sessions for small groups or one-on-one students.' },
  { icon: '🕌', title: 'Community teachers', desc: 'Perfect for Sunday school, language classes, or community programs.' },
]

export default function Features() {
  return (
    <>
      {/* Page hero */}
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Features</p>
          <h1>Everything you need to track attendance</h1>
          <p>Designed for how teachers actually work — fast, flexible, and offline-first. No unnecessary complexity.</p>
        </div>
      </section>

      {/* Feature detail sections */}
      {featureDetails.map((f, i) => (
        <section key={f.label} className={`feature-detail${f.alt ? ' feature-detail-alt' : ''}`}>
          <div className="container">
            <div className={`feature-detail-inner${f.alt ? ' feature-detail-reverse' : ''}`}>
              <div className="feature-detail-text">
                <p className="section-label">{f.label}</p>
                <h2>{f.title}</h2>
                <p>{f.desc}</p>
                <ul className="feature-list">
                  {f.features.map(feat => (
                    <li key={feat}>
                      <span className="check-green"><CheckIcon /></span>
                      {feat}
                    </li>
                  ))}
                </ul>
                {i === 0 && (
                  <a href="https://app.getmarkit.app/signup" className="btn btn-primary">
                    Try it free
                  </a>
                )}
              </div>
              <div className="feature-detail-visual">{f.visual}</div>
            </div>
          </div>
        </section>
      ))}

      {/* Also included */}
      <section className="features-section features-section-surface">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Also included</p>
            <h2 className="section-title">The details that make the difference</h2>
          </div>
          <div className="features-grid">
            {alsoIncluded.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Who it's for</p>
            <h2 className="section-title">Built for every kind of teacher</h2>
            <p className="section-subtitle">Whether you have 10 students or 200, MarkIT adapts to your class.</p>
          </div>
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {audiences.map(a => (
              <div key={a.title} className="feature-card">
                <div className="feature-icon">{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <a href="https://app.getmarkit.app/signup" className="btn btn-primary btn-lg">
              Start your free trial
            </a>
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
              No credit card required
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}

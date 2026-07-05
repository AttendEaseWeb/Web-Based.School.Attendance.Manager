import { Link } from 'wouter'
import FAQ from '../components/FAQ'
import CTABanner from '../components/CTABanner'

const homeFAQ = [
  {
    q: 'Is MarkIT really free to try?',
    a: 'Yes! You get a full-featured free trial with no credit card required. Try every feature before you commit to anything.',
  },
  {
    q: 'Does it work offline?',
    a: 'Absolutely. MarkIT is a Progressive Web App (PWA). Once installed, it works completely offline. All records sync automatically when you reconnect.',
  },
  {
    q: 'How many students can I track?',
    a: 'The free trial supports up to 3 classes. The annual plan supports unlimited classes and students.',
  },
  {
    q: 'Can I export attendance data?',
    a: 'Yes — export your records as CSV at any time, compatible with Excel and Google Sheets.',
  },
  {
    q: 'Is my data secure?',
    a: 'All data is stored on your device and in your account. We never sell your data. See our <a href="/privacy" class="link-accent">Privacy Policy</a> for full details.',
  },
  {
    q: 'What devices does MarkIT support?',
    a: 'MarkIT works on any modern device with a browser — desktop, tablet, or phone. Install it as a PWA for the best experience.',
  },
]

const featureCards = [
  { icon: '👆', title: 'One-tap marking', desc: 'Mark students present, absent, late, or excused in a single tap. No fuss.' },
  { icon: '📡', title: 'Offline-first PWA', desc: 'Works without internet. Syncs automatically when you reconnect.' },
  { icon: '📅', title: 'Calendar heatmap', desc: 'Visual per-student attendance history. Spot patterns instantly.' },
  { icon: '🚩', title: 'Absence alerts', desc: 'Automatically flag students who are frequently absent or late.' },
  { icon: '🎤', title: 'Recitation tracker', desc: 'Track class participation and recitation scores alongside attendance.' },
  { icon: '👥', title: 'Group assignments', desc: 'Organize students into groups for collaborative activities.' },
  { icon: '🎓', title: 'Student portal', desc: 'Students view their own attendance record via a shareable link.' },
  { icon: '📊', title: 'CSV export', desc: 'Export to spreadsheet any time. Compatible with Excel & Google Sheets.' },
  { icon: '🔄', title: 'Swipe gestures', desc: 'Swipe through students like flashcards for lightning-fast marking.' },
  { icon: '📲', title: 'Installable app', desc: 'Install on your home screen. Feels native on phone, tablet, and desktop.' },
]

const steps = [
  {
    num: '1',
    icon: '📋',
    title: 'Create your class',
    desc: 'Add a class and import or manually enter your student roster. Takes under a minute.',
  },
  {
    num: '2',
    icon: '👆',
    title: 'Mark attendance',
    desc: `Tap or swipe to mark each student. Works offline — syncs when you're back online.`,
  },
  {
    num: '3',
    icon: '📊',
    title: 'Review & export',
    desc: 'View attendance history, spot patterns, flag absences, and export to CSV.',
  },
]

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <span>🎓</span>
            <span>Built for teachers, by teachers</span>
          </div>

          <h1>
            Attendance tracking,<br />
            <span className="accent">done right</span>
          </h1>

          <p className="hero-sub">
            MarkIT is the fastest, simplest way for teachers to take attendance — swipe-first, offline-ready, and installed right on your device.
          </p>

          <div className="hero-ctas">
            <a href="https://app.getmarkit.app/signup" className="btn btn-primary btn-lg">
              Start free trial
            </a>
            <Link href="/features" className="btn btn-ghost btn-lg">
              See all features
            </Link>
          </div>

          <p className="hero-trust">No credit card required · Works offline · Free to try</p>

          <div className="hero-visual">
            <img
              src="/student-card-2.webp"
              alt="MarkIT student card UI"
              className="hero-card-img"
            />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <p className="section-label">How it works</p>
            <h2 className="section-title">Up and running in minutes</h2>
            <p className="section-subtitle">No training required. MarkIT is so intuitive your students could figure it out.</p>
          </div>

          <ol className="steps">
            {steps.map((s) => (
              <li key={s.num} className="step">
                <div className="step-number">{s.num}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Everything you need</p>
            <h2 className="section-title">Packed with smart features</h2>
            <p className="section-subtitle">Every feature designed around how teachers actually work — fast, flexible, and offline-first.</p>
          </div>

          <div className="features-grid">
            {featureCards.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <Link href="/features" className="btn btn-outline btn-lg">
              See all features →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Social proof ── */}
      <section className="social-proof">
        <div className="container">
          <div className="proof-stat">10,000+</div>
          <p className="proof-label">classes tracked by teachers around the world</p>

          <div className="testimonial">
            <blockquote>
              I used to dread taking attendance. Now I actually look forward to it — MarkIT makes it so fast I'm done before students settle into their seats. The offline mode is a lifesaver in our school where the WiFi is unreliable.
            </blockquote>
            <cite>
              <span className="cite-name">Maria Santos</span> · High School Science Teacher
            </cite>
          </div>
        </div>
      </section>

      {/* ── Pricing summary ── */}
      <section className="pricing-summary">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Simple pricing</p>
            <h2 className="section-title">Start free. Upgrade when you're ready.</h2>
          </div>

          <div className="price-card">
            <div className="price-badge">Free Trial</div>
            <div className="price-amount">$0</div>
            <p className="price-period">No credit card required</p>
            <ul className="price-features">
              {[
                'Up to 3 classes',
                'Unlimited students per class',
                'Offline-first PWA',
                'Swipe & tap marking',
                'Calendar history',
                'CSV export',
              ].map(f => (
                <li key={f}>
                  <span className="check"><CheckIcon /></span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="https://app.getmarkit.app/signup" className="btn btn-primary btn-lg price-cta">
              Start free trial
            </a>
            <p className="price-note">Ready for more? See our <Link href="/pricing" className="link-accent">full pricing</Link>.</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Common questions</h2>
          </div>
          <FAQ items={homeFAQ} />
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <CTABanner />
    </>
  )
}

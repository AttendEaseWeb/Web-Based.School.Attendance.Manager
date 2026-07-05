import { Link } from 'wouter'
import CTABanner from '../components/CTABanner'

function StubLayout({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">{label}</p>
          <h1>{title}</h1>
        </div>
      </section>
      <section style={{ padding: 'var(--section-gap) 0' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          {children}
        </div>
      </section>
      <CTABanner />
    </>
  )
}

export function Manual() {
  return (
    <StubLayout label="Documentation" title="User Manual">
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
        Everything you need to know about using MarkIT effectively in your classroom.
      </p>

      {[
        { title: 'Getting started', items: ['Creating your first class', 'Adding students', 'Taking your first attendance', 'Installing MarkIT on your device'] },
        { title: 'Attendance marking', items: ['Swipe gestures', 'Tap to mark', 'Marking in bulk', 'Status types: Present, Absent, Late, Excused, No Class'] },
        { title: 'Reporting & export', items: ['Viewing the calendar heatmap', 'Understanding absence flags', 'Exporting to CSV', 'Sharing the student portal link'] },
        { title: 'Account & settings', items: ['Managing multiple classes', 'Syncing across devices', 'Offline mode explained', 'Upgrading your plan'] },
      ].map(section => (
        <div key={section.title} style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>{section.title}</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {section.items.map(item => (
              <li key={item} style={{
                padding: '12px 16px',
                background: 'var(--surface)',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                fontSize: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                {item}
                <span style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 600 }}>→</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
        Can't find what you need? <Link href="/contact" className="link-accent">Contact support</Link>.
      </p>
    </StubLayout>
  )
}

export function About() {
  return (
    <StubLayout label="About" title="About MarkIT">
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '28px' }}>
        MarkIT was built by a teacher who was frustrated with clunky, overcomplicated attendance apps.
      </p>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
        The goal was simple: build the fastest, most intuitive way to take attendance on a phone or tablet — something that works even when the WiFi doesn't, and doesn't require a training manual to use.
      </p>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
        Today, thousands of teachers use MarkIT to track attendance across all kinds of classes — from elementary school homerooms to university lecture halls to community learning programs.
      </p>
      <p style={{ color: 'var(--text-muted)' }}>
        We're committed to keeping MarkIT fast, honest, and affordable — forever. Have thoughts? <Link href="/contact" className="link-accent">We'd love to hear from you</Link>.
      </p>
    </StubLayout>
  )
}

export function Contact() {
  return (
    <StubLayout label="Contact" title="Get in touch">
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.1rem' }}>
        Have a question, feature request, or just want to say hello? We're real people — we read every message.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {[
          { label: 'Email', value: 'support@getmarkit.app', href: 'mailto:support@getmarkit.app' },
          { label: 'Response time', value: 'Usually within 24 hours', href: null },
        ].map(c => (
          <div key={c.label} style={{
            padding: '20px 24px', background: 'var(--surface)',
            borderRadius: '12px', border: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{c.label}</p>
            {c.href ? (
              <a href={c.href} className="link-accent" style={{ fontSize: '16px', fontWeight: 600 }}>{c.value}</a>
            ) : (
              <p style={{ fontSize: '15px', color: 'var(--text)', margin: 0 }}>{c.value}</p>
            )}
          </div>
        ))}
      </div>
    </StubLayout>
  )
}

export function Terms() {
  return (
    <StubLayout label="Legal" title="Terms of Service">
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Last updated: January 2024</p>
      {[
        { heading: '1. Acceptance of terms', body: 'By accessing or using MarkIT, you agree to be bound by these Terms of Service and our Privacy Policy.' },
        { heading: '2. Use of service', body: 'MarkIT is provided for personal and professional educational use. You agree not to misuse the service or help anyone else do so.' },
        { heading: '3. Account responsibility', body: 'You are responsible for maintaining the security of your account and all activity that occurs under it.' },
        { heading: '4. Data ownership', body: 'You own your data. We do not sell, rent, or share your student data with third parties.' },
        { heading: '5. Refunds', body: 'We offer a 7-day money-back guarantee on all paid plans. Contact support@getmarkit.app to request a refund.' },
        { heading: '6. Changes to terms', body: 'We may update these terms from time to time. Continued use of the service after changes constitutes acceptance.' },
      ].map(s => (
        <div key={s.heading} style={{ marginBottom: '28px' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '1.05rem' }}>{s.heading}</h3>
          <p style={{ color: 'var(--text-muted)' }}>{s.body}</p>
        </div>
      ))}
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '40px' }}>
        Questions? <Link href="/contact" className="link-accent">Contact us</Link>.
      </p>
    </StubLayout>
  )
}

export function Privacy() {
  return (
    <StubLayout label="Legal" title="Privacy Policy">
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Last updated: January 2024</p>
      {[
        { heading: 'What we collect', body: 'We collect your email address, class and student data you enter, and basic usage analytics. We never collect student personal information beyond names as you choose to enter them.' },
        { heading: 'How we use your data', body: 'Your data is used solely to provide the MarkIT service. We do not sell, rent, or share your data with third parties for marketing purposes.' },
        { heading: 'Data storage', body: 'Your data is stored securely. Offline records are kept on your device; synced records are stored in an encrypted cloud database.' },
        { heading: 'Your rights', body: 'You can request a full export or deletion of your data at any time by contacting support@getmarkit.app.' },
        { heading: 'Cookies', body: 'MarkIT uses only essential cookies required to maintain your session. We do not use tracking or advertising cookies.' },
        { heading: 'Contact', body: 'For any privacy concerns, email us at privacy@getmarkit.app.' },
      ].map(s => (
        <div key={s.heading} style={{ marginBottom: '28px' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '1.05rem' }}>{s.heading}</h3>
          <p style={{ color: 'var(--text-muted)' }}>{s.body}</p>
        </div>
      ))}
    </StubLayout>
  )
}

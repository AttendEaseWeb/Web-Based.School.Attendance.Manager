interface CTABannerProps {
  title?: string
  subtitle?: string
}

export default function CTABanner({
  title = 'Ready to modernize your attendance?',
  subtitle = `Join teachers who've already made the switch to smarter, faster, offline-ready attendance tracking.`,
}: CTABannerProps) {
  return (
    <section className="cta-banner">
      <div className="container">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://app.getmarkit.app/signup" className="btn btn-primary btn-lg">
            Start free trial
          </a>
          <a href="https://app.getmarkit.app/login" className="btn btn-ghost btn-lg">
            Log in
          </a>
        </div>
      </div>
    </section>
  )
}

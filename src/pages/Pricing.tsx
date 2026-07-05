import { useState } from 'react'
import FAQ from '../components/FAQ'
import CTABanner from '../components/CTABanner'

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const freePlan = {
  name: 'Free Trial',
  price: '$0',
  period: 'forever',
  desc: 'Perfect for trying MarkIT risk-free.',
  features: [
    'Up to 3 classes',
    'Unlimited students per class',
    'Swipe & tap attendance marking',
    'Offline-first PWA',
    'Calendar history view',
    'Absence flagging',
    'Recitation tracker',
    'Group assignments',
    'Student portal',
    'CSV export',
  ],
  cta: 'Start free trial',
  ctaHref: 'https://app.getmarkit.app/signup',
  featured: false,
}

const annualPlan = {
  name: 'Annual Plan',
  price: null,
  desc: 'Everything in the free trial, plus unlimited classes.',
  features: [
    'Unlimited classes',
    'Unlimited students per class',
    'Everything in the free trial',
    'Priority support',
    'Early access to new features',
  ],
  featured: true,
  tiers: [
    { label: '1 year',  amount: '$29' },
    { label: '2 years', amount: '$49' },
    { label: '3 years', amount: '$69' },
  ],
}

const pricingFAQ = [
  {
    q: 'Is the free trial really unlimited in time?',
    a: 'Yes. The free trial never expires. You can use MarkIT with up to 3 classes indefinitely at no cost.',
  },
  {
    q: 'How does the annual plan payment work?',
    a: 'You pay once via GCash or bank transfer (Philippines). Send your payment to the details provided after entering your email, and we\'ll activate your plan within 24 hours.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We currently accept GCash and bank transfer (BDO, BPI, UnionBank). International payments via Wise are also supported.',
  },
  {
    q: 'Can I get a refund?',
    a: 'If you\'re not satisfied within 7 days of your plan activation, contact us at <a href="mailto:support@getmarkit.app" class="link-accent">support@getmarkit.app</a> for a full refund.',
  },
  {
    q: 'Do prices include all future updates?',
    a: 'Yes. Your plan covers all feature updates released during your subscription period at no extra cost.',
  },
  {
    q: 'What happens when my plan expires?',
    a: 'Your account automatically reverts to the free tier (3-class limit). All your data and settings are preserved.',
  },
]

const N8N_WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL ?? 'https://n8n.getmarkit.app/webhook/payment-email'

export default function Pricing() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        throw new Error(`Server responded with ${res.status}`)
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or contact us directly.')
    }
  }

  return (
    <>
      {/* Page hero */}
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Pricing</p>
          <h1>Simple, honest pricing</h1>
          <p>Start free. Upgrade when you need more than 3 classes. No subscriptions, no hidden fees.</p>
        </div>
      </section>

      {/* Pricing cards */}
      <section style={{ padding: 'var(--section-gap) 0' }}>
        <div className="container">
          <div className="pricing-cards">
            {/* Free plan */}
            <div className="pricing-card">
              <div className="pricing-card-header">
                <p className="section-label" style={{ marginBottom: '4px' }}>{freePlan.name}</p>
                <div className="price-amount">{freePlan.price}</div>
                <p className="price-period">Free {freePlan.period}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: 'none' }}>{freePlan.desc}</p>
              </div>

              <ul className="price-features" style={{ marginBottom: '28px' }}>
                {freePlan.features.map(f => (
                  <li key={f}>
                    <span className="check"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href={freePlan.ctaHref} className="btn btn-outline btn-lg price-cta">
                {freePlan.cta}
              </a>
              <p className="price-note">No credit card required</p>
            </div>

            {/* Annual plan */}
            <div className="pricing-card pricing-card-featured">
              <div className="pricing-card-header">
                <div className="price-badge">Most Popular</div>
                <p className="section-label" style={{ marginBottom: '4px' }}>{annualPlan.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: 'none', marginBottom: '12px' }}>{annualPlan.desc}</p>

                <div className="price-tiers">
                  {annualPlan.tiers.map((t, i) => (
                    <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="price-tier">
                        <span className="price-tier-label">{t.label}</span>
                        <span className="price-tier-amount">{t.amount}</span>
                      </div>
                      {i < annualPlan.tiers.length - 1 && (
                        <span className="price-tier-divider">·</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <ul className="price-features" style={{ marginBottom: '28px' }}>
                {annualPlan.features.map(f => (
                  <li key={f}>
                    <span className="check"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* How to pay */}
              <p className="payment-how-title" style={{ fontWeight: 700 }}>How to get your plan</p>
              <div className="payment-steps">
                <div className="payment-step">
                  <div className="payment-step-num">1</div>
                  <div>
                    <strong>Enter your email below</strong>
                    <p>We'll send you payment details and instructions.</p>
                  </div>
                </div>
                <div className="payment-step">
                  <div className="payment-step-num">2</div>
                  <div>
                    <strong>Send your payment</strong>
                    <p>Pay via GCash or bank transfer — your choice of 1, 2, or 3 year plan.</p>
                  </div>
                </div>
                <div className="payment-step">
                  <div className="payment-step-num">3</div>
                  <div>
                    <strong>We activate your plan</strong>
                    <p>Within 24 hours of confirming payment, your account is upgraded.</p>
                  </div>
                </div>
              </div>

              {status !== 'success' ? (
                <form className="payment-email-form" onSubmit={handleSubmit} noValidate>
                  <label className="payment-form-label" htmlFor="pricing-email">
                    Your email address
                  </label>
                  <input
                    id="pricing-email"
                    type="email"
                    required
                    placeholder="you@school.edu"
                    className="payment-form-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    aria-describedby={status === 'error' ? 'pricing-form-error' : undefined}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg payment-form-submit"
                    disabled={status === 'loading'}
                    aria-busy={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending…' : 'Get payment details →'}
                  </button>
                  <div aria-live="polite" aria-atomic="true">
                    {status === 'error' && (
                      <div id="pricing-form-error" className="payment-form-feedback payment-form-error-msg" role="alert">
                        {errorMsg}
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                <div
                  className="payment-form-feedback payment-form-success-msg"
                  role="status"
                  aria-live="polite"
                >
                  ✅ <strong>Check your inbox!</strong> We've sent payment instructions to <strong>{email}</strong>.
                  We'll activate your plan within 24 hours of receiving your payment.
                </div>
              )}
            </div>
          </div>

          <div className="pricing-more">
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Questions? <a href="/contact" className="link-accent">Contact us</a> — we're happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section pricing-faq">
        <div className="container">
          <h2 className="pricing-faq-title">Pricing questions</h2>
          <FAQ items={pricingFAQ} />
        </div>
      </section>

      <CTABanner
        title="Ready to upgrade?"
        subtitle="Start with the free trial. Upgrade any time when you need more than 3 classes."
      />
    </>
  )
}

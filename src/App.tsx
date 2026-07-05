import { Switch, Route } from 'wouter'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import { Manual, About, Contact, Terms, Privacy } from './pages/Stubs'

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/features" component={Features} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/manual" component={Manual} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route>
            {/* 404 */}
            <section style={{ padding: 'var(--section-gap) 0', textAlign: 'center' }}>
              <div className="container">
                <h1 style={{ marginBottom: '16px' }}>404 — Page not found</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                  <a href="/" className="link-accent">Go home</a>
                </p>
              </div>
            </section>
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

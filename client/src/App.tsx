import { Switch, Route, Redirect, useLocation } from 'wouter'
import { AuthProvider, useAuth } from './hooks/useAuth'

// Marketing layout
import Header from './components/Header'
import Footer from './components/Footer'

// Marketing pages
import Home from './pages/Home'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import { Manual, About, Contact, Terms, Privacy } from './pages/Stubs'

// App pages
import Login from './pages/app/Login'
import Signup from './pages/app/Signup'
import Dashboard from './pages/app/Dashboard'
import ClassView from './pages/app/ClassView'
import ManageStudents from './pages/app/ManageStudents'

// A route that redirects to /login when not authenticated
function Protected({ component: Component }: { component: React.ComponentType }) {
  const { teacher, loading } = useAuth()
  if (loading) return <div className="app-loading"><div className="spinner" /></div>
  if (!teacher) return <Redirect to="/login" />
  return <Component />
}

// Pages that use the marketing layout (header + footer)
const APP_PATHS = ['/login', '/signup', '/dashboard', '/classes']

function Layout() {
  const [location] = useLocation()
  const isApp = APP_PATHS.some(p => location.startsWith(p))

  return isApp ? <AppRoutes /> : <MarketingRoutes />
}

function MarketingRoutes() {
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
            <section style={{ padding: 'var(--section-gap) 0', textAlign: 'center' }}>
              <div className="container">
                <h1 style={{ marginBottom: 16 }}>404 — Page not found</h1>
                <a href="/" className="link-accent">Go home</a>
              </div>
            </section>
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

function AppRoutes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard">
          <Protected component={Dashboard} />
        </Route>
        <Route path="/classes/:id/students">
          <Protected component={ManageStudents} />
        </Route>
        <Route path="/classes/:id">
          <Protected component={ClassView} />
        </Route>
      </Switch>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  )
}

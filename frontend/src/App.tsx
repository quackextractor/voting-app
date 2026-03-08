import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PollPage } from './pages/PollPage';

const AdminPage = lazy(() => import('./pages/AdminPage'));
const MonitorPage = lazy(() => import('./pages/MonitorPage').then(module => ({ default: module.MonitorPage })));
const DocsPage = lazy(() => import('./pages/DocsPage').then(module => ({ default: module.DocsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));

function App() {
  return (
    <Router>
      <Suspense fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-lg text-slate-500 font-medium">Loading component...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PollPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="monitor" element={<MonitorPage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App

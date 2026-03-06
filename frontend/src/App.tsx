import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PollPage } from './pages/PollPage';
import AdminPage from './pages/AdminPage';
import { MonitorPage } from './pages/MonitorPage';
import { DocsPage } from './pages/DocsPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PollPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="monitor" element={<MonitorPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

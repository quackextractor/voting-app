import { useState } from 'react'
import './App.css'
import { PollForm } from './components/PollForm'
import { PollResults } from './components/PollResults'
import { Coffee } from 'lucide-react'

function App() {
  const [view, setView] = useState<'vote' | 'results'>('vote')

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Unified Navigation Panel */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="/" className="flex items-center text-slate-900 font-extrabold text-lg">
                <Coffee className="text-primary mr-2 h-6 w-6" strokeWidth={2.5} /> Coffee Poll
              </a>
              <div className="hidden sm:flex space-x-4">
                <a href="/" className="px-3 py-2 rounded-md text-sm font-medium text-primary bg-blue-50">Poll</a>
                <a href="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-slate-500 hover:text-primary hover:bg-slate-100 transition-all">Admin</a>
                <a href="/monitor" className="px-3 py-2 rounded-md text-sm font-medium text-slate-500 hover:text-primary hover:bg-slate-100 transition-all">Monitor</a>
                <a href="/docs" className="px-3 py-2 rounded-md text-sm font-medium text-slate-500 hover:text-primary hover:bg-slate-100 transition-all">Docs</a>
                <a href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-slate-500 hover:text-primary hover:bg-slate-100 transition-all">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl flex items-center justify-center">
            <Coffee className="text-primary mr-4 h-12 w-12 sm:h-16 sm:w-16" strokeWidth={3} /> Coffee <span className="text-primary">Poll</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-slate-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A premium real-time polling experience.
          </p>
        </header>

        <main className="w-full">
          {view === 'vote' ? (
            <PollForm
              onVoteSuccess={() => setView('results')}
              onViewResults={() => setView('results')}
            />
          ) : (
            <PollResults
              onBackToVote={() => setView('vote')}
            />
          )}
        </main>

        <footer className="mt-20 text-center text-slate-400 text-sm">
          <p>&copy; 2026 Voting App Project. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App

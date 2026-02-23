import { useState } from 'react'
import './App.css'
import { PollForm } from './components/PollForm'
import { PollResults } from './components/PollResults'

function App() {
  const [view, setView] = useState<'vote' | 'results'>('vote')

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Coffee <span className="text-primary">Poll</span>
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

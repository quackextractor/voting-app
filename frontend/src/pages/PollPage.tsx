import React, { useState } from 'react';
import { PollForm } from '../components/PollForm';
import { PollResults } from '../components/PollResults';
import { Coffee } from 'lucide-react';
import { useTitle } from '../hooks/useTitle';

export const PollPage: React.FC = () => {
    useTitle('Poll');
    const [view, setView] = useState<'form' | 'results'>('form');

    return (
        <div className="max-w-7xl mx-auto flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl flex items-center justify-center">
                    <Coffee className="text-primary mr-4 h-12 w-12 sm:h-16 sm:w-16" strokeWidth={3} /> Coffee <span className="text-primary">Poll</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-slate-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    A premium real-time polling experience.
                </p>
            </header>

            <div className="w-full">
                {view === 'form' ? (
                    <PollForm
                        onVoteSuccess={() => setView('results')}
                        onViewResults={() => setView('results')}
                    />
                ) : (
                    <PollResults
                        onBackToVote={() => setView('form')}
                    />
                )}
            </div>
        </div>
    );
};

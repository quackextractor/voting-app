import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { supabase } from '../lib/supabase';

interface Option {
    id: string;
    text: string;
    votes: number;
}

interface PollResultsProps {
    onBackToVote: () => void;
    onPollReset?: () => void;
}

export const PollResults: React.FC<PollResultsProps> = ({ onBackToVote }) => {
    const [results, setResults] = useState<Option[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchResults = async () => {
        try {
            // Using Supabase to get options and join with vote counts
            const { data, error: fetchError } = await supabase
                .from('options')
                .select(`
                    id,
                    text,
                    votes (count)
                `)
                .order('id');

            if (fetchError) throw fetchError;

            const mappedResults = (data || []).map((opt: { id: string; text: string; votes: { count: number }[] }) => ({
                id: opt.id,
                text: opt.text,
                votes: opt.votes[0]?.count || 0
            }));

            setResults(mappedResults);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch results';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
        // Refresh results every 5 seconds
        const interval = setInterval(fetchResults, 5000);
        return () => clearInterval(interval);
    }, []);

    const totalVotes = results.reduce((acc, opt) => acc + opt.votes, 0);

    if (loading) return <div className="text-center p-8">Loading results...</div>;

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-primary/10">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Poll Results</CardTitle>
                <CardDescription className="text-lg mt-2">
                    How many coffees a day is still healthy to drink?
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {results.map((opt) => {
                    const percentage = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
                    return (
                        <div key={opt.id} className="space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-base font-medium">{opt.text}</span>
                                <span className="text-sm text-muted-foreground">{opt.votes} votes ({percentage.toFixed(1)}%)</span>
                            </div>
                            <Progress value={percentage} className="h-3 rounded-full" />
                        </div>
                    );
                })}
                {error && <p className="text-destructive text-sm font-semibold">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground text-center w-full">Total votes: {totalVotes}</p>
                <Button variant="outline" className="w-full border-2" onClick={onBackToVote}>
                    Back to voting
                </Button>
            </CardFooter>
        </Card>
    );
};

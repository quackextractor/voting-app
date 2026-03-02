import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

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
            const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
            const response = await fetch(`${baseUrl}/api/results`);
            if (!response.ok) throw new Error('Failed to fetch results');
            const data = await response.json();
            setResults(data.options);
        } catch (err: any) {
            setError(err.message);
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

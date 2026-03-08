import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from '@radix-ui/react-label';

interface PollFormProps {
    onVoteSuccess: () => void;
    onViewResults: () => void;
}

export const PollForm: React.FC<PollFormProps> = ({ onVoteSuccess, onViewResults }) => {
    const [optionId, setOptionId] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('userVote')) {
            setHasVoted(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!optionId) return;

        setLoading(true);
        setError(null);

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
            const response = await fetch(`${baseUrl}/api/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ optionId }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 403 && data.message === 'You have already voted') {
                    setHasVoted(true);
                    return;
                }
                throw new Error(data.message || 'Error submitting vote');
            }

            localStorage.setItem('userVote', optionId);
            onVoteSuccess();
        } catch (err: unknown) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-primary/10">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Poll</CardTitle>
                <CardDescription className="text-lg mt-2">
                    How many coffees a day is still healthy to drink?
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    {hasVoted && (
                        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 mb-6 rounded-md" aria-live="polite">
                            <p className="font-medium mb-3">You have already recorded your vote for this poll.</p>
                            <Button type="button" onClick={onViewResults} className="w-full">
                                Proceed to Results
                            </Button>
                        </div>
                    )}
                    <RadioGroup disabled={hasVoted} value={optionId} onValueChange={setOptionId} className="space-y-4">
                        <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${hasVoted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted cursor-pointer'}`} onClick={() => !hasVoted && setOptionId('a')}>
                            <RadioGroupItem value="a" id="opt-a" aria-label="0 to 1 (I am more of a tea or water person)" disabled={hasVoted} />
                            <Label htmlFor="opt-a" className={`text-base ${hasVoted ? 'cursor-not-allowed' : 'cursor-pointer'}`}>a) 0 to 1 (I am more of a tea or water person)</Label>
                        </div>
                        <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${hasVoted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted cursor-pointer'}`} onClick={() => !hasVoted && setOptionId('b')}>
                            <RadioGroupItem value="b" id="opt-b" aria-label="2 to 3 (The golden middle way)" disabled={hasVoted} />
                            <Label htmlFor="opt-b" className={`text-base ${hasVoted ? 'cursor-not-allowed' : 'cursor-pointer'}`}>b) 2 to 3 (The golden middle way)</Label>
                        </div>
                        <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${hasVoted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted cursor-pointer'}`} onClick={() => !hasVoted && setOptionId('c')}>
                            <RadioGroupItem value="c" id="opt-c" aria-label="4 or more (Caffeine is my fuel)" disabled={hasVoted} />
                            <Label htmlFor="opt-c" className={`text-base ${hasVoted ? 'cursor-not-allowed' : 'cursor-pointer'}`}>c) 4 or more (Caffeine is my fuel)</Label>
                        </div>
                    </RadioGroup>
                    {error && (
                        <div aria-live="polite">
                            <p className="text-destructive text-sm mt-4 font-semibold">{error}</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full text-lg h-12" disabled={hasVoted || !optionId || loading}>
                        {loading ? 'Submitting...' : 'Vote'}
                    </Button>
                    <Button type="button" variant="link" className="text-primary/60 hover:text-primary" onClick={onViewResults}>
                        View results without voting
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

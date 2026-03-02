import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from '@radix-ui/react-label';
import { supabase } from '../lib/supabase';

interface PollFormProps {
    onVoteSuccess: () => void;
    onViewResults: () => void;
}

export const PollForm: React.FC<PollFormProps> = ({ onVoteSuccess, onViewResults }) => {
    const [optionId, setOptionId] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!optionId) return;

        setLoading(true);
        setError(null);

        try {
            const { error: voteError } = await supabase
                .from('votes')
                .insert([{ option_id: optionId }]);

            if (voteError) throw voteError;

            onVoteSuccess();
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error submitting vote';
            setError(message);
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
                    <RadioGroup value={optionId} onValueChange={setOptionId} className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer" onClick={() => setOptionId('a')}>
                            <RadioGroupItem value="a" id="opt-a" />
                            <Label htmlFor="opt-a" className="text-base cursor-pointer">a) 0 to 1 (I am more of a tea or water person)</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer" onClick={() => setOptionId('b')}>
                            <RadioGroupItem value="b" id="opt-b" />
                            <Label htmlFor="opt-b" className="text-base cursor-pointer">b) 2 to 3 (The golden middle way)</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer" onClick={() => setOptionId('c')}>
                            <RadioGroupItem value="c" id="opt-c" />
                            <Label htmlFor="opt-c" className="text-base cursor-pointer">c) 4 or more (Caffeine is my fuel)</Label>
                        </div>
                    </RadioGroup>
                    {error && <p className="text-destructive text-sm mt-4 font-semibold">{error}</p>}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full text-lg h-12" disabled={!optionId || loading}>
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

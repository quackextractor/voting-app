import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface ResetAdminProps {
    onReset: () => void;
}

export const ResetAdmin: React.FC<ResetAdminProps> = ({ onReset }) => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleReset = async () => {
        if (!token) return;
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('/api/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Poll has been successfully reset!' });
                setToken('');
                onReset();
            } else {
                setMessage({ type: 'error', text: data.message || 'Invalid token' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Server error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto mt-12 shadow-md border-destructive/20 bg-destructive/5">
            <CardHeader>
                <CardTitle className="text-destructive text-xl font-bold">Admin: Reset Poll</CardTitle>
                <CardDescription>
                    Enter the secret token to clear all votes. This action cannot be undone.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2">
                    <Input
                        type="password"
                        placeholder="Secret Token"
                        value={token}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
                        className="border-2 focus-visible:ring-destructive"
                    />
                    <Button variant="destructive" onClick={handleReset} disabled={loading || !token}>
                        {loading ? '...' : 'Reset'}
                    </Button>
                </div>
                {message && (
                    <p className={`text-sm mt-3 font-medium ${message.type === 'success' ? 'text-green-600' : 'text-destructive'}`}>
                        {message.text}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

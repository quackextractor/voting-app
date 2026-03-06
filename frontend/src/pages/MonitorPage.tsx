import React, { useEffect, useState } from 'react';
import { Activity, Server, HardDrive } from 'lucide-react';

interface Stats {
    application: {
        totalVotes: number;
        version: string;
    };
    uptime: {
        process: number;
    };
    memory: {
        usage: {
            rss: number;
        };
    };
    system: {
        loadAvg: number[];
        platform: string;
        cpuCount: number;
    };
}

export const MonitorPage: React.FC = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    const formatBytes = (bytes: number) => {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/stats');
                const data = await response.json();
                setStats(data);
                setLastUpdated(new Date());
            } catch (err) {
                console.error('Stats fetch failed', err);
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) {
        return <div className="flex justify-center items-center py-20 text-slate-500">Loading metrics...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center">
                        <span className="bg-primary text-white p-2 rounded-xl mr-3">
                            <Activity className="h-8 w-8" />
                        </span>
                        System <span className="text-primary ml-2">Monitor</span>
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Real-time application health and performance.</p>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm font-semibold text-slate-600">Live Status</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Votes Card */}
                <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white shadow-xl">
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Total Votes</p>
                    <p className="text-4xl font-black text-primary">{stats.application.totalVotes}</p>
                    <p className="text-xs text-slate-400 mt-2">Active Poll Participation</p>
                </div>

                {/* App Uptime Card */}
                <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white shadow-xl">
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Process Uptime</p>
                    <p className="text-4xl font-black text-slate-800">{formatTime(stats.uptime.process)}</p>
                    <p className="text-xs text-slate-400 mt-2">Server runtime duration</p>
                </div>

                {/* Memory Usage Card */}
                <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white shadow-xl">
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Memory Usage</p>
                    <p className="text-4xl font-black text-slate-800">{formatBytes(stats.memory.usage.rss)}</p>
                    <p className="text-xs text-slate-400 mt-2">Resident Set Size</p>
                </div>

                {/* Load Avg Card */}
                <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white shadow-xl">
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">System Load</p>
                    <p className="text-4xl font-black text-slate-800">{stats.system.loadAvg[0]?.toFixed(2) || '0.00'}</p>
                    <p className="text-xs text-slate-400 mt-2">1-minute average</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                            <Server className="h-6 w-6 mr-2 text-primary" />
                            System Information
                        </h2>
                        <div className="grid grid-cols-2 gap-y-6">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase">Platform</p>
                                <p className="text-lg font-bold text-slate-700 capitalize">{stats.system.platform}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase">CPU Count</p>
                                <p className="text-lg font-bold text-slate-700">{stats.system.cpuCount}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase">App Version</p>
                                <p className="text-lg font-bold text-primary">v{stats.application.version}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase">Last Updated</p>
                                <p className="text-lg font-bold text-slate-700">{lastUpdated.toLocaleTimeString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-primary p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden h-full">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2">Monitoring Core</h3>
                            <p className="text-indigo-100 text-sm mb-6">Real-time internal system telemetry directly from Node.js process internals.</p>
                            <div className="mt-8">
                                <Activity className="h-16 w-16 text-indigo-300 opacity-50 mb-4" />
                                <HardDrive className="h-16 w-16 text-indigo-300 opacity-50 absolute right-8 top-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

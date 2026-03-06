import React from 'react';
import { FileText, LayoutTemplate, Network, LayoutDashboard } from 'lucide-react';

export const DocsPage: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-10 border-b border-slate-200 pb-4">
                Technical and Visual Design: Polling Application
            </h1>

            <div className="space-y-8">
                {/* Topic Section */}
                <section className="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
                        <FileText className="w-6 h-6 mr-2" /> 1. Poll Topic
                    </h2>
                    <div className="space-y-4 text-slate-700">
                        <p><strong className="text-slate-900">Question:</strong> How many coffees a day is still healthy to drink?</p>
                        <div>
                            <strong className="text-slate-900 mb-2 block">Response options:</strong>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>a) 0 to 1 (I am more of a tea or water person)</li>
                                <li>b) 2 to 3 (The golden middle way)</li>
                                <li>c) 4 or more (Caffeine is my fuel)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* UI Architecture Section */}
                <section className="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                        <LayoutTemplate className="w-6 h-6 mr-2" /> 2. UI Architecture
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-slate-100 text-slate-700 font-semibold text-center p-3 border-b border-slate-200">
                                View: Voting
                            </div>
                            <div className="p-6">
                                <p className="font-bold mb-4 text-sm text-slate-800">How many coffees a day is still healthy to drink?</p>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center"><input type="radio" disabled className="mr-2" /><label className="text-sm text-slate-600">a) 0 to 1</label></div>
                                    <div className="flex items-center"><input type="radio" disabled className="mr-2" /><label className="text-sm text-slate-600">b) 2 to 3</label></div>
                                    <div className="flex items-center"><input type="radio" disabled className="mr-2" /><label className="text-sm text-slate-600">c) 4 or more</label></div>
                                </div>
                                <button disabled className="w-full bg-slate-200 text-slate-500 rounded-md py-2 text-sm font-semibold">Vote</button>
                                <div className="text-center mt-3"><span className="text-primary text-xs underline">View results without voting</span></div>
                            </div>
                        </div>

                        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-slate-100 text-slate-700 font-semibold text-center p-3 border-b border-slate-200">
                                View: Results & Routing
                            </div>
                            <div className="p-6">
                                <p className="font-bold mb-4 text-sm text-slate-800">How many coffees a day is still healthy to drink?</p>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>a) 0 to 1</span><span>15 votes</span></div>
                                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-primary h-full w-[30%]"></div></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>b) 2 to 3</span><span>30 votes</span></div>
                                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-primary h-full w-[60%]"></div></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>c) 4 or more</span><span>5 votes</span></div>
                                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-primary h-full w-[10%]"></div></div>
                                    </div>
                                </div>
                                <div className="text-center mt-5"><span className="text-primary text-xs underline">Back to voting</span></div>
                            </div>
                        </div>

                        <div className="border border-red-200 bg-red-50/20 rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-red-100 text-red-800 font-semibold text-center p-3 border-b border-red-200 flex items-center justify-center">
                                View: Admin Panel
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="font-bold text-slate-800 mb-1">Admin Control Panel</h3>
                                <p className="text-xs text-slate-500 mb-4">Manage poll status and system settings.</p>
                                <div className="bg-white p-4 rounded-lg border border-red-100 mb-3 shadow-sm">
                                    <p className="text-sm font-bold text-red-600 mb-2">Reset Poll</p>
                                    <input disabled type="password" placeholder="Secret Token" className="w-full border border-slate-200 p-2 rounded text-sm mb-3 bg-slate-50" />
                                    <button disabled className="w-full bg-red-200 text-red-500 rounded-md py-2 text-sm font-semibold">Reset Results</button>
                                </div>
                            </div>
                        </div>

                        <div className="border border-indigo-200 bg-indigo-50/20 rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-indigo-100 text-indigo-800 font-semibold text-center p-3 border-b border-indigo-200">
                                View: System Monitor
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-indigo-900 mb-4 flex items-center justify-center"><LayoutDashboard className="w-4 h-4 mr-2" /> System Monitor</h3>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <div className="border border-indigo-100 bg-white p-2 rounded-md text-center"><p className="text-[10px] text-slate-500 uppercase tracking-widest">Votes</p><p className="font-bold text-indigo-600">42</p></div>
                                    <div className="border border-indigo-100 bg-white p-2 rounded-md text-center"><p className="text-[10px] text-slate-500 uppercase tracking-widest">Uptime</p><p className="font-bold text-slate-700">1h 2m</p></div>
                                    <div className="border border-indigo-100 bg-white p-2 rounded-md text-center"><p className="text-[10px] text-slate-500 uppercase tracking-widest">Memory</p><p className="font-bold text-slate-700">45 MB</p></div>
                                    <div className="border border-indigo-100 bg-white p-2 rounded-md text-center"><p className="text-[10px] text-slate-500 uppercase tracking-widest">Load</p><p className="font-bold text-slate-700">0.05</p></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <section className="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                        <Network className="w-6 h-6 mr-2" /> 3. API Endpoints
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-slate-200">
                                    <th className="py-3 px-4 font-bold text-slate-700">Method</th>
                                    <th className="py-3 px-4 font-bold text-slate-700">URL Endpoint</th>
                                    <th className="py-3 px-4 font-bold text-slate-700">Description</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="py-3 px-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">GET</span></td>
                                    <td className="py-3 px-4 font-mono text-slate-600">/health</td>
                                    <td className="py-3 px-4 text-slate-600">Basic system health check for external monitoring services.</td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="py-3 px-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">GET</span></td>
                                    <td className="py-3 px-4 font-mono text-slate-600">/api/stats</td>
                                    <td className="py-3 px-4 text-slate-600">Detailed system, memory, and application statistics.</td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="py-3 px-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">GET</span></td>
                                    <td className="py-3 px-4 font-mono text-slate-600">/api/results</td>
                                    <td className="py-3 px-4 text-slate-600">Returns current voting states. No authorization required.</td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="py-3 px-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">POST</span></td>
                                    <td className="py-3 px-4 font-mono text-slate-600">/api/vote</td>
                                    <td className="py-3 px-4 text-slate-600">Saves a new user vote. Double-voting prevented via IP and cookies.</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="py-3 px-4"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">POST</span></td>
                                    <td className="py-3 px-4 font-mono text-slate-600">/api/reset</td>
                                    <td className="py-3 px-4 text-slate-600">Resets all votes (requires specific server admin token).</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

import React from 'react';
import { Coffee } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <NavLink to="/" className="flex items-center text-slate-900 font-extrabold text-lg">
                                <Coffee className="text-primary mr-2 h-6 w-6" strokeWidth={2.5} /> Coffee Poll
                            </NavLink>
                            <div className="hidden sm:flex space-x-4">
                                <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 'text-primary bg-blue-50' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}>Poll</NavLink>
                                <NavLink to="/admin" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 'text-primary bg-blue-50' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}>Admin</NavLink>
                                <NavLink to="/monitor" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 'text-primary bg-blue-50' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}>Monitor</NavLink>
                                <NavLink to="/docs" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 'text-primary bg-blue-50' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}>Docs</NavLink>
                                <NavLink to="/contact" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 'text-primary bg-blue-50' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}>Contact</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="w-full">
                <Outlet />
            </main>

            <footer className="mt-20 text-center text-slate-400 text-sm pb-8">
                <p>&copy; 2026 Voting App Project. All rights reserved.</p>
            </footer>
        </div>
    );
};

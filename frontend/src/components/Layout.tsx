import React from 'react';
import { Coffee } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <NavLink to="/" className="flex items-center text-slate-900 dark:text-slate-100 font-extrabold text-lg" aria-label="Home - Coffee Poll">
                                <Coffee className="text-primary dark:text-primary mr-2 h-6 w-6" strokeWidth={2.5} /> Coffee Poll
                            </NavLink>
                            <div className="hidden sm:flex space-x-4">
                                <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 'text-primary bg-blue-50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Poll</NavLink>
                                <NavLink to="/admin" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 'text-primary bg-blue-50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Admin</NavLink>
                                <NavLink to="/monitor" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 'text-primary bg-blue-50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Monitor</NavLink>
                                <NavLink to="/docs" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 'text-primary bg-blue-50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Docs</NavLink>
                                <NavLink to="/contact" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 'text-primary bg-blue-50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Contact</NavLink>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="w-full">
                <Outlet />
            </main>

            <footer className="mt-20 text-center text-slate-400 dark:text-slate-500 text-sm pb-8 space-y-4">
                <div>
                    <NavLink to="/contact" className="text-primary dark:text-blue-400 hover:text-primary/80 dark:hover:text-blue-300 font-semibold underline decoration-2 underline-offset-4" aria-label="Report an Issue or Contact Us">
                        Report an Issue / Contact Us
                    </NavLink>
                </div>
                <p>&copy; 2026 Voting App Project. All rights reserved.</p>
            </footer>
        </div>
    );
};

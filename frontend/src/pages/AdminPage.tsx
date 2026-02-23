import React from 'react';
import { ResetAdmin } from '../components/ResetAdmin';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AdminPage: React.FC = () => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center text-slate-600 hover:text-primary transition-colors font-medium"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Poll
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                <header className="mb-8 border-b border-slate-100 pb-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900">Admin Control Panel</h2>
                    <p className="text-slate-500 mt-2">Manage poll status and system settings.</p>
                </header>

                <ResetAdmin onReset={() => { }} />
            </div>
        </div>
    );
};

export default AdminPage;

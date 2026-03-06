import React from 'react';
import { ResetAdmin } from '../components/ResetAdmin';

const AdminPage: React.FC = () => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12">
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

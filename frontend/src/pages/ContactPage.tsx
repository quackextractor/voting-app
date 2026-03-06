import React from 'react';
import { Mail, Github } from 'lucide-react';

export const ContactPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-8 flex items-center">
                Contact Information
            </h1>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-primary mb-3 flex items-center">
                        <Mail className="w-5 h-5 mr-2" /> How to contact me
                    </h2>
                    <p className="text-slate-600 mb-2">If you have any feedback or want to reach out directly, please email:</p>
                    <a href="mailto:slezak@spsejecna.cz" className="text-lg font-bold text-primary hover:underline">
                        slezak@spsejecna.cz
                    </a>
                </section>

                <hr className="border-slate-100 my-8" />

                <section>
                    <h2 className="text-xl font-bold text-primary mb-3 flex items-center">
                        <Github className="w-5 h-5 mr-2" /> Report Issues
                    </h2>
                    <p className="text-slate-600 mb-2">If you encounter technical issues, please report them to our GitHub repository:</p>
                    <a href="https://github.com/quackextractor/voting-app/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-primary hover:underline"
                    >
                        https://github.com/quackextractor/voting-app/issues
                    </a>
                </section>
            </div>
        </div>
    );
};

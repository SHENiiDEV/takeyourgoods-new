import React from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { flash } = usePage().props;

    return (
        <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-blue-600 selection:text-white">
            <Navbar />

            {/* Flash Messages */}
            {flash?.success && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full animate-fadeIn">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-lg shadow-emerald-500/5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span>{flash.success}</span>
                    </div>
                </div>
            )}

            {flash?.error && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full animate-fadeIn">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold shadow-lg shadow-rose-500/5">
                        <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                        <span>{flash.error}</span>
                    </div>
                </div>
            )}

            {/* Optional Sub-header */}
            {header && (
                <div className="border-b border-slate-800/60 bg-slate-950/40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {header}
                    </div>
                </div>
            )}

            {/* Main Page Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}


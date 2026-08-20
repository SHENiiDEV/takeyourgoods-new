import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Layers, 
    PlusCircle, 
    CreditCard, 
    FileText, 
    Download, 
    ArrowRight, 
    Sparkles, 
    ShieldCheck, 
    TrendingUp, 
    Clock, 
    CheckCircle2, 
    ExternalLink,
    Factory,
    DollarSign,
    Percent
} from 'lucide-react';
import TopUpModal from '@/Components/TopUpModal';

export default function Dashboard({ reports, stats, wallet_balance, company }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const hasReports = reports && reports.data && reports.data.length > 0;

    return (
        <AuthenticatedLayout>
            <Head title="Sourcing Intelligence Dashboard - TakeYourGoods AI" />

            <div className="space-y-8 animate-fadeIn">
                
                {/* Welcome & Wallet Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-bold uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" /> Autonomous AI Procurement
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Welcome back, {user?.name}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-400">
                            {user?.company_name ? user.company_name + ' • ' : ''}B2B Sourcing Command Center
                        </p>
                    </div>

                    {/* Wallet Snapshot Widget */}
                    <div className="relative z-10 flex items-center bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-x-5">
                        <div>
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Available Wallet Balance</div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-0.5">
                                €{parseFloat(wallet_balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-[10px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Ready for instant 1-click reports
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setIsTopUpOpen(true)}
                                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all"
                            >
                                <CreditCard className="w-3.5 h-3.5" />
                                <span>Top Up</span>
                            </button>
                            <Link
                                href={route('reports.create')}
                                className="flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-all"
                            >
                                <PlusCircle className="w-3.5 h-3.5" />
                                <span>New Report</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Performance Metrics Bento */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                        <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                            <span>Sourcing Dossiers</span>
                            <Layers className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="text-2xl font-extrabold text-white">{stats?.total_reports || 0}</div>
                        <div className="text-[11px] text-slate-500">Completed AI reports</div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                        <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                            <span>Audited Factories</span>
                            <Factory className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="text-2xl font-extrabold text-white">{stats?.factories_vetted || 0}</div>
                        <div className="text-[11px] text-slate-500">Tier-A verified suppliers</div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                        <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                            <span>Avg. Net Margin</span>
                            <Percent className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="text-2xl font-extrabold text-emerald-400">{stats?.avg_margin_identified || '58.0%'}</div>
                        <div className="text-[11px] text-slate-500">After sea freight &amp; duty</div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                        <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                            <span>Total Deployed</span>
                            <DollarSign className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="text-2xl font-extrabold text-white">
                            €{parseFloat(stats?.total_spent || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[11px] text-slate-500">In report generations</div>
                    </div>
                </div>

                {/* Sourcing Reports Section */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
                    <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
                        <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                Your Sourcing Reports
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                                    {reports?.total || 0}
                                </span>
                            </h2>
                            <p className="text-xs text-slate-400">Access your factory shortlists, unit economics, and outreach documents</p>
                        </div>
                        <Link
                            href={route('reports.create')}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Create Sourcing Report</span>
                        </Link>
                    </div>

                    {hasReports ? (
                        <div className="divide-y divide-slate-800/60">
                            {reports.data.map((report) => (
                                <div key={report.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                                                report.tier === 'enterprise' 
                                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                                    : report.tier === 'pro'
                                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                            }`}>
                                                {report.tier} (€{number_format(report.cost_deducted, 2)})
                                            </span>
                                            <span className="text-xs text-slate-500 font-mono">
                                                #TYG-REP-{String(report.id).padStart(5, '0')}
                                            </span>
                                            <span className="text-xs text-slate-500">&bull;</span>
                                            <span className="text-xs text-slate-400">
                                                {new Date(report.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {report.product_name}
                                        </h3>
                                        <p className="text-xs text-slate-400">
                                            Destination: {report.destination_country} &bull; Qty: {report.target_quantity?.toLocaleString() || 1000} units &bull; 
                                            Target EXW: €{parseFloat(report.target_cost || 15).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <a
                                            href={route('wallet.invoice', report.transaction_id || report.id)}
                                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                                            title="Download Tax Invoice (PDF)"
                                        >
                                            <FileText className="w-3.5 h-3.5 text-emerald-400" />
                                            <span>Invoice (PDF)</span>
                                        </a>
                                        <a
                                            href={route('reports.pdf', report.id)}
                                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                                            title="Download PDF Sourcing Dossier"
                                        >
                                            <Download className="w-3.5 h-3.5 text-slate-400" />
                                            <span>PDF Dossier</span>
                                        </a>
                                        <Link
                                            href={route('reports.show', report.id)}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold border border-blue-500/30 transition-all"
                                        >
                                            <span>View Interactive</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <div className="space-y-1 max-w-sm mx-auto">
                                <h3 className="text-base font-bold text-white">No Sourcing Reports Generated Yet</h3>
                                <p className="text-xs text-slate-400">
                                    Start by submitting your first product brief to get a verified factory shortlist and unit economics.
                                </p>
                            </div>
                            <Link
                                href={route('reports.create')}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
                            >
                                <PlusCircle className="w-4 h-4" />
                                <span>Create First Sourcing Report</span>
                            </Link>
                        </div>
                    )}
                </div>

            </div>

            <TopUpModal 
                isOpen={isTopUpOpen} 
                onClose={() => setIsTopUpOpen(false)} 
            />
        </AuthenticatedLayout>
    );
}

function number_format(number, decimals) {
    return parseFloat(number || 0).toLocaleString('en-US', {
        minimumFractionDigits: decimals || 2,
        maximumFractionDigits: decimals || 2
    });
}

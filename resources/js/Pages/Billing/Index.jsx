import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    CreditCard, 
    Download, 
    FileText, 
    CheckCircle2, 
    Building2, 
    ShieldCheck, 
    ArrowUpRight, 
    ArrowDownRight, 
    Lock, 
    Plus,
    Clock,
    DollarSign,
    Scale
} from 'lucide-react';
import TopUpModal from '@/Components/TopUpModal';

export default function Index({ wallet_balance, transactions, user_billing, company }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const balance = parseFloat(wallet_balance || 0);

    const companyName = company?.name || 'COLCHESTER LTD';
    const companyNumber = company?.number || '16113808';
    const companyAddress = company?.address || 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP';
    const companyEmail = company?.email || 'info@takeyoursgoods.co.uk';

    return (
        <AuthenticatedLayout>
            <Head title="Wallet &amp; B2B Billing - TakeYourGoods AI" />

            <div className="space-y-8 animate-fadeIn">
                
                {/* Header & Wallet Banner */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        
                        <div className="space-y-1">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-bold uppercase tracking-wider">
                                <CreditCard className="w-3 h-3" /> Financial Infrastructure &bull; B2B Accounting
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                Wallet &amp; Invoices
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-400">
                                Official UK B2B digital invoicing with 0% reverse charge VAT
                            </p>
                        </div>

                        {/* Balance Card Widget */}
                        <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-x-6">
                            <div>
                                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Available Balance</div>
                                <div className="text-3xl font-extrabold text-white font-mono mt-0.5">
                                    €{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                                    EUR Currency Account
                                </div>
                            </div>
                            <button
                                onClick={() => setIsTopUpOpen(true)}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Top Up Balance</span>
                            </button>
                        </div>

                    </div>
                </div>

                {/* Company Legal & Billing Details Bento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Issuing Entity Info */}
                    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-blue-400" />
                            Official Service Provider &amp; Invoicing Entity
                        </h3>
                        <div className="space-y-1.5 text-slate-300">
                            <p><strong>Company:</strong> {companyName}</p>
                            <p><strong>UK Registration Number:</strong> {companyNumber} (England &amp; Wales)</p>
                            <p><strong>Registered Address:</strong> {companyAddress}</p>
                            <p><strong>Billing Email:</strong> {companyEmail}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 mt-2">
                            <strong className="text-slate-300">Tax Note:</strong> Digital B2B Services &bull; 0% VAT Reverse Charge under Article 196 EU VAT Directive and UK VAT Act 1994 s7A.
                        </div>
                    </div>

                    {/* Client Company Info */}
                    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <FileText className="w-4 h-4 text-indigo-400" />
                                Client Billing Details
                            </h3>
                            <Link href={route('profile.edit')} className="text-blue-400 hover:text-blue-300 font-semibold text-[11px]">
                                Edit Details &rarr;
                            </Link>
                        </div>
                        <div className="space-y-1.5 text-slate-300">
                            <p><strong>Account Holder:</strong> {user_billing?.name || user?.name}</p>
                            <p><strong>Company Name:</strong> {user_billing?.company_name || 'Not Specified (Individual / Direct)'}</p>
                            <p><strong>VAT / Tax ID:</strong> {user_billing?.vat_number || 'N/A'}</p>
                            <p><strong>Billing Email:</strong> {user_billing?.email || user?.email}</p>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2">
                            All generated invoices will automatically reflect these company details.
                        </p>
                    </div>

                </div>

                {/* Transaction & Invoices Table */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-white flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-400" />
                                Transaction &amp; Invoice History
                            </h2>
                            <p className="text-xs text-slate-400">Download official B2B PDF tax receipts with PAID &amp; VERIFIED stamps</p>
                        </div>
                    </div>

                    {transactions?.data && transactions.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                                    <tr>
                                        <th className="py-3 px-4">Date &amp; Ref</th>
                                        <th className="py-3 px-4">Service Description</th>
                                        <th className="py-3 px-4">Type</th>
                                        <th className="py-3 px-4 text-right">Amount (€)</th>
                                        <th className="py-3 px-4 text-center">Status</th>
                                        <th className="py-3 px-4 text-right">B2B Invoice</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                                    {transactions.data.map((txn) => {
                                        const isTopUp = txn.type === 'top_up';
                                        return (
                                            <tr key={txn.id} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="py-4 px-4 space-y-0.5">
                                                    <div className="font-semibold text-white">
                                                        {new Date(txn.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </div>
                                                    <div className="font-mono text-[10px] text-slate-500">
                                                        {txn.reference_number}
                                                    </div>
                                                </td>

                                                <td className="py-4 px-4 font-medium text-slate-200">
                                                    {txn.service_name}
                                                </td>

                                                <td className="py-4 px-4">
                                                    {isTopUp ? (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                                                            <ArrowDownRight className="w-3.5 h-3.5" /> Wallet Top-Up
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400">
                                                            <ArrowUpRight className="w-3.5 h-3.5" /> Service Deduction
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="py-4 px-4 text-right font-mono font-bold text-sm">
                                                    <span className={isTopUp ? 'text-emerald-400' : 'text-slate-200'}>
                                                        {isTopUp ? '+' : '-'}€{parseFloat(txn.amount).toFixed(2)}
                                                    </span>
                                                </td>

                                                <td className="py-4 px-4 text-center">
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                        Completed
                                                    </span>
                                                </td>

                                                <td className="py-4 px-4 text-right">
                                                    <a
                                                        href={route('wallet.invoice', txn.id)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold border border-blue-500/30 transition-all"
                                                        title="Download Official B2B Tax Receipt"
                                                    >
                                                        <Download className="w-3 h-3" />
                                                        <span>Invoice (PDF)</span>
                                                    </a>
                                                </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-12 text-center text-slate-400 text-xs">
                            No billing transactions recorded yet.
                        </div>
                    )}
                </div>

            </div>

            {/* Top Up Modal */}
            <TopUpModal 
                isOpen={isTopUpOpen} 
                onClose={() => setIsTopUpOpen(false)} 
            />
        </AuthenticatedLayout>
    );
}

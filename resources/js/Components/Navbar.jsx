import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    Layers, 
    PlusCircle, 
    CreditCard, 
    FileText, 
    User as UserIcon, 
    LogOut, 
    ChevronDown, 
    Sparkles, 
    ShieldCheck, 
    Plus,
    Wallet
} from 'lucide-react';
import TopUpModal from '@/Components/TopUpModal';
import BrandLogo from '@/Components/BrandLogo';

export default function Navbar() {
    const { auth, url } = usePage().props;
    const user = auth.user;

    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const balance = user?.wallet_balance !== undefined ? parseFloat(user.wallet_balance) : 0;

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        
                        {/* Left: Brand Logo & Main Nav */}
                        <div className="flex items-center space-x-8">
                            <BrandLogo href={route('dashboard')} showTagline={true} size="md" />


                            <nav className="hidden md:flex items-center space-x-1">
                                <Link
                                    href={route('dashboard')}
                                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                                        url === '/dashboard'
                                            ? 'bg-slate-800/90 text-white border border-slate-700 shadow-sm'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('reports.create')}
                                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                        url === '/reports/create'
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                    }`}
                                >
                                    <PlusCircle className="w-3.5 h-3.5" />
                                    New Sourcing Report
                                </Link>
                                <Link
                                    href={route('billing.index')}
                                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                                        url === '/billing'
                                            ? 'bg-slate-800/90 text-white border border-slate-700 shadow-sm'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                    }`}
                                >
                                    Wallet &amp; Invoices
                                </Link>
                            </nav>
                        </div>

                        {/* Right: Wallet Balance Pill & User Dropdown */}
                        <div className="flex items-center space-x-3">
                            
                            {/* Wallet Balance Pill */}
                            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 shadow-inner">
                                <div className="flex items-center px-3 py-1 text-xs">
                                    <Wallet className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                                    <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Balance:</span>
                                    <span className="font-bold text-white font-mono">
                                        €{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsTopUpOpen(true)}
                                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg transition-all shadow-sm shadow-blue-500/20"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Top Up</span>
                                </button>
                            </div>

                            {/* User Profile Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-blue-400">
                                        {user?.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
                                    </div>
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                </button>

                                {isUserMenuOpen && (
                                    <div 
                                        className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-fadeIn text-slate-200"
                                        onMouseLeave={() => setIsUserMenuOpen(false)}
                                    >
                                        <div className="px-4 py-2.5 border-b border-slate-800">
                                            <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                                            <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                                            {user?.company_name && (
                                                <p className="text-[10px] text-blue-400 font-medium truncate mt-0.5">{user.company_name}</p>
                                            )}
                                        </div>

                                        <div className="py-1">
                                            <Link
                                                href={route('dashboard')}
                                                className="flex items-center gap-2 px-4 py-2 text-xs hover:bg-slate-800/80 text-slate-300 hover:text-white"
                                            >
                                                <Layers className="w-4 h-4 text-slate-400" /> Dashboard
                                            </Link>
                                            <Link
                                                href={route('billing.index')}
                                                className="flex items-center gap-2 px-4 py-2 text-xs hover:bg-slate-800/80 text-slate-300 hover:text-white"
                                            >
                                                <CreditCard className="w-4 h-4 text-slate-400" /> Wallet &amp; Invoices
                                            </Link>
                                            <Link
                                                href={route('profile.edit')}
                                                className="flex items-center gap-2 px-4 py-2 text-xs hover:bg-slate-800/80 text-slate-300 hover:text-white"
                                            >
                                                <UserIcon className="w-4 h-4 text-slate-400" /> Company Profile
                                            </Link>
                                        </div>

                                        <div className="border-t border-slate-800 pt-1">
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </header>

            {/* Top Up Modal */}
            <TopUpModal 
                isOpen={isTopUpOpen} 
                onClose={() => setIsTopUpOpen(false)} 
            />
        </>
    );
}

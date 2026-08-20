import React, { useState, useEffect } from 'react';
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
    Wallet,
    Menu,
    X,
    Coins
} from 'lucide-react';
import TopUpModal from '@/Components/TopUpModal';
import BrandLogo from '@/Components/BrandLogo';
import CurrencySwitcher from '@/Components/CurrencySwitcher';
import { useCurrency } from '@/Contexts/CurrencyContext';

export default function Navbar() {
    const { auth, url } = usePage().props;
    const user = auth.user;
    const { format } = useCurrency();

    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const balance = user?.wallet_balance !== undefined ? parseFloat(user.wallet_balance) : 0;

    // Prevent body scroll when mobile drawer is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        
                        {/* Left: Brand Logo & Desktop Nav */}
                        <div className="flex items-center space-x-8">
                            <BrandLogo href={route('dashboard')} showTagline={true} size="md" />

                            <nav className="hidden md:flex items-center space-x-1">
                                <Link
                                    href={route('dashboard')}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                                        url === '/dashboard'
                                            ? 'bg-slate-800/90 text-white border border-slate-700 shadow-sm'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('reports.create')}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
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
                                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                                        url === '/billing'
                                            ? 'bg-slate-800/90 text-white border border-slate-700 shadow-sm'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                    }`}
                                >
                                    Wallet &amp; Invoices
                                </Link>
                            </nav>
                        </div>

                        {/* Right: Wallet Balance, Desktop Dropdown & Mobile Hamburger */}
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            
                            {/* Wallet Balance Pill */}
                            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 shadow-inner">
                                <div className="flex items-center px-2.5 sm:px-3 py-1 text-xs">
                                    <Wallet className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                                    <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Balance:</span>
                                    <span className="font-bold text-white font-mono text-xs sm:text-sm">
                                        €{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsTopUpOpen(true)}
                                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-2 sm:px-2.5 py-1 rounded-lg transition-all shadow-sm shadow-blue-500/20"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Top Up</span>
                                </button>
                            </div>

                            {/* Desktop User Profile Menu */}
                            <div className="relative hidden md:block">
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
                                        className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-200"
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

                            {/* Mobile Hamburger Button */}
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                                aria-label="Open mobile menu"
                            >
                                <Menu className="w-5 h-5 text-slate-300" />
                            </button>

                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Slide-Over Drawer (Opens From Right) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
                    {/* Dark Backdrop */}
                    <div 
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="fixed inset-y-0 right-0 w-[300px] max-w-[85vw] bg-slate-950/98 border-l border-slate-800/90 shadow-2xl p-6 flex flex-col justify-between z-50 animate-in slide-in-from-right duration-300 ease-out">
                        
                        <div className="space-y-6">
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                                <BrandLogo href={route('dashboard')} size="sm" showTagline={false} />
                                <button
                                    type="button"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* User Profile Card */}
                            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-md">
                                        {user?.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="font-bold text-white text-xs truncate">{user?.name}</div>
                                        <div className="text-[11px] text-slate-400 truncate">{user?.email}</div>
                                        {user?.company_name && (
                                            <div className="text-[10px] text-blue-400 font-medium truncate">{user.company_name}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                                    <span className="text-slate-400">Wallet:</span>
                                    <span className="font-mono font-bold text-emerald-400">
                                        €{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <nav className="space-y-1.5">
                                <Link
                                    href={route('dashboard')}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                                        url === '/dashboard'
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                                    }`}
                                >
                                    <Layers className="w-4 h-4" />
                                    <span>Sourcing Dashboard</span>
                                </Link>

                                <Link
                                    href={route('reports.create')}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                                        url === '/reports/create'
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                                    }`}
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    <span>New Sourcing Report</span>
                                </Link>

                                <Link
                                    href={route('billing.index')}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                                        url === '/billing'
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                                    }`}
                                >
                                    <CreditCard className="w-4 h-4" />
                                    <span>Wallet &amp; B2B Invoices</span>
                                </Link>

                                <Link
                                    href={route('profile.edit')}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                                        url === '/profile'
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                                    }`}
                                >
                                    <UserIcon className="w-4 h-4" />
                                    <span>Company Profile</span>
                                </Link>
                            </nav>

                            {/* Top Up Fast Action */}
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsTopUpOpen(true);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Top Up Wallet Balance</span>
                                </button>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="pt-6 border-t border-slate-800/80 space-y-3">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs transition-colors border border-rose-500/20"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </Link>

                            <div className="text-center text-[10px] text-slate-500">
                                TakeYourGoods AI &bull; UK Entity
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* Top Up Modal */}
            <TopUpModal 
                isOpen={isTopUpOpen} 
                onClose={() => setIsTopUpOpen(false)} 
            />
        </>
    );
}


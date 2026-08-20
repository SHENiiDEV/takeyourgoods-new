import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Building2, 
    ShieldCheck, 
    Sparkles, 
    Globe, 
    Factory, 
    TrendingUp, 
    Lock, 
    CheckCircle2, 
    Layers, 
    ArrowRight,
    Users,
    Award,
    Target,
    Menu,
    X
} from 'lucide-react';
import BrandLogo from '@/Components/BrandLogo';
import Footer from '@/Components/Footer';
import OfflineBanner from '@/Components/OfflineBanner';
import CookieConsent from '@/Components/CookieConsent';
import CurrencySwitcher from '@/Components/CurrencySwitcher';

export default function About({ company }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 selection:bg-blue-600 selection:text-white font-sans">
            <Head title="About Us - Autonomous B2B Sourcing Intelligence | TakeYourGoods AI" />
            <OfflineBanner />

            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <BrandLogo href="/" showTagline={true} size="md" />

                    <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-300">
                        <Link href={route('how-it-works')} className="hover:text-blue-400 transition-colors">How It Works</Link>
                        <Link href={route('about')} className="text-blue-400 font-bold">About Us</Link>
                        <Link href={route('support')} className="hover:text-blue-400 transition-colors">Support</Link>
                        <Link href={route('contact')} className="hover:text-blue-400 transition-colors">Contact</Link>
                    </nav>

                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <CurrencySwitcher variant="inline" />

                        {user ? (
                            <Link
                                href={route('dashboard')}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all"
                            >
                                <Layers className="w-4 h-4" />
                                <span className="hidden sm:inline">Go to Dashboard</span>
                                <span className="sm:hidden">Dashboard</span>
                            </Link>
                        ) : (
                            <div className="hidden sm:flex items-center space-x-2">
                                <Link
                                    href={route('login')}
                                    className="text-xs font-semibold text-slate-300 hover:text-white transition-colors px-2.5 py-2"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all"
                                >
                                    <span>Get Started</span>
                                </Link>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={() => setIsMobileNavOpen(true)}
                            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            {isMobileNavOpen && (
                <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200">
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsMobileNavOpen(false)} />
                    <div className="fixed inset-y-0 right-0 w-[290px] max-w-[85vw] bg-slate-950/98 border-l border-slate-800 p-6 flex flex-col justify-between z-50 animate-in slide-in-from-right duration-300">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                <BrandLogo href="/" size="sm" showTagline={false} />
                                <button type="button" onClick={() => setIsMobileNavOpen(false)} className="p-1.5 rounded-xl bg-slate-900 text-slate-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="space-y-1.5 text-xs font-bold">
                                <Link href={route('how-it-works')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-900">
                                    <span>How It Works</span>
                                </Link>
                                <Link href={route('about')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-blue-600 text-white">
                                    <span>About Us</span>
                                </Link>
                                <Link href={route('support')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-900">
                                    <span>Help Desk</span>
                                </Link>
                                <Link href={route('contact')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-900">
                                    <span>Contact Us</span>
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero */}
            <section className="pt-16 pb-12 text-center relative overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase">
                        <Building2 className="w-3.5 h-3.5" /> Corporate Mission &amp; Infrastructure
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
                        Democratizing Tier-1 Global Manufacturing with Autonomous Intelligence
                    </h1>
                    <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        We build neural supply chain architectures that connect Western brands, Amazon FBA powerhouses, and industrial importers directly with audited Asian factories — eliminating opaque middleman commissions forever.
                    </p>
                </div>
            </section>

            {/* Core Pillars Grid */}
            <section className="py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Pillar 1 */}
                        <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                <Factory className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Direct Factory Relationships</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Traditional sourcing agents add 30-40% markups while hiding supplier identities. TakeYourGoods AI delivers direct factory contacts, WeChat channels, and certified manufacturing line addresses.
                            </p>
                        </div>

                        {/* Pillar 2 */}
                        <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Autonomous Trade Intelligence</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Our models cross-reference live customs freight tariffs, port handling rates, and HS duty codes into the US, UK, and EU — forecasting your true unit economics before you commit capital.
                            </p>
                        </div>

                        {/* Pillar 3 */}
                        <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Institutional Governance</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Headquartered in the United Kingdom under full corporate compliance. Every invoice includes 0% VAT Reverse Charge and is backed by a 14-day digital wallet guarantee.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* Numbers Bento */}
            <section className="py-12 bg-slate-950/60 border-y border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                            <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">1,200+</div>
                            <div className="text-xs text-slate-300 font-semibold mt-1">Audited Facilities</div>
                            <div className="text-[11px] text-slate-500">In Shenzhen, Ningbo &amp; Vietnam</div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">58.4%</div>
                            <div className="text-xs text-slate-300 font-semibold mt-1">Avg Margin Improvement</div>
                            <div className="text-[11px] text-slate-500">By bypassing trading agents</div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                            <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">&lt; 60s</div>
                            <div className="text-xs text-slate-300 font-semibold mt-1">Dossier Generation</div>
                            <div className="text-[11px] text-slate-500">Autonomous computation speed</div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">100%</div>
                            <div className="text-xs text-slate-300 font-semibold mt-1">Client IP Ownership</div>
                            <div className="text-[11px] text-slate-500">Full mold &amp; brief rights</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Corporate Entity Details */}
            <section className="py-16 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-slate-800">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Merchant of Record &bull; UK Corporate Entity</h3>
                                <p className="text-xs text-slate-400">TakeYourGoods AI is operated under English jurisdiction with full B2B fiscal transparency.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                                <div className="text-[10px] text-slate-500 uppercase font-bold">Registered Legal Entity</div>
                                <div className="font-bold text-white text-sm">{company?.name || 'COLCHESTER LTD'}</div>
                                <div className="text-slate-400">Company No: {company?.number || '16113808'}</div>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                                <div className="text-[10px] text-slate-500 uppercase font-bold">Registered Office</div>
                                <div className="text-slate-200">{company?.address || 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP'}</div>
                                <div className="text-slate-500 text-[10px]">Registered in England &amp; Wales</div>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-xs text-slate-400">
                                Trade Desk Dispatch: <span className="text-blue-400 font-mono font-semibold">{company?.email || 'info@takeyourgoods.co.uk'}</span>
                            </div>
                            <Link
                                href={route('contact')}
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20"
                            >
                                <span>Contact Trade Desk</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <CurrencySwitcher variant="floating" />
            <CookieConsent />
            <Footer />
        </div>
    );
}

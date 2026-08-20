import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Sparkles, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Building2, 
    Layers, 
    Factory, 
    Calculator, 
    FileText, 
    Mail, 
    ChevronRight, 
    Zap, 
    Lock,
    Globe,
    Cpu,
    Coins,
    Check,
    Menu,
    X
} from 'lucide-react';
import BrandLogo from '@/Components/BrandLogo';
import Footer from '@/Components/Footer';
import OfflineBanner from '@/Components/OfflineBanner';
import CookieConsent from '@/Components/CookieConsent';
import CurrencySwitcher from '@/Components/CurrencySwitcher';
import { useCurrency } from '@/Contexts/CurrencyContext';

export default function HowItWorks({ company }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const { format } = useCurrency();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            id: '01',
            title: 'Instant Provisioning & Digital Wallet',
            badge: 'Step 01 • Onboarding',
            shortDesc: 'Instant corporate registration and digital wallet balance activation.',
            fullDesc: 'Create your B2B account in under 30 seconds. Choose your base currency (EUR, USD, or GBP) and fund your digital wallet on demand with full 14-day money-back guarantee protection.',
            highlights: [
                'Instant B2B wallet activation',
                'No recurring subscription locks',
                'Official UK B2B Tax Invoices with 0% Reverse Charge VAT',
                'Immediate access to AI sourcing engine'
            ],
            icon: Coins,
            color: 'from-blue-600 to-indigo-600',
            borderColor: 'border-blue-500/30',
        },
        {
            id: '02',
            title: 'Neural Factory Discovery & Intelligence',
            badge: 'Step 02 • Deep Analysis',
            shortDesc: 'Autonomous scanning of 1,200+ audited Asian manufacturing lines in < 60s.',
            fullDesc: 'Input your product specifications, target EXW cost, and quality tolerances. Our autonomous neural engine queries verified OEM/ODM registries in Shenzhen, Ningbo, Dongguan, and Vietnam to match your brief with tier-1 export suppliers.',
            highlights: [
                '1,200+ audited OEM/ODM factories vetted',
                'Verified MOQ, production capacity & tooling timelines',
                'ISO9001 / BSCI / CE / FCC compliance audit scores',
                'Direct factory manager contact channels (no trading middlemen)'
            ],
            icon: Factory,
            color: 'from-indigo-600 to-purple-600',
            borderColor: 'border-indigo-500/30',
        },
        {
            id: '03',
            title: 'Reverse Landed Cost & Customs Tariffs',
            badge: 'Step 03 • Unit Economics',
            shortDesc: 'Automated HS code classification, sea container freight, and margin forecasting.',
            fullDesc: 'Our proprietary trade matrix calculates your true landed cost per unit into US FBA, UK, or EU warehouses. Factor in sea freight, port handling, customs tariffs, and compare direct factory margins against traditional agent quotes.',
            highlights: [
                'HS Tariff code mapping with exact duty rates',
                'Real-time container sea & air freight rate estimation',
                'Landed cost per unit down to the exact cent',
                'Net profit & margin forecasts before committing capital'
            ],
            icon: Calculator,
            color: 'from-purple-600 to-pink-600',
            borderColor: 'border-purple-500/30',
        },
        {
            id: '04',
            title: 'Turnkey Dossiers & B2B Invoices',
            badge: 'Step 04 • Execution',
            shortDesc: 'Production-ready dossier, bilingual RFQ scripts, and PDF downloads.',
            fullDesc: 'Receive a turnkey B2B sourcing dossier ready for immediate execution: golden sample inspection protocols, 1-click bilingual English/Chinese RFQ scripts for WeChat and 1688, plus downloadable PDF reports and official invoices.',
            highlights: [
                'Interactive dashboard dossier + exportable PDF',
                'Bilingual English & Chinese RFQ scripts ready to send',
                'Milestone golden sample quality control protocol',
                'Instant downloadable B2B Tax Receipts with PAID stamp'
            ],
            icon: FileText,
            color: 'from-emerald-600 to-teal-600',
            borderColor: 'border-emerald-500/30',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 selection:bg-blue-600 selection:text-white font-sans">
            <Head title="How It Works - Autonomous B2B Sourcing | TakeYourGoods AI" />
            <OfflineBanner />

            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <BrandLogo href="/" showTagline={true} size="md" />

                    <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-300">
                        <Link href={route('how-it-works')} className="text-blue-400 font-bold">How It Works</Link>
                        <Link href={route('about')} className="hover:text-blue-400 transition-colors">About Us</Link>
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
                                    <ArrowRight className="w-3.5 h-3.5" />
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
                                <Link href={route('how-it-works')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-blue-600 text-white">
                                    <Zap className="w-4 h-4" /> How It Works
                                </Link>
                                <Link href={route('about')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-900">
                                    <Building2 className="w-4 h-4 text-blue-400" /> About Us
                                </Link>
                                <Link href={route('support')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-900">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Help Desk
                                </Link>
                                <Link href={route('contact')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-900">
                                    <Mail className="w-4 h-4 text-purple-400" /> Contact Us
                                </Link>
                            </nav>
                        </div>
                        <div className="pt-6 border-t border-slate-800 space-y-2">
                            {user ? (
                                <Link href={route('dashboard')} className="w-full flex items-center justify-center py-3 rounded-xl bg-blue-600 text-white font-bold text-xs">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('register')} className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs">
                                        Create B2B Account
                                    </Link>
                                    <Link href={route('login')} className="w-full flex items-center justify-center py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-16 overflow-hidden">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase">
                        <Zap className="w-3.5 h-3.5" /> Complete Sourcing Architecture
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
                        How TakeYourGoods AI Automates B2B Sourcing in 4 Steps
                    </h1>
                    <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        From custom product specifications to verified Asian factory contacts, HS tariff classification, and turnkey golden sample protocols in under 60 seconds.
                    </p>
                </div>
            </section>

            {/* Interactive Step-by-Step Tabs */}
            <section className="py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Step Navigation Pill Selector */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                        {steps.map((s, idx) => {
                            const Icon = s.icon;
                            const isActive = activeStep === idx;
                            return (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => setActiveStep(idx)}
                                    className={`p-4 rounded-2xl text-left border transition-all relative overflow-hidden ${
                                        isActive 
                                            ? 'bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500' 
                                            : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                            {s.id}
                                        </span>
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                                    </div>
                                    <div className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                                        {s.title}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Step Detailed Showcase Card */}
                    <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            
                            <div className="lg:col-span-7 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase">
                                    {steps[activeStep].badge}
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                    {steps[activeStep].title}
                                </h2>

                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {steps[activeStep].fullDesc}
                                </p>

                                <div className="space-y-3 pt-2">
                                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Capabilities:</div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {steps[activeStep].highlights.map((h, i) => (
                                            <div key={i} className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl">
                                                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Visual Action Right Column */}
                            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 text-center space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                                    {React.createElement(steps[activeStep].icon, { className: "w-8 h-8" })}
                                </div>

                                <h3 className="text-base font-bold text-white">
                                    Ready to experience Step {steps[activeStep].id}?
                                </h3>

                                <p className="text-xs text-slate-400">
                                    Join international Amazon FBA brands, importers, and procurement teams saving over 58% on manufacturing margins.
                                </p>

                                <Link
                                    href={user ? route('reports.create') : route('register')}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    <span>Launch Sourcing Engine</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* Sourcing Tiers Overview */}
            <section className="py-16 bg-slate-950/60 border-t border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Sourcing Intelligence Packages</h2>
                        <p className="text-xs sm:text-sm text-slate-400">Choose the exact level of supplier verification required for your production scale.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                            <div className="text-xs font-bold uppercase text-slate-400">Starter Tier</div>
                            <div className="text-2xl font-extrabold text-white font-mono">{format(149, 0)}</div>
                            <p className="text-xs text-slate-400">Ideal for initial product validation and rapid MOQ benchmark testing with 3 audited factories.</p>
                            <Link href={user ? route('reports.create', { tier: 'starter' }) : route('register')} className="block text-center py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold">
                                Select Starter
                            </Link>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-900 border-2 border-blue-500 shadow-xl shadow-blue-500/10 space-y-4 relative">
                            <span className="absolute -top-3 right-6 bg-blue-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">Most Popular</span>
                            <div className="text-xs font-bold uppercase text-blue-400">Pro Sourcing Tier</div>
                            <div className="text-2xl font-extrabold text-white font-mono">{format(499, 0)}</div>
                            <p className="text-xs text-slate-400">Comprehensive supply chain dossier with 5 audited suppliers, complete landed cost breakdowns, and bilingual RFQ drafts.</p>
                            <Link href={user ? route('reports.create', { tier: 'pro' }) : route('register')} className="block text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/25">
                                Select Pro
                            </Link>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                            <div className="text-xs font-bold uppercase text-purple-400">Enterprise Turnkey Tier</div>
                            <div className="text-2xl font-extrabold text-white font-mono">{format(1499, 0)}</div>
                            <p className="text-xs text-slate-400">Institutional-grade supply chain intelligence with 8 factories, full OEM tooling audit, and customs tariff defense notes.</p>
                            <Link href={user ? route('reports.create', { tier: 'enterprise' }) : route('register')} className="block text-center py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold">
                                Select Enterprise
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

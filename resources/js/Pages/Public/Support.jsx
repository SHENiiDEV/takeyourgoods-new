import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    HelpCircle, 
    Mail, 
    CreditCard, 
    Building2, 
    ChevronDown, 
    ArrowRight, 
    ShieldCheck, 
    Sparkles, 
    FileText, 
    Layers,
    Menu,
    X,
    ExternalLink,
    Zap
} from 'lucide-react';
import BrandLogo from '@/Components/BrandLogo';
import Footer from '@/Components/Footer';
import OfflineBanner from '@/Components/OfflineBanner';
import CookieConsent from '@/Components/CookieConsent';
import CurrencySwitcher from '@/Components/CurrencySwitcher';
import { useCurrency } from '@/Contexts/CurrencyContext';

export default function Support({ company }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const { format } = useCurrency();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);

    const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

    const faqs = [
        {
            q: "How does TakeYourGoods AI source tier-1 factories?",
            a: "Our autonomous sourcing algorithms analyze verified OEM/ODM supplier registries across major manufacturing hubs (Shenzhen, Ningbo, Dongguan, Vietnam). Every matched facility is cross-referenced for verified export revenue, ISO/BSCI certifications, real factory floor video telemetry, and active export history into Western markets."
        },
        {
            q: "What is your 14-day refund and wallet guarantee policy?",
            a: "We maintain a strict 100% money-back guarantee for any unspent funds deposited in your digital wallet within 14 days of top-up. Once an AI Sourcing Dossier has been generated and delivered to your dashboard, the fee for that specific computed report is non-refundable as digital B2B intelligence."
        },
        {
            q: "How do B2B Tax Invoices and 0% Reverse Charge VAT work?",
            a: "Every top-up and service deduction automatically generates an official UK B2B Tax Invoice issued by our UK registered entity (" + (company?.name || 'COLCHESTER LTD') + ", Co. No. " + (company?.number || '16113808') + "). Digital supplies provided to businesses are billed under 0% Reverse Charge VAT (UK VAT Act 1994 s7A / Article 196 EU VAT Directive)."
        },
        {
            q: "Can I download and share the sourcing dossiers with my team?",
            a: "Yes! Every sourcing report generated in your dashboard comes with both an interactive dashboard view (complete with bilingual Chinese RFQ scripts, landed cost calculators, and factory manager contacts) as well as an official exportable PDF document ready to be shared with stakeholders."
        },
        {
            q: "What is the difference between Starter, Pro, and Enterprise tiers?",
            a: "The Starter tier (" + format(149, 0) + ") gives you 3 audited factory matches for rapid feasibility testing. The Pro tier (" + format(499, 0) + ") provides 5 audited factories, complete reverse landed cost models, customs duty mapping, and bilingual RFQ drafts. The Enterprise tier (" + format(1499, 0) + ") includes 8 suppliers, full tooling analysis, golden sample QC protocols, and customs tariff defense notes."
        },
        {
            q: "Who owns the intellectual property and product designs?",
            a: "You retain 100% ownership of your intellectual property, custom molds, product concepts, and negotiation channels. TakeYourGoods AI acts solely as an autonomous intelligence orchestrator."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 selection:bg-blue-600 selection:text-white font-sans">
            <Head title="Support & Help Desk - FAQ & Knowledge Base | TakeYourGoods AI" />
            <OfflineBanner />

            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <BrandLogo href="/" showTagline={true} size="md" />

                    <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-300">
                        <Link href={route('how-it-works')} className="hover:text-blue-400 transition-colors">How It Works</Link>
                        <Link href={route('about')} className="hover:text-blue-400 transition-colors">About Us</Link>
                        <Link href={route('support')} className="text-blue-400 font-bold">Support</Link>
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
                                <Link href={route('about')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-900">
                                    <span>About Us</span>
                                </Link>
                                <Link href={route('support')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-blue-600 text-white">
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase">
                        <HelpCircle className="w-3.5 h-3.5" /> 24/7 Corporate Knowledge Base
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Support &amp; Help Desk
                    </h1>
                    <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
                        Find answers to common questions regarding our factory auditing methodology, customs duty calculations, wallet billing, and B2B PDF tax receipts.
                    </p>
                </div>
            </section>

            {/* Support Channels Grid */}
            <section className="py-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Channel 1: Email */}
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                <Mail className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-white">Executive Email Support</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Direct channel to our supply chain desk for priority assistance and custom briefs.
                            </p>
                            <a 
                                href={`mailto:${company?.email || 'info@takeyourgoods.co.uk'}`}
                                className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-bold hover:text-blue-300 font-mono pt-1"
                            >
                                <span>{company?.email || 'info@takeyourgoods.co.uk'}</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>

                        {/* Channel 2: Wallet & Invoices */}
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-white">B2B Invoices &amp; Wallet</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Download official PDF tax receipts and top up your sourcing balance instantly.
                            </p>
                            <Link 
                                href={user ? route('billing.index') : route('login')}
                                className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold hover:text-emerald-300 pt-1"
                            >
                                <span>Manage Billing &rarr;</span>
                            </Link>
                        </div>

                        {/* Channel 3: Custom Inquiry */}
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-white">Corporate Inquiries</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Request institutional-grade NDA templates or enterprise bulk sourcing packages.
                            </p>
                            <Link 
                                href={route('contact')}
                                className="inline-flex items-center gap-1 text-xs text-purple-400 font-bold hover:text-purple-300 pt-1"
                            >
                                <span>Open Support Ticket &rarr;</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* Interactive FAQ Accordion */}
            <section className="py-12 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-extrabold text-white">Frequently Answered Questions</h2>
                        <p className="text-xs text-slate-400 mt-1">Clear answers to platform operations, vetting standards, and fiscal compliance</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden transition-all"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-white hover:text-blue-400 transition-colors"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-400' : ''}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Support Ticket Transfer Card */}
                    <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-blue-900/30 via-slate-900 to-indigo-900/30 border border-blue-500/30 text-center space-y-4 shadow-xl">
                        <h3 className="text-lg font-bold text-white">Have a specific question not covered here?</h3>
                        <p className="text-xs text-slate-400 max-w-md mx-auto">
                            Our team of trade compliance and Asian sourcing engineers is ready to assist you.
                        </p>
                        <Link
                            href={route('contact')}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
                        >
                            <span>Open Support Ticket</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                </div>
            </section>

            <CurrencySwitcher variant="floating" />
            <CookieConsent />
            <Footer />
        </div>
    );
}

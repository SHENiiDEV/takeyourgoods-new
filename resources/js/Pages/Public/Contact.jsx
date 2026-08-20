import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { 
    Mail, 
    Building2, 
    Send, 
    CheckCircle2, 
    Clock, 
    ShieldCheck, 
    Sparkles, 
    ArrowLeft,
    Layers,
    Menu,
    X,
    MessageSquare,
    PhoneCall
} from 'lucide-react';
import BrandLogo from '@/Components/BrandLogo';
import Footer from '@/Components/Footer';
import OfflineBanner from '@/Components/OfflineBanner';
import CookieConsent from '@/Components/CookieConsent';
import CurrencySwitcher from '@/Components/CurrencySwitcher';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Contact({ company }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.send'), {
            onSuccess: () => reset('subject', 'message'),
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 selection:bg-blue-600 selection:text-white font-sans">
            <Head title="Contact Us - Corporate Support Desk | TakeYourGoods AI" />
            <OfflineBanner />

            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <BrandLogo href="/" showTagline={true} size="md" />

                    <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-300">
                        <Link href={route('how-it-works')} className="hover:text-blue-400 transition-colors">How It Works</Link>
                        <Link href={route('about')} className="hover:text-blue-400 transition-colors">About Us</Link>
                        <Link href={route('support')} className="hover:text-blue-400 transition-colors">Support</Link>
                        <Link href={route('contact')} className="text-blue-400 font-bold">Contact</Link>
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
                                <Link href={route('support')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-900">
                                    <span>Help Desk</span>
                                </Link>
                                <Link href={route('contact')} className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-blue-600 text-white">
                                    <span>Contact Us</span>
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 py-12 lg:py-16 relative overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    
                    <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase">
                            <Mail className="w-3.5 h-3.5" /> Executive Trade Desk
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Get in Touch with Our Procurement Specialists
                        </h1>
                        <p className="text-sm text-slate-400">
                            Have questions regarding custom OEM tooling, high-volume production batches, or enterprise API access? We respond within 4 business hours.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Left: Contact Form */}
                        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
                            
                            {/* Success Notification Banner */}
                            {(flash?.success || recentlySuccessful) && (
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-in fade-in duration-200">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                    <span>{flash?.success || 'Your inquiry has been successfully transmitted! Our trade desk will reply shortly.'}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="name" value="Your Name" className="text-slate-300 text-xs font-semibold" />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Alexander Vance"
                                            className="mt-1 block w-full bg-slate-950 border-slate-700 text-white rounded-xl text-xs"
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-1 text-xs text-rose-400" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="email" value="Business Email" className="text-slate-300 text-xs font-semibold" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="alex@vance-logistics.co.uk"
                                            className="mt-1 block w-full bg-slate-950 border-slate-700 text-white rounded-xl text-xs"
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-1 text-xs text-rose-400" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="subject" value="Subject / Inquiry Topic" className="text-slate-300 text-xs font-semibold" />
                                    <TextInput
                                        id="subject"
                                        name="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="e.g. Enterprise Custom Sourcing & Tooling Inquiry"
                                        className="mt-1 block w-full bg-slate-950 border-slate-700 text-white rounded-xl text-xs"
                                        required
                                    />
                                    <InputError message={errors.subject} className="mt-1 text-xs text-rose-400" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="message" value="Message / Product Brief Details" className="text-slate-300 text-xs font-semibold" />
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Please provide details about your target product category, estimated batch size, destination market, or specific questions..."
                                        className="mt-1 block w-full bg-slate-950 border-slate-700 text-white rounded-xl text-xs focus:border-blue-500 focus:ring-blue-500 p-3 leading-relaxed"
                                        required
                                    />
                                    <InputError message={errors.message} className="mt-1 text-xs text-rose-400" />
                                </div>

                                <div className="pt-2">
                                    <PrimaryButton
                                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25"
                                        disabled={processing}
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>{processing ? 'Transmitting Ticket...' : 'Send Inquiry to Support Desk'}</span>
                                    </PrimaryButton>
                                </div>
                            </form>

                        </div>

                        {/* Right: Dynamic Company Credentials & Info */}
                        <div className="lg:col-span-5 space-y-4">
                            
                            {/* Executive Card */}
                            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-slate-400">Direct Email Support</div>
                                        <a href={`mailto:${company?.email || 'info@takeyourgoods.co.uk'}`} className="text-sm font-bold text-white hover:text-blue-400 font-mono transition-colors">
                                            {company?.email || 'info@takeyourgoods.co.uk'}
                                        </a>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Monitored 24/7 by our London and Shenzhen supply chain operations desk. Average response time: &lt; 4 hours.
                                </p>
                            </div>

                            {/* Registered UK Office */}
                            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-slate-400">Merchant of Record</div>
                                        <div className="text-sm font-bold text-white">{company?.name || 'COLCHESTER LTD'}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-300 space-y-1">
                                    <div><strong>Company Registration:</strong> {company?.number || '16113808'}</div>
                                    <div><strong>Registered Address:</strong> {company?.address || 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP'}</div>
                                    <div className="text-slate-500 text-[11px] pt-1">Registered in England &amp; Wales</div>
                                </div>
                            </div>

                            {/* Response SLA Badge */}
                            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-300">
                                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                <span>
                                    <strong>Guaranteed SLA:</strong> All support tickets received through this portal are logged directly into our engineering and trade queue.
                                </span>
                            </div>

                        </div>

                    </div>

                </div>
            </main>

            <CurrencySwitcher variant="floating" />
            <CookieConsent />
            <Footer />
        </div>
    );
}

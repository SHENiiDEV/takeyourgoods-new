import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    AlertTriangle, 
    ShieldAlert, 
    ServerCrash, 
    Clock, 
    Home, 
    ArrowLeft, 
    Mail, 
    Sparkles, 
    RefreshCw,
    Building2
} from 'lucide-react';
import BrandLogo from '@/Components/BrandLogo';
import Footer from '@/Components/Footer';

export default function Error({ status = 404, message }) {
    const errorConfigs = {
        404: {
            code: '404',
            badge: 'Route Relocated',
            title: 'Lost in the Night Routine',
            subtitle: 'Page Not Found / Resource Asleep',
            description: message || 'The procurement dossier, factory record, or route you requested could not be located in our active index. It may have been archived or is currently sleeping.',
            icon: AlertTriangle,
            iconColor: 'text-amber-400',
            glowColor: 'from-amber-600/20 via-orange-600/10 to-transparent',
            borderColor: 'border-amber-500/30',
        },
        500: {
            code: '500',
            badge: 'Cluster Exception',
            title: 'Temporary Clinical Rest',
            subtitle: 'Internal Sourcing Server Interruption',
            description: message || 'Our high-performance AI sourcing clusters encountered an unexpected compute exception. Our engineering team has been automatically dispatched.',
            icon: ServerCrash,
            iconColor: 'text-rose-400',
            glowColor: 'from-rose-600/20 via-pink-600/10 to-transparent',
            borderColor: 'border-rose-500/30',
        },
        403: {
            code: '403',
            badge: 'Clearance Required',
            title: 'Restricted Medical & Procurement Section',
            subtitle: 'Access Forbidden / Unauthorized Scope',
            description: message || 'You do not have the required enterprise authorization credentials to access this confidential manufacturing dossier or financial record.',
            icon: ShieldAlert,
            iconColor: 'text-purple-400',
            glowColor: 'from-purple-600/20 via-indigo-600/10 to-transparent',
            borderColor: 'border-purple-500/30',
        },
        503: {
            code: '503',
            badge: 'System Care',
            title: 'Scheduled System Care',
            subtitle: 'Maintenance & Registry Optimization',
            description: message || 'We are currently updating our global factory database indexes and customs tariff calculation matrices. Service will resume momentarily.',
            icon: Clock,
            iconColor: 'text-blue-400',
            glowColor: 'from-blue-600/20 via-cyan-600/10 to-transparent',
            borderColor: 'border-blue-500/30',
        },
    };

    const config = errorConfigs[status] || errorConfigs[404];
    const IconComponent = config.icon;

    return (
        <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 selection:bg-blue-600 selection:text-white font-sans relative overflow-hidden">
            <Head title={`${config.code} - ${config.title} | TakeYourGoods AI`} />

            {/* Ambient Background Glow */}
            <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr ${config.glowColor} rounded-full blur-3xl pointer-events-none`} />

            {/* Header Bar */}
            <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <BrandLogo href="/" size="md" showTagline={true} />
                    
                    <a
                        href="mailto:info@takeyourgoods.co.uk"
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                        <Mail className="w-3.5 h-3.5 text-blue-400" />
                        <span className="hidden sm:inline">Emergency Dispatch:</span>
                        <span className="font-mono text-slate-300">info@takeyourgoods.co.uk</span>
                    </a>
                </div>
            </header>

            {/* Main Error Content */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
                <div className="w-full max-w-xl bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-2xl text-center space-y-6">
                    
                    {/* Glowing Icon & Status Pill */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className={`w-20 h-20 rounded-3xl bg-slate-950/90 border ${config.borderColor} flex items-center justify-center shadow-xl shadow-blue-500/5 relative group`}>
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/10 to-transparent animate-pulse" />
                            <IconComponent className={`w-10 h-10 ${config.iconColor} relative z-10`} />
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono font-bold tracking-wider">
                            <span className="text-blue-400">HTTP {config.code}</span>
                            <span className="text-slate-600">&bull;</span>
                            <span className="text-slate-400 uppercase">{config.badge}</span>
                        </div>
                    </div>

                    {/* Titles */}
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            {config.title}
                        </h1>
                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                            {config.subtitle}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto pt-2">
                            {config.description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-800/80">
                        <Link
                            href={route('dashboard')}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
                        >
                            <Home className="w-4 h-4" />
                            <span>Return to Dashboard</span>
                        </Link>

                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors border border-slate-700"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Go Back</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition-colors"
                            title="Reload Page"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Trust Footnote */}
                    <div className="text-[11px] text-slate-500 pt-2 flex items-center justify-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-slate-600" />
                        <span>COLCHESTER LTD &bull; UK Entity Co. 16113808</span>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

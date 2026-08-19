import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ShieldCheck, Cookie, Settings, Check, X, ChevronRight, Lock } from 'lucide-react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [isCustomizing, setIsCustomizing] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true, // Always required
        analytics: true,
        marketing: false,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const consent = localStorage.getItem('takeyourgoods_cookie_consent');
            if (!consent) {
                // Short delay for smooth appearance
                const timer = setTimeout(() => setIsVisible(true), 800);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    const saveConsent = (settings) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('takeyourgoods_cookie_consent', JSON.stringify({
                ...settings,
                timestamp: new Date().toISOString(),
            }));
        }
        setIsVisible(false);
        setIsCustomizing(false);
    };

    const handleAcceptAll = () => {
        const fullConsent = { essential: true, analytics: true, marketing: true };
        setPreferences(fullConsent);
        saveConsent(fullConsent);
    };

    const handleEssentialOnly = () => {
        const essentialConsent = { essential: true, analytics: false, marketing: false };
        setPreferences(essentialConsent);
        saveConsent(essentialConsent);
    };

    const handleSaveCustom = () => {
        saveConsent(preferences);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 pointer-events-none flex justify-center animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="w-full max-w-2xl bg-slate-900/95 border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-2xl pointer-events-auto text-slate-200 space-y-4 ring-1 ring-blue-500/20">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 flex-shrink-0">
                            <Cookie className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                Cookie &amp; Privacy Preferences
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                                    UK GDPR
                                </span>
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                                We use essential cookies to maintain secure sessions, wallet transactions, and generate AI sourcing reports.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Detailed Settings Accordion */}
                {isCustomizing && (
                    <div className="space-y-2.5 pt-3 pb-1 border-t border-slate-800 text-xs animate-in fade-in duration-200">
                        {/* Essential */}
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                            <div className="space-y-0.5 pr-4">
                                <div className="font-bold text-white flex items-center gap-1.5">
                                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Strictly Necessary &amp; Security Cookies</span>
                                </div>
                                <p className="text-[11px] text-slate-400">Required for authentication, wallet balance security, and invoice rendering.</p>
                            </div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-800 px-2 py-1 rounded-lg">Always Active</span>
                        </div>

                        {/* Analytics */}
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                            <div className="space-y-0.5 pr-4">
                                <div className="font-bold text-white">Performance &amp; Sourcing Analytics</div>
                                <p className="text-[11px] text-slate-400">Helps us optimize factory query speeds and procurement calculation models.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${preferences.analytics ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'}`}
                            >
                                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                            </button>
                        </div>

                        {/* Marketing */}
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                            <div className="space-y-0.5 pr-4">
                                <div className="font-bold text-white">B2B Product Announcements</div>
                                <p className="text-[11px] text-slate-400">Receive new Asian factory tariff drops and supply chain intelligence alerts.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${preferences.marketing ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'}`}
                            >
                                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer Controls & Links */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80 text-xs">
                    <div className="text-[11px] text-slate-400 text-center sm:text-left">
                        Read our{' '}
                        <Link href={route('privacy')} className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2">
                            Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link href={route('terms')} className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2">
                            Terms of Service
                        </Link>.
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {!isCustomizing ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsCustomizing(true)}
                                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                                >
                                    <Settings className="w-3.5 h-3.5" />
                                    <span>Customize</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleEssentialOnly}
                                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
                                >
                                    Essential Only
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAcceptAll}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
                                >
                                    Accept All
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsCustomizing(false)}
                                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveCustom}
                                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
                                >
                                    Save Preferences
                                </button>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

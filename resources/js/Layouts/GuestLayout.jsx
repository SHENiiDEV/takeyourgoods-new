import React from 'react';
import { Link } from '@inertiajs/react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#070b14] text-slate-100 p-4 selection:bg-blue-600 selection:text-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md space-y-6 relative z-10">
                <div className="text-center space-y-2">
                    <Link href="/" className="inline-flex items-center space-x-2.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-2xl font-extrabold text-white tracking-tight">
                            TakeYourGoods <span className="text-xs bg-blue-600 px-1.5 py-0.5 rounded text-white font-bold">AI</span>
                        </span>
                    </Link>
                    <p className="text-xs text-slate-400">
                        Autonomous B2B Sourcing Agent &bull; Verified Factory Intelligence
                    </p>
                </div>

                <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                    {children}
                </div>

                <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>COLCHESTER LTD &bull; UK Co. No. 16113808</span>
                </div>
            </div>
        </div>
    );
}


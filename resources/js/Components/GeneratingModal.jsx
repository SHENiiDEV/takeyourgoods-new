import React, { useEffect, useState } from 'react';
import { 
    Cpu, 
    Search, 
    ShieldCheck, 
    Calculator, 
    FileEdit, 
    Sparkles, 
    CheckCircle2, 
    Layers,
    Globe
} from 'lucide-react';

export default function GeneratingModal({ isOpen, tier = 'pro', productName = 'Product' }) {
    if (!isOpen) return null;

    const [stepIndex, setStepIndex] = useState(0);

    const steps = [
        {
            title: "Connecting to Global Factory Neural Engine",
            desc: "Scanning 1,200+ audited OEM/ODM facilities across Shenzhen, Ningbo, Dongguan & Vietnam...",
            icon: Search,
        },
        {
            title: "Verifying Factory Credentials & Audits",
            desc: "Validating ISO9001, BSCI, TÜV Rheinland & CE compliance certifications...",
            icon: ShieldCheck,
        },
        {
            title: "Calculating Reverse Unit Economics & Logistics",
            desc: "Modeling EXW costs, FOB port fees, container tariffs and air express rates...",
            icon: Calculator,
        },
        {
            title: "Mapping Customs Tariffs & HS Codes",
            desc: "Cross-referencing destination import duty brackets and reverse-charge VAT...",
            icon: Globe,
        },
        {
            title: "Drafting RFQ & Factory Outreach Scripts",
            desc: "Generating bilingual English and Chinese negotiation templates for direct communication...",
            icon: FileEdit,
        },
        {
            title: "Compiling Final Sourcing Dossier",
            desc: "Structuring JSON models, verified supplier shortlist and executive summary...",
            icon: Sparkles,
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 1800);

        return () => clearInterval(interval);
    }, []);

    const currentStep = steps[stepIndex];
    const progressPercent = Math.min(100, Math.round(((stepIndex + 1) / steps.length) * 100));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-fadeIn">
            <div className="relative w-full max-w-lg bg-slate-900 border border-blue-500/30 rounded-3xl p-8 shadow-2xl shadow-blue-500/10 text-center overflow-hidden">
                
                {/* Background Ambient Glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

                {/* AI Central Orb Animation */}
                <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 animate-spin opacity-70 blur-sm" style={{ animationDuration: '4s' }} />
                    <div className="absolute inset-1 rounded-full bg-slate-950 flex items-center justify-center border border-blue-400/40">
                        {React.createElement(currentStep.icon, {
                            className: "w-10 h-10 text-blue-400 transition-all duration-300 transform scale-110",
                        })}
                    </div>
                </div>

                {/* Status Badges */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    Autonomous Sourcing Agent Active ({tier.toUpperCase()})
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {currentStep.title}
                </h3>
                <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto min-h-[40px] leading-relaxed">
                    {currentStep.desc}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 mb-3 overflow-hidden p-0.5 border border-slate-700">
                    <div 
                        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                    <span>Sourcing: {productName}</span>
                    <span>{progressPercent}% Complete</span>
                </div>

                {/* Steps Checklist */}
                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-2 text-left">
                    {steps.map((s, idx) => {
                        const isDone = idx < stepIndex;
                        const isCurrent = idx === stepIndex;
                        return (
                            <div key={idx} className="flex items-center text-xs space-x-2.5">
                                {isDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                ) : isCurrent ? (
                                    <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin flex-shrink-0" />
                                ) : (
                                    <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
                                )}
                                <span className={isDone ? "text-slate-300 font-medium line-through opacity-70" : isCurrent ? "text-blue-300 font-semibold" : "text-slate-500"}>
                                    {s.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { 
    CreditCard, 
    ShieldCheck, 
    X, 
    CheckCircle2, 
    Sparkles, 
    Building2, 
    FileText, 
    ArrowRight, 
    Lock 
} from 'lucide-react';

export default function TopUpModal({ isOpen, onClose, defaultAmount = 499 }) {
    const { auth, company } = usePage().props;
    const user = auth.user;

    const [selectedPreset, setSelectedPreset] = useState(defaultAmount);
    const [customMode, setCustomMode] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: defaultAmount,
        company_name: user?.company_name || '',
        vat_number: user?.vat_number || '',
        billing_address: user?.billing_address || '',
    });

    if (!isOpen) return null;

    const presets = [
        {
            amount: 149,
            title: 'Starter Pack',
            desc: '5 verified factories + basic unit economics',
            tag: 'Entry',
        },
        {
            amount: 499,
            title: 'Pro Sourcing',
            desc: 'In-depth supply chain, logistics & audit verification',
            tag: 'Most Popular',
            highlight: true,
        },
        {
            amount: 1499,
            title: 'Enterprise Turnkey',
            desc: 'Full Tech Pack, direct factory intro & negotiation',
            tag: 'Turnkey',
        },
    ];

    const handleSelectPreset = (amt) => {
        setSelectedPreset(amt);
        setCustomMode(false);
        setData('amount', amt);
    };

    const handleCustomChange = (e) => {
        const val = e.target.value;
        setSelectedPreset(null);
        setCustomMode(true);
        setData('amount', val);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('billing.top-up'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const currentAmount = parseFloat(data.amount) || 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/60">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                Top Up Wallet Balance
                                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">EUR (€)</span>
                            </h2>
                            <p className="text-xs text-slate-400">Add funds for instant 1-click AI report generation</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Preset Tier Selection */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                            Select Sourcing Package Preset
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {presets.map((preset) => {
                                const isSelected = selectedPreset === preset.amount && !customMode;
                                return (
                                    <button
                                        key={preset.amount}
                                        type="button"
                                        onClick={() => handleSelectPreset(preset.amount)}
                                        className={`relative p-3.5 rounded-xl text-left border transition-all ${
                                            isSelected 
                                                ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10 ring-1 ring-blue-500' 
                                                : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                                        }`}
                                    >
                                        {preset.tag && (
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider mb-1 inline-block ${
                                                preset.highlight 
                                                    ? 'bg-blue-500 text-white' 
                                                    : 'bg-slate-700 text-slate-300'
                                            }`}>
                                                {preset.tag}
                                            </span>
                                        )}
                                        <div className="text-lg font-bold text-white mt-1">€{preset.amount}</div>
                                        <div className="text-xs font-medium text-slate-200 mt-0.5">{preset.title}</div>
                                        <div className="text-[11px] text-slate-400 leading-tight mt-1 line-clamp-2">{preset.desc}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Custom Amount Input */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-semibold text-slate-300">Or enter custom EUR amount</label>
                            <span className="text-[11px] text-slate-400">Min. €10.00</span>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
                            <input
                                type="number"
                                min="10"
                                max="50000"
                                step="1"
                                value={data.amount}
                                onChange={handleCustomChange}
                                placeholder="499"
                                className="w-full pl-8 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                        </div>
                        {errors.amount && <p className="text-xs text-rose-400 mt-1">{errors.amount}</p>}
                    </div>

                    {/* Corporate Invoice Requisites Preview */}
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
                        <div className="flex items-center justify-between text-slate-300 font-semibold border-b border-slate-800/80 pb-2">
                            <span className="flex items-center gap-1.5 text-blue-400">
                                <FileText className="w-4 h-4" /> Official B2B Tax Invoice
                            </span>
                            <span className="text-emerald-400 font-bold">0% VAT (Reverse Charge)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                            <div>
                                <strong className="text-slate-300">Issued by:</strong> {company?.name || 'COLCHESTER LTD'}<br />
                                <span>Co. No. {company?.number || '16113808'} (London, UK)</span>
                            </div>
                            <div className="text-right">
                                <strong className="text-slate-300">Recipient:</strong> {user?.name}<br />
                                <span>{user?.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="space-y-2 pt-2">
                        <button
                            type="submit"
                            disabled={processing || currentAmount < 10}
                            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing Payment &amp; Invoice...
                                </span>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    <span>Deposit €{currentAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} &amp; Generate Invoice</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                        
                        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL Encrypted
                            </span>
                            <span>&bull;</span>
                            <span>Instant Balance Credit</span>
                            <span>&bull;</span>
                            <span>PDF Invoice Emailed</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

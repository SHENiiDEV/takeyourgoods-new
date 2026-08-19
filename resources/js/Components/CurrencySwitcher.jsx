import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/Contexts/CurrencyContext';
import { ChevronDown, Check, Coins } from 'lucide-react';

export default function CurrencySwitcher({ variant = 'floating' }) {
    const { currency, currencyCode, setCurrency, currencies } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (variant === 'inline') {
        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
                >
                    <span>{currency.flag}</span>
                    <span>{currency.code}</span>
                    <span className="text-slate-500 font-mono">({currency.symbol})</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900/95 border border-slate-800 backdrop-blur-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 border-b border-slate-800">
                            Select Currency
                        </div>
                        {Object.values(currencies).map((curr) => (
                            <button
                                key={curr.code}
                                type="button"
                                onClick={() => {
                                    setCurrency(curr.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                                    currencyCode === curr.code
                                        ? 'bg-blue-600/20 text-blue-400 font-bold'
                                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span>{curr.flag}</span>
                                    <span>{curr.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5 font-mono text-xs">
                                    <span className="text-slate-400">{curr.symbol}</span>
                                    {currencyCode === curr.code && <Check className="w-3.5 h-3.5 text-blue-400" />}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Default Floating Variant (Bottom Left)
    return (
        <div className="fixed bottom-6 left-6 z-40" ref={dropdownRef}>
            {isOpen && (
                <div className="mb-2 w-52 rounded-2xl bg-slate-900/95 border border-slate-800/90 backdrop-blur-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-bottom-2 duration-200 ring-1 ring-blue-500/20">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                            <Coins className="w-3 h-3 text-blue-400" />
                            Exchange Rates
                        </span>
                        <span className="text-emerald-400 text-[9px] font-mono">Live</span>
                    </div>

                    <div className="space-y-1 mt-1">
                        {Object.values(currencies).map((curr) => (
                            <button
                                key={curr.code}
                                type="button"
                                onClick={() => {
                                    setCurrency(curr.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                                    currencyCode === curr.code
                                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25'
                                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-base">{curr.flag}</span>
                                    <div className="text-left">
                                        <div className="leading-tight">{curr.code}</div>
                                        <div className={`text-[10px] ${currencyCode === curr.code ? 'text-blue-100' : 'text-slate-500'}`}>{curr.name}</div>
                                    </div>
                                </div>
                                <span className={`font-mono text-sm font-bold ${currencyCode === curr.code ? 'text-white' : 'text-slate-400'}`}>
                                    {curr.symbol}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-center text-[9px] text-slate-500">
                        Real-time B2B price conversion
                    </div>
                </div>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-bold text-white shadow-2xl backdrop-blur-xl transition-all duration-200 transform hover:scale-105 ring-1 ring-white/5"
                title="Switch Display Currency"
            >
                <span className="text-base">{currency.flag}</span>
                <span className="font-mono text-slate-200">{currency.code}</span>
                <span className="text-blue-400 font-mono font-extrabold">({currency.symbol})</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
            </button>
        </div>
    );
}

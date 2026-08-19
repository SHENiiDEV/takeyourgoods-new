import React, { useState, useMemo } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Sparkles, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Building2, 
    Layers, 
    TrendingUp, 
    Zap, 
    Globe, 
    Lock, 
    FileText, 
    Calculator, 
    Mail, 
    Cpu,
    Check,
    Star,
    DollarSign,
    Percent,
    Sliders,
    HelpCircle,
    ChevronDown,
    XCircle,
    Activity,
    Factory,
    Radio,
    Terminal,
    Target
} from 'lucide-react';
import Footer from '@/Components/Footer';

import BrandLogo from '@/Components/BrandLogo';
import OfflineBanner from '@/Components/OfflineBanner';
import CookieConsent from '@/Components/CookieConsent';
import CurrencySwitcher from '@/Components/CurrencySwitcher';
import { useCurrency } from '@/Contexts/CurrencyContext';

export default function Welcome({ company }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const { format, currency } = useCurrency();

    // Interactive ROI Calculator State
    const sampleProducts = [
        { name: 'Titanium Smart Health Ring', category: 'Wearables', defaultExw: 16.50, defaultRetail: 79.00, hsCode: '8517.62' },
        { name: 'MagSafe Qi2 Fast Wireless Power Bank', category: 'Consumer Electronics', defaultExw: 9.80, defaultRetail: 45.00, hsCode: '8504.40' },
        { name: 'Ergonomic 3D Mesh Lumbar Chair', category: 'Furniture & Living', defaultExw: 42.00, defaultRetail: 189.00, hsCode: '9401.30' },
        { name: 'Active Noise-Cancelling Bluetooth Earbuds', category: 'Audio Gear', defaultExw: 12.20, defaultRetail: 59.00, hsCode: '8518.30' },
    ];


    const [selectedProductIdx, setSelectedProductIdx] = useState(0);
    const [batchQuantity, setBatchQuantity] = useState(2500);
    const [retailPrice, setRetailPrice] = useState(79.00);

    const selectedProduct = sampleProducts[selectedProductIdx];
    const factoryExw = selectedProduct.defaultExw;
    const middlemanExw = parseFloat((factoryExw * 1.38).toFixed(2)); // 38% trading agent markup

    const seaFreight = parseFloat((factoryExw * 0.14).toFixed(2));
    const dutyRate = 0.035;
    const duty = parseFloat((factoryExw * dutyRate).toFixed(2));
    const landedCostDirect = parseFloat((factoryExw + seaFreight + duty + 0.80).toFixed(2));
    const landedCostMiddleman = parseFloat((middlemanExw + seaFreight + (middlemanExw * dutyRate) + 1.20).toFixed(2));

    const totalCostDirect = landedCostDirect * batchQuantity;
    const totalCostMiddleman = landedCostMiddleman * batchQuantity;
    const batchSavings = Math.round(totalCostMiddleman - totalCostDirect);
    const profitDirect = Math.round((retailPrice - landedCostDirect) * batchQuantity);
    const directMargin = Math.round(((retailPrice - landedCostDirect) / retailPrice) * 100);

    // Interactive Sample Dossier Tab
    const [activeTab, setActiveTab] = useState('factories');

    // FAQ Accordion State
    const [openFaq, setOpenFaq] = useState(null);
    const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

    const tiers = [
        {
            id: 'starter',
            name: 'Starter',
            price: 149,
            currency: '€',
            badge: 'Basic Entry',
            desc: 'Niche feasibility analysis and verified supplier shortlisting for new product validation.',
            features: [
                'Shortlist of 5 Audited OEM/ODM Factories',
                'Verified ISO9001 & BSCI Certification Checks',
                'Estimated EXW Unit Production Cost Range',
                'Direct English RFQ Factory Outreach Template',
                'Instant PDF Report Export',
            ],
            highlight: false,
            ctaText: 'Start with Starter (€149)',
        },
        {
            id: 'pro',
            name: 'Pro Sourcing',
            price: 499,
            currency: '€',
            badge: 'Most Popular',
            desc: 'Deep-dive reverse unit economics, logistics tariffs, compliance matrix and bilingual outreach.',
            features: [
                'Shortlist of 6 Verified Tier-A Factories',
                'Comprehensive Reverse Landed Cost Model (Sea & Air)',
                'Customs HS Code & Import Duty Bracket Mapping',
                'ANSI/ASQ Z1.4 Quality Control & Pre-Shipment Checklist',
                'Bilingual Outreach Scripts (English & Chinese for WeChat/1688)',
                'Price Negotiation Counter-Offer Playbook',
                'B2B Tax Invoice with 0% VAT Reverse Charge',
            ],
            highlight: true,
            ctaText: 'Generate Pro Report (€499)',
        },
        {
            id: 'enterprise',
            name: 'Enterprise Turnkey',
            price: 1499,
            currency: '€',
            badge: 'Turnkey Production',
            desc: 'Full documentation package, Tech Pack specifications, and turnkey factory launch preparation.',
            features: [
                'Shortlist of 8 Certified High-Capacity Manufacturers',
                'Full Bill of Materials (BOM) & CAD Spec Guidance',
                'Bespoke Packaging & Master Carton Palletization Protocols',
                'Multi-Country Sourcing Comparison (China vs. Vietnam)',
                'Custom Mold & Tooling Amortization Schedule',
                'Direct Factory GM Introduction & Executive Escrow Protocol',
                'Priority Dedicated Supply Chain Support',
            ],
            highlight: false,
            ctaText: 'Launch Enterprise Pack (€1,499)',
        },
    ];

    const faqs = [
        {
            q: "How does TakeYourGoods AI locate real factory direct pricing?",
            a: "Our AI engine connects directly to verified Asian industrial registries (including Shenzhen, Ningbo, Dongguan and Vietnam trade databases). Unlike public portals crowded with trading agents and intermediaries, we cross-reference ISO9001/BSCI factory export licenses, true floor capacity, and direct engineering contact channels."
        },
        {
            q: "How does the EUR Wallet and billing model work?",
            a: "You top up your company wallet balance with EUR (€) using credit card or bank transfer. When you generate a report, the exact tier amount (€149, €499, or €1,499) is deducted automatically. You instantly receive an official UK B2B Tax Invoice issued by COLCHESTER LTD with 0% Reverse Charge VAT."
        },
        {
            q: "Who owns the generated sourcing data and outreach templates?",
            a: "You own 100% of the intellectual property, supplier contacts, unit economics models, and custom RFQ drafts generated for your brief. TakeYourGoods AI never claims rights over your product concepts or proprietary specifications."
        },
        {
            q: "What is your refund policy?",
            a: "We provide a 100% 14-day money-back guarantee for any unspent funds in your wallet balance. Once an AI Sourcing Report has been computed and delivered to your dashboard, deducted report fees are non-refundable as digital intelligence goods."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 selection:bg-blue-600 selection:text-white font-sans">
            <Head title="TakeYourGoods AI - Autonomous B2B Sourcing Agent" />
            <OfflineBanner />

            {/* Header / Navbar */}
            <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <BrandLogo href="/" showTagline={true} size="md" />

                    <div className="flex items-center space-x-3 sm:space-x-4">
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
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-xs font-semibold text-slate-300 hover:text-white transition-colors px-2 sm:px-3 py-2"
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
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
                {/* Glow Backdrop */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    
                    {/* Live Neural Feed Banner */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6 shadow-inner">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-slate-400 font-mono text-[11px]">Neural Sourcing Agent:</span>
                        <span>1,200+ Audited Factories Vetted Today</span>
                    </div>


                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.12] max-w-4xl mx-auto">
                        Bypass Trading Middlemen. <br />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                            Source Direct from Tier-1 Factories
                        </span> with Autonomous AI.
                    </h1>

                    <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed">
                        Input your product specifications and target pricing. TakeYourGoods AI generates a turnkey B2B sourcing dossier in 60 seconds: audited OEM/ODM factories, reverse landed cost, customs tariffs, and bilingual outreach.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Link
                            href={user ? route('reports.create') : route('register')}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Launch Sourcing Agent</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="#roi-calculator"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-colors"
                        >
                            <Calculator className="w-4 h-4 text-blue-400" />
                            <span>Try Interactive ROI Simulator</span>
                        </a>
                    </div>


                    {/* Trust Indicators */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16 pt-8 border-t border-slate-800/80 text-left">
                        <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>1,200+ Audited Facilities</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                            <Building2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span>UK Entity (Co. 16113808)</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                            <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            <span>0% Reverse Charge VAT</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                            <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                            <span>14-Day Wallet Guarantee</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* Interactive Live Sourcing ROI & Margin Simulator */}
            <section id="roi-calculator" className="py-16 bg-slate-950/80 border-y border-slate-800/80 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase mb-3">
                            <Calculator className="w-3.5 h-3.5" /> Interactive Profit &amp; Landed Cost Simulator
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                            See How Much You Save By Bypassing Trading Agents
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 mt-2">
                            Select a product niche and adjust your target order volume to compare middleman markups against direct factory EXW pricing.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Left: Interactive Controls */}
                        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
                            
                            {/* Product Selector */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                                    1. Choose Product Category Demo
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    {sampleProducts.map((p, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => {
                                                setSelectedProductIdx(idx);
                                                setRetailPrice(p.defaultRetail);
                                            }}
                                            className={`p-3 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                                                selectedProductIdx === idx 
                                                    ? 'bg-blue-600/20 border-blue-500 text-white font-bold ring-1 ring-blue-500' 
                                                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                                            }`}
                                        >
                                            <div>
                                                <div className="font-semibold text-slate-200">{p.name}</div>
                                                <div className="text-[10px] text-slate-500 font-mono">HS Code: {p.hsCode} &bull; {p.category}</div>
                                            </div>
                                            <span className="font-mono text-blue-400 font-bold">{format(p.defaultExw)} EXW</span>
                                        </button>

                                    ))}
                                </div>
                            </div>

                            {/* Batch Volume Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-300">Target Production Batch:</span>
                                    <span className="text-blue-400 font-mono font-bold text-sm">{batchQuantity.toLocaleString()} units</span>
                                </div>
                                <input
                                    type="range"
                                    min="500"
                                    max="10000"
                                    step="500"
                                    value={batchQuantity}
                                    onChange={(e) => setBatchQuantity(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                                    <span>500 MOQ</span>
                                    <span>5,000 Volume</span>
                                    <span>10,000 Enterprise</span>
                                </div>
                            </div>

                            {/* Target Retail Price */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-300">Target Retail Selling Price (RRP):</span>
                                    <span className="text-emerald-400 font-mono font-bold text-sm">{format(retailPrice, 2)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="20"
                                    max="250"
                                    step="5"
                                    value={retailPrice}
                                    onChange={(e) => setRetailPrice(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            </div>

                        </div>

                        {/* Right: Live Calculation Comparison Card */}
                        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-blue-500/40 shadow-2xl space-y-6 relative overflow-hidden">
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                                <div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
                                        Live Cost Breakdown
                                    </span>
                                    <h3 className="text-lg font-bold text-white mt-1">{selectedProduct.name}</h3>
                                </div>
                                <div className="text-right">
                                    <span className="text-[11px] text-slate-400">Order Volume:</span>
                                    <div className="font-mono font-bold text-white text-sm">{batchQuantity.toLocaleString()} Units</div>
                                </div>
                            </div>

                            {/* Comparison Columns */}
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                
                                {/* Middleman Column */}
                                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                                    <div className="text-rose-400 font-bold text-xs flex items-center gap-1">
                                        <XCircle className="w-3.5 h-3.5" /> Traditional Middleman
                                    </div>
                                    <div className="space-y-1 text-[11px] text-slate-400">
                                        <div className="flex justify-between">
                                            <span>Quoted EXW:</span>
                                            <span className="font-mono text-white">{format(middlemanExw, 2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Est. Landed:</span>
                                            <span className="font-mono text-rose-300 font-bold">{format(landedCostMiddleman, 2)}</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-slate-800">
                                            <span>Total Batch Cost:</span>
                                            <span className="font-mono text-white font-bold">{format(totalCostMiddleman, 0)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Direct Factory Column */}
                                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-2 relative">
                                    <div className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Direct Factory (TYG AI)
                                    </div>
                                    <div className="space-y-1 text-[11px] text-slate-300">
                                        <div className="flex justify-between">
                                            <span>Audited EXW:</span>
                                            <span className="font-mono text-white font-bold">{format(factoryExw, 2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Est. Landed:</span>
                                            <span className="font-mono text-emerald-400 font-bold">{format(landedCostDirect, 2)}</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-slate-800">
                                            <span>Total Batch Cost:</span>
                                            <span className="font-mono text-emerald-400 font-bold">{format(totalCostDirect, 0)}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Highlights Bento */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Your Batch Savings</div>
                                    <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
                                        +{format(batchSavings, 0)}
                                    </div>
                                    <div className="text-[10px] text-slate-500 mt-0.5">Kept in your pocket</div>
                                </div>

                                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Net Profit Forecast</div>
                                    <div className="text-2xl font-extrabold text-blue-400 font-mono mt-1">
                                        {format(profitDirect, 0)}
                                    </div>
                                    <div className="text-[10px] text-slate-500 mt-0.5">At {format(retailPrice, 2)} RRP</div>
                                </div>

                                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center col-span-2 sm:col-span-1">
                                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Direct Net Margin</div>
                                    <div className="text-2xl font-extrabold text-cyan-300 font-mono mt-1">
                                        {directMargin}%
                                    </div>
                                    <div className="text-[10px] text-slate-500 mt-0.5">After sea freight &amp; duty</div>
                                </div>
                            </div>

                            {/* CTA from Calculator */}
                            <div className="pt-2">
                                <Link
                                    href={user ? route('reports.create') : route('register')}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    <span>Unlock Full Supplier Dossier &amp; RFQs for {selectedProduct.name} &rarr;</span>
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* How It Works (The 3-Step Magic Flow) */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase mb-3">
                            <Target className="w-3.5 h-3.5" /> Autonomous Sourcing Pipeline
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            From Product Brief to Production-Ready in 3 Steps
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        
                        {/* Step 1 */}
                        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-extrabold text-lg">
                                01
                            </div>
                            <h3 className="text-lg font-bold text-white">Define Specifications</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Enter your product concept, target EXW cost, required volume, and destination market (US FBA, EU, UK).
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="p-8 rounded-3xl bg-slate-900/60 border border-blue-500/40 relative space-y-4 ring-1 ring-blue-500/20 shadow-xl shadow-blue-500/5">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-extrabold text-lg">
                                02
                            </div>
                            <h3 className="text-lg font-bold text-white">AI Scans &amp; Computes</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Autonomous sourcing algorithms analyze 1,200+ audited manufacturers in Shenzhen, Ningbo, and Vietnam, calculate landed freight and map HS duty brackets.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-lg">
                                03
                            </div>
                            <h3 className="text-lg font-bold text-white">Execute &amp; Contact</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Receive verified factory contact channels, golden sample protocols, and 1-click bilingual English/Chinese RFQ scripts.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* High-Ticket Pricing Section */}
            <section id="pricing" className="py-20 bg-slate-950/60 border-t border-slate-800/80 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase mb-3">
                            <Lock className="w-3.5 h-3.5" /> High-Ticket Transparent Pricing
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            One Report Can Save You {format(20000, 0)}+ In Tooling &amp; Middleman Margins
                        </h2>
                        <p className="text-sm sm:text-base text-slate-400 mt-3">
                            No monthly subscriptions. Top up your wallet in EUR and generate reports on demand with official UK B2B Tax Invoices.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        {tiers.map((tier) => (
                            <div
                                key={tier.id}
                                className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all ${
                                    tier.highlight
                                        ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 ring-1 ring-blue-500 -translate-y-2'
                                        : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700'
                                }`}
                            >
                                {tier.badge && (
                                    <div className="absolute -top-3.5 left-8">
                                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                                            tier.highlight ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-800 text-slate-300 border border-slate-700'
                                        }`}>
                                            {tier.badge}
                                        </span>
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-baseline gap-1 mt-2">
                                        <span className="text-4xl font-extrabold text-white">{format(tier.price, 0)}</span>
                                        <span className="text-xs text-slate-400 font-semibold">/ report</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mt-2">{tier.name}</h3>
                                    <p className="text-xs text-slate-400 mt-2 leading-relaxed min-h-[40px]">{tier.desc}</p>

                                    <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-3">
                                        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">What's Included:</div>
                                        {tier.features.map((feat, idx) => (
                                            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                                                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-800/80">
                                    <Link
                                        href={user ? route('reports.create', { tier: tier.id }) : route('register')}
                                        className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs transition-all ${
                                            tier.highlight
                                                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                                        }`}
                                    >
                                        <span>{tier.id === 'starter' ? `Start with Starter (${format(tier.price, 0)})` : tier.id === 'pro' ? `Generate Pro Report (${format(tier.price, 0)})` : `Launch Enterprise Pack (${format(tier.price, 0)})`}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <div className="text-center text-[10px] text-slate-500 mt-2">
                                        0% VAT Reverse Charge &bull; Instant Delivery
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="py-20 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase mb-3">
                            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                            Everything You Need to Know About B2B Sourcing with AI
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all"
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
                </div>
            </section>

            <CurrencySwitcher variant="floating" />
            <CookieConsent />
            <Footer />
        </div>
    );
}


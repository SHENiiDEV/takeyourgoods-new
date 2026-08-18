import React, { useState } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Sparkles, 
    ShieldCheck, 
    ArrowRight, 
    CreditCard, 
    AlertCircle, 
    CheckCircle2, 
    Layers, 
    Factory, 
    FileText, 
    Globe, 
    HelpCircle,
    Check
} from 'lucide-react';
import TopUpModal from '@/Components/TopUpModal';
import GeneratingModal from '@/Components/GeneratingModal';

export default function Create({ initial_tier = 'pro', wallet_balance, company }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        tier: initial_tier,
        product_name: '',
        product_category: 'Consumer Electronics & Smart Devices',
        target_cost: '14.50',
        target_quantity: '1000',
        destination_country: 'United States',
        specifications: '',
        compliance_requirements: 'CE Marking, FCC Part 15, RoHS 2.0',
    });

    const tierCosts = {
        starter: 149,
        pro: 499,
        enterprise: 1499,
    };

    const currentCost = tierCosts[data.tier] || 499;
    const currentBalance = parseFloat(wallet_balance || 0);
    const hasEnoughBalance = currentBalance >= currentCost;
    const neededAmount = Math.max(0, currentCost - currentBalance);

    const tiers = [
        {
            id: 'starter',
            name: 'Starter Sourcing',
            price: 149,
            desc: '5 verified factories + basic unit economics & RFQ template.',
            badge: 'Basic',
        },
        {
            id: 'pro',
            name: 'Pro Supply Chain',
            price: 499,
            desc: '6 verified tier-A factories + full landed cost, duties, QC checklist & bilingual outreach.',
            badge: 'Recommended',
            highlight: true,
        },
        {
            id: 'enterprise',
            name: 'Enterprise Turnkey',
            price: 1499,
            desc: '8 manufacturers + turnkey Tech Pack, BOM specs, CAD protocols & direct GM intro.',
            badge: 'Full Turnkey',
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hasEnoughBalance) {
            setIsTopUpOpen(true);
            return;
        }

        setIsGenerating(true);
        post(route('reports.store'), {
            onError: () => {
                setIsGenerating(false);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create New Sourcing Report - TakeYourGoods AI" />

            <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                            <Sparkles className="w-3 h-3" /> Step 1: Procurement Brief
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Create New Sourcing Report
                        </h1>
                        <p className="text-xs text-slate-400">
                            Our AI sourcing agent will scan audited factory databases and calculate full reverse logistics.
                        </p>
                    </div>

                    {/* Balance Indicator */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-right">
                        <span className="text-[11px] text-slate-400 font-medium">Your Wallet Balance:</span>
                        <div className="text-lg font-extrabold text-white font-mono">
                            €{currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Tier Selection */}
                    <div className="space-y-3">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                            1. Select Sourcing Package Tier
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {tiers.map((t) => {
                                const isSelected = data.tier === t.id;
                                return (
                                    <div
                                        key={t.id}
                                        onClick={() => setData('tier', t.id)}
                                        className={`relative p-5 rounded-2xl cursor-pointer border transition-all ${
                                            isSelected
                                                ? 'bg-blue-600/15 border-blue-500 text-white ring-1 ring-blue-500 shadow-xl shadow-blue-500/10'
                                                : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                                t.highlight ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300'
                                            }`}>
                                                {t.badge}
                                            </span>
                                            {isSelected && (
                                                <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                            )}
                                        </div>
                                        <div className="text-2xl font-extrabold text-white mt-3">€{t.price}</div>
                                        <div className="text-sm font-bold text-slate-200 mt-0.5">{t.name}</div>
                                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product Specifications Form */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
                        <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
                            <Factory className="w-4 h-4 text-blue-400" />
                            2. Product &amp; Target Specifications
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Product Name */}
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="block text-xs font-semibold text-slate-300">
                                    Product Name / Concept <span className="text-blue-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Ergonomic Active Noise-Cancelling Bluetooth Headphones"
                                    value={data.product_name}
                                    onChange={(e) => setData('product_name', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.product_name && <p className="text-xs text-rose-400">{errors.product_name}</p>}
                            </div>

                            {/* Category */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-slate-300">
                                    Product Category
                                </label>
                                <select
                                    value={data.product_category}
                                    onChange={(e) => setData('product_category', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="Consumer Electronics & Smart Devices">Consumer Electronics &amp; Smart Devices</option>
                                    <option value="Home, Kitchen & Smart Living">Home, Kitchen &amp; Smart Living</option>
                                    <option value="Health, Fitness & Wellness">Health, Fitness &amp; Wellness</option>
                                    <option value="Hardware, Tools & Industrial Precision">Hardware, Tools &amp; Industrial Precision</option>
                                    <option value="Beauty, Personal Care & Cosmetics">Beauty, Personal Care &amp; Cosmetics</option>
                                    <option value="Apparel, Performance Textiles & Bags">Apparel, Performance Textiles &amp; Bags</option>
                                    <option value="Pet Accessories & Smart Feeders">Pet Accessories &amp; Smart Feeders</option>
                                    <option value="Outdoor, Sports & Camping Gear">Outdoor, Sports &amp; Camping Gear</option>
                                </select>
                            </div>

                            {/* Destination Country */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-slate-300">
                                    Target Destination Market <span className="text-blue-400">*</span>
                                </label>
                                <select
                                    value={data.destination_country}
                                    onChange={(e) => setData('destination_country', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="United States">United States (FBA / 3PL)</option>
                                    <option value="United Kingdom">United Kingdom (London / Midlands)</option>
                                    <option value="Germany / EU">Germany / European Union (Hamburg / Rotterdam)</option>
                                    <option value="Canada">Canada (Vancouver / Toronto)</option>
                                    <option value="Australia">Australia (Sydney / Melbourne)</option>
                                </select>
                            </div>

                            {/* Target Unit Cost */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-slate-300">
                                    Target EXW Unit Cost (€ EUR)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0.1"
                                        placeholder="12.50"
                                        value={data.target_cost}
                                        onChange={(e) => setData('target_cost', e.target.value)}
                                        className="w-full pl-8 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-white text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Target Order Volume */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-slate-300">
                                    Target Initial Order Volume (Units)
                                </label>
                                <input
                                    type="number"
                                    min="50"
                                    step="50"
                                    placeholder="1000"
                                    value={data.target_quantity}
                                    onChange={(e) => setData('target_quantity', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-white text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Specifications & Materials */}
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="block text-xs font-semibold text-slate-300">
                                    Key Materials, Features &amp; Packaging Requirements
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="e.g. Hybrid ANC 40dB, 40mm titanium drivers, matte black soft-touch finish, Type-C charging, custom retail rigid gift box with EVA tray..."
                                    value={data.specifications}
                                    onChange={(e) => setData('specifications', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Compliance */}
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="block text-xs font-semibold text-slate-300">
                                    Target Compliance, Labelling &amp; Certifications
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. CE Marking, FCC Part 15, RoHS 2.0, REACH SVHC, WEEE, UN38.3 Battery Test"
                                    value={data.compliance_requirements}
                                    onChange={(e) => setData('compliance_requirements', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Balance Check & Payment Action Card */}
                    <div className={`p-6 sm:p-8 rounded-3xl border ${
                        hasEnoughBalance 
                            ? 'bg-slate-900/90 border-blue-500/40 shadow-xl shadow-blue-500/5' 
                            : 'bg-amber-950/20 border-amber-500/40'
                    }`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            
                            <div className="space-y-1">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Order Summary &bull; {tiers.find(t => t.id === data.tier)?.name}
                                </div>
                                <div className="text-2xl font-extrabold text-white">
                                    Total: €{currentCost.toLocaleString('en-US', { minimumFractionDigits: 2 })} EUR
                                </div>
                                
                                {hasEnoughBalance ? (
                                    <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Wallet balance sufficient (€{currentBalance.toFixed(2)}). Will deduct €{currentCost.toFixed(2)} automatically.</span>
                                    </p>
                                ) : (
                                    <p className="text-xs text-amber-400 font-semibold flex items-center gap-1.5 pt-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>Insufficient balance (€{currentBalance.toFixed(2)}). Please top up at least €{neededAmount.toFixed(2)} to proceed.</span>
                                    </p>
                                )}
                            </div>

                            <div>
                                {hasEnoughBalance ? (
                                    <button
                                        type="submit"
                                        disabled={processing || isGenerating}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        <span>Generate &amp; Pay €{currentCost}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsTopUpOpen(true)}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm shadow-xl shadow-amber-500/25 transition-all"
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        <span>Top Up €{currentCost} &amp; Generate</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>

                </form>

            </div>

            {/* Top Up Modal */}
            <TopUpModal 
                isOpen={isTopUpOpen} 
                onClose={() => setIsTopUpOpen(false)}
                defaultAmount={neededAmount > 0 ? (neededAmount <= 149 ? 149 : neededAmount <= 499 ? 499 : 1499) : 499}
            />

            {/* Magic UI Animated Generation Modal */}
            <GeneratingModal 
                isOpen={isGenerating} 
                tier={data.tier} 
                productName={data.product_name || 'Product'} 
            />
        </AuthenticatedLayout>
    );
}

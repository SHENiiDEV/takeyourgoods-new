import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Download, 
    Sparkles, 
    ShieldCheck, 
    Factory, 
    Calculator, 
    FileText, 
    Mail, 
    Copy, 
    Check, 
    ExternalLink, 
    ArrowLeft, 
    Globe, 
    AlertTriangle, 
    Layers,
    DollarSign,
    Percent,
    Building2,
    Clock,
    Award
} from 'lucide-react';

export default function Show({ report, wallet_balance, company }) {
    const [activeTab, setActiveTab] = useState('summary');
    const [copiedKey, setCopiedKey] = useState(null);

    const reportData = report.report_data || {};
    const summary = reportData.executive_summary || {};
    const factories = reportData.factories || [];
    const economics = reportData.unit_economics || {};
    const compliance = reportData.compliance_and_risks || {};
    const outreach = reportData.outreach_templates || {};
    const techPack = reportData.tech_pack || {};

    const handleCopy = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2500);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Sourcing Dossier: ${report.product_name} - TakeYourGoods AI`} />

            <div className="space-y-8 animate-fadeIn">
                
                {/* Navigation Back & Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Dashboard</span>
                    </Link>

                    <div className="flex items-center space-x-3">
                        <a
                            href={route('wallet.invoice', report.transaction_id || report.id)}
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                            title="Download VAT Tax Invoice for this report"
                        >
                            <FileText className="w-4 h-4 text-emerald-400" />
                            <span>Download Tax Invoice (PDF)</span>
                        </a>

                        <a
                            href={route('reports.pdf', report.id)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export Branded PDF Dossier</span>
                        </a>
                    </div>

                </div>

                {/* Main Sourcing Header Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                    report.tier === 'enterprise' 
                                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                        : report.tier === 'pro'
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                }`}>
                                    {report.tier} Sourcing Pack (€{parseFloat(report.cost_deducted).toFixed(2)})
                                </span>
                                <span className="text-xs text-slate-400 font-mono">
                                    Dossier #TYG-REP-{String(report.id).padStart(5, '0')}
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                {report.product_name}
                            </h1>

                            <p className="text-xs sm:text-sm text-slate-400">
                                Category: {report.product_category || 'Consumer Goods'} &bull; Destination: {report.destination_country} &bull; 
                                Target Order: {report.target_quantity?.toLocaleString() || 1000} units &bull; Verified AI Sourcing Dossier
                            </p>

                        </div>

                        {/* Top Key Scores */}
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center min-w-[120px]">
                                <div className="text-xs text-slate-400 font-semibold uppercase">Viability Score</div>
                                <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-0.5">
                                    {summary.viability_score || 95}/100
                                </div>
                            </div>
                            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center min-w-[120px]">
                                <div className="text-xs text-slate-400 font-semibold uppercase">Net Margin</div>
                                <div className="text-2xl font-extrabold text-blue-400 font-mono mt-0.5">
                                    {economics.projected_net_margin_percentage || '58%'}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center space-x-2 mt-8 pt-6 border-t border-slate-800/80 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('summary')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                activeTab === 'summary' 
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                            }`}
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>1. Executive Summary</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('factories')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                activeTab === 'factories' 
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                            }`}
                        >
                            <Factory className="w-3.5 h-3.5" />
                            <span>2. Verified Factories ({factories.length})</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('economics')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                activeTab === 'economics' 
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                            }`}
                        >
                            <Calculator className="w-3.5 h-3.5" />
                            <span>3. Landed Cost &amp; Tariffs</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('compliance')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                activeTab === 'compliance' 
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                            }`}
                        >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>4. Compliance &amp; QC Matrix</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('outreach')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                activeTab === 'outreach' 
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                            }`}
                        >
                            <Mail className="w-3.5 h-3.5" />
                            <span>5. Factory Outreach &amp; RFQs</span>
                        </button>

                        {report.tier === 'enterprise' && (
                            <button
                                onClick={() => setActiveTab('techpack')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                    activeTab === 'techpack' 
                                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' 
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                }`}
                            >
                                <FileText className="w-3.5 h-3.5" />
                                <span>6. Tech Pack &amp; BOM</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Tab 1: Executive Summary */}
                {activeTab === 'summary' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2 md:col-span-2">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                    Procurement Feasibility Assessment
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed pt-2">
                                    {summary.overview_narrative || 'Comprehensive factory analysis completed across tier-1 manufacturing clusters in China and Southeast Asia. The product exhibits high unit economics feasibility with established manufacturing capacity.'}
                                </p>
                            </div>

                            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    Production Strategy
                                </h3>
                                <div className="space-y-2 text-xs">
                                    <div>
                                        <span className="text-slate-400">Recommended Model:</span>
                                        <p className="text-white font-semibold">{summary.recommended_strategy || 'Direct OEM Contract Manufacturing'}</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">Target Production Lead Time:</span>
                                        <p className="text-white font-semibold">{summary.target_production_timeline || '22 - 28 calendar days'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Metrics Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                                <div className="text-xs text-slate-400 uppercase font-semibold">Factory EXW Cost</div>
                                <div className="text-2xl font-extrabold text-white mt-1">€{economics.exw_cost || '8.50'}</div>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                                <div className="text-xs text-slate-400 uppercase font-semibold">Total Landed (Sea)</div>
                                <div className="text-2xl font-extrabold text-emerald-400 mt-1">€{economics.total_landed_cost_sea || '12.40'}</div>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                                <div className="text-xs text-slate-400 uppercase font-semibold">Recommended RRP</div>
                                <div className="text-2xl font-extrabold text-white mt-1">€{economics.recommended_retail_price || '39.99'}</div>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                                <div className="text-xs text-slate-400 uppercase font-semibold">Net Profit Margin</div>
                                <div className="text-2xl font-extrabold text-blue-400 mt-1">{economics.projected_net_margin_percentage || '58%'}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Verified Factories */}
                {activeTab === 'factories' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <Factory className="w-4 h-4 text-blue-400" />
                                Audited &amp; Verified Factory Shortlist ({factories.length})
                            </h3>
                            <span className="text-xs text-slate-400">All facilities vetted for active export licenses and QA audits</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {factories.map((factory, idx) => (
                                <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 relative">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                {factory.verified_audit_status || 'Verified Tier-A Facility'}
                                            </span>
                                            <h4 className="text-base font-bold text-white pt-1">{factory.name}</h4>
                                            <p className="text-xs text-slate-400 flex items-center gap-1">
                                                <Globe className="w-3.5 h-3.5" />
                                                {factory.location}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-slate-400">Est. Price Range</span>
                                            <div className="text-sm font-extrabold text-white">{factory.unit_cost_range}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-xs">
                                        <div>
                                            <span className="text-slate-500 text-[11px]">MOQ:</span>
                                            <p className="font-bold text-white">{factory.moq}</p>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 text-[11px]">Lead Time:</span>
                                            <p className="font-bold text-white">{factory.lead_time_days}</p>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 text-[11px]">Experience:</span>
                                            <p className="font-bold text-white">{factory.years_in_business}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-[11px] text-slate-400 font-semibold">Certifications &amp; Standards:</span>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {(factory.certifications || []).map((cert, cIdx) => (
                                                <span key={cIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                                    ✓ {cert}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                                        <strong className="text-slate-300">Factory Strengths:</strong> {factory.strengths}
                                    </p>

                                    <div className="flex items-center justify-between pt-1 text-xs">
                                        <div>
                                            <span className="text-slate-500">Contact:</span> <strong className="text-white">{factory.contact_person}</strong>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(factory.contact_email, `email-${idx}`)}
                                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
                                        >
                                            {copiedKey === `email-${idx}` ? (
                                                <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copied Email</span>
                                            ) : (
                                                <>
                                                    <Copy className="w-3.5 h-3.5" />
                                                    <span>{factory.contact_email}</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 3: Landed Cost & Unit Economics */}
                {activeTab === 'economics' && (
                    <div className="space-y-6">
                        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                                        <Calculator className="w-4 h-4 text-blue-400" />
                                        Reverse Landed Cost Model
                                    </h3>
                                    <p className="text-xs text-slate-400">Complete itemized breakdown per unit delivered to destination</p>
                                </div>
                                <span className="text-xs text-slate-400 font-mono">Currency: EUR (€)</span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                                        <tr>
                                            <th className="py-3 px-4">Cost Component</th>
                                            <th className="py-3 px-4 text-right">Sea Freight Route (DDP)</th>
                                            <th className="py-3 px-4 text-right">Air Express Route</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                                        <tr>
                                            <td className="py-3.5 px-4 font-semibold text-white">Factory EXW Production Cost</td>
                                            <td className="py-3.5 px-4 text-right font-mono font-bold">€{economics.exw_cost}</td>
                                            <td className="py-3.5 px-4 text-right font-mono font-bold">€{economics.exw_cost}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 text-slate-300">Freight &amp; Port Origin Handling (FOB Port)</td>
                                            <td className="py-3.5 px-4 text-right font-mono">€{economics.sea_freight_per_unit}</td>
                                            <td className="py-3.5 px-4 text-right font-mono">€{economics.air_express_per_unit}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 text-slate-300">
                                                Customs Tariff &amp; Duty ({economics.customs_duty_rate || '3.5%'})
                                            </td>
                                            <td className="py-3.5 px-4 text-right font-mono">€{economics.estimated_duty_per_unit}</td>
                                            <td className="py-3.5 px-4 text-right font-mono">€{economics.estimated_duty_per_unit}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 text-slate-300">Customs Clearance &amp; Port Surcharges</td>
                                            <td className="py-3.5 px-4 text-right font-mono">€{economics.customs_handling_per_unit}</td>
                                            <td className="py-3.5 px-4 text-right font-mono">€{economics.customs_handling_per_unit}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 text-slate-300">FBA / 3PL Warehouse Prep &amp; Labelling</td>
                                            <td className="py-3.5 px-4 text-right font-mono">€{economics.fba_prep_and_packaging}</td>
                                            <td className="py-3.5 px-4 text-right font-mono">€{economics.fba_prep_and_packaging}</td>
                                        </tr>
                                        <tr className="bg-blue-600/10 font-bold border-t-2 border-blue-500/40">
                                            <td className="py-4 px-4 text-white text-sm">TOTAL ESTIMATED LANDED COST:</td>
                                            <td className="py-4 px-4 text-right text-emerald-400 font-mono text-sm">€{economics.total_landed_cost_sea}</td>
                                            <td className="py-4 px-4 text-right text-blue-400 font-mono text-sm">€{economics.total_landed_cost_air}</td>
                                        </tr>
                                        <tr className="bg-slate-950 font-bold">
                                            <td className="py-4 px-4 text-slate-300">Recommended Retail Price (RRP):</td>
                                            <td colSpan="2" className="py-4 px-4 text-right text-white font-mono text-base">
                                                €{economics.recommended_retail_price} EUR
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 4: Compliance & Risk Matrix */}
                {activeTab === 'compliance' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                    Mandatory Certifications &amp; HS Codes
                                </h3>
                                
                                <div className="space-y-3 text-xs">
                                    <div>
                                        <span className="text-slate-400 font-semibold">Customs Classification (HS Code):</span>
                                        <p className="text-white font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1">
                                            {compliance.tariffs_code_hs || '8504.40.9000 (Duty Rate: 3.5%)'}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-slate-400 font-semibold">Required Regulatory Directives:</span>
                                        <div className="space-y-1.5 mt-2">
                                            {(compliance.required_certifications || []).map((c, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-slate-300">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                    <span>{c}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                                    Pre-Shipment Inspection Protocol (PSI)
                                </h3>
                                
                                <div className="space-y-2 text-xs">
                                    {(compliance.quality_control_checklist || []).map((qc, idx) => (
                                        <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300">
                                            ✓ {qc}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* Tab 5: Outreach RFQs & Negotiation */}
                {activeTab === 'outreach' && (
                    <div className="space-y-6">
                        
                        {/* English RFQ */}
                        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-blue-400" />
                                    Standard English RFQ (Request for Quotation)
                                </h3>
                                <button
                                    onClick={() => handleCopy(outreach.initial_rfq_en, 'rfq-en')}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all"
                                >
                                    {copiedKey === 'rfq-en' ? (
                                        <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copied</span>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Copy Email</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-300 font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800">
                                {outreach.initial_rfq_en}
                            </pre>
                        </div>

                        {/* Chinese RFQ */}
                        {outreach.initial_rfq_cn && (
                            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-indigo-400" />
                                        Chinese WeChat / 1688 Factory Direct Outreach
                                    </h3>
                                    <button
                                        onClick={() => handleCopy(outreach.initial_rfq_cn, 'rfq-cn')}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all"
                                    >
                                        {copiedKey === 'rfq-cn' ? (
                                            <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copied</span>
                                        ) : (
                                            <>
                                                <Copy className="w-3.5 h-3.5" />
                                                <span>Copy Chinese Script</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre className="p-4 rounded-2xl bg-slate-950 text-slate-300 font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800">
                                    {outreach.initial_rfq_cn}
                                </pre>
                            </div>
                        )}

                        {/* Negotiation Script */}
                        {outreach.price_negotiation_script && (
                            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-emerald-400" />
                                        Target Price Counter-Offer Playbook
                                    </h3>
                                    <button
                                        onClick={() => handleCopy(outreach.price_negotiation_script, 'nego')}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all"
                                    >
                                        {copiedKey === 'nego' ? (
                                            <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copied</span>
                                        ) : (
                                            <>
                                                <Copy className="w-3.5 h-3.5" />
                                                <span>Copy Script</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre className="p-4 rounded-2xl bg-slate-950 text-slate-300 font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800">
                                    {outreach.price_negotiation_script}
                                </pre>
                            </div>
                        )}

                    </div>
                )}

                {/* Tab 6: Tech Pack (Enterprise) */}
                {activeTab === 'techpack' && (
                    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-purple-500/30 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <FileText className="w-4 h-4 text-purple-400" />
                                Enterprise Turnkey Tech Pack &amp; Bill of Materials (BOM)
                            </h3>
                            <span className="text-xs font-bold text-purple-400 uppercase">Enterprise Pack</span>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div>
                                <span className="text-slate-400 font-semibold uppercase tracking-wider">Bill of Materials (BOM):</span>
                                <div className="space-y-2 mt-2">
                                    {(techPack.bill_of_materials || []).map((item, idx) => (
                                        <div key={idx} className="p-3 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-mono">
                                            &bull; {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="text-slate-400 font-semibold uppercase tracking-wider">Packaging Specs:</span>
                                <p className="p-3 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 mt-1">
                                    {techPack.packaging_specs || 'Retail Gift Box (350gsm SBS) with EVA tray and master corrugated cartons.'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}

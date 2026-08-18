import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { ShieldAlert, CheckCircle2, ArrowLeft, RefreshCw } from 'lucide-react';

export default function Refund({ company }) {
    const companyName = company?.name || 'COLCHESTER LTD';
    const companyNumber = company?.number || '16113808';
    const companyAddress = company?.address || 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP';
    const companyEmail = company?.email || 'info@takeyoursgoods.co.uk';

    return (
        <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-blue-600 selection:text-white">
            <Head title="Refund Policy - TakeYourGoods AI" />
            
            {/* Header / Nav */}
            <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 text-white font-extrabold text-lg">
                        <span>TakeYourGoods</span>
                        <span className="text-xs bg-blue-600 px-1.5 py-0.5 rounded text-white font-bold">AI</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Platform
                    </Link>
                </div>
            </header>

            <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
                    
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
                            <RefreshCw className="w-3.5 h-3.5" /> Commercial Billing &amp; Refund Policy
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Refund &amp; Cancellation Policy</h1>
                        <p className="text-xs text-slate-400 mt-2">
                            Operating Entity: {companyName} &bull; Company No. {companyNumber} (London, UK)
                        </p>
                    </div>

                    {/* Policy Summary Callout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                                <CheckCircle2 className="w-5 h-5" /> 14-Day Wallet Refund Guarantee
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Any <strong>unspent / unused balance</strong> deposited into your TakeYourGoods wallet is 100% refundable within 14 calendar days from the date of deposit.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-2">
                            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                                <ShieldAlert className="w-5 h-5" /> Generated Reports Non-Refundable
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Once an AI Sourcing Report or Turnkey Tech Pack has been computed, compiled and delivered to your dashboard, deducted service fees are <strong>final and non-refundable</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                        
                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">1. Wallet Top-Up Refunds</h2>
                            <p>
                                Clients may request a full or partial refund of unspent EUR funds residing in their user wallet within 14 calendar days of the top-up transaction. Refunds will be remitted to the original payment method. Any bank processing fees incurred during initial deposit may be deducted if required by the payment network.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">2. Consumed Digital Services</h2>
                            <p>
                                In accordance with UK Consumer Contracts Regulations (Information, Cancellation and Additional Charges) Regulations 2013 regarding digital services, by initiating the generation of a Sourcing Report, the Client expressly consents to immediate delivery of digital goods and acknowledges that the statutory right of cancellation ceases once the digital computation is delivered.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">3. How to Submit a Refund Request</h2>
                            <p>
                                To request a refund of your unspent balance, submit an email from your registered account email to: <br />
                                <strong>{companyEmail}</strong>
                            </p>
                            <p>
                                Please provide your <strong>Transaction Reference Number</strong> (e.g. <code>TYG-TXN-2026-XXXX</code>) or the corresponding B2B Invoice Number. Refund requests are reviewed and processed within 2 to 3 business days.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">4. Chargeback Abuse &amp; Fraud Prevention</h2>
                            <p>
                                Initiating unauthorized chargebacks after receiving complete sourcing dossiers without contacting our support team constitutes a breach of contract and will result in immediate termination of the company account and referral to our legal department in London, UK.
                            </p>
                        </section>

                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

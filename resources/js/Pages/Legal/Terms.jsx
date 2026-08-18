import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { ShieldCheck, Scale, FileText, ArrowLeft } from 'lucide-react';

export default function Terms({ company }) {
    const companyName = company?.name || 'COLCHESTER LTD';
    const companyNumber = company?.number || '16113808';
    const companyAddress = company?.address || 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP';
    const companyEmail = company?.email || 'info@takeyoursgoods.co.uk';

    return (
        <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-blue-600 selection:text-white">
            <Head title="Terms of Service - TakeYourGoods AI" />
            
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
                            <Scale className="w-3.5 h-3.5" /> B2B Commercial Master Services Agreement
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Terms of Service</h1>
                        <p className="text-xs text-slate-400 mt-2">
                            Effective Date: January 1, 2026 &bull; Last Updated: August 2026
                        </p>
                    </div>

                    <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                        
                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">1. Contracting Entity &amp; Scope</h2>
                            <p>
                                These Terms of Service constitute a legally binding agreement between you (the "Client" or "User") and <strong>{companyName}</strong>, a limited liability company incorporated in England and Wales under Company Registration Number <strong>{companyNumber}</strong>, having its registered office at <strong>{companyAddress}</strong> ("TakeYourGoods AI", "Company", "we", or "us").
                            </p>
                            <p>
                                TakeYourGoods AI operates an autonomous digital B2B software-as-a-service platform providing artificial intelligence-driven supply chain analysis, verified factory matching, reverse unit economics calculations, customs classification, and manufacturer outreach documentation.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">2. Wallet System, Prepayment &amp; Currency</h2>
                            <p>
                                <strong>2.1 Currency:</strong> All transactions, balances, and service pricing on TakeYourGoods AI are denominated strictly in Euros (€ / EUR).
                            </p>
                            <p>
                                <strong>2.2 Wallet Model:</strong> Services are billed through an internal prepaid balance system. Deposited funds are credited to the Client's wallet balance upon successful payment authorization.
                            </p>
                            <p>
                                <strong>2.3 Automated Service Deduction:</strong> Upon submitting a request for a Sourcing Report, the system verifies available balance and automatically deducts the published tier price (e.g. Starter €149, Pro €499, Enterprise €1,499).
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">3. Intellectual Property &amp; Report Ownership</h2>
                            <p>
                                <strong>3.1 Full Client Ownership:</strong> Upon completed generation and payment, all custom Sourcing Reports, supplier dossiers, unit economics models, and outreach materials generated specifically for the Client's brief become the exclusive intellectual property of the Client.
                            </p>
                            <p>
                                <strong>3.2 Proprietary Algorithms:</strong> The underlying AI architecture, database schemas, and proprietary scraping heuristics remain the sole property of {companyName}.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">4. B2B Nature &amp; Reverse Charge VAT</h2>
                            <p>
                                TakeYourGoods AI is strictly a Business-to-Business (B2B) digital service. In accordance with UK VAT Act 1994 and EU VAT Directive 2006/112/EC Article 196, supplies to non-UK corporate clients are billed at 0% VAT under the Reverse Charge mechanism.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">5. Independent Verification &amp; Disclaimer</h2>
                            <p>
                                While TakeYourGoods AI analyzes verified supplier registries and audits, the platform serves as an intelligence intelligence layer. The Client retains responsibility for entering into final purchase contracts, issuing letters of credit, and performing on-site pre-shipment inspections (PSI) with factories.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">6. Governing Law &amp; Jurisdiction</h2>
                            <p>
                                These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of <strong>England and Wales</strong>. The courts of London, England shall have exclusive jurisdiction.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">7. Contact Information</h2>
                            <p>
                                Inquiries regarding commercial terms may be directed to: <br />
                                <strong>{companyName}</strong><br />
                                Email: <a href={`mailto:${companyEmail}`} className="text-blue-400 hover:underline">{companyEmail}</a><br />
                                Address: {companyAddress}
                            </p>
                        </section>

                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

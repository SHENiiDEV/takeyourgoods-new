import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

export default function Privacy({ company }) {
    const companyName = company?.name || 'COLCHESTER LTD';
    const companyNumber = company?.number || '16113808';
    const companyAddress = company?.address || 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP';
    const companyEmail = company?.email || 'info@takeyoursgoods.co.uk';

    return (
        <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-blue-600 selection:text-white">
            <Head title="Privacy Policy - TakeYourGoods AI" />
            
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
                            <ShieldCheck className="w-3.5 h-3.5" /> UK GDPR &amp; Data Protection Act 2018 Compliant
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Privacy &amp; Data Protection Policy</h1>
                        <p className="text-xs text-slate-400 mt-2">
                            Effective Date: January 1, 2026 &bull; Data Controller: {companyName}
                        </p>
                    </div>

                    <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                        
                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">1. Data Controller</h2>
                            <p>
                                <strong>{companyName}</strong> (Company No. <strong>{companyNumber}</strong>), located at {companyAddress}, is the registered Data Controller responsible for your personal and commercial data under the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">2. Product Brief Anonymization Protocol</h2>
                            <p>
                                We treat all client product concepts, technical specifications, and target pricing with strict confidentiality.
                            </p>
                            <p>
                                <strong>2.1 Anonymized Querying:</strong> When transmitting sourcing parameters to AI neural inference pipelines, all direct company identifiers and trademark references are stripped and sanitized.
                            </p>
                            <p>
                                <strong>2.2 No Model Training on Private Briefs:</strong> Your proprietary product formulas, CAD schematics, and commercial briefs are never used to train public language models.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">3. Information We Collect</h2>
                            <ul className="list-disc pl-5 space-y-1 text-slate-300">
                                <li><strong>Account &amp; Billing Data:</strong> Name, business email, company name, VAT / tax number, billing address.</li>
                                <li><strong>Sourcing Requests:</strong> Product titles, categories, target order quantities, target unit costs, and compliance requirements.</li>
                                <li><strong>Financial Records:</strong> Transaction timestamps, EUR amounts, generated PDF invoice records (credit card details are tokenized securely by tier-1 payment gateways and never touch our servers).</li>
                            </ul>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">4. Legal Bases for Processing</h2>
                            <p>
                                We process data pursuant to Article 6(1)(b) UK GDPR (performance of commercial contract) to deliver sourcing intelligence, generate B2B tax invoices, and maintain accounting compliance under UK company law.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">5. Security Standards &amp; Retention</h2>
                            <p>
                                All stored data is encrypted at rest using AES-256 and transmitted using TLS 1.3 encryption. Transaction and invoice data is retained for 6 years to comply with statutory UK HMRC accounting standards.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-white">6. Data Subject Rights &amp; Contact</h2>
                            <p>
                                Under UK GDPR, you have the right to request access to, rectification of, or erasure of your personal data. For inquiries or Data Subject Access Requests (DSAR), please contact our Data Protection Officer at: <br />
                                <strong>{companyEmail}</strong>
                            </p>
                        </section>

                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ShieldCheck, Building2, Mail, Sparkles, Lock, MapPin } from 'lucide-react';
import BrandLogo from '@/Components/BrandLogo';

export default function Footer() {
    const { company } = usePage().props;

    const companyName = company?.name || 'COLCHESTER LTD';
    const companyNumber = company?.number || '16113808';
    const companyAddress = company?.address || 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP';
    const companyEmail = company?.email || 'info@takeyoursgoods.co.uk';

    return (
        <footer className="w-full border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    
                    {/* Column 1: Brand & Slogan */}
                    <div className="space-y-3 md:col-span-1">
                        <BrandLogo href="/" size="sm" />

                        <p className="text-slate-400 text-xs leading-relaxed">
                            Autonomous B2B AI Sourcing Agent. Helping Amazon &amp; Shopify e-commerce brands bypass intermediaries and connect directly to verified tier-1 global manufacturers.
                        </p>
                        <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold pt-1">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Enterprise UK Registered Platform</span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Platform &amp; Help</h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href={route('how-it-works')} className="hover:text-blue-400 transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href={route('about')} className="hover:text-blue-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href={route('support')} className="hover:text-blue-400 transition-colors">
                                    Support &amp; Help Desk
                                </Link>
                            </li>
                            <li>
                                <Link href={route('contact')} className="hover:text-blue-400 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href={route('billing.index')} className="hover:text-blue-400 transition-colors">
                                    Wallet &amp; Tax Invoices
                                </Link>
                            </li>
                        </ul>
                    </div>


                    {/* Column 3: Legal & Compliance */}
                    <div>
                        <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Legal &amp; Compliance</h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href={route('terms')} className="hover:text-blue-400 transition-colors">
                                    Terms of Service (B2B SaaS)
                                </Link>
                            </li>
                            <li>
                                <Link href={route('privacy')} className="hover:text-blue-400 transition-colors">
                                    Privacy Policy (UK GDPR)
                                </Link>
                            </li>
                            <li>
                                <Link href={route('refund')} className="hover:text-blue-400 transition-colors">
                                    Refund &amp; Wallet Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Corporate Requisites */}
                    <div className="space-y-2 text-xs">
                        <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Company Details</h4>
                        <div className="flex items-start space-x-2 text-slate-300">
                            <Building2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            <span><strong>{companyName}</strong> (Co. No. {companyNumber})</span>
                        </div>
                        <div className="flex items-start space-x-2 text-slate-400 text-[11px]">
                            <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                            <span>{companyAddress}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
                            <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                            <a href={`mailto:${companyEmail}`} className="hover:text-blue-400 transition-colors">
                                {companyEmail}
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Disclaimer */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
                    <p>
                        &copy; {new Date().getFullYear()} {companyName}. Registered in England &amp; Wales (No. {companyNumber}). All rights reserved.
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>B2B Digital Services &bull; 0% VAT Reverse Charge Applied</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

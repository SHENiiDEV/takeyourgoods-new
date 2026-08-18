import React from 'react';
import { Link } from '@inertiajs/react';

export default function BrandLogo({ size = 'md', showTagline = false, href = '/', className = '' }) {
    const iconSizes = {
        sm: 'w-7 h-7',
        md: 'w-9 h-9',
        lg: 'w-12 h-12',
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-2xl',
    };

    const badgeSizes = {
        sm: 'text-[9px] px-1 py-0.2',
        md: 'text-[10px] px-1.5 py-0.5',
        lg: 'text-xs px-2 py-0.5',
    };

    const content = (
        <div className={`flex items-center space-x-3 group ${className}`}>
            {/* 3D Neural Cargo Logo Icon */}
            <div className={`relative ${iconSizes[size] || iconSizes.md} rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-[1.5px] shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 transform group-hover:scale-105`}>
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                    {/* Background Subtle Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent pointer-events-none" />
                    
                    {/* Custom Vector Icon */}
                    <svg viewBox="0 0 32 32" className="w-5/6 h-5/6 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60a5fa" />
                                <stop offset="50%" stopColor="#818cf8" />
                                <stop offset="100%" stopColor="#38bdf8" />
                            </linearGradient>
                        </defs>
                        
                        {/* Isometric Procurement Cube */}
                        <path d="M16 4L27 10.5V21.5L16 28L5 21.5V10.5L16 4Z" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinejoin="round" fill="#0f172a" fillOpacity="0.8" />
                        <path d="M16 15.5L27 10.5" stroke="url(#logoGrad)" strokeWidth="1.2" strokeOpacity="0.8" />
                        <path d="M16 15.5L5 10.5" stroke="url(#logoGrad)" strokeWidth="1.2" strokeOpacity="0.8" />
                        <path d="M16 15.5V28" stroke="url(#logoGrad)" strokeWidth="1.5" strokeOpacity="0.9" />
                        
                        {/* AI Core Star Node */}
                        <path d="M16 8C16 12 18 13.5 22 13.5C18 13.5 16 15 16 19C16 15 14 13.5 10 13.5C14 13.5 16 12 16 8Z" fill="#ffffff" />
                        <circle cx="23" cy="8" r="1.2" fill="#38bdf8" />
                    </svg>
                </div>
            </div>

            {/* Typography */}
            <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                    <span className={`${textSizes[size] || textSizes.md} font-extrabold tracking-tight text-white group-hover:text-blue-200 transition-colors`}>
                        TakeYourGoods
                    </span>
                    <span className={`${badgeSizes[size] || badgeSizes.md} font-extrabold rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white uppercase shadow-sm tracking-wider border border-blue-400/30`}>
                        AI
                    </span>
                </div>
                {showTagline && (
                    <span className="text-[10px] text-slate-400 -mt-0.5 font-medium tracking-normal">
                        Autonomous B2B Sourcing Agent
                    </span>
                )}
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="inline-flex">
                {content}
            </Link>
        );
    }

    return content;
}

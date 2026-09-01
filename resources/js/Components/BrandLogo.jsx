import React from 'react';
import { Link } from '@inertiajs/react';

export default function BrandLogo({ size = 'md', showTagline = false, href = '/', className = '' }) {
    const heightSizes = {
        sm: 'h-8 sm:h-10',
        md: 'h-11 sm:h-13 md:h-15 max-h-[64px]',
        lg: 'h-14 sm:h-18 md:h-22',
        xl: 'h-20 sm:h-24 md:h-28',
    };

    const content = (
        <div className={`flex items-center group transition-all duration-300 hover:scale-[1.03] ${className}`}>
            <img 
                src="/images/logo.png" 
                alt="TakeYourGoods AI - AI Global Sourcing & Logistics Platform" 
                className={`${heightSizes[size] || heightSizes.md} w-auto object-contain select-none filter drop-shadow-[0_4px_12px_rgba(37,99,235,0.25)]`}
            />
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="inline-flex items-center focus:outline-none py-1">
                {content}
            </Link>
        );
    }

    return content;
}



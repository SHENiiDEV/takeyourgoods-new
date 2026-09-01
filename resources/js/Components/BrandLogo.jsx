import React from 'react';
import { Link } from '@inertiajs/react';

export default function BrandLogo({ size = 'md', showTagline = false, href = '/', className = '' }) {
    const heightSizes = {
        sm: 'h-10 sm:h-12',
        md: 'h-14 sm:h-16 md:h-20 lg:h-24',
        lg: 'h-20 sm:h-24 md:h-28 lg:h-32',
        xl: 'h-28 sm:h-36 md:h-44',
    };

    const content = (
        <div className={`flex items-center group transition-all duration-300 hover:scale-[1.03] ${className}`}>
            <img 
                src="/images/logo.png" 
                alt="TakeYourGoods AI - AI Global Sourcing & Logistics Platform" 
                className={`${heightSizes[size] || heightSizes.md} w-auto object-contain select-none filter drop-shadow-[0_4px_16px_rgba(37,99,235,0.3)]`}
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



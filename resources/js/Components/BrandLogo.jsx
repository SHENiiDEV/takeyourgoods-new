import React from 'react';
import { Link } from '@inertiajs/react';

export default function BrandLogo({ size = 'md', showTagline = false, href = '/', className = '' }) {
    const heightSizes = {
        sm: 'h-7 sm:h-8',
        md: 'h-8 sm:h-9',
        lg: 'h-10 sm:h-12',
    };

    const content = (
        <div className={`flex items-center group transition-transform duration-200 hover:scale-[1.02] ${className}`}>
            <img 
                src="/images/logo.png" 
                alt="TakeYourGoods AI - AI Global Sourcing & Logistics Platform" 
                className={`${heightSizes[size] || heightSizes.md} w-auto object-contain drop-shadow-md`}
            />
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="inline-flex items-center focus:outline-none">
                {content}
            </Link>
        );
    }

    return content;
}


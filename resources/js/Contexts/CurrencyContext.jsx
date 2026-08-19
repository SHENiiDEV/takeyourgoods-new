import React, { createContext, useContext, useState, useEffect } from 'react';

const CURRENCIES = {
    EUR: {
        code: 'EUR',
        symbol: '€',
        rate: 1.00,
        flag: '🇪🇺',
        name: 'Euro',
        symbolPosition: 'before',
    },
    USD: {
        code: 'USD',
        symbol: '$',
        rate: 1.08,
        flag: '🇺🇸',
        name: 'US Dollar',
        symbolPosition: 'before',
    },
    GBP: {
        code: 'GBP',
        symbol: '£',
        rate: 0.85,
        flag: '🇬🇧',
        name: 'British Pound',
        symbolPosition: 'before',
    },
};

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
    const [currencyCode, setCurrencyCode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('takeyourgoods_currency') || 'EUR';
        }
        return 'EUR';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('takeyourgoods_currency', currencyCode);
        }
    }, [currencyCode]);

    const activeCurrency = CURRENCIES[currencyCode] || CURRENCIES.EUR;

    const convert = (amountInEur) => {
        if (amountInEur === null || amountInEur === undefined) return 0;
        const num = typeof amountInEur === 'string' ? parseFloat(amountInEur.replace(/[^0-9.-]+/g, '')) : amountInEur;
        if (isNaN(num)) return 0;
        return num * activeCurrency.rate;
    };

    const format = (amountInEur, decimals = null) => {
        const converted = convert(amountInEur);
        const hasDecimals = decimals !== null ? decimals : (converted % 1 !== 0 ? 2 : 0);
        const formattedNumber = converted.toLocaleString(undefined, {
            minimumFractionDigits: hasDecimals,
            maximumFractionDigits: hasDecimals,
        });

        return activeCurrency.symbolPosition === 'before'
            ? `${activeCurrency.symbol}${formattedNumber}`
            : `${formattedNumber} ${activeCurrency.symbol}`;
    };

    return (
        <CurrencyContext.Provider
            value={{
                currency: activeCurrency,
                currencyCode,
                setCurrency: setCurrencyCode,
                currencies: CURRENCIES,
                convert,
                format,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        // Fallback if rendered outside provider
        return {
            currency: CURRENCIES.EUR,
            currencyCode: 'EUR',
            setCurrency: () => {},
            currencies: CURRENCIES,
            convert: (v) => v,
            format: (v) => `€${v}`,
        };
    }
    return context;
}

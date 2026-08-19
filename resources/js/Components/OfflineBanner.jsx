import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';

export default function OfflineBanner() {
    const [isOnline, setIsOnline] = useState(() => {
        return typeof navigator !== 'undefined' ? navigator.onLine : true;
    });
    const [showRestored, setShowRestored] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleOnline = () => {
            setIsOnline(true);
            setShowRestored(true);
            const timer = setTimeout(() => {
                setShowRestored(false);
            }, 3500);
            return () => clearTimeout(timer);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowRestored(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // When Offline: Persistent Warning Banner
    if (!isOnline) {
        return (
            <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-rose-900 via-amber-900 to-rose-950 text-white text-xs font-semibold px-4 py-2.5 shadow-xl border-b border-rose-700/50 flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                        </span>
                        <WifiOff className="w-4 h-4 text-rose-300 flex-shrink-0" />
                        <span className="tracking-wide">
                            <strong>Offline Mode:</strong> Internet connection lost. Real-time factory database queries will resume upon reconnecting.
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-800/80 hover:bg-rose-700 text-white text-[11px] font-bold transition-colors"
                    >
                        <RefreshCw className="w-3 h-3" />
                        <span>Retry Connection</span>
                    </button>
                </div>
            </div>
        );
    }

    // When Reconnected: Success Toast
    if (showRestored) {
        return (
            <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-emerald-100 text-xs font-semibold px-4 py-2 shadow-lg border-b border-emerald-700/50 animate-in slide-in-from-top-2 duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
                    <Wifi className="w-4 h-4 text-emerald-300 animate-pulse" />
                    <span>
                        <strong>Connection Restored:</strong> Synchronized with TakeYourGoods AI Global Sourcing Network.
                    </span>
                </div>
            </div>
        );
    }

    return null;
}

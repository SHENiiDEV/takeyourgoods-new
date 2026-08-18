export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="appLogoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="50%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="appLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
            </defs>

            <rect width="64" height="64" rx="18" fill="url(#appLogoBg)" />
            <rect x="1" y="1" width="62" height="62" rx="17" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

            <path d="M32 14 L48 23 L48 41 L32 50 L16 41 L16 23 Z" stroke="url(#appLogoGrad)" strokeWidth="2" strokeLinejoin="round" fill="#1e293b" fillOpacity="0.6" />
            <path d="M32 32 L48 23" stroke="url(#appLogoGrad)" strokeWidth="1.5" strokeOpacity="0.7" />
            <path d="M32 32 L16 23" stroke="url(#appLogoGrad)" strokeWidth="1.5" strokeOpacity="0.7" />
            <path d="M32 32 L32 50" stroke="url(#appLogoGrad)" strokeWidth="2" strokeOpacity="0.9" />

            <path d="M32 20 C32 26 34 28 40 28 C34 28 32 30 32 36 C32 30 30 28 24 28 C30 28 32 26 32 20 Z" fill="#ffffff" />
            <circle cx="44" cy="18" r="2" fill="#38bdf8" />
        </svg>
    );
}


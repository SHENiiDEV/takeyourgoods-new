import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { CurrencyProvider } from '@/Contexts/CurrencyContext';

const appName = import.meta.env.VITE_APP_NAME || 'TakeYourGoods AI';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <CurrencyProvider>
                <App {...props} />
            </CurrencyProvider>
        );
    },
    progress: {
        color: '#2563eb',
    },
});


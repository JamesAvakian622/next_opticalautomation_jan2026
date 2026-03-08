'use client';

import { HelmetProvider } from 'react-helmet-async';
import StyledComponentsRegistry from './registry';
import ThemeProvider from '@/components/ThemeProvider';
import GlobalStyles from '@/components/GlobalStyles';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

/**
 * Fallback client layout when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set (e.g. Vercel build without env).
 * Uses no Clerk hooks so prerender succeeds. Production should set the key and use ClientLayout.
 */
export default function ClientLayoutNoClerk({ children }) {
    return (
        <HelmetProvider>
            <StyledComponentsRegistry>
                <FavoritesProvider>
                    <ThemeProvider>
                        <GlobalStyles />
                        <main style={{ paddingTop: '70px' }}>
                            <Breadcrumbs />
                            {children}
                        </main>
                        <Footer />
                        <CookieConsent />
                    </ThemeProvider>
                </FavoritesProvider>
            </StyledComponentsRegistry>
        </HelmetProvider>
    );
}

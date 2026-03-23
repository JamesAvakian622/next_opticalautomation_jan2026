'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { PublicNavigation } from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

interface ClientLayoutNoClerkProps {
    children: ReactNode;
}

/**
 * Fallback client layout when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set (e.g. Vercel build without env).
 * Uses no Clerk hooks so prerender succeeds. PublicNavigation shows full nav + megamenu without auth.
 */
export default function ClientLayoutNoClerk({ children }: ClientLayoutNoClerkProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <FavoritesProvider>
                <PublicNavigation />
                <main className="pt-[70px]">
                    <Breadcrumbs />
                    {children}
                </main>
                <Footer />
                <CookieConsent />
            </FavoritesProvider>
        </ThemeProvider>
    );
}

'use client';

import { useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import StyledComponentsRegistry from './registry';
import ThemeProvider from '@/components/ThemeProvider';
import GlobalStyles from '@/components/GlobalStyles';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import CookieConsent from '@/components/CookieConsent';
import PageLogger from '@/components/PageLogger';
import SplashScreen from '@/components/SplashScreen';
import ActivityTracker from '@/components/ActivityTracker';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

export default function ClientLayout({ children }) {
    const { isSignedIn, isLoaded } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    const pathname = usePathname();

    // Redirect to login if not authenticated, and force sign-out on every visit
    useEffect(() => {
        if (!isLoaded) return;
        
        const publicPaths = ['/login', '/register', '/sign-in', '/sign-up'];
        const isPublicPath = publicPaths.some(path => pathname?.startsWith(path));
        
        if (!isSignedIn && !isPublicPath) {
            router.push('/login');
            return;
        }

        // Force sign-out on every visit unless user just signed in
        if (isSignedIn && !isPublicPath) {
            const allowed = document.cookie.includes('opauto_active_session=1');
            console.log('[ClientLayout] Signed in, cookie check:', allowed, 'cookies:', document.cookie);
            if (allowed) {
                document.cookie = 'opauto_active_session=; path=/; max-age=0';
                console.log('[ClientLayout] Cookie found, allowing through');
            } else {
                console.log('[ClientLayout] No cookie, forcing sign-out');
                signOut({ redirectUrl: '/sign-in' });
            }
        }
    }, [isSignedIn, isLoaded, pathname, router]);



    // Show nothing while checking authentication
    if (!isLoaded) {
        return (
            <StyledComponentsRegistry>
                <ThemeProvider>
                    <GlobalStyles />
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        height: '100vh',
                        fontSize: '1.2rem',
                        color: '#6366f1'
                    }}>
                        Loading...
                    </div>
                </ThemeProvider>
            </StyledComponentsRegistry>
        );
    }

    // Only render full layout if signed in
    if (!isSignedIn) {
        return (
            <StyledComponentsRegistry>
                <ThemeProvider>
                    <GlobalStyles />
                    {children}
                </ThemeProvider>
            </StyledComponentsRegistry>
        );
    }

    return (
        <StyledComponentsRegistry>
            <FavoritesProvider>
                <ThemeProvider>
                    <GlobalStyles />
                    <SplashScreen />
                    <ActivityTracker />
                    <PageLogger />
                    <JsonLd type="organization" />
                    <JsonLd type="website" />
                    <Navigation />
                    <main style={{ paddingTop: '70px' }}>
                        <Breadcrumbs />
                        {children}
                    </main>
                    <Footer />
                    <CookieConsent />
                </ThemeProvider>
            </FavoritesProvider>
        </StyledComponentsRegistry>
    );
}

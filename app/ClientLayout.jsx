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

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoaded) return; // Wait for Clerk to load
        
        const publicPaths = ['/login', '/register', '/sign-in', '/sign-up'];
        const isPublicPath = publicPaths.some(path => pathname?.startsWith(path));
        
        if (!isSignedIn && !isPublicPath) {
            router.push('/login');
        }
    }, [isSignedIn, isLoaded, pathname, router]);

    // Sign out on page leave
    useEffect(() => {
        if (!isSignedIn || !signOut) return;
        const handleLeave = () => {
            signOut();
        };
        window.addEventListener('beforeunload', handleLeave);
        window.addEventListener('pagehide', handleLeave);
        return () => {
            window.removeEventListener('beforeunload', handleLeave);
            window.removeEventListener('pagehide', handleLeave);
        };
    }, [isSignedIn, signOut]);

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

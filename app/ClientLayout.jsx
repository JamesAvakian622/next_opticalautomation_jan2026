'use client';

import { useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { HelmetProvider } from 'react-helmet-async';
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
    const { isSignedIn } = useUser();
    const { signOut } = useClerk();

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

    return (
        <HelmetProvider>
            <StyledComponentsRegistry>
                <FavoritesProvider>
                    <ThemeProvider>
                        <GlobalStyles />
                        {isSignedIn ? (
                            <>
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
                            </>
                        ) : (
                            <main>{children}</main>
                        )}
                    </ThemeProvider>
                </FavoritesProvider>
            </StyledComponentsRegistry>
        </HelmetProvider>
    );
}

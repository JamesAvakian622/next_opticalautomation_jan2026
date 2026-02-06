'use client';

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
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { AuthProvider } from '@/contexts/AuthContext';

export default function ClientLayout({ children }) {
    return (
        <HelmetProvider>
            <StyledComponentsRegistry>
                <AuthProvider>
                    <FavoritesProvider>
                        <ThemeProvider>
                            <GlobalStyles />
                            <SplashScreen />
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
                </AuthProvider>
            </StyledComponentsRegistry>
        </HelmetProvider>
    );
}

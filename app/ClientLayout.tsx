'use client';

import { useEffect, type ReactNode } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import CookieConsent from '@/components/CookieConsent';
import PageLogger from '@/components/PageLogger';
import SplashScreen from '@/components/SplashScreen';
import ActivityTracker from '@/components/ActivityTracker';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
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

    // Show loading state while checking authentication
    if (!isLoaded) {
        return (
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <div className="flex justify-center items-center h-screen text-xl text-primary">
                    Loading...
                </div>
            </ThemeProvider>
        );
    }

    // Only render full layout if signed in
    if (!isSignedIn) {
        return (
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <FavoritesProvider>
                <SplashScreen />
                <ActivityTracker />
                <PageLogger />
                <JsonLd type="organization" />
                <JsonLd type="website" />
                <Navigation />
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

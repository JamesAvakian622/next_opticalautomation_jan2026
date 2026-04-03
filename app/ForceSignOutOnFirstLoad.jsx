'use client';

import { useEffect } from 'react';
import { useAuth, useClerk } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

/**
 * After sign-in Clerk redirects here. We immediately call signOut so the
 * next visit forces a fresh login. The cookie `opauto_active_session` is
 * set by the sign-in page and checked here to allow the first landing.
 */
export default function ForceSignOutOnFirstLoad() {
    const { isLoaded, isSignedIn } = useAuth();
    const { signOut } = useClerk();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoaded) return;

        const isAuthPage = ['/sign-in', '/sign-up', '/login', '/register'].some(p =>
            pathname?.startsWith(p)
        );
        if (isAuthPage) return;

        if (isSignedIn) {
            // Check for the allow-through cookie set by the sign-in page
            const allowed = document.cookie.includes('opauto_active_session=1');
            console.log('[ForceSignOut] isSignedIn:', isSignedIn, 'cookie allowed:', allowed, 'cookies:', document.cookie);
            if (allowed) {
                // Clear it so next load forces sign-out
                document.cookie = 'opauto_active_session=; path=/; max-age=0';
                console.log('[ForceSignOut] Allowing through, cookie cleared');
                return;
            }
            console.log('[ForceSignOut] No cookie, signing out');
            void signOut({ redirectUrl: '/sign-in' });
        }
    }, [isLoaded, isSignedIn, pathname, signOut]);

    return null;
}

'use client';

import { useEffect } from 'react';
import { useAuth, useClerk } from '@clerk/nextjs';

const SESSION_FLAG = 'opauto_opened_this_session';

/** Clears Clerk session on the first navigation of each browser tab session so users re-authenticate behind auth.protect(). */
export default function ForceSignOutOnFirstLoad() {
    const { isLoaded, isSignedIn } = useAuth();
    const { signOut } = useClerk();

    useEffect(() => {
        if (!isLoaded) return;

        const openedThisSession = window.sessionStorage.getItem(SESSION_FLAG);
        if (openedThisSession) return;

        window.sessionStorage.setItem(SESSION_FLAG, '1');

        if (isSignedIn) {
            void signOut({ redirectUrl: '/sign-in' });
        }
    }, [isLoaded, isSignedIn, signOut]);

    return null;
}

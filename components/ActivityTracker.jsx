'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const HEARTBEAT_INTERVAL_MS = 60_000;
const LOGIN_SESSION_KEY = 'opauto-login-tracked';

export default function ActivityTracker() {
    const { isSignedIn, user } = useUser();
    const pathname = usePathname();
    const lastHeartbeat = useRef(0);
    const pathnameRef = useRef(pathname);

    pathnameRef.current = pathname;

    const sendHeartbeat = useCallback(async () => {
        const now = Date.now();
        if (now - lastHeartbeat.current < HEARTBEAT_INTERVAL_MS) return;
        lastHeartbeat.current = now;

        try {
            await fetch('/api/user-activity/heartbeat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: pathnameRef.current }),
            });
        } catch {
            // silent fail
        }
    }, []);

    useEffect(() => {
        if (!isSignedIn || !user) return;

        const sessionKey = `${LOGIN_SESSION_KEY}-${user.id}`;
        if (!sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, 'true');
            fetch('/api/user-activity/login', { method: 'POST' }).catch(() => {});
        }
    }, [isSignedIn, user]);

    useEffect(() => {
        if (!isSignedIn) return;

        const handleClick = () => sendHeartbeat();
        document.addEventListener('click', handleClick);

        sendHeartbeat();

        return () => document.removeEventListener('click', handleClick);
    }, [isSignedIn, sendHeartbeat]);

    useEffect(() => {
        if (!isSignedIn) return;
        sendHeartbeat();
    }, [pathname, isSignedIn, sendHeartbeat]);

    return null;
}

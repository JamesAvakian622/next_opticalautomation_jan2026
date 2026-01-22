'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageLogger() {
    const pathname = usePathname();

    useEffect(() => {
        // Log page access
        const logPageView = async () => {
            try {
                // Get user info from localStorage if available
                const userStr = localStorage.getItem('user');
                const user = userStr ? JSON.parse(userStr) : null;

                await fetch('/api/log-page', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        path: pathname,
                        userId: user?.clientId || null,
                        userEmail: user?.email || null
                    })
                });
            } catch (error) {
                // Silently fail - don't disrupt user experience
                console.error('Failed to log page view:', error);
            }
        };

        logPageView();
    }, [pathname]);

    return null; // This component doesn't render anything
}

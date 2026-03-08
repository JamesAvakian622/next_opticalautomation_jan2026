'use client';

import React from 'react';
import ClientLayoutNoClerk from '@/app/ClientLayoutNoClerk';

/**
 * If Clerk or ClientLayout throws (e.g. missing key, SDK load failure), render the no-Clerk layout
 * with the same page children so the app never shows a white screen.
 */
export default class ClerkLayoutErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('[ClerkLayoutErrorBoundary]', error, info);
    }

    render() {
        if (this.state.hasError && this.props.fallbackChildren != null) {
            return <ClientLayoutNoClerk>{this.props.fallbackChildren}</ClientLayoutNoClerk>;
        }
        return this.props.children;
    }
}

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { resolveTenant } from './lib/resolve-tenant.js';
import { hasClerkPublishableKey, validateClerkEnvForProduction } from './lib/clerk-env.js';

// Only these routes skip auth.protect() (keep this list intentional and small).
const isPublicRoute = createRouteMatcher([
    '/login(.*)',
    '/register(.*)',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/forgot-password(.*)',
    '/reset-password(.*)',
    '/api/auth/(.*)'
]);

function applyTenantHeaders(request) {
    const tenant = resolveTenant(request);
    if (tenant) {
        const response = NextResponse.next();
        if (tenant.orgSlug) response.headers.set('x-tenant-slug', tenant.orgSlug);
        if (tenant.orgId) response.headers.set('x-tenant-id', tenant.orgId);
        response.headers.set('x-tenant-source', tenant.source);
        return response;
    }
    return NextResponse.next();
}

/** When Clerk key is missing (e.g. build without env), skip Clerk to avoid invocation failure. */
function plainProxy(request) {
    return applyTenantHeaders(request);
}

validateClerkEnvForProduction();
const hasClerkKey = hasClerkPublishableKey();

const proxy = hasClerkKey
    ? clerkMiddleware(async (auth, request) => {
        // Protect ALL routes except public ones
        if (!isPublicRoute(request)) {
            await auth.protect();
        }
        return applyTenantHeaders(request);
    })
    : plainProxy;

export default proxy;

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)'
    ]
};

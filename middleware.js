import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { resolveTenant } from './lib/resolve-tenant.js';

const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
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

/** When Clerk key is missing (e.g. Vercel build without env), skip Clerk to avoid MIDDLEWARE_INVOCATION_FAILED. */
function plainMiddleware(request) {
    return applyTenantHeaders(request);
}

const hasClerkKey = typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'string' &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.length > 0;

const middleware = hasClerkKey
    ? clerkMiddleware(async (auth, request) => {
        if (!isPublicRoute(request)) {
            await auth.protect();
        }
        return applyTenantHeaders(request);
    })
    : plainMiddleware;

export default middleware;

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};

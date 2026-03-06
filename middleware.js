import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { resolveTenant } from './lib/resolve-tenant.js';

const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
    const { pathname } = request.nextUrl;

    if (!isPublicRoute(request)) {
        await auth.protect();
    }

    const tenant = resolveTenant(request);
    if (tenant) {
        const response = NextResponse.next();
        if (tenant.orgSlug) response.headers.set('x-tenant-slug', tenant.orgSlug);
        if (tenant.orgId) response.headers.set('x-tenant-id', tenant.orgId);
        response.headers.set('x-tenant-source', tenant.source);
        return response;
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};

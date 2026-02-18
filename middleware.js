import { NextResponse } from 'next/server';
import { resolveTenant } from './lib/resolve-tenant.js';

const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/api/auth',
    '/api/log-page',
    '/api/seed-admin',
    '/api/health',
    '/about',
    '/pricing',
    '/portfolio',
    '/tech',
    '/products',
    '/documents',
    '/guides',
    '/support',
    '/api/contact',
    '/sitemap',
    '/terms',
    '/privacy',
    '/content-policy',
    '/trademarks',
    '/forgot-password',
    '/opauto.ico',
    '/opauto.png',
    '/learnSkills365',
    '/deskview',
    '/learning',
    '/glossary',
    '/product-videos',
    '/features',
    '/timeline',
    '/questions',
    '/onboarding',
    '/api/onboarding',
];

function isPublicRoute(pathname) {
    return publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );
}

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Skip static files and Next.js internals
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('.') ||
        pathname.startsWith('/api/')
    ) {
        // Even for skipped routes, attach tenant headers if detected
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

    // Resolve tenant from request
    const tenant = resolveTenant(request);

    // Allow public routes
    if (isPublicRoute(pathname)) {
        const response = NextResponse.next();
        // Attach tenant headers even on public routes (for client-side usage)
        if (tenant) {
            if (tenant.orgSlug) response.headers.set('x-tenant-slug', tenant.orgSlug);
            if (tenant.orgId) response.headers.set('x-tenant-id', tenant.orgId);
            response.headers.set('x-tenant-source', tenant.source);
        }
        return response;
    }

    // Check for custom auth token
    const token = request.cookies.get('token')?.value;

    if (!token) {
        const signInUrl = new URL('/login', request.url);
        return NextResponse.redirect(signInUrl);
    }

    // Attach tenant headers for downstream use
    const response = NextResponse.next();
    if (tenant) {
        if (tenant.orgSlug) response.headers.set('x-tenant-slug', tenant.orgSlug);
        if (tenant.orgId) response.headers.set('x-tenant-id', tenant.orgId);
        response.headers.set('x-tenant-source', tenant.source);
    }
    return response;
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
};
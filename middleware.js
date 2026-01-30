import { NextResponse } from 'next/server';

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
    '/opauto.png'
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
        return NextResponse.next();
    }

    // Allow public routes
    if (isPublicRoute(pathname)) {
        return NextResponse.next();
    }

    // Check for custom auth token
    const token = request.cookies.get('token')?.value;

    if (!token) {
        const signInUrl = new URL('/login', request.url);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
};
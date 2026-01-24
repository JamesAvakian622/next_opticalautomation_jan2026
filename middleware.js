import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    '/',
    '/login(.*)',
    '/register(.*)',
    '/api/auth/(.*)',
    '/api/log-page',
    '/api/seed-admin',
    '/api/health',
    '/about(.*)',
    '/pricing(.*)',
    '/portfolio(.*)',
    '/tech(.*)',
    '/products(.*)',
    '/documents(.*)',
    '/guides(.*)',
    '/support(.*)',
    '/api/contact',
    '/sitemap(.*)',
    '/terms(.*)',
    '/privacy(.*)',
    '/content-policy(.*)',
    '/trademarks(.*)',
    '/forgot-password(.*)',
    '/opauto.ico',
    '/opauto.png'
]);

export default clerkMiddleware((auth, request) => {
    if (!isPublicRoute(request)) {
        const { userId } = auth();
        if (!userId) {
            const signInUrl = new URL('/login', request.url);
            return NextResponse.redirect(signInUrl);
        }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
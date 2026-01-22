import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Public paths that don't require authentication
    const publicPaths = [
        '/login',
        '/register',
        '/api/auth/login',
        '/api/auth/register',
        '/api/log-page',
        '/api/seed-admin',
        '/_next',
        '/favicon.ico',
        '/opauto.ico',
        '/opauto.png',
        '/OpAuto1.png'
    ];

    // Check if the path is public
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    if (isPublicPath) {
        return NextResponse.next();
    }

    // Check for authentication token in cookies
    const token = request.cookies.get('token')?.value;

    if (!token) {
        // Redirect to login with the original URL as a redirect parameter
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};

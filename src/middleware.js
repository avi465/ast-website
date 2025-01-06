import { NextResponse } from 'next/server';

export async function middleware(request) {
    const cookie = request.headers.get('cookie'); // Extract cookies from the request

    if (!cookie) {
        // If no cookie is found, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verify session on the server
    const response = await fetch(`${process.env.BASE_URL}/api/admin/verify-session`, {
        method: 'GET',
        headers: { Cookie: cookie },
        cache: 'no-store',
        credentials: "include", // Ensure cookies are sent with the request
    });

    if (response.status !== 200) {
        // Session invalid or expired, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Session is valid, proceed to the requested page
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: '/dashboard/:path*',
    // matcher: '/((?!_next|static|favicon.ico|login).*)',

};

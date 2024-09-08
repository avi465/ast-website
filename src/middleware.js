import { NextResponse } from 'next/server'
import { isLoggedIn } from './utils/verifySession';


export async function middleware(request) {
    console.log(isLoggedIn)
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/dashboard/:path*',
}
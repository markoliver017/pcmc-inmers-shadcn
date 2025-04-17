// middleware.ts or middleware.js
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This is your secret from [...nextauth].ts config
const secret = process.env.NEXTAUTH_SECRET

export async function middleware(request) {
    const token = await getToken({ req: request, secret })
    const { pathname } = request.nextUrl

    const isAdminRoute = pathname.startsWith('/admin')

    // Allow the request if it's not /admin or user is authenticated
    if (!isAdminRoute || token) {
        return NextResponse.next()
    }

    // If user is authenticated and visiting /login, redirect to /admin
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/admin', request.url))
    }
    // If trying to access /admin and not authenticated, redirect
    const loginUrl = new URL('/', request.url)
    return NextResponse.redirect(loginUrl)
}

// See "Matching Paths" below to learn more
export const config = {
    // matcher: '/:path*',
    // matcher: '/',
    matcher: '/admin/:path*',
}
import { NextResponse } from 'next/server';

const protectedPaths = ['/dashboard'];
const authPath = '/';

export function proxy(request) {
  const sessionCookie = request.cookies.get('session');
  const isAuthenticated = !!sessionCookie?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  if (pathname === authPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

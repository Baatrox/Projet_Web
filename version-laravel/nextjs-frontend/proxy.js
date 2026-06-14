import { NextResponse } from 'next/server';

const protectedPaths = ['/dashboard'];

export function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const isProtected = protectedPaths.some(p => pathname.startsWith(p));
  const isLoginPage = pathname === '/';

  const token = request.cookies.get('auth-token')?.value;

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

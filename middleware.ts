import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  // Check prototype routes
  if (pathname.startsWith("/admin/prototype")) {
    const prototypeSession = request.cookies.get("prototype-session")
    
    if (!prototypeSession || prototypeSession.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl)
    }
    
    // Add security headers for admin routes
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Check admin routes
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const adminSession = request.cookies.get("admin-session")

    if (!adminSession || adminSession.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl)
    }
    
    // Add security headers for admin routes
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

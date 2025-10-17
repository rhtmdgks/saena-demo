import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Skip login page
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  // Check prototype routes
  if (request.nextUrl.pathname.startsWith("/admin/prototype")) {
    const prototypeSession = request.cookies.get("prototype-session")
    
    if (!prototypeSession || prototypeSession.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    return NextResponse.next()
  }

  // Check admin routes
  if (request.nextUrl.pathname === "/admin" || request.nextUrl.pathname.startsWith("/admin/")) {
    const adminSession = request.cookies.get("admin-session")

    if (!adminSession || adminSession.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

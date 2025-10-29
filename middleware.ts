import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const userRole = request.cookies.get("userRole")?.value

    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  if (pathname.startsWith("/agent") && !pathname.startsWith("/agent/login")) {
    const userRole = request.cookies.get("userRole")?.value

    if (userRole !== "agent") {
      return NextResponse.redirect(new URL("/agent/login", request.url))
    }
  }

  // Add CORS headers for IDXBroker images
  const response = NextResponse.next()
  
  // Allow images from IDXBroker domains
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  // Allow images from IDXBroker domains - more permissive CSP
  if (pathname.includes('idxbroker') || pathname.includes('widget')) {
    response.headers.set('Content-Security-Policy', "img-src 'self' data: blob: https: http:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; style-src 'self' 'unsafe-inline' https: http:;")
  }

  // Special configuration for IDXBroker Integration page - disable image security checks
  if (pathname === '/idxbroker-integration' || pathname.startsWith('/idxbroker-integration/')) {
    // Remove CSP entirely for this page to allow all images
    response.headers.delete('Content-Security-Policy');
    
    // Add permissive headers for images
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    
    // Allow all image sources
    response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
    response.headers.set('Cross-Origin-Opener-Policy', 'unsafe-none');
    response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/agent/:path*", "/idxbroker-integration/:path*"],
}

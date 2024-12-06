import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin-session");
  const isSignInPage = request.nextUrl.pathname === "/signin";

  // Only consider token valid if it has a value
  const isValidToken = token && token.value !== "";

  // Redirect to signin if accessing admin routes without valid token
  if (!isValidToken && !isSignInPage) {
    const response = NextResponse.redirect(new URL("/signin", request.url));
    // Set proper cookie deletion with all necessary attributes
    response.cookies.delete("admin-session");
    return response;
  }

  // Redirect to admin dashboard if accessing signin with valid token
  if (isValidToken && isSignInPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/admin/:path*"]
};

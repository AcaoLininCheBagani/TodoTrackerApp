// proxy.ts (replaces middleware.ts)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  const { pathname } = request.nextUrl;
  console.log(pathname, token);
  // If user is logged in and tries to access root (login/register)
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not logged in and tries to access protected pages
  if (
    !token &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/todo") ||
      pathname.startsWith("/profile"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Root path (login/register)
    "/dashboard/:path*", // All dashboard routes
    "/todo/:path*", // All todos routes
    "/profile/:path*", // All profile routes
  ],
};

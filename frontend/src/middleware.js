import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes (only accessible with authentication)
  const protectedRoutes = ["/admin", "/dashboard", "/profile"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Auth callback route
  if (pathname.startsWith("/callback")) {
    return NextResponse.next();
  }

  // Redirect to login if accessing protected route without token
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated and trying to access auth pages
  const authPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const isAuthPage = authPages.some((page) => pathname.startsWith(page));

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Let everything else through (including 404s)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

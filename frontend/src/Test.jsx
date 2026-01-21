import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* <FeaturedProducts />
      <NewArrival />
      <HotDeals /> */}
      <h2> something would happen soon</h2>
      <h2> something would happen soon</h2>
      <h2> something would happen soon</h2>
      <h2> something would happen soon</h2>
      <h2> something would happen soon</h2>
    </div>
  );
};

export default HomePage;

import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Routes that should redirect authenticated users AWAY (login pages only)
  const authOnlyRoutes = ["/login", "/register", "/forgot-password"];

  // Check if current path is an auth-only route
  const isAuthOnlyRoute = authOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Always allow these routes regardless of auth status
  const alwaysAllowRoutes = ["/callback", "/reset-password"];
  const isAlwaysAllowed = alwaysAllowRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isAlwaysAllowed) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from login/register pages
  if (token && isAuthOnlyRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect admin routes - require authentication
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow everything else (including "/" for both authenticated and non-authenticated users)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

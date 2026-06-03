import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { edgeAuth } from "@/auth/edge";
import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  PROTECTED_ROUTES,
} from "@/constants/routes.constants";
import { logUnauthorizedAccess } from "@/lib/logger/auth.logger";

function matchesRoute(pathname: string, routes: readonly string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export default edgeAuth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;
  const userRole = req.auth?.user?.role;

  if (matchesRoute(pathname, AUTH_ROUTES) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (matchesRoute(pathname, PROTECTED_ROUTES) && !isLoggedIn) {
    logUnauthorizedAccess(pathname);
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (matchesRoute(pathname, ADMIN_ROUTES)) {
    if (!isLoggedIn) {
      logUnauthorizedAccess(pathname);
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (userRole !== UserRole.ADMIN) {
      logUnauthorizedAccess(pathname);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

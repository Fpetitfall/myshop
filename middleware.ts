import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export default auth((req: NextRequest & { auth: any }) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";



  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = ["/", "/products", "/categories"].includes(nextUrl.pathname);
  const isAuthRoute = ["/auth/login", "/auth/register"].includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  // 2. Security Headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Content-Security-Policy", "default-src 'self'; img-src 'self' data: cloudinary.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';");

  if (isApiAuthRoute) return response;

  if (isAuthRoute) {
    if (isLoggedIn) return NextResponse.redirect(new URL("/", nextUrl));
    return response;
  }

  if (isAdminRoute) {
    if (!isLoggedIn || req.auth?.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return response;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

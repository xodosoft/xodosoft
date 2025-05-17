import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    const authRoutes = ["/login"];
    const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

    // 🔹 If user is NOT logged in and tries to access dashboard, redirect to signin
    if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 🔹 If user IS logged in and tries to access signin/signup/verify, redirect to dashboard
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // ✅ Allow other requests to proceed
    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/dashboard/:path*"],
};
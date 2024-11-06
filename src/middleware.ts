import { validateToken } from "./utils/tokenValidator";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    // Jika tidak ada token, redirect ke login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const validation = await validateToken(token);

    // Jika token tidak valid, redirect ke login
    if (!validation.isValid) {
      console.error("Token validation failed:", validation.error);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Role-based access control
    if (validation.role === "user") {
      // Jika user mencoba mengakses dashboard
      if (path.startsWith("/dashboard")) {
        // Redirect ke halaman yang sesuai untuk user
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (validation.isValid) {
      if (path.startsWith("/login")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Jika semua validasi berhasil, lanjutkan request
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/faqs", "/detail", "/dashboard", "/dashboard/:path*"],
};

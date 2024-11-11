import { validateToken } from "./utils/tokenValidator";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    // Jika tidak ada token
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const validation = await validateToken(token);

    // Jika token tidak valid
    if (!validation.isValid) {
      console.error("Token validation failed:", validation.error);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (validation.role === "user") {
      if (path.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (validation.isValid) {
      if (path.startsWith("/login")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // validasi berhasil
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/user/cart",
    "/user/transaksi",
    "/user",
    "/dashboard",
    "/dashboard/:path*",
  ],
};

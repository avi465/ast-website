import { NextRequest, NextResponse } from "next/server";

import { authMiddleware } from "./middleware/auth-middleware";

export async function middleware(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie"); // Extract cookies from the request

    if (!cookie) {
      // If no cookie is found, redirect to login
      return NextResponse.redirect(new URL("/auth/v3/login", req.url));
    }

    // Verify session on the server
    const response = await fetch(`${process.env.BASE_URL}/api/admin/verify-session`, {
      method: "GET",
      headers: { Cookie: cookie },
      cache: "no-store",
      credentials: "include", // Ensure cookies are sent with the request
    });

    if (response.status !== 200) {
      // Session invalid or expired, redirect to login
      return NextResponse.redirect(new URL("/auth/v3/login", req.url));
    }

    // Session is valid, proceed to the requested page
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/error?reason=session", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};

// export function middleware(req: NextRequest) {
//     // authMiddleware
//     const response = authMiddleware(req);
//     if (response) {
//         return response;
//     }

//     return NextResponse.next();
// }

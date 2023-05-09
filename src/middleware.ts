import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token")
  ) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(
      new URL("/auth/signin", request.nextUrl.origin)
    );
  }
}

// Secures the matching routes...
export const config = {
  matcher: "/",
};

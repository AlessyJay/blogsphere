import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const loginPage = "/sign-in";

  if (!token) {
    return NextResponse.redirect(new URL(loginPage, req.url));
  }

  if (token) return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/writeblog"],
};

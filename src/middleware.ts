import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (typeof token !== "string") return;

  const protectedRoutes = ["/writeblog"];

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) return NextResponse.redirect(new URL("/sign-in", req.url));

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log(error);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/writeblog",
};

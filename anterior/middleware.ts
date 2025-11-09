import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    const lang = request.headers.get("accept-language")?.startsWith("es") ? "es" : "en";
    return NextResponse.redirect(new URL(`/${lang}`, request.url));
  }
  return NextResponse.next();
}
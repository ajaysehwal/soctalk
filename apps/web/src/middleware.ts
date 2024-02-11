import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(request: NextRequest) {
  const isAuthenticated:{name:string,value:string} | undefined = request.cookies.get("access_token");
  if (!isAuthenticated?.value || !isValid(isAuthenticated?.value)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};

const isValid = (token: string | undefined) => {
  if (!token) {
    return false;
  }
  const decoded: any = jwt.decode(token);
  if (decoded?.username) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp > currentTime) {
      return true;
    }
  }

  return false;
};

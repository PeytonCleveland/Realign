import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const protectedRoute = req.nextUrl.pathname.includes("/app");

  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  const { data: user } = await supabase
    .from("profiles")
    .select("onboarded")
    .eq("id", session?.user.id);

  if (protectedRoute && (error || !session))
    return NextResponse.redirect(new URL("/sign-in", req.url));

  if (session && !req.nextUrl.pathname.includes("/app"))
    return NextResponse.redirect(new URL("/app", req.url));

  // if (
  //   session &&
  //   !user![0].onboarded &&
  //   !req.nextUrl.pathname.includes("/app/onboarding")
  // ) {
  //   return NextResponse.redirect(new URL("/app/onboarding", req.url));
  // }

  return res;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

import { NextResponse, type NextRequest } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // 有効期限が切れたセッションを更新
  await supabase.auth.getSession();

  // 認証がまだのユーザーはログインページにリダイレクト
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // ログイン後にプロフィールがなければ、プロフィールページにリダイレクト
  const { data: profile } = await supabase.from("users").select("*");
  if (profile?.length === 0) {
    return NextResponse.redirect(new URL("/setting/profile/new", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signup|forgot-password|auth|setting/profile/new).*)",
  ],
};

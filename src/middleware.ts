import { NextResponse, type NextRequest } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import { type Database } from "@/lib/supabase/type";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  // 有効期限が切れたセッションを更新
  await supabase.auth.getSession();

  // 認証がまだのユーザーはログインページにリダイレクト
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // プロフィール登録がまだのユーザーはプロフィールページにリダイレクト
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id);
  if (profile?.length === 0) {
    return NextResponse.redirect(new URL("/setting/profile", req.url));
  }

  return res;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signin|signup|auth|setting/profile).*)"],
};

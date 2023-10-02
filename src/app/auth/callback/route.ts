import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { type Database } from "@/lib/supabase/type";

export const GET = async (request: NextRequest) => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // 認証コードを使用して、Supabaseとのセッションを確立する
  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // サインイン後にリダイレクトするURLを指定
  return NextResponse.redirect(requestUrl.origin);
};

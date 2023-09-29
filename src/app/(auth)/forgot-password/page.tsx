import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { ForgotPassword } from "@/app/(auth)/forgot-password/_component/ForgotPassword";
import { type Database } from "@/lib/supabase/type";

const ForgotPasswordPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 認証している場合、リダイレクト
  if (session) {
    redirect("/");
  }

  return <ForgotPassword />;
};

export default ForgotPasswordPage;

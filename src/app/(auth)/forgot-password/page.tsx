import { redirect } from "next/navigation";

import { ForgotPassword } from "@/app/(auth)/forgot-password/_component/ForgotPassword";
import { createClient } from "@/lib/supabase/server";

const ForgotPasswordPage = async () => {
  const supabase = createClient();

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

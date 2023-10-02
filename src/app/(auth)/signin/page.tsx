import { redirect } from "next/navigation";

import { Sign } from "@/app/(auth)/_component/Sign";
import { createClient } from "@/lib/supabase/server";

const Signin = async () => {
  const supabase = createClient();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 認証している場合、リダイレクト
  if (session) {
    redirect("/");
  }

  return <Sign page="signin" />;
};

export default Signin;

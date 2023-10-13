import { redirect } from "next/navigation";

import { Auth } from "@/app/(auth)/_component/AuthContent";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "SignUp",
};

const Signup = async () => {
  const supabase = createClient();

  // 認証している場合、リダイレクト
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/");
  }

  return <Auth page="signup" />;
};

export default Signup;

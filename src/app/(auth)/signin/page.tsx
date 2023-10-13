import { redirect } from "next/navigation";

import { Auth } from "@/app/(auth)/_component/AuthContent";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "SignIn",
};

const Signin = async () => {
  const supabase = createClient();

  // 認証している場合、リダイレクト
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/");
  }

  return (
    <>
      <Auth page="signin" />
    </>
  );
};

export default Signin;

import { redirect } from "next/navigation";

import { Auth } from "@/app/(auth)/_component/AuthContent";
import { getSession } from "@/lib/supabase/user";

export const metadata = {
  title: "SignUp",
};

const Signup = async () => {
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return <Auth page="signup" />;
};

export default Signup;

import { redirect } from "next/navigation";

import { Auth } from "@/app/(auth)/_component/AuthContent";
import { getSession } from "@/lib/supabase/user";

export const metadata = {
  title: "SignIn",
};

const Signin = async () => {
  const session = await getSession();
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

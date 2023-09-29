import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Footer } from "@/app/(home)/_component/TopBar/Footer";
import { Header } from "@/app/(home)/_component/TopBar/Header";
import { type Database } from "@/lib/supabase/type";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (
    <div className="space-y-8 pb-20 pt-4 sm:space-y-14">
      {profile && <Header />}
      <main className="mx-auto w-full max-w-screen-sm px-4">{children}</main>
      {profile && <Footer profile={profile} />}
    </div>
  );
};

export default HomeLayout;

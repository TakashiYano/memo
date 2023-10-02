import { Footer } from "@/app/(home)/_component/TopBar/Footer";
import { Header } from "@/app/(home)/_component/TopBar/Header";
import { createClient } from "@/lib/supabase/server";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (
    <div className="space-y-8 pb-20 pt-4 sm:space-y-14">
      {profile && <Header user={user} />}
      {children}
      {profile && <Footer profile={profile} />}
    </div>
  );
};

export default HomeLayout;

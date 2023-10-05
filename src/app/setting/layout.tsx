import { SettingNav } from "@/app/setting/_component/Common/SettingNav";
import { createClient } from "@/lib/supabase/server";

type HomeLayoutProps = { children: React.ReactNode };

const HomeLayout = async (props: HomeLayoutProps) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  const { children } = props;
  return (
    <>
      {profile && <SettingNav />}
      {children}
    </>
  );
};

export default HomeLayout;

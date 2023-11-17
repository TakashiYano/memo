import { SettingNav } from "@/app/setting/_component/Common";
import { getProfile } from "@/lib/supabase/user";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getProfile();

  return (
    <>
      {profile && <SettingNav />}
      {children}
    </>
  );
};

export default HomeLayout;

import { HeaderNav } from "@/app/_component/Nav/HeaderNav";
import { getProfile } from "@/lib/supabase/user";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getProfile();

  return (
    <>
      {profile && (
        <HeaderNav
          lists={[
            { body: "アカウント", href: "/setting/account" },
            { body: "プロフィール", href: "/setting/profile" },
          ]}
        />
      )}
      {children}
    </>
  );
};

export default HomeLayout;

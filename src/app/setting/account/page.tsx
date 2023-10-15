import { DeleteAccount } from "@/app/setting/_component/Account/DeleteAccount";
import { LogoutButton } from "@/app/setting/_component/Account/LogoutButton";
import { ThemeList } from "@/app/setting/_component/Account/ThemeList";
import { getProfile } from "@/lib/supabase/user";

export const metadata = {
  title: "Account",
};

const SettingAccount = async () => {
  const profile = await getProfile();

  return (
    <section className="space-y-4 p-4">
      <ThemeList />
      {profile && <DeleteAccount profile={profile} />}
      <LogoutButton />
    </section>
  );
};

export default SettingAccount;

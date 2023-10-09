import { DeleteAccount } from "@/app/setting/_component/Account/DeleteAccount";
import { LogoutButton } from "@/app/setting/_component/Account/LogoutButton";
import { ThemeList } from "@/app/setting/_component/Account/ThemeList";
import { createClient } from "@/lib/supabase/server";

const getProfile = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase.from("profiles").select().eq("id", user.id).single();
    return profile;
  }
  return null;
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

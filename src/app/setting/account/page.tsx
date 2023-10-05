import { DeleteAccount } from "@/app/setting/_component/Account/DeleteAccount";
import { LogoutButton } from "@/app/setting/_component/Account/LogoutButton";
import { ThemeList } from "@/app/setting/_component/Account/ThemeList";

const SettingAccount = () => {
  return (
    <section className="space-y-4 p-4">
      <ThemeList />
      <DeleteAccount />
      <LogoutButton />
    </section>
  );
};

export default SettingAccount;

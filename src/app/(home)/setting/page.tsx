import { LogoutButton } from "@/app/(home)/setting/_component/LogoutButton";
import { Avatar } from "@/component/Avatar/Avatar";
import { RecursiveList } from "@/component/List/RecursiveList";
import { createClient } from "@/lib/supabase/server";

const Setting = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  if (!profile?.avatar_url) {
    return;
  }

  return (
    <div className="px-4">
      <div className="flex flex-col items-center">
        <Avatar
          src={profile?.avatar_url}
          alt={profile?.user_name}
          width={96}
          height={96}
          className="h-24 w-24"
        />
        <h1 className="mt-8 text-2xl font-bold">ようこそ、{profile?.user_name}さん</h1>
        <p className="mt-2 text-sm opacity-70">アカウントに関する各種設定ができます</p>
      </div>

      <div className="mt-12">
        <RecursiveList
          list={[
            {
              items: [{ href: "/setting/theme", label: "テーマ" }],
              title: "設定",
            },
            {
              items: [
                { href: "/setting/profile/edit", label: "プロフィールの管理" },
                { href: "/setting/account", label: "アカウントの連携" },
                { href: "/setting/delete", label: "データの削除" },
              ],
              title: "全般",
            },
          ]}
        />
        <div className="relative mt-8 grid">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Setting;

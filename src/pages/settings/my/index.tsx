import type { NextPage } from "next";
import Image from "next/image";
import type { UserType } from "src/api/handler/user/type";
import { Layout } from "src/components/shared/Layout";
import { List } from "src/components/shared/List";

const user: UserType = {
  id: "engineer",
  name: "yanot",
  avatarUrl: "/mocks/avatar01.jpg",
};

const SettingsMy: NextPage = () => {
  return (
    <Layout left="close" center="account">
      <div className="flex flex-col items-center">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={96}
          height={96}
          className="h-24 w-24 overflow-hidden rounded-full"
        />
        <h1 className="mt-8 text-2xl font-bold">ようこそ、{user.name}さん</h1>
        <p className="mt-2 text-sm opacity-70">アカウントに関する各種設定ができます</p>
      </div>

      <div className="mt-12">
        <List
          title="全般"
          items={[
            { label: "プロフィール", href: "/settings/my/user/edit" },
            { label: "アカウントの連携", href: "/settings/my/account" },
            { label: "データの削除", href: "/settings/my/delete" },
          ]}
        />
      </div>
    </Layout>
  );
};

export default SettingsMy;

/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { Header } from "src/components/shared/Header";
import { List } from "src/components/shared/List";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

const SettingsMy: NextPage = () => {
  return (
    <div className="pb-20">
      <Header page="setting" hasBack />
      <div className="p-4 mx-auto max-w-screen-sm">
        <div className="flex flex-col items-center">
          <img src={user.avatarUrl} alt={user.name} className="overflow-hidden w-24 h-24 rounded-full" />
          <h1 className="mt-8 text-2xl font-bold">ようこそ、{user.name}さん</h1>
          <p className="mt-2 text-sm text-gray-500">アカウントに関する各種設定ができます</p>
        </div>

        <div className="mt-12">
          <List
            title="全般"
            items={[
              { label: "プロフィール", href: "/settings/my/profile" },
              { label: "アカウントの連携", href: "/settings/my/account" },
              { label: "データの削除", href: "foo" },
              { label: "サポート", href: "bar" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsMy;

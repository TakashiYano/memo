/* eslint-disable import/no-default-export */
/* eslint-disable func-style */
import type { NextPage } from "next";
import Image from "next/image";

import { RecursiveList } from "src/component/List";
import type { UserType } from "src/lib/user";
import { Layout } from "src/pages-layout";

const user: UserType = {
  avatarUrl: "/mocks/avatar01.jpg",
  id: "engineer",
  name: "yanot",
};

const SettingMy: NextPage = () => {
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
        <RecursiveList
          list={[
            {
              items: [{ href: "/setting/theme", label: "テーマ" }],
              title: "設定",
            },
            {
              items: [
                { href: "/setting/profile/edit", label: "プロフィール" },
                { href: "/setting/account", label: "アカウントの連携" },
                { href: "/setting/delete", label: "データの削除" },
              ],
              title: "全般",
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default SettingMy;
